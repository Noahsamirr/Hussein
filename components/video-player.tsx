'use client'

import { useEffect, useState } from 'react'
import { Loader2, Lock } from 'lucide-react'
import { useRouter } from 'next/navigation'
import dynamic from 'next/dynamic'
import { cn } from '@/lib/utils'
import { useConfettiStore } from '@/hooks/use-confetti'
import { CourseNotes } from '@/components/course-notes'
import { Button } from '@/components/ui/button'
import { ChevronLeft, ChevronRight } from 'lucide-react'

const MuxPlayer = dynamic(() => import('@mux/mux-player-react'), {
  ssr: false,
  loading: () => (
    <div className="absolute inset-0 flex items-center justify-center bg-slate-800">
      <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
    </div>
  ),
})

interface VideoPlayerProps {
  playbackId: string
  courseId: string
  chapterId: string
  nextChapterId?: string
  isLocked: boolean
  completeOnEnd: boolean
  title: string
}

export const VideoPlayer = ({
  playbackId,
  courseId,
  chapterId,
  nextChapterId,
  isLocked,
  completeOnEnd,
  title,
}: VideoPlayerProps) => {
  const [isReady, setIsReady] = useState(false)
  const router = useRouter()
  const confetti = useConfettiStore()
  const [showNotes, setShowNotes] = useState(false)

  const onEnd = async () => {
    try {
      if (completeOnEnd) {
        const response = await fetch(`/api/courses/${courseId}/chapters/${chapterId}/progress`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ isCompleted: true }),
        })

        if (!response.ok) {
          throw new Error('Failed to update progress')
        }

        if (!nextChapterId) {
          confetti.onOpen()
        }

        if (nextChapterId) {
          router.push(`/courses/${courseId}/chapters/${nextChapterId}`)
        }
      }
    } catch {
      router.refresh()
    }
  }

  return (
    <div className="relative aspect-video">
      {!isReady && !isLocked && (
        <div className="absolute inset-0 flex items-center justify-center bg-slate-800">
          <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
        </div>
      )}
      {isLocked && (
        <div className="absolute inset-0 flex items-center justify-center bg-slate-800 flex-col gap-y-2 text-secondary">
          <Lock className="h-8 w-8" />
          <p className="text-sm text-blue-900 dark:text-blue-100">This chapter is locked</p>
        </div>
      )}
      {!isLocked && (
        <MuxPlayer
          title={title}
          className={cn(!isReady && 'hidden')}
          onCanPlay={() => setIsReady(true)}
          onEnded={onEnd}
          autoPlay
          playbackId={playbackId}
        />
      )}
      <Button
        onClick={() => setShowNotes(!showNotes)}
        className="absolute right-4 top-4 z-10"
        variant="secondary"
        size="sm"
      >
        {showNotes ? (
          <>
            <ChevronRight className="h-4 w-4 mr-2" />
            Hide Notes
          </>
        ) : (
          <>
            <ChevronLeft className="h-4 w-4 mr-2" />
            Show Notes
          </>
        )}
      </Button>
      {showNotes && (
        <div className="absolute right-0 top-0 h-full w-80 bg-white dark:bg-gray-900 shadow-lg transform transition-transform duration-300 ease-in-out">
          <div className="h-full overflow-y-auto">
            <CourseNotes
              courseId={courseId}
              chapterId={chapterId}
            />
          </div>
        </div>
      )}
    </div>
  )
} 
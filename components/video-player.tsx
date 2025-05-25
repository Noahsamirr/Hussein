'use client'

import { useState } from 'react'
import MuxPlayer from '@mux/mux-player-react'
import { CourseNotes } from '@/components/course-notes'
import { Button } from '@/components/ui/button'
import { ChevronLeft, ChevronRight } from 'lucide-react'

interface VideoPlayerProps {
  playbackId: string
  courseId: string
  chapterId: string
}

export const VideoPlayer = ({
  playbackId,
  courseId,
  chapterId
}: VideoPlayerProps) => {
  const [showNotes, setShowNotes] = useState(false)

  return (
    <div className="relative aspect-video">
      <MuxPlayer
        playbackId={playbackId}
        metadata={{
          video_id: chapterId,
          video_title: "Chapter Video",
          viewer_user_id: "user-id",
        }}
        streamType="on-demand"
        className="h-full w-full"
      />
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
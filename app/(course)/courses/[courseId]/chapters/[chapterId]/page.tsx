'use server'

import { redirect } from 'next/navigation'
import { auth } from '@clerk/nextjs/server'
import { Banner } from '@/components/banner'
import { Preview } from '@/components/preview'
import { VideoPlayer } from './_components/video-player'
import { getChapter } from '@/actions/get-chapter'
import CourseEnrollButton from './_components/course-enroll-button'
import { Separator } from '@/components/ui/separator'
import { CourseProgressButton } from './_components/course-progress-button'
import { Sparkles } from 'lucide-react'

type Params = Promise<{
  courseId: string
  chapterId: string
}>

type ChapterDetailsProps = {
  params: Params
}

export default async function ChapterDetails({ params }: ChapterDetailsProps) {
  const resolvedParams = await params
  const { userId } = await auth()
  if (!userId) {
    return redirect('/')
  }

  const { chapter, course, muxData, attachments, nextChapter, userProgress, purchase } = await getChapter({
    userId,
    ...resolvedParams,
  })

  if (!chapter || !course) {
    return redirect('/')
  }

  const isLocked = !chapter.isFree && !purchase
  const completedOnEnd = !!purchase && !userProgress?.isCompleted

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-800">
      {userProgress?.isCompleted ? <Banner label="You already completed this chapter" variant="success" /> : null}
      {isLocked ? <Banner label="You need to purchase this course to watch this chapter" /> : null}

      <div className="mx-auto flex max-w-4xl flex-col pb-20">
        <div className="p-4">
          <VideoPlayer
            chapterId={chapter.id}
            title={chapter.title}
            courseId={resolvedParams.courseId}
            nextChapterId={nextChapter?.id}
            playbackId={muxData?.playbackId ?? ''}
            isLocked={isLocked}
            completeOnEnd={completedOnEnd}
          />
        </div>

        <div className="rounded-2xl border bg-gradient-to-br from-white/50 to-white/30 p-8 backdrop-blur-sm dark:from-gray-800/50 dark:to-gray-800/30 shadow-lg">
          <div className="flex flex-col items-center justify-between p-4 md:flex-row">
            <div className="flex items-center gap-3 mb-4 md:mb-0">
              <h2 className="text-2xl font-bold text-blue-900 dark:text-blue-100">{chapter.title}</h2>
              <Sparkles className="h-6 w-6 text-yellow-400 animate-pulse" />
            </div>
            {purchase ? (
              <CourseProgressButton
                chapterId={resolvedParams.chapterId}
                courseId={resolvedParams.courseId}
                nextChapterId={nextChapter?.id}
                isCompleted={!!userProgress?.isCompleted}
              />
            ) : (
              <CourseEnrollButton courseId={resolvedParams.courseId} price={course.price!} />
            )}
          </div>

          <Separator className="my-6" />

          <div className="prose dark:prose-invert max-w-none">
            <Preview value={chapter.description!} />
          </div>

          {attachments.length ? (
            <>
              <Separator className="my-6" />
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-blue-900 dark:text-blue-100">Course Materials</h3>
                <div className="grid gap-4">
                  {attachments.map((attachment) => (
                    <a
                      className="flex w-full items-center rounded-lg border bg-gradient-to-br from-sky-100 to-sky-50 p-4 text-sky-700 hover:from-sky-200 hover:to-sky-100 transition-all dark:from-sky-900/50 dark:to-sky-800/50 dark:text-sky-300 dark:hover:from-sky-900/70 dark:hover:to-sky-800/70"
                      key={attachment.id}
                      target="_blank"
                      href={attachment.url}
                      rel="noreferrer"
                    >
                      {attachment.name}
                    </a>
                  ))}
                </div>
              </div>
            </>
          ) : null}
        </div>
      </div>
    </div>
  )
}

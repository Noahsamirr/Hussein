import { Prisma } from '@prisma/client'
import { redirect } from 'next/navigation'
import { auth } from '@clerk/nextjs/server'
import { db } from '@/lib/db'
import Link from 'next/link'
import { LayoutDashboard, BookOpen } from 'lucide-react'
import CourseSidebarItem from './course-sidebar-item'
import { CourseProgress } from '@/components/course-progress'
import { Button } from '@/components/ui/button'

type CourseSidebarProps = {
  course: Prisma.CourseGetPayload<{ include: { chapters: { include: { userProgress: true } } } }>
  progressCount: number
}

export default async function CourseSidebar({ course, progressCount }: CourseSidebarProps) {
  const { userId } = await auth()

  if (!userId) {
    return redirect('/')
  }

  const purchase = await db.purchase.findUnique({
    where: {
      userId_courseId: {
        userId,
        courseId: course.id,
      },
    },
  })

  return (
    <div className="flex h-full flex-col overflow-y-auto border-r bg-white/80 backdrop-blur-sm dark:bg-gray-900/80 shadow-sm">
      <div className="flex flex-col border-b p-8">
        <div className="flex items-center gap-x-2 mb-6">
          <BookOpen className="h-6 w-6 text-indigo-500 dark:text-indigo-400" />
          <h1 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 to-purple-500 dark:from-indigo-400 dark:to-purple-400">
            {course.title}
          </h1>
        </div>
        {purchase ? (
          <div className="mt-4">
            <CourseProgress variant="success" value={progressCount} />
          </div>
        ) : null}
        <div className="mt-6">
          <Link href="/dashboard">
            <Button
              variant="ghost"
              className="w-full justify-start gap-x-2 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-800"
            >
              <LayoutDashboard className="h-5 w-5 text-indigo-500 dark:text-indigo-400" />
              Dashboard
            </Button>
          </Link>
        </div>
      </div>
      <div className="flex w-full flex-col p-4">
        {course.chapters.map((chapter) => (
          <CourseSidebarItem
            key={chapter.id}
            id={chapter.id}
            label={chapter.title}
            isCompleted={!!chapter.userProgress?.[0]?.isCompleted}
            courseId={course.id}
            isLocked={!chapter.isFree && !purchase}
          />
        ))}
      </div>
    </div>
  )
}

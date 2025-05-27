'use server'

import { redirect } from 'next/navigation'
import { auth } from '@clerk/nextjs/server'
import { db } from '@/lib/db'
import { CourseCard } from '@/components/course-card'
import Link from 'next/link'
import { Sparkles } from 'lucide-react'

export default async function MyCoursesPage() {
  const { userId } = await auth()
  if (!userId) {
    return redirect('/')
  }

  const purchases = await db.purchase.findMany({
    where: {
      userId,
    },
    include: {
      course: {
        include: {
          category: true,
          chapters: {
            include: {
              userProgress: {
                where: {
                  userId,
                }
              }
            }
          }
        }
      }
    }
  })

  const courses = purchases.map((purchase) => purchase.course)

  return (
    <div className="p-6 pt-20">
      {courses.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-[60vh]">
          <h2 className="text-4xl font-extrabold mb-4 neon-title animate-pulse text-center bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 bg-clip-text text-transparent drop-shadow-lg">
            <Sparkles className="inline-block mr-2 animate-bounce text-yellow-400" />
            No Courses Yet!
          </h2>
          <p className="text-lg text-blue-800/80 dark:text-blue-200/80 mb-6 text-center max-w-md">
            You haven&apos;t enrolled in any courses yet. Start your learning journey now and unlock new skills!
          </p>
          <Link
            href="/search"
            className="px-6 py-2 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold shadow-lg hover:from-blue-700 hover:to-purple-700 transition-all neon-glow"
          >
            Browse Courses
          </Link>
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-4 gap-4">
          {courses.map((course) => {
            const progress = course.chapters.reduce((acc, chapter) => {
              if (chapter.userProgress?.[0]?.isCompleted) {
                return acc + 1
              }
              return acc
            }, 0)

            const totalChapters = course.chapters.length
            const progressPercentage = totalChapters > 0 ? (progress / totalChapters) * 100 : 0

            return (
              <CourseCard
                key={course.id}
                id={course.id}
                title={course.title}
                imageUrl={course.imageUrl!}
                chaptersLength={course.chapters.length}
                price={course.price!}
                progress={progressPercentage}
                category={course.category?.name || 'Uncategorized'}
              />
            )
          })}
        </div>
      )}
    </div>
  )
}

// Neon animation styles
// Add this to your global CSS if not present:
// .neon-title { text-shadow: 0 0 8px #0ff, 0 0 16px #0ff, 0 0 32px #0ff, 0 0 64px #0ff; }
// .neon-glow { box-shadow: 0 0 8px #7f5fff, 0 0 16px #7f5fff, 0 0 32px #7f5fff; } 
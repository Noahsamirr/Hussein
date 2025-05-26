'use server'

import { redirect } from 'next/navigation'
import { auth } from '@clerk/nextjs/server'
import { db } from '@/lib/db'
import { CourseProgress } from '@/components/course-progress'

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
    <div className="p-6">
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
            <div key={course.id} className="group hover:shadow-sm transition overflow-hidden border rounded-lg p-3 h-full">
              <div className="relative w-full aspect-video rounded-md overflow-hidden">
                <img
                  src={course.imageUrl!}
                  alt={course.title}
                  className="object-cover"
                />
              </div>
              <div className="flex flex-col pt-2">
                <div className="text-lg md:text-base font-medium group-hover:text-sky-700 transition line-clamp-2">
                  {course.title}
                </div>
                <p className="text-xs text-muted-foreground">
                  {course.category?.name}
                </p>
                <CourseProgress
                  variant={progressPercentage === 100 ? 'success' : 'default'}
                  value={progressPercentage}
                  size="sm"
                />
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
} 
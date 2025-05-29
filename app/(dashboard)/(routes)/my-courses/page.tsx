import { auth } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'
import { db } from '@/lib/db'
import CoursesList from '@/components/course-list'
import { getProgress } from '@/actions/get-progress'

const MyCoursesPage = async () => {
  const { userId } = await auth()

  if (!userId) {
    return redirect('/')
  }

  const enrolledCourses = await db.purchase.findMany({
    where: {
      userId: userId,
    },
    select: {
      course: {
        include: {
          category: true,
          chapters: {
            where: {
              isPublished: true,
            },
            select: {
              id: true,
            },
          },
        },
      },
    },
  })

  const courses = await Promise.all(
    enrolledCourses.map(async (purchase) => {
      const progress = await getProgress(userId, purchase.course.id)
      return {
        ...purchase.course,
        progress,
      }
    })
  )

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold tracking-tight">
          My Courses
        </h2>
      </div>
      <CoursesList items={courses} />
    </div>
  )
}

export default MyCoursesPage 
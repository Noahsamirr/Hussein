'use server'

import { redirect } from 'next/navigation'
import { CheckCircle, Clock, GraduationCap, BarChart, Sparkles, Rocket, Target } from 'lucide-react'
import { auth } from '@clerk/nextjs/server'
import { currentUser } from '@clerk/nextjs/server'
import { db } from '@/lib/db'
import { CoursesList } from '@/components/courses-list'
import { InfoCard } from '@/components/info-card'
import { Progress } from '@/components/ui/progress'

interface Chapter {
  id: string
  userProgress: {
    isCompleted: boolean
  }[]
}

interface Course {
  id: string
  title: string
  imageUrl: string | null
  price: number | null
  createdById: string
  description: string | null
  isPublished: boolean
  categoryId: string | null
  createdAt: Date
  updatedAt: Date
  chapters: Chapter[]
  progress?: number
}

export default async function DashboardPage() {
  const { userId } = await auth()
  const user = await currentUser()

  if (!userId || !user) {
    return redirect('/')
  }

  const courses = await db.course.findMany({
    where: {
      createdById: userId,
    },
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
  }) as Course[]

  const completedCourses = courses.filter((course) => {
    const totalChapters = course.chapters.length
    const completedChapters = course.chapters.filter(
      (chapter) => chapter.userProgress?.[0]?.isCompleted
    ).length
    return totalChapters > 0 && totalChapters === completedChapters
  })

  const inProgressCourses = courses.filter((course) => {
    const totalChapters = course.chapters.length
    const completedChapters = course.chapters.filter(
      (chapter) => chapter.userProgress?.[0]?.isCompleted
    ).length
    return totalChapters > 0 && totalChapters !== completedChapters
  })
  
  // Calculate completion percentages
  const totalCourses = completedCourses.length + inProgressCourses.length
  const completionRate = totalCourses ? (completedCourses.length / totalCourses) * 100 : 0

  // Calculate progress for each course
  const coursesWithProgress = courses.map(course => {
    const totalChapters = course.chapters.length
    const completedChapters = course.chapters.filter(
      chapter => chapter.userProgress?.[0]?.isCompleted
    ).length
    const progress = totalChapters > 0 ? (completedChapters / totalChapters) * 100 : 0
    return { ...course, progress }
  })

  return (
    <div className="space-y-8 p-8">
      {/* Welcome Section */}
      <div className="flex flex-col space-y-4">
        <div className="flex items-center gap-3">
          <h1 className="text-4xl font-bold text-blue-900 dark:text-blue-100">
            Welcome Back, {user.firstName || 'User'}! 👋
          </h1>
          <Sparkles className="h-8 w-8 text-yellow-400 animate-pulse" />
        </div>
        <p className="text-lg text-blue-800/80 dark:text-blue-200/80">
          Let&apos;s continue your learning journey together
        </p>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <InfoCard 
          icon={Clock}
          label="In Progress" 
          numberOfItems={inProgressCourses.length}
          variant="default"
        />
        <InfoCard 
          icon={CheckCircle} 
          label="Completed" 
          numberOfItems={completedCourses.length} 
          variant="success"
        />
      </div>

      {/* Progress Section */}
      <div className="rounded-2xl border bg-gradient-to-br from-white/50 to-white/30 p-8 backdrop-blur-sm dark:from-gray-800/50 dark:to-gray-800/30 shadow-lg">
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <div className="space-y-2">
              <h2 className="text-2xl font-bold text-blue-900 dark:text-blue-100">
                Course Progress Overview 📈
              </h2>
              <p className="text-sm">
                You&apos;re making great progress! Keep going! 💪
              </p>
            </div>
            <div className="h-12 w-12 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center">
              <BarChart className="h-6 w-6 text-white" />
            </div>
          </div>
          <Progress value={completionRate} className="h-3 bg-indigo-100 dark:bg-gray-700 rounded-full">
            <div className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 transition-all rounded-full" style={{ width: `${completionRate}%` }} />
          </Progress>
        </div>

        {/* Active Courses */}
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-blue-900 dark:text-blue-100">
            Active Courses 🎯
          </h2>
          <div className="grid gap-4">
            {coursesWithProgress.map((course) => (
              <div 
                key={course.id} 
                className="rounded-xl border bg-gradient-to-br from-white/30 to-white/10 p-6 backdrop-blur-sm dark:from-gray-800/30 dark:to-gray-800/10 hover:from-white/40 hover:to-white/20 dark:hover:from-gray-800/40 dark:hover:to-gray-800/20 transition-all"
              >
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-semibold text-lg">{course.title}</h3>
                  <span className="text-sm font-medium text-indigo-500 dark:text-indigo-400">
                    {course.progress || 0}% Complete
                  </span>
                </div>
                <Progress value={course.progress || 0} className="h-2 bg-indigo-100 dark:bg-gray-700 rounded-full">
                  <div 
                    className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 transition-all rounded-full" 
                    style={{ width: `${course.progress || 0}%` }} 
                  />
                </Progress>
              </div>
            ))}
          </div>
        </div>

        {/* All Courses */}
        <div className="mt-8">
          <h2 className="text-2xl font-bold text-blue-900 dark:text-blue-100">
            All My Courses 📚
          </h2>
          <CoursesList items={courses} />
        </div>
      </div>
    </div>
  )
}
 
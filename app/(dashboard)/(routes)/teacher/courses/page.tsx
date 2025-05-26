import { auth } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'
import { BookOpen, PlusCircle, Sparkles, GraduationCap, Users } from 'lucide-react'

import { db } from '@/lib/db'
import { CoursesList } from './_components/courses-list'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

const CoursesPage = async () => {
  const { userId } = await auth()

  if (!userId) {
    return redirect('/')
  }

  const courses = await db.course.findMany({
    where: {
      createdById: userId,
    },
    include: {
      purchases: true,
    },
    orderBy: {
      createdAt: 'desc',
    },
  })

  // Calculate some stats
  const totalStudents = courses.reduce((acc, course) => acc + course.purchases.length, 0)
  const publishedCourses = courses.filter(course => course.isPublished).length

  return (
    <div className="space-y-8 p-8">
      {/* Welcome Section */}
      <div className="flex flex-col space-y-4">
        <div className="flex items-center gap-3">
          <h1 className="text-4xl font-bold text-blue-900 dark:text-blue-100">
            Teacher Dashboard 👨‍🏫
          </h1>
          <Sparkles className="h-8 w-8 text-yellow-400 animate-pulse" />
        </div>
        <p className="text-lg">
          Manage your courses and track student progress
        </p>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
        <div className="rounded-xl border bg-gradient-to-br from-blue-500/10 to-purple-500/10 p-6 backdrop-blur-sm hover:from-blue-500/20 hover:to-purple-500/20 transition-all dark:from-blue-500/5 dark:to-purple-500/5 dark:hover:from-blue-500/10 dark:hover:to-purple-500/10">
          <div className="flex items-center gap-x-2">
            <BookOpen className="h-8 w-8 text-blue-500" />
            <span className="text-2xl">📚</span>
          </div>
          <div className="mt-4">
            <p className="text-lg font-medium text-blue-900 dark:text-blue-100">Total Courses</p>
            <p className="text-2xl font-bold text-blue-900 dark:text-blue-100">{courses.length}</p>
          </div>
        </div>

        <div className="rounded-xl border bg-gradient-to-br from-green-500/10 to-emerald-500/10 p-6 backdrop-blur-sm hover:from-green-500/20 hover:to-emerald-500/20 transition-all dark:from-green-500/5 dark:to-emerald-500/5 dark:hover:from-green-500/10 dark:hover:to-emerald-500/10">
          <div className="flex items-center gap-x-2">
            <Users className="h-8 w-8 text-green-500" />
            <span className="text-2xl">👥</span>
          </div>
          <div className="mt-4">
            <p className="text-lg font-medium text-blue-900 dark:text-blue-100">Total Students</p>
            <p className="text-2xl font-bold text-blue-900 dark:text-blue-100">{totalStudents}</p>
          </div>
        </div>

        <div className="rounded-xl border bg-gradient-to-br from-purple-500/10 to-pink-500/10 p-6 backdrop-blur-sm hover:from-purple-500/20 hover:to-pink-500/20 transition-all dark:from-purple-500/5 dark:to-pink-500/5 dark:hover:from-purple-500/10 dark:hover:to-pink-500/10">
          <div className="flex items-center gap-x-2">
            <GraduationCap className="h-8 w-8 text-purple-500" />
            <span className="text-2xl">🎓</span>
          </div>
          <div className="mt-4">
            <p className="text-lg font-medium text-blue-900 dark:text-blue-100">Published Courses</p>
            <p className="text-2xl font-bold text-blue-900 dark:text-blue-100">{publishedCourses}</p>
          </div>
        </div>
      </div>

      {/* Courses Section */}
      <div className="rounded-2xl border bg-gradient-to-br from-white/50 to-white/30 p-8 backdrop-blur-sm dark:from-gray-800/50 dark:to-gray-800/30 shadow-lg">
        <div className="flex items-center justify-between mb-8">
          <div className="space-y-2">
            <h2 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 to-purple-500">
              Your Courses 📚
            </h2>
            <p className="text-sm text-muted-foreground">
              Manage and organize your course content
            </p>
          </div>
          <Link href="/teacher/create">
            <Button className="bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 text-white">
              <PlusCircle className="h-4 w-4 mr-2" />
              New Course
            </Button>
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          <CoursesList items={courses} />
        </div>
      </div>
    </div>
  )
}

export default CoursesPage

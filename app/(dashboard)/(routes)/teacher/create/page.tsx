import { auth } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'
import { BookOpen, Sparkles } from 'lucide-react'

import { db } from '@/lib/db'
import { CourseForm } from './_components/course-form'

const CreatePage = async () => {
  const { userId } = await auth()

  if (!userId) {
    return redirect('/')
  }

  const categories = await db.category.findMany({
    orderBy: {
      name: 'asc',
    },
  })

  return (
    <div className="space-y-8 p-8">
      {/* Welcome Section */}
      <div className="flex flex-col space-y-4">
        <div className="flex items-center gap-3">
          <h1 className="text-4xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 to-purple-500">
            Create New Course 🎯
          </h1>
          <Sparkles className="h-8 w-8 text-yellow-400 animate-pulse" />
        </div>
        <p className="text-lg text-muted-foreground">
          Start your teaching journey by creating your first course
        </p>
      </div>

      {/* Form Section */}
      <div className="rounded-2xl border bg-gradient-to-br from-white/50 to-white/30 p-8 backdrop-blur-sm dark:from-gray-800/50 dark:to-gray-800/30 shadow-lg">
        <div className="flex items-center gap-x-2 mb-8">
          <BookOpen className="h-8 w-8 text-indigo-500" />
          <h2 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 to-purple-500">
            Course Details
          </h2>
        </div>
        <div className="max-w-3xl">
          <CourseForm categories={categories} />
        </div>
      </div>
    </div>
  )
}

export default CreatePage

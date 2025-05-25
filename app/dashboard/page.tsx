import { redirect } from 'next/navigation'
import { CheckCircle, Clock, GraduationCap, BarChart } from 'lucide-react'
import { auth } from '@clerk/nextjs/server'
import CoursesList from '@/components/course-list'
import { getDashboardCourses } from '@/actions/get-dashboard-courses'
import { InfoCard } from './_components/info-card'
import { Progress } from '@/components/ui/progress'

export default async function DashboardPage() {
  const { userId } = await auth()

  if (!userId) {
    return redirect('/')
  }

  const { completedCourses, coursesInProgress } = await getDashboardCourses(userId)
  
  // Calculate completion percentages
  const totalCourses = completedCourses.length + coursesInProgress.length
  const completionRate = totalCourses ? (completedCourses.length / totalCourses) * 100 : 0

  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">My Learning Dashboard</h1>
        <div className="flex items-center gap-2">
          <GraduationCap className="h-6 w-6 text-indigo-500" />
          <span className="text-xl font-semibold text-indigo-500">
            {totalCourses} Total Courses
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <InfoCard 
          icon={Clock} 
          label="In Progress" 
          numberOfItems={coursesInProgress.length}
          className="bg-white/50 backdrop-blur-sm hover:bg-white/60 transition-all dark:bg-gray-800/50 dark:hover:bg-gray-800/60"
        />
        <InfoCard 
          icon={CheckCircle} 
          label="Completed" 
          numberOfItems={completedCourses.length} 
          variant="success"
          className="bg-white/50 backdrop-blur-sm hover:bg-white/60 transition-all dark:bg-gray-800/50 dark:hover:bg-gray-800/60"
        />
      </div>

      <div className="rounded-xl border bg-white/50 p-6 backdrop-blur-sm dark:bg-gray-800/50">
        <div className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <div className="space-y-1">
              <h2 className="text-xl font-semibold">Course Completion Progress</h2>
              <p className="text-sm text-muted-foreground">
                {completionRate.toFixed(1)}% of all courses completed
              </p>
            </div>
            <BarChart className="h-5 w-5 text-indigo-500" />
          </div>
          <Progress value={completionRate} className="h-2 bg-indigo-100 dark:bg-gray-700">
            <div className="h-full bg-indigo-500 transition-all" style={{ width: `${completionRate}%` }} />
          </Progress>
        </div>

        <div className="space-y-4">
          <h2 className="text-xl font-semibold">My Courses</h2>
          <div className="grid gap-4">
            {coursesInProgress.map((course) => (
              <div key={course.id} className="rounded-lg border p-4 bg-white/30 dark:bg-gray-800/30">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-medium">{course.title}</h3>
                  <span className="text-sm text-muted-foreground">
                    {course.progress || 0}% Complete
                  </span>
                </div>
                <Progress value={course.progress || 0} className="h-2 bg-indigo-100 dark:bg-gray-700">
                  <div 
                    className="h-full bg-indigo-500 transition-all" 
                    style={{ width: `${course.progress || 0}%` }} 
                  />
                </Progress>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-6">
          <CoursesList items={[...coursesInProgress, ...completedCourses]} />
        </div>
      </div>
    </div>
  )
}

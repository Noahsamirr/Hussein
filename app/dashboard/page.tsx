import { redirect } from 'next/navigation'
import { CheckCircle, Clock, GraduationCap, BarChart, Sparkles, Rocket, Target } from 'lucide-react'
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
    <div className="space-y-8 p-8">
      {/* Welcome Section */}
      <div className="flex flex-col space-y-4">
        <div className="flex items-center gap-3">
          <h1 className="text-4xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 to-purple-500">
            Welcome Back! 👋
          </h1>
          <Sparkles className="h-8 w-8 text-yellow-400 animate-pulse" />
        </div>
        <p className="text-lg text-muted-foreground">
          Let's continue your learning journey together
        </p>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
        <InfoCard 
          icon={Rocket} 
          label="In Progress" 
          numberOfItems={coursesInProgress.length}
          className="bg-gradient-to-br from-blue-500/10 to-purple-500/10 backdrop-blur-sm hover:from-blue-500/20 hover:to-purple-500/20 transition-all dark:from-blue-500/5 dark:to-purple-500/5 dark:hover:from-blue-500/10 dark:hover:to-purple-500/10"
          emoji="🚀"
        />
        <InfoCard 
          icon={CheckCircle} 
          label="Completed" 
          numberOfItems={completedCourses.length} 
          variant="success"
          className="bg-gradient-to-br from-green-500/10 to-emerald-500/10 backdrop-blur-sm hover:from-green-500/20 hover:to-emerald-500/20 transition-all dark:from-green-500/5 dark:to-emerald-500/5 dark:hover:from-green-500/10 dark:hover:to-emerald-500/10"
          emoji="🎯"
        />
        <InfoCard 
          icon={Target} 
          label="Completion Rate" 
          numberOfItems={`${completionRate.toFixed(1)}%`}
          className="bg-gradient-to-br from-indigo-500/10 to-pink-500/10 backdrop-blur-sm hover:from-indigo-500/20 hover:to-pink-500/20 transition-all dark:from-indigo-500/5 dark:to-pink-500/5 dark:hover:from-indigo-500/10 dark:hover:to-pink-500/10"
          emoji="📊"
        />
      </div>

      {/* Progress Section */}
      <div className="rounded-2xl border bg-gradient-to-br from-white/50 to-white/30 p-8 backdrop-blur-sm dark:from-gray-800/50 dark:to-gray-800/30 shadow-lg">
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <div className="space-y-2">
              <h2 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 to-purple-500">
                Course Progress Overview 📈
              </h2>
              <p className="text-sm text-muted-foreground">
                You're making great progress! Keep going! 💪
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
          <h2 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 to-purple-500">
            Active Courses 🎯
          </h2>
          <div className="grid gap-4">
            {coursesInProgress.map((course) => (
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
          <h2 className="text-2xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 to-purple-500">
            All My Courses 📚
          </h2>
          <CoursesList items={[...coursesInProgress, ...completedCourses]} />
        </div>
      </div>
    </div>
  )
}
 
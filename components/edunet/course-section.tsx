import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { Clock, Users, Award } from 'lucide-react'

const courses = [
  {
    title: "Financial Accounting Fundamentals",
    description: "Master the basics of financial accounting, including balance sheets, income statements, and cash flow analysis.",
    image: "/courses/accounting-1.jpg",
    href: "/courses/financial-accounting",
    duration: "12 weeks",
    students: "1.2k+ enrolled",
    level: "Beginner to Intermediate"
  },
  {
    title: "Advanced Business Strategy",
    description: "Learn strategic planning, market analysis, and business model development for sustainable growth.",
    image: "/courses/business-1.jpg",
    href: "/courses/business-strategy",
    duration: "16 weeks",
    students: "2.5k+ enrolled",
    level: "Intermediate to Advanced"
  },
  {
    title: "Managerial Accounting",
    description: "Understand cost accounting, budgeting, and performance measurement for effective business management.",
    image: "/courses/accounting-2.jpg",
    href: "/courses/managerial-accounting",
    duration: "14 weeks",
    students: "1.8k+ enrolled",
    level: "Intermediate"
  },
  {
    title: "Business Development Mastery",
    description: "Develop skills in sales, partnerships, and market expansion strategies for business growth.",
    image: "/courses/business-2.jpg",
    href: "/courses/business-development",
    duration: "10 weeks",
    students: "2.1k+ enrolled",
    level: "All Levels"
  }
]

export const CourseSection = () => {
  return (
    <section className="py-24 bg-white dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-3xl text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
            Professional Development Programs
          </h2>
          <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">
            Comprehensive training programs designed to advance your career in accounting and business development
          </p>
        </div>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          {courses.map((course) => (
            <div
              key={course.title}
              className="group relative rounded-2xl border bg-white p-6 shadow-sm transition-all hover:shadow-md dark:border-gray-800 dark:bg-gray-800"
            >
              <div className="aspect-video relative mb-4 rounded-lg overflow-hidden">
                <img
                  src={course.image}
                  alt={course.title}
                  className="object-cover w-full h-full transition-transform group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-4 left-4">
                  <span className="inline-flex items-center rounded-full bg-primary px-3 py-1 text-sm font-medium text-white">
                    {course.level}
                  </span>
                </div>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                {course.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                {course.description}
              </p>
              <div className="flex items-center gap-4 mb-4 text-sm text-gray-600 dark:text-gray-300">
                <div className="flex items-center">
                  <Clock className="mr-2 h-4 w-4" />
                  {course.duration}
                </div>
                <div className="flex items-center">
                  <Users className="mr-2 h-4 w-4" />
                  {course.students}
                </div>
              </div>
              <Button asChild className="w-full">
                <Link href={course.href}>
                  View Program Details
                  <Award className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
} 
'use client'

import { Course } from '@prisma/client'
import { Pencil, Trash } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

interface CoursesListProps {
  items: Course[]
}

export const CoursesList = ({ items }: CoursesListProps) => {
  return (
    <>
      {items.map((course) => (
        <div
          key={course.id}
          className="group hover:shadow-sm transition overflow-hidden border rounded-lg p-3 h-full bg-white dark:bg-slate-900"
        >
          <div className="flex flex-col">
            <div className="text-lg font-medium group-hover:text-sky-700 dark:group-hover:text-sky-400 transition line-clamp-2">
              {course.title}
            </div>
            <p className="text-sm text-muted-foreground line-clamp-2">
              {course.description}
            </p>
            <div className="mt-4 flex items-center gap-x-2">
              <Link href={`/teacher/courses/${course.id}`}>
                <Button size="sm" variant="ghost" className="hover:bg-slate-200 dark:hover:bg-slate-800">
                  <Pencil className="h-4 w-4 mr-2" />
                  Edit
                </Button>
              </Link>
              <Button size="sm" variant="ghost" className="hover:bg-slate-200 dark:hover:bg-slate-800">
                <Trash className="h-4 w-4 mr-2" />
                Delete
              </Button>
            </div>
          </div>
        </div>
      ))}
    </>
  )
} 
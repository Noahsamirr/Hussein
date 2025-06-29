'use client'

import { useAuth } from '@clerk/nextjs'
import { usePathname } from 'next/navigation'
import { LogOut, BookOpen, Search, Home } from 'lucide-react'
import Link from 'next/link'

import { Button } from '@/components/ui/button'
import { SearchInput } from './search-input'
import { isTeacher } from '@/lib/teacher'
import { ThemeToggle } from './theme-toggle'

export const NavbarRoutes = () => {
  const { userId } = useAuth()
  const pathname = usePathname()

  const isTeacherPage = pathname?.startsWith('/teacher')
  const isCoursePage = pathname?.includes('/courses')
  const isSearchPage = pathname?.includes('/search')
  const isHomePage = pathname === '/'

  return (
    <div className="flex items-center gap-x-2 ml-auto">
      {isSearchPage && (
        <div className="hidden md:block">
          <SearchInput />
        </div>
      )}
      <div className="flex items-center gap-x-2">
        <ThemeToggle />
        {isTeacherPage || isCoursePage ? (
          <Link href="/">
            <Button size="sm" variant="ghost" className="text-slate-700 dark:text-sky-400 hover:bg-slate-200 dark:hover:bg-slate-800">
              <LogOut className="h-4 w-4 mr-2" />
              Exit
            </Button>
          </Link>
        ) : isTeacher(userId) ? (
          <Link href="/teacher/courses">
            <Button size="sm" variant="ghost" className="text-slate-700 dark:text-emerald-400 hover:bg-slate-200 dark:hover:bg-slate-800">
              <BookOpen className="h-4 w-4 mr-2" />
              Teacher mode
            </Button>
          </Link>
        ) : null}
        {userId && (
          <Link href="/">
            <Button size="sm" variant="ghost" className="text-slate-700 dark:text-purple-400 hover:bg-slate-200 dark:hover:bg-slate-800">
              <Home className="h-4 w-4 mr-2" />
              Home
            </Button>
          </Link>
        )}
      </div>
    </div>
  )
}

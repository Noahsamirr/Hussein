'use client'

import { UserButton, useAuth } from '@clerk/nextjs'
import { usePathname } from 'next/navigation'
import { LogOut, BookOpen, Search } from 'lucide-react'
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
            <Button size="sm" variant="ghost" className="hover:bg-slate-200 dark:hover:bg-slate-800">
              <LogOut className="h-4 w-4 mr-2" />
              Exit
            </Button>
          </Link>
        ) : isTeacher(userId) ? (
          <Link href="/teacher/courses">
            <Button size="sm" variant="ghost" className="hover:bg-slate-200 dark:hover:bg-slate-800">
              <BookOpen className="h-4 w-4 mr-2" />
              Teacher mode
            </Button>
          </Link>
        ) : null}
        {userId && <UserButton afterSignOutUrl="/" />}
      </div>
    </div>
  )
}

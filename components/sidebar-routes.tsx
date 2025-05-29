'use client'

import { BarChart, Compass, Layout, List, BookOpen } from 'lucide-react'
import { usePathname } from 'next/navigation'
import { SidebarItem } from './sidebar-item'

const guestRoutes = [
  {
    icon: Layout,
    label: 'Dashboard',
    href: '/dashboard',
  },
  {
    icon: BookOpen,
    label: 'My Courses',
    href: '/my-courses',
  },
  {
    icon: Compass,
    label: 'Browse',
    href: '/search',
  },
]

const teacherRoutes = [
  {
    icon: Layout,
    label: 'Dashboard',
    href: '/dashboard',
  },
  {
    icon: List,
    label: 'Courses',
    href: '/teacher/courses',
  },
  {
    icon: BarChart,
    label: 'Analytics',
    href: '/teacher/analytics',
  },
]

export const SidebarRoutes = () => {
  const pathname = usePathname()

  const isTeacherPage = pathname?.startsWith('/teacher')
  const isDashboardPage = pathname?.startsWith('/dashboard')

  const routes = isTeacherPage ? teacherRoutes : guestRoutes
  return (
    <div className="flex w-full flex-col space-y-2">
      {routes.map((route) => (
        <SidebarItem 
          key={route.href} 
          icon={route.icon} 
          label={route.label} 
          href={route.href}
          isActive={isDashboardPage && route.href === '/dashboard' ? true : pathname === route.href}
        />
      ))}
    </div>
  )
} 
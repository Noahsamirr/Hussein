'use client'

import { cn } from '@/lib/utils'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { LucideIcon } from 'lucide-react'

interface SidebarItemProps {
  icon: LucideIcon
  label: string
  href: string
}

export const SidebarItem = ({ icon: Icon, label, href }: SidebarItemProps) => {
  const pathname = usePathname()

  const isActive = (pathname === '/' && href === '/') || pathname === href || pathname?.startsWith(`${href}/`)

  return (
    <Link
      href={href}
      className={cn(
        'flex items-center gap-x-2 rounded-lg px-3 py-2 text-sm font-medium transition-all hover:bg-slate-300/20',
        isActive 
          ? 'bg-sky-200/20 text-sky-700 dark:bg-sky-900/50 dark:text-sky-300' 
          : 'text-slate-600 dark:text-slate-300'
      )}
    >
      <Icon 
        size={22} 
        className={cn(
          isActive 
            ? 'text-sky-700 dark:text-sky-300' 
            : 'text-slate-500 dark:text-slate-400'
        )} 
      />
      {label}
    </Link>
  )
} 
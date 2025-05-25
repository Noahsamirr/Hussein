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

  const isActive = pathname === href

  return (
    <Link
      href={href}
      className={cn(
        'flex items-center gap-x-2 rounded-lg px-3 py-2 text-sm font-medium hover:bg-slate-300/20',
        isActive ? 'bg-slate-200/20 text-slate-700' : 'text-slate-500'
      )}
    >
      <Icon size={22} />
      {label}
    </Link>
  )
} 
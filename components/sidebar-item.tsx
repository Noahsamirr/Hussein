'use client'

import { cn } from '@/lib/utils'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { LucideIcon } from 'lucide-react'

interface SidebarItemProps {
  icon: LucideIcon
  label: string
  href: string
  isActive?: boolean
}

export const SidebarItem = ({ icon: Icon, label, href, isActive }: SidebarItemProps) => {
  const pathname = usePathname()
  const active = isActive ?? pathname === href

  return (
    <Link
      href={href}
      className={cn(
        'flex items-center gap-x-2 rounded-lg px-3 py-2 text-sm font-medium transition-all duration-200',
        'hover:bg-[#2d3446] hover:text-[#f5f5f0]',
        active 
          ? 'bg-[#2d3446] text-[#f5f5f0]' 
          : 'text-[#a0aec0]'
      )}
    >
      <Icon size={22} className={cn(
        'transition-colors duration-200',
        active ? 'text-[#f5f5f0]' : 'text-[#a0aec0]'
      )} />
      {label}
    </Link>
  )
} 
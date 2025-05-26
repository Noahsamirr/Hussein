import { LucideIcon } from 'lucide-react'
import { IconBadge } from './icon-badge'
import { cn } from '@/lib/utils'

interface InfoCardProps {
  icon: LucideIcon
  label: string
  numberOfItems: number
  variant?: 'default' | 'success'
  className?: string
}

export const InfoCard = ({
  icon: Icon,
  label,
  numberOfItems,
  variant,
  className
}: InfoCardProps) => {
  return (
    <div className={cn(
      "border rounded-lg flex items-center gap-x-2 p-3",
      className
    )}>
      <IconBadge
        icon={Icon}
        variant={variant}
      />
      <div>
        <p className="font-medium">
          {label}
        </p>
        <p className="text-gray-500 text-sm">
          {numberOfItems} {numberOfItems === 1 ? "Course" : "Courses"}
        </p>
      </div>
    </div>
  )
} 
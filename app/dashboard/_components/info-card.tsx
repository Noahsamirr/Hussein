import { LucideIcon } from 'lucide-react'
import { cn } from '@/lib/utils'
import { IconBadge } from '@/components/icon-badge'

interface InfoCardProps {
  numberOfItems: number | string
  variant?: 'default' | 'success'
  label: string
  icon: LucideIcon
  className?: string
  emoji?: string
}

export const InfoCard = ({ 
  variant, 
  icon: Icon, 
  numberOfItems, 
  label,
  className,
  emoji
}: InfoCardProps) => {
  return (
    <div className={cn(
      "flex items-center gap-x-3 rounded-xl border p-4 transition-all duration-300",
      className
    )}>
      <div className="flex items-center gap-x-2">
        <IconBadge variant={variant} icon={Icon} />
        {emoji && <span className="text-2xl">{emoji}</span>}
      </div>
      <div>
        <p className="font-medium text-lg">{label}</p>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          {numberOfItems} {typeof numberOfItems === 'number' ? (numberOfItems === 1 ? 'Course' : 'Courses') : ''}
        </p>
      </div>
    </div>
  )
}

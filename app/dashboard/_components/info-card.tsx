import { LucideIcon } from 'lucide-react'
import { cn } from '@/lib/utils'
import { IconBadge } from '@/components/icon-badge'

interface InfoCardProps {
  numberOfItems: number
  variant?: 'default' | 'success'
  label: string
  icon: LucideIcon
  className?: string
}

export const InfoCard = ({ 
  variant, 
  icon: Icon, 
  numberOfItems, 
  label,
  className 
}: InfoCardProps) => {
  return (
    <div className={cn(
      "flex items-center gap-x-2 rounded-md border p-3",
      className
    )}>
      <IconBadge variant={variant} icon={Icon} />
      <div>
        <p className="font-medium">{label}</p>
        <p className="text-sm text-gray-500">
          {numberOfItems} {numberOfItems === 1 ? 'Course' : 'Courses'}
        </p>
      </div>
    </div>
  )
}

'use client'

import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { Clock, Users, Award } from 'lucide-react'
import { cn } from '@/lib/utils'

interface CourseCardProps {
  id: string
  title: string
  imageUrl: string
  chaptersLength: number
  price: number
  progress: number | null
  category: string
}

export const CourseCard = ({
  id,
  title,
  imageUrl,
  chaptersLength,
  price,
  progress,
  category,
}: CourseCardProps) => {
  const router = useRouter()

  const onClick = () => {
    router.push(`/courses/${id}`)
  }

  return (
    <div
      onClick={onClick}
      className="group relative rounded-2xl border bg-white p-6 shadow-sm transition-all hover:shadow-md dark:border-gray-800 dark:bg-gray-800 cursor-pointer"
    >
      <div className="relative w-full aspect-video rounded-md overflow-hidden">
        <Image
          src={imageUrl}
          alt={title}
          fill
          className="object-cover transition-transform group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          priority={false}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <div className="absolute bottom-4 left-4">
          <span className="inline-flex items-center rounded-full bg-primary px-3 py-1 text-sm font-medium text-white">
            {category}
          </span>
        </div>
      </div>
      <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2 mt-4">
        {title}
      </h3>
      <div className="flex items-center gap-4 mb-4 text-sm text-gray-600 dark:text-gray-300">
        <div className="flex items-center">
          <Clock className="mr-2 h-4 w-4" />
          {chaptersLength} {chaptersLength === 1 ? 'Chapter' : 'Chapters'}
        </div>
        <div className="flex items-center">
          <Users className="mr-2 h-4 w-4" />
          {progress !== null ? `${Math.round(progress)}% Complete` : 'Not Started'}
        </div>
      </div>
      <div className="flex items-center justify-between">
        <span className="text-lg font-bold text-primary">
          {price === 0 ? 'Free' : `$${price}`}
        </span>
        <Award className="h-5 w-5 text-primary" />
      </div>
    </div>
  )
}

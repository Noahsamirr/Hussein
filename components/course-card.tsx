'use client'

import { BookOpen, DollarSign, FileText } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { cn } from '@/lib/utils'

interface CourseCardProps {
  id: string
  title: string
  imageUrl: string
  price: number
  progress: number | null
  chaptersLength: number
  category: string
}

export default function CourseCard({ 
  id,
  title,
  imageUrl,
  price,
  progress,
  chaptersLength,
  category
}: CourseCardProps) {
  return (
    <Link href={`/courses/${id}`}>
      <div className="group hover:shadow-sm transition overflow-hidden border rounded-lg p-3 h-full bg-white dark:bg-slate-900">
        <div className="relative w-full aspect-video rounded-md overflow-hidden">
          <Image
            fill
            className="object-cover"
            alt={title}
            src={imageUrl}
          />
        </div>
        <div className="flex flex-col pt-2">
          <div className="text-lg md:text-base font-medium group-hover:text-sky-700 dark:group-hover:text-sky-400 transition line-clamp-2">
            {title}
          </div>
          <p className="text-sm text-muted-foreground">
            {category}
          </p>
          <div className="my-3 flex items-center gap-x-2 text-sm md:text-xs">
            <div className="flex items-center gap-x-1 text-slate-500 dark:text-slate-400">
              <FileText className="h-4 w-4" />
              <span>{chaptersLength} chapters</span>
            </div>
            {price ? (
              <div className="flex items-center gap-x-1 text-slate-500 dark:text-slate-400">
                <DollarSign className="h-4 w-4" />
                <span>${price}</span>
              </div>
            ) : (
              <div className="flex items-center gap-x-1 text-slate-500 dark:text-slate-400">
                <BookOpen className="h-4 w-4" />
                <span>Free</span>
              </div>
            )}
          </div>
          {progress !== null && (
            <div className="mt-2">
              <div className="flex items-center gap-x-2">
                <div className="text-sm text-slate-500 dark:text-slate-400">
                  Progress: {progress}%
                </div>
              </div>
              <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2 mt-2">
                <div 
                  className="h-full bg-sky-700 dark:bg-sky-400 rounded-full transition-all"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </Link>
  )
}

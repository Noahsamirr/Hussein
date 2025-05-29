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
      <div className="group hover:shadow-lg transition-all duration-200 overflow-hidden border border-[#2d3446] rounded-lg p-3 h-full bg-[#1a1f2e] hover:bg-[#2d3446] cursor-pointer">
        <div className="relative w-full aspect-video rounded-md overflow-hidden">
          <Image
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-200"
            alt={title}
            src={imageUrl}
          />
        </div>
        <div className="flex flex-col pt-2">
          <div className="text-lg md:text-base font-medium group-hover:text-[#f5f5f0] transition-colors duration-200 line-clamp-2 text-[#f5f5f0]">
            {title}
          </div>
          <p className="text-sm text-[#a0aec0]">
            {category}
          </p>
          <div className="my-3 flex items-center gap-x-2 text-sm md:text-xs">
            <div className="flex items-center gap-x-1 text-[#a0aec0]">
              <FileText className="h-4 w-4" />
              <span>{chaptersLength} chapters</span>
            </div>
            {price ? (
              <div className="flex items-center gap-x-1 text-[#a0aec0]">
                <DollarSign className="h-4 w-4" />
                <span>${price}</span>
              </div>
            ) : (
              <div className="flex items-center gap-x-1 text-[#a0aec0]">
                <BookOpen className="h-4 w-4" />
                <span>Free</span>
              </div>
            )}
          </div>
          {progress !== null && (
            <div className="mt-2">
              <div className="flex items-center gap-x-2">
                <div className="text-sm text-[#a0aec0]">
                  Progress: {progress}%
                </div>
              </div>
              <div className="w-full bg-[#2d3446] rounded-full h-2 mt-2">
                <div 
                  className="h-full bg-[#f5f5f0] rounded-full transition-all duration-200"
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

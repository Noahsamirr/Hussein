'use client'

import { useState, useEffect } from 'react'
import toast from 'react-hot-toast'
import axios from 'axios'
import { Button } from '@/components/ui/button'
import { formatPrice } from '@/lib/format'
import { useRouter } from 'next/navigation'

type CourseEnrollButtonProps = {
  price: number
  courseId: string
}

export default function CourseEnrollButton({ price, courseId }: CourseEnrollButtonProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [mounted, setMounted] = useState(false)
  const router = useRouter()

  useEffect(() => {
    setMounted(true)
  }, [])

  const onClick = async () => {
    try {
      setIsLoading(true)
      
      if (price === 0) {
        // Handle free course enrollment
        const response = await axios.post(`/api/courses/${courseId}/enroll`)
        if (response.data.success) {
          toast.success('Successfully enrolled in course!')
          router.refresh()
        }
      } else {
        // Handle paid course checkout
        const response = await axios.post(`/api/courses/${courseId}/checkout`)
        window.location.assign(response.data.url)
      }
    } catch (error) {
      toast.error('Something went wrong!')
    } finally {
      setIsLoading(false)
    }
  }

  if (!mounted) {
    return (
      <Button 
        className="w-full md:w-auto" 
        size="sm" 
        disabled
      >
        Loading...
      </Button>
    )
  }

  return (
    <Button 
      className="w-full md:w-auto" 
      size="sm" 
      onClick={onClick} 
      disabled={isLoading}
    >
      {price === 0 ? 'Enroll for Free' : `Enroll for ${formatPrice(price)}`}
    </Button>
  )
}

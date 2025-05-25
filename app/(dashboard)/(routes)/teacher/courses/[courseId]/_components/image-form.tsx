'use client'

import * as z from 'zod'
import axios from 'axios'
import { Pencil, PlusCircle, ImageIcon } from 'lucide-react'
import { useState } from 'react'
import toast from 'react-hot-toast'
import { useRouter } from 'next/navigation'
import { Course } from '@prisma/client'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { FileUpload } from '@/components/file-upload'

interface ImageFormProps {
  initialData: Course
  courseId: string
}

const formSchema = z.object({
  imageUrl: z.string().min(1, {
    message: 'Image is required',
  }),
})

export const ImageForm = ({ initialData, courseId }: ImageFormProps) => {
  const [isEditing, setIsEditing] = useState(false)

  const toggleEdit = () => setIsEditing((current) => !current)

  const router = useRouter()

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await formSchema.parseAsync(values)
      await axios.patch(`/api/courses/${courseId}`, values)
      toast.success('Course updated')
      toggleEdit()
      router.refresh()
    } catch {
      toast.error('Something went wrong')
    }
  }

  return (
    <div className="mt-6 rounded-md border bg-white p-4 dark:bg-slate-800 dark:border-gray-700">
      <div className="flex items-center justify-between font-medium dark:text-slate-200">
        Course image
        <Button onClick={toggleEdit} variant="ghost" className="dark:text-slate-400 dark:hover:bg-slate-700">
          {isEditing && <>Cancel</>}
          {!isEditing && !initialData.imageUrl && (
            <>
              <PlusCircle className="mr-2 h-4 w-4" />
              Add an image
            </>
          )}
          {!isEditing && initialData.imageUrl && (
            <>
              <Pencil className="mr-2 h-4 w-4" />
              Edit image
            </>
          )}
        </Button>
      </div>
      {!isEditing &&
        (!initialData.imageUrl ? (
          <div className="flex h-60 items-center justify-center rounded-md bg-slate-200 dark:bg-slate-700">
            <ImageIcon className="h-10 w-10 text-slate-500 dark:text-slate-400" />
          </div>
        ) : (
          <div className="relative mt-2 aspect-video">
            <Image alt="Upload" fill className="rounded-md object-cover" src={initialData.imageUrl} />
          </div>
        ))}
      {isEditing && (
        <div>
          <FileUpload
            endpoint="courseImage"
            onChange={(url) => {
              if (url) {
                onSubmit({ imageUrl: url })
              }
            }}
          />
          <div className="mt-4 text-xs text-muted-foreground dark:text-slate-400">16:9 aspect ratio recommended</div>
        </div>
      )}
    </div>
  )
}

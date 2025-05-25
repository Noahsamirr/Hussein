'use client'

import * as z from 'zod'
import axios from 'axios'
import { PlusCircle, File, Loader2, X } from 'lucide-react'
import { useState } from 'react'
import toast from 'react-hot-toast'
import { useRouter } from 'next/navigation'
import { Attachment, Course } from '@prisma/client'

import { Button } from '@/components/ui/button'
import { FileUpload } from '@/components/file-upload'

interface AttachmentFormProps {
  initialData: Course & { attachments: Attachment[] }
  courseId: string
}

const formSchema = z.object({
  url: z.string().min(1),
})

export const AttachmentForm = ({ initialData, courseId }: AttachmentFormProps) => {
  const [isEditing, setIsEditing] = useState(false)
  const [deletingId, setDeletingId] = useState<string | null>(null)

  const toggleEdit = () => setIsEditing((current) => !current)

  const router = useRouter()

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      formSchema.parse(values)
      await axios.post(`/api/courses/${courseId}/attachments`, values)
      toast.success('Course updated')
      toggleEdit()
      router.refresh()
    } catch {
      toast.error('Something went wrong')
    } finally {
      setDeletingId(null)
    }
  }

  const onDelete = async (id: string) => {
    try {
      setDeletingId(id)
      await axios.delete(`/api/courses/${courseId}/attachments/${id}`)
      toast.success('Attachment deleted')
      router.refresh()
    } catch {
      toast.error('Something went wrong')
    } finally {
      setDeletingId(null)
    }
  }

  return (
    <div className="mt-6 rounded-md border bg-white p-4 dark:bg-slate-800 dark:border-gray-700">
      <div className="flex items-center justify-between font-medium dark:text-slate-200">
        Course attachments
        <Button onClick={toggleEdit} variant="ghost" className="dark:text-slate-400 dark:hover:bg-slate-700">
          {isEditing && <>Cancel</>}
          {!isEditing && (
            <>
              <PlusCircle className="mr-2 h-4 w-4" />
              Add a file
            </>
          )}
        </Button>
      </div>
      {!isEditing && (
        <>
          {initialData.attachments.length === 0 && (
            <p className="mt-2 text-sm italic text-slate-500 dark:text-slate-400">No attachments yet</p>
          )}
          {initialData.attachments.length > 0 && (
            <div className="space-y-2">
              {initialData.attachments.map((attachment) => (
                <div
                  key={attachment.id}
                  className="flex w-full items-center rounded-md border border-sky-200 bg-sky-100 p-3 text-sky-700 dark:border-sky-700 dark:bg-sky-900 dark:text-sky-200"
                >
                  <File className="mr-2 h-4 w-4 flex-shrink-0 dark:text-sky-400" />
                  <p className="line-clamp-1 text-xs dark:text-slate-200">{attachment.name}</p>
                  {deletingId === attachment.id && (
                    <div>
                      <Loader2 className="h-4 w-4 animate-spin dark:text-slate-400" />
                    </div>
                  )}
                  {deletingId !== attachment.id && (
                    <button onClick={() => onDelete(attachment.id)} className="ml-auto transition hover:opacity-75 dark:text-slate-400 dark:hover:text-red-500">
                      <X className="h-4 w-4" />
                    </button>
                  )}
                </div>
              ))}
            </div>
          )}
        </>
      )}
      {isEditing && (
        <div>
          <FileUpload
            endpoint="courseAttachment"
            onChange={(url) => {
              if (url) {
                onSubmit({ url })
              }
            }}
          />
          <div className="mt-4 text-xs text-muted-foreground dark:text-slate-400">
            Add anything your students might need to complete the course.
          </div>
        </div>
      )}
    </div>
  )
}

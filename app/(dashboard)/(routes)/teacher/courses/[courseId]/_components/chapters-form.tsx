'use client'

import * as z from 'zod'
import axios from 'axios'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Loader2, PlusCircle } from 'lucide-react'
import { useState } from 'react'
import toast from 'react-hot-toast'
import { useRouter } from 'next/navigation'
import { Chapter, Course } from '@prisma/client'
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { Input } from '@/components/ui/input'
import { ChaptersList } from './chapters-list'

interface ChaptersFormProps {
  initialData: Course & { chapters: Chapter[] }
  courseId: string
}

const formSchema = z.object({
  title: z.string().min(1),
})

export const ChaptersForm = ({ initialData, courseId }: ChaptersFormProps) => {
  const [isCreating, setIsCreating] = useState(false)
  const [isUpdating, setIsUpdating] = useState(false)

  const toggleCreating = () => {
    setIsCreating((current) => !current)
  }

  const router = useRouter()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: '',
    },
  })

  const { isSubmitting, isValid } = form.formState

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await axios.post(`/api/courses/${courseId}/chapters`, values)
      toast.success('Chapter created')
      toggleCreating()
      router.refresh()
    } catch {
      toast.error('Something went wrong')
    }
  }

  const onReorder = async (updateData: { id: string; position: number }[]) => {
    try {
      setIsUpdating(true)

      await axios.put(`/api/courses/${courseId}/chapters/reorder`, {
        list: updateData,
      })
      toast.success('Chapters reordered')
      router.refresh()
    } catch {
      toast.error('Something went wrong')
    } finally {
      setIsUpdating(false)
    }
  }

  const onEdit = (id: string) => {
    router.push(`/teacher/courses/${courseId}/chapters/${id}`)
  }

  return (
    <div className="relative mt-6 rounded-md border bg-white p-4 dark:bg-slate-800 dark:border-gray-700">
      {isUpdating && (
        <div className="rounded-m absolute right-0 top-0 flex h-full w-full items-center justify-center bg-slate-500/20 dark:bg-slate-900/50">
          <Loader2 className="h-6 w-6 animate-spin text-sky-700 dark:text-sky-400" />
        </div>
      )}
      <div className="flex items-center justify-between font-medium dark:text-slate-200">
        Course chapters
        <Button onClick={toggleCreating} variant="ghost" className="dark:text-slate-400 dark:hover:bg-slate-700">
          {isCreating ? (
            <>Cancel</>
          ) : (
            <>
              <PlusCircle className="mr-2 h-4 w-4" />
              Add a chapter
            </>
          )}
        </Button>
      </div>
      {isCreating && (
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="mt-4 space-y-4">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input 
                      disabled={isSubmitting} 
                      placeholder="e.g. 'Introduction to the course'" 
                      {...field} 
                      className="dark:bg-slate-900 dark:text-slate-200 dark:border-slate-700"
                    />
                  </FormControl>
                  <FormMessage className="dark:text-red-400" />
                </FormItem>
              )}
            />
            <Button disabled={!isValid || isSubmitting} type="submit" className="dark:bg-slate-200 dark:text-slate-900 dark:hover:bg-slate-300">
              Create
            </Button>
          </form>
        </Form>
      )}
      {!isCreating && (
        <div className={cn(
          'mt-2 text-sm',
          !initialData.chapters.length && 'italic text-slate-500',
          'dark:text-slate-400 dark:italic'
        )}>
          {!initialData.chapters.length && 'No chapters'}
          <ChaptersList onEdit={onEdit} onReorder={onReorder} items={initialData.chapters || []} />
        </div>
      )}
      {!isCreating && <p className="mt-4 text-xs text-muted-foreground dark:text-slate-400">Drag and drop to reorder the chapters</p>}
    </div>
  )
}

'use client'

import * as z from 'zod'
import axios from 'axios'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { useRouter } from 'next/navigation'

import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { Textarea } from '@/components/ui/textarea'

interface ChapterDescriptionFormProps {
  initialData: {
    description: string | null
  }
  courseId: string
  chapterId: string
}

const formSchema = z.object({
  description: z.string().min(1),
})

export const ChapterDescriptionForm = ({ initialData, courseId, chapterId }: ChapterDescriptionFormProps) => {
  const router = useRouter()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      description: initialData?.description || ''
    },
  })

  const { isSubmitting, isValid } = form.formState

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await axios.patch(`/api/courses/${courseId}/chapters/${chapterId}`, values)
      toast.success('Chapter updated')
      router.refresh()
    } catch {
      toast.error('Something went wrong')
    }
  }

  return (
    <div className="mt-6 rounded-md border bg-white p-4 dark:bg-slate-800 dark:border-gray-700">
      <div className="font-medium dark:text-slate-200 mb-4">
        Description
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Textarea
                    disabled={isSubmitting}
                    placeholder="e.g. 'This chapter is about...'"
                    {...field}
                    className="dark:bg-slate-900 dark:text-slate-200 dark:border-slate-700"
                  />
                </FormControl>
                <FormMessage className="dark:text-red-400" />
              </FormItem>
            )}
          />
          <div className="flex items-center gap-x-2">
            <Button
              disabled={!isValid || isSubmitting}
              type="submit"
              className="dark:bg-slate-200 dark:text-slate-900 dark:hover:bg-slate-300"
            >
              Save
            </Button>
          </div>
        </form>
      </Form>
    </div>
  )
}

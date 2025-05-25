'use client'

import * as z from 'zod'
import axios from 'axios'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import toast from 'react-hot-toast'
import { Category } from '@prisma/client'
import { BookOpen, Loader2, Sparkles } from 'lucide-react'

import { Form, FormControl, FormDescription, FormField, FormLabel, FormMessage, FormItem } from '@/components/ui/form'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

const formSchema = z.object({
  title: z.string().min(1, {
    message: 'Title is required',
  }),
  categoryId: z.string().min(1, {
    message: 'Category is required',
  }),
})

interface CourseFormProps {
  categories: Category[]
}

export const CourseForm = ({ categories }: CourseFormProps) => {
  const router = useRouter()
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: '',
      categoryId: '',
    },
  })

  const { isSubmitting, isValid } = form.formState

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const response = await axios.post('/api/courses', values)
      router.push(`/teacher/courses/${response.data.id}`)
      toast.success('Course created successfully! 🎉')
    } catch {
      toast.error('Something went wrong')
    }
  }

  return (
    <div className="space-y-8">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-lg font-medium bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 to-purple-500">
                  Course Title
                </FormLabel>
                <FormControl>
                  <Input 
                    disabled={isSubmitting} 
                    placeholder="e.g. 'Advanced web development'" 
                    {...field}
                    className="bg-white/50 dark:bg-slate-800/50 border-slate-200 dark:border-slate-700 focus:ring-2 focus:ring-indigo-500/20"
                  />
                </FormControl>
                <FormDescription className="text-slate-500 dark:text-slate-400">
                  What will you teach in this course?
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="categoryId"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-lg font-medium bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 to-purple-500">
                  Category
                </FormLabel>
                <Select
                  disabled={isSubmitting}
                  onValueChange={field.onChange}
                  value={field.value}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger className="bg-white/50 dark:bg-slate-800/50 border-slate-200 dark:border-slate-700 focus:ring-2 focus:ring-indigo-500/20">
                      <SelectValue
                        defaultValue={field.value}
                        placeholder="Select a category"
                      />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem
                        key={category.id}
                        value={category.id}
                      >
                        {category.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormDescription className="text-slate-500 dark:text-slate-400">
                  Choose a category for your course
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex items-center gap-x-2 pt-4">
            <Link href="/teacher/courses">
              <Button 
                type="button" 
                variant="ghost"
                className="hover:bg-slate-200/50 dark:hover:bg-slate-800/50"
              >
                Cancel
              </Button>
            </Link>
            <Button 
              type="submit" 
              disabled={!isValid || isSubmitting}
              className="bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 text-white"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Creating...
                </>
              ) : (
                <>
                  <Sparkles className="h-4 w-4 mr-2" />
                  Create Course
                </>
              )}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  )
} 
import { auth } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'
import { CircleDollarSign, File, LayoutDashboard, ListChecks, Sparkles } from 'lucide-react'

import { db } from '@/lib/db'
import { IconBadge } from '@/components/icon-badge'
import { TitleForm } from './_components/title-form'
import { DescriptionForm } from './_components/description-form'
import { ImageForm } from './_components/image-form'
import CategoryForm from './_components/category-form'
import { PriceForm } from './_components/price-form'
import { AttachmentForm } from './_components/attachment-form'
import { ChaptersForm } from './_components/chapters-form'
import { Banner } from '@/components/banner'
import Actions from './_components/actions'

type CourseIdPageProps = {
  params: {
    courseId: string
  }
}

const CourseIdPage = async ({ params }: CourseIdPageProps) => {
  const { userId } = await auth()

  if (!userId) {
    return redirect('/')
  }

  const course = await db.course.findUnique({
    where: { id: params.courseId, createdById: userId },
    include: { attachments: { orderBy: { createdAt: 'desc' } }, chapters: { orderBy: { position: 'asc' } } },
  })

  if (!course) {
    return redirect('/')
  }

  const categories = await db.category.findMany({
    orderBy: {
      name: 'asc',
    },
  })

  const requiredFields = [
    course.title,
    course.description,
    course.imageUrl,
    course.price,
    course.categoryId,
    course.chapters.some((chapter) => chapter.isPublished),
  ]

  const totalFields = requiredFields.length
  const completedFields = requiredFields.filter(Boolean).length

  const completionText = `(${completedFields}/${totalFields})`

  const isComplete = requiredFields.every(Boolean)

  return (
    <>
      {!course.isPublished && (
        <Banner 
          label="This course is unpublished. It will not be visible to the students." 
          variant="warning"
        />
      )}
      <div className="space-y-8 p-8">
        {/* Welcome Section */}
        <div className="flex flex-col space-y-4">
          <div className="flex items-center gap-3">
            <h1 className="text-4xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 to-purple-500">
              Course Setup 🎯
            </h1>
            <Sparkles className="h-8 w-8 text-yellow-400 animate-pulse" />
          </div>
          <div className="flex items-center justify-between">
            <p className="text-lg text-muted-foreground">
              Complete all fields to publish your course {completionText}
            </p>
            <Actions disabled={!isComplete} courseId={params.courseId} isPublished={course.isPublished} />
          </div>
        </div>

        {/* Course Setup Grid */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          {/* Left Column */}
          <div className="space-y-8">
            <div className="rounded-2xl border bg-gradient-to-br from-white/50 to-white/30 p-8 backdrop-blur-sm shadow-lg dark:from-gray-800/50 dark:to-gray-800/30 dark:border-gray-700">
              <div className="flex items-center gap-x-2 mb-8">
                <IconBadge icon={LayoutDashboard} />
                <h2 className="text-2xl font-bold text-blue-900 dark:text-blue-100">
                  Customize Your Course
                </h2>
              </div>
              <div className="space-y-6">
                <TitleForm initialData={course} courseId={course.id} />
                <DescriptionForm initialData={course} courseId={course.id} />
                <ImageForm initialData={course} courseId={course.id} />
                <CategoryForm
                  initialData={course}
                  courseId={course.id}
                  options={categories.map((category) => ({
                    label: category.name,
                    value: category.id,
                  }))}
                />
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-8">
            {/* Chapters Section */}
            <div className="rounded-2xl border bg-gradient-to-br from-white/50 to-white/30 p-8 backdrop-blur-sm shadow-lg dark:from-gray-800/50 dark:to-gray-800/30 dark:border-gray-700">
              <div className="flex items-center gap-x-2 mb-8">
                <IconBadge icon={ListChecks} />
                <h2 className="text-2xl font-bold text-blue-900 dark:text-blue-100">
                  Course Chapters
                </h2>
              </div>
              <ChaptersForm initialData={course} courseId={course.id} />
            </div>

            {/* Price Section */}
            <div className="rounded-2xl border bg-gradient-to-br from-white/50 to-white/30 p-8 backdrop-blur-sm shadow-lg dark:from-gray-800/50 dark:to-gray-800/30 dark:border-gray-700">
              <div className="flex items-center gap-x-2 mb-8">
                <IconBadge icon={CircleDollarSign} />
                <h2 className="text-2xl font-bold text-blue-900 dark:text-blue-100">
                  Sell Your Course
                </h2>
              </div>
              <PriceForm initialData={course} courseId={course.id} />
            </div>

            {/* Resources Section */}
            <div className="rounded-2xl border bg-gradient-to-br from-white/50 to-white/30 p-8 backdrop-blur-sm shadow-lg dark:from-gray-800/50 dark:to-gray-800/30 dark:border-gray-700">
              <div className="flex items-center gap-x-2 mb-8">
                <IconBadge icon={File} />
                <h2 className="text-2xl font-bold text-blue-900 dark:text-blue-100">
                  Resources & Attachments
                </h2>
              </div>
              <AttachmentForm initialData={course} courseId={course.id} />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default CourseIdPage

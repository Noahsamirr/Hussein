import { auth } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'

import { db } from '@/lib/db'
import { Categories } from './_component/category'
import { SearchInput } from '@/components/search-input'
import { getCourses } from '@/actions/get-courses'
import { CoursesList } from '@/components/courses-list'

interface SearchPageProps {
  searchParams: {
    title: string
    categoryId: string
  }
}

const SearchPage = async ({
  searchParams,
}: SearchPageProps) => {
  const { userId } = await auth()

  if (!userId) {
    return redirect('/')
  }

  const categories = await db.category.findMany({
    orderBy: {
      name: 'asc',
    },
  })

  const courses = await getCourses({
    userId,
    ...searchParams,
  })

  return (
    <div className="p-6 pt-20">
      <div className="mb-8">
        <SearchInput />
      </div>
      <div className="mb-8">
        <Categories items={categories} />
      </div>
      <div>
        <CoursesList items={courses} />
      </div>
    </div>
  )
}

export default SearchPage

import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  // Create categories
  const categories = await Promise.all([
    prisma.category.create({
      data: {
        name: 'Web Development',
      },
    }),
    prisma.category.create({
      data: {
        name: 'Mobile Development',
      },
    }),
    prisma.category.create({
      data: {
        name: 'Data Science',
      },
    }),
  ])

  // Create courses
  const courses = await Promise.all([
    prisma.course.create({
      data: {
        title: 'Complete Web Development Bootcamp',
        description: 'Learn web development from scratch. HTML, CSS, JavaScript, React, Node.js, and more!',
        imageUrl: '/courses/web-dev.jpg',
        price: 99.99,
        isPublished: true,
        categoryId: categories[0].id,
        createdById: 'user_2YJqXK1YQZ', // Replace with your Clerk user ID
      },
    }),
    prisma.course.create({
      data: {
        title: 'iOS App Development with Swift',
        description: 'Master iOS app development using Swift and SwiftUI. Build real-world applications!',
        imageUrl: '/courses/mobile-dev.jpg',
        price: 89.99,
        isPublished: true,
        categoryId: categories[1].id,
        createdById: 'user_2YJqXK1YQZ', // Replace with your Clerk user ID
      },
    }),
    prisma.course.create({
      data: {
        title: 'Data Science and Machine Learning',
        description: 'Learn data science, machine learning, and AI. Python, pandas, scikit-learn, and more!',
        imageUrl: '/courses/data-science.jpg',
        price: 79.99,
        isPublished: true,
        categoryId: categories[2].id,
        createdById: 'user_2YJqXK1YQZ', // Replace with your Clerk user ID
      },
    }),
  ])

  // Create chapters for each course
  for (const course of courses) {
    await Promise.all([
      prisma.chapter.create({
        data: {
          title: 'Introduction',
          description: 'Welcome to the course!',
          position: 1,
          isPublished: true,
          isFree: true,
          courseId: course.id,
        },
      }),
      prisma.chapter.create({
        data: {
          title: 'Getting Started',
          description: 'Setting up your development environment',
          position: 2,
          isPublished: true,
          isFree: false,
          courseId: course.id,
        },
      }),
      prisma.chapter.create({
        data: {
          title: 'Core Concepts',
          description: 'Understanding the fundamentals',
          position: 3,
          isPublished: true,
          isFree: false,
          courseId: course.id,
        },
      }),
      prisma.chapter.create({
        data: {
          title: 'Advanced Topics',
          description: 'Taking your skills to the next level',
          position: 4,
          isPublished: true,
          isFree: false,
          courseId: course.id,
        },
      }),
    ])
  }

  // Create purchases for the first two courses
  await Promise.all([
    prisma.purchase.create({
      data: {
        userId: 'user_2YJqXK1YQZ', // Replace with your Clerk user ID
        courseId: courses[0].id,
      },
    }),
    prisma.purchase.create({
      data: {
        userId: 'user_2YJqXK1YQZ', // Replace with your Clerk user ID
        courseId: courses[1].id,
      },
    }),
  ])

  // Create user progress for the first course
  const firstCourseChapters = await prisma.chapter.findMany({
    where: { courseId: courses[0].id },
    orderBy: { position: 'asc' },
  })

  // Mark first two chapters as completed
  await Promise.all([
    prisma.userProgress.create({
      data: {
        userId: 'user_2YJqXK1YQZ', // Replace with your Clerk user ID
        chapterId: firstCourseChapters[0].id,
        isCompleted: true,
      },
    }),
    prisma.userProgress.create({
      data: {
        userId: 'user_2YJqXK1YQZ', // Replace with your Clerk user ID
        chapterId: firstCourseChapters[1].id,
        isCompleted: true,
      },
    }),
  ])

  console.log('Database has been seeded! 🌱')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  }) 
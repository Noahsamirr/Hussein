import { auth } from '@clerk/nextjs/server'
import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { isTeacher } from '@/lib/teacher'
import { Prisma } from '@prisma/client'

export async function POST(request: NextRequest) {
  try {
    // Test database connection first
    try {
      await db.$connect()
      console.log('Database connection successful')
    } catch (connectionError) {
      console.error('Database connection failed:', connectionError)
      return new NextResponse('Database connection failed', { status: 500 })
    }

    const { userId } = await auth()
    console.log('Auth userId:', userId)

    if (!userId) {
      return new NextResponse('Unauthorized - No user ID', { status: 401 })
    }

    // For development, allow any authenticated user to create courses
    // In production, you should use the isTeacher check
    // if (!isTeacher(userId)) {
    //   return new NextResponse('Unauthorized - Not a teacher', { status: 401 })
    // }

    const body = await request.json()
    console.log('Request body:', body)
    const { title } = body

    if (!title) {
      return new NextResponse('Title is required', { status: 400 })
    }

    try {
      console.log('Attempting to create course with:', { title, userId })

      const course = await db.course.create({
        data: {
          title,
          createdById: userId,
        },
      })

      console.log('Course created successfully:', course)
      return NextResponse.json(course)
    } catch (dbError) {
      console.error('[COURSES_POST_DB_ERROR]', dbError)
      
      if (dbError instanceof Prisma.PrismaClientKnownRequestError) {
        console.error('Prisma error code:', dbError.code)
        console.error('Prisma error message:', dbError.message)
        
        if (dbError.code === 'P2002') {
          return new NextResponse('A course with this title already exists', { status: 400 })
        }
        if (dbError.code === 'P2025') {
          return new NextResponse('Database record not found', { status: 404 })
        }
      }
      
      if (dbError instanceof Prisma.PrismaClientInitializationError) {
        console.error('Database connection error:', dbError.message)
        return new NextResponse('Database connection error', { status: 500 })
      }

      throw dbError
    } finally {
      await db.$disconnect()
    }
  } catch (error) {
    console.error('[COURSES_POST_ERROR]', error)
    
    if (error instanceof SyntaxError) {
      return new NextResponse('Invalid request body', { status: 400 })
    }

    return new NextResponse(
      'Internal Server Error - Please check server logs for details', 
      { status: 500 }
    )
  }
}

import { auth } from '@clerk/nextjs/server'
import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { isTeacher } from '@/lib/teacher'
import { Prisma } from '@prisma/client'

export async function POST(request: NextRequest) {
  try {
    const { userId } = await auth()
    const { title } = await request.json()

    if (!userId) {
      return new NextResponse('Unauthorized - No user ID', { status: 401 })
    }

    // For development, allow any authenticated user to create courses
    // In production, you should use the isTeacher check
    // if (!isTeacher(userId)) {
    //   return new NextResponse('Unauthorized - Not a teacher', { status: 401 })
    // }

    if (!title) {
      return new NextResponse('Title is required', { status: 400 })
    }

    try {
      const course = await db.course.create({
        data: {
          title,
          createdById: userId,
        },
      })

      return NextResponse.json(course)
    } catch (dbError) {
      console.error('[COURSES_POST_DB_ERROR]', dbError)
      
      if (dbError instanceof Prisma.PrismaClientKnownRequestError) {
        // Handle specific Prisma errors
        if (dbError.code === 'P2002') {
          return new NextResponse('A course with this title already exists', { status: 400 })
        }
        if (dbError.code === 'P2025') {
          return new NextResponse('Database record not found', { status: 404 })
        }
      }
      
      // Check if it's a connection error
      if (dbError instanceof Prisma.PrismaClientInitializationError) {
        console.error('Database connection error:', dbError.message)
        return new NextResponse('Database connection error', { status: 500 })
      }

      throw dbError // Re-throw to be caught by outer catch
    }
  } catch (error) {
    console.error('[COURSES_POST_ERROR]', error)
    
    // Check if it's a JSON parsing error
    if (error instanceof SyntaxError) {
      return new NextResponse('Invalid request body', { status: 400 })
    }

    return new NextResponse(
      'Internal Server Error - Please check server logs for details', 
      { status: 500 }
    )
  }
}

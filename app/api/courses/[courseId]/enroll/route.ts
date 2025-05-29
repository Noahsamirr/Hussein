import { currentUser } from '@clerk/nextjs/server'
import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function POST(req: NextRequest, { params }: { params: Promise<{ courseId: string }> }) {
  try {
    const resolvedParams = await params
    const user = await currentUser()
    if (!user || !user.id) {
      return new NextResponse('Unauthorized', { status: 401 })
    }

    const course = await db.course.findUnique({ where: { id: resolvedParams.courseId, isPublished: true } })
    if (!course) {
      return new NextResponse('Course not found!', { status: 404 })
    }

    // Check if course is free
    if (course.price !== 0) {
      return new NextResponse('Course is not free', { status: 400 })
    }

    const purchase = await db.purchase.findUnique({
      where: { userId_courseId: { userId: user.id, courseId: resolvedParams.courseId } },
    })

    if (purchase) {
      return new NextResponse('Already enrolled', { status: 400 })
    }

    // Create purchase record for free course
    await db.purchase.create({
      data: {
        userId: user.id,
        courseId: course.id,
      },
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('[COURSE_ENROLL]', error)
    return new NextResponse('Internal server error', { status: 500 })
  }
} 
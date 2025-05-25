import { NextResponse } from 'next/server'

export async function GET() {
  return NextResponse.json({
    hasUploadThingSecret: !!process.env.UPLOADTHING_SECRET,
    // Don't log the actual secret for security
  })
} 
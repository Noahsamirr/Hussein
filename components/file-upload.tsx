'use client'

import toast from 'react-hot-toast'
import { UploadDropzone } from '@/lib/uploadthing'
import { ourFileRouter } from '@/app/api/uploadthing/core'

interface FileUploadProps {
  onChange: (url?: string) => void
  endpoint: keyof typeof ourFileRouter
}

export const FileUpload = ({ onChange, endpoint }: FileUploadProps) => {
  return (
    <div className="border-2 border-dashed border-slate-200 dark:border-slate-700 rounded-lg p-4">
      <UploadDropzone
        endpoint={endpoint}
        onClientUploadComplete={(res) => {
          onChange(res?.[0].url)
        }}
        onUploadError={(error: Error) => {
          toast.error(`${error?.message}`)
        }}
        appearance={{
          container: "border-0",
          allowedContent: "text-slate-500 dark:text-slate-400",
          button: "bg-slate-200 dark:bg-slate-700 text-slate-900 dark:text-slate-200 hover:bg-slate-300 dark:hover:bg-slate-600",
          label: "text-slate-900 dark:text-slate-200 font-medium",
          uploadIcon: "text-slate-500 dark:text-slate-400",
        }}
      />
    </div>
  )
}

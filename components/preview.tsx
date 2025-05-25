'use client'

import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'

interface PreviewProps {
  value: string
}

export const Preview = ({ value }: PreviewProps) => {
  const editor = useEditor({
    extensions: [StarterKit],
    content: value,
    editable: false,
  })

  return (
    <div className="prose prose-sm dark:prose-invert max-w-full">
      <EditorContent editor={editor} />
    </div>
  )
}

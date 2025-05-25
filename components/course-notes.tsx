'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Save, Trash2, Plus } from 'lucide-react'
import { toast } from 'react-hot-toast'

interface Note {
  id: string
  content: string
  timestamp: string
  createdAt: Date
}

interface CourseNotesProps {
  courseId: string
  chapterId: string
}

export const CourseNotes = ({
  courseId,
  chapterId
}: CourseNotesProps) => {
  const [notes, setNotes] = useState<Note[]>([])
  const [currentNote, setCurrentNote] = useState('')
  const [isEditing, setIsEditing] = useState(false)

  const handleAddNote = () => {
    if (!currentNote.trim()) {
      toast.error('Note cannot be empty')
      return
    }

    const newNote: Note = {
      id: Math.random().toString(36).substr(2, 9),
      content: currentNote,
      timestamp: new Date().toLocaleTimeString(),
      createdAt: new Date()
    }

    setNotes([...notes, newNote])
    setCurrentNote('')
    setIsEditing(false)
    toast.success('Note added successfully')
  }

  const handleDeleteNote = (noteId: string) => {
    setNotes(notes.filter(note => note.id !== noteId))
    toast.success('Note deleted')
  }

  return (
    <div className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold">Course Notes</h3>
        {!isEditing && (
          <Button
            onClick={() => setIsEditing(true)}
            size="sm"
            variant="outline"
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Note
          </Button>
        )}
      </div>

      {isEditing && (
        <div className="mb-4">
          <Textarea
            placeholder="Type your note here..."
            value={currentNote}
            onChange={(e) => setCurrentNote(e.target.value)}
            className="mb-2"
          />
          <div className="flex justify-end space-x-2">
            <Button
              onClick={() => {
                setIsEditing(false)
                setCurrentNote('')
              }}
              variant="ghost"
              size="sm"
            >
              Cancel
            </Button>
            <Button
              onClick={handleAddNote}
              size="sm"
            >
              <Save className="h-4 w-4 mr-2" />
              Save Note
            </Button>
          </div>
        </div>
      )}

      <div className="space-y-4">
        {notes.length === 0 ? (
          <p className="text-sm text-gray-500 dark:text-gray-400 text-center py-4">
            No notes yet. Click "Add Note" to start taking notes.
          </p>
        ) : (
          notes.map((note) => (
            <div
              key={note.id}
              className="p-3 bg-gray-50 dark:bg-gray-700 rounded-lg"
            >
              <div className="flex justify-between items-start mb-2">
                <span className="text-xs text-gray-500 dark:text-gray-400">
                  {note.timestamp}
                </span>
                <Button
                  onClick={() => handleDeleteNote(note.id)}
                  variant="ghost"
                  size="sm"
                  className="h-8 w-8 p-0"
                >
                  <Trash2 className="h-4 w-4 text-red-500" />
                </Button>
              </div>
              <p className="text-sm whitespace-pre-wrap">
                {note.content}
              </p>
            </div>
          ))
        )}
      </div>
    </div>
  )
} 
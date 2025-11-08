import { AddNoteForm } from '@/components/Notes/AddNoteForm'

function NotesPanel() {
  return (
    <>
      <div className='mt-6'>
        <div className='mt-2'>
          <AddNoteForm />
        </div>
      </div>
    </>
  )
}

export { NotesPanel }
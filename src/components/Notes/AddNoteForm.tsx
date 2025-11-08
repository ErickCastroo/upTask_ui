import { useForm } from 'react-hook-form'
import { useMutation } from '@tanstack/react-query'
import { useLocation, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'

import { addNote } from '@/api/notes'

import { NoteFormData } from '@/types'

function AddNoteForm() {

  const params = useParams()
  const location =useLocation()

  const queryParams = new URLSearchParams(location.search)

  const projectId = params.projectId!
  const taskId = queryParams.get('viewTask')!
  

  const initialValues: NoteFormData = {
    content: ''
  }

  const { register, handleSubmit, reset, formState: { errors } } = useForm({
    defaultValues: initialValues
  })

  const { mutate } = useMutation({
    mutationFn: addNote,
    onSuccess: () => {
      reset()
      toast.success('Nota agregada correctamente')
    },
    onError: (error: Error) => {
      console.error('Error al agregar la nota:', error.message)
    }
  })

  const handleAddNote = (data: NoteFormData) => {
    mutate({ formdata: data, projectId, taskId })
  }
  return (
    <form onSubmit={handleSubmit(handleAddNote)}
      className='space-y-3'
      noValidate
    >
      <div className='flex flex-col gap-2'>
        <label htmlFor='note' className='font-bold text-purple-950'>Agregar Nota</label>

        <input
          type='text'
          id='content'
          {...register('content', { required: true })}
          placeholder='Escribe tu nota aquí...'
          className='w-full p-3 border border-purple-300 hover:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500'
        />
        {errors.content && <span className='text-red-500 text-sm'>Este campo es obligatorio</span>}
      </div>
      <input
        type='submit'
        value='Agregar Nota'
        className='px-4 py-2 bg-purple-600 text-white font-semibold rounded hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500'
      />

    </form>
  )
}

export { AddNoteForm }
import { FieldErrors, UseFormRegister } from 'react-hook-form'
import { TaskFormTypes } from '@/types'

type TaskFormProps = {
  errors: FieldErrors<TaskFormTypes>
  register: UseFormRegister<TaskFormTypes>
}

export default function TaskForm({ register }: TaskFormProps) {
  return (
    <>
      <div className='flex flex-col gap-2'>
        <label
          className='font-normal text-2xl text-purple-950'
          htmlFor='name'
        >Nombre de la tarea</label>
        <input
          id='name'
          type='text'
          placeholder='Nombre de la tarea'
          className='w-full p-3 mb-3 border rounded-lg border-purple-300 hover:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500'
          {...register('name', {
            required: 'El nombre de la tarea es obligatorio',
          })}
        />
      </div>
      <div className='flex flex-col gap-2'>
        <label
          className='font-normal text-2xl text-purple-950'
          htmlFor='description'
        >Descripción de la tarea</label>
        <textarea
          id='description'
          placeholder='Descripción de la tarea'
          className='w-full p-3 mb-3 border rounded-lg border-purple-300 hover:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500'
          {...register('description', {
            required: 'La descripción de la tarea es obligatoria'
          })}
        />
      </div>
    </>
  )
}
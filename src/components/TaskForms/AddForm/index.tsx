import { FieldErrors, UseFormRegister } from 'react-hook-form'
import { TaskFormTypes } from '@/types'

type TaskFormProps = {
  errors: FieldErrors<TaskFormTypes>
  register: UseFormRegister<TaskFormTypes>
}

export default function TaskForm({ register }: TaskFormProps) {
  return (
    <>
      <div className='flex flex-col gap-5'>
        <label
          className='font-normal text-2xl text-purple-950'
          htmlFor='name'
        >Nombre de la tarea</label>
        <input
          id='name'
          type='text'
          placeholder='Nombre de la tarea'
          className='w-full p-3 border border-purple-300 hover:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500'
          {...register('name', {
            required: 'El nombre de la tarea es obligatorio',
          })}
        />
      </div>

      <div className='flex flex-col gap-5'>
        <label
          className='font-normal text-2xl text-purple-950'
          htmlFor='description'
        >Descripción de la tarea</label>
        <textarea
          id='description'
          placeholder='Descripción de la tarea'
          className='w-full p-3 border border-purple-300 hover:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500'
          {...register('description', {
            required: 'La descripción de la tarea es obligatoria'
          })}
        />
      </div>

      <div className='flex flex-col gap-5'>
        <label
          className='font-normal text-2xl text-purple-950'
          htmlFor='status'
        >Estado de la tarea</label>
        <select
          id='status'
          className='w-full p-3 border border-purple-300 hover:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500'
        >
          <option defaultChecked value='pending'>Pendiente</option>
          <option value='onHold'>En Espera</option>
          <option value='inProgress'>En Progreso</option>
          <option value='underReview'>En Revision</option>
          <option value='completed'>Completada</option>
        </select>
      </div>
    </>
  )
}
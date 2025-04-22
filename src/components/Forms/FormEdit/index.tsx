import { ErrorMessage } from '@/components/ErrorMessage'
import { ProjectFormTypes } from '@/types'
import { useEffect } from 'react'
import { UseFormRegister, FieldErrors, useForm } from 'react-hook-form'

type ProjectFormProps = {
  data: ProjectFormTypes
  register: UseFormRegister<ProjectFormTypes>
  errors: FieldErrors<ProjectFormTypes>
}

function FormEdit({ data }: ProjectFormProps) {

  const initialValues: ProjectFormTypes = {
    projectName: data.projectName || '',
    clientName: data.clientName || '',
    description: data.description || '',
  }


  const { register, reset, formState: { errors } } = useForm<ProjectFormTypes>({
    defaultValues: initialValues,
  })
  useEffect(() => {
    if (data) {
      reset(data)
    }
  }, [data, reset])

  return (
    <>
      <div className='mb-5 space-y-3'>
        <label htmlFor='projectName' className='text-sm text-purple-900 uppercase font-bold'>
          Nombre del Proyecto
        </label>
        <input
          id='projectName'
          className='w-full p-3 text-purple-500 font-bold border border-gray-200'
          type='text'
          placeholder='Nombre del Proyecto'
          {...register('projectName', {
            required: 'El Titulo del Proyecto es obligatorio',
          })}
        />

        {errors.projectName && (
          <ErrorMessage>{errors.projectName.message}</ErrorMessage>
        )}
      </div>

      <div className='mb-5 space-y-3'>
        <label htmlFor='clientName' className='text-sm text-purple-900 uppercase font-bold'>
          Nombre Cliente
        </label>
        <input
          id='clientName'
          className='w-full p-3 text-purple-500 font-bold border border-gray-200'
          type='text'
          placeholder='Nombre del Cliente'
          {...register('clientName', {
            required: 'El Nombre del Cliente es obligatorio',
          })}
        />

        {errors.clientName && (
          <ErrorMessage>{errors.clientName.message}</ErrorMessage>
        )}
      </div>

      <div className='mb-5 space-y-3'>
        <label htmlFor='description' className='text-sm text-purple-900 uppercase font-bold'>
          Descripción
        </label>
        <textarea
          id='description'
          className='w-full p-3 text-purple-500 font-bold border border-gray-200'
          placeholder='Descripción del Proyecto'
          {...register('description')}
        />
      </div>
    </>
  )
}

export { FormEdit }
/* eslint-disable react-hooks/rules-of-hooks */
import { useEffect } from 'react'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import { useMutation } from '@tanstack/react-query'
import { UseFormRegister, FieldErrors, useForm } from 'react-hook-form'

import { UpdateProjectById } from '@/api/project'
import { ProjectFormTypes } from '@/types'

import { IsLoadingForm } from '@/components/IsLoadingForms'
import { ErrorMessage } from '@/components/ErrorMessage'


type ProjectFormProps = {
  data: ProjectFormTypes
  projectId: string
  register: UseFormRegister<ProjectFormTypes>
  errors: FieldErrors<ProjectFormTypes>
  isLoading: boolean
}

function FormEdit({ data, projectId, isLoading }: ProjectFormProps) {
  const initialValues: ProjectFormTypes = {
    projectName: data.projectName || '',
    clientName: data.clientName || '',
    description: data.description || '',
  }

  const navigate = useNavigate()

  const { register, handleSubmit, reset, formState: { errors } } = useForm<ProjectFormTypes>({
    defaultValues: initialValues,
  })
  useEffect(() => {
    if (data) {
      reset(data)
    }
  }, [data, reset])

  if (isLoading) {
    return <IsLoadingForm />
  }

  const { mutate } = useMutation({
    mutationFn: UpdateProjectById,
    onSuccess: () => {
      navigate('/')
      toast.success('Proyecto actualizado correctamente')
    },
    onError: (error) => {
      navigate('/')
      toast.error(`Error al actualizar el proyecto: ${error.message}`)
    }
  })

  const onClick = async (formData: ProjectFormTypes) => {
    const data = {
      formData,
      projectId,
    }
    mutate(data)
    reset(initialValues)
  }

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
    
      <input
          type='submit'
          className='bg-indigo-600 text-white px-4 py-2 rounded-lg mt-5 inline-block hover:bg-indigo-700 transition-colors font-semibold cursor-pointer'
          value='Editar'
          onClick={handleSubmit(onClick)}
        />
    </>
  )
}

export { FormEdit }
import { Link, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'

import { useMutation } from '@tanstack/react-query'

import { CreateProject } from '@/api/project'
import { initialValues } from '@/libs/initialValues'

import { ProjectFormTypes } from '@/types'

import { ProjectForm } from '@/components/Forms/FormCreate'

function ProjectCreate() {
  const navigate = useNavigate()

  const { register, handleSubmit, formState: { errors } } = useForm({defaultValues: initialValues})

  const mutation = useMutation({
    mutationFn: CreateProject,
    onError: (error) => {
      toast.error(error.message)
      navigate('/')
    },
    onSuccess: () => {
      toast.success('Proyecto creado correctamente')
      navigate('/')
    },
  })

  const onSubmit = async (data: ProjectFormTypes) => mutation.mutate(data)

  return (
    <div className='max-w-3xl mx-auto'>
      <h1 className='text-5xl font-black'>Crear Proyecto</h1>
      <Link
        to='/'
        className='bg-purple-600 text-white px-4 py-2 rounded-lg mt-5 inline-block hover:bg-purple-700 transition-colors font-semibold'
      >
        Volver
      </Link>
      <form
        className='mt-5 bg-white shadow-lg rounded-lg p-10'
        noValidate
      >
        <ProjectForm register={register} errors={errors} />
        <input
          type='button'
          onClick={handleSubmit(onSubmit)}
          className='bg-indigo-600 text-white px-4 py-2 rounded-lg mt-5 inline-block hover:bg-indigo-700 transition-colors font-semibold cursor-pointer'
          value='Crear'
        />
      </form>
    </div>
  )
}

export { ProjectCreate }
import { Link, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'

import { CreateProject } from '@/api/project'
import { ProjectFormTypes } from '@/types'

import { ProjectForm } from '@/components/Form'

function ProyectCreate() {
  const navigate = useNavigate()

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const initialValues: ProjectFormTypes = {
    projectName: '',
    clientName: '',
    description: '',
  }

  const { register, handleSubmit, formState: { errors } } = useForm<ProjectFormTypes>()

  const onSubmit = async (data: ProjectFormTypes) => {
    const res = await CreateProject(data)
    if (res) {
      toast.success('Proyecto creado correctamente')
      navigate('/')
      return
    }
    toast.error('Error al crear el proyecto')
    navigate('/')
  }
  return (
    <div className='max-w-3xl mx-auto'>
      <h1 className='text-5xl font-black'> Crear Proyecto</h1>
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

export { ProyectCreate }
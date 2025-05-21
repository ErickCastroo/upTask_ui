import { useEffect } from 'react'
import { toast } from 'react-toastify'
import { useForm } from 'react-hook-form'
import { useQuery } from '@tanstack/react-query'
import { Link, useNavigate, useParams } from 'react-router-dom'

import { GetProjectById } from '@/api/project'
import { ProjectFormTypes } from '@/types'

import { FormEdit } from '@/components/Forms/FormEdit'

function ProjectEdit() {
  const navigate = useNavigate()
  const params = useParams()
  const projectId = params.projectId!

  const { data, isError, isLoading } = useQuery({
    queryKey: ['editProject', projectId],
    queryFn: () => GetProjectById(projectId),
    retry: false,
  })

  const { register, formState: { errors } } = useForm<ProjectFormTypes>()

  useEffect(() => {
    if (isError) {
      toast.error('Error al cargar el proyecto')
      navigate('/')
    }
  }, [isError, navigate])

  return (
    <div className='max-w-3xl mx-auto'>
      <h1 className='text-5xl font-black'>Editar Proyecto</h1>
      <Link
        to='/'
        className='bg-purple-600 text-white px-4 py-2 rounded-lg mt-5 inline-block hover:bg-purple-700 transition-colors font-semibold'
      >
        Volver
      </Link>
      <form
        className='mt-5 bg-white shadow-lg rounded-xl p-10'
        noValidate
      >
        {data && (
          <FormEdit data={data} projectId={projectId} isLoading={isLoading} register={register} errors={errors} />
        )}
      </form>
    </div>
  ) 
}

export { ProjectEdit }



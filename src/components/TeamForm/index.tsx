import { useForm } from 'react-hook-form'
import { useParams } from 'react-router-dom'
import { useMutation } from '@tanstack/react-query'
import { TeamMemberForm } from '@/types'
import { findUserByEmail } from '@/api/Team'
import { TeamSearch } from '../TeamSearch'

export function AddMemberForm() {
  const initialValues: TeamMemberForm = {
    email: ''
  }
  const params = useParams()
  const projectId = params.projectId!

  const { register, handleSubmit, reset } = useForm({ defaultValues: initialValues })

  const mutation = useMutation({
    mutationFn: findUserByEmail,
  })

  const handleSearchUser = async (formdata: TeamMemberForm) => {
    const data = {
      projectId,
      formdata
    }
    mutation.mutate(data)

  }

  const resetdata = () => {
    reset()
    mutation.reset()
  }

  return (
    <>
      <form
        className='mt-10 space-y-5'
        onSubmit={handleSubmit(handleSearchUser)}
        noValidate
      >

        <div className='flex flex-col gap-3'>
          <label
            className='font-normal text-2xl'
            htmlFor='name'
          >E-mail de Usuario</label>
          <input
            id='name'
            type='text'
            placeholder='E-mail del usuario a Agregar'
            className='w-full p-3  border-gray-300 border'
            {...register('email', {
              required: 'El Email es obligatorio',
              pattern: {
                value: /\S+@\S+\.\S+/,
                message: 'E-mail no válido',
              },
            })}
          />
        </div>

        <input
          type='submit'
          className=' bg-fuchsia-600 hover:bg-fuchsia-700 w-full p-3  text-white font-black  text-xl cursor-pointer'
          value='Buscar Usuario'
        />
      </form>

      {mutation.isPending && (
        <div className='mt-5 text-center'>
          <p className='text-gray-500'>Buscando usuario...</p>
        </div>
      )}
      {mutation.isError && (
        <div className='mt-5 text-center'>
          <p className='text-red-500'>Usuario no encontrado</p>
        </div>
      )}

      {
        mutation.data && (
          <TeamSearch user={mutation.data} resetdata={resetdata} />
        )
      }
    </>
  )
}
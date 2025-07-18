import { Fragment } from 'react/jsx-runtime'
import { toast, ToastContainer } from 'react-toastify'
import { useNavigate, useParams, Link } from 'react-router-dom'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'


import { useIsProjectManager } from '@/hook/useManager'
import { GetMembers, removeUserMember } from '@/api/Team'

import { Menu, Transition } from '@headlessui/react'
import AddMemberModal from '@/components/admemberModal'

import { EllipsisVerticalIcon } from '@heroicons/react/20/solid'



function TeamProject() {
  const queryClient = useQueryClient()
  const navigate = useNavigate()
  const params = useParams()
  const projectId = params.projectId!
  const { data, isLoading } = useQuery({
    queryKey: ['projectTeam', projectId],
    queryFn: () => GetMembers(projectId),
    retry: false,
  })
  const isManager = useIsProjectManager(projectId)

  const { mutate } = useMutation({
    mutationFn: removeUserMember,
    onSuccess: () => {
      toast.success('Usuario eliminado del equipo correctamente', {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      })
      queryClient.invalidateQueries({ queryKey: ['projectTeam', projectId] })
    },

    onError: () => {
      toast.error(`Error al eliminar el usuario del equipo`, {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      })
    },

  })

  if (isLoading) return <div className='text-center text-gray-500'>Cargando...</div>

  return (
    <>
      <ToastContainer />
      <h1 className='text-5xl font-black'> Administrar Equipo</h1>
      <p className='text-2xl font-light mt-5'>Aministrar el equipo de trabajo</p>
      <nav className='my-5 flex gap-2'>

        {isManager && (
          <button
            className='bg-indigo-600 text-white px-10 py-3 rounded-lg inline-block hover:bg-indigo-800 transition-colors font-semibold'
            onClick={() => navigate(location.pathname + '?addMember=true')}
          >
            Agregar Usuario
          </button>
        )}
        <Link to={`/project/${projectId}`} className='bg-indigo-600 text-white px-10 py-3 rounded-lg inline-block hover:bg-indigo-800 transition-colors font-semibold'>
          Volver
        </Link>
      </nav>
      <h2 className='text-5xl font-black my-10'>Miembros actuales</h2>
      {data?.length ? (
        <ul role='list' className='divide-y divide-gray-100 border border-gray-100 mt-10 bg-white shadow-lg'>
          {data?.map((member) => (
            <li key={member._id} className='flex justify-between gap-x-6 px-5 py-10'>
              <div className='flex min-w-0 gap-x-4'>
                <div className='min-w-0 flex-auto space-y-2'>
                  <p className='text-2xl font-black text-gray-600'>
                    {member.name}
                  </p>
                  <p className='text-sm text-gray-400'>
                    {member.email}
                  </p>
                </div>
              </div>
              <div className='flex shrink-0 items-center gap-x-6'>
                <Menu as='div' className='relative flex-none'>
                  <Menu.Button className='-m-2.5 block p-2.5 text-gray-500 hover:text-gray-900'>
                    <span className='sr-only'>opciones</span>
                    <EllipsisVerticalIcon className='h-9 w-9' aria-hidden='true' />
                  </Menu.Button>
                  <Transition
                    as={Fragment}
                    enter='transition ease-out duration-100'
                    enterFrom='transform opacity-0 scale-95'
                    enterTo='transform opacity-100 scale-100'
                    leave='transition ease-in duration-75'
                    leaveFrom='transform opacity-100 scale-100'
                    leaveTo='transform opacity-0 scale-95'
                  >
                    <Menu.Items className='absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white py-2 shadow-lg ring-1 ring-gray-900/5 focus:outline-none'>
                      <Menu.Item>
                        <button
                          type='button'
                          onClick={() => mutate({ projectId, userid: member._id })}
                          className='block px-3 py-1 text-sm leading-6 text-red-500'
                        >
                          Eliminar del Proyecto
                        </button>
                      </Menu.Item>
                    </Menu.Items>
                  </Transition>
                </Menu>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p className='text-center py-20'>No hay miembros en este equipo</p>
      )}
      <AddMemberModal />
    </>
  )
}

export { TeamProject }
import { Fragment } from 'react'
import { toast } from 'react-toastify'
import { Link } from 'react-router-dom'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

import { useAuth } from '@/hook/useAuth'

import { DeleteProjectById, GetProject } from '@/api/project'

import { Menu, MenuButton, MenuItem, MenuItems, Transition } from '@headlessui/react'
import { EllipsisVerticalIcon } from '@heroicons/react/20/solid'

import { IsLoading } from '@/components/isLoading'

function Home() {
  const { data: user, isLoading: isLoadingUser } = useAuth()
  const { data, isLoading } = useQuery({
    queryKey: ['projects'],
    queryFn: GetProject
  })

  const queryClient = useQueryClient()
  const { mutate } = useMutation({
    mutationFn: DeleteProjectById,
    onSuccess: () => {
      toast.success('Proyecto eliminado correctamente')
      queryClient.invalidateQueries({ queryKey: ['projects'] })
    },
    onError: () => {
      toast.error(`Error al eliminar el proyecto`)
    }
  })

  if (isLoading && isLoadingUser) return <IsLoading />

  return (
    <div className='container mx-auto mt-10 p-2 md:p-0'>
      <h1 className='text-5xl font-black'>Mis proyectos</h1>
      <p className='text-xl text-purple-500 font-black mt-5'>Administra tus proyectos</p>
      <Link
        to='/project/new'
        className='bg-purple-600 text-white px-4 py-2 rounded-lg mt-5 mb-5 inline-block hover:bg-purple-700 transition-colors font-semibold'
      >
        Crear Proyecto
      </Link>
      {user && data && data.length === 0 ? (

        <footer className='absolute bottom-0 left-0 right-0 flex items-center justify-center h-96'>
          <p className='text-center justify-center text-gray-600'>
            No hay proyectos {' '}
            <Link to='/project/new' className='text-indigo-500 hover:underline'>
              Crear Proyecto
            </Link>
          </p>
        </footer>
      ) : (
        <div className=' max-h-[50vh] overflow-y-auto'>
          <ul role='list' className=' space-y-6 mt-10'>
            {data?.map((project) => (
              <li
                key={project._id}
                className='flex justify-between gap-x-6 px-5 py-8 bg-white shadow-md rounded-xl border border-gray-100'
              >
                <div className='flex min-w-0 gap-x-4'>
                  <div className='min-w-0 flex-auto space-y-2'>
                    {
                      project.manager === user?._id ? (
                        <p className='text-sm text-purple-400 border-2 border-purple-300 rounded-lg px-5 py-1 font-black'>
                          Administrador
                        </p>
                      ) : (
                        <p className='text-sm text-purple-400 border-2 border-purple-300 rounded-lg px-5 py-1 font-black'>
                          Colaborador
                        </p>
                      )
                    }
                    <Link
                      to={`/project/${project._id}`}
                      className='text-gray-400 hover:text-purple-500 cursor-pointer hover:underline text-3xl font-bold'
                    >
                      {project.projectName}
                    </Link>
                    <p className='text-sm text-purple-500 font-extrabold'>
                      Cliente: {project.clientName}
                    </p>
                    <p className='text-sm text-purple-600 font-black'>
                      {project.description}
                    </p>
                  </div>
                </div>
                <div className='flex shrink-0 items-center gap-x-6'>
                  <Menu as='div' className='relative flex-none '>
                    <MenuButton className='-m-2.5 block p-2.5 text-gray-500 hover:text-purple-800'>
                      <span className='sr-only'>opciones</span>
                      <EllipsisVerticalIcon className='h-9 w-9 hover:text-purple-800' aria-hidden='true' />
                    </MenuButton>
                    <Transition
                      as={Fragment}
                      enter='transition ease-out duration-100 '
                      enterFrom='transform opacity-0 scale-95'
                      enterTo='transform opacity-100 scale-100'
                      leave='transition ease-in duration-75'
                      leaveFrom='transform opacity-100 scale-100'
                      leaveTo='transform opacity-0 scale-95'
                    >
                      <MenuItems className='absolute right-0 z-10 mt-2 w-56 shrink rounded-xl bg-white p-4 text-sm font-semibold leading-6 text-gray-900 shadow-lg ring-1 ring-gray-900/5'>
                        <MenuItem>
                          <Link
                            to={`/project/${project._id}`}
                            className='block p-2 mt-2 hover:text-purple-950 hover:bg-purple-100 rounded-lg'
                          >
                            Ver Proyecto
                          </Link>
                        </MenuItem>
                        {
                          project.manager === user?._id && (
                            <>
                              <MenuItem>
                                <Link
                                  to={`/project/${project._id}/edit`}
                                  className='block p-2 mt-2 hover:text-purple-950 hover:bg-purple-100 rounded-lg'
                                >
                                  Editar Proyecto
                                </Link>
                              </MenuItem>

                              <MenuItem>
                                <button
                                  type='button'
                                  className='block p-2 mt-2 w-full hover:text-red-600  hover:border hover:border-red-400 cursor-pointer hover:bg-red-100 rounded-lg'
                                  onClick={() => { mutate(project._id) }}
                                >
                                  Eliminar Proyecto
                                </button>
                              </MenuItem>
                            </>
                          )
                        }
                      </MenuItems>
                    </Transition>
                  </Menu>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}
export { Home } 
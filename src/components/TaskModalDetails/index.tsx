import { Fragment, useEffect } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { GetTaskById } from '@/api/tasks'
import { toast } from 'react-toastify'

function TaskModalDetails() {

  const navigate = useNavigate()
  const params = useParams()
  const location = useLocation()
  const projectId = params.projectId!
  const queryParams = new URLSearchParams(location.search)
  const taskId = queryParams.get('viewTask')!
  const Show = taskId ? true : false

  const { data, isError } = useQuery({
    queryKey: ['Task', taskId],
    queryFn: () => GetTaskById({ projectId, taskId }),
    enabled: !!taskId,
  })

  useEffect(() => {
    if (isError) {
      toast.error('Error al cargar la tarea', { toastId: 'error' })
      navigate(location.pathname, { replace: true })
    }
  }, [isError, location.pathname, navigate, projectId])


  if (!data) {
    console.log('No hay datos de la tarea')
  }
  else {
    console.log('Datos de la tarea:', data)
  }

  const closeModal = () => {
    navigate(location.pathname, { replace: true })
  }

  return (
    <>
      <Transition appear show={Show} as={Fragment}>
        <Dialog as='div' className='relative z-10' onClose={() => closeModal()}>
          <Transition.Child
            as={Fragment}
            enter='ease-out duration-300'
            enterFrom='opacity-0'
            enterTo='opacity-100'
            leave='ease-in duration-200'
            leaveFrom='opacity-100'
            leaveTo='opacity-0'
          >
            <div className='fixed inset-0 bg-black/60' />
          </Transition.Child>

          <div className='fixed inset-0 overflow-y-auto'>
            <div className='flex min-h-full items-center justify-center p-4 text-center'>
              <Transition.Child
                as={Fragment}
                enter='ease-out duration-300'
                enterFrom='opacity-0 scale-95'
                enterTo='opacity-100 scale-100'
                leave='ease-in duration-200'
                leaveFrom='opacity-100 scale-100'
                leaveTo='opacity-0 scale-95'
              >
                <Dialog.Panel className='w-full max-w-4xl transform overflow-hidden rounded-2xl bg-white text-left align-middle shadow-xl transition-all p-16'>
                  <p className='text-sm text-slate-400'>Agregada el: </p>
                  <p className='text-sm text-slate-400'>Última actualización: </p>
                  <Dialog.Title
                    as='h3'
                    className='font-black text-4xl text-slate-600 my-5'
                  >Titulo aquí
                  </Dialog.Title>
                  <p className='text-lg text-slate-500 mb-2'>Descripción:</p>
                  <div className='my-5 space-y-3'>
                    <label className='font-bold'>Estado Actual:</label>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  )
}

export { TaskModalDetails }
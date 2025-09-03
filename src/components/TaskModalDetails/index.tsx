import { Fragment, useEffect, ChangeEvent } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { toast } from 'react-toastify'

import { TaskStatus } from '@/types'

import { FormatDate } from '@/libs/date'
import { GetTaskById, UpdateStatus } from '@/api/tasks'

function TaskModalDetails() {

  const queryClient = useQueryClient()
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

  const { mutate } = useMutation({
    mutationFn: UpdateStatus,
    onSuccess: () => {
      toast.success('Estado actualizado correctamente', { toastId: 'success' })
      queryClient.invalidateQueries({ queryKey: ['ProjectDetails', projectId] })
      queryClient.invalidateQueries({ queryKey: ['Task', taskId] })
      navigate(location.pathname, { replace: true })
    },
    onError: (error) => {
      toast.error(error.message, { toastId: 'error' })
    }
  })
  const handleChage = (e: ChangeEvent<HTMLSelectElement>) => {
    const status = e.target.value as TaskStatus

    const data = { status, projectId, taskId }
    mutate(data)
  }


  useEffect(() => {
    if (isError) {
      toast.error('Error al cargar la tarea', { toastId: 'error' })
      navigate(location.pathname, { replace: true })
    }
  }, [isError, location.pathname, navigate, projectId])

  const closeModal = () => {
    navigate(location.pathname, { replace: true })
  }


  if (data) return (
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
                <Dialog.Panel className='w-full max-w-4xl transform overflow-hidden rounded-2xl bg-white text-left align-middle shadow-xl transition-all p-10'>
                  <div className='flex justify-between'>
                    <div>
                      <p className='text-sm text-purple-950'>Fecha de inicio: <span className='text-purple-600'>{FormatDate(data.createdAt)}</span> </p>

                      <p className='text-sm text-purple-950'>Última actualización: <span className='text-purple-600'>{FormatDate(data.updatedAt)}</span></p>
                    </div>
                    <p className='text-sm text-purple-950'>Estado actualizado por: <span className='text-purple-600'>{data.completedBy?.name || 'Nadie'}</span></p>
                  </div>
                  <Dialog.Title
                    as='h3'
                    className='font-black text-4xl text-purple-600 my-5'
                  >{data.name}
                  </Dialog.Title>
                  <p className='text-lg text-purple-950 mb-2'>{data.description}</p>


                  <div className='my-5 space-y-3'>
                    <label className='font-bold'>Estado Actual:</label>
                    <select
                      defaultValue={data.status}
                      onChange={handleChage}
                      className='w-full p-3 border border-purple-300 hover:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500'
                    >
                      <option defaultChecked value='pending'>Pendiente</option>
                      <option value='onHold'>En Espera</option>
                      <option value='inProgress'>En Progreso</option>
                      <option value='underReview'>En Revision</option>
                      <option value='completed'>Completada</option>
                    </select>
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
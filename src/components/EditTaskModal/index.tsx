import { Fragment } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Dialog, DialogPanel, DialogTitle, Transition, TransitionChild } from '@headlessui/react'
import { useMutation, useQueryClient } from '@tanstack/react-query'

import { Task, TaskFormTypes } from '@/types'

import { useForm } from 'react-hook-form'

import { EditTask } from '@/api/tasks'
import { toast } from 'react-toastify'
import TaskForm from '@/components/TaskForms/AddForm'

type EditTaskModalProps = {
  data: Task
  taskId: Task['_id']
  status?: Task['status']
}

const EditTaskModal = ({ data, taskId }: EditTaskModalProps) => {
  const navigate = useNavigate()

  const { register, handleSubmit, reset, formState: { errors } } = useForm<TaskFormTypes>({
    defaultValues: {
      name: data.name,
      description: data.description,
      status: data.status || 'onHold',
    },
  })

  const queryClient = useQueryClient()
  const params = useParams()
  const projectId = params.projectId!

  const { mutate } = useMutation({
    mutationFn: EditTask,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['ProjectDetails', projectId] })
      reset()
      toast.success('Tarea creada correctamente')
      navigate(location.pathname, { replace: true })
    },
    onError: (error) => {
      console.error('Error editing task:', error)
    },
  })

  const handleEditTask = async (formData: TaskFormTypes) => {
    const data = {
      projectId,
      taskId,
      formData,
    }
    mutate(data)
  }

  return (
    <Transition appear show={true} as={Fragment}>
      <Dialog as='div' className='relative z-10' onClose={() => navigate(location.pathname, { replace: true })}>
        <TransitionChild
          as={Fragment}
          enter='ease-out duration-300'
          enterFrom='opacity-0'
          enterTo='opacity-100'
          leave='ease-in duration-200'
          leaveFrom='opacity-100'
          leaveTo='opacity-0'
        >
          <div className='fixed inset-0 bg-black/60' />
        </TransitionChild>
        <div className='fixed inset-0 overflow-y-auto'>
          <div className='flex min-h-full items-center justify-center p-4 text-center'>
            <TransitionChild
              as={Fragment}
              enter='ease-out duration-300'
              enterFrom='opacity-0 scale-95'
              enterTo='opacity-100 scale-100'
              leave='ease-in duration-200'
              leaveFrom='opacity-100 scale-100'
              leaveTo='opacity-0 scale-95'
            >
              <DialogPanel className='w-full max-w-4xl transform overflow-hidden rounded-2xl bg-white text-left align-middle shadow-xl transition-all p-6 md:p-16'>
                <DialogTitle
                  as='h3'
                  className='font-black text-4xl mb-2'
                >
                  Editar Tarea
                </DialogTitle>
                <p className='text-xl font-bold'>Realiza cambios a una tarea en {''}
                  <span className='text-fuchsia-600'>este formulario</span>
                </p>

                <form
                  className='mt-5 space-y-3'
                  onSubmit={handleSubmit(handleEditTask)}
                  noValidate
                >

                  <TaskForm register={register} errors={errors} />

                  <input
                    type='submit'
                    className='bg-indigo-600 text-white px-10 py-3 rounded-lg inline-block hover:bg-indigo-800 transition-colors font-semibold'
                  />
                </form>
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </Transition>
  )
}

export { EditTaskModal }
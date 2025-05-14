import { Fragment } from 'react'
import { toast } from 'react-toastify'
import { useForm } from 'react-hook-form'
import { Dialog, Transition } from '@headlessui/react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'

import { useMutation } from '@tanstack/react-query'
import { CreateTask } from '@/api/tasks'

import { TaskFormTypes } from '@/types'

import TaskForm from '@/components/TaskForms/AddForm'

function AddTaskModal() {
  const navigate = useNavigate()
  const location = useLocation()
  const queryParams = new URLSearchParams(location.search)
  const newTask = queryParams.get('newTask')
  const Show = newTask ? true : false

  const params = useParams()
  const projectId = params.projectId!

  const initialValues: TaskFormTypes = {
    name: '',
    description: ''
  }

  const { register, handleSubmit,reset,  formState: { errors } } = useForm({ defaultValues: initialValues, })

  const { mutate } = useMutation({
    mutationFn: CreateTask,
    onSuccess: () => {
      toast.success('Tarea creada correctamente')
      reset()
      navigate(location.pathname, { replace: true })
    },
    onError: (error: Error) => {
      toast.error(error.message)
      console.error('Detalles del error:', {
        message: error.message,
        stack: error.stack
      })
    }
  })
  
  const onSubmit = async (formData: TaskFormTypes) => {
    const data = {
      formData,
      projectId
    }
    mutate(data)
  }

  return (
    <>
      <Transition appear show={Show} as={Fragment}>
        <Dialog as='div' className='relative z-10' onClose={() => navigate(location.pathname, { replace: true })}>
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
                  <Dialog.Title
                    as='h3'
                    className='font-black text-4xl my-5'
                  >
                    Nueva Tarea
                  </Dialog.Title>

                  <p className='text-xl font-bold'>Llena el formulario y crea  {''}
                    <span className='text-fuchsia-600'>una tarea</span>
                  </p>

                  <form
                    className='mt-10 flex flex-col gap-5'
                    onSubmit={handleSubmit(onSubmit)}
                    noValidate
                  >
                    <TaskForm
                      register={register}
                      errors={errors}
                    />
                    <input
                      type='submit'
                      className='bg-indigo-600 text-white px-4 py-2 rounded-lg mt-5 inline-block hover:bg-indigo-700 transition-colors font-semibold cursor-pointer'
                      value='Guardar Tarea'
                    />
                  </form>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  )
}

export { AddTaskModal }
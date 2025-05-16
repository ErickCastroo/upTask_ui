import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'

import { useQuery } from '@tanstack/react-query'
import { GetProjectById } from '@/api/project'

import { IsLoading } from '@/components/isLoading'
import { AddTaskModal } from '@/components/TaskModal'
import { TaskList } from '@/components/TaskList'
import { EditData } from '@/components/EditTaskModal/EditData'

function ProjectDetails() {
  const params = useParams()
  const usenavigate = useNavigate()
  const projectId = params.projectId!

  const { data, isError, isLoading } = useQuery({
    queryKey: ['ProjectDetails', projectId],
    queryFn: () => GetProjectById(projectId),
    retry: false,
  })

  if (isLoading) return <IsLoading />
  if (isError) {
    toast.error('Error al cargar el proyecto')
    usenavigate('/')
  }

  return (
    <>
      <h1 className='text-5xl font-black'>{data.projectName}</h1>
      <p className='text-xl font-light text-purple-500 mt-5'>{data.description}</p>
      <nav className='my-5 flex gap-2'>
        <button
          className='bg-indigo-600 text-white px-10 py-3 rounded-lg inline-block hover:bg-indigo-800 transition-colors font-semibold'
          onClick={() => usenavigate(`?newTask=true`)}
        >
          Agregar Tarea
        </button>
      </nav>
      <TaskList tasks={data.tareas}/>
      <AddTaskModal />

      <EditData /> 
      {/* <TaskCard task={data.tareas[0]} /> */}  
    </>
  )
}

export { ProjectDetails }
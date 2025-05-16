import { Task } from '@/types'
import { TaskCard } from '../TaskCard'

type TaskListProps = {
  tasks: Task[]
}

type GroupedTasks = {
  [key: string]: Task[]
}


const initialValue: GroupedTasks = {
  pending: [],
  onHold: [],
  inProgress: [],
  underReview: [],
  completed: [],
}

const statusTranslation: { [key: string]: string } = {
  pending: 'Pendiente',
  onHold: 'En Espera',
  inProgress: 'En Progreso',
  underReview: 'En Revisión',
  completed: 'Completada',
}

const statusStyle: { [key: string]: string } = {
  pending: 'border-t-violet-500',
  onHold: 'border-t-violet-600',
  inProgress: 'border-t-violet-700',
  underReview: 'border-t-violet-800',
  completed: 'border-t-violet-900',
}


function TaskList({ tasks }: TaskListProps) {
  const groupedTasks = tasks.reduce((acc, task) => {
    acc[task.status] = [...(acc[task.status] || []), task]
    return acc;
  }, { ...initialValue })

  return (
    <>
      <h2 className="text-5xl font-black my-10">Tareas</h2>

      <div className='flex gap-5 overflow-x-scroll 2xl:overflow-auto pb-32'>
        {Object.entries(groupedTasks).map(([status, tasks]) => (
          <div key={status} className='min-w-[300px] 2xl:min-w-0 2xl:w-1/5'>
            <h3
              className={`capitalize text-xl font-light border border-violet-200 bg-white p-3 border-t-8 transition-colors duration-300 ease-in-out shadow-sm rounded-md ${statusStyle[status]}`}>
              {statusTranslation[status]}
            </h3>
            <ul className='mt-5 space-y-5'>
              {tasks.length === 0 ? (
                <li className="text-purple-400 text-center pt-3">No Hay tareas</li>
              ) : (
                tasks.map(task => <TaskCard key={task._id} task={task} />)
              )}
            </ul>
          </div>
        ))}
      </div>
    </>
  )
}

export { TaskList }
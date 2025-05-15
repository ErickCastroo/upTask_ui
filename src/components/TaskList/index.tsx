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
            <ul className='mt-5 space-y-5'>
              {tasks.length === 0 ? (
                <li className="text-gray-500 text-center pt-3">No Hay tareas</li>
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
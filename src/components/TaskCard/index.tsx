import { Task } from '@/types'

type TaskCardProps = {
  task: Task
}

function TaskCard({ task }: TaskCardProps) {
  console.log(task)
  return (
    <>

    </>
  )
}

export { TaskCard }
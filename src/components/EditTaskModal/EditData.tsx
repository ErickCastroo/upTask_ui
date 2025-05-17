import { useLocation, useParams } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'

import { GetTaskById } from '@/api/tasks'

import { EditTaskModal } from '@/components/EditTaskModal'

function EditData() {
  const params = useParams()
  const projectId = params.projectId!

  const location = useLocation()
  const queryParams = new URLSearchParams(location.search)
  const taskId = queryParams.get('editTask')!


  const { data } = useQuery({
    queryKey: ['task', taskId],
    queryFn: () => GetTaskById({ projectId, taskId }),
    enabled: !!taskId,
  })

  if (data) return <EditTaskModal data={data} taskId={taskId} />
}

export { EditData }
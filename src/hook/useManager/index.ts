// src/hook/useIsProjectManager.ts
import { useAuth } from '@/hook/useAuth'
import { useQuery } from '@tanstack/react-query'
import { GetProjectById } from '@/api/project'

export const useIsProjectManager = (projectId: string) => {
  const { data: user } = useAuth()
  const { data: project } = useQuery({
    queryKey: ['project', projectId],
    queryFn: () => GetProjectById(projectId),
    retry: false
  })

  return user && project?.manager === user._id
}

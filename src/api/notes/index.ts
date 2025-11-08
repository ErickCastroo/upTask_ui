import { isAxiosError } from 'axios'

import { Api } from '@/libs/axios'

import { NoteFormData, Project, Task } from '@/types'

type NoteApiType = {
  formdata: NoteFormData
  projectId: Project['_id']
  taskId: Task['_id']
}

export async function addNote({ formdata, projectId, taskId }: Pick<NoteApiType, 'formdata' | 'projectId' | 'taskId'>) {
  try {
    const { data } = await Api.post(`/projects/${projectId}/tareas/${taskId}/notes`, formdata)
    return data
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(`Error del servidor (${error.response.status}): ${error.response.data?.message || JSON.stringify(error.response.data)}`);
    }
    throw error
  }
}
import { isAxiosError } from 'axios'
import { Api } from '@/libs/axios'
import { TaskFormTypes, Project, Task } from '@/types'

type TasksApi = {
  formData: TaskFormTypes,
  projectId: Project['_id'],
  taskId: Task['_id'],
}

export async function CreateTask({ formData, projectId }: Pick<TasksApi, 'formData' | 'projectId'>) {
  try {
    const url = `/projects/${projectId}/tareas`

    // Envía solo formData directamente, no el objeto contenedor
    const { data } = await Api.post(url, formData)
    return data
  } catch (error) {
    if (isAxiosError(error)) {
      if (error.response) {
        // Mejora el mensaje para incluir detalles del error del servidor
        const serverMessage = error.response.data?.message ||
          error.response.data?.error ||
          JSON.stringify(error.response.data)
        throw new Error(`Error del servidor (${error.response.status}): ${serverMessage}`)
      }
      throw new Error('Error de conexión con el servidor')
    }
    throw new Error('Error desconocido al crear la tarea')
  }
}


export async function GetTaskById({ taskId, projectId }: Pick<TasksApi, 'projectId' | 'taskId'>) {
  try {
    const url = `/projects/${projectId}/tareas/${taskId}`
    const { data } = await Api(url)
    return data


  } catch (error) {
    if (isAxiosError(error)) {
      if (error.response) {
        const serverMessage = error.response.data?.message ||
          error.response.data?.error ||
          JSON.stringify(error.response.data)
        throw new Error(`Error del servidor (${error.response.status}): ${serverMessage}`)
      }
      throw new Error('Error de conexión con el servidor')
    }
  }
}

export async function EditTask({ projectId, taskId, formData }: Pick<TasksApi, 'projectId' | 'taskId' | 'formData'>) {
  try {
    const url = `/projects/${projectId}/tareas/${taskId}`
    const { data } = await Api.put<string>(url, formData)
    return data

  } catch (error) {
    if (isAxiosError(error)) {
      if (error.response) {
        const serverMessage = error.response.data?.message ||
          error.response.data?.error ||
          JSON.stringify(error.response.data)
        throw new Error(`Error del servidor (${error.response.status}): ${serverMessage}`)
      }
      throw new Error('Error de conexión con el servidor')
    }
  }
}

export async function DeleteTaskById({ taskId, projectId }: Pick<TasksApi, 'projectId' | 'taskId'>) {
  try {
    const url = `/projects/${projectId}/tareas/${taskId}`
    const { data } = await Api.delete<string>(url)
    return data


  } catch (error) {
    if (isAxiosError(error)) {
      if (error.response) {
        const serverMessage = error.response.data?.message ||
          error.response.data?.error ||
          JSON.stringify(error.response.data)
        throw new Error(`Error del servidor (${error.response.status}): ${serverMessage}`)
      }
      throw new Error('Error de conexión con el servidor')
    }
  }
}
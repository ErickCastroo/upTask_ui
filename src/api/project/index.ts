import { Api } from '@/libs/axios'
import { ProjectFormTypes } from '@/types'
import { isAxiosError } from 'axios'

export async function CreateProject(formData: ProjectFormTypes) {
  try {
    const { data } = await Api.post('/projects', formData)
    return data
  } catch (error) {
    if (isAxiosError(error)) {
      if (error.response) {
        throw new Error(error.response.data.message)
      } else {
        throw new Error('No se pudo conectar al servidor. Verifica tu conexión.')
      }
    }
    throw new Error('Ocurrió un error inesperado.')
  }
}

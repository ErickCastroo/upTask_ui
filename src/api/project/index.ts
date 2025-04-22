import { Api } from '@/libs/axios'
import { ProjectFormTypes } from '@/types'
import { isAxiosError } from 'axios'

import { homeProjectSchema, Project } from '@/types'


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

export async function GetProject() {
  try {
    const { data } = await Api('/projects')
    const response = homeProjectSchema.safeParse(data)
    if (!response.success) {
      throw new Error('Error en la validación de datos')
    }
    console.log(response.data)
    return response.data
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

export async function GetProjectById(id: Project['_id']) {
  try {
    const { data } = await Api(`/projects/${id}`)
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
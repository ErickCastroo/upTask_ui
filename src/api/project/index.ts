import { isAxiosError } from 'axios'

import { Api } from '@/libs/axios'

import { ProjectFormTypes,  homeProjectSchema, Project } from '@/types'

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

type UpdateProjectByIdProps = {
  formData: ProjectFormTypes
  projectId: Project['_id']
}

export async function UpdateProjectById({ formData, projectId }: UpdateProjectByIdProps) {
  try {
    const { data } = await Api.put(`/projects/${projectId}`, formData)
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

export async function DeleteProjectById(id: Project['_id']) {
  try {
    const { data } = await Api.delete(`/projects/${id}`)
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
import { Api } from '@/libs/axios'
import { ProjectFormTypes } from '@/types'

async function CreateProject(formData: ProjectFormTypes) {
  try {
    const { data } = await Api.post('/projects', formData)
    return data

  } catch (error) {
    console.error('Error creating project:', error)
    return
  }
}

export { CreateProject };
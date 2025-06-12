import { isAxiosError } from "axios"
import { Api } from "@/libs/axios"
import { Project, TeamMember, TeamMemberForm, TeamMembersSchema } from "@/types"

export async function GetMembers(projectId: Project['_id']) {
  try {
    const { data } = await Api(`/projects/${projectId}/team`)
    const response = TeamMembersSchema.safeParse(data)
    if (response.success) {
      return response.data
    }
    throw new Error('Error al validar los datos del equipo')
  } catch (error) {
    if (isAxiosError(error)) {
      const serverMessage =
        error.response?.data?.message ||
        error.response?.data?.error ||
        JSON.stringify(error.response?.data)
      throw new Error(`Error del servidor (${error.response?.status}): ${serverMessage}`)
    }
    throw new Error('Error de conexión con el servidor')
  }
}

export async function findUserByEmail({ projectId, formdata }: { projectId: Project['_id'], formdata: TeamMemberForm }) {
  try {
    const { data } = await Api.post(`/projects/${projectId}/team/find`, formdata)
    return data

  } catch (error) {
    if (isAxiosError(error)) {
      const serverMessage =
        error.response?.data?.message ||
        error.response?.data?.error ||
        JSON.stringify(error.response?.data)
      throw new Error(`Error del servidor (${error.response?.status}): ${serverMessage}`)
    }
    throw new Error('Error de conexión con el servidor')
  }
}

export async function addUserMember({ projectId, id }: { projectId: Project['_id'], id: TeamMember['_id'] }) {
  try {
    const { data } = await Api.post<string>(`/projects/${projectId}/team`, { id })
    return data

  } catch (error) {
    if (isAxiosError(error)) {
      const serverMessage =
        error.response?.data?.message ||
        error.response?.data?.error ||
        JSON.stringify(error.response?.data)
      throw new Error(`Error del servidor (${error.response?.status}): ${serverMessage}`)
    }
    throw new Error('Error de conexión con el servidor')
  }
}

export async function removeUserMember({ projectId, userid }: { projectId: Project['_id'], userid: TeamMember['_id'] }) {
  try {
    const { data } = await Api.delete<string>(`/projects/${projectId}/team/${userid}`)
    return data
  } catch (error) {
    if (isAxiosError(error)) {
      const serverMessage =
        error.response?.data?.message ||
        error.response?.data?.error ||
        JSON.stringify(error.response?.data)
      throw new Error(`Error del servidor (${error.response?.status}): ${serverMessage}`)
    }
    throw new Error('Error de conexión con el servidor')
  }
}
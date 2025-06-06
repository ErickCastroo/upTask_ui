import { isAxiosError } from "axios"
import { Api } from "@/libs/axios"
import { Project, TeamMemberForm } from "@/types"



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
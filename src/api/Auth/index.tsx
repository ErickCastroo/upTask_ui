import { isAxiosError } from 'axios'

import { Api } from '@/libs/axios'

import { confirmToken, PuserRegistrationForm } from '@/types'


export async function RegisterC(formData: PuserRegistrationForm) {
  try {
    const { data } = await Api.post<string>('/auth', formData)
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

export async function TokenConfirm(formData: confirmToken) {
  try {
    const { data } = await Api.post<string>('/auth/confirmUser', formData)
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
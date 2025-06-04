import { isAxiosError } from 'axios'

import { Api } from '@/libs/axios'

import { confirmToken, PuserLoginForm, PuserRegistrationForm, ForgotPasswordForm, UserSchema } from '@/types'


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

export async function RequestNewToken(email: string) {
  try {
    const { data } = await Api.post<string>('/auth/newToken', { email })
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

type LoginResponse = {
  token: string;
}

export async function LoginC(formData: PuserLoginForm) {
  try {
    const { data } = await Api.post<LoginResponse>('/auth/login', formData)
    localStorage.setItem('tokenUptask', data.token)
    console.log(data.token)
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


export async function ForgotPassword(formData: ForgotPasswordForm) {
  try {
    const { data } = await Api.post<string>('/auth/passwordRecovery', formData)
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

export async function UserGet() {
  try {
    const { data } = await Api.get('/auth/user')
    const response = UserSchema.safeParse(data)
    if (!response.success) {
      throw new Error('Datos de usuario no válidos')
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
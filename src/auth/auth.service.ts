import { api } from '@/infra/common/axios'
import type { AuthResponse, User } from './auth.contract'
import type { LoginInput, RegisterInput } from './auth.dto'
import type { BaseAxiosResponse } from '@/infra/__types__'

export const loginWithEmailAndPassword = async (data: LoginInput): BaseAxiosResponse<AuthResponse> => {
  // TODO: add a mock auth login later
  return api.post('/auth/login', data)
}

export const registerWithEmailAndPassword = async (data: RegisterInput): BaseAxiosResponse<AuthResponse> => {
  return api.post('/auth/register', data)
}

export const getUser = async (): BaseAxiosResponse<User> => {
  return api.get('/auth/me')
}

export const logout = async (): BaseAxiosResponse<void> => {
  return api.post('/auth/logout')
}

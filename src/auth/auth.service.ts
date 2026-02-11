import { api } from '@/infra/common/axios'
import type { AuthResponse, User } from './auth.contract'
import type { LoginInput, RegisterInput } from './auth.dto'

export const loginWithEmailAndPassword = async (data: LoginInput): Promise<AuthResponse> => {
  // TODO: add a mock auth login later
  return api.post('/auth/login', data)
}

export const registerWithEmailAndPassword = async (data: RegisterInput): Promise<AuthResponse> => {
  return api.post('/auth/register', data)
}

export const getUser = async (): Promise<User> => {
  return api.get('/auth/me')
}

export const logout = async () => {
  return api.post('/auth/logout')
}

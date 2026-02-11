/* eslint-disable @typescript-eslint/no-explicit-any */
import { configureAuth } from 'react-query-auth'
import type { LoginInput, RegisterInput } from './auth.dto'
import { getUser, loginWithEmailAndPassword, registerWithEmailAndPassword, logout } from './auth.service'

const authConfig = {
  // TODO: user fetch api simulation late
  userFn: async () => {
    try {
      const response = await getUser()
      return response
    } catch (err: any) {
      console.error('Auth User:', err.message)
      return null
    }
  },
  loginFn: async (data: LoginInput) => {
    const response = await loginWithEmailAndPassword(data)
    return response.user
  },
  // TODO: register api simulation later
  registerFn: async (data: RegisterInput) => {
    const response = await registerWithEmailAndPassword(data)
    return response.user
  },
  logoutFn: logout
}

export const { useLogin, useLogout, useUser, AuthLoader } = configureAuth(authConfig)

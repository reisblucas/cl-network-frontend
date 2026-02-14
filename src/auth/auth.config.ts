/* eslint-disable @typescript-eslint/no-explicit-any */
import { configureAuth } from 'react-query-auth'
import type { LoginInput, RegisterInput } from './auth.dto'
import { getUser, loginWithEmailAndPassword, registerWithEmailAndPassword, logout } from './auth.service'

const authConfig = {
  // TODO: user fetch api simulation late
  userFn: async () => {
    try {
      const response = await getUser()
      return response.data
    } catch (err: any) {
      console.error('Auth User:', err.message)
      /**
       * React Query pattern expect a null response instead of void
       * without it, AuthLoader renders MainErrorFallback
       */
      return null
    }
  },
  loginFn: async (data: LoginInput) => {
    const response = await loginWithEmailAndPassword(data)
    return response.data.user
  },
  // TODO: register api simulation later
  registerFn: async (data: RegisterInput) => {
    const response = await registerWithEmailAndPassword(data)
    return response.data.user
  },
  logoutFn: async () => await logout()
}

export const { useLogin, useLogout, useUser, useRegister, AuthLoader } = configureAuth(authConfig)

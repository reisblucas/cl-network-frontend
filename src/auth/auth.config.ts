import { configureAuth } from 'react-query-auth'
import type { LoginInput, RegisterInput } from './auth.dto'
import { getUser, loginWithEmailAndPassword, registerWithEmailAndPassword, logout } from './auth.service'

const authConfig = {
  // TODO: user fetch api simulation late
  userFn: getUser,
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

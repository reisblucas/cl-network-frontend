import { configureAuth } from 'react-query-auth'
import z from 'zod'
import { api } from '../infra/common/axios/axios.client'
import { Navigate, useLocation } from 'react-router'
import { paths } from '@/infra/paths'
import type { AuthResponse, User } from './auth.contract'

// regex
const HAS_SPECIAL_CHARACTER_REGEX = /[^A-Za-z0-9\s]/
// end regex

// auth.dto.ts
const PASSWORD = {
  min: 8,
  max: 128
}
export const BASE_EMAIL_SCHEMA = z.email('Invalid email').nonempty().nonoptional('Email is required')
export const BASE_PASSWORD_SCHEMA = z.string().min(PASSWORD.min, 'Password is required')
export const BASE_USERNAME_SCHEMA = z
  .string()
  .min(3, 'Username is required')
  .regex(HAS_SPECIAL_CHARACTER_REGEX, 'Special characters are not allowed')

// Credential schema is the same between OWNER and CANDIDATE
const registerPasswordSchema = z
  .string()
  .min(PASSWORD.min, `Password must contain at least ${PASSWORD.min} characters`)
  .max(PASSWORD.max, `Password must contain at least ${PASSWORD.max} characters`)
  .trim()
  .regex(/[A-Z]/, {
    error: 'At least 1 uppercase character is required'
  })
  .regex(/[a-z]/, {
    error: 'At least 1 lowercase character is required'
  })
  .regex(/\d/, {
    error: 'At least 1 digit character is required'
  })
  .regex(HAS_SPECIAL_CHARACTER_REGEX, {
    error: 'At least 1 special character is required'
  })
  .nonempty()
  .nonoptional()

export const loginInputSchema = z
  .object({
    login: z.string().min(3, 'Inform your email or username'),
    password: BASE_PASSWORD_SCHEMA
  })
  .strict()
  .superRefine((data, ctx) => {
    const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.login)
    if (!isEmail) {
      // validate
      const isInvalidUsername = HAS_SPECIAL_CHARACTER_REGEX.test(data.login) // if not have  special character, it is valid

      if (isInvalidUsername) {
        ctx.addIssue({
          path: ['login'],
          message: 'Invalid username',
          code: 'custom'
        })

        return
      }
    } else {
      const emailResult = BASE_EMAIL_SCHEMA.safeParse(data.login)
      if (!emailResult.success) {
        ctx.addIssue({
          path: ['login'],
          message: 'Invalid email',
          code: 'custom'
        })
      }
    }

    // validate email
  })
export type LoginInput = z.infer<typeof loginInputSchema>

export const registerInputSchema = z
  .object({
    email: BASE_EMAIL_SCHEMA,
    password: registerPasswordSchema,
    username: BASE_USERNAME_SCHEMA,
    first_name: z.string().min(1, 'First name is required'),
    last_name: z.string().min(1, 'First name is required'),
    bio: z.string().min(1, 'Bio is required')
  })
  .strict()
export type RegisterInput = z.infer<typeof registerInputSchema>

// end auth.dto.ts

// auth.contract.ts

// end auth.contract.ts

// auth.service.ts
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
// end auth.service.ts

// auth.config.ts
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
// end auth.config.ts

export const { useLogin, useLogout, useUser, AuthLoader } = configureAuth(authConfig)

export const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const user = useUser()
  const location = useLocation()

  if (!user.data) {
    return <Navigate to={paths.auth.login.getHref(location.pathname)} />
  }

  return children
}

/* eslint-disable @typescript-eslint/no-explicit-any */
import { delay } from 'msw'
import Cookies from 'js-cookie'
import { db } from './db'
import type { LoginInput } from '@/auth'
import { env } from '@/infra/env'

export const networkDelay = () => {
  const delayTime = import.meta.env.TEST ? 200 : Math.floor(Math.random() * 700) + 300
  return delay(delayTime)
}

export const encode = (obj: any) => {
  const btoa =
    typeof window === 'undefined' ? (str: string) => Buffer.from(str, 'binary').toString('base64') : window.btoa
  return btoa(JSON.stringify(obj))
}

export const decode = (str: string) => {
  const atob =
    typeof window === 'undefined' ? (str: string) => Buffer.from(str, 'base64').toString('binary') : window.atob
  return JSON.parse(atob(str))
}

export const hash = (str: string) => {
  let hash = 5381,
    i = str.length

  while (i) {
    hash = (hash * 33) ^ str.charCodeAt(--i)
  }
  return String(hash >>> 0)
}

const omit = <T extends object>(obj: T, keys: string[]): T => {
  const result = {} as T
  for (const key in obj) {
    if (!keys.includes(key)) {
      result[key] = obj[key]
    }
  }

  return result
}

export const sanitizeUser = <O extends object>(user: O) => omit<O>(user, ['password', 'iat'])

export function authenticate({ login, password }: LoginInput) {
  // get user by username
  const user_by_username = db.user.findFirst({
    where: {
      username: {
        equals: login
      }
    }
  })

  if (!user_by_username) {
    // get user by email
    const user_by_email = db.user.findFirst({
      where: {
        email: {
          equals: login
        }
      }
    })
    if (!user_by_email) {
      throw new Error('Invalid email', { cause: 401 })
    }

    if (user_by_email?.password !== hash(password)) {
      throw new Error('Invalid email or password', { cause: 401 })
    }
    const sanitizedUser = sanitizeUser(user_by_email)
    const encodedToken = encode(sanitizedUser)
    return { user: sanitizedUser, jwt: encodedToken }
  } else {
    if (user_by_username?.password !== hash(password)) {
      throw new Error('Invalid username or password', { cause: 401 })
    }
    const sanitizedUser = sanitizeUser(user_by_username)
    const encodedToken = encode(sanitizedUser)
    return { user: sanitizedUser, jwt: encodedToken }
  }
}

export function requireAuth(cookies: Record<string, string>) {
  const encodedToken = cookies[env.AUTH_COOKIE] || Cookies.get(env.AUTH_COOKIE)
  if (!encodedToken) {
    throw new Error('Unauthorized', { cause: 401 })
  }

  const decodedToken = decode(encodedToken) as { id: string }

  const user = db.user.findFirst({
    where: {
      id: {
        equals: decodedToken.id
      }
    }
  })

  if (!user) {
    throw new Error('Unauthorized', { cause: 401 })
  }

  return { user: sanitizeUser(user) }
}

export function requireAdmin(user: any) {
  if (user.role !== 'ADMIN') {
    throw Error('Unauthorized')
  }
}

export function wrapBackendSuccessResponse<T>({ data, metadata }: { data: T; metadata?: Record<string, any> }) {
  if (metadata) {
    return { data, metadata }
  }

  return {
    data
  }
}

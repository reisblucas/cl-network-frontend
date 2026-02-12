/* eslint-disable @typescript-eslint/no-explicit-any */
import { env } from '@/infra/env'
import { http, HttpResponse } from 'msw'
import { AUTH_COOKIE, authenticate, hash, networkDelay, requireAuth } from '../utils'
import { registerInputSchema, type LoginInput, type UserRegister } from '@/auth'
import Cookies from 'js-cookie'
import { db, persistDb } from '../db'

// controllers, services, db layers
async function loginHandler({ request }: { request: Request }) {
  await networkDelay()

  // add db simulation
  try {
    const body_data = (await request.json()) as LoginInput
    console.log('result', body_data)
    const result = authenticate(body_data)

    Cookies.set(AUTH_COOKIE, result.jwt)

    return HttpResponse.json(result, {
      status: 200,
      // with a real API servier, the token cookie should also be Secure and HttpOnly
      headers: { 'Set-Cookie': `${AUTH_COOKIE}=${result.jwt}; Path=/` }
    })
  } catch (error: any) {
    return HttpResponse.json(
      {
        status: error?.cause || 500,
        message: error?.message || 'Server Error'
      },
      { status: error?.cause || 500 }
    )
  }
}
// end handlers

export const authHandlers = [
  http.get(`${env.API_URL}/auth/me`, async ({ cookies }) => {
    await networkDelay()

    // TODO: add simulation jwt expired
    try {
      const { user } = requireAuth(cookies)
      return HttpResponse.json({ data: user })
    } catch (error: any) {
      return HttpResponse.json({ error: error?.message || 'Server Error' }, { status: error?.cause || 500 })
    }
  }),

  http.post(`${env.API_URL}/auth/login`, loginHandler),
  http.post(`${env.API_URL}/auth/register`, async ({ request }) => {
    networkDelay()

    try {
      const body_data = (await request.json()) as UserRegister
      const { password, password_confirmation: _pc, ...bd_parsed } = registerInputSchema.parse(body_data)

      const user_by_email = db.user.findFirst({
        where: {
          email: { equals: bd_parsed.email }
        }
      })
      if (user_by_email) {
        throw new Error('Email already in use', { cause: 400 })
      }

      const user_by_username = db.user.findFirst({
        where: {
          username: { equals: bd_parsed.username }
        }
      })
      if (user_by_username) {
        throw new Error('Username already in use', { cause: 400 })
      }

      db.user.create({
        ...bd_parsed,
        role: 'USER',
        password: await hash(password)
      })
      await persistDb('user')
      await loginHandler({ request })
      return HttpResponse.json({ message: 'User registered successfully' }, { status: 201 })
    } catch (error: any) {
      return HttpResponse.json({ message: error?.message || 'Server Error' }, { status: error?.cause || 500 })
    }
  })
]

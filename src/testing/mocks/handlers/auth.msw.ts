/* eslint-disable @typescript-eslint/no-explicit-any */
import { env } from '@/infra/env'
import { http, HttpResponse } from 'msw'
import { AUTH_COOKIE, authenticate, networkDelay, requireAuth } from '../utils'
import type { LoginInput } from '@/auth'
import Cookies from 'js-cookie'

export const authHandlers = [
  http.get(`${env.API_URL}/auth/me`, async ({ cookies }) => {
    await networkDelay()

    // TODO: add simulation jwt expired
    try {
      const { user } = requireAuth(cookies)
      return HttpResponse.json({ data: user })
    } catch (error: any) {
      return HttpResponse.json({ error: error?.message || 'Server Error' }, { status: 401 })
    }

    // if (request.headers)
    //   return HttpResponse.json<User>(
    //     {
    //       id: '1',
    //       username: 'johnwick',
    //       email: 'johnwick@gmail.com',
    //       first_name: 'John',
    //       last_name: 'Wick',
    //       bio: 'It was not just a puppy',
    //       role: 'USER',
    //       created_at: new Date().toISOString(),
    //       updated_at: new Date().toISOString()
    //     },
    //     { status: 200 }
    //   )
  }),

  http.post(`${env.API_URL}/auth/login`, async ({ request }) => {
    await networkDelay()

    // add db simulation
    try {
      const body_data = (await request.json()) as LoginInput
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
          status: 500,
          message: error?.message || 'Server Error'
        },
        { status: 500 }
      )
    }
  })
]

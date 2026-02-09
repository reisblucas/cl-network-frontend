import { env } from '@/infra/env'
import { http, HttpResponse } from 'msw'
import { networkDelay } from '../utils'
import type { User } from '@/auth'

export const authHandlers = [
  http.get(`${env.API_URL}/auth/me`, async ({ request }) => {
    await networkDelay()

    // TODO: add random

    if (request.headers)
      return HttpResponse.json<User>(
        {
          id: '1',
          username: 'johnwick',
          email: 'johnwick@gmail.com',
          first_name: 'John',
          last_name: 'Wick',
          bio: 'It was not just a puppy',
          role: 'USER',
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        },
        { status: 200 }
      )
  })
]

/* eslint-disable @typescript-eslint/no-explicit-any */
import { env } from '@/infra/env'
import { http, HttpResponse } from 'msw'
import { networkDelay } from '../utils'
import { db } from '../db'

export const usersHandlers = [
  /**
   * Route to check if email is already used
   * usecases:
   * - register
   * - user update
   */
  http.get(`${env.API_URL}/users/email`, async ({ request }) => {
    await networkDelay()

    try {
      const url = new URL(request.url)
      const email = url.searchParams.get('exists')

      if (!email) {
        return HttpResponse.json({ message: 'Email is required' }, { status: 400 })
      }
      const email_exists = db.user.findFirst({
        where: {
          email: { equals: email }
        }
      })

      if (email_exists) {
        return HttpResponse.json({ data: true }, { status: 200 })
      }

      return HttpResponse.json({ data: false }, { status: 200 })
    } catch (error: any) {
      return HttpResponse.json({ message: error?.message || 'Server Error' }, { status: error?.cause || 500 })
    }
  })
]

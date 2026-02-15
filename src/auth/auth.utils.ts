import { env } from '@/infra/env'
import Cookies from 'js-cookie'

export function flushAuthData() {
  Cookies.remove(env.AUTH_COOKIE)

  // dev & test environments
  if (env.ENABLE_API_MOCKING) {
    localStorage.removeItem('__msw-cookie-store__')
  }
}

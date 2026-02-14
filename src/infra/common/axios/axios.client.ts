import axios, { type InternalAxiosRequestConfig } from 'axios'
import { env } from '../../env'
import { paths } from '@/infra/paths'
import Cookies from 'js-cookie'

export const api = axios.create({
  baseURL: env.API_URL
})

function authRequestInterceptor(config: InternalAxiosRequestConfig): InternalAxiosRequestConfig {
  if (config.headers) {
    config.headers.Accept = 'application/json'
  }

  config.withCredentials = true

  // routes fetching external ROUTE
  const public_routes = [paths.auth.login.path, paths.auth.register.path, '/auth/me']
  if (config.url && !public_routes.includes(config.url)) {
    const jwt = Cookies.get(env.AUTH_COOKIE)
    config.headers.Authorization = `Bearer ${jwt}`
  } else {
    // mock to the external url
    if (import.meta.env.MODE === 'development') {
      config.baseURL = 'http://localhost:3001'
    }
  }

  return config
}

api.interceptors.request.use(authRequestInterceptor)
api.interceptors.response.use(
  (response) => {
    return response.data
  },
  (error) => {
    const message = error.response?.data?.message || error.message || 'An unexpected error occurred'
    // TODO: add toast later
    console.error('AXIOS RESPONSE ERROR: ', message)
    // alert('AXIOS RESPONSE ERROR: ' + message)

    if (error.response?.status === 401) {
      // 1 flush data
      // 2 local storage, etc
      // 3 redirect to Landing Page/Unauthorized/Login
      Cookies.remove(env.AUTH_COOKIE)

      // dev & test environments
      if (env.ENABLE_API_MOCKING) {
        localStorage.removeItem('__msw-cookie-store__')
      }

      // GlobalNavigate?.('/login')
      // toast.error('Session expired, please login again')
      // window.location.href = '/auth/login'
    }

    return Promise.reject(error.response?.data || error)
  }
)

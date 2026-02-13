import { env } from '@/infra/env'
import axios, { type InternalAxiosRequestConfig } from 'axios'

export const clnapi = axios.create({
  baseURL: env.CLN_API_URL,
  timeout: 30000
})

function authRequestInterceptor(config: InternalAxiosRequestConfig): InternalAxiosRequestConfig {
  if (config.headers) {
    config.headers.Accept = 'application/json'
  }

  config.withCredentials = true
  return config
}

clnapi.interceptors.request.use(authRequestInterceptor)
clnapi.interceptors.response.use(
  (response) => response,
  (error) => {
    const message = error.response?.data?.message || error.message || 'An unexpected error occurred'
    // TODO: add toast later
    console.error('AXIOS RESPONSE ERROR: ', message)
    // alert('AXIOS RESPONSE ERROR: ' + message)

    if (error.response?.status === 401) {
      // 1 flush data
      // 2 local storage, etc
      // 3 redirect to Landing Page/Unauthorized/Login
      // GlobalNavigate?.('/login')
      // toast.error('Session expired, please login again')
      // window.location.href = '/auth/login'
    }

    return Promise.reject(error.response?.data || error)
  }
)

import axios, { type InternalAxiosRequestConfig } from 'axios'
import { env } from '../../env'

export const api = axios.create({
  baseURL: env.API_URL
})

function authRequestInterceptor(config: InternalAxiosRequestConfig): InternalAxiosRequestConfig {
  if (config.headers) {
    config.headers.Accept = 'application/json'
  }

  config.withCredentials = true
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
      // GlobalNavigate?.('/login')
      // toast.error('Session expired, please login again')
      // window.location.href = '/auth/login'
    }

    return Promise.reject(error.response?.data || error)
  }
)

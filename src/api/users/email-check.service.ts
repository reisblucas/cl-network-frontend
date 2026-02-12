import { api } from '@/infra/common/axios'

export async function inputCheck(field: 'email' | 'username', params: URLSearchParams) {
  const response = await api.get(`/users/${field}`, { params })
  return response.data
}

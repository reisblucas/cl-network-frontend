import { api } from '@/infra/common/axios'

export const getPost = async () => {
  return api.get('/carrers')
}

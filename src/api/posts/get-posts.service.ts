import { api } from '@/infra/common/axios'

export const getPosts = async () => {
  return api.get('/carrers')
}

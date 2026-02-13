import { clnapi } from '@/infra/common/axios'

export const getPost = async () => {
  return clnapi.get('/carrers')
}

import { api } from '@/infra/common/axios'

export function deletePost({ id }: { id: number }) {
  return api.delete(`/posts/${id}`)
}

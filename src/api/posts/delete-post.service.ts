import { api } from '@/infra/common/axios'

export function deletePost({ id }: { id: string }) {
  return api.delete(`/posts/${id}`)
}

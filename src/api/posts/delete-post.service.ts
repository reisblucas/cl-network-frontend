import { clnapi } from '@/infra/common/axios'

export function deletePost({ id }: { id: number }) {
  return clnapi.delete(`/posts/${id}`)
}

import { api } from '@/infra/common/axios'
import type { UpdatePostDto } from './update-post.dto'

export const updatePostService = async ({ postId, post }: { postId: number; post: UpdatePostDto }) => {
  return api.patch(`/posts/${postId}`, post)
}

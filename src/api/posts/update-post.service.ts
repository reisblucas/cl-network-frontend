import { api } from '@/infra/common/axios'
import type { UpdatePostDto } from './update-post.dto'

export const updatePostService = async ({ postId, post }: { postId: string; post: UpdatePostDto }) => {
  console.log('postId', postId)
  return api.patch(`/posts/${postId}`, post)
}

import { clnapi } from '@/infra/common/axios'
import type { CreatePostDto } from './create-post.dto'

export const createPost = async ({ data }: { data: CreatePostDto }) => {
  return clnapi.post('/', data)
}

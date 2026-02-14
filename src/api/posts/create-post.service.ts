import { api } from '@/infra/common/axios'
import type { CreatePostDto } from './create-post.dto'

export const createPost = async ({ data }: { data: CreatePostDto }) => {
  return api.post('/', data)
}

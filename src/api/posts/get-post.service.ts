import type { BaseAxiosResponse } from '@/infra/__types__'
import { api } from '@/infra/common/axios'
import type { GetPostsDto } from './get-posts.dto'

export async function getPostsByUser(): BaseAxiosResponse<GetPostsDto> {
  return (await api.get(`/posts/my-posts/`)).data
}

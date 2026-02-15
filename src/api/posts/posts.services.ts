import { api } from '@/infra/common/axios'
import type { CreatePostDto, GetPostsDto, UpdatePostDto } from './posts.dto'
import type { BaseAxiosResponse } from '@/infra/__types__'

export const getPosts = async () => api.get('/carrers')

export async function getPostsByUser(): BaseAxiosResponse<GetPostsDto> {
  return (await api.get(`/posts/my-posts/`)).data
}

export const createPost = async ({ data }: { data: CreatePostDto }) => api.post('/posts', data)

export const updatePostService = async ({ postId, post }: { postId: string; post: UpdatePostDto }) =>
  api.patch(`/posts/${postId}`, post)

export function deletePost({ id }: { id: string }) {
  return api.delete(`/posts/${id}`)
}

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import type { MutationConfig } from '@/infra/common/react-query'
import { useUser } from '@/auth'
import {
  createPost,
  deletePost,
  getPosts,
  getPostsByUser,
  updatePostService
} from './posts.services'

export function useGetPostsQuery() {
  return useQuery({ queryKey: ['posts'], queryFn: getPosts })
}

type UseGetPostByUserOptions = {
  mutationConfig?: MutationConfig<typeof getPostsByUser>
}
export function useGetPostByUserQuery({ mutationConfig = {} }: UseGetPostByUserOptions) {
  const { data: user } = useUser()
  const { onSuccess, ...restConfig } = mutationConfig
  return useQuery({
    queryKey: ['my-posts', user?.username || ''],
    queryFn: getPostsByUser,
    enabled: !!user?.username,
    ...restConfig
  })
}

type UseCreatePostOptions = { mutationConfig?: MutationConfig<typeof createPost> }
export function useCreatePostMutation({ mutationConfig = {} }: UseCreatePostOptions = {}) {
  const queryClient = useQueryClient()
  const { onSuccess, ...restConfig } = mutationConfig
  return useMutation({
    mutationFn: createPost,
    onSuccess: (...args) => {
      queryClient.invalidateQueries({ queryKey: ['posts'] })
      onSuccess?.(...args)
    },
    ...restConfig
  })
}

type UseUpdatePostOptions = { mutationConfig?: MutationConfig<typeof updatePostService> }
export function useUpdatePostQuery({ mutationConfig = {} }: UseUpdatePostOptions) {
  const queryClient = useQueryClient()
  const { onSuccess, ...restConfig } = mutationConfig
  return useMutation({
    mutationFn: updatePostService,
    onSuccess: (...args) => {
      queryClient.invalidateQueries({ queryKey: ['posts'] })
      onSuccess?.(...args)
    },
    ...restConfig
  })
}

type UseDeletePostQueryParams = { mutationConfig?: MutationConfig<typeof deletePost> }
export function useDeletePostQuery({ mutationConfig = {} }: UseDeletePostQueryParams) {
  const { onSuccess, ...rest } = mutationConfig
  return useMutation({
    mutationFn: ({ id }: { id: string }) => deletePost({ id }),
    onSuccess: (...args) => {
      onSuccess?.(...args)
    },
    ...rest
  })
}

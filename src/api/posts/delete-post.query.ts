import { useMutation, useQueryClient } from '@tanstack/react-query'
import { deletePost } from './delete-post.service'
import type { MutationConfig } from '@/infra/common/react-query'

type UseDeletePostQueryParams = {
  mutationConfig: MutationConfig<typeof deletePost>
  postId: number
}

export function useDeletePostQuery({ mutationConfig = {}, postId }: UseDeletePostQueryParams) {
  const queryClient = useQueryClient()

  const { onSuccess, ...rest } = mutationConfig

  return useMutation({
    mutationFn: deletePost,
    onSuccess: (...args) => {
      queryClient.invalidateQueries({ queryKey: ['posts', postId] })
      onSuccess?.(...args)
    },
    ...rest
  })
}

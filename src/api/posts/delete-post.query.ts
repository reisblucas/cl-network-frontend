import { useMutation, useQueryClient } from '@tanstack/react-query'
import { deletePost } from './delete-post.service'
import type { MutationConfig } from '@/infra/common/react-query'

type UseDeletePostQueryParams = {
  mutationConfig: MutationConfig<typeof deletePost>
}

export function useDeletePostQuery({ mutationConfig = {} }: UseDeletePostQueryParams) {
  const queryClient = useQueryClient()
  const { onSuccess, ...rest } = mutationConfig

  return useMutation({
    mutationFn: ({ id }: { id: string }) => deletePost({ id }),
    onSuccess: (...args) => {
      console.log('args 0', args[0])
      console.log('args 1', args[1])
      console.log('args 2', args[2])
      console.log('args 3', args[3])
      // queryClient.invalidateQueries({ queryKey: ['posts', postId] })
      onSuccess?.(...args)
    },
    ...rest
  })
}

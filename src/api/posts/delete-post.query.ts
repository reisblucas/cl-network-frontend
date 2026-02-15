import { useMutation } from '@tanstack/react-query'
import { deletePost } from './delete-post.service'
import type { MutationConfig } from '@/infra/common/react-query'

type UseDeletePostQueryParams = {
  mutationConfig: MutationConfig<typeof deletePost>
}

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

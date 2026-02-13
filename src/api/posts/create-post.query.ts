import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createPost } from './create-post.service'
import type { MutationConfig } from '@/infra/common/react-query'

type UseCreatePostOptions = {
  mutationConfig?: MutationConfig<typeof createPost>
}

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

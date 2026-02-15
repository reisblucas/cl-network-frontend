import { useMutation, useQueryClient } from '@tanstack/react-query'
import { updatePostService } from './update-post.service'
import type { MutationConfig } from '@/infra/common/react-query'

type UseUpdatePostOptions = {
  mutationConfig?: MutationConfig<typeof updatePostService>
}

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

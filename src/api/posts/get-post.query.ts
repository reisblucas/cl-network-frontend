import { useQuery } from '@tanstack/react-query'
import { getPostsByUser } from './get-post.service'
import type { MutationConfig } from '@/infra/common/react-query'
import { useUser } from '@/auth'

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

import { useQuery } from '@tanstack/react-query'
import { getPost } from './get-posts.service'

export function useGetPostsQuery() {
  return useQuery({
    queryKey: ['posts'],
    queryFn: getPost
  })
}

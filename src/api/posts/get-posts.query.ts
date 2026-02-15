import { useQuery } from '@tanstack/react-query'
import { getPosts } from './get-posts.service'

export function useGetPostsQuery() {
  return useQuery({
    queryKey: ['posts'],
    queryFn: getPosts
  })
}

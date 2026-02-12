import { useQuery } from '@tanstack/react-query'
import { inputCheck } from './email-check.service'

export function useEmailCheckQuery({ email }: { email: string }) {
  const params = new URLSearchParams()
  params.set('exists', email)

  return useQuery({
    queryKey: ['email-check', email],
    queryFn: async () => inputCheck('email', params),
    enabled: !!email
  })
}

import { Navigate, useLocation } from 'react-router'
import { paths } from '@/infra/paths'
import { useUser } from '../auth.config'
import { toast } from 'sonner'

export const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const user = useUser()
  const location = useLocation()

  if (!user.data) {
    toast.error('Session expired, please login again')
    return <Navigate to={paths.auth.login.getHref(location.pathname)} />
  }

  return children
}

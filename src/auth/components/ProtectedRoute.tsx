import { Navigate, useLocation } from 'react-router'
import { paths } from '@/infra/paths'
import { useUser } from '../auth.config'

export const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const user = useUser()
  const location = useLocation()

  if (!user.data) {
    return <Navigate to={paths.auth.login.getHref(location.pathname)} />
  }

  return children
}

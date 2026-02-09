import { ProtectedRoute } from '@/infra/common/auth/ProtectedRoute'
import { paths } from '@/infra/paths'
import { QueryClient } from '@tanstack/react-query'
import { createBrowserRouter } from 'react-router'
import { AppRoot } from './routes/root'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const convert = (queryClient: QueryClient) => (m: any) => {
  const { clientLoader, clientAction, default: Component, ...rest } = m

  return {
    ...rest,
    loader: clientLoader?.(queryClient),
    action: clientAction?.(queryClient),
    Component
  }
}

export const createAppRouter = (queryClient: QueryClient) =>
  createBrowserRouter([
    // {
    //   path: paths.home.path,
    //   lazy: () => import('./routes/landing').then(convert(queryClient))
    // },
    {
      path: paths.home.path,
      lazy: () => import('./routes/auth/login').then(convert(queryClient))
    },
    {
      path: paths.app.root.path,
      element: (
        <ProtectedRoute>
          <AppRoot />
        </ProtectedRoute>
      )
    }
  ])

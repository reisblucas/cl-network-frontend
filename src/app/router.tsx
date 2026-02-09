import { ProtectedRoute } from '@/auth/ProtectedRoute'
import { paths } from '@/infra/paths'
import { QueryClient, useQueryClient } from '@tanstack/react-query'
import { createBrowserRouter, RouterProvider } from 'react-router'
import { AppRoot, AppRootErrorBoundary } from './routes/app/root'
import { useMemo } from 'react'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const convert = (queryClient: QueryClient) => (mod: any) => {
  const { clientLoader, clientAction, default: DefaultComponent, Page, ...rest } = mod
  // allowed Default Export and Named Export
  const Component = DefaultComponent ?? Page

  return {
    ...rest,
    loader: clientLoader?.(queryClient),
    action: clientAction?.(queryClient),
    Component
  }
}

export const createAppRouter = (queryClient: QueryClient) =>
  createBrowserRouter([
    {
      path: paths.home.path,
      lazy: () => import('./routes/Landing').then(convert(queryClient))
    },
    // {
    //   path: paths.auth.login.path,
    //   lazy: () => import('./routes/auth/login').then(convert(queryClient))
    // },
    // {
    //   path: paths.auth.register.path,
    //   lazy: () => import('./routes/auth/register').then(convert(queryClient))
    // },
    {
      path: paths.app.root.path,
      ErrorBoundary: AppRootErrorBoundary,
      element: (
        <ProtectedRoute>
          <AppRoot />
        </ProtectedRoute>
      )
    },
    {
      path: '*',
      lazy: () => import('./routes/NotFound').then(convert(queryClient))
    }
  ])

export const AppRouter = () => {
  const queryClient = useQueryClient()
  const router = useMemo(() => createAppRouter(queryClient), [queryClient])

  return <RouterProvider router={router} />
}

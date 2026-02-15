import { ProtectedRoute } from '@/auth/components/ProtectedRoute'
import { paths } from '@/infra/paths'
import { QueryClient, useQueryClient } from '@tanstack/react-query'
import { createBrowserRouter, RouterProvider } from 'react-router'
import { AppRoot, AppRootErrorBoundary } from './routes/app/root'
import { useMemo } from 'react'
import { LandingRoute } from './routes/landing.route'
import { NotFoundRoute } from './routes/not-found.route'
import { LoginRoute } from './routes/auth/login.route'
import { AppLayout, PublicLayout } from '@/components/layouts'
import { RegisterRoute } from './routes/auth/register.route'
import { PostsRoute } from './routes/app/posts.route'

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

const createAppRouter = (queryClient: QueryClient) =>
  createBrowserRouter([
    {
      path: paths.home.path,
      element: (
        <PublicLayout title="Landing">
          <AppRoot />
        </PublicLayout>
      ),
      lazy: () => import('./routes/landing.route').then(convert(queryClient)),
      children: [
        {
          path: paths.home.path,
          lazy: () => import('./routes/landing.route').then(convert(queryClient)),
          element: <LandingRoute />
        },
        {
          path: paths.auth.login.path,
          lazy: () => import('./routes/auth/login.route').then(convert(queryClient)),
          element: <LoginRoute />
        },
        {
          path: paths.auth.register.path,
          lazy: () => import('./routes/auth/register.route').then(convert(queryClient)),
          element: <RegisterRoute />
        }
      ]
    },
    {
      path: paths.app.root.path,
      ErrorBoundary: AppRootErrorBoundary,
      element: (
        <ProtectedRoute>
          <AppLayout>
            <AppRoot />
          </AppLayout>
        </ProtectedRoute>
      ),
      children: [
        // {
        //   path: paths.app.settings.path,
        //   element: <SettingsRoute />
        // },
        // {
        //   path: paths.app.profile.path,
        //   element: <ProfileRoute />
        // },
        {
          path: paths.app.root.path,
          lazy: () => import('./routes/app/posts.route').then(convert(queryClient)),
          element: <PostsRoute />
        },
        {
          path: paths.app.posts.path,
          lazy: () => import('./routes/app/posts.route').then(convert(queryClient)),
          element: <PostsRoute />
        }
      ]
    },
    {
      path: '*',
      element: <NotFoundRoute />,
      lazy: () => import('./routes/not-found.route').then(convert(queryClient))
    }
  ])

export const AppRouter = () => {
  const queryClient = useQueryClient()
  const router = useMemo(() => createAppRouter(queryClient), [queryClient])

  return <RouterProvider router={router} />
}

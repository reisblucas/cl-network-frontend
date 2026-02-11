import { queryConfig } from '@/infra/common/react-query'
import { ErrorBoundary } from 'react-error-boundary'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import React, { useState } from 'react'
import { MainErrorFallback } from '@/components/errors/main'
import { AuthLoader } from '@/auth'
import { Spinner } from '@/components/ui/spinner'
import { ThemeProvider } from '@/providers'

type AppProviderProps = {
  children: React.ReactNode
}

export function AppProvider({ children }: AppProviderProps) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: queryConfig
      })
  )

  return (
    <React.Suspense fallback={<div>Loading...(React Suspense)</div>}>
      <ErrorBoundary FallbackComponent={MainErrorFallback}>
        <QueryClientProvider client={queryClient}>
          {import.meta.env.DEV && <ReactQueryDevtools />}
          {/* Notifications */}
          <ThemeProvider>
            <AuthLoader
              renderLoading={() => (
                <div className="flex h-screen w-screen items-center justify-center">
                  <Spinner className="size-3" />
                </div>
              )}
            >
              {children}
            </AuthLoader>
          </ThemeProvider>
        </QueryClientProvider>
      </ErrorBoundary>
    </React.Suspense>
  )
}

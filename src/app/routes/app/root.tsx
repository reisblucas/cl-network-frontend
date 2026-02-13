import { Outlet } from 'react-router'

export const AppRootErrorBoundary = () => {
  return <div>Something went wrong</div>
}

export const AppRoot = () => {
  return <Outlet />
}

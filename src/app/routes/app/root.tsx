import { Outlet } from 'react-router'

export const ErrorBoundary = () => {
  return <div>Something went wrong</div>
}

export const AppRoot = () => {
  return (
    // app layout
    <div>
      Wrap OUTLET with layout shell
      <Outlet />
    </div>
  )
}

import { Outlet } from 'react-router'

export const AppRootErrorBoundary = () => {
  return <div>Something went wrong</div>
}

export const AppRoot = () => {
  return (
    // app layout if needed
    <div>
      Wrap OUTLET with layout shell
      {/* <Outlet /> */}
    </div>
  )
}

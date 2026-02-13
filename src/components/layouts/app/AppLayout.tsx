import { Flex } from '../../common'
import { AppSidebar } from './sidebar'

interface AppLayoutProps {
  children: React.ReactNode
}

export function AppLayout({ children }: AppLayoutProps) {
  return (
    <Flex className="flex-column bg-amber-200">
      <AppSidebar />
      {/* mobileHeader based on breakpoint? */}
      {children}
    </Flex>
  )
}

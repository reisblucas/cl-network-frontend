import { Flex } from '../../common'
import { AppSidebar } from './sidebar'

interface AppLayoutProps {
  children: React.ReactNode
}

export function AppLayout({ children }: AppLayoutProps) {
  return (
    <Flex className="flex-column w-full">
      <AppSidebar />
      {/* mobileHeader based on breakpoint? */}
      <Flex className="@container p-2 justify-center">{children}</Flex>
    </Flex>
  )
}

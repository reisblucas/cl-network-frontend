import { Flex } from '../../common'
import { AppSidebar } from './sidebar'

interface AppLayoutProps {
  children: React.ReactNode
}

export function AppLayout({ children }: AppLayoutProps) {
  return (
    <Flex className="flex-column">
      <AppSidebar />
      {/* mobileHeader based on breakpoint? */}
      <Flex className="justify-center sm:min-w-4/5">{children}</Flex>
    </Flex>
  )
}

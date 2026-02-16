import { SidebarInset, SidebarTrigger } from '@/components/ui/sidebar'
import { AppSidebar } from './sidebar'
import { Flex } from '@/components/common'

interface AppLayoutProps {
  children: React.ReactNode
}

export function AppLayout({ children }: AppLayoutProps) {
  return (
    <>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-14 shrink-0 items-center gap-2 border-b border-border px-4">
          <SidebarTrigger className="-ml-1" />
          {/* <span className="text-sm font-medium">CL Network</span> */}
        </header>
        <Flex className="@container justify-center flex-1 p-4">{children}</Flex>
      </SidebarInset>
    </>
  )
}

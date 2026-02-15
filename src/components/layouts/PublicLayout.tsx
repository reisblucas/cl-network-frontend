import { useLocation, useNavigate } from 'react-router'
import { Flex } from '../common'
import { paths } from '@/infra/paths'
import { Button } from '../ui/button'
import { DarkModeToggle } from '../common/DarkModeToggle'
import { ArrowLeftCircle } from 'lucide-react'

type PublicLayoutProps = {
  children: React.ReactNode
  title: string
}

export function PublicLayout({ children }: PublicLayoutProps) {
  const navigate = useNavigate()
  const location = useLocation()
  const isHome = location.pathname === paths.home.path
  return (
    <Flex className="h-full flex-col">
      <Flex className="relative flex justify-between border-b border-border p-2">
        <Flex className="items-center">
          {!isHome && (
            <Button variant="link" className="w-24 cursor-pointer" onClick={() => navigate(paths.home.getHref())}>
              <ArrowLeftCircle />
              Home
            </Button>
          )}
        </Flex>
        <Flex className="justify-end gap-2">
          <Button variant="link" className="w-24 cursor-pointer" onClick={() => navigate(paths.auth.login.getHref())}>
            Login
          </Button>
          <DarkModeToggle />
        </Flex>
      </Flex>

      {children}
    </Flex>
  )
}

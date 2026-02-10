import { Link, useLocation, useNavigate } from 'react-router'
import { Flex } from '../common'
import { paths } from '@/infra/paths'
import { Button } from '../ui/button'
import { ArrowLeftCircle } from 'lucide-react'

type PublicLayoutProps = {
  children: React.ReactNode
  title: string
}

const navlinks = {
  home: '/',
  login: '/login'
}

export function PublicLayout({ children }: PublicLayoutProps) {
  const navigate = useNavigate()
  const location = useLocation()
  const isHome = location.pathname === paths.home.path
  return (
    <Flex className=" h-full flex-col">
      {/* header */}

      <Flex className="flex-col  p-2 border-b border-b-zinc-400">
        {!isHome && (
          <Button
            variant="default"
            className={`w-24 cursor-pointer`}
            disabled={isHome}
            onClick={() => navigate(paths.home.getHref())}
          >
            <ArrowLeftCircle />
            Home
          </Button>
        )}

        <Button
          variant="link"
          className={`w-24 cursor-pointer self-end`}
          onClick={() => navigate(paths.auth.login.getHref())}
        >
          Login
        </Button>
      </Flex>

      {children}
    </Flex>
  )
}

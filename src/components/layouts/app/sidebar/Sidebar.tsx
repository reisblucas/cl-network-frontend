import { useLogout } from '@/auth'
import { Flex } from '@/components/common'
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarRail } from '@/components/ui/sidebar'
import { paths } from '@/infra/paths'
import { decode } from '@/testing/mocks/utils'
import Cookies from 'js-cookie'
import { LogOutIcon, Settings, User, FileText, Bell, Send, Bug, Waypoints, type LucideIcon } from 'lucide-react'
import { useCallback, useMemo } from 'react'
import { useNavigate } from 'react-router'
import { toast } from 'sonner'
import { NavMain } from './NavMain'
import { NavSecondary } from './NavSecondary'
import { Tenant } from './Tenant'
import { env } from '@/infra/env'

const sidebar_nav: {
  navMain: {
    label: string
    href: (param?: string | null | undefined) => string
    icon: LucideIcon
    isActive: boolean
    items: { label: string; href: (param?: string | null | undefined) => string; isActive: boolean }[]
  }[]
  navSecondary: {
    label: string
    href: (param?: string | null | undefined) => string
    icon: LucideIcon
    isActive: boolean
  }[]
} = {
  navMain: [
    {
      label: 'Posts',
      href: paths.app.posts.getHref,
      icon: FileText,
      isActive: true,
      items: [
        {
          label: 'My Posts',
          href: (param?: string | null | undefined) => paths.app.post.getHref(param ?? ''),
          isActive: true
        },
        { label: 'Liked Posts', href: paths.app.root.getHref, isActive: false },
        { label: 'Mentions', href: paths.app.root.getHref, isActive: false },
        { label: 'Archived', href: paths.app.root.getHref, isActive: false }
      ]
    },
    {
      label: 'Notifications',
      href: paths.app.root.getHref,
      icon: Bell,
      isActive: false,
      items: []
    }
  ],
  navSecondary: [
    {
      label: 'Feedback',
      href: () => '#',
      icon: Send,
      isActive: false
    },
    {
      label: 'Bug',
      href: () => '#',
      icon: Bug,
      isActive: false
    }
  ]
}

export function AppSidebar() {
  const navigate = useNavigate()
  const logout = useLogout()

  const handleLogout = useCallback(() => {
    const cookie = Cookies.get(env.AUTH_COOKIE)
    if (cookie) {
      const decoded = decode(cookie)
      console.log('cookies', decoded)

      logout.mutate({ id: decoded.id })
      toast.success('Logged out successfully')
      navigate(paths.auth.login.getHref())
    } else {
      toast.error('No cookie found when trying to logout')
    }
  }, [logout, navigate])

  const USER_OPTIONS: { label: string; icon: React.ElementType; action: () => void; disabled: boolean }[] = useMemo(
    () => [
      { label: 'Profile', icon: User, action: paths.app.profile.getHref, disabled: true },
      {
        label: 'Settings',
        icon: Settings,
        action: paths.app.settings.getHref,
        disabled: true
      },
      { label: 'Logout', icon: LogOutIcon, action: handleLogout, disabled: false }
    ],
    [handleLogout]
  )

  return (
    <Sidebar collapsible="icon">
      {/* header + icon */}
      <SidebarHeader>
        <Tenant />
      </SidebarHeader>
      {/*  */}
      <SidebarContent>
        <NavMain items={sidebar_nav.navMain} />
        <NavSecondary className="mt-auto" items={sidebar_nav.navSecondary} />
      </SidebarContent>

      <SidebarFooter>{/* <NavUser user={users} /> */}</SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}

import { useLogout } from '@/auth'
import { Flex } from '@/components/common'
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarRail } from '@/components/ui/sidebar'
import { paths } from '@/infra/paths'
import { AUTH_COOKIE, decode } from '@/testing/mocks/utils'
import Cookies from 'js-cookie'
import { LogOutIcon, Settings, User, FileText, Bell, Send, Bug, Waypoints } from 'lucide-react'
import { useCallback, useMemo } from 'react'
import { useNavigate } from 'react-router'
import { toast } from 'sonner'
import { NavMain } from './NavMain'
import { NavSecondary } from './NavSecondary'
import { Tenant } from './Tenant'

const sidebar_nav = {
  navMain: [
    {
      label: 'Posts',
      href: paths.app.root.getHref(),
      icon: FileText,
      isActive: true,
      items: [
        {
          label: 'My Posts',
          href: paths.app.root.getHref(),
          isActive: true
        },
        { label: 'Liked Posts', href: paths.app.root.getHref(), isActive: false },
        { label: 'Mentions', href: paths.app.root.getHref(), isActive: false },
        { label: 'Archived', href: paths.app.root.getHref(), isActive: false }
      ]
    },
    {
      label: 'Notifications',
      href: paths.app.root.getHref(),
      icon: Bell,
      isActive: false,
      items: []
    }
  ],
  navSecondary: [
    {
      label: 'Feedback',
      href: '#',
      icon: Send,
      isActive: false
    },
    {
      label: 'Bug',
      href: '#',
      icon: Bug,
      isActive: false
    }
  ]
}

export function AppSidebar() {
  const navigate = useNavigate()
  const logout = useLogout()

  const handleLogout = useCallback(() => {
    const cookie = Cookies.get(AUTH_COOKIE)
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

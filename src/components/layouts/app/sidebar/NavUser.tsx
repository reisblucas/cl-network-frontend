import { useUser } from '@/auth'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar
} from '@/components/ui/sidebar'
import { paths } from '@/infra/paths'
import { ChevronsUpDown, LogOutIcon, Settings } from 'lucide-react'
import { useNavigate } from 'react-router'

interface NavUserProps {
  onLogout: () => void
  /** Optional: Replace the default placeholder with your profile/avatar component */
  profilePicture?: React.ReactNode
}

export function NavUser({ onLogout, profilePicture }: NavUserProps) {
  const { data: user } = useUser()
  const { isMobile } = useSidebar()
  const navigate = useNavigate()

  const username = user?.username ?? 'User'

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              {/* Minimal profile picture div - pass profilePicture prop to replace */}
              {profilePicture ?? (
                <div className="flex size-8 shrink-0 items-center justify-center rounded-full bg-sidebar-accent">
                  <span className="text-xs font-medium text-sidebar-accent-foreground">
                    {username.slice(0, 2).toUpperCase()}
                  </span>
                </div>
              )}
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-semibold">{username}</span>
              </div>
              <ChevronsUpDown className="ml-auto size-4 shrink-0" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
            side={isMobile ? 'bottom' : 'right'}
            align="end"
            sideOffset={4}
          >
            <DropdownMenuItem onClick={() => navigate(paths.app.settings.getHref())}>
              <Settings className="size-4" />
              Settings
            </DropdownMenuItem>
            <DropdownMenuItem variant="destructive" onClick={onLogout}>
              <LogOutIcon className="size-4" />
              Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  )
}

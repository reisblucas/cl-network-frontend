import { SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar'
import { paths } from '@/infra/paths'
import { Waypoints } from 'lucide-react'
import { useNavigate } from 'react-router'

export function Tenant() {
  const navigate = useNavigate()

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <SidebarMenuButton onClick={() => navigate(paths.app.root.getHref())}>
          <Waypoints />
          <span>CL Network</span>
        </SidebarMenuButton>
      </SidebarMenuItem>
    </SidebarMenu>
  )
}

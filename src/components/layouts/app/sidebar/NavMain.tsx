import { Button } from '@/components/ui/button'
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible'
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem
} from '@/components/ui/sidebar'
import { ChevronRight, type LucideIcon } from 'lucide-react'
import { Link, useNavigate } from 'react-router'

interface NavMainProps {
  items: {
    label: string
    href: (param?: string | null | undefined) => string
    icon: LucideIcon
    isActive: boolean
    items?: {
      label: string
      href: (param?: string | null | undefined) => string
      isActive: boolean
    }[]
  }[]
}

export function NavMain({ items }: NavMainProps) {
  const navigate = useNavigate()

  const handleNavCSSActive = (isActive: boolean) => {
    return isActive ? 'pointer-events-auto' : 'pointer-events-none opacity-30'
  }

  return (
    <SidebarGroup>
      <SidebarGroupLabel>Social</SidebarGroupLabel>

      <SidebarMenu>
        {items.map((item) => (
          <Collapsible key={item.label} asChild defaultOpen={item.isActive}>
            <SidebarMenuItem>
              <SidebarMenuButton tooltip={item.label} asChild className={`${handleNavCSSActive(item.isActive)}`}>
                <Link to={item.href()}>
                  <item.icon />
                  <span>{item.label}</span>
                </Link>
              </SidebarMenuButton>
              {/* subitems */}
              {item.items?.length ? (
                <>
                  <CollapsibleTrigger asChild>
                    <SidebarMenuAction className="data-[state=open]:rotate-90">
                      <ChevronRight />
                      <span className="sr-only">Toggle</span>
                    </SidebarMenuAction>
                  </CollapsibleTrigger>
                  <CollapsibleContent>
                    <SidebarMenuSub>
                      {item.items?.map((subitem) => (
                        <SidebarMenuSubItem key={subitem.label}>
                          <SidebarMenuSubButton asChild>
                            <Button
                              variant="link"
                              className={`justify-start ${handleNavCSSActive(subitem.isActive)}`}
                              asChild
                              onClick={() => navigate(subitem.href())}
                            >
                              <span>{subitem.label}</span>
                            </Button>
                          </SidebarMenuSubButton>
                        </SidebarMenuSubItem>
                      ))}
                    </SidebarMenuSub>
                  </CollapsibleContent>
                </>
              ) : null}
              {/* end subitems */}
            </SidebarMenuItem>
          </Collapsible>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  )
}

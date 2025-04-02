"use client"

import { ChartColumnIncreasing, HandCoins, Ambulance, SunSnow, Gem } from "lucide-react"
 
import {
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarFooter
} from "@workspace/ui/components/sidebar"

import { NavUser } from "@/components/sidebar/nav-user"

import { useClerk } from "@clerk/nextjs";
 
// Menu items.
const items = [
  {
    title: "Dashboard",
    url: "#",
    icon: ChartColumnIncreasing,
  },
  {
    title: "Revenue Trends",
    url: "#",
    icon: SunSnow,
  },
  {
    title: "Invoices & Payments",
    url: "#",
    icon: HandCoins,
  },
  {
    title: "Recovery",
    url: "#",
    icon: Ambulance,
  },
]
 
export function AppSidebar() {
  const { user: clerkUser } = useClerk();
  if (!clerkUser) return null;

  const data = {
    user: {
      name: clerkUser.fullName || "",
      email: clerkUser.primaryEmailAddress?.emailAddress || "",
      avatar: clerkUser.imageUrl || "",
    },
  }
  
  return (
    <Sidebar>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild className="data-[slot=sidebar-menu-button]:!p-1.5">
              <a href="#">
                <img className="h-9 w-9" src="/logo.png"/>
                <span className="text-primary font-semibold text-2xl">Revzilla</span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
    </Sidebar>
  )
}
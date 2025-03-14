"use client"

import { Calendar, Home, Inbox, Search, Settings, OctagonAlert } from "lucide-react"
 
import {
  Sidebar,
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
    title: "Home",
    url: "#",
    icon: Home,
  },
  {
    title: "Vital",
    url: "#",
    icon: OctagonAlert,
  },
  {
    title: "Calendar",
    url: "#",
    icon: Calendar,
  },
  {
    title: "Tasks",
    url: "#",
    icon: Search,
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
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Application</SidebarGroupLabel>
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
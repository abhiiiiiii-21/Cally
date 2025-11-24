"use client"

import * as React from "react"
import {
  BookOpen,
  Bot,
  Calendar1Icon,
  CalendarIcon,
  ClockIcon,
  Command,
  Frame,
  LayoutGridIcon,
  LifeBuoy,
  Map,
  PieChart,
  Send,
  Settings2,
  SquareTerminal,
  UsersIcon,
} from "lucide-react"

import { NavMain } from "@/components/nav-main"

import { NavUser } from "@/components/nav-user"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import Image from "next/image"
import { useRouter } from "next/navigation";

const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },

  navMain: [
    {
      title: "Dashboard",
      url: "/dashboard",
      icon: LayoutGridIcon,
      isActive: true
    },
    {
      title: "Events",
      url: "/events",
      icon: CalendarIcon
    },
    {
      title: "Meetings",
      url: "/meetings",
      icon: UsersIcon
    },
    {
      title: "Availability",
      url: "/availability",
      icon: ClockIcon
    },
  ]
}

export function AppSidebar(props) {
  const router = useRouter();

  function onClickIcon() {
    router.push("/");
  }

  return (
    <Sidebar variant="inset" collapsible="icon" className="font-urbanist">
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" onClick={onClickIcon}>
              <div className="flex items-center gap-3">
                <div className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
                  <Image src="/Logo/C.png" width={300} height={300} alt="Logo" />
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-medium">Cally</span>
                  <span className="truncate text-xs text-neutral-400">Scheduler</span>
                </div>
              </div>
            </SidebarMenuButton>

          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
    </Sidebar>
  )
}

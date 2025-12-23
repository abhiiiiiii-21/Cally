"use client"

import * as React from "react"
import {
  CalendarIcon,
  ClockIcon,
  LayoutGridIcon,
  SquareArrowOutUpRight,
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
      url: "/meetings/upcoming",
      icon: UsersIcon,
    },
    {
      title: "Availability",
      url: "/availability",
      icon: ClockIcon
    },
    {
      title: "Public Profile",
      url: "/public-page",
      icon: SquareArrowOutUpRight
    }
  ]
}

export function AppSidebar(props) {
  const router = useRouter();
  const [user, setUser] = React.useState({
    name: "User",
    email: "user@example.com",
    avatar: "/Profile/Avatar1.png",
  });

  React.useEffect(() => {
    const fetchUser = async () => {
      try {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 500));
        setUser({
          name: "John Doe",
          email: "john@example.com",
          avatar: "https://github.com/shadcn.png",
        });
      } catch (error) {
        console.error("Failed to fetch user:", error);
      }
    };
    fetchUser();
  }, []);

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
                <div className="bg-[#343a40] text-sidebar-primary-foreground flex aspect-square size-9 items-center justify-center rounded-lg">
                  <Image src="/Logo/C.png" width={300} height={300} alt="Logo" />
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-medium">Cally</span>
                  <span className="truncate text-xs text-neutral-400">Meeting Scheduler</span>
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
        <NavUser user={user} />
      </SidebarFooter>
    </Sidebar>
  )
}

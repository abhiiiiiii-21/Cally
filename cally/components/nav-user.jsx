"use client"

import { ChevronsUpDown, LogOut, SquareArrowOutUpRightIcon, UserIcon } from "lucide-react"

import { Avatar, AvatarImage } from "@/components/ui/avatar"
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { SidebarMenu, SidebarMenuButton, SidebarMenuItem, useSidebar } from "@/components/ui/sidebar"
import { useRouter } from "next/navigation"
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog"
import { Button } from "./ui/button"
import { useState } from "react"

export function NavUser({ user }) {
    const { isMobile } = useSidebar()

    const router = useRouter();
    const [loading, setLoading] = useState(false)

    const navigateToProfile = () => {
        router.push('/settings/edit-profile');
    }

    async function logoutUser() {
        setLoading(true)
        await new Promise(resolve => setTimeout(resolve, 500))
        localStorage.removeItem('token')
        setLoading(false)
        router.push('/auth/log-in')
    }

    return (
        <SidebarMenu>
            <SidebarMenuItem>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <SidebarMenuButton
                            size="lg"
                            className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground cursor-pointer"
                        >
                            <Avatar className="h-8 w-8 rounded-lg">
                                <AvatarImage src={user.avatar || '/Profile/avatar.png'} alt={user.name} />
                            </Avatar>
                            <div className="grid flex-1 text-left text-sm leading-tight">
                                <span className="truncate font-medium">{user.name}</span>
                                <span className="truncate text-xs">{user.email}</span>
                            </div>
                            <ChevronsUpDown className="ml-auto size-4" />
                        </SidebarMenuButton>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent
                        className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg bg-neutral-900 font-urbanist"
                        side={isMobile ? "bottom" : "right"}
                        align="end"
                        sideOffset={4}
                    >
                        <DropdownMenuLabel className="p-0 font-normal">
                            <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                                <Avatar className="h-8 w-8 rounded-lg">
                                    <AvatarImage src={user.avatar || '/Profile/avatar.png'} alt={user.name} />
                                </Avatar>
                                <div className="grid flex-1 text-left text-sm leading-tight">
                                    <span className="truncate font-medium">{user.name}</span>
                                    <span className="truncate text-xs">{user.email}</span>
                                </div>
                            </div>
                        </DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuGroup>
                            <DropdownMenuItem onClick={navigateToProfile} className="cursor-pointer">
                                <UserIcon />
                                Edit Profile
                            </DropdownMenuItem>
                            <DropdownMenuItem className="cursor-pointer">
                                <SquareArrowOutUpRightIcon />
                                View Public Profile
                            </DropdownMenuItem>
                        </DropdownMenuGroup>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                            className="cursor-pointer p-0"
                            onSelect={(e) => e.preventDefault()}
                            variant="destructive"
                        >
                            <Dialog>
                                <DialogTrigger asChild>
                                    <div className="flex items-center gap-2 w-full px-2 py-1.5">
                                        <LogOut className="h-4 w-4 text-destructive" />
                                        <span className="text-destructive">Log out</span>
                                    </div>
                                </DialogTrigger>
                                <DialogContent className="font-urbanist">
                                    <DialogHeader>
                                        <DialogTitle>
                                            Confirm Logout
                                        </DialogTitle>
                                        <DialogDescription>
                                            Are you sure you want to log out?
                                        </DialogDescription>
                                    </DialogHeader>

                                    <DialogFooter>
                                        <DialogClose asChild>
                                            <Button variant="outline" className="cursor-pointer" size="sm">
                                                Cancel
                                            </Button>
                                        </DialogClose>

                                        <Button
                                            onClick={() => logoutUser()}
                                            className="cursor-pointer" size="sm" variant="destructive">
                                            {loading ? "Logging Out ..." : 'Logout'}
                                        </Button>
                                    </DialogFooter>
                                </DialogContent>
                            </Dialog>
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </SidebarMenuItem>
        </SidebarMenu>
    )
}

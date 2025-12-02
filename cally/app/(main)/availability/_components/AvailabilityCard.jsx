"use client"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { toastManager } from "@/components/ui/toast"
import AvailabilityTimings from "@/data/AvailabilityTimings"
import { CopyIcon, EllipsisIcon, GlobeIcon, MenuIcon, MoreHorizontalIcon, PencilIcon, StarIcon, Trash2Icon } from "lucide-react"

const item = AvailabilityTimings

const AvailabilityCard = () => {
    const deleteAlertToast = () => {
        toastManager.add({
            title: "Schedule deleted successfully!",
            type: "success",
        });

    }

    const updateAlertToast = () => {
        toastManager.add({
            title: "Schedule updated successfully!",
            type: "success",
        });

    }
    return (
        <div className='w-full max-w-7xl space-y-3 items-start'>
            {item.map((avail) => (
                <div key={avail.id} className='bg-background border border-border rounded-lg p-6 hover:bg-accent/10 transition-colors'>
                    <div className="flex justify-between">
                        <div>
                            <div className="flex items-center gap-3">
                                <p className="text-xl font-medium">{avail.title}</p>
                                {
                                    avail.default &&
                                    (<Badge variant="secondary" className="mt-2 rounded-md">
                                        Default
                                    </Badge>)
                                }
                            </div>

                            <p className="text-neutral-500 text-sm">{avail.daysTime}</p>
                            <div className="text-neutral-500 flex items-center gap-1">
                                <GlobeIcon className="h-3 w-3" />
                                <p className="text-sm">{avail.timezone}</p>
                            </div>
                        </div>


                        <div>
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button variant="outline" size="sm" className="cursor-pointer h-8 w-8">
                                        <EllipsisIcon />
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end" className="w-52 font-urbanist bg-black">
                                    {
                                        !avail.default &&
                                        (
                                            <DropdownMenuGroup >
                                                <DropdownMenuItem className="cursor-pointer" onClick={updateAlertToast}>
                                                    <StarIcon />
                                                    Set as default
                                                </DropdownMenuItem>
                                            </DropdownMenuGroup>
                                        )
                                    }

                                    <DropdownMenuGroup>
                                        <DropdownMenuItem className="cursor-pointer">
                                            <CopyIcon />
                                            Duplicate
                                        </DropdownMenuItem>
                                    </DropdownMenuGroup>
                                    <DropdownMenuGroup>
                                        <DropdownMenuItem variant="destructive" className="cursor-pointer" onClick={deleteAlertToast}>
                                            <Trash2Icon />
                                            Delete
                                        </DropdownMenuItem>
                                    </DropdownMenuGroup>

                                </DropdownMenuContent>
                            </DropdownMenu>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default AvailabilityCard
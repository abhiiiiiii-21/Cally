"use client";
import { useEffect, useState } from "react";

import {
    Sortable,
    SortableItem,
    SortableItemHandle,
} from "@/components/ui/sortable";

import {
    ClockIcon,
    CopyIcon,
    ExternalLinkIcon,
    GripVertical,
    LinkIcon,
    MoreHorizontalIcon,
    PencilIcon,
    PlusCircleIcon,
    Trash2Icon,
} from "lucide-react";

import { Switch } from "@/components/ui/switch";
import { ButtonGroup } from "@/components/ui/button-group";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";

import NoEventsAvailable from "./NoEventsAvailable";
import EventsSheet from "./EventsSheet";
import { toastManager } from "@/components/ui/toast";
import { useRouter } from "next/navigation";

export default function EventsCardList({ events, onEventCreated, onEventDeleted, onEventUpdated }) {
    const [isSheetOpen, setIsSheetOpen] = useState(false);
    const [editingEvent, setEditingEvent] = useState(null);
    const [isCreating, setIsCreating] = useState(false);
    const router = useRouter();

    const handleEdit = (event) => {
        setEditingEvent(event);
        setIsSheetOpen(true);
    };

    const getItemValue = (item) => item.id;

    const handleDelete = async (eventId) => {
        const token = localStorage.getItem("token");

        if (!token) {
            router.push('/auth/log-in')
            return;
        }

        const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/events/${eventId}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        });


        if (res.ok) {
            onEventDeleted(eventId);

            toastManager.add({
                description: "Event deleted successfully!",
                type: "success",
            });

        }
    };

    const handleDuplicate = async (eventId) => {
        const token = localStorage.getItem("token");

        if (!token) {
            router.push('/auth/log-in')
            return;
        }

        const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/events/${eventId}/duplicate`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        });

        if (res.ok) {
            const data = await res.json();
            onEventCreated(data);
            toastManager.add({
                description: "Event duplicated successfully!",
                type: "success",
            });
        }
    }

    const handleToggleProfile = async (eventId, currentValue) => {
        const token = localStorage.getItem("token");

        if (!token) {
            router.push('/auth/log-in')
            return;
        }

        const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/events/${eventId}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
                showOnProfile: !currentValue,
            }),
        });

        if (res.ok) {
            const data = await res.json();
            onEventUpdated(data);
            toastManager.add({
                description: !currentValue ? "Event is now visible on your profile" : "Event is now hidden from your profile",
                type: "success",
            });
        }
    }


    return (
        <div className="w-full max-w-8xl space-y-8 mt-8 items-start">

            {events.length === 0 ? (
                <NoEventsAvailable onCreate={onEventCreated} />
            ) : (
                <Sortable value={events} getItemValue={getItemValue} strategy="vertical"
                    className="space-y-2">
                    {events.map((item) => (
                        <SortableItem key={item.id} value={item.id}>
                            <div className="flex items-center gap-3 p-6 bg-background border border-border rounded-lg hover:bg-accent/10 transition-colors">
                                <SortableItemHandle className="text-muted-foreground hover:text-foreground">
                                    <GripVertical className="h-4 w-4" />
                                </SortableItemHandle>

                                <div className="flex-1 min-w-0">
                                    <h4 className="font-medium text-sm truncate">
                                        {item.title}
                                    </h4>
                                    <p className="text-xs text-muted-foreground truncate">
                                        {item.description}
                                    </p>

                                    <Badge variant="secondary" className="mt-3 rounded-md">
                                        <ClockIcon />
                                        {item.duration} min
                                    </Badge>
                                </div>

                                <div className="flex items-center gap-4">
                                    <TooltipProvider delayDuration={0}>
                                        <Tooltip>
                                            <TooltipTrigger asChild>
                                                <span className="inline-flex">
                                                    <Switch checked={item.showOnProfile} onCheckedChange={() => handleToggleProfile(item.id, item.showOnProfile)} />
                                                </span>
                                            </TooltipTrigger>
                                            <TooltipContent className="bg-white text-black px-2 py-1 text-xs">
                                                {item.showOnProfile
                                                    ? "Hide from profile"
                                                    : "Show on profile"}
                                            </TooltipContent>
                                        </Tooltip>
                                    </TooltipProvider>
                                    <ButtonGroup>
                                        <TooltipProvider delayDuration={0}>
                                            <Tooltip>
                                                <TooltipTrigger asChild>
                                                    <Button variant="outline" className="cursor-pointer">
                                                        <ExternalLinkIcon />
                                                    </Button>
                                                </TooltipTrigger>
                                                <TooltipContent className="bg-black px-2 py-1 text-xs">
                                                    <p className="font-urbanist">Preview</p>
                                                </TooltipContent>
                                            </Tooltip>
                                        </TooltipProvider>

                                        <TooltipProvider delayDuration={0}>
                                            <Tooltip>
                                                <TooltipTrigger asChild>
                                                    <Button variant="outline" className="cursor-pointer">
                                                        <LinkIcon />
                                                    </Button>
                                                </TooltipTrigger>
                                                <TooltipContent className="bg-black px-2 py-1 text-xs">
                                                    <p className="font-urbanist">Copy link</p>
                                                </TooltipContent>
                                            </Tooltip>
                                        </TooltipProvider>

                                        <DropdownMenu>
                                            <TooltipProvider delayDuration={0}>
                                                <Tooltip>
                                                    <DropdownMenuTrigger asChild>
                                                        <TooltipTrigger asChild>
                                                            <Button
                                                                variant="outline"
                                                                size="icon"
                                                                aria-label="More Options"
                                                                className="cursor-pointer"
                                                            >
                                                                <MoreHorizontalIcon />
                                                            </Button>
                                                        </TooltipTrigger>
                                                    </DropdownMenuTrigger>
                                                    <TooltipContent className="bg-black px-2 py-1 text-xs">
                                                        <p className="font-urbanist">More options</p>
                                                    </TooltipContent>
                                                </Tooltip>
                                            </TooltipProvider>
                                            <DropdownMenuContent
                                                align="end"
                                                className="w-52 font-urbanist bg-black"
                                            >
                                                <DropdownMenuGroup>
                                                    <DropdownMenuItem
                                                        className="cursor-pointer"
                                                        onClick={() => handleEdit(item)}
                                                    >
                                                        <PencilIcon />
                                                        Edit
                                                    </DropdownMenuItem>
                                                    <DropdownMenuItem
                                                        className="cursor-pointer"
                                                        onClick={() => handleDuplicate(item.id)}>
                                                        <CopyIcon />
                                                        Duplicate
                                                    </DropdownMenuItem>
                                                </DropdownMenuGroup>

                                                <DropdownMenuSeparator />

                                                <DropdownMenuGroup>
                                                    <DropdownMenuItem
                                                        className="cursor-pointer"
                                                        variant="destructive"
                                                        onClick={() => handleDelete(item.id)}>
                                                        <Trash2Icon />
                                                        Delete
                                                    </DropdownMenuItem>
                                                </DropdownMenuGroup>
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </ButtonGroup>
                                </div>
                            </div>
                        </SortableItem>
                    ))}
                </Sortable>
            )}
            <EventsSheet
                isOpen={isSheetOpen}
                onOpenChange={(open) => {
                    setIsSheetOpen(open);
                    if (!open) {
                        setIsCreating(false);
                        setEditingEvent(null);
                    }
                }}
                initialData={isCreating ? null : editingEvent}
                onSuccess={isCreating ? onEventCreated : onEventUpdated} />
        </div>
    );
}

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

export default function EventsCardList({ events }) {
    const [items, setItems] = useState([]);
    const [isSheetOpen, setIsSheetOpen] = useState(false);
    const [editingEvent, setEditingEvent] = useState(null);

    useEffect(() => {
        if (Array.isArray(events)) {
            setItems(events);
        }
    }, [events]);

    const handleEdit = (event) => {
        setEditingEvent(event);
        setIsSheetOpen(true);
    };

    const getItemValue = (item) => item.id;

    if (items.length === 0) {
        return <NoEventsAvailable />;
    }

    const handleCreateEvent = (newEvent) => {
        setItems((prev) => [newEvent, ...prev]);
    };



    return (
        <div className="w-full max-w-8xl space-y-8 mt-8 items-start">
            <Sortable value={items} onValueChange={setItems} getItemValue={getItemValue} strategy="vertical"
                className="space-y-2">
                {items.map((item) => (
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
                                            <Switch checked={item.showOnProfile} />
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
                                                <DropdownMenuItem className="cursor-pointer">
                                                    <CopyIcon />
                                                    Duplicate
                                                </DropdownMenuItem>
                                            </DropdownMenuGroup>

                                            <DropdownMenuSeparator />

                                            <DropdownMenuGroup>
                                                <DropdownMenuItem
                                                    className="cursor-pointer"
                                                    variant="destructive"
                                                >
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

            <EventsSheet
                isOpen={isSheetOpen}
                onOpenChange={setIsSheetOpen}
                initialData={editingEvent}
                onSuccess={handleCreateEvent}
            />
        </div>
    );
}

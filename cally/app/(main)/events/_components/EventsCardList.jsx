"use client";

import { useState, useEffect } from "react";

import { Sortable, SortableItem, SortableItemHandle, } from "@/components/ui/sortable";
import { ClockIcon, CopyIcon, ExternalLinkIcon, GripVertical, LinkIcon, MoreHorizontalIcon, PencilIcon, Trash2Icon } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { ButtonGroup } from "@/components/ui/button-group";
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import NoEventsAvailable from "./NoEventsAvailable";
import { toastManager } from "@/components/ui/toast";
import EventsSheet from "./EventsSheet";

const defaultItems = "";

const MOCK_EVENTS = [
    {
        id: "1",
        title: "30 Minute Meeting",
        description: "A quick catch-up call.",
        duration: 30,
        showOnProfile: true,
    },
    {
        id: "2",
        title: "Project Consultation",
        description: "In-depth review of project requirements.",
        duration: 60,
        showOnProfile: false,
    },
    {
        id: "3",
        title: "Quick Chat",
        description: "Just a quick chat.",
        duration: 15,
        showOnProfile: true,
    },
];

export default function EventsCardList({ searchParams }) {

    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const getItemValue = (item) => item.id;
    const [label, setLabel] = useState("personal");
    const [isOn, setIsOn] = useState(false);

    // Edit Sheet State
    const [isSheetOpen, setIsSheetOpen] = useState(false);
    const [editingEvent, setEditingEvent] = useState(null);

    const fetchEvents = async () => {
        setLoading(true);
        try {
            // Simulate API delay
            await new Promise(resolve => setTimeout(resolve, 500));
            setItems(MOCK_EVENTS);
        } catch (error) {
            console.error("Failed to fetch events:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchEvents();
    }, [searchParams]);

    const handleToggleShowOnProfile = async (id, currentStatus) => {
        try {
            const newStatus = !currentStatus;
            // Mock API call
            // await apiClient.put(`/events/${id}`, { showOnProfile: newStatus });

            // Optimistic update
            setItems((prev) => prev.map((item) =>
                item.id === id ? { ...item, showOnProfile: newStatus } : item
            ));

            toastManager.add({
                title: "Event updated successfully!",
                type: "success",
            });
        } catch (error) {
            console.error("Failed to update event:", error);
            toastManager.add({
                title: "Failed to update event.",
                type: "error",
            });
        }
    };

    const handleDelete = async (id) => {
        try {
            // Mock API call
            // await apiClient.delete(`/events/${id}`);
            setItems((prev) => prev.filter((item) => item.id !== id));
            toastManager.add({
                title: "Event Deleted successfully",
                type: "success",
            });
        } catch (error) {
            console.error("Failed to delete event:", error);
            toastManager.add({
                title: "Failed to delete event.",
                type: "error",
            });
        }
    };

    const handleEdit = (event) => {
        setEditingEvent(event);
        setIsSheetOpen(true);
    };

    const handleSheetSuccess = () => {
        fetchEvents();
        setIsSheetOpen(false);
        setEditingEvent(null);
    };

    const copyEventToast = () => {
        toastManager.add({
            title: "Event link copied to clipboard!",
            type: "success",
        });
    }

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="w-full max-w-7xl space-y-8 mt-8 items-start">
            {items.length === 0 ? <NoEventsAvailable /> :
                <Sortable
                    value={items}
                    onValueChange={(newItems) => setItems(newItems)}
                    getItemValue={getItemValue}
                    strategy="vertical"
                    className="space-y-2"
                >
                    {items.map((item) => (
                        <SortableItem key={item.id} value={item.id} >
                            <div className="flex items-center gap-3 p-6 bg-background border border-border rounded-lg hover:bg-accent/10 transition-colors cursor-pointer">
                                <SortableItemHandle className="text-muted-foreground hover:text-foreground">
                                    <GripVertical className="h-4 w-4" />
                                </SortableItemHandle>

                                <div className="flex-1 min-w-0">
                                    <h4 className="font-medium text-sm truncate">{item.title}</h4>
                                    <p className="text-xs text-muted-foreground truncate">
                                        {item.description}
                                    </p>

                                    <Badge variant="secondary" className="mt-3 rounded-md">
                                        <ClockIcon />
                                        {item.duration} min
                                    </Badge>
                                </div>


                                <div className="flex items-center gap-4">
                                    <div className="flex space-x-2">
                                        <TooltipProvider delayDuration={0}>
                                            <Tooltip>
                                                <TooltipTrigger asChild>
                                                    <div>
                                                        <Switch
                                                            checked={item.showOnProfile}
                                                            onCheckedChange={() => handleToggleShowOnProfile(item.id, item.showOnProfile)}
                                                        />
                                                    </div>
                                                </TooltipTrigger>
                                                <TooltipContent className="bg-white text-black px-2 py-1 text-xs ">
                                                    <p className="font-urbanist">{item.showOnProfile ? "Hide from profile" : "Show on profile"}</p>
                                                </TooltipContent>
                                            </Tooltip>
                                        </TooltipProvider>
                                    </div>

                                    <div>
                                        <ButtonGroup>
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
                                                            <Button variant="outline" className="cursor-pointer" onClick={copyEventToast}>
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
                                                            <DropdownMenuItem className="cursor-pointer" onClick={() => handleEdit(item)}>
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
                                                            <DropdownMenuItem className="cursor-pointer" variant="destructive" onClick={() => handleDelete(item.id)}>
                                                                <Trash2Icon className="" />
                                                                Delete
                                                            </DropdownMenuItem>
                                                        </DropdownMenuGroup>
                                                    </DropdownMenuContent>
                                                </DropdownMenu>
                                            </ButtonGroup>

                                        </ButtonGroup>

                                    </div>
                                </div>
                            </div>
                        </SortableItem>
                    ))}
                </Sortable>
            }

            <EventsSheet
                isOpen={isSheetOpen}
                onOpenChange={setIsSheetOpen}
                initialData={editingEvent}
                onSuccess={handleSheetSuccess}
            />
        </div>
    );
}

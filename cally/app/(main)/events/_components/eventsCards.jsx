"use client";

import { use, useState } from "react";
import { Sortable, SortableItem, SortableItemHandle, } from "@/components/ui/sortable";
import { ClockIcon, CopyIcon, ExternalLinkIcon, GripVertical, LinkIcon, MoreHorizontalIcon, PencilIcon, Trash2Icon } from "lucide-react";
import EventsCards from "@/data/EventCards";
import { Switch } from "@/components/ui/switch";
import { ButtonGroup } from "@/components/ui/button-group";
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import NoEventsAvailable from "./NoEventsAvailable";

const defaultItems = EventsCards;

export default function EventCards() {

    const [items, setItems] = useState(defaultItems);
    const getItemValue = (item) => item.id;
    const [label, setLabel] = useState("personal");
    const [isOn, setIsOn] = useState(false);

    return (
        <div className="w-full max-w-7xl space-y-8 mt-8 items-start">
            {defaultItems.length === 0 ? <NoEventsAvailable/> : 
            <Sortable
                value={items}
                // onValueChange={handleValueChange}
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
                                    <Tooltip>
                                        <TooltipTrigger>
                                            <Switch checked={item.showOnProfile} onCheckedChange={(v) =>!v } />
                                        </TooltipTrigger>
                                        <TooltipContent>
                                            <p>{item.showOnProfile ? "Hide from profile" : "Show on profile"}</p>
                                        </TooltipContent>
                                    </Tooltip>
                                </div>

                                <div>

                                    <ButtonGroup>
                                        <ButtonGroup>
                                            <Button variant="outline">
                                                <ExternalLinkIcon />
                                            </Button>
                                            <Button variant="outline">
                                                <LinkIcon />
                                            </Button>
                                            <DropdownMenu>
                                                <DropdownMenuTrigger asChild>
                                                    <Button variant="outline" size="icon" aria-label="More Options">
                                                        <MoreHorizontalIcon />
                                                    </Button>
                                                </DropdownMenuTrigger>
                                                <DropdownMenuContent align="end" className="w-52 font-urbanist bg-black">
                                                    <DropdownMenuGroup>
                                                        <DropdownMenuItem>
                                                            <PencilIcon />
                                                            Edit
                                                        </DropdownMenuItem>
                                                        <DropdownMenuItem>
                                                            <CopyIcon />
                                                            Duplicate
                                                        </DropdownMenuItem>
                                                    </DropdownMenuGroup>
                                                    <DropdownMenuSeparator />
                                                    <DropdownMenuGroup>
                                                        <DropdownMenuItem variant="destructive" >
                                                            <Trash2Icon />
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
        </div>
    );
}

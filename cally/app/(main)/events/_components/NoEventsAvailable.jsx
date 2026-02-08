"use client";

import { Button } from "@/components/ui/button";
import { PlusCircleIcon } from "lucide-react";
import { useState } from "react";
import EventsSheet from "./EventsSheet";

const NoEventsAvailable = ({ onCreate }) => {
    const [open, setOpen] = useState(false);

    return (
        <div className="w-full rounded-md p-8 border-dotted border border-neutral-700 flex flex-col items-center justify-center font-urbanist">
            <div className="text-center">
                <p className="text-lg font-semibold">
                    Create your first event type!
                </p>
                <p className="text-neutral-400 text-sm">
                    Event types help you offer different kinds of meetings.
                </p>
            </div>

            <div className="mt-10">
                <Button
                    size="sm"
                    className="px-2 py-1 flex items-center gap-1"
                    onClick={() => setOpen(true)}
                >
                    <PlusCircleIcon fill="black" stroke="white" />
                    Create Event
                </Button>
            </div>

            <EventsSheet
                isOpen={open}
                onOpenChange={setOpen}
                onSuccess={onCreate}
            />
        </div>
    );
};

export default NoEventsAvailable;

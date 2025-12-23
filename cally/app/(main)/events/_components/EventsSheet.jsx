
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Sheet, SheetClose, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Textarea } from "@/components/ui/textarea"

import { toastManager } from "@/components/ui/toast"
import { ClockIcon, PlusCircleIcon } from "lucide-react"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"

const EventsSheet = ({ isOpen, onOpenChange, initialData = null, onSuccess }) => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [duration, setDuration] = useState(15);
    const [loading, setLoading] = useState(false);

    // Internal state for uncontrolled usage (if needed, but we'll mostly use controlled)
    const [internalOpen, setInternalOpen] = useState(false);
    const isControlled = isOpen !== undefined;
    const open = isControlled ? isOpen : internalOpen;
    const setOpen = isControlled ? onOpenChange : setInternalOpen;

    const router = useRouter();

    useEffect(() => {
        if (initialData) {
            setTitle(initialData.title || "");
            setDescription(initialData.description || "");
            setDuration(initialData.duration || 15);
        } else {
            setTitle("");
            setDescription("");
            setDuration(15);
        }
    }, [initialData, open]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            // Simulate API delay
            await new Promise(resolve => setTimeout(resolve, 500));

            if (initialData) {
                // Mock update
                toastManager.add({
                    title: "Event updated successfully!",
                    type: "success",
                });
            } else {
                // Mock create
                toastManager.add({
                    title: "Event created successfully!",
                    type: "success",
                });
            }

            setOpen(false);
            if (onSuccess) {
                onSuccess();
            } else {
                // window.location.reload(); // Don't reload in mock mode
            }
        } catch (error) {
            console.error("Failed to save event:", error);
            toastManager.add({
                title: "Failed to save event.",
                type: "error",
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <Sheet open={open} onOpenChange={setOpen}>
                {!isControlled && (
                    <SheetTrigger asChild>
                        <Button size="sm" className="px-2 py-1 flex items-center gap-1 cursor-pointer mr-4">
                            <PlusCircleIcon fill="black" stroke="white" />
                            <span className="font-urbanist">Create Event</span>
                        </Button>
                    </SheetTrigger>
                )}

                <SheetContent className="font-urbanist">
                    <SheetHeader>
                        <SheetTitle>{initialData ? "Edit Event" : "Create New Event"}</SheetTitle>
                        <SheetDescription>
                            {initialData ? "Update your event details." : "Set up event types to offer different types of meetings."}
                        </SheetDescription>
                    </SheetHeader>
                    <form onSubmit={handleSubmit} className="grid flex-1 auto-rows-min gap-6 px-4 mt-4">
                        <div className="grid gap-3">
                            <Label htmlFor="sheet-title">Title</Label>
                            <Input
                                id="sheet-title"
                                placeholder="Quick Chat"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                required
                            />
                        </div>
                        <div className="grid gap-3">
                            <Label htmlFor="sheet-description">Description</Label>
                            <Textarea
                                htmlFor="sheet-description"
                                placeholder="Enter events description here!"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                            />
                        </div>

                        <div className="grid gap-3">
                            <Label htmlFor="sheet-minutes">Duration</Label>
                            <div className="relative">
                                <Input
                                    className="peer ps-9 pe-16"
                                    htmlFor="sheet-minutes"
                                    placeholder="15"
                                    type="number"
                                    value={duration}
                                    onChange={(e) => setDuration(e.target.value)}
                                    required
                                />
                                <span className="pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-3 text-muted-foreground text-sm peer-disabled:opacity-50">
                                    <ClockIcon className="h-4 w-4" />
                                </span>
                                <span className="pointer-events-none absolute inset-y-0 end-0 flex items-center justify-center pe-3 text-muted-foreground text-sm peer-disabled:opacity-50">
                                    minutes
                                </span>
                            </div>

                        </div>

                        <SheetFooter>
                            <Button type="submit" className="cursor-pointer" disabled={loading}>
                                {loading ? "Saving..." : "Save changes"}
                            </Button>
                            <SheetClose asChild>
                                <Button variant="outline" className="cursor-pointer">Close</Button>
                            </SheetClose>
                        </SheetFooter>
                    </form>
                </SheetContent>
            </Sheet>
        </div>
    )
}

export default EventsSheet
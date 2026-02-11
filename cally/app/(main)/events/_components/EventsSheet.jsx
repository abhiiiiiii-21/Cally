
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Sheet, SheetClose, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Textarea } from "@/components/ui/textarea"

import { toastManager } from "@/components/ui/toast"
import { ClockIcon, PlusCircleIcon } from "lucide-react"
import { useState, useEffect } from "react"

const EventsSheet = ({ isOpen, onOpenChange, initialData = null, onSuccess }) => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [duration, setDuration] = useState("");
    const [loading, setLoading] = useState(false);


    const [internalOpen, setInternalOpen] = useState(false);
    const isControlled = isOpen !== undefined;
    const open = isControlled ? isOpen : internalOpen;
    const setOpen = isControlled ? onOpenChange : setInternalOpen;

    useEffect(() => {
        if (initialData) {
            setTitle(initialData.title || "");
            setDescription(initialData.description || "");
            setDuration(String(initialData.duration || 15));
        } else {
            setTitle("");
            setDescription("");
            setDuration("15");
        }
    }, [initialData, open]);

    const handleSubmit = async (e) => {
        e.preventDefault();


        const durationNumber = Number(duration);
        if (!duration || durationNumber <= 0) {
            toastManager.add({
                description: "Duration must be greater than 0",
                type: "error",
            });
            return;
        }
        const isEditing = !!initialData;

        try {
            setLoading(true);

            const token = localStorage.getItem("token");

            const res = await fetch(
                 `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/events${isEditing ? `/${initialData.id}` : ''}`,
                {
                    method: isEditing ? "PUT" : "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                    body: JSON.stringify({
                        title,
                        description,
                        duration: durationNumber,
                    }),
                }
            );

            const data = await res.json();

            if (!res.ok) {
                toastManager.add({
                    description: data.error || "Something went wrong",
                    type: "error",
                });
                return;
            }


            toastManager.add({
                description: isEditing ? "Event updated successfully!" : "Event created successfully!",
                type: "success",
            });

            onSuccess?.(data);

            setOpen(false);
        } catch (error) {
            console.error(error);
            toastManager.add({
                description: isEditing ? "Failed to update event" : "Failed to create event",
                type: "error",
            });
        } finally {
            setLoading(false);
        }
    };


    return (
        <div>
            <Sheet open={open} onOpenChange={setOpen}>


                <SheetContent className="font-urbanist flex flex-col">
                    <SheetHeader>
                        <SheetTitle>{initialData ? "Edit Event" : "Create New Event"}</SheetTitle>
                        <SheetDescription>
                            {initialData ? "Update your event details." : "Set up event types to offer different types of meetings."}
                        </SheetDescription>
                    </SheetHeader>
                    <form onSubmit={handleSubmit} className="flex flex-col flex-1 gap-6 px-4 mt-4">
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
                                required
                            />
                        </div>

                        <div className="grid gap-3">
                            <Label htmlFor="sheet-minutes">Duration</Label>
                            <div className="relative">
                                <Input
                                    className="peer ps-9 pe-16"
                                    type="number"
                                    min={1}
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

                        <SheetFooter className="mt-auto w-full">
                            <Button type="submit" className="cursor-pointer" disabled={loading}>
                                {loading ? 'Saving...' : 'Save Changes'}
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
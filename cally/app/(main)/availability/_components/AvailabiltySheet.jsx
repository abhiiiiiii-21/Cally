import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Sheet, SheetClose, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Textarea } from "@/components/ui/textarea"
import { ClockIcon, PlusCircleIcon } from "lucide-react"

const AvailabilitySheet = () => {
    return (
        <div>
            <Sheet>
                <SheetTrigger asChild>
                    <Button size="sm" className="px-2 py-1 flex items-center gap-1 cursor-pointer mr-4">
                        <PlusCircleIcon fill="black" stroke="white" />
                        <span className="font-urbanist">Create New</span>
                    </Button>
                </SheetTrigger>

                <SheetContent className="font-urbanist">
                    <SheetHeader>
                        <SheetTitle>Create New</SheetTitle>
                        <SheetDescription>
                            Set up availability slots to offer different times.
                        </SheetDescription>
                    </SheetHeader>
                    <div className="grid flex-1 auto-rows-min gap-6 px-4">
                        <div className="grid gap-3">
                            <Label htmlFor="sheet-title">Title</Label>
                            <Input id="sheet-title" placeholder="Quick Chat" />
                        </div>
                        <div className="grid gap-3">
                            <Label htmlFor="sheet-description">Description</Label>
                            <Textarea htmlFor="sheet-description" placeholder="Enter events description here!" />
                        </div>

                        <div className="grid gap-3">
                            <Label htmlFor="sheet-minutes">Duration</Label>
                            <div className="relative">
                                <Input className="peer ps-9 pe-16" htmlFor="sheet-minutes" placeholder="15" type="number" />
                                <span className="pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-3 text-muted-foreground text-sm peer-disabled:opacity-50">
                                    <ClockIcon className="h-4 w-4" />
                                </span>
                                <span className="pointer-events-none absolute inset-y-0 end-0 flex items-center justify-center pe-3 text-muted-foreground text-sm peer-disabled:opacity-50">
                                    minutes
                                </span>
                            </div>

                        </div>
                    </div>
                    <SheetFooter>
                        <Button type="submit" className="cursor-pointer">Save changes</Button>
                        <SheetClose asChild>
                            <Button variant="outline" className="cursor-pointer">Close</Button>
                        </SheetClose>
                    </SheetFooter>
                </SheetContent>
            </Sheet>
        </div>
    )
}

export default AvailabilitySheet
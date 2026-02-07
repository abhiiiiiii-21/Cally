import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { EmptyState } from '@/components/ui/interactive-empty-state'
import { Label } from '@/components/ui/label';
import { Sheet, SheetClose, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Textarea } from '@/components/ui/textarea';
import { motion } from 'framer-motion';
import { Calendar1, Calendar1Icon, ClockIcon, Code2Icon, FolderOpen, PlusCircleIcon, PlusIcon, RocketIcon, UsersIcon } from 'lucide-react';
import React from 'react'

const NoEventsAvailable = () => {
    const motionDiv = (delay, children) => (
        <motion.div
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay }}
        >
            {children}
        </motion.div>
    );
    return (
        <div>
            {motionDiv(0.2,
                // <EmptyState
                //     theme="dark"
                //     title="Create your first event type!"
                //     description="Event types help you offer different kinds of meetings."
                //     icons={[<ClockIcon key="p1" className="h-6 w-6" />, <Calendar1Icon key="p2" className="h-6 w-6" />, <UsersIcon key="p3" className="h-6 w-6" />]}
                //     action={{ label: "Create Event", icon: <PlusIcon className="h-4 w-4" />, onClick: () =>{
                //     } }}

                // />
                <div className='w-full rounded-md p-8 mt-10 border-dotted border border-neutral-700 flex flex-col items-center justify-center font-urbanist'>
                    <div className='text-center'>
                        <p className='text-lg font-semibold '>Create your first event type!</p>
                        <p className='text-neutral-400 text-sm'>Event types help you offer different kinds of meetings.</p>
                    </div>

                    <div className='mt-10'>
                        <Sheet>
                            <SheetTrigger asChild>
                                <Button size="sm" className="px-2 py-1 flex items-center gap-1 cursor-pointer mr-4">
                                    <PlusCircleIcon fill="black" stroke="white" />
                                    <span className="font-urbanist">Create Event</span>
                                </Button>
                            </SheetTrigger>

                            <SheetContent className="font-urbanist">
                                <SheetHeader>
                                    <SheetTitle>Create New Event</SheetTitle>
                                    <SheetDescription>
                                        Set up event types to offer different types of meetings.
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
                </div>
            )}



        </div>
    )
}

export default NoEventsAvailable
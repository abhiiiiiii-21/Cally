import CopyButton from '@/components/CopyButton'
import { Status, StatusIndicator, StatusLabel } from '@/components/kibo-ui/status'
import { Button } from '@/components/ui/button'
import { Clock4Icon, SquareArrowOutUpRightIcon } from 'lucide-react'
import React from 'react'

const MainCard = () => {
    return (
        <section className='gap-4 flex'>
            <div className=" bg-background border border-border rounded-xl p-6 w-lg">

                <div className="flex items-center justify-between">
                    <Status status="online">
                        <StatusIndicator />
                        <StatusLabel>Up next</StatusLabel>
                    </Status>
                </div>

                <h3 className="mt-3 text-2xl font-medium tracking-tight">
                    Product Detail
                </h3>

                <div className="mt-1 flex items-center gap-2 text-sm text-muted-foreground">
                    <Clock4Icon className="h-4 w-4" />
                    <span>Starting in 15 minutes • 2:00 - 2:30 PM</span>
                </div>

                <div className="mt-6 flex items-center gap-3">
                    <Button size="sm" className='w-75'>
                        Join meeting
                    </Button>

                    <CopyButton />
                </div>
            </div>

            <div className='bg-background border border-border/40 rounded-xl p-6 w-80'>
                <p className='text-neutral-500'>Total Meetings</p>
                <div className='flex gap-2'>
                    <p className='text-3xl'>3</p>
                    <p>Today</p>
                </div>
            </div>

            <div className="bg-background border border-border rounded-xl p-6 w-80">

                <p className="text-sm text-muted-foreground">
                    Your booking link
                </p>

                <div className="mt-2 flex items-center gap-2 w-full">
                    <div className="flex h-9 items-center rounded-md border border-border px-3 text-sm text-muted-foreground">
                        cal.com/abhishek
                    </div>

                    <Button size="icon" variant="outline">
                        <SquareArrowOutUpRightIcon size={16} />
                    </Button>

                    <CopyButton />
                </div>
            </div>
        </section>
    )
}

export default MainCard
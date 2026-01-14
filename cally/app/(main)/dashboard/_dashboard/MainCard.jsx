import CopyButton from '@/components/CopyButton'
import { Status, StatusIndicator, StatusLabel } from '@/components/kibo-ui/status'
import { Button } from '@/components/ui/button'
import { Clock4Icon, CopyIcon, SquareArrowOutUpRightIcon } from 'lucide-react'
import React from 'react'

const MainCard = () => {
    return (
        <section className="grid w-full grid-cols-4 gap-4">

            <div className="col-span-2 bg-background border border-white/40 rounded-xl p-6">
                <div className="flex items-center justify-between">
                    <Status status="live">
                        <StatusIndicator />
                        <StatusLabel>Up next</StatusLabel>
                    </Status>

                    <p className='text-neutral-500 text-sm'>with Tanishq</p>
                </div>

                <h3 className="mt-3 text-2xl font-medium tracking-tight">
                    Product Detail
                </h3>

                <div className="mt-1 flex items-center gap-2 text-sm text-muted-foreground">
                    <Clock4Icon className="h-4 w-4" />
                    <span>Starting in 15 minutes • 2:00 - 2:30 PM</span>
                </div>

                <div className="mt-6 flex items-center gap-4">
                    <Button size="sm" className="cursor-pointer flex-1">
                        Join meeting
                    </Button>
                    <CopyButton></CopyButton>
                </div>
            </div>

            <div className="col-span-1 bg-background border border-border rounded-xl p-6 hover:bg-accent/10 transition-colors">
                <p className="text-sm text-muted-foreground">Total meetings</p>
                <div className="mt-5 flex items-baseline gap-2 justify-center">
                    <p className="text-8xl font-light">4</p>
                    <p className="text-sm text-muted-foreground">Today</p>
                </div>
            </div>

            <div className="col-span-1 bg-background border border-border rounded-xl px-6 py-5 flex flex-col">
                <p className="text-sm text-muted-foreground">
                    Your booking link
                </p>

                <div className='mt-6'>

                    <div className="rounded-md border bg-neutral-900 px-3 py-2 text-sm font-medium">
                        getcally.vercel.app/abhishek
                    </div>

                    <div className="mt-2 flex gap-2">
                        <Button variant="" size="" className="flex-1 cursor-pointer">
                            <SquareArrowOutUpRightIcon size={16} />
                            View
                        </Button>

                        <Button variant="outline" size="" className="flex-1 cursor-pointer" >
                            <CopyIcon size={16} />
                            Copy
                        </Button>
                    </div>
                </div>
            </div>
        </section>

    )
}

export default MainCard
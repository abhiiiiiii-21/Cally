"use client"
import EventsSheet from '@/app/(main)/events/_components/EventsSheet'
import React from 'react'
import { SidebarTrigger } from './ui/sidebar'
import { Separator } from './ui/separator'
import { usePathname } from 'next/navigation'
import AvailabilitySheet from '@/app/(main)/availability/_components/AvailabiltySheet'

const HeaderBar = () => {
    const pathname = usePathname()

    function dynamicHeader(path) {
        if (path == "/dashboard") {
            return { title: "Dashboard", sheet: null }
        }

        if (path == "/events") {
            return { title: "Events", sheet: "event" }
        }

        if (path == "/meetings") {
            return { title: "Meetings", sheet: null }
        }

        if (path == "/meetings/upcoming") {
            return { title: "Meetings", sheet: null }
        }

        if (path == "/meetings/past") {
            return { title: "Meetings", sheet: null }
        }

        if (path == "/meetings/cancelled") {
            return { title: "Meetings", sheet: null }
        }

        if (path == "/availability") {
            return { title: "Availability", sheet: "availability" }
        }

        return { title: "", sheet: null }
    }

    const { title, sheet } = dynamicHeader(pathname);
    return (
        <header className="flex h-16 shrink-0 items-center gap-2">
            <div className="flex w-full justify-between items-center">
                <div className="flex items-center gap-2 px-4">
                    <SidebarTrigger className="-ml-1" />
                    <Separator
                        orientation="vertical"
                        className="mr-2 data-[orientation=vertical]:h-4"
                    />

                    <div className="text-[16px] font-medium font-urbanist">
                        {title}
                    </div>
                </div>

                {sheet === "event" && (<EventsSheet />)}
                {sheet === "availability" && (<AvailabilitySheet />)}


            </div>
        </header>
    )
}

export default HeaderBar
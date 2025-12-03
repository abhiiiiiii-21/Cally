"use client"
import React from 'react'
import { Tabs, TabsList, TabsPanel, TabsTab } from '@/components/ui/tabs'
import { usePathname, useRouter } from 'next/navigation';

const MeetingsTabs = ({ children }) => {

    const pathname = usePathname();
    const router = useRouter();

    const currentPage = pathname.split("/")[2] || "upcoming";

    return (
        <div className='flex justify-center w-full'>
            <div className='w-full max-w-7xl'>
                <Tabs defaultValue="upcoming" value={currentPage} onValueChange={(v) => router.push(`/meetings/${v}`)} className="w-full">
                    <TabsList className="grid w-full grid-cols-3">
                        <TabsTab value="upcoming">Upcoming</TabsTab>
                        <TabsTab value="past">Past</TabsTab>
                        <TabsTab value="cancelled">Cancelled</TabsTab>
                    </TabsList>
                    {children}
                </Tabs>

            </div>
        </div>
    )
}

export default MeetingsTabs

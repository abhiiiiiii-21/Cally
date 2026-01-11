import CopyButton from '@/components/CopyButton'
import FullCalendar from '@/components/FullCalendar'
import { Status, StatusIndicator, StatusLabel } from '@/components/kibo-ui/status'
import { Button } from '@/components/ui/button'
import { Clock4Icon, SquareArrowOutUpRightIcon } from 'lucide-react'
import React from 'react'
import TimelineCard from './_dashboard/TimelineCard'
import MainCard from './_dashboard/MainCard'

const page = () => {
  return (
    <main className='p-4 font-urbanist pl-11 pr-11'>
      <h2 className='text-3xl font-medium'>Good Morning, Abhishek</h2>
      <p className='text-neutral-500'>Here's what happening with your schedule today.</p>

      <section className="mt-6">
        <MainCard/>
      </section>

      <section className='mt-4'>
        <TimelineCard/>
      </section>
      <section className='mt-4'>
        <FullCalendar />
      </section>

    </main>
  )
}

export default page
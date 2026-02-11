"use client";

import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { ArrowRightIcon, PlusCircleIcon, SearchIcon } from 'lucide-react'
import React, { useEffect, useRef, useState } from 'react'
import EventsCardList from './_components/EventsCardList'
import EventsSheet from './_components/EventsSheet'
import { useRouter } from 'next/navigation';
import { MorphingSquare } from '@/components/ui/morphing-square';


const page = () => {
  const [loading, setLoading] = useState(true)
  const [events, setEvents] = useState([]);
  const [createSheetOpen, setCreateSheetOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter()

  useEffect(() => {
    async function fetchData() {
      try {
        const token = localStorage.getItem('token')

        if (!token) {
          router.push('/auth/log-in')
          return
        }

        const res = await fetch((`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/events`), {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`
          }
        })


        if (!res.ok) {
          throw new Error("Failed to fetch events!");
        }

        const data = await res.json()

        setEvents(data)


      } catch (error) {
        console.log('Failed to load events:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [router])

  useEffect(() => {
    const fetchEvents = async () => {
      const token = localStorage.getItem('token')

      if (!token) {
        router.push('/auth/log-in')
        return
      }

      const url = searchQuery
        ? `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/events?search=${encodeURIComponent(searchQuery)}`
        : `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/events`;

      const res = await fetch(url, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (res.ok) {
        const data = await res.json();
        setEvents(data);
      }

    }
    const debounce = setTimeout(fetchEvents, 300);
    return () => clearTimeout(debounce);
  }, [searchQuery])

  if (loading) {
    return (
      <section className='flex items-center justify-center' style={{ height: 'calc(100vh - 64px)' }}>
        <MorphingSquare message='Loading events...' />
      </section>
    )
  }

  const handleEventCreated = (newEvent) => {
    setEvents((prev) => [newEvent, ...prev]);
  };


  const handleEventDeleted = (deleteEventId) => {
    setEvents((prev) => prev.filter((event) => event.id !== deleteEventId))
  }

  const handleEventUpdated = (updatedEvent) => {
    setEvents((prev) => prev.map((event) => event.id === updatedEvent.id ? updatedEvent : event))
  }

  return (
    <div className='p-4 font-urbanist pl-11 pr-11'>
      <div className="flex items-center justify-between">
        <div className="max-w-56">
          <div className="relative">
            <Input
              className="peer ps-9 pe-9"
              placeholder="Search events..."
              type="search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />

            <div className="pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-3 text-muted-foreground/80 peer-disabled:opacity-50">
              <SearchIcon size={16} />
            </div>
            <button
              aria-label="Submit search"
              className="absolute inset-y-0 end-0 flex h-full w-9 items-center justify-center rounded-e-md text-muted-foreground/80 outline-none transition-[color,box-shadow] hover:text-foreground focus:z-10 focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50"
              type="submit">

              <ArrowRightIcon aria-hidden="true" size={16} />
            </button>
          </div>
        </div>

        <Button
          size="sm"
          className="px-2 py-1 flex items-center gap-1 cursor-pointer"
          onClick={() => setCreateSheetOpen(true)}
        >
          <PlusCircleIcon fill="black" stroke="white" />
          <span className="font-urbanist">Create Event</span>
        </Button>
      </div>

      <EventsCardList className="items-start" events={events} onEventCreated={handleEventCreated} onEventDeleted={handleEventDeleted} onEventUpdated={handleEventUpdated} />

      <EventsSheet
        isOpen={createSheetOpen}
        onOpenChange={setCreateSheetOpen}
        initialData={null}
        onSuccess={handleEventCreated}
      />
    </div>
  )
}

export default page
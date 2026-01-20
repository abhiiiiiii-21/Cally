"use client";

import { Input } from '@/components/ui/input'
import { ArrowRightIcon, SearchIcon } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import EventsCardList from './_components/EventsCardList'
import { useRouter } from 'next/navigation';
import { MorphingSquare } from '@/components/ui/morphing-square';


const page = () => {
  const [loading, setLoading] = useState(false)
  const [userData, setUserData] = useState([])
  const router = useRouter()

  useEffect(() => {
    async function fetchData() {
      setLoading(true)
      try {
        const token = localStorage.getItem('token')

        if (!token) {
          router.push('/auth/log-in')
        }

        const res = await fetch((`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/events`), {
          method: 'GET',
          headers: {
            'content-type': 'application/json',
            'Authorization': `Bearer ${token}`
          }
        })


        if (!res.ok) {
          throw new Error("Failed to fetch events!");
        }

        const data = await res.json()

        setUserData(data)


      } catch (error) {
        console.log('Failed to load events:', error)
      } finally {
        setLoading(false)
      }

    }

    fetchData()
  }, [])

  if (loading) {
    return (
      <section className='flex items-center justify-center' style={{ height: 'calc(100vh - 64px)' }}>
        <MorphingSquare message='Loading profile...' />
      </section>
    )
  }

  return (
    <div className='p-4 font-urbanist pl-11 pr-11'>
      <div className="max-w-56">
        <div className="relative">
          <Input
            className="peer ps-9 pe-9"
            placeholder="Search..."
            type="search"
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

      <EventsCardList className="items-start" eventsData={userData} />
    </div>
  )
}

export default page
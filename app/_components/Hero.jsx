import React from 'react'
import DemoOne from './_Hero/DemoOne'
import AnnouncementBadge from './_Hero/AnnouncementBadge'

const Hero = () => {

  return (
    <div className="relative w-full h-screen overflow-hidden">

      <DemoOne />

      <div className="absolute inset-0 flex flex-col items-center justify-center text-center space-y-6 px-4">
        <AnnouncementBadge />

        <div className='space-y-4'>

          <div className='-space-y-5'>

            <p className="font-urbanist text-7xl font-semibold text-white leading-tight [text-shadow:0_0_20px_rgba(234,239,255,0.6),_0_0_40px_rgba(234,239,255,0.4),_0_0_60px_rgba(234,239,255,0.2)]">
              The better way to schedule
            </p>
            <p className="font-urbanist text-7xl font-semibold text-white leading-tight [text-shadow:0_0_20px_rgba(234,239,255,0.6),_0_0_40px_rgba(234,239,255,0.4),_0_0_60px_rgba(234,239,255,0.2)]">
              your meetings.
            </p>
          </div>

          <p className="font-urbanist text-lg font-medium text-gray-200 max-w-4xl [text-shadow:0_0_20px_rgba(234,239,255,0.5)]">
            Let others book time with you based on your real-time availability. Simple, smart, and stress-free.
          </p>
        </div>
      </div>
    </div>
  )
}

export default Hero

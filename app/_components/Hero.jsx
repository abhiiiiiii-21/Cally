import React from 'react'
import DemoOne from './_Hero/DemoOne'
import AnnouncementBadge from './_Hero/AnnouncementBadge'

const Hero = () => {
  return (
    <div>
      <DemoOne />

      <div>
        <div>
          <AnnouncementBadge />
        </div>

        <p className=''>
          The better way to schedule your meetings.
        </p>

        <p>
          Let others book time with you based on your real-time availability. Simple, smart, and stress-free.
        </p>




      </div>
    </div>
  )
}

export default Hero
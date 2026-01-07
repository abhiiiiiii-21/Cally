"use client"
import LogoCloud from './_HowItWorks/LogoCloud'
import { Status, StatusIndicator, StatusLabel } from '@/components/kibo-ui/status'

const HowItWorks = () => {
  return (
    <section className='flex flex-col items-center'>
      <LogoCloud />
      <Status status="online" variant="outline">
        <StatusIndicator />
        <StatusLabel className="font-urbanist">How it works</StatusLabel>
      </Status>

      <div>

      </div>

    </section>
  )
}

export default HowItWorks
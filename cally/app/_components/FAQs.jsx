import AnimatedBadge from '@/components/ui/animated-badge'
import React from 'react'

const FAQs = () => {
  return (
    <section className='mt-30'>
      <div className='flex flex-col font-urbanist justify-center items-center'>
        <AnimatedBadge
          text="FAQs"
          color="#22d3ee"
          href="/docs/components/animated-badge"
        />
      </div>

    </section>
  )
}

export default FAQs
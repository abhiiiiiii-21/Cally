import AnimatedBadge from '@/components/ui/animated-badge'
import ScrollFAQAccordion from '@/components/ui/scroll-faqaccordion'
import React from 'react'

const FAQs = () => {
  return (
    <section className=''>
      <div className='flex flex-col font-urbanist justify-center items-center'>
        <AnimatedBadge
          text="FAQs"
          color="#22d3ee"
          href="/docs/components/animated-badge"
        />
      </div>
      <ScrollFAQAccordion />
    </section>
  )
}

export default FAQs
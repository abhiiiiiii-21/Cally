
import React from 'react'
import IntegrationsSection from '@/components/integrations-5'
import AnimatedBadge from '@/components/ui/animated-badge'

const Intergrations = () => {
  return (
    <section className='flex flex-col items-center mt-30 font-urbanist justify-center'>
      <AnimatedBadge
        text="Integrations"
        color="#22d3ee"
        href="/docs/components/animated-badge"
      />
      <IntegrationsSection />
    </section>
  )
}

export default Intergrations
"use client"
import React from 'react'
import Hero from './_components/Hero'
import Navbar from './_components/Navbar'
import Testimonials from './_components/Testimonials'
import Integrations from './_components/Integrations'
import CTA from './_components/CTA'
import WorkedWith from './_components/WorkedWith'
import HowItWorks from './_components/HowItWorks'
import FAQs from './_components/FAQs'
import Lenis from '@studio-freight/lenis'

const page = () => {
  React.useEffect(() => {
    const lenis = new Lenis();

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);
  }, []);
  return (
    <main className=''>
        <Navbar />
        <Hero />
        <WorkedWith />
        <HowItWorks />
        <Integrations />
        {/* <Testimonials /> */}
        <FAQs />
        {/* <CTA /> */}

    </main>
  )
}

export default page
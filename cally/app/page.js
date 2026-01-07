import React from 'react'
import Hero from './_components/Hero'
import Navbar from './_components/Navbar'
import Testimonials from './_components/Testimonials'
import Intergrations from './_components/Intergrations'
import FAQs from './_components/FAQs'
import Footer from './_components/Footer'
import CTA from './_components/CTA'
import WorkedWith from './_components/WorkedWith'
import HowItWorks from './_components/HowItWorks'


const page = () => {
  return (
    <div>
      <Navbar/>
      <Hero/>
      <WorkedWith/>
      <HowItWorks/>
      <Intergrations/>
      <Testimonials/>
      <FAQs/>
      <CTA/>
      <Footer/>
    </div>
  )
}

export default page
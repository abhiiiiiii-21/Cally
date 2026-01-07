import React from 'react'
import Hero from './_components/Hero'
import Navbar from './_components/Navbar'
import Testimonials from './_components/Testimonials'
import Intergrations from './_components/Intergrations'
import FAQs from './_components/FAQs'
import Footer from './_components/Footer'
// import HowItWorks from './_components/HowItWorks'


const page = () => {
  return (
    <div>
      <Navbar/>
      <Hero/>
      {/* <HowItWorks/> */}
      <Intergrations/>
      <Testimonials/>
      <FAQs/>
      <Footer/>
    </div>
  )
}

export default page
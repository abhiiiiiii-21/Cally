import React from 'react'
import ParallaxImage from './_CTA/ParallaxImage'
import Image from 'next/image'
import { Footer } from './Footer'

const CTA = () => {
  return (
    <main>
      <section className="relative w-6xl mx-auto overflow-hidden bg-black/20 text-black mb-30 mt-30 rounded-2xl font-urbanist flex justify-center items-center">
        <Image src="/Gradient/GreyCTA.jpg" alt="BG" layout="fill" objectFit="cover" className='opacity-40' />
        <ParallaxImage />
      </section>

      <Footer />
    </main>
  )
}

export default CTA
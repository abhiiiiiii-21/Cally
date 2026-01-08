"use client"
import { useEffect } from "react"
import { motion, stagger, useAnimate } from "motion/react"

import Floating, {
    FloatingElement,
} from "@/components/ui/parallax-floating"

const exampleImages = [
    {
        url: "/CTA/1.jpg",
    },
    {
        url: "/CTA/2.jpg",
    },
    {
        url: "/CTA/2.jpg",
    },
    {
        url: "/CTA/3.jpg",
    },
    {
        url: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=1200&auto=format&fit=crop",
    },
    {
        url: "https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?q=80&w=1200&auto=format&fit=crop",
    }
]


const ParallaxImage = () => {
    const [scope, animate] = useAnimate()

    useEffect(() => {
        animate("img",
            { opacity: [0, 1], y: [10, 0] },
            { duration: 0.88, delay: stagger(0.15, { startDelay: 1.5 }) }
        )
    }, [])

    return (
        <div
            className="flex w-full h-full min-h-[400px] justify-center items-center overflow-hidden"
            ref={scope}
        >
            <motion.div
                className="z-50 text-center items-center flex flex-col"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.88, delay: 1.5 }}
            >

                <p className="text-4xl font-semibold z-50 text-white font-urbanist tracking-tight">
                    Get started for free!
                </p>
                <p className="text-xl z-50 text-neutral-500 font-urbanist">
                    Set up your availability in minutes. No credit card required.
                </p>
            </motion.div>

            <Floating sensitivity={-1} className="overflow-hidden">
                <FloatingElement depth={0.5} className="top-[8%] left-[11%] brightness-70  contrast-90">
                    <motion.img
                        initial={{ opacity: 0 }}
                        src={exampleImages[0].url}
                        className="w-35 h-30 object-cover duration-200 transition-transform"
                    />
                </FloatingElement>
                <FloatingElement depth={2} className="top-[2%] left-[53%] brightness-70 contrast-85">
                    <motion.img
                        initial={{ opacity: 0 }}
                        src={exampleImages[2].url}
                        className="w-52 h-30 object-cover duration-200 transition-transform"
                    />
                </FloatingElement>
                <FloatingElement depth={1} className="top-[0%] left-[83%] brightness-70 contrast-85">
                    <motion.img
                        initial={{ opacity: 0 }}
                        src={exampleImages[3].url}
                        className="w-36 h-28 object-cover duration-200 transition-transform"
                    />
                </FloatingElement>

                <FloatingElement depth={2} className="top-[70%] left-[77%] brightness-70 contrast-85">
                    <motion.img
                        initial={{ opacity: 0 }}
                        src={exampleImages[4].url}
                        className="w-52 h-36 object-cover duration-200 transition-transform"
                    />
                </FloatingElement>

                <FloatingElement depth={4} className="top-[73%] left-[15%] brightness-70 contrast-85">
                    <motion.img
                        initial={{ opacity: 0 }}
                        src={exampleImages[5].url}
                        className="w-52 h-full object-cover duration-200 transition-transform"
                    />
                </FloatingElement>
            </Floating>
        </div>
    )
}

export default ParallaxImage

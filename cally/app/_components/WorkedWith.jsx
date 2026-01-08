import React from 'react'
import LogoCloud from './_HowItWorks/LogoCloud'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import AnimatedBadge from '@/components/ui/animated-badge'

const WorkedWith = () => {
    return (
        <section className='flex flex-col items-center mt-20 font-urbanist justify-center'>
            <AnimatedBadge
                text="Trusted by teams worldwide"
                color="#22d3ee"
                href="/docs/components/animated-badge"
            />
            <div className="text-center max-w-7xl mx-auto relative text-neutral-100 mt-15">
                <h1 className="text-2xl md:text-3xl lg:text-4xl font-semibold leading-tight">
                    Effortless scheduling <br className="sm:hidden" />
                    <TooltipProvider>
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <div className="inline-block mx-2 align-middle relative">
                                    <div className="relative overflow-hidden sm:w-16 w-12 h-12 origin-center transition-all duration-300 md:hover:w-36 hover:-24 rounded-full border-2 border-white">
                                        <img
                                            src={`https://pro-section.ui-layouts.com/people/aam1.png`}
                                            alt="Person smiling"
                                            className="object-cover w-full h-full"
                                            style={{ objectPosition: "center" }}
                                        />
                                    </div>
                                </div>
                            </TooltipTrigger>
                            <TooltipContent
                                side="bottom"
                                className="max-w-xs bg-white text-black p-4 rounded-lg shadow-lg border-none"
                            >
                                <p className="mb-2 text-sm font-urbanist">
                                    "It's great to have a good sense of where my money is going
                                    and be able to adjust as necessary. I love the
                                    transparency."
                                </p>
                                <p className="font-medium text-sm">John Doe</p>
                            </TooltipContent>
                        </Tooltip>
                    </TooltipProvider>
                    trusted by
                </h1>

                <h1 className="text-2xl md:text-3xl lg:text-4xl font-semibold leading-tight">
                    fast-moving teams
                    <TooltipProvider>
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <div className="inline-block mx-2 align-middle">
                                    <div className="relative overflow-hidden sm:w-16 w-14 h-14 origin-center transition-all duration-300 lg:hover:w-36 md:hover:w-24 hover:-20 rounded-full border-2 border-white">
                                        <img
                                            src={`https://pro-section.ui-layouts.com/people/aam3.jpg`}
                                            alt="Employee"
                                            className="object-cover w-full h-full"
                                        />
                                    </div>
                                </div>
                            </TooltipTrigger>
                            <TooltipContent
                                side="bottom"
                                className="max-w-xs bg-white text-black p-4 rounded-lg shadow-lg border-none"
                            >
                                <p className="mb-2 text-sm font-urbanist">
                                    "It's great to have a good sense of where my money is going
                                    and be able to adjust as necessary. I love the
                                    transparency."
                                </p>
                                <p className="font-medium text-sm">John Doe</p>
                            </TooltipContent>
                        </Tooltip>
                    </TooltipProvider>
                    worldwide across
                </h1>
                <h1 className="text-2xl md:text-3xl lg:text-4xl font-semibold text-neutral-600 leading-tight">
                    industries and time zones.
                </h1>
            </div>
            <LogoCloud />
        </section>
    )
}

export default WorkedWith
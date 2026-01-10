import React from "react"
import { cn } from "@/lib/utils"
import { motion, useReducedMotion } from "motion/react"
import {
    InstagramIcon,
    LinkedinIcon,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Component } from "@/components/ui/etheral-shadow"
import Image from "next/image"
import { InteractiveHoverButton } from "@/components/ui/interactive-hover-button"
import Link from "next/link"

export function Footer({ className, ...props }) {
  return (
    <footer
      className={cn("relative h-[720px] w-full", className)}
      style={{ clipPath: "polygon(0 0,100% 0,100% 100%,0 100%)" }}
      {...props}
    >
      {/* STICKY FOOTER MECHANISM */}
      <div className="fixed bottom-0 h-[720px] w-full">
        <div className="sticky top-[calc(100vh-720px)] h-full overflow-hidden">

          {/* Background */}
          <div className="absolute inset-0 z-0">
            <Component
              color="rgba(128, 128, 128, 0.8)"
              animation={{ scale: 100, speed: 90 }}
              noise={{ opacity: 1, scale: 1.2 }}
              sizing="fill"
            />
          </div>

          {/* CONTENT */}
          <div className="relative z-10 flex h-full flex-col items-center justify-between px-6 text-center text-white">

            {/* HERO */}
            <AnimatedContainer className="mt-20 flex flex-col items-center">

              {/* Socials */}
              <AnimatedContainer delay={0.1} className="mb-8 flex gap-3">
                {socialLinks.map((link) => (
                  <Link
                    key={link.title}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Button
                      size="icon"
                      variant="outline"
                      className="size-10 border-white/30 text-white hover:bg-white hover:text-black"
                    >
                      <link.icon className="size-5" />
                    </Button>
                  </Link>
                ))}
              </AnimatedContainer>

              {/* Logo */}
              <AnimatedContainer delay={0.2} className="flex items-center -space-x-5">
                <Image src="/Logo/C.png" alt="logo" width={150} height={150} />
                <span className="font-urbanist text-8xl font-semibold tracking-tight">
                  Cally
                </span>
              </AnimatedContainer>

              {/* Tagline */}
              <AnimatedContainer delay={0.3}>
                <p className="mt-2 text-xl text-neutral-400 font-urbanist">
                  The better way to schedule your meetings.
                </p>
              </AnimatedContainer>

              {/* CTA */}
              <AnimatedContainer delay={0.4} className="mt-20">
                <InteractiveHoverButton text="Get Started" />
              </AnimatedContainer>

            </AnimatedContainer>

            {/* LINKS */}
            <AnimatedContainer delay={0.5} className="mt-12">
              <ul className="flex gap-28 text-sm text-neutral-200 font-urbanist">
                {footerLinkGroups[0].links.map((link) => (
                  <li key={link.title}>
                    <Link href={link.href} className="hover:opacity-100 transition">
                      {link.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </AnimatedContainer>

            {/* BOTTOM BAR (NO ANIMATION) */}
            <div className="mb-8 w-full flex items-center justify-between text-sm text-neutral-400 font-urbanist">
              <p>getcally@support.com</p>
              <p>© 2024 Cally. All rights reserved.</p>
            </div>

          </div>
        </div>
      </div>
    </footer>
  )
}

const socialLinks = [
    {
        title: "Instagram",
        href: "https://www.instagram.com/abhiiiiiii.21/",
        icon: InstagramIcon,
    },
    {
        title: "LinkedIn",
        href: "https://www.linkedin.com/in/abhiiiiii21/",
        icon: LinkedinIcon,
    },
]

const footerLinkGroups = [
    {
        label: 'All Features',
        links: [
            { title: 'How it Works', href: '#' },
            { title: 'Integrations', href: '#' },
            { title: 'Testimonials', href: '#' },
            { title: 'FAQs', href: '#' },],
    }
];

function AnimatedContainer({ delay = 0.1, children, ...props }) {
    const shouldReduceMotion = useReducedMotion();
    if (shouldReduceMotion) { return children; }
    return (<motion.div initial={{ filter: 'blur(4px)', translateY: -8, opacity: 0 }}
        whileInView={{ filter: 'blur(0px)', translateY: 0, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay, duration: 0.8 }} {...props}> {
            children}
    </motion.div>);
}
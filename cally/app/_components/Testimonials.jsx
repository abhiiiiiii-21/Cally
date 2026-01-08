"use client";
import { TestimonialsColumn } from "@/components/blocks/testimonials-columns-1";
import AnimatedBadge from "@/components/ui/animated-badge";
import { motion } from "motion/react";

const testimonials = [
  {
    text: "Cally made scheduling with clients effortless. I just share my link and let them book — no more back-and-forth.",
    image: "https://randomuser.me/api/portraits/women/1.jpg",
    name: "Briana Patton",
    role: "Freelance Designer",
  },
  {
    text: "As a startup founder, time is everything. Cally helps me manage meetings without distractions.",
    image: "https://randomuser.me/api/portraits/men/2.jpg",
    name: "Bilal Ahmed",
    role: "Startup Founder",
  },
  {
    text: "Our remote team relies on Cally daily. Scheduling across time zones is finally simple.",
    image: "https://randomuser.me/api/portraits/women/3.jpg",
    name: "Saman Malik",
    role: "Remote Team Lead",
  },
  {
    text: "Cally keeps my calendar organized and professional. Clients love how easy it is to book calls.",
    image: "https://randomuser.me/api/portraits/men/4.jpg",
    name: "Omar Raza",
    role: "Business Consultant",
  },
  {
    text: "We onboard clients faster because scheduling demos takes seconds with Cally.",
    image: "https://randomuser.me/api/portraits/women/5.jpg",
    name: "Zainab Hussain",
    role: "SaaS Product Manager",
  },
  {
    text: "I use Cally for coaching sessions every day. It handles availability, reminders, and follow-ups seamlessly.",
    image: "https://randomuser.me/api/portraits/women/6.jpg",
    name: "Aliza Khan",
    role: "Career Coach",
  },
  {
    text: "Booking sales calls used to be messy. With Cally, prospects pick a time and show up prepared.",
    image: "https://randomuser.me/api/portraits/men/7.jpg",
    name: "Farhan Siddiqui",
    role: "Sales Lead",
  },
  {
    text: "Cally removed friction from our hiring process. Interview scheduling is now stress-free.",
    image: "https://randomuser.me/api/portraits/women/8.jpg",
    name: "Sana Sheikh",
    role: "Recruiter",
  },
  {
    text: "Cally fits perfectly into my workflow as a solo founder. Clean, fast, and reliable.",
    image: "https://randomuser.me/api/portraits/men/9.jpg",
    name: "Hassan Ali",
    role: "Indie Hacker",
  },
];



const firstColumn = testimonials.slice(0, 3);
const secondColumn = testimonials.slice(3, 6);
const thirdColumn = testimonials.slice(6, 9);


const Testimonials = () => {
    return (
        <section className="bg-background relative font-urbanist">

            <div className="container z-10 mx-auto">
                <div className="flex flex-col items-center justify-center mx-auto">
                    <div className="flex justify-center">
                        <AnimatedBadge
                            text="Testimonials"
                            color="#22d3ee"
                        />
                    </div>

                    <h1 className="text-5xl font-semibold tracking-tighter mt-15">
                        Don't just take our word for it
                    </h1>
                    <p className="text-center mt-3 text-neutral-600">
                    Hear from the professionals who schedule smarter everyday.
                    </p>
                </div>

                <div className="flex justify-center gap-6 mt-17 [mask-image:linear-gradient(to_bottom,transparent,black_25%,black_75%,transparent)] max-h-[740px] overflow-hidden">
                    <TestimonialsColumn testimonials={firstColumn} duration={15} />
                    <TestimonialsColumn testimonials={secondColumn} className="hidden md:block" duration={19} />
                    <TestimonialsColumn testimonials={thirdColumn} className="hidden lg:block" duration={17} />
                </div>
            </div>
        </section>
    );
};

export default Testimonials;
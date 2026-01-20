import AnimatedBadge from "@/components/ui/animated-badge"
import TimeLine_01 from "@/components/ui/release-time-line"

const HowItWorks = () => {
  return (
    <section className='flex flex-col items-center font-urbanist mt-30'>
      <AnimatedBadge
        text="How it works"
        color="#22d3ee"
      />
      <TimeLine_01 />
    </section>
  )
}

export default HowItWorks
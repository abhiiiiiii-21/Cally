"use client";
import Link from "next/link"
import { ChevronRight } from "lucide-react"
import { motion } from "motion/react"

function hexToRgba(hexColor, alpha) {
  const hex = hexColor.replace("#", "")
  if (hex.length === 3) {
    const r = parseInt(hex[0] + hex[0], 16)
    const g = parseInt(hex[1] + hex[1], 16)
    const b = parseInt(hex[2] + hex[2], 16)
    return `rgba(${r}, ${g}, ${b}, ${alpha})`
  }
  if (hex.length === 6) {
    const r = parseInt(hex.substring(0, 2), 16)
    const g = parseInt(hex.substring(2, 4), 16)
    const b = parseInt(hex.substring(4, 6), 16)
    return `rgba(${r}, ${g}, ${b}, ${alpha})`
  }
  return hexColor
}

const AnimatedBadge = ({
  text = "Introducing Eldoraui",
  color = "#22d3ee",
  href
}) => {
  const content = (
    <motion.div
      initial={false}
      whileInView={{
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
      }}
      transition={{
        duration: 0.3,
        delay: 0.1,
        ease: "easeInOut",
      }}
      viewport={{ once: true }}
      className="group relative flex max-w-fit items-center justify-center gap-3 rounded-full border border-neutral-300 bg-white px-4 py-1.5 text-neutral-700 transition-colors dark:border-neutral-700/80 dark:bg-black dark:text-zinc-300">
      <div
        className="relative flex h-1 w-1 items-center justify-center rounded-full"
        style={{ backgroundColor: hexToRgba(color, 0.4) }}>
        <div
          className="flex h-2 w-2 animate-ping items-center justify-center rounded-full"
          style={{ backgroundColor: color }}>
          <div
            className="flex h-2 w-2 animate-ping items-center justify-center rounded-full"
            style={{ backgroundColor: color }}></div>
        </div>
        <div
          className="absolute top-1/2 left-1/2 flex h-1 w-1 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full"
          style={{ backgroundColor: hexToRgba(color, 0.8) }}></div>
      </div>
      <span className="bg-clip-text text-xs font-medium">{text}</span>
    </motion.div>
  )
  return (
    <>
      {href ? (
        <Link href={href} className="inline-block">
          {content}
        </Link>
      ) : (
        content
      )}
      <style>
        {`    
.multiline {
  offset-anchor: 10px 0px;
  animation: multiline-animation-path;
  animation-iteration-count: infinite;
  animation-timing-function: linear;
  animation-duration: 3s;
}

.ml-light-1 {
  offset-path: path(
    "M 69 49.8 h -30 q -3 0 -3 -3 v -13 q 0 -3 -3 -3 h -23 q -3 0 -3 -3 v -13 q 0 -3 -3 -3 h -50"
  );
}

@keyframes multiline-animation-path {
  0% {
    offset-distance: 0%;
  }
  50% {
    offset-distance: 100%;
  }
  100% {
    offset-distance: 100%;
  }
}`}
      </style>
    </>
  );
}

export default AnimatedBadge

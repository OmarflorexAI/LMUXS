import { useState } from 'react'
import { motion } from 'motion/react'
import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

function cn(...inputs) { return twMerge(clsx(inputs)) }

const TOP    = 'radial-gradient(20.7% 50% at 50% 0%, hsl(0, 0%, 100%) 0%, rgba(255, 255, 255, 0) 100%)'
const RIGHT  = 'radial-gradient(16.2% 41.2% at 100% 50%, hsl(0, 0%, 100%) 0%, rgba(255, 255, 255, 0) 100%)'
const BOTTOM = 'radial-gradient(20.7% 50% at 50% 100%, hsl(0, 0%, 100%) 0%, rgba(255, 255, 255, 0) 100%)'
const LEFT   = 'radial-gradient(16.6% 43.1% at 0% 50%, hsl(0, 0%, 100%) 0%, rgba(255, 255, 255, 0) 100%)'

const HIGHLIGHT =
  'radial-gradient(75% 181% at 50% 50%, #CE1126 0%, rgba(255, 255, 255, 0) 100%)'

// Single 4-stop loop, GPU-composited, no React re-renders.
const ROTATION = [TOP, RIGHT, BOTTOM, LEFT, TOP]

export function HoverBorderGradient({
  children,
  containerClassName,
  className,
  as: Element = 'button',
  duration = 4,
  ...props
}) {
  const [hovered, setHovered] = useState(false)

  return (
    <Element
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={cn(
        'relative flex h-min w-fit flex-col flex-nowrap content-center items-center justify-center gap-10 overflow-visible rounded-full border bg-black/40 box-decoration-clone p-px backdrop-blur-sm transition-colors duration-500 hover:bg-black/60',
        containerClassName
      )}
      {...props}
    >
      <div
        className={cn(
          'relative z-20 w-auto rounded-[inherit] bg-black px-4 py-2 text-white',
          className
        )}
      >
        {children}
      </div>

      <motion.div
        aria-hidden
        className="absolute inset-0 z-0 rounded-[inherit] pointer-events-none"
        style={{ filter: 'blur(2px)', willChange: 'background' }}
        animate={
          hovered
            ? { background: HIGHLIGHT }
            : { background: ROTATION }
        }
        transition={
          hovered
            ? { duration: 0.45, ease: [0.22, 1, 0.36, 1] }
            : { duration, ease: 'linear', repeat: Infinity, repeatType: 'loop' }
        }
      />

      <div className="absolute inset-[1px] z-10 rounded-[inherit] bg-black pointer-events-none" />
    </Element>
  )
}

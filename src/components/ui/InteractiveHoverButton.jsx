import React from 'react'
import { ArrowRight } from 'lucide-react'
import { cn } from '../../lib/utils'

/**
 * InteractiveHoverButton
 * Adapted from shadcn interactive-hover-button for this project (plain JS, no TS, no CSS vars).
 *
 * Props:
 *   text        – button label
 *   icon        – optional icon element shown in the initial state (left of text)
 *   href        – renders as <a> when provided, otherwise <button>
 *   target/rel  – forwarded to <a> when href is set
 *   blobColor   – CSS color for the expanding blob (default: #a80e1e)
 *   className   – merged via cn() — set bg, text color, padding, font here
 */
const InteractiveHoverButton = React.forwardRef(
  ({ text = 'Button', icon, href, target, rel, blobColor = '#a80e1e', className, ...props }, ref) => {
    const Tag = href ? 'a' : 'button'

    return (
      <Tag
        ref={ref}
        href={href}
        target={target}
        rel={rel}
        className={cn(
          'group relative cursor-pointer overflow-hidden rounded-full inline-flex items-center justify-center font-semibold',
          className
        )}
        {...props}
      >
        {/* Initial label — slides right + fades on hover */}
        <span className="relative z-20 flex items-center gap-2.5 transition-all duration-300 group-hover:translate-x-10 group-hover:opacity-0">
          {icon}
          {text}
        </span>

        {/* Hover label — slides in from right */}
        <span className="absolute z-20 flex items-center justify-center gap-2 w-full translate-x-10 opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100 pointer-events-none">
          {text}
          <ArrowRight size={14} strokeWidth={2.5} />
        </span>

        {/* Expanding blob — small dot that grows to fill the button */}
        <span
          className="absolute left-[20%] top-[40%] h-2 w-2 scale-100 rounded-lg transition-all duration-300 group-hover:left-0 group-hover:top-0 group-hover:h-full group-hover:w-full group-hover:scale-[1.8]"
          style={{ backgroundColor: blobColor }}
        />
      </Tag>
    )
  }
)

InteractiveHoverButton.displayName = 'InteractiveHoverButton'

export { InteractiveHoverButton }

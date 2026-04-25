import { ArrowUpRight } from 'lucide-react'
import { cn } from '../../lib/utils'

export function SlideArrowButton({ text, href, className, ...props }) {
  const Tag = href ? 'a' : 'button'
  return (
    <Tag
      href={href}
      className={cn(
        'relative font-sans font-bold text-[14px] rounded-full h-12 p-1 ps-7 pe-14 group transition-all duration-500 hover:ps-14 hover:pe-7 overflow-hidden cursor-pointer inline-flex items-center',
        className
      )}
      {...props}
    >
      <span className="relative z-10 transition-all duration-500 whitespace-nowrap">
        {text}
      </span>
      <div className="absolute right-1 w-10 h-10 bg-white text-[#CE1126] rounded-full flex items-center justify-center transition-all duration-500 group-hover:right-[calc(100%-44px)] group-hover:rotate-45">
        <ArrowUpRight size={16} />
      </div>
    </Tag>
  )
}

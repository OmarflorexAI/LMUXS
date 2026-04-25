import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import InteractiveSelector from './ui/interactive-selector'

gsap.registerPlugin(ScrollTrigger)

export default function Gallery() {
  const sectionRef = useRef(null)

  useEffect(() => {
    const mobile = window.innerWidth < 768
    const ctx = gsap.context(() => {
      gsap.fromTo('.g-header', { y: 25, opacity: 0 },
        { y: 0, opacity: 1, duration: mobile ? 0.6 : 1.1, ease: 'power4.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 82%' } })
      gsap.fromTo('.g-selector', { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: mobile ? 0.6 : 1, ease: 'expo.out',
          scrollTrigger: { trigger: '.g-selector', start: 'top 85%' } })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} id="galeria" className="bg-white py-24 md:py-40 overflow-hidden scroll-mt-[88px]">
      <div className="absolute left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-black/[0.08] to-transparent" style={{ marginTop: '-6rem' }} />

      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <div className="g-header flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 md:mb-14">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-6 h-[1px] bg-dominican-red" />
              <span className="font-sans text-[11px] uppercase tracking-[0.35em] text-dominican-red font-semibold">Galeria</span>
            </div>
            <h2 className="font-serif italic text-[clamp(2.2rem,4.5vw,3.8rem)] leading-[1.06] text-[#1a1a2e]">
              Momentos que<br />
              <span className="font-sans not-italic font-black text-[clamp(1.8rem,3.6vw,3rem)] tracking-tight">
                definen una comunidad.
              </span>
            </h2>
          </div>
          <p className="font-sans text-[#444] text-[13px] leading-relaxed max-w-xs md:text-right">
            Cada foto es una historia. Cada historia es una razon para seguir.
          </p>
        </div>

        <div className="g-selector">
          <InteractiveSelector />
        </div>
      </div>
    </section>
  )
}

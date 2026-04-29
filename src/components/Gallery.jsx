import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { motion, AnimatePresence, LayoutGroup } from 'motion/react'
import { MapPin } from 'lucide-react'
import { useT } from '../i18n'

// ─── Events: each is a city + year + 4 photos ────────────────────────────
// User will provide final cities/years/photo assignments.
const events = [
  {
    id: 'puerto-plata-2020',
    city: 'Puerto Plata',
    year: '2020',
    photos: [
      '/images/92e0a6fd-43b0-48d7-b330-c8efec53d1eb.jpg',
      '/images/de412b4d-9ed7-4096-8eb8-787f6332f666.jpg',
      '/images/481035632_18054987719136218_261079676402721292_n.jpg',
      '/images/bbf481bc-4d55-44e8-9081-e98da354734a.jpg',
    ],
  },
  {
    id: 'monte-plata-2022',
    city: 'Monte Plata',
    year: '2022',
    photos: [
      '/images/6b2b4380-7005-4524-978d-204f9acdc03e.jpg',
      '/images/ad9f7594-9cdb-4f3d-b60d-2469ddd23e01.jpg',
      '/images/josue-escoto-lij7YezX6fs-unsplash.jpg',
      '/images/481835518_18054987704136218_4244386758836801036_n.jpg',
    ],
  },
  {
    id: 'monte-cristi-2023',
    city: 'Monte Cristi',
    year: '2023',
    photos: [
      '/images/5404f636-925e-4f7d-a6f8-994030b66d26.jpg',
      '/images/kenneth-schipper-bneCT1T_RXQ-unsplash.jpg',
      '/images/0905dd8c-0535-4d93-9076-e1f43320a8fb.jpg',
      '/images/becca-boyd-k6rbJF-gn7M-unsplash.jpg',
    ],
  },
  {
    id: 'los-mina-2024',
    city: 'Los Mina',
    year: '2024',
    photos: [
      '/images/43854744-5b4a-47e3-b65b-b3ccad629291.jpg',
      '/images/b1c10c4d-a8f6-47e9-9ae8-7b754246b582.jpg',
      '/images/c7eeb4f3-2e73-49fb-a7e4-f15a14e453b3.jpg',
      '/images/2b1ea0ad-daa0-4f20-ba59-8141a0da8f9a.jpg',
    ],
  },
]

// Spans for the 4-photo grid (desktop). Mobile collapses to 2x2 squares.
const SPANS = [
  'md:col-span-2 md:row-span-2', // hero (large)
  'md:col-span-1 md:row-span-1',
  'md:col-span-1 md:row-span-1',
  'md:col-span-2 md:row-span-1', // wide
]

const EASE = [0.22, 1, 0.36, 1]

export default function Gallery() {
  const sectionRef = useRef(null)
  const { t } = useT()
  const [activeId, setActiveId] = useState(events[0].id)
  const active = events.find((e) => e.id === activeId) || events[0]

  useEffect(() => {
    const mobile = window.innerWidth < 768
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.g-header > *',
        { y: 24, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: mobile ? 0.5 : 0.85,
          stagger: 0.06,
          ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 82%' },
        }
      )

      gsap.fromTo(
        '.g-tabs',
        { y: 18, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: mobile ? 0.5 : 0.7,
          ease: 'power3.out',
          scrollTrigger: { trigger: '.g-tabs', start: 'top 90%' },
        }
      )
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      id="galeria"
      className="relative bg-[#FAFAF9] py-24 md:py-36 overflow-hidden scroll-mt-[88px]"
    >
      <div
        className="absolute top-0 left-0 right-0 h-[1px]"
        style={{ background: 'linear-gradient(to right, transparent, rgba(0,0,0,0.08), transparent)' }}
      />

      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <div className="g-header flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 md:mb-14">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-6 h-[1px] bg-dominican-red" />
              <span className="font-sans text-[11px] uppercase tracking-[0.35em] text-dominican-red font-semibold">
                {t('gallery.eyebrow')}
              </span>
            </div>
            <h2 className="font-serif italic text-[clamp(2.2rem,4.5vw,3.8rem)] leading-[1.06] text-[#1a1a2e]">
              {t('gallery.title1')}
              <br />
              <span className="font-sans not-italic font-black text-[clamp(1.8rem,3.6vw,3rem)] tracking-tight">
                {t('gallery.title2')}
              </span>
            </h2>
          </div>
          <p className="font-sans text-[#444] text-[13px] leading-relaxed max-w-xs md:text-right">
            {t('gallery.subtitle')}
          </p>
        </div>

        {/* Event tabs */}
        <LayoutGroup>
          <div className="g-tabs mb-8 md:mb-10 -mx-6 md:mx-0 px-6 md:px-0 overflow-x-auto md:overflow-visible no-scrollbar">
            <div
              role="tablist"
              aria-label="Event timeline"
              className="inline-flex md:flex md:flex-wrap items-center gap-2 min-w-max md:min-w-0"
            >
              {events.map((e) => {
                const isActive = e.id === activeId
                return (
                  <button
                    key={e.id}
                    role="tab"
                    aria-selected={isActive}
                    onClick={() => setActiveId(e.id)}
                    className={`relative font-sans px-4 py-2.5 rounded-full transition-colors duration-200 cursor-pointer flex items-center gap-2 flex-shrink-0 ${
                      isActive ? 'text-white' : 'text-[#1a1a2e] hover:text-[#CE1126]'
                    }`}
                  >
                    {isActive && (
                      <motion.span
                        layoutId="event-tab-bg"
                        className="absolute inset-0 rounded-full"
                        style={{
                          background: '#1a1a2e',
                          boxShadow: '0 4px 14px rgba(26,26,46,0.18)',
                        }}
                        transition={{ type: 'spring', stiffness: 380, damping: 32, mass: 0.7 }}
                      />
                    )}
                    <span className="relative z-10 flex items-center gap-2">
                      <MapPin
                        size={11}
                        strokeWidth={2.2}
                        className={isActive ? 'text-[#CE1126]' : 'text-[#999]'}
                      />
                      <span className="font-semibold text-[12px] uppercase tracking-[0.16em]">
                        {e.city}
                      </span>
                      <span
                        className={`font-serif italic text-[13px] ${
                          isActive ? 'text-white/75' : 'text-[#888]'
                        }`}
                      >
                        · {e.year}
                      </span>
                    </span>
                  </button>
                )
              })}
            </div>
          </div>
        </LayoutGroup>

        {/* Event header (city + year + photo count) */}
        <div className="flex items-baseline justify-between mb-5 md:mb-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={`label-${active.id}`}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.3, ease: EASE }}
              className="flex items-baseline gap-3"
            >
              <span className="font-serif italic text-[clamp(1.4rem,2.2vw,1.9rem)] leading-none text-[#1a1a2e]">
                {active.city}
              </span>
              <span className="font-sans text-[10px] uppercase tracking-[0.28em] font-semibold text-[#999]">
                · {active.year}
              </span>
            </motion.div>
          </AnimatePresence>
          <AnimatePresence mode="wait">
            <motion.span
              key={`count-${active.id}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="font-sans text-[10px] uppercase tracking-[0.25em] font-semibold text-[#999]"
            >
              {String(active.photos.length).padStart(2, '0')} / {String(active.photos.length).padStart(2, '0')}
            </motion.span>
          </AnimatePresence>
        </div>

        {/* Photo grid — animates between events */}
        <AnimatePresence mode="wait">
          <motion.div
            key={active.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 md:grid-flow-dense md:[grid-auto-rows:minmax(180px,1fr)]"
          >
            {active.photos.map((src, i) => (
              <motion.figure
                key={`${active.id}-${i}`}
                initial={{ opacity: 0, y: 28, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -8, scale: 0.97 }}
                transition={{
                  duration: 0.55,
                  ease: EASE,
                  delay: 0.06 + i * 0.08,
                }}
                className={`relative overflow-hidden rounded-2xl bg-[#1a1a2e] aspect-square md:aspect-auto group ${SPANS[i] || ''}`}
                style={{
                  boxShadow: '0 6px 20px rgba(0,0,0,0.10), 0 1px 3px rgba(0,0,0,0.05)',
                  border: '1px solid rgba(0,0,0,0.06)',
                  transform: 'translateZ(0)',
                }}
              >
                <img
                  src={src}
                  alt={`${active.city} ${active.year}`}
                  loading={i === 0 ? 'eager' : 'lazy'}
                  decoding="async"
                  fetchpriority={i === 0 ? 'high' : 'auto'}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.04]"
                  style={{ imageRendering: 'auto' }}
                />

                {/* Bottom gradient for label legibility */}
                <div
                  className="absolute inset-x-0 bottom-0 pointer-events-none"
                  style={{
                    height: '40%',
                    background:
                      'linear-gradient(to top, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0.15) 60%, transparent 100%)',
                  }}
                />

                {/* Bottom-left: subtle index + city tag */}
                <figcaption className="absolute left-3.5 right-3.5 bottom-3 z-10 flex items-center justify-between">
                  <div className="flex items-center gap-2 text-white/95">
                    <span
                      className="w-1.5 h-1.5 rounded-full"
                      style={{ background: '#CE1126', boxShadow: '0 0 0 4px rgba(206,17,38,0.18)' }}
                    />
                    <span className="font-sans text-[10px] uppercase tracking-[0.28em] font-bold">
                      {active.city}
                    </span>
                  </div>
                  <span className="font-serif italic text-[12px] text-white/70">{active.year}</span>
                </figcaption>
              </motion.figure>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  )
}

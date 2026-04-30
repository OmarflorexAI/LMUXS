import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { motion, AnimatePresence, LayoutGroup } from 'motion/react'
import { MapPin } from 'lucide-react'
import { useT } from '../i18n'

// ─── Events: each is a city + year + 5 photos ────────────────────────────
// Each event leads with its hero photo (the named one identifying the
// city/year), followed by 4 additional moments from that event.
const events = [
  {
    id: 'constanza-2021',
    city: 'Constanza',
    year: '2021',
    photos: [
      '/images/Constanza2021.jpeg',
      '/images/4d38bd8c-ab4b-4b46-8174-ddef19d6d185.jpeg',
      '/images/4ebede57-e2bc-40aa-9a18-2be07954c555.jpeg',
      '/images/508df95d-9af7-4d51-8b96-37013a412a27.jpeg',
      '/images/531d288a-3519-4d0c-aee9-f0285079b331.jpeg',
    ],
  },
  {
    id: 'macao-2022',
    city: 'Macao',
    year: '2022',
    photos: [
      '/images/macao2022.jpeg',
      '/images/macao2.jpeg',
      '/images/macao3.jpeg',
      '/images/627ec46a-cf71-4154-aa52-500d5d51d5c8.jpeg',
      '/images/84b97b71-bf1d-4949-84ca-0fb246a801bb.jpeg',
    ],
  },
  {
    id: 'san-juan-2022',
    city: 'San Juan',
    year: '2022',
    photos: [
      '/images/sanjuan2022.jpeg',
      '/images/936dbc9e-1e18-45fa-b68b-ff1b7d2ee1bd.jpeg',
      '/images/96016db0-d0c5-4654-8d0f-ea8ef24728c0.jpeg',
      '/images/9e2e244c-7c19-4382-8731-ed93d13e311c.jpeg',
      '/images/a5388225-6aeb-44fd-b5e5-a08d2c543e7a.jpeg',
    ],
  },
  {
    id: 'san-cristobal-2024',
    city: 'San Cristóbal',
    year: '2024',
    photos: [
      '/images/san_cristobal_2024.jpeg',
      '/images/b6e0c006-1f4c-439f-9734-f9034a3cb832.jpeg',
      '/images/beb4d983-e8c7-4cdb-a236-3a19b1a94472.jpeg',
      '/images/c135b12d-0fa1-46a4-ae3a-d03f871a08e7.jpeg',
      '/images/d5908b34-1c2a-4f7f-9360-004dde5bb6b7.jpeg',
    ],
  },
  {
    id: 'san-francisco-2025',
    city: 'San Francisco',
    year: '2025',
    photos: [
      '/images/e0f402c1-5d25-44ea-bb8f-d9288faa6bd1.jpeg',
      '/images/e1ef8420-5be2-443d-8f6c-c34b26d07bf1.jpeg',
      '/images/e9b4362e-8de3-4fc4-8adc-7bb9a6c43d75.jpeg',
      '/images/f27271ef-a916-4d31-8555-cf9384af9635.jpeg',
      '/images/f56c74be-58fe-47a9-ab9f-be5e7b70bb06.jpeg',
    ],
  },
]

// 5-photo layout: a hero photo followed by 4 supporting photos, all
// landscape-friendly so wide group shots aren't cropped at the edges.
//   Mobile  : hero full-width, supporting in 2 cols
//   Desktop : hero full-width, supporting in 4 cols
const PHOTO_CLASSES = [
  'col-span-2 md:col-span-2 md:row-span-2 aspect-[16/10] md:aspect-auto h-full w-full',
  'col-span-1 md:col-span-1 aspect-[4/3] h-full w-full',
  'col-span-1 md:col-span-1 aspect-[4/3] h-full w-full',
  'col-span-1 md:col-span-1 aspect-[4/3] h-full w-full',
  'col-span-1 md:col-span-1 aspect-[4/3] h-full w-full',
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

      <div className="max-w-6xl mx-auto px-6 md:px-10">
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
            initial={false}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.18, ease: EASE }}
            className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4"
          >
            {active.photos.map((src, i) => (
              <motion.figure
                key={`${active.id}-${i}`}
                initial={{ opacity: 0, y: 22, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -6, scale: 0.98 }}
                transition={{
                  duration: 0.5,
                  ease: EASE,
                  delay: i * 0.06,
                }}
                className={`relative overflow-hidden rounded-2xl bg-[#1a1a2e] group ${PHOTO_CLASSES[i] || 'aspect-[4/3]'}`}
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
                  style={{ imageRendering: 'auto', objectPosition: 'center' }}
                />
              </motion.figure>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  )
}

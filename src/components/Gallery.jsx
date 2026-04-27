import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useT } from '../i18n'

const tiles = [
  {
    src: '/images/92e0a6fd-43b0-48d7-b330-c8efec53d1eb.jpg',
    span: 'md:col-span-2 md:row-span-2',
    badge: '01',
    accent: '#CE1126',
  },
  {
    src: '/images/de412b4d-9ed7-4096-8eb8-787f6332f666.jpg',
    span: 'md:col-span-1 md:row-span-1',
    badge: '02',
  },
  {
    src: '/images/kenneth-schipper-bneCT1T_RXQ-unsplash.jpg',
    span: 'md:col-span-1 md:row-span-2',
    badge: '03',
  },
  {
    src: '/images/bbf481bc-4d55-44e8-9081-e98da354734a.jpg',
    span: 'md:col-span-1 md:row-span-1',
    badge: '04',
  },
  {
    src: '/images/josue-escoto-lij7YezX6fs-unsplash.jpg',
    span: 'md:col-span-2 md:row-span-1',
    badge: '05',
  },
  {
    src: '/images/6b2b4380-7005-4524-978d-204f9acdc03e.jpg',
    span: 'md:col-span-1 md:row-span-1',
    badge: '06',
    accent: '#002D62',
  },
  {
    src: '/images/ad9f7594-9cdb-4f3d-b60d-2469ddd23e01.jpg',
    span: 'md:col-span-1 md:row-span-1',
    badge: '07',
  },
  {
    src: '/images/becca-boyd-k6rbJF-gn7M-unsplash.jpg',
    span: 'md:col-span-2 md:row-span-1',
    badge: '08',
  },
  {
    src: '/images/b1c10c4d-a8f6-47e9-9ae8-7b754246b582.jpg',
    span: 'md:col-span-1 md:row-span-1',
    badge: '09',
  },
  {
    src: '/images/0905dd8c-0535-4d93-9076-e1f43320a8fb.jpg',
    span: 'md:col-span-1 md:row-span-1',
    badge: '10',
    accent: '#D4A843',
  },
]

export default function Gallery() {
  const sectionRef = useRef(null)
  const { t } = useT()

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
        '.g-tile',
        { y: 30, opacity: 0, scale: 0.97 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: mobile ? 0.55 : 0.9,
          stagger: { each: 0.05, from: 'start' },
          ease: 'power3.out',
          scrollTrigger: { trigger: '.g-grid', start: 'top 88%' },
        }
      )
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      id="galeria"
      className="relative bg-white py-24 md:py-36 overflow-hidden scroll-mt-[88px]"
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

        <div
          className="g-grid grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 grid-flow-dense"
          style={{ gridAutoRows: 'minmax(160px, 1fr)' }}
        >
          {tiles.map((tile, i) => (
            <figure
              key={i}
              className={`g-tile group relative overflow-hidden rounded-2xl bg-[#1a1a2e] aspect-square md:aspect-auto ${tile.span || ''}`}
              style={{
                boxShadow: '0 4px 16px rgba(0,0,0,0.08), 0 1px 3px rgba(0,0,0,0.04)',
                transform: 'translateZ(0)',
              }}
            >
              <img
                src={tile.src}
                alt=""
                loading="lazy"
                decoding="async"
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.04]"
              />

              {/* Subtle bottom gradient (always visible, ensures contrast for badge) */}
              <div
                className="absolute inset-x-0 bottom-0 h-1/3 pointer-events-none"
                style={{
                  background:
                    'linear-gradient(to top, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.15) 60%, transparent 100%)',
                }}
              />

              {/* Index badge — always visible */}
              <div className="absolute top-3.5 left-3.5 flex items-center gap-2 z-10">
                <span
                  className="font-sans text-[9px] uppercase tracking-[0.25em] font-semibold px-2 py-1 rounded-full backdrop-blur-md"
                  style={{
                    background: 'rgba(255,255,255,0.18)',
                    color: '#fff',
                    border: '1px solid rgba(255,255,255,0.18)',
                  }}
                >
                  {tile.badge}
                </span>
              </div>

              {/* Accent corner mark for featured tiles */}
              {tile.accent && (
                <div
                  className="absolute top-3.5 right-3.5 w-2 h-2 rounded-full z-10"
                  style={{
                    background: tile.accent,
                    boxShadow: `0 0 0 4px ${tile.accent}33`,
                  }}
                />
              )}
            </figure>
          ))}
        </div>
      </div>
    </section>
  )
}

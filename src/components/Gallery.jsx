import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useT } from '../i18n'

const RED = '#CE1126'
const BLUE = '#002D62'
const GOLD = '#D4A843'

const tiles = [
  // [type, src OR null, span, category-key, caption-key, accent-color, index]
  {
    type: 'image',
    src: '/images/92e0a6fd-43b0-48d7-b330-c8efec53d1eb.jpg',
    span: 'md:col-span-2 md:row-span-2',
    cat: 'gallery.cat.family',
    cap: 'gallery.cap.family',
    accent: RED,
    n: '01',
    showCap: true,
  },
  {
    type: 'image',
    src: '/images/kenneth-schipper-bneCT1T_RXQ-unsplash.jpg',
    span: 'md:col-span-1 md:row-span-2',
    cat: 'gallery.cat.action',
    cap: 'gallery.cap.action',
    accent: BLUE,
    n: '02',
    showCap: true,
  },
  {
    type: 'image',
    src: '/images/de412b4d-9ed7-4096-8eb8-787f6332f666.jpg',
    span: 'md:col-span-1 md:row-span-1',
    cat: 'gallery.cat.team',
    accent: GOLD,
    n: '03',
  },
  {
    type: 'image',
    src: '/images/bbf481bc-4d55-44e8-9081-e98da354734a.jpg',
    span: 'md:col-span-1 md:row-span-1',
    cat: 'gallery.cat.passion',
    accent: RED,
    n: '04',
  },
  {
    type: 'quote',
    span: 'md:col-span-2 md:row-span-1',
    accent: BLUE,
    n: '—',
  },
  {
    type: 'image',
    src: '/images/josue-escoto-lij7YezX6fs-unsplash.jpg',
    span: 'md:col-span-1 md:row-span-1',
    cat: 'gallery.cat.legacy',
    accent: GOLD,
    n: '05',
  },
  {
    type: 'image',
    src: '/images/6b2b4380-7005-4524-978d-204f9acdc03e.jpg',
    span: 'md:col-span-1 md:row-span-1',
    cat: 'gallery.cat.community',
    accent: BLUE,
    n: '06',
  },
  {
    type: 'image',
    src: '/images/becca-boyd-k6rbJF-gn7M-unsplash.jpg',
    span: 'md:col-span-2 md:row-span-1',
    cat: 'gallery.cat.training',
    cap: 'gallery.cap.training',
    accent: RED,
    n: '07',
    showCap: true,
  },
  {
    type: 'image',
    src: '/images/ad9f7594-9cdb-4f3d-b60d-2469ddd23e01.jpg',
    span: 'md:col-span-1 md:row-span-1',
    cat: 'gallery.cat.youth',
    accent: GOLD,
    n: '08',
  },
  {
    type: 'image',
    src: '/images/0905dd8c-0535-4d93-9076-e1f43320a8fb.jpg',
    span: 'md:col-span-1 md:row-span-1',
    cat: 'gallery.cat.team',
    accent: BLUE,
    n: '09',
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

        <div
          className="g-grid grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 grid-flow-dense"
          style={{ gridAutoRows: 'minmax(170px, 1fr)' }}
        >
          {tiles.map((tile, i) =>
            tile.type === 'quote' ? (
              <QuoteTile key={i} tile={tile} t={t} />
            ) : (
              <ImageTile key={i} tile={tile} t={t} />
            )
          )}
        </div>
      </div>
    </section>
  )
}

function ImageTile({ tile, t }) {
  return (
    <figure
      className={`g-tile group relative overflow-hidden rounded-2xl bg-[#1a1a2e] aspect-square md:aspect-auto ${tile.span || ''}`}
      style={{
        boxShadow: '0 4px 16px rgba(0,0,0,0.08), 0 1px 3px rgba(0,0,0,0.04)',
        border: '1px solid rgba(0,0,0,0.06)',
        transform: 'translateZ(0)',
      }}
    >
      <img
        src={tile.src}
        alt={t(tile.cat)}
        loading="lazy"
        decoding="async"
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.05]"
      />

      {/* Bottom gradient — softer at top, deeper at bottom for caption legibility */}
      <div
        className="absolute inset-x-0 bottom-0 pointer-events-none"
        style={{
          height: tile.showCap ? '55%' : '38%',
          background:
            'linear-gradient(to top, rgba(0,0,0,0.78) 0%, rgba(0,0,0,0.25) 60%, transparent 100%)',
        }}
      />

      {/* Top-left: index + accent dot */}
      <div className="absolute top-3.5 left-3.5 z-10 flex items-center gap-2">
        <span
          className="w-1.5 h-1.5 rounded-full"
          style={{ background: tile.accent, boxShadow: `0 0 0 3px ${tile.accent}33` }}
        />
        <span className="font-sans text-[9px] uppercase tracking-[0.28em] font-bold text-white/85">
          {tile.n}
        </span>
      </div>

      {/* Bottom-left: category + (optional) caption */}
      <figcaption className="absolute left-4 right-4 bottom-4 z-10 text-white">
        <div className="flex items-center gap-2 mb-1">
          <div
            className="h-[1px] w-5"
            style={{ background: tile.accent, opacity: 0.9 }}
          />
          <span className="font-sans text-[10px] uppercase tracking-[0.28em] font-bold text-white/95">
            {t(tile.cat)}
          </span>
        </div>
        {tile.showCap && (
          <p className="font-serif italic text-[15px] sm:text-[16px] leading-tight text-white max-w-[34ch]">
            {t(tile.cap)}
          </p>
        )}
      </figcaption>
    </figure>
  )
}

function QuoteTile({ tile, t }) {
  return (
    <div
      className={`g-tile relative overflow-hidden rounded-2xl flex flex-col justify-between p-6 md:p-7 ${tile.span || ''} aspect-square md:aspect-auto col-span-2`}
      style={{
        background:
          'linear-gradient(135deg, #1a1a2e 0%, #001b3e 55%, #002D62 100%)',
        border: '1px solid rgba(255,255,255,0.06)',
        boxShadow: '0 8px 32px rgba(0,0,0,0.18), inset 0 0 80px rgba(206,17,38,0.05)',
      }}
    >
      {/* Subtle radial accent in corner */}
      <div
        className="absolute -top-12 -right-12 w-48 h-48 pointer-events-none"
        style={{
          background:
            'radial-gradient(circle, rgba(206,17,38,0.18) 0%, transparent 70%)',
        }}
      />

      {/* Decorative quote mark */}
      <div
        className="font-serif text-[120px] leading-none text-white/[0.07] -mt-2 -mb-4 select-none pointer-events-none"
        aria-hidden="true"
      >
        &ldquo;
      </div>

      <blockquote className="relative z-10">
        <p className="font-serif italic text-[clamp(1.05rem,1.6vw,1.4rem)] leading-[1.4] text-white/95 max-w-[34ch]">
          {t('gallery.quote')}
        </p>
      </blockquote>

      <div className="relative z-10 flex items-center gap-2 mt-4">
        <div className="h-[1px] w-6 bg-dominican-red" />
        <span className="font-sans text-[10px] uppercase tracking-[0.28em] font-semibold text-white/70">
          {t('gallery.quoteAttr')}
        </span>
      </div>
    </div>
  )
}

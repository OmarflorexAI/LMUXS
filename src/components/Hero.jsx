import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { SlideArrowButton } from './ui/SlideArrowButton'
import { MeshGradient } from '@paper-design/shaders-react'

export default function Hero() {
  const containerRef = useRef(null)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 768px)')
    setIsMobile(mq.matches)
    const handler = (e) => setIsMobile(e.matches)
    mq.addEventListener('change', handler)
    return () => mq.removeEventListener('change', handler)
  }, [])

  useEffect(() => {
    const ctx = gsap.context(() => {
      const dur = isMobile ? 0.7 : 1.1
      const tl = gsap.timeline({ defaults: { ease: 'power4.out' } })

      tl.fromTo('.h-line1',     { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: dur }, 0.3)
        .fromTo('.h-line2',     { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: dur }, '-=0.55')
        .fromTo('.h-sub',       { y: 16, opacity: 0 }, { y: 0, opacity: 1, duration: dur * 0.75 }, '-=0.45')
        .fromTo('.h-btns',      { y: 12, opacity: 0 }, { y: 0, opacity: 1, duration: dur * 0.6 }, '-=0.35')
    }, containerRef)
    return () => ctx.revert()
  }, [isMobile])

  return (
    <section
      ref={containerRef}
      id="inicio"
      className="relative flex flex-col justify-center min-h-[100svh] pt-24 pb-20 md:pt-32 md:pb-36 overflow-x-hidden"
      style={{ backgroundColor: '#E8E4E0' }}
    >
      {/* ── Mesh gradient shader background ── */}
      <div className="absolute inset-0 pointer-events-none hero-orb">
        <MeshGradient
          colors={['#dbdbdb', '#b7c3dc', '#c7c7c7', '#b1434b']}
          distortion={0.7383249990170568}
          swirl={0.2236629188160714}
          scale={1.4651729208193538}
          rotation={41}
          speed={isMobile ? 0.15 : 0.71787265834734}
          grainMixer={0.03}
          grainOverlay={0.03}
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}
        />
      </div>

      {/* Fine grain texture overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          opacity: 0.3,
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.5'/%3E%3C/svg%3E")`,
          backgroundSize: '128px 128px',
          mixBlendMode: 'multiply',
        }}
      />

      {/* Multi-stop fade into white About section */}
      <div
        className="absolute bottom-0 left-0 right-0 pointer-events-none"
        style={{
          height: '40%',
          background: `linear-gradient(to bottom,
            transparent 0%,
            rgba(255,255,255,0.03) 15%,
            rgba(255,255,255,0.1) 30%,
            rgba(255,255,255,0.25) 45%,
            rgba(255,255,255,0.5) 60%,
            rgba(255,255,255,0.75) 75%,
            rgba(255,255,255,0.92) 88%,
            #ffffff 100%
          )`,
        }}
      />

      {/* Hairline divider */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-black/[0.06]" />

      {/* Top accent bar */}
      <div className="absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-dominican-blue via-[#ccc] to-dominican-red" />

      <div className="relative z-10 max-w-6xl mx-auto w-full px-6 md:px-10">
        <div className="max-w-[780px]">

          <h1 className="h-line1 font-serif italic font-normal"
            style={{
              fontSize: 'clamp(2.6rem, 7vw, 6.5rem)',
              lineHeight: 1.05,
              marginBottom: 0,
              color: '#1a1a2e',
            }}>
            Unidos por el juego,
          </h1>
          <h1 className="h-line2 font-sans font-black uppercase tracking-tighter mb-3"
            style={{
              fontSize: 'clamp(2.1rem, 5.8vw, 5.4rem)',
              lineHeight: 0.92,
              marginTop: '-0.06em',
              color: '#1a1a2e',
            }}>
            Unidos para{' '}
            <span style={{ color: '#CE1126' }}>siempre.</span>
          </h1>

          <p className="h-sub font-sans leading-relaxed mb-8"
            style={{
              fontSize: 'clamp(1rem, 2.5vw, 1.2rem)',
              maxWidth: '500px',
              color: '#3a3a4a',
            }}>
            Transformando vidas a traves del deporte en Republica Dominicana. Una vida a la vez.
          </p>

          <div className="h-btns flex flex-col sm:flex-row sm:flex-wrap items-stretch sm:items-center gap-3">
            <SlideArrowButton
              href="https://www.gofundme.com/f/support-los-mina-unidos-x-siempres-impact"
              target="_blank"
              rel="noopener noreferrer"
              text="Donar en GoFundMe"
              className="bg-[#CE1126] text-white tracking-wide w-full sm:w-auto justify-center"
            />
            <SlideArrowButton
              href="https://www.paypal.com/donate/?hosted_button_id=9LZBLNNTUCW34"
              target="_blank"
              rel="noopener noreferrer"
              text="Donar con PayPal"
              className="bg-[#002D62] text-white tracking-wide w-full sm:w-auto justify-center"
            />
          </div>
        </div>
      </div>
    </section>
  )
}

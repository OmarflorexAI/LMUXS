import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ArrowUpRight, Users, Trophy, Clock } from 'lucide-react'
import { motion } from 'motion/react'
import {
  CardCurtainReveal,
  CardCurtainRevealBody,
  CardCurtainRevealDescription,
  CardCurtainRevealFooter,
  CardCurtainRevealTitle,
  CardCurtain,
  useCardCurtainRevealContext,
} from './ui/card-curtain-reveal'

const stats = [
  {
    value: 300, suffix: '+', label: 'Jugadores Formados',
    sub: 'Jovenes que han pasado por nuestros programas de baloncesto, creciendo como atletas y personas.',
    icon: <Users size={18} />, accent: '#CE1126',
    image: '/images/92e0a6fd-43b0-48d7-b330-c8efec53d1eb.jpg',
  },
  {
    value: 18, suffix: '+', label: 'Torneos Ganados',
    sub: 'Campeonatos locales y regionales que demuestran el talento y la disciplina de nuestra comunidad.',
    icon: <Trophy size={18} />, accent: '#002D62',
    image: '/images/de412b4d-9ed7-4096-8eb8-787f6332f666.jpg',
  },
  {
    value: 8, suffix: '+', label: 'Anos de Impacto',
    sub: 'Transformando comunidades desde 2016, construyendo un legado que trasciende generaciones.',
    icon: <Clock size={18} />, accent: '#D4A843',
    image: '/images/bbf481bc-4d55-44e8-9081-e98da354734a.jpg',
  },
]

function CurtainPreview({ icon, label, accent }) {
  const { isMouseIn } = useCardCurtainRevealContext()
  return (
    <motion.div
      className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-4 pointer-events-none"
      animate={{ opacity: isMouseIn ? 0 : 1 }}
      transition={{ duration: 0.25 }}
    >
      <div
        className="w-12 h-12 rounded-xl flex items-center justify-center"
        style={{ background: `${accent}18`, color: accent }}
      >
        {icon}
      </div>
      <span className="font-sans font-bold text-[15px] tracking-tight text-[#1a1a2e]">
        {label}
      </span>
      <div className="w-8 h-[2px] rounded-full" style={{ background: accent, opacity: 0.5 }} />
    </motion.div>
  )
}

function StatCard({ value, suffix, label, sub, icon, accent, image, index }) {
  const numRef = useRef(null)
  const cardRef = useRef(null)

  useEffect(() => {
    const mobile = window.innerWidth < 768
    const ctx = gsap.context(() => {
      gsap.fromTo(cardRef.current, { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: mobile ? 0.6 : 1.1, delay: index * (mobile ? 0.06 : 0.12), ease: 'expo.out',
          scrollTrigger: { trigger: cardRef.current, start: 'top 88%', once: true } })

      const obj = { v: 0 }
      gsap.to(obj, {
        v: value, duration: mobile ? 1.4 : 2.4, ease: 'power2.out',
        scrollTrigger: { trigger: cardRef.current, start: 'top 85%', once: true },
        onUpdate: () => { if (numRef.current) numRef.current.textContent = Math.round(obj.v) + suffix },
      })
    })
    return () => ctx.revert()
  }, [value, suffix, index])

  return (
    <div ref={cardRef} style={{ opacity: 0 }}>
      <CardCurtainReveal
        className="h-[380px] sm:h-[440px] md:h-[480px] rounded-2xl text-[#1a1a2e] bg-white"
        style={{
          border: '1px solid rgba(0,0,0,0.08)',
          boxShadow: '0 8px 40px rgba(0,0,0,0.12), 0 2px 8px rgba(0,0,0,0.06)',
        }}
      >
        <CardCurtainRevealBody className="flex flex-col justify-between p-7 sm:p-8">
          <div>
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center mb-6"
              style={{ background: `${accent}15`, color: accent }}
            >
              {icon}
            </div>
            <div
              ref={numRef}
              className="font-serif font-semibold text-[clamp(3.2rem,6vw,4.5rem)] leading-none text-[#1a1a2e] tabular-nums"
            >
              0{suffix}
            </div>
          </div>

          <CardCurtainRevealTitle className="text-lg sm:text-xl font-sans font-bold tracking-tight text-[#1a1a1a] mt-auto">
            {label}
          </CardCurtainRevealTitle>

          <CardCurtainRevealDescription className="mt-3">
            <p className="font-sans text-[13px] leading-relaxed text-[#333]">
              {sub}
            </p>
          </CardCurtainRevealDescription>

          <div className="mt-4 w-8 h-8 rounded-full flex items-center justify-center"
            style={{ background: `${accent}15`, color: accent }}>
            <ArrowUpRight size={14} />
          </div>

          <CardCurtain
            inverted
            className="bg-white"
            style={{ mixBlendMode: 'normal' }}
          />
          <CurtainPreview icon={icon} label={label} accent={accent} />

          {/* Accent top bar */}
          <div className="absolute top-0 left-0 right-0 h-[3px] rounded-t-2xl z-20"
            style={{ background: accent }} />
        </CardCurtainRevealBody>

        <CardCurtainRevealFooter className="mt-auto">
          <div className="relative h-48 overflow-hidden">
            <img src={image} alt={label} className="w-full h-full object-cover" loading="lazy" />
            <div className="absolute inset-0 bg-gradient-to-t from-white/50 via-transparent to-transparent" />
          </div>
        </CardCurtainRevealFooter>
      </CardCurtainReveal>
    </div>
  )
}

function Particles() {
  const containerRef = useRef(null)
  const [count, setCount] = useState(0)

  useEffect(() => {
    setCount(window.innerWidth < 768 ? 0 : 10)
  }, [])

  useEffect(() => {
    if (count === 0) return
    const ctx = gsap.context(() => {
      gsap.utils.toArray('.stat-particle').forEach((p) => {
        gsap.to(p, { y: `random(-25, 25)`, x: `random(-12, 12)`, duration: `random(3, 5)`,
          repeat: -1, yoyo: true, ease: 'sine.inOut', delay: `random(0, 2)` })
      })
    }, containerRef)
    return () => ctx.revert()
  }, [count])

  if (count === 0) return null

  return (
    <div ref={containerRef} className="absolute inset-0 overflow-hidden pointer-events-none">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="stat-particle absolute w-1 h-1 rounded-full"
          style={{
            background: i % 3 === 0 ? '#CE1126' : i % 3 === 1 ? '#002D62' : '#D4A843',
            opacity: 0.15 + Math.random() * 0.15,
            left: `${10 + Math.random() * 80}%`, top: `${10 + Math.random() * 80}%`,
          }} />
      ))}
    </div>
  )
}

export default function Stats() {
  return (
    <section id="impacto" className="relative bg-[#E8E8EC] overflow-hidden scroll-mt-[88px] py-20 md:py-28">
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-black/[0.05] to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-black/[0.05] to-transparent" />

      <Particles />

      <div className="max-w-6xl mx-auto px-6 md:px-10 relative z-10">
        <div className="text-center mb-12 md:mb-16">
          <div className="inline-flex items-center gap-3 mb-6">
            <div className="w-6 h-[1px] bg-dominican-red" />
            <span className="font-sans text-[11px] uppercase tracking-[0.35em] text-dominican-red font-semibold">
              Nuestro Impacto
            </span>
            <div className="w-6 h-[1px] bg-dominican-red" />
          </div>
          <h3 className="font-serif italic text-[#555] text-lg md:text-xl">
            "Cada punto anotado es un futuro construido."
          </h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-6">
          {stats.map((s, i) => (
            <StatCard key={s.label} {...s} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}

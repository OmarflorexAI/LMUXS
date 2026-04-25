import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import {
  Heart, Shirt, Dumbbell, MapPin,
  GraduationCap, Apple, Bus, Users,
} from 'lucide-react'
import { cn } from '../lib/utils'
import { SlideArrowButton } from './ui/SlideArrowButton'
import { HoverBorderGradient } from './ui/HoverBorderGradient'

gsap.registerPlugin(ScrollTrigger)

const impacts = [
  { icon: <Dumbbell />, title: 'Entrenamiento deportivo', desc: 'Materiales, balones y coaching profesional para formar atletas con disciplina.' },
  { icon: <Shirt />, title: 'Uniformes y equipos', desc: 'Un uniforme oficial para que cada joven represente su comunidad con orgullo.' },
  { icon: <MapPin />, title: 'Acceso a canchas', desc: 'Alquiler de canchas para practicas semanales y torneos organizados.' },
  { icon: <Users />, title: 'Torneos comunitarios', desc: 'Organizamos competencias que unen barrios y fortalecen lazos entre familias.' },
  { icon: <GraduationCap />, title: 'Apoyo educativo', desc: 'Tutorias y becas para que el deporte sea un puente hacia la educacion.' },
  { icon: <Apple />, title: 'Nutricion y bienestar', desc: 'Programas de alimentacion saludable para los jovenes atletas en desarrollo.' },
  { icon: <Bus />, title: 'Transporte seguro', desc: 'Traslado seguro a juegos y entrenamientos para jugadores de toda la zona.' },
  { icon: <Heart />, title: 'Construir comunidad', desc: 'Cada donacion fortalece el tejido social de Los Mina a traves del deporte.' },
]

function ImpactCard({ icon, title, desc, index }) {
  const isTopRow = index < 4
  return (
    <div
      className={cn(
        'flex flex-col py-8 md:py-10 relative group/feature bg-white',
        // Borders
        'lg:border-r border-[#e0e0e5]',
        (index === 0 || index === 4) && 'lg:border-l border-[#e0e0e5]',
        index < 4 && 'lg:border-b border-[#e0e0e5]',
        index < 6 && 'max-lg:border-b border-[#e0e0e5]',
        index % 2 === 0 && 'md:border-r border-[#e0e0e5]'
      )}
      style={{
        boxShadow: isTopRow
          ? '0 4px 12px rgba(0,0,0,0.04)'   /* shadow on bottom for top cards */
          : '0 -4px 12px rgba(0,0,0,0.04)',  /* shadow on top for bottom cards */
      }}
    >
      {/* Hover gradient */}
      {isTopRow && (
        <div className="opacity-0 group-hover/feature:opacity-100 transition duration-300 absolute inset-0 h-full w-full bg-gradient-to-t from-dominican-red/[0.05] to-transparent pointer-events-none" />
      )}
      {!isTopRow && (
        <div className="opacity-0 group-hover/feature:opacity-100 transition duration-300 absolute inset-0 h-full w-full bg-gradient-to-b from-dominican-red/[0.05] to-transparent pointer-events-none" />
      )}

      <div className="mb-4 relative z-10 px-6 lg:px-8 text-[#555]">
        <span className="[&>svg]:w-5 [&>svg]:h-5">{icon}</span>
      </div>
      <div className="text-[15px] font-sans font-bold mb-2 relative z-10 px-6 lg:px-8">
        <div className="absolute left-0 inset-y-0 h-6 group-hover/feature:h-8 w-1 rounded-tr-full rounded-br-full bg-[#ddd] group-hover/feature:bg-dominican-red transition-all duration-300 origin-center" />
        <span className="group-hover/feature:translate-x-2 transition duration-300 inline-block text-[#1a1a1a]">
          {title}
        </span>
      </div>
      <p className="font-sans text-[13px] text-[#444] max-w-xs relative z-10 px-6 lg:px-8 leading-relaxed">
        {desc}
      </p>
    </div>
  )
}

export default function Donate({ onOpenVolunteer }) {
  const sectionRef = useRef(null)

  useEffect(() => {
    const mobile = window.innerWidth < 768
    const ctx = gsap.context(() => {
      gsap.fromTo('.donate-header', { y: 25, opacity: 0 },
        { y: 0, opacity: 1, duration: mobile ? 0.6 : 1.1, ease: 'power4.out',
          scrollTrigger: { trigger: '.donate-header', start: 'top 82%' } })
      gsap.fromTo('.impact-grid', { y: 25, opacity: 0 },
        { y: 0, opacity: 1, duration: mobile ? 0.6 : 1, ease: 'expo.out',
          scrollTrigger: { trigger: '.impact-grid', start: 'top 85%' } })
      gsap.fromTo('.donate-cta', { y: 15, opacity: 0 },
        { y: 0, opacity: 1, duration: mobile ? 0.5 : 0.9, ease: 'power4.out',
          scrollTrigger: { trigger: '.donate-cta', start: 'top 90%' } })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} id="donar" className="relative bg-[#F5F5F7] py-24 md:py-40 overflow-hidden scroll-mt-[88px]">
      {/* Faint team photo bg */}
      <div className="absolute inset-0 pointer-events-none">
        <img src="/images/5404f636-925e-4f7d-a6f8-994030b66d26.jpg" alt=""
          className="w-full h-full object-cover object-center"
          style={{ opacity: 0.035, filter: 'grayscale(100%)' }} />
        <div className="absolute inset-0 bg-[#F5F5F7]/60" />
      </div>

      <div className="absolute top-0 inset-x-0 h-[1px]"
        style={{ background: 'linear-gradient(to right, transparent, rgba(0,0,0,0.08), transparent)' }} />

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-10">

        <div className="donate-header max-w-2xl mx-auto text-center mb-12 md:mb-20">
          <div className="inline-flex items-center gap-2.5 mb-8">
            <div className="w-6 h-[1px] bg-dominican-red" />
            <span className="font-sans text-[11px] uppercase tracking-[0.35em] font-semibold text-dominican-red">
              Haz la diferencia
            </span>
            <div className="w-6 h-[1px] bg-dominican-red" />
          </div>

          <h2 className="font-serif italic leading-[0.95] text-[#1a1a2e] mb-6"
            style={{ fontSize: 'clamp(2.6rem,5.5vw,4.8rem)' }}>
            Tu donacion<br />
            <span className="font-sans not-italic font-black tracking-tight"
              style={{ fontSize: 'clamp(2rem,4.5vw,3.8rem)', color: '#CE1126' }}>
              cambia vidas.
            </span>
          </h2>

          <p className="font-sans text-[15px] leading-relaxed mx-auto max-w-lg text-[#333]">
            Cada dolar va directamente a los jovenes de Los Mina. Sin intermediarios. Solo impacto real, medible y duradero.
          </p>
        </div>

        {/* Impact cards with directional shadows + borders */}
        <div
          className="impact-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 relative z-10 mb-20 rounded-2xl overflow-hidden"
          style={{
            border: '1px solid #e0e0e5',
            boxShadow: '0 8px 32px rgba(0,0,0,0.06)',
          }}
        >
          {impacts.map((item, i) => (
            <ImpactCard key={item.title} {...item} index={i} />
          ))}
        </div>

        <div className="donate-cta flex flex-col items-center text-center gap-8">
          <div className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto">
            <SlideArrowButton
              href="https://www.gofundme.com/f/support-los-mina-unidos-x-siempres-impact"
              target="_blank"
              rel="noopener noreferrer"
              text="Donar en GoFundMe"
              className="bg-[#CE1126] text-white text-[15px] tracking-wide w-full sm:w-auto justify-center"
            />
            <SlideArrowButton
              href="https://www.paypal.com/donate/?hosted_button_id=9LZBLNNTUCW34"
              target="_blank"
              rel="noopener noreferrer"
              text="Donar con PayPal"
              className="bg-[#002D62] text-white text-[15px] tracking-wide w-full sm:w-auto justify-center"
            />
            <HoverBorderGradient
              as="button"
              onClick={onOpenVolunteer}
              containerClassName="w-full sm:w-auto h-12"
              className="font-sans font-bold text-[14px] tracking-wide px-7 h-full flex items-center"
            >
              Sé Voluntario
            </HoverBorderGradient>
          </div>
        </div>
      </div>
    </section>
  )
}

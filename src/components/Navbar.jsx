import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { motion } from 'motion/react'
import { Menu, X, Users, Trophy, Image, Mail } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

const links = [
  { label: 'Nosotros', href: '#nosotros', icon: Users },
  { label: 'Impacto', href: '#impacto', icon: Trophy },
  { label: 'Galeria', href: '#galeria', icon: Image },
  { label: 'Contacto', href: '#contacto', icon: Mail },
]

export default function Navbar() {
  const pillRef = useRef(null)
  const [menuOpen, setMenuOpen] = useState(false)
  const [activeTab, setActiveTab] = useState(null)

  useEffect(() => {
    const el = pillRef.current
    if (!el) return

    // Start hidden
    gsap.set(el, { y: -40, opacity: 0 })

    let isScrollingProgrammatically = false
    let scrollTimeout = null

    // Listen for programmatic scrolls (from anchor clicks)
    const handleScrollStart = () => {
      if (window.scrollY > 200) {
        isScrollingProgrammatically = true
        clearTimeout(scrollTimeout)
        scrollTimeout = setTimeout(() => {
          isScrollingProgrammatically = false
        }, 1200)
      }
    }
    window.addEventListener('click', (e) => {
      const anchor = e.target.closest('a[href^="#"]')
      if (anchor) handleScrollStart()
    })

    const ctx = gsap.context(() => {
      // Reveal navbar on first scroll
      ScrollTrigger.create({
        trigger: document.body,
        start: 'top -30px',
        onEnter: () => {
          gsap.to(el, {
            y: 0, opacity: 1, duration: 0.9, ease: 'power4.out',
          })
        },
        onLeaveBack: () => {
          if (isScrollingProgrammatically) return
          gsap.to(el, {
            y: -40, opacity: 0, duration: 0.5, ease: 'power2.inOut',
          })
        },
      })

      // Glass effect intensifies after more scroll
      ScrollTrigger.create({
        trigger: document.body,
        start: 'top -120px',
        onEnter: () => {
          gsap.to(el, {
            backgroundColor: 'rgba(255, 255, 255, 0.97)',
            borderColor: 'rgba(0,0,0,0.08)',
            boxShadow: '0 1px 2px rgba(0,0,0,0.06), 0 4px 16px rgba(0,0,0,0.06), 0 12px 40px rgba(0,0,0,0.04)',
            duration: 0.5,
            ease: 'power2.inOut',
          })
        },
        onLeaveBack: () => {
          gsap.to(el, {
            backgroundColor: 'rgba(255, 255, 255, 0.7)',
            borderColor: 'rgba(0,0,0,0.05)',
            boxShadow: '0 1px 3px rgba(0,0,0,0.04), 0 4px 12px rgba(0,0,0,0.02)',
            duration: 0.5,
            ease: 'power2.inOut',
          })
        },
      })
    })
    return () => ctx.revert()
  }, [])

  // Scroll-based active section detection
  useEffect(() => {
    const sectionIds = ['nosotros', 'impacto', 'galeria', 'contacto']
    const observers = []

    sectionIds.forEach((id) => {
      const el = document.getElementById(id)
      if (!el) return
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActiveTab(`#${id}`)
        },
        { rootMargin: '-40% 0px -40% 0px', threshold: 0 }
      )
      observer.observe(el)
      observers.push(observer)
    })

    return () => observers.forEach((o) => o.disconnect())
  }, [])

  return (
    <header className="fixed top-0 left-0 right-0 z-50 px-4 pt-3">
      <div
        ref={pillRef}
        className="max-w-3xl mx-auto flex items-center justify-between px-2.5 py-1 rounded-full border"
        style={{
          backgroundColor: 'rgba(255,255,255,0.7)',
          backdropFilter: 'blur(20px) saturate(1.4)',
          WebkitBackdropFilter: 'blur(20px) saturate(1.4)',
          borderColor: 'rgba(0,0,0,0.05)',
          boxShadow: '0 1px 3px rgba(0,0,0,0.04), 0 4px 12px rgba(0,0,0,0.02)',
        }}
      >
        <a href="#inicio" className="flex items-center gap-2 pl-1 flex-shrink-0 group"
          onClick={(e) => { e.preventDefault(); setActiveTab(null); window.scrollTo({ top: 0, behavior: 'smooth' }) }}>
          <img
            src="/logo.png"
            alt="LMUXS"
            className="h-9 w-auto transition-transform duration-300 group-hover:scale-105"
          />
          <div className="hidden sm:flex flex-col leading-none gap-0.5">
            <span className="font-sans font-black text-[#1a1a2e] text-[11px] tracking-[0.2em] uppercase leading-none">
              LMUXS
            </span>
            <span className="font-sans text-[#777] text-[8px] tracking-[0.12em] uppercase leading-none">
              Los Mina Unidos
            </span>
          </div>
        </a>

        <nav className="hidden md:flex items-center gap-0.5">
          {links.map((link) => {
            const isActive = activeTab === link.href
            return (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault()
                  setActiveTab(link.href)
                  const target = document.querySelector(link.href)
                  if (target) {
                    const offset = 88
                    const top = target.getBoundingClientRect().top + window.scrollY - offset
                    window.scrollTo({ top, behavior: 'smooth' })
                  }
                }}
                className="relative font-sans text-[11px] font-medium px-3 py-1.5 rounded-full transition-colors duration-200 tracking-wide cursor-pointer"
                style={{ color: isActive ? '#CE1126' : '#444' }}
              >
                <span className="relative z-10">{link.label}</span>
                {isActive && (
                  <motion.div
                    layoutId="lamp"
                    className="absolute inset-0 rounded-full -z-0"
                    style={{ background: 'rgba(206,17,38,0.06)' }}
                    initial={false}
                    transition={{
                      type: 'spring',
                      stiffness: 400,
                      damping: 40,
                      mass: 0.8,
                    }}
                  >
                    <div className="absolute -bottom-0.5 left-1/2 -translate-x-1/2 w-6 h-[2px] rounded-b-full"
                      style={{ background: '#CE1126' }} />
                  </motion.div>
                )}
              </a>
            )
          })}
        </nav>

        <div className="flex items-center gap-1.5 pr-0.5">
          <a
            href="https://www.gofundme.com/f/support-los-mina-unidos-x-siempres-impact"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:inline-flex items-center bg-dominican-red text-white font-sans font-semibold text-[10px] px-3.5 py-1.5 rounded-full"
            style={{ transition: 'transform 0.2s ease, box-shadow 0.2s ease, background-color 0.2s ease' }}
            onMouseEnter={e => {
              e.currentTarget.style.transform = 'scale(1.04)'
              e.currentTarget.style.boxShadow = '0 4px 16px rgba(206,17,38,0.3)'
              e.currentTarget.style.backgroundColor = '#a80e1e'
            }}
            onMouseLeave={e => {
              e.currentTarget.style.transform = 'scale(1)'
              e.currentTarget.style.boxShadow = 'none'
              e.currentTarget.style.backgroundColor = '#CE1126'
            }}
          >
            Donar
          </a>

          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden w-7 h-7 flex items-center justify-center rounded-full text-[#1a1a2e] transition-colors duration-200"
            style={{ background: 'rgba(0,0,0,0.05)' }}
            aria-label="Menu"
          >
            {menuOpen ? <X size={14} strokeWidth={2} /> : <Menu size={14} strokeWidth={2} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        style={{
          maxHeight: menuOpen ? '320px' : '0px',
          opacity: menuOpen ? 1 : 0,
          overflow: 'hidden',
          transition: 'max-height 0.35s ease, opacity 0.25s ease',
        }}
      >
        <div
          className="max-w-3xl mx-auto mt-2 rounded-2xl px-5 py-5 border"
          style={{
            background: 'rgba(255,255,255,0.97)',
            backdropFilter: 'blur(24px) saturate(1.4)',
            WebkitBackdropFilter: 'blur(24px) saturate(1.4)',
            borderColor: 'rgba(0,0,0,0.07)',
            boxShadow: '0 4px 24px rgba(0,0,0,0.08), 0 1px 3px rgba(0,0,0,0.04)',
          }}
        >
          <nav className="flex flex-col gap-0.5 mb-4">
            {links.map((link) => {
              const Icon = link.icon
              const isActive = activeTab === link.href
              return (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => {
                    e.preventDefault()
                    setActiveTab(link.href)
                    setMenuOpen(false)
                    const target = document.querySelector(link.href)
                    if (target) {
                      const offset = 88
                      const top = target.getBoundingClientRect().top + window.scrollY - offset
                      window.scrollTo({ top, behavior: 'smooth' })
                    }
                  }}
                  className="font-sans text-[14px] py-3 px-4 rounded-xl transition-colors duration-200 flex items-center gap-3"
                  style={{
                    color: isActive ? '#CE1126' : '#333',
                    background: isActive ? 'rgba(206,17,38,0.05)' : 'transparent',
                  }}
                >
                  <Icon size={16} strokeWidth={2} />
                  {link.label}
                </a>
              )
            })}
          </nav>
          <a
            href="https://www.gofundme.com/f/support-los-mina-unidos-x-siempres-impact"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setMenuOpen(false)}
            className="block w-full text-center bg-dominican-red text-white font-sans font-bold text-[14px] py-3 rounded-full"
          >
            Donar Ahora
          </a>
        </div>
      </div>
    </header>
  )
}

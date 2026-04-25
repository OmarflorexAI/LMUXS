import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { motion, LayoutGroup } from 'motion/react'
import { Menu, X, Users, Trophy, Image, Mail } from 'lucide-react'

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

    const isMobile = window.innerWidth < 768

    if (isMobile) {
      // Always visible on mobile — scroll-reveal is a desktop pattern
      gsap.set(el, { y: 0, opacity: 1 })
      return
    }

    // Desktop: scroll-based reveal
    gsap.set(el, { y: -40, opacity: 0 })

    let rafId = null
    let prevVisible = false
    let prevDense = false

    const update = () => {
      const y = window.scrollY
      const visible = y > 30
      const dense = y > 120

      if (visible === prevVisible && dense === prevDense) return
      prevVisible = visible
      prevDense = dense

      gsap.to(el, {
        y: visible ? 0 : -40,
        opacity: visible ? 1 : 0,
        backgroundColor: dense ? 'rgba(255,255,255,0.97)' : 'rgba(255,255,255,0.7)',
        borderColor: dense ? 'rgba(0,0,0,0.08)' : 'rgba(0,0,0,0.05)',
        boxShadow: dense
          ? '0 1px 2px rgba(0,0,0,0.06), 0 4px 16px rgba(0,0,0,0.06), 0 12px 40px rgba(0,0,0,0.04)'
          : '0 1px 3px rgba(0,0,0,0.04), 0 4px 12px rgba(0,0,0,0.02)',
        duration: 0.55,
        ease: 'power3.out',
        overwrite: true,
      })
    }

    const onScroll = () => {
      if (rafId) cancelAnimationFrame(rafId)
      rafId = requestAnimationFrame(update)
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', onScroll)
      if (rafId) cancelAnimationFrame(rafId)
    }
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
        className="max-w-3xl mx-auto grid grid-cols-[1fr_auto_1fr] items-center px-2.5 py-1 rounded-full border"
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

        <LayoutGroup>
        <motion.nav layoutRoot className="hidden md:flex items-center gap-0.5">
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
                className={`relative font-sans text-[11px] font-medium px-3 py-1.5 rounded-full transition-colors duration-200 tracking-wide cursor-pointer ${
                  isActive
                    ? 'text-[#CE1126]'
                    : 'text-[#444] hover:text-[#1a1a2e] hover:bg-black/[0.05]'
                }`}
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
        </motion.nav>
        </LayoutGroup>

        <div className="flex items-center justify-end pr-0.5">
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
          <nav className="flex flex-col gap-0.5">
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
        </div>
      </div>
    </header>
  )
}

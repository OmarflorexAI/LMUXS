import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { motion, LayoutGroup, AnimatePresence } from 'motion/react'
import { Menu, X, Users, Trophy, Image, Mail } from 'lucide-react'
import { useT } from '../i18n'
import LanguageSwitcher from './LanguageSwitcher'

const linksConfig = [
  { key: 'nav.about', href: '#nosotros', icon: Users },
  { key: 'nav.impact', href: '#impacto', icon: Trophy },
  { key: 'nav.gallery', href: '#galeria', icon: Image },
  { key: 'nav.contact', href: '#contacto', icon: Mail },
]

export default function Navbar() {
  const pillRef = useRef(null)
  const [menuOpen, setMenuOpen] = useState(false)
  const [langOpen, setLangOpen] = useState(false)
  const [activeTab, setActiveTab] = useState(null)
  const { t } = useT()
  const links = linksConfig.map((l) => ({ ...l, label: t(l.key) }))

  useEffect(() => {
    const el = pillRef.current
    if (!el) return

    const isMobile = window.innerWidth < 768

    if (isMobile) {
      gsap.set(el, { y: 0, opacity: 1 })
      return
    }

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
    <header className="fixed top-0 left-0 right-0 z-50 px-4 pt-3 flex justify-center">
      <div
        ref={pillRef}
        className="inline-flex items-center gap-1 px-2 py-1 rounded-full border"
        style={{
          backgroundColor: 'rgba(255,255,255,0.7)',
          backdropFilter: 'blur(20px) saturate(1.4)',
          WebkitBackdropFilter: 'blur(20px) saturate(1.4)',
          borderColor: 'rgba(0,0,0,0.05)',
          boxShadow: '0 1px 3px rgba(0,0,0,0.04), 0 4px 12px rgba(0,0,0,0.02)',
        }}
      >
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
                        type: 'tween',
                        ease: [0.22, 1, 0.36, 1],
                        duration: 0.3,
                      }}
                    >
                      <div
                        className="absolute -bottom-0.5 left-1/2 -translate-x-1/2 w-6 h-[2px] rounded-b-full"
                        style={{ background: '#CE1126' }}
                      />
                    </motion.div>
                  )}
                </a>
              )
            })}
          </motion.nav>
        </LayoutGroup>

        {/* Vertical divider between nav and lang on desktop */}
        <div className="hidden md:block w-px h-4 bg-black/[0.08] mx-1" />

        <LanguageSwitcher
          open={langOpen}
          onOpenChange={(v) => {
            setLangOpen(v)
            if (v) setMenuOpen(false)
          }}
        />

        <button
          onClick={() => {
            const nextMenu = !menuOpen
            setMenuOpen(nextMenu)
            if (nextMenu) setLangOpen(false)
          }}
          className="md:hidden w-7 h-7 flex items-center justify-center rounded-full text-[#1a1a2e] transition-colors duration-200"
          style={{ background: 'rgba(0,0,0,0.05)' }}
          aria-label="Menu"
        >
          {menuOpen ? <X size={14} strokeWidth={2} /> : <Menu size={14} strokeWidth={2} />}
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="absolute top-full left-1/2 -translate-x-1/2 mt-2 z-40 w-[88vw] max-w-[280px] rounded-2xl px-3 py-3 border md:hidden"
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
                    className="font-sans text-[14px] py-2.5 px-3 rounded-xl transition-colors duration-200 flex items-center gap-3"
                    style={{
                      color: isActive ? '#CE1126' : '#333',
                      background: isActive ? 'rgba(206,17,38,0.05)' : 'transparent',
                    }}
                  >
                    <Icon size={15} strokeWidth={2} />
                    {link.label}
                  </a>
                )
              })}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}

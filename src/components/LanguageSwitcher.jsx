import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { Globe, Check } from 'lucide-react'
import { LANGUAGES, useT } from '../i18n'

export default function LanguageSwitcher({ compact = false, open: controlledOpen, onOpenChange }) {
  const { lang, setLang, t } = useT()
  const [uncontrolledOpen, setUncontrolledOpen] = useState(false)
  const isControlled = controlledOpen !== undefined
  const open = isControlled ? controlledOpen : uncontrolledOpen
  const setOpen = (value) => {
    const next = typeof value === 'function' ? value(open) : value
    if (!isControlled) setUncontrolledOpen(next)
    onOpenChange?.(next)
  }
  const wrapperRef = useRef(null)

  useEffect(() => {
    if (!open) return
    const handleClick = (e) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target)) setOpen(false)
    }
    const handleKey = (e) => {
      if (e.key === 'Escape') setOpen(false)
    }
    document.addEventListener('mousedown', handleClick)
    document.addEventListener('keydown', handleKey)
    return () => {
      document.removeEventListener('mousedown', handleClick)
      document.removeEventListener('keydown', handleKey)
    }
  }, [open])

  const current = LANGUAGES.find((l) => l.code === lang) || LANGUAGES[0]

  return (
    <div ref={wrapperRef} className="relative">
      <button
        type="button"
        onClick={() => setOpen((p) => !p)}
        aria-label={t('lang.title')}
        aria-expanded={open}
        aria-haspopup="listbox"
        className={`relative flex items-center gap-1.5 rounded-full font-sans font-medium transition-colors duration-200 cursor-pointer ${
          compact
            ? 'px-2 h-7 text-[10px] text-[#444] hover:bg-black/[0.05]'
            : 'px-2.5 h-7 text-[11px] text-[#444] hover:bg-black/[0.05] hover:text-[#1a1a2e]'
        }`}
      >
        <Globe size={13} strokeWidth={2} className="text-[#666]" />
        <span className="uppercase tracking-wider font-semibold">{current.code}</span>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            role="listbox"
            initial={{ opacity: 0, y: -6, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.96 }}
            transition={{ type: 'spring', stiffness: 500, damping: 32, mass: 0.7 }}
            className="absolute right-0 top-full mt-2 z-50 min-w-[180px] rounded-2xl overflow-hidden py-1.5"
            style={{
              background: 'rgba(255,255,255,0.97)',
              backdropFilter: 'blur(20px) saturate(1.4)',
              WebkitBackdropFilter: 'blur(20px) saturate(1.4)',
              border: '1px solid rgba(0,0,0,0.06)',
              boxShadow: '0 12px 40px rgba(0,0,0,0.10), 0 4px 12px rgba(0,0,0,0.05)',
            }}
          >
            <div className="px-4 py-2 mb-0.5">
              <div className="flex items-center gap-2">
                <Globe size={11} className="text-[#999]" />
                <span className="font-sans text-[9px] uppercase tracking-[0.22em] font-semibold text-[#999]">
                  {t('lang.title')}
                </span>
              </div>
            </div>
            <div className="px-1 pb-1">
              {LANGUAGES.map((l, i) => {
                const selected = lang === l.code
                return (
                  <motion.button
                    key={l.code}
                    type="button"
                    role="option"
                    aria-selected={selected}
                    onClick={() => {
                      setLang(l.code)
                      setOpen(false)
                    }}
                    initial={{ opacity: 0, x: -4 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.18, delay: i * 0.025 }}
                    className={`w-full flex items-center justify-between gap-3 px-3 py-2 rounded-lg text-left font-sans text-[13px] transition-colors duration-150 cursor-pointer ${
                      selected
                        ? 'bg-[#CE1126]/[0.06] text-[#CE1126] font-semibold'
                        : 'text-[#1a1a2e] hover:bg-black/[0.04]'
                    }`}
                  >
                    <span className="flex items-center gap-2.5">
                      <span className="text-base leading-none">{l.flag}</span>
                      <span>{l.label}</span>
                    </span>
                    {selected && <Check size={14} strokeWidth={2.5} />}
                  </motion.button>
                )
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

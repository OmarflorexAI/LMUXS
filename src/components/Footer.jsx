import { Instagram, Mail, ArrowUpRight } from 'lucide-react'
import { useT } from '../i18n'

const navConfig = [
  { key: 'nav.about', href: '#nosotros' },
  { key: 'nav.impact', href: '#impacto' },
  { key: 'nav.gallery', href: '#galeria' },
  { key: 'nav.contact', href: 'mailto:losminaunidosporsiempre@gmail.com', external: true },
  { key: 'nav.donate', href: 'https://www.gofundme.com/f/support-los-mina-unidos-x-siempres-impact', external: true },
]

function DominicanFlag() {
  return (
    <svg width="20" height="14" viewBox="0 0 20 14" className="flex-shrink-0" style={{ borderRadius: 2 }}>
      <rect x="0" y="0" width="10" height="7" fill="#002D62" />
      <rect x="10" y="0" width="10" height="7" fill="#CE1126" />
      <rect x="0" y="7" width="10" height="7" fill="#CE1126" />
      <rect x="10" y="7" width="10" height="7" fill="#002D62" />
      <rect x="0" y="5.5" width="20" height="3" fill="white" />
      <rect x="8.5" y="0" width="3" height="14" fill="white" />
      <circle cx="10" cy="7" r="1.8" fill="none" stroke="white" strokeWidth="0.3" opacity="0.6" />
      <rect x="9.6" y="5.8" width="0.8" height="2.4" fill="#006B3F" opacity="0.7" rx="0.2" />
    </svg>
  )
}

export default function Footer() {
  const { t } = useT()
  const navLinks = navConfig.map((l) => ({ ...l, label: t(l.key) }))
  return (
    <footer id="contacto" className="relative bg-[#0C0C1A] overflow-hidden">
      {/* Top accent — three brand colors */}
      <div className="absolute top-0 left-0 right-0 h-[3px]"
        style={{ background: 'linear-gradient(to right, #002D62 0%, #002D62 33%, rgba(255,255,255,0.15) 33%, rgba(255,255,255,0.15) 66%, #CE1126 66%, #CE1126 100%)' }} />


      <div className="max-w-6xl mx-auto px-6 md:px-10 pt-12 md:pt-16 pb-6 md:pb-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-6 pb-8 md:pb-12 border-b border-white/[0.08]">

          <div className="md:col-span-4">
            <a href="#inicio" onClick={(e) => {
              e.preventDefault()
              window.scrollTo({ top: 0, behavior: 'smooth' })
            }} className="flex items-center gap-2.5 mb-6 group w-fit">
              <img
                src="/logo.png"
                alt="LMUXS"
                width="540"
                height="462"
                decoding="async"
                className="h-14 w-auto object-contain transition-transform duration-300 group-hover:scale-[1.04]"
              />
              <div>
                <div className="font-sans font-black text-white text-sm tracking-[0.18em] uppercase">LMUXS</div>
                <div className="font-sans text-white/55 text-[9px] tracking-[0.15em] uppercase">Los Mina Unidos Por Siempre</div>
              </div>
            </a>
            <p className="font-sans text-white/55 text-[12px] leading-relaxed max-w-[260px] mb-6">
              {t('footer.tagline')}
            </p>
            <div className="flex items-center gap-2.5">
              <DominicanFlag />
              <span className="font-sans text-white/70 text-[11px] tracking-wide font-medium">
                {t('footer.country')}
              </span>
            </div>
          </div>

          <div className="md:col-span-3 md:col-start-6">
            <h4 className="font-sans font-semibold text-white/50 text-[10px] uppercase tracking-[0.25em] mb-4">
              {t('footer.navHeading')}
            </h4>
            <ul className="space-y-2.5">
              {navLinks.map((link) => (
                <li key={link.label}>
                  <a href={link.href}
                    {...(link.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                    {...(!link.external ? { onClick: (e) => {
                      e.preventDefault()
                      const target = document.querySelector(link.href)
                      if (target) {
                        const offset = 88
                        const top = target.getBoundingClientRect().top + window.scrollY - offset
                        window.scrollTo({ top, behavior: 'smooth' })
                      }
                    }} : {})}
                    className="group inline-flex items-center gap-1.5 font-sans text-[13px] text-white/60 hover:text-white transition-colors duration-200">
                    <span>{link.label}</span>
                    <ArrowUpRight size={10} className="opacity-0 -translate-y-0.5 translate-x-0.5 group-hover:opacity-100 group-hover:translate-y-0 group-hover:translate-x-0 transition-all duration-200" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-3 md:col-start-10">
            <h4 className="font-sans font-semibold text-white/50 text-[10px] uppercase tracking-[0.25em] mb-4">
              {t('footer.contactHeading')}
            </h4>
            <div className="space-y-3.5">
              <a href="https://www.instagram.com/losminaunidosxsiempre/" target="_blank" rel="noopener noreferrer"
                className="group flex items-center gap-2.5 text-white/60 hover:text-white transition-colors">
                <div className="w-8 h-8 rounded-lg border border-white/[0.12] flex items-center justify-center group-hover:border-[#CE1126]/40 group-hover:bg-[#CE1126]/10 transition-all duration-200 flex-shrink-0">
                  <Instagram size={14} strokeWidth={1.5} />
                </div>
                <span className="font-sans text-[11px]">@losminaunidosxsiempre</span>
              </a>

              <a href="mailto:losminaunidosporsiempre@gmail.com"
                className="group flex items-center gap-2.5 text-white/60 hover:text-white transition-colors">
                <div className="w-8 h-8 rounded-lg border border-white/[0.12] flex items-center justify-center group-hover:border-[#002D62]/40 group-hover:bg-[#002D62]/10 transition-all duration-200 flex-shrink-0">
                  <Mail size={14} strokeWidth={1.5} />
                </div>
                <span className="font-sans text-[11px] break-all">losminaunidosporsiempre@gmail.com</span>
              </a>
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-5 md:pt-6">
          <p className="font-sans text-white/40 text-[11px]">
            {t('footer.copyright')}
          </p>
          <div className="flex items-center gap-1">
            <div className="w-2 h-2 rounded-full bg-[#002D62]" />
            <div className="w-2 h-2 rounded-full bg-white/30" />
            <div className="w-2 h-2 rounded-full bg-[#CE1126]" />
          </div>
        </div>
      </div>
    </footer>
  )
}

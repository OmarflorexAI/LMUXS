import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const cards = [
  { k: 'Fundacion', v: '2016', accent: '#CE1126' },
  { k: 'Sede', v: 'Los Mina, R.D.', accent: '#002D62' },
  { k: 'Tipo', v: 'Non-Profit', accent: '#D4A843' },
]

export default function About() {
  const sectionRef = useRef(null)

  useEffect(() => {
    const mobile = window.innerWidth < 768
    const dur = mobile ? 0.7 : 1.1
    const ctx = gsap.context(() => {
      gsap.fromTo('.about-reveal', { y: 30, opacity: 0 },
        { y: 0, opacity: 1, stagger: 0.06, duration: dur, ease: 'power4.out',
          scrollTrigger: { trigger: '.about-text-col', start: 'top 82%' } })
      gsap.fromTo('.about-photo', { scale: 1.04, opacity: 0 },
        { scale: 1, opacity: 1, stagger: 0.1, duration: mobile ? 0.8 : 1.4, ease: 'expo.out',
          scrollTrigger: { trigger: '.about-photos', start: 'top 82%' } })
      /* Parallax — desktop only (scrub causes jank on mobile) */
      if (!mobile) {
        gsap.to('.about-photo-top', { y: -30, ease: 'none',
          scrollTrigger: { trigger: sectionRef.current, start: 'top bottom', end: 'bottom top', scrub: 2 } })
        gsap.to('.about-photo-bot', { y: 20, ease: 'none',
          scrollTrigger: { trigger: sectionRef.current, start: 'top bottom', end: 'bottom top', scrub: 2.5 } })
      }
      gsap.fromTo('.about-card', { y: 16, opacity: 0 },
        { y: 0, opacity: 1, stagger: 0.06, duration: mobile ? 0.6 : 0.9, ease: 'power4.out',
          scrollTrigger: { trigger: '.about-cards-row', start: 'top 90%' } })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      id="nosotros"
      className="relative bg-white py-24 md:py-40 overflow-hidden scroll-mt-[88px]"
    >
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-black/[0.04] to-transparent" />

      <div className="max-w-6xl mx-auto px-6 md:px-10 grid md:grid-cols-2 gap-12 md:gap-24 items-center">
        <div className="about-text-col order-2 md:order-1">
          <div className="about-reveal flex items-center gap-3 mb-8">
            <div className="w-6 h-[1px] bg-dominican-red" />
            <span className="font-sans text-[11px] uppercase tracking-[0.35em] text-dominican-red font-semibold">
              Nuestra Historia
            </span>
          </div>

          <h2 className="about-reveal font-serif italic text-[clamp(2.4rem,4.5vw,3.8rem)] leading-[1.04] text-[#1a1a2e] mb-8">
            Nacio en las calles<br />
            <em className="not-italic font-sans font-black text-[clamp(2rem,3.8vw,3.2rem)] tracking-tight text-[#2a2a3e]">
              de Los Mina.
            </em>
          </h2>

          <div className="space-y-5">
            <p className="about-reveal font-sans text-[#2a2a2a] text-[15px] leading-[1.75]">
              LMUXS nacio de una idea simple pero poderosa: el baloncesto puede cambiar vidas. En Los Mina, Republica Dominicana, jovenes decidieron que la cancha seria su aula, su refugio y su familia.
            </p>
            <p className="about-reveal font-sans text-[#2a2a2a] text-[15px] leading-[1.75]">
              Hemos formado cientos de atletas, organizado torneos que unen comunidades y demostrado que el deporte es el lenguaje universal de la unidad.
            </p>
            <p className="about-reveal font-sans text-[#555] text-[14px] leading-[1.75] italic">
              "Unidos por el juego, unidos para siempre."
            </p>
          </div>

          <div className="about-reveal about-cards-row flex flex-wrap gap-3 mt-10">
            {cards.map((item) => (
              <div
                key={item.k}
                className="about-card relative overflow-hidden rounded-xl px-5 py-4 group cursor-default bg-white"
                style={{
                  border: '1px solid rgba(0,0,0,0.06)',
                  boxShadow: '0 1px 4px rgba(0,0,0,0.04)',
                }}
              >
                <div
                  className="absolute top-0 left-0 w-[3px] h-full rounded-full"
                  style={{ background: item.accent }}
                />
                <div className="relative z-10 pl-1">
                  <div className="font-sans font-black text-[#1a1a2e] text-lg leading-none mb-1">{item.v}</div>
                  <div className="font-sans text-[10px] uppercase tracking-[0.2em] mt-1.5" style={{ color: item.accent }}>
                    {item.k}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="about-photos order-1 md:order-2 relative h-[320px] sm:h-[420px] md:h-[560px]">
          <div className="about-photo about-photo-top absolute top-0 right-0 w-[72%] h-[75%] rounded-[2rem] overflow-hidden shadow-xl shadow-black/10">
            <img src="/images/de412b4d-9ed7-4096-8eb8-787f6332f666.jpg" alt="Trofeo LMUXS"
              className="w-full h-full object-cover" loading="eager" decoding="async" />
          </div>
          <div className="about-photo about-photo-bot absolute bottom-0 left-0 w-[52%] h-[52%] rounded-[2rem] overflow-hidden border-4 border-white shadow-xl shadow-black/10">
            <img src="/images/ad9f7594-9cdb-4f3d-b60d-2469ddd23e01.jpg" alt="Jugadores con medallas"
              className="w-full h-full object-cover" loading="eager" decoding="async" />
          </div>
          <div className="absolute top-[68%] right-0 -translate-y-1/2 bg-dominican-red text-white rounded-2xl px-4 py-3 text-center z-10 hidden md:block shadow-lg shadow-dominican-red/25">
            <div className="font-sans font-black text-2xl leading-none">8+</div>
            <div className="font-sans text-[10px] uppercase tracking-wider text-white/80 mt-0.5">anos</div>
          </div>
        </div>
      </div>
    </section>
  )
}

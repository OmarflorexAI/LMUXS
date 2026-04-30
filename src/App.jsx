import { useState, useEffect, useRef } from 'react'
import './index.css'
import 'lenis/dist/lenis.css'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Stats from './components/Stats'
import Gallery from './components/Gallery'
import Donate from './components/Donate'
import Footer from './components/Footer'
import VolunteerModal from './components/VolunteerModal'
import { LangProvider } from './i18n'
import Lenis from 'lenis'

gsap.registerPlugin(ScrollTrigger)

gsap.defaults({ ease: 'power3.out' })
ScrollTrigger.defaults({ once: true })
ScrollTrigger.config({ ignoreMobileResize: true })
gsap.config({ force3D: true })

export default function App() {
  const [volunteerOpen, setVolunteerOpen] = useState(false)
  const lenisRef = useRef(null)

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.4,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      smoothTouch: false,
      touchMultiplier: 2,
      wheelMultiplier: 1,
      infinite: false,
      autoResize: true,
    })

    lenisRef.current = lenis

    // Sync Lenis scroll position → GSAP ScrollTrigger
    lenis.on('scroll', ScrollTrigger.update)

    // Drive Lenis from GSAP's unified ticker for perfect sync
    const update = (time) => {
      lenis.raf(time * 1000)
    }
    gsap.ticker.add(update)
    gsap.ticker.lagSmoothing(0)

    return () => {
      gsap.ticker.remove(update)
      lenis.destroy()
      lenisRef.current = null
    }
  }, [])

  return (
    <LangProvider>
      <div className="relative min-h-screen bg-[#F5F5F7]">
        <Navbar lenisRef={lenisRef} />

        <main>
          <Hero />
          <About />
          <Stats />
          <Gallery />
          <Donate onOpenVolunteer={() => setVolunteerOpen(true)} />
        </main>

        <Footer lenisRef={lenisRef} />

        <VolunteerModal
          isOpen={volunteerOpen}
          onClose={() => setVolunteerOpen(false)}
        />
      </div>
    </LangProvider>
  )
}

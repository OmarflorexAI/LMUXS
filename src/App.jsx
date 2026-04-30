import { useState, useEffect } from 'react'
import './index.css'
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

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      direction: 'vertical',
      gestureDirection: 'vertical',
      smooth: true,
      mouseMultiplier: 1,
      smoothTouch: false,
      touchMultiplier: 2,
      infinite: false,
      autoRaf: true,
    })

    lenis.on('scroll', ScrollTrigger.update)

    return () => {
      lenis.destroy()
    }
  }, [])

  return (
    <LangProvider>
      <div className="relative min-h-screen bg-[#F5F5F7]">
        <Navbar />

        <main>
          <Hero />
          <About />
          <Stats />
          <Gallery />
          <Donate onOpenVolunteer={() => setVolunteerOpen(true)} />
        </main>

        <Footer />

        <VolunteerModal
          isOpen={volunteerOpen}
          onClose={() => setVolunteerOpen(false)}
        />
      </div>
    </LangProvider>
  )
}

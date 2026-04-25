import { useState } from 'react'
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

gsap.registerPlugin(ScrollTrigger)

gsap.defaults({ ease: 'power3.out', overwrite: 'auto' })
ScrollTrigger.defaults({ once: true })
gsap.config({ force3D: true })

export default function App() {
  const [volunteerOpen, setVolunteerOpen] = useState(false)

  return (
    <div className="relative min-h-screen bg-[#F5F5F7] overflow-x-hidden">
      {/* Subtle paper texture — hidden on mobile for performance */}
      <svg
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 w-full h-full z-[9999] hidden md:block"
        style={{ mixBlendMode: 'multiply', opacity: 0.025 }}
        xmlns="http://www.w3.org/2000/svg"
      >
        <filter id="noise-filter">
          <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch" />
          <feColorMatrix type="saturate" values="0" />
        </filter>
        <rect width="100%" height="100%" filter="url(#noise-filter)" />
      </svg>

      <Navbar />

      <main>
        <Hero onOpenVolunteer={() => setVolunteerOpen(true)} />
        <About />
        <Stats />
        <Gallery />
        <Donate />
      </main>

      <Footer />

      <VolunteerModal
        isOpen={volunteerOpen}
        onClose={() => setVolunteerOpen(false)}
      />
    </div>
  )
}

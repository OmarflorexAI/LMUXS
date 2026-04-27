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

gsap.defaults({ ease: 'power3.out' })
ScrollTrigger.defaults({ once: true })
gsap.config({ force3D: true })

export default function App() {
  const [volunteerOpen, setVolunteerOpen] = useState(false)

  return (
    <div className="relative min-h-screen bg-[#F5F5F7] overflow-x-hidden">
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
  )
}

import React, { useState, useEffect } from 'react'
import { Users, Trophy, Heart, Target, Star } from 'lucide-react'

const InteractiveSelector = ({ options: customOptions }) => {
  const [activeIndex, setActiveIndex] = useState(0)
  const [animatedOptions, setAnimatedOptions] = useState([])

  const defaultOptions = [
    {
      title: 'La Familia LMUXS',
      description: 'Unidos por el deporte y la comunidad',
      image: '/images/92e0a6fd-43b0-48d7-b330-c8efec53d1eb.jpg',
      icon: <Users size={22} className="text-white" strokeWidth={1.8} />,
    },
    {
      title: 'Campeones',
      description: 'Victoria y orgullo del barrio',
      image: '/images/de412b4d-9ed7-4096-8eb8-787f6332f666.jpg',
      icon: <Trophy size={22} className="text-white" strokeWidth={1.8} />,
    },
    {
      title: 'Pasion',
      description: 'El juego que nos une cada dia',
      image: '/images/bbf481bc-4d55-44e8-9081-e98da354734a.jpg',
      icon: <Heart size={22} className="text-white" strokeWidth={1.8} />,
    },
    {
      title: 'En Accion',
      description: 'Entrenamiento y dedicacion constante',
      image: '/images/kenneth-schipper-bneCT1T_RXQ-unsplash.jpg',
      icon: <Target size={22} className="text-white" strokeWidth={1.8} />,
    },
    {
      title: 'Legado',
      description: 'Construyendo futuro para Los Mina',
      image: '/images/6b2b4380-7005-4524-978d-204f9acdc03e.jpg',
      icon: <Star size={22} className="text-white" strokeWidth={1.8} />,
    },
  ]

  const options = customOptions || defaultOptions

  const handleOptionClick = (index) => {
    if (index !== activeIndex) {
      setActiveIndex(index)
    }
  }

  useEffect(() => {
    const timers = []
    options.forEach((_, i) => {
      const timer = setTimeout(() => {
        setAnimatedOptions((prev) => [...prev, i])
      }, 180 * i)
      timers.push(timer)
    })
    return () => timers.forEach((timer) => clearTimeout(timer))
  }, [])

  return (
    <div className="relative w-full">
      {/* Options Container */}
      <div className="hidden md:flex w-full max-w-[900px] mx-auto items-stretch overflow-hidden"
        style={{ height: 'clamp(360px, 42vw, 480px)' }}>
        {options.map((option, index) => {
          const isActive = activeIndex === index
          return (
            <div
              key={index}
              className="relative flex flex-col justify-end overflow-hidden cursor-pointer"
              style={{
                backgroundImage: `url('${option.image}')`,
                backgroundSize: isActive ? 'auto 100%' : 'auto 120%',
                backgroundPosition: 'center',
                backfaceVisibility: 'hidden',
                opacity: animatedOptions.includes(index) ? 1 : 0,
                transform: animatedOptions.includes(index) ? 'translateX(0)' : 'translateX(-40px)',
                transition: 'flex 0.7s cubic-bezier(0.4, 0, 0.2, 1), background-size 0.7s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.5s ease, transform 0.5s ease, border-color 0.4s ease, box-shadow 0.5s ease',
                minWidth: '56px',
                borderRadius: '1rem',
                borderWidth: '2px',
                borderStyle: 'solid',
                borderColor: isActive ? 'rgba(206,17,38,0.4)' : 'rgba(0,0,0,0.08)',
                backgroundColor: '#1a1a2e',
                boxShadow: isActive
                  ? '0 16px 48px rgba(0,0,0,0.35)'
                  : '0 8px 24px rgba(0,0,0,0.15)',
                flex: isActive ? '7 1 0%' : '1 1 0%',
                zIndex: isActive ? 10 : 1,
                willChange: 'flex-grow, box-shadow, background-size',
                margin: '0 3px',
              }}
              onClick={() => handleOptionClick(index)}
              onMouseEnter={() => handleOptionClick(index)}
            >
              {/* Shadow overlay */}
              <div
                className="absolute left-0 right-0 bottom-0 pointer-events-none"
                style={{
                  height: '140px',
                  transition: 'opacity 0.6s ease',
                  opacity: isActive ? 1 : 0.5,
                  background: 'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.1) 60%, transparent 100%)',
                }}
              />

              {/* Label */}
              <div className="absolute left-0 right-0 bottom-4 flex items-center px-4 gap-3 z-10 pointer-events-none">
                <div className="min-w-[40px] max-w-[40px] h-[40px] flex items-center justify-center rounded-full flex-shrink-0"
                  style={{
                    background: 'rgba(26,26,46,0.75)',
                    backdropFilter: 'blur(8px)',
                    border: '1.5px solid rgba(255,255,255,0.15)',
                    transition: 'all 0.4s ease',
                  }}>
                  {option.icon}
                </div>
                <div className="text-white whitespace-pre overflow-hidden">
                  <div
                    className="font-sans font-bold text-base"
                    style={{
                      opacity: isActive ? 1 : 0,
                      transform: isActive ? 'translateX(0)' : 'translateX(20px)',
                      transition: 'opacity 0.5s ease 0.1s, transform 0.5s cubic-bezier(0.4, 0, 0.2, 1) 0.1s',
                    }}>
                    {option.title}
                  </div>
                  <div
                    className="font-sans text-sm text-white/70"
                    style={{
                      opacity: isActive ? 1 : 0,
                      transform: isActive ? 'translateX(0)' : 'translateX(20px)',
                      transition: 'opacity 0.5s ease 0.15s, transform 0.5s cubic-bezier(0.4, 0, 0.2, 1) 0.15s',
                    }}>
                    {option.description}
                  </div>
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {/* Mobile: stacked cards */}
      <div className="md:hidden grid grid-cols-1 gap-3">
        {options.map((option, index) => (
          <div
            key={index}
            className="relative overflow-hidden rounded-xl cursor-pointer"
            style={{
              height: activeIndex === index ? '220px' : '72px',
              transition: 'height 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
            }}
            onClick={() => setActiveIndex(index)}
          >
            <img
              src={option.image}
              alt={option.title}
              className="absolute inset-0 w-full h-full object-cover"
              loading="lazy"
            />
            <div className="absolute inset-0" style={{
              background: activeIndex === index
                ? 'linear-gradient(to top, rgba(0,0,0,0.6) 0%, transparent 60%)'
                : 'linear-gradient(to right, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0.3) 100%)',
            }} />
            <div className="absolute bottom-0 left-0 right-0 flex items-center p-4 gap-3">
              <div className="min-w-[36px] max-w-[36px] h-[36px] flex items-center justify-center rounded-full flex-shrink-0"
                style={{
                  background: 'rgba(26,26,46,0.7)',
                  border: '1.5px solid rgba(255,255,255,0.15)',
                }}>
                {option.icon}
              </div>
              <div>
                <div className="font-sans font-bold text-white text-sm">{option.title}</div>
                {activeIndex === index && (
                  <div className="font-sans text-white/70 text-xs mt-0.5">{option.description}</div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default InteractiveSelector

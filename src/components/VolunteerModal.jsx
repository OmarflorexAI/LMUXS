import { useEffect, useRef, useState, useCallback } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { X, CheckCircle2, ChevronDown } from 'lucide-react'

const WEB3FORMS_ACCESS_KEY = 'e6107727-57be-4b54-82a6-8ac3529864aa'

const AREAS = [
  'Entrenamiento deportivo',
  'Apoyo educativo',
  'Organizacion de eventos',
  'Fotografia y redes sociales',
  'Nutricion y bienestar',
  'Otro',
]

const AVAILABILITY = [
  'Fines de semana',
  'Entre semana (mananas)',
  'Entre semana (tardes)',
  'Flexible / cualquier horario',
]

const inputBase =
  'w-full bg-[#F5F5F7] border border-black/[0.06] rounded-xl px-4 py-3 text-[14px] text-[#1a1a2e] placeholder:text-[#aaa] font-sans transition-all duration-200 outline-none focus:ring-2 focus:ring-[#CE1126]/15 focus:border-[#CE1126]/25 appearance-none'

const labelBase =
  'block text-[11px] font-sans font-semibold uppercase tracking-[0.18em] text-[#666] mb-1.5'

function Field({ label, children, delay = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.15 + delay, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      <label className={labelBase}>{label}</label>
      {children}
    </motion.div>
  )
}

function CustomSelect({ name, placeholder = 'Seleccionar...', options, required }) {
  const [isOpen, setIsOpen] = useState(false)
  const [selected, setSelected] = useState('')
  const wrapperRef = useRef(null)
  const validationRef = useRef(null)

  // Click outside to close
  useEffect(() => {
    if (!isOpen) return
    const handleClick = (e) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
        setIsOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [isOpen])

  const handleSelect = (value) => {
    setSelected(value)
    setIsOpen(false)
    // Clear custom validity once a value is selected
    if (validationRef.current) {
      validationRef.current.setCustomValidity('')
    }
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Escape') setIsOpen(false)
  }

  // Handle native form validation for required selects
  const handleInvalid = useCallback((e) => {
    e.target.setCustomValidity('Por favor selecciona una opcion')
  }, [])

  return (
    <div ref={wrapperRef} className="relative" onKeyDown={handleKeyDown}>
      {/* Hidden input for form data + native validation */}
      <input
        ref={validationRef}
        type="text"
        name={name}
        value={selected}
        required={required}
        onChange={() => {}}
        onInvalid={handleInvalid}
        tabIndex={-1}
        aria-hidden="true"
        className="absolute opacity-0 h-0 w-0 pointer-events-none"
      />

      {/* Trigger */}
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        aria-expanded={isOpen}
        aria-haspopup="listbox"
        className={`${inputBase} pr-10 cursor-pointer text-left flex items-center justify-between`}
      >
        <span className={selected ? 'text-[#1a1a2e]' : 'text-[#aaa]'}>
          {selected || placeholder}
        </span>
        <motion.span
          className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#999]"
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
        >
          <ChevronDown size={16} />
        </motion.span>
      </button>

      {/* Dropdown panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            role="listbox"
            initial={{ opacity: 0, scale: 0.96, y: -6 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: -6 }}
            transition={{ type: 'spring', stiffness: 500, damping: 32, mass: 0.8 }}
            className="absolute top-full left-0 right-0 mt-1.5 z-50 bg-white rounded-xl overflow-hidden py-1"
            style={{
              border: '1px solid rgba(0,0,0,0.06)',
              boxShadow: '0 12px 40px rgba(0,0,0,0.10), 0 4px 12px rgba(0,0,0,0.05)',
            }}
          >
            {options.map((option, i) => {
              const isSelected = selected === option
              return (
                <motion.button
                  key={option}
                  type="button"
                  role="option"
                  aria-selected={isSelected}
                  onClick={() => handleSelect(option)}
                  initial={{ opacity: 0, x: -6 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.2, delay: i * 0.03, ease: [0.25, 0.46, 0.45, 0.94] }}
                  className={`w-full text-left px-4 py-2.5 text-[14px] font-sans flex items-center gap-3 transition-colors duration-150 cursor-pointer ${
                    isSelected
                      ? 'text-[#CE1126] font-medium bg-[#CE1126]/[0.04]'
                      : 'text-[#1a1a2e] hover:bg-[#F5F5F7]'
                  }`}
                >
                  {/* Red accent bar for selected */}
                  <span
                    className={`w-[2px] h-4 rounded-full transition-all duration-200 flex-shrink-0 ${
                      isSelected ? 'bg-[#CE1126]' : 'bg-transparent'
                    }`}
                  />
                  {option}
                </motion.button>
              )
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default function VolunteerModal({ isOpen, onClose }) {
  const [submitted, setSubmitted] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState(null)
  const panelRef = useRef(null)
  const firstInputRef = useRef(null)

  // Body scroll lock + Escape key
  useEffect(() => {
    if (!isOpen) return

    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    const handleKey = (e) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', handleKey)

    // Focus first input after animation
    const t = setTimeout(() => firstInputRef.current?.focus(), 400)

    return () => {
      document.body.style.overflow = prev
      window.removeEventListener('keydown', handleKey)
      clearTimeout(t)
    }
  }, [isOpen, onClose])

  // Reset on close
  useEffect(() => {
    if (!isOpen) {
      const t = setTimeout(() => {
        setSubmitted(false)
        setSubmitting(false)
        setError(null)
      }, 300)
      return () => clearTimeout(t)
    }
  }, [isOpen])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSubmitting(true)
    setError(null)

    const formData = new FormData(e.target)
    const data = Object.fromEntries(formData.entries())

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          access_key: WEB3FORMS_ACCESS_KEY,
          subject: `Nuevo Voluntario: ${data.nombre}`,
          from_name: data.nombre,
          nombre: data.nombre,
          email: data.email,
          telefono: data.telefono || 'N/A',
          area: data.area,
          disponibilidad: data.disponibilidad,
          mensaje: data.mensaje || 'N/A',
        }),
      })

      const result = await response.json()

      if (response.ok && result.success) {
        setSubmitting(false)
        setSubmitted(true)
      } else {
        throw new Error(result.message || 'Error desconocido')
      }
    } catch {
      setSubmitting(false)
      setError('No se pudo enviar el formulario. Por favor, intenta de nuevo.')
    }
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-[9998] flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
        >
          {/* Backdrop */}
          <motion.div
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          />

          {/* Panel */}
          <motion.div
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="vol-heading"
            className="relative w-full max-w-lg bg-white rounded-2xl overflow-hidden max-h-[90vh] overflow-y-auto"
            style={{
              border: '1px solid rgba(0,0,0,0.06)',
              boxShadow:
                '0 8px 32px rgba(0,0,0,0.12), 0 2px 8px rgba(0,0,0,0.06)',
            }}
            initial={{ opacity: 0, y: 40, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.98 }}
            transition={{
              type: 'spring',
              stiffness: 400,
              damping: 35,
              mass: 0.8,
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Tri-color accent bar */}
            <div className="h-[3px] w-full bg-gradient-to-r from-[#002D62] via-[#ccc] to-[#CE1126]" />

            {/* Close button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 w-8 h-8 rounded-full bg-black/[0.04] hover:bg-black/[0.08] flex items-center justify-center transition-colors duration-200 z-10 cursor-pointer"
              aria-label="Cerrar"
            >
              <X size={16} className="text-[#666]" />
            </button>

            <AnimatePresence mode="wait">
              {!submitted ? (
                <motion.div
                  key="form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className="p-7 pt-6 sm:p-9 sm:pt-7"
                >
                  {/* Header */}
                  <motion.div
                    className="mb-6"
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.05, ease: [0.25, 0.46, 0.45, 0.94] }}
                  >
                    <div className="flex items-center gap-2.5 mb-3">
                      <div className="w-5 h-[2px] bg-[#CE1126] rounded-full" />
                      <span className="text-[11px] font-sans font-semibold uppercase tracking-[0.2em] text-[#CE1126]">
                        Unete al equipo
                      </span>
                    </div>
                    <h2
                      id="vol-heading"
                      className="font-serif italic font-normal text-[#1a1a2e] mb-2"
                      style={{ fontSize: 'clamp(1.6rem, 3.5vw, 2.2rem)', lineHeight: 1.2 }}
                    >
                      Se parte del cambio.
                    </h2>
                    <p className="font-sans text-[13px] leading-relaxed text-[#3a3a4a] max-w-[380px]">
                      Completa el formulario y nos pondremos en contacto contigo.
                    </p>
                  </motion.div>

                  {/* Form */}
                  <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    {/* Row: Name + Email */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <Field label="Nombre completo" delay={0}>
                        <input
                          ref={firstInputRef}
                          type="text"
                          name="nombre"
                          required
                          placeholder="Tu nombre"
                          className={inputBase}
                        />
                      </Field>
                      <Field label="Correo electronico" delay={0.04}>
                        <input
                          type="email"
                          name="email"
                          required
                          placeholder="correo@ejemplo.com"
                          className={inputBase}
                        />
                      </Field>
                    </div>

                    {/* Row: Phone + Area */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <Field label="Telefono (WhatsApp)" delay={0.08}>
                        <input
                          type="tel"
                          name="telefono"
                          placeholder="+1 (809) 000-0000"
                          className={inputBase}
                        />
                      </Field>
                      <Field label="Area de interes" delay={0.12}>
                        <CustomSelect
                          name="area"
                          required
                          placeholder="Seleccionar..."
                          options={AREAS}
                        />
                      </Field>
                    </div>

                    {/* Availability */}
                    <Field label="Disponibilidad" delay={0.16}>
                      <CustomSelect
                        name="disponibilidad"
                        required
                        placeholder="Seleccionar..."
                        options={AVAILABILITY}
                      />
                    </Field>

                    {/* Message */}
                    <Field label="Mensaje (opcional)" delay={0.2}>
                      <textarea
                        name="mensaje"
                        rows={3}
                        placeholder="Cuentanos sobre ti y por que te gustaria ser voluntario..."
                        className={`${inputBase} resize-none`}
                      />
                    </Field>

                    {/* Error message */}
                    <AnimatePresence>
                      {error && (
                        <motion.p
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          className="text-[13px] font-sans text-[#CE1126] bg-[#CE1126]/[0.06] rounded-lg px-4 py-2.5"
                        >
                          {error}
                        </motion.p>
                      )}
                    </AnimatePresence>

                    {/* Submit */}
                    <motion.div
                      className="pt-1"
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
                    >
                      <motion.button
                        type="submit"
                        disabled={submitting}
                        whileTap={{ scale: 0.98 }}
                        className="w-full sm:w-auto font-sans font-semibold text-[14px] uppercase tracking-[0.12em] bg-[#CE1126] text-white rounded-xl px-8 h-12 relative overflow-hidden transition-colors duration-200 hover:bg-[#a30d1f] disabled:opacity-70 disabled:cursor-not-allowed cursor-pointer flex items-center justify-center gap-2.5"
                      >
                        <AnimatePresence mode="wait">
                          {submitting ? (
                            <motion.span
                              key="loading"
                              initial={{ opacity: 0, y: 8 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: -8 }}
                              transition={{ duration: 0.15 }}
                              className="flex items-center gap-2.5"
                            >
                              <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                              Enviando...
                            </motion.span>
                          ) : (
                            <motion.span
                              key="default"
                              initial={{ opacity: 0, y: 8 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: -8 }}
                              transition={{ duration: 0.15 }}
                            >
                              Enviar Solicitud
                            </motion.span>
                          )}
                        </AnimatePresence>
                      </motion.button>
                    </motion.div>
                  </form>
                </motion.div>
              ) : (
                <motion.div
                  key="success"
                  className="p-9 py-16 flex flex-col items-center text-center"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                >
                  <motion.div
                    initial={{ scale: 0, rotate: -20 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{
                      type: 'spring',
                      stiffness: 400,
                      damping: 20,
                      delay: 0.1,
                    }}
                  >
                    <CheckCircle2
                      size={56}
                      strokeWidth={1.5}
                      className="text-[#CE1126] mb-5"
                    />
                  </motion.div>
                  <h3
                    className="font-serif italic font-normal text-[#1a1a2e] mb-2"
                    style={{ fontSize: 'clamp(1.4rem, 3vw, 1.8rem)' }}
                  >
                    Gracias por tu interes!
                  </h3>
                  <p className="font-sans text-[14px] text-[#3a3a4a] mb-8 max-w-[320px] leading-relaxed">
                    Hemos recibido tu solicitud. Te contactaremos pronto para los proximos pasos.
                  </p>
                  <button
                    onClick={onClose}
                    className="font-sans font-semibold text-[13px] uppercase tracking-[0.15em] text-[#CE1126] hover:text-[#a30d1f] transition-colors duration-200 cursor-pointer"
                  >
                    Cerrar
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

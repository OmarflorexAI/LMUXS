import { createContext, useContext, useEffect, useState } from 'react'
import { dictionaries } from './dictionaries'

const LangContext = createContext({
  lang: 'es',
  setLang: () => {},
  t: (k) => k,
})

const SUPPORTED = ['es', 'en', 'fr', 'de', 'zh', 'ko']

function detectInitial() {
  if (typeof window === 'undefined') return 'en'
  const stored = localStorage.getItem('lmuxs_lang')
  if (stored && SUPPORTED.includes(stored)) return stored
  // Default to English on first visit; user can switch via the language menu
  return 'en'
}

export function LangProvider({ children }) {
  const [lang, setLangState] = useState(detectInitial)

  useEffect(() => {
    localStorage.setItem('lmuxs_lang', lang)
    if (typeof document !== 'undefined') document.documentElement.lang = lang
  }, [lang])

  const setLang = (l) => {
    if (SUPPORTED.includes(l)) setLangState(l)
  }

  const t = (key) => {
    const dict = dictionaries[lang] || dictionaries.es
    return dict[key] ?? dictionaries.es[key] ?? key
  }

  return (
    <LangContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LangContext.Provider>
  )
}

export function useT() {
  return useContext(LangContext)
}

export const LANGUAGES = [
  { code: 'es', label: 'Español', flag: '🇩🇴' },
  { code: 'en', label: 'English', flag: '🇺🇸' },
  { code: 'fr', label: 'Français', flag: '🇫🇷' },
  { code: 'de', label: 'Deutsch', flag: '🇩🇪' },
  { code: 'zh', label: '中文', flag: '🇨🇳' },
  { code: 'ko', label: '한국어', flag: '🇰🇷' },
]

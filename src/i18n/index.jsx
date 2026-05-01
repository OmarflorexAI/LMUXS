import { createContext, useContext, useEffect, useState } from 'react'
import { dictionaries } from './dictionaries'

const LangContext = createContext({
  lang: 'en',
  setLang: () => {},
  t: (k) => k,
})

const SUPPORTED = ['es', 'en', 'fr', 'de', 'zh', 'ko']

export function LangProvider({ children }) {
  // Always start in English — language choice is session-only, never persisted
  const [lang, setLangState] = useState('en')

  useEffect(() => {
    // Clear any previously stored language so stale values can't leak
    localStorage.removeItem('lmuxs_lang')
    if (typeof document !== 'undefined') document.documentElement.lang = lang
  }, [lang])

  const setLang = (l) => {
    if (SUPPORTED.includes(l)) setLangState(l)
  }

  const t = (key) => {
    const dict = dictionaries[lang] || dictionaries.en
    return dict[key] ?? dictionaries.en[key] ?? key
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

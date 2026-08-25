import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from 'react'
import { useLocalStorage } from '@/hooks/useLocalStorage'
import type { L, LList, Locale } from '@/data/types'
import { en, type Dict } from '@/i18n/en'
import { el } from '@/i18n/el'

const DICTS: Record<Locale, Dict> = { en, el }

const isLocale = (v: unknown): v is Locale => v === 'en' || v === 'el'

const OUT_MS = 150
const IN_MS = 460

export type LangPhase = 'idle' | 'out' | 'in'

interface I18nValue {
  lang: Locale
  setLang: (lang: Locale) => void
  toggle: () => void
  phase: LangPhase
  t: Dict
  tr: (value: L) => string
  trList: (value: LList) => string[]
}

const I18nContext = createContext<I18nValue | null>(null)

export function I18nProvider({ children }: { children: ReactNode }) {
  const [lang, storeLang] = useLocalStorage<Locale>('tt.lang', 'en', isLocale)
  const [phase, setPhase] = useState<LangPhase>('idle')
  const timers = useRef<number[]>([])

  useEffect(() => {
    document.documentElement.lang = lang === 'el' ? 'el' : 'en'
  }, [lang])

  useEffect(() => {
    const root = document.documentElement
    if (phase === 'idle') delete root.dataset.langAnim
    else root.dataset.langAnim = phase
  }, [phase])

  useEffect(() => {
    const pending = timers.current
    return () => pending.forEach(window.clearTimeout)
  }, [])

  const setLang = useCallback(
    (next: Locale) => {
      if (next === lang) return

      const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
      if (reduced) {
        storeLang(next)
        return
      }

      timers.current.forEach(window.clearTimeout)
      timers.current = []

      setPhase('out')
      timers.current.push(
        window.setTimeout(() => {
          storeLang(next)
          setPhase('in')
        }, OUT_MS),
        window.setTimeout(() => setPhase('idle'), OUT_MS + IN_MS),
      )
    },
    [lang, storeLang],
  )

  const toggle = useCallback(
    () => setLang(lang === 'en' ? 'el' : 'en'),
    [lang, setLang],
  )

  const tr = useCallback((value: L) => value[lang] ?? value.en, [lang])
  const trList = useCallback((value: LList) => value[lang] ?? value.en, [lang])

  const value = useMemo<I18nValue>(
    () => ({ lang, setLang, toggle, phase, t: DICTS[lang], tr, trList }),
    [lang, setLang, toggle, phase, tr, trList],
  )

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>
}

export function useI18n(): I18nValue {
  const ctx = useContext(I18nContext)
  if (!ctx) throw new Error('useI18n must be used inside <I18nProvider>')
  return ctx
}

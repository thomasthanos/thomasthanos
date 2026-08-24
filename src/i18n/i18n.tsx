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
import { useLocalStorage } from '../hooks/useLocalStorage'
import type { L, LList, Locale } from '../data/types'
import { en, type Dict } from './en'
import { el } from './el'

const DICTS: Record<Locale, Dict> = { en, el }

const isLocale = (v: unknown): v is Locale => v === 'en' || v === 'el'

/**
 * Swapping language rewrites nearly every string on screen at once. Doing that
 * on a single frame reads as a glitch, so the page plays a two-beat handoff:
 * it settles out, the text is replaced while nothing is legible anyway, then it
 * comes back with a short stagger.
 */
const OUT_MS = 150
const IN_MS = 460

export type LangPhase = 'idle' | 'out' | 'in'

interface I18nValue {
  lang: Locale
  setLang: (lang: Locale) => void
  toggle: () => void
  /** 'out' while the old copy leaves, 'in' while the new copy arrives. */
  phase: LangPhase
  /** The UI dictionary for the active language. */
  t: Dict
  /** Resolve a localized value from the data layer. */
  tr: (value: L) => string
  /** Resolve a localized list from the data layer. */
  trList: (value: LList) => string[]
}

const I18nContext = createContext<I18nValue | null>(null)

export function I18nProvider({ children }: { children: ReactNode }) {
  const [lang, storeLang] = useLocalStorage<Locale>('tt.lang', 'en', isLocale)
  const [phase, setPhase] = useState<LangPhase>('idle')
  const timers = useRef<number[]>([])

  // Keep <html lang> honest — screen readers and browser translation use it.
  useEffect(() => {
    document.documentElement.lang = lang === 'el' ? 'el' : 'en'
  }, [lang])

  // Drive the animation from one attribute so the CSS can reach every part of
  // the page without any component knowing a swap is happening.
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

      // A second click mid-swap should not queue a second animation.
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

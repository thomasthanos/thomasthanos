import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import { useLocalStorage } from './useLocalStorage'

const KONAMI = [
  'ArrowUp',
  'ArrowUp',
  'ArrowDown',
  'ArrowDown',
  'ArrowLeft',
  'ArrowRight',
  'ArrowLeft',
  'ArrowRight',
  'b',
  'a',
]

interface ChaosValue {
  chaos: boolean
  setChaos: (on: boolean) => void
  toggle: () => void
  /** True for a few seconds after the Konami code fires. */
  justUnlocked: boolean
}

const ChaosContext = createContext<ChaosValue | null>(null)

const isBool = (v: unknown): v is boolean => typeof v === 'boolean'

export function ChaosProvider({ children }: { children: ReactNode }) {
  const [chaos, setChaos] = useLocalStorage<boolean>('tt.chaos', false, isBool)
  const [justUnlocked, setJustUnlocked] = useState(false)

  useEffect(() => {
    document.documentElement.dataset.chaos = chaos ? 'on' : 'off'
  }, [chaos])

  const toggle = useCallback(() => setChaos(!chaos), [chaos, setChaos])

  // Konami code turns it on (never off — turning it off by accident is worse).
  useEffect(() => {
    let i = 0
    const onKey = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement | null
      if (target && /^(INPUT|TEXTAREA|SELECT)$/.test(target.tagName)) return

      const expected = KONAMI[i]
      const key = e.key.length === 1 ? e.key.toLowerCase() : e.key
      if (key !== expected) {
        i = key === KONAMI[0] ? 1 : 0
        return
      }
      i += 1
      if (i < KONAMI.length) return

      i = 0
      setChaos(true)
      setJustUnlocked(true)
      window.setTimeout(() => setJustUnlocked(false), 4500)
    }

    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [setChaos])

  const value = useMemo<ChaosValue>(
    () => ({ chaos, setChaos, toggle, justUnlocked }),
    [chaos, setChaos, toggle, justUnlocked],
  )

  return <ChaosContext.Provider value={value}>{children}</ChaosContext.Provider>
}

export function useChaos(): ChaosValue {
  const ctx = useContext(ChaosContext)
  if (!ctx) throw new Error('useChaos must be used inside <ChaosProvider>')
  return ctx
}

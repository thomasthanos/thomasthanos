import { useCallback, useEffect, useState } from 'react'

/**
 * useState backed by localStorage. Guards against private-mode throws and
 * keeps two tabs in step via the `storage` event.
 */
export function useLocalStorage<T>(
  key: string,
  initial: T,
  /** Rejects values that are no longer valid (e.g. a renamed option). */
  validate?: (value: unknown) => value is T,
): [T, (value: T) => void] {
  const read = useCallback((): T => {
    if (typeof window === 'undefined') return initial
    try {
      const raw = window.localStorage.getItem(key)
      if (raw === null) return initial
      const parsed: unknown = JSON.parse(raw)
      if (validate && !validate(parsed)) return initial
      return parsed as T
    } catch {
      return initial
    }
  }, [key, initial, validate])

  const [value, setValue] = useState<T>(read)

  const write = useCallback(
    (next: T) => {
      setValue(next)
      try {
        window.localStorage.setItem(key, JSON.stringify(next))
      } catch {
        /* private mode / quota — the in-memory value still works */
      }
    },
    [key],
  )

  useEffect(() => {
    const onStorage = (e: StorageEvent) => {
      if (e.key === key) setValue(read())
    }
    window.addEventListener('storage', onStorage)
    return () => window.removeEventListener('storage', onStorage)
  }, [key, read])

  return [value, write]
}

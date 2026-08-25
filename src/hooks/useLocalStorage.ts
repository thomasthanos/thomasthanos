import { useCallback, useEffect, useState } from 'react'

export function useLocalStorage<T>(
  key: string,
  initial: T,
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

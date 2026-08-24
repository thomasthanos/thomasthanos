import { useEffect, useState } from 'react'

/** Reactive media-query match without adding a layout dependency. */
export function useMediaQuery(query: string): boolean {
  const read = () =>
    typeof window !== 'undefined' && window.matchMedia(query).matches

  const [matches, setMatches] = useState(read)

  useEffect(() => {
    const media = window.matchMedia(query)
    const update = () => setMatches(media.matches)
    update()
    media.addEventListener('change', update)
    return () => media.removeEventListener('change', update)
  }, [query])

  return matches
}

/** Join class names, dropping falsy values. */
export function cx(...parts: (string | false | null | undefined)[]): string {
  return parts.filter(Boolean).join(' ')
}

/** A random item, chosen once per call. */
export function pick<T>(items: readonly T[]): T {
  return items[Math.floor(Math.random() * items.length)]
}

/** Props for an external link that should not leak the referring page. */
export const external = {
  target: '_blank',
  rel: 'noopener noreferrer',
} as const

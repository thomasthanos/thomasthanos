
export type Pt = [number, number]


export const EYE_LEFT: Pt[] = [
  [12, 24],
  [30.5, 32.5],
  [20, 40],
  [14.5, 37],
]

export const EYE_RIGHT: Pt[] = [
  [52, 24],
  [33.5, 32.5],
  [44, 40],
  [49.5, 37],
]

export const NOSE: Pt[] = [
  [32, 34.5],
  [35.2, 40],
  [28.8, 40],
]


const X0 = 8.5
const X1 = 55.5
const TEETH = 6
const arc = (x: number) => 44.5 + 5.5 * (1 - ((x - 32) / 23.5) ** 2)
const AMP = 3.8
const THICK = 4.8

function mouthPolygon(): Pt[] {
  const steps = TEETH * 2
  const top: Pt[] = []
  const bottom: Pt[] = []

  for (let i = 0; i <= steps; i += 1) {
    const x = X0 + (i * (X1 - X0)) / steps
    const swing = i % 2 === 0 ? -AMP : AMP
    const taper = 0.55 + 0.45 * (1 - ((x - 32) / 23) ** 2)
    top.push([x, arc(x) + swing * taper])
    bottom.push([x, arc(x) + swing * taper + THICK * taper])
  }

  return [...top, ...bottom.reverse()]
}

export const MOUTH: Pt[] = mouthPolygon()


export function toPath(points: Pt[]): string {
  return (
    points
      .map(([x, y], i) => `${i === 0 ? 'M' : 'L'}${x.toFixed(2)} ${y.toFixed(2)}`)
      .join(' ') + 'Z'
  )
}

export const MARK_EYE_LEFT: Pt[] = [
  [11.5, 23.5],
  [30.5, 33],
  [19, 41],
]

export const MARK_EYE_RIGHT: Pt[] = [
  [52.5, 23.5],
  [33.5, 33],
  [45, 41],
]

export const MARK_MOUTH: Pt[] = [
  [10, 43],
  [15, 53],
  [21, 58],
  [27, 54],
  [32, 60],
  [37, 54],
  [43, 58],
  [49, 53],
  [54, 43],
  [47, 46],
  [43, 50],
  [38, 44],
  [32, 51],
  [26, 44],
  [21, 50],
  [17, 46],
]

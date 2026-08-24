/**
 * The one definition of the mascot's face.
 *
 * Everything that draws the character — the vector logo, the pixel face in the
 * hero terminal, the full figure on /about — reads its geometry from here, so
 * the three can never drift into being three different pumpkins.
 *
 * Coordinate space is 64×64, matching <Pumpkin>. The body ellipse it sits in
 * is cx 32, cy 38, rx 26, ry 22 — so the face has to stay inside roughly
 * x 8–56, y 22–59.
 */

export type Pt = [number, number]

/* --- Eyes ------------------------------------------------------------------
   Big angled wedges: widest at the outer top, tapering to a point down and
   inward. This is what makes the face read as angry rather than friendly. */

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

/** Small, deliberately understated — the eyes and mouth carry the face. */
export const NOSE: Pt[] = [
  [32, 34.5],
  [35.2, 40],
  [28.8, 40],
]

/* --- Mouth ------------------------------------------------------------------
   A zigzag ribbon of near-constant thickness following a smiling arc, which is
   what a carved jack-o'-lantern grin actually looks like — not a crescent with
   a few teeth notched out of the top. */

const X0 = 8.5
const X1 = 55.5
const TEETH = 6
/** Smiling arc: corners sit higher (smaller y) than the centre. */
const arc = (x: number) => 44.5 + 5.5 * (1 - ((x - 32) / 23.5) ** 2)
const AMP = 3.8
const THICK = 4.8

function mouthPolygon(): Pt[] {
  const steps = TEETH * 2
  const top: Pt[] = []
  const bottom: Pt[] = []

  for (let i = 0; i <= steps; i += 1) {
    const x = X0 + (i * (X1 - X0)) / steps
    // Alternating up/down is what cuts the teeth.
    const swing = i % 2 === 0 ? -AMP : AMP
    // The ribbon thins towards the corners so it tucks into the pumpkin.
    const taper = 0.55 + 0.45 * (1 - ((x - 32) / 23) ** 2)
    top.push([x, arc(x) + swing * taper])
    bottom.push([x, arc(x) + swing * taper + THICK * taper])
  }

  return [...top, ...bottom.reverse()]
}

export const MOUTH: Pt[] = mouthPolygon()


/** Closed SVG path from a polygon. */
export function toPath(points: Pt[]): string {
  return (
    points
      .map(([x, y], i) => `${i === 0 ? 'M' : 'L'}${x.toFixed(2)} ${y.toFixed(2)}`)
      .join(' ') + 'Z'
  )
}

/**
 * Simplified face for small sizes. At 24–32px the six-tooth ribbon turns to
 * mush, so the mark gets bigger eyes and a three-tooth grin instead.
 */
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

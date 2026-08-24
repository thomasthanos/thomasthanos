import { cx } from '../../utils'
import {
  EYE_LEFT,
  EYE_RIGHT,
  MARK_EYE_LEFT,
  MARK_EYE_RIGHT,
  MARK_MOUTH,
  MOUTH,
  NOSE,
  toPath,
} from './face'
import './pumpkin.css'

export type Mood = 'grin' | 'wide' | 'sleepy'

interface PumpkinProps {
  size?: number
  /**
   * `mark` uses the simplified face — bigger eyes, three teeth — so it still
   * reads at 24–32px. `full` uses the six-tooth ribbon.
   */
  detail?: 'mark' | 'full'
  mood?: Mood
  /** The lit-from-inside glow. Off for tiny marks, where it just smears. */
  glow?: boolean
  className?: string
  title?: string
}

const SLEEPY_EYES = 'M15 32.5 L30 32.5 L24 39 Z M49 32.5 L34 32.5 L40 39 Z'
const SLEEPY_MOUTH = 'M24 49 C28 53 36 53 40 49 C36 51.5 28 51.5 24 49 Z'

export function Pumpkin({
  size = 64,
  detail = 'full',
  mood = 'grin',
  glow = true,
  className,
  title,
}: PumpkinProps) {
  const full = detail === 'full'

  let eyes: string
  let mouth: string
  let nose: string | null = null

  if (mood === 'sleepy') {
    eyes = SLEEPY_EYES
    mouth = SLEEPY_MOUTH
  } else if (full) {
    eyes = `${toPath(EYE_LEFT)} ${toPath(EYE_RIGHT)}`
    mouth = toPath(MOUTH)
    nose = toPath(NOSE)
  } else {
    eyes = `${toPath(MARK_EYE_LEFT)} ${toPath(MARK_EYE_RIGHT)}`
    mouth = toPath(MARK_MOUTH)
  }

  // The manic grin is the normal one, pushed wider and taller.
  const faceScale = mood === 'wide' ? 1.07 : 1

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      fill="none"
      className={cx('pk', glow && 'pk--glow', className)}
      data-mood={mood}
      role={title ? 'img' : 'presentation'}
      aria-label={title}
      aria-hidden={title ? undefined : true}
      focusable="false"
    >
      {/* crooked stalk, matching the hand-drawn kolokithes mark */}
      <path
        className="pk__stem"
        d="M29.5 17.5c1-5.5-.5-10-2.5-13.5l4-2.5c3 4.5 4.5 9.5 4 15"
        strokeWidth={full ? 3.2 : 3.8}
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* deliberately imperfect outline; a perfect ellipse looked like an icon */}
      <path
        className="pk__body"
        d="M32 15.5C17 14.8 6 23 5.5 37.5 5 51.7 15.3 60 32 60.5 48.7 60 59 51.7 58.5 37.5 58 23 47 14.8 32 15.5Z"
        strokeWidth={full ? 3.6 : 4.2}
      />

      {/* ribs — outer thirds only, so they never cross the face */}
      {full && (
        <path
          className="pk__rib"
          d="M20.5 19.5C15 28 15 48 21 56M43.5 19.5c5.5 8.5 5.5 28.5-.5 36.5"
          strokeWidth="2.4"
          strokeLinecap="round"
        />
      )}

      <g
        className="pk__face"
        style={
          faceScale === 1
            ? undefined
            : { transform: `scale(${faceScale})`, transformOrigin: '32px 40px' }
        }
      >
        <path d={eyes} />
        {nose && mood !== 'wide' && <path d={nose} />}
        <path d={mouth} />
      </g>
    </svg>
  )
}

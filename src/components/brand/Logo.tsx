import { cx } from '../../utils'
import './logo.css'

interface LogoProps {
  size?: number
  /** Drops the seal, leaving just the pumpkin. */
  bare?: boolean
  className?: string
  title?: string
}

export function Logo({ size = 32, bare = false, className, title }: LogoProps) {
  const width = Math.round(size * 1.28)

  return (
    <span
      className={cx('logo', bare && 'logo--bare', className)}
      style={{ width, height: size }}
      role={title ? 'img' : undefined}
      aria-label={title}
    >
      <img
        className="logo__image"
        src={`${import.meta.env.BASE_URL}assets/pumpkin-logo-transparent.webp`}
        alt=""
        width={width}
        height={size}
        draggable={false}
      />
    </span>
  )
}

import { cx } from '@/utils'
import { useI18n } from '@/i18n/i18n'
import '@/components/brand/sticker.css'

interface StickerProps {
  tilt?: number
  className?: string
}

export function Sticker({ tilt = -7, className }: StickerProps) {
  const { lang } = useI18n()
  const file = lang === 'en' ? 'spongebob-pame-gta_en.webp' : 'spongebob-pame-gta_gr.webp'

  return (
    <span
      className={cx('sticker', className)}
      style={{ '--tilt': `${tilt}deg` } as React.CSSProperties}
      aria-hidden="true"
    >
      <img
        className="sticker__art"
        src={`${import.meta.env.BASE_URL}assets/${file}`}
        alt=""
        width="344"
        height="469"
        draggable="false"
      />
    </span>
  )
}

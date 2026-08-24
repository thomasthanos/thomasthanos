import { MoveHorizontal } from 'lucide-react'
import { useI18n } from '../../i18n/i18n'
import { cx } from '../../utils'
import './swipe-hint.css'

export function SwipeHint({ className }: { className?: string }) {
  const { t } = useI18n()

  return (
    <span className={cx('swipe-hint', className)} aria-hidden="true">
      <MoveHorizontal />
      <span>{t.common.swipe}</span>
    </span>
  )
}

import { useChaos } from '../../hooks/useChaos'
import { useI18n } from '../../i18n/i18n'
import { Zap } from 'lucide-react'

export function ChaosToggle() {
  const { chaos, toggle } = useChaos()
  const { t } = useI18n()

  return (
    <button
      type="button"
      className={chaos ? 'chaos-btn is-on' : 'chaos-btn'}
      onClick={toggle}
      aria-pressed={chaos}
      aria-label={chaos ? t.chaos.disable : t.chaos.enable}
      title={t.chaos.hint}
    >
      <Zap className="chaos-btn__icon" aria-hidden="true" />
      <span className="chaos-btn__led" aria-hidden="true" />
      <span className="chaos-btn__text" aria-hidden="true">
        {t.chaos.label}
      </span>
    </button>
  )
}

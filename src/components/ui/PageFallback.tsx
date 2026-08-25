import { useI18n } from '@/i18n/i18n'

export function PageFallback() {
  const { t } = useI18n()

  return (
    <div className="page" role="status" aria-live="polite">
      <div className="container">
        <p className="label">
          <span className="caret" aria-hidden="true" />
          {t.common.loading}…
        </p>
      </div>
      <div style={{ minHeight: '60vh' }} />
    </div>
  )
}

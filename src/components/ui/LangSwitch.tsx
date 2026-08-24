import { useI18n } from '../../i18n/i18n'
import type { Locale } from '../../data/types'

const OPTIONS: { code: Locale; short: string }[] = [
  { code: 'en', short: 'EN' },
  { code: 'el', short: 'GR' },
]

export function LangSwitch() {
  const { lang, setLang, t } = useI18n()

  return (
    <div className="lang" role="group" aria-label={t.lang.label}>
      {OPTIONS.map((o) => (
        <button
          key={o.code}
          type="button"
          className={o.code === lang ? 'lang__btn is-on' : 'lang__btn'}
          onClick={() => setLang(o.code)}
          aria-pressed={o.code === lang}
          lang={o.code}
        >
          <span aria-hidden="true">{o.short}</span>
          <span className="sr-only">{t.lang[o.code]}</span>
        </button>
      ))}
    </div>
  )
}

import type { ReactNode } from 'react'
import { useI18n } from '@/i18n/i18n'
import '@/components/ui/terminal.css'

interface TerminalLine {
  id: string
  content: ReactNode
}

export function Terminal() {
  const { t, lang } = useI18n()

  const lines: TerminalLine[] =
    lang === 'el'
      ? [
          {
            id: 'since',
            content: (
              <>
                φτιάχνω cool πράγματα από το <b>2018</b>
              </>
            ),
          },
          { id: 'self', content: 'αυτοδίδακτος. χωρίς courses. μόνο πόνος.' },
          { id: 'automate', content: 'αν με ενοχλεί, το αυτοματοποιώ.' },
          { id: 'simple', content: 'τόσο απλά.' },
        ]
      : [
          {
            id: 'since',
            content: (
              <>
                building cool shit since <b>2018</b>
              </>
            ),
          },
          { id: 'self', content: 'self-taught. no courses. only pain.' },
          { id: 'automate', content: 'if it annoys me, i automate it.' },
          { id: 'simple', content: 'simple as that.' },
        ]

  return (
    <div className="term">
      <div className="term__bar">
        <span className="term__title">kolokithes@portfolio:~</span>
        <span className="term__win" aria-hidden="true">
          <svg viewBox="0 0 18 18" focusable="false">
            <path d="M4 12.5h10" />
          </svg>
          <svg viewBox="0 0 18 18" focusable="false">
            <rect x="4" y="4" width="10" height="10" rx="0.5" />
          </svg>
          <svg viewBox="0 0 18 18" focusable="false">
            <path d="m4.5 4.5 9 9m0-9-9 9" />
          </svg>
        </span>
      </div>

      <div className="term__face">
        <img
          className="term__face-art"
          src={`${import.meta.env.BASE_URL}assets/terminal-pixel-face.webp?v=2`}
          alt=""
          width="340"
          height="225"
          draggable="false"
        />
      </div>

      <div className="term__body">
        {lines.map((line, i) => (
          <p
            key={line.id}
            className="term__line"
            style={{ '--i': `${180 + i * 110}ms` } as React.CSSProperties}
          >
            <span className="term__prompt" aria-hidden="true">
              &gt;
            </span>
            <span className="term__cmd">{line.content}</span>
          </p>
        ))}

        <p
          className="term__line term__cursor-line"
          style={{ '--i': '620ms' } as React.CSSProperties}
          aria-hidden="true"
        >
          <span className="term__prompt">&gt;</span>
          <span className="caret" />
        </p>
      </div>

      <span className="sr-only">{t.home.terminalHint}</span>
    </div>
  )
}

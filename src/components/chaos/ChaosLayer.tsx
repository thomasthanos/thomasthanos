import { useChaos } from '../../hooks/useChaos'
import { useI18n } from '../../i18n/i18n'
import { chaosNotes, konamiMessage } from '../../data/eggs'
import './chaos.css'

/** Loose hand-drawn marks. Decorative only, hidden from assistive tech. */
function Doodles() {
  return (
    <>
      {/* a very tired pumpkin */}
      <svg viewBox="0 0 48 48" fill="none" className="doodle doodle--1" aria-hidden="true">
        <ellipse cx="24" cy="28" rx="15" ry="13" stroke="currentColor" strokeWidth="2" />
        <path d="M24 15v-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        <path
          d="M24 15c-5 4-5 21 0 25M24 15c5 4 5 21 0 25"
          stroke="currentColor"
          strokeWidth="1.4"
          opacity=".6"
        />
        <path d="M18 33c4-2 8-2 12 0" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      </svg>

      {/* semicolon, missing */}
      <svg viewBox="0 0 48 48" fill="none" className="doodle doodle--2" aria-hidden="true">
        <path
          d="M10 14l-6 10 6 10M38 14l6 10-6 10"
          stroke="currentColor"
          strokeWidth="2.4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <circle cx="24" cy="19" r="2.2" fill="currentColor" />
        <path
          d="M24 27a2.2 2.2 0 100 4.4 2.2 2.2 0 000-4.4zM24 31.4c0 2-.8 3.2-2.2 4"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
        />
      </svg>

      {/* coffee, empty */}
      <svg viewBox="0 0 48 48" fill="none" className="doodle doodle--3" aria-hidden="true">
        <path
          d="M9 16h24v14a9 9 0 01-9 9h-6a9 9 0 01-9-9V16z"
          stroke="currentColor"
          strokeWidth="2.2"
          strokeLinejoin="round"
        />
        <path d="M33 20h4a5 5 0 010 10h-4" stroke="currentColor" strokeWidth="2.2" />
        <path d="M16 10c0-2 2-2 2-4M24 10c0-2 2-2 2-4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      </svg>
    </>
  )
}

export function ChaosLayer() {
  const { chaos, justUnlocked } = useChaos()
  const { tr } = useI18n()

  return (
    <>
      {chaos && (
        <div className="chaos-layer" aria-hidden="true">
          <Doodles />
          {/* "πάμε GTA" is already the hero sticker — these are the others. */}
          {chaosNotes.map((note, index) => (
            <span
              className={`sticker-note sticker-note--${index === 0 ? 'a' : 'b'}`}
              key={note.en}
            >
              {tr(note)}
            </span>
          ))}
        </div>
      )}

      {justUnlocked && (
        <div className="chaos-toast" role="status">
          <span className="chaos-toast__led" aria-hidden="true" />
          {tr(konamiMessage)}
        </div>
      )}
    </>
  )
}

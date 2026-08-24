import type { Sketch as SketchData } from '../../data/types'
import './sketch.css'

/**
 * An honest illustration: the window chrome and row states come from the
 * project's own data, so it shows the shape of the real interface without
 * pretending to be a screenshot.
 */
export function Sketch({ data, accent }: { data: SketchData; accent: string }) {
  return (
    <figure className="sketch" data-accent={accent} data-kind={data.kind}>
      <div className="sketch__bar">
        {data.kind === 'browser' ? (
          <>
            <span className="sketch__dots" aria-hidden="true">
              <i />
              <i />
              <i />
            </span>
            <span className="sketch__url">{data.title}</span>
          </>
        ) : (
          <>
            <span className="sketch__chip" aria-hidden="true" />
            <span className="sketch__title">{data.title}</span>
            <span className="sketch__win" aria-hidden="true">
              <i />
              <i />
              <i />
            </span>
          </>
        )}
      </div>

      <div className="sketch__body">
        {data.rows.map((row) => (
          <div
            key={row.label}
            className={row.hot ? 'sketch__row is-hot' : 'sketch__row'}
          >
            <span className="sketch__label">{row.label}</span>

            {row.bar !== undefined && (
              <span className="sketch__bar-track" aria-hidden="true">
                <span className="sketch__bar-fill" style={{ width: `${row.bar}%` }} />
              </span>
            )}

            {row.value && <span className="sketch__value">{row.value}</span>}
          </div>
        ))}
      </div>
    </figure>
  )
}

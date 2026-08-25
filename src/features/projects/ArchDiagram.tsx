import { useI18n } from '@/i18n/i18n'
import type { ArchLayer } from '@/data/types'
import '@/features/projects/arch.css'

export function ArchDiagram({ layers }: { layers: ArchLayer[] }) {
  const { tr } = useI18n()

  return (
    <ol className="arch">
      {layers.map((layer, i) => (
        <li key={layer.name.en} className="arch__layer">
          <div className="arch__head">
            <span className="arch__n">{String(i + 1).padStart(2, '0')}</span>
            <h3 className="arch__name">{tr(layer.name)}</h3>
          </div>

          <ul className="arch__items">
            {layer.items.map((item) => (
              <li key={item} className="arch__item">
                {item}
              </li>
            ))}
          </ul>

          {layer.note && <p className="arch__note">{tr(layer.note)}</p>}
        </li>
      ))}
    </ol>
  )
}

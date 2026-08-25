import { Link } from 'react-router-dom'
import { ChevronDown, Info } from 'lucide-react'
import { PageHeader } from '@/components/ui/PageHeader'
import { Section } from '@/components/ui/Section'
import { Reveal } from '@/components/ui/Reveal'
import { SwipeHint } from '@/components/ui/SwipeHint'
import { Annotation } from '@/components/ui/Annotation'
import { useI18n } from '@/i18n/i18n'
import { useDocumentMeta } from '@/hooks/useDocumentMeta'
import { areas, stackGroups, stackNote } from '@/data/stack'
import { getProject } from '@/data/projects'
import { notes } from '@/data/notes'
import '@/pages/stack.css'

function UsedIn({ slugs }: { slugs: string[] }) {
  const { t } = useI18n()
  const found = slugs.map(getProject).filter((p) => p !== undefined)
  if (found.length === 0) return null

  return (
    <p className="sitem__used">
      <span className="sitem__used-k">{t.stack.usedIn}</span>
      {found.map((p) => (
        <Link key={p.slug} to={`/projects/${p.slug}`} className="sitem__used-l">
          {p.name}
        </Link>
      ))}
    </p>
  )
}

export function Stack() {
  const { t, tr } = useI18n()

  useDocumentMeta({
    title: t.stack.title,
    description: t.stack.lede,
    path: '/stack',
  })

  return (
    <div className="page">
      <div className="container">
        <PageHeader
          kicker={t.stack.kicker}
          title={t.stack.title}
          lede={t.stack.lede}
          meta={
            <span className="chip chip--violet">
              {stackGroups.length} {t.stack.areasTitle.toLowerCase()}
            </span>
          }
        />

        <div className="sgroups">
          {stackGroups.map((group, gi) => {
            const itemsId = `stack-group-${group.id}`

            return (
              <details
                key={group.id}
                className="sgroup"
                data-accent={group.accent}
                name="stack-groups"
                open={gi === 0}
              >
                <summary className="sgroup__head">
                  <span className="sgroup__idx" aria-hidden="true">
                    {String(gi + 1).padStart(2, '0')}
                  </span>
                  <span className="sgroup__copy">
                    <span className="sgroup__title">{tr(group.title)}</span>
                    <span className="sgroup__blurb">{tr(group.blurb)}</span>
                  </span>
                  <span className="sgroup__count" aria-hidden="true">
                    {group.items.length}
                  </span>
                  <ChevronDown className="sgroup__chevron" aria-hidden="true" />
                </summary>

                <ul className="sgroup__items" id={itemsId}>
                  {group.items.map((item) => (
                    <li key={item.name} className="sitem" data-accent={group.accent}>
                      <h3 className="sitem__name">{item.name}</h3>
                      <p className="sitem__note">{tr(item.note)}</p>
                      {item.usedIn && <UsedIn slugs={item.usedIn} />}
                    </li>
                  ))}
                </ul>
              </details>
            )
          })}
        </div>

        <Section title={t.stack.areasTitle} className="stack-areas">
          <div className="sareas__intro">
            <p className="label">
              <span className="label__tick" aria-hidden="true" />
              {t.stack.areasKicker}
            </p>
            <SwipeHint className="sareas__hint" />
          </div>
          <div className="sareas__rail">
            <ul className="sareas">
              {areas.map((area, i) => (
                <li key={area.title.en}>
                  <Reveal className="sarea" delay={Math.min(i, 5) * 50}>
                    <span className="sarea__idx" aria-hidden="true">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <h3 className="sarea__t">{tr(area.title)}</h3>
                    <p className="sarea__b">{tr(area.body)}</p>
                    <UsedIn slugs={area.proof} />
                  </Reveal>
                </li>
              ))}
            </ul>
            <span className="sareas__edge" aria-hidden="true" />
          </div>
        </Section>

        <Section title={t.stack.noteTitle} className="stack-note">
          <div className="stack__note-row">
            <p className="ddisclaimer">
              <Info aria-hidden="true" />
              <span>{tr(stackNote)}</span>
            </p>
            <Annotation className="stack__note" arrow="none" tilt={-5} accent="violet">
              {tr(notes.stackNoBars)}
            </Annotation>
          </div>
        </Section>
      </div>
    </div>
  )
}

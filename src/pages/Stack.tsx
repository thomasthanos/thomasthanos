import { useMemo } from 'react'
import { Link } from 'react-router-dom'
import { ChevronDown, Info } from 'lucide-react'
import { PageHeader } from '@/components/ui/PageHeader'
import { Reveal } from '@/components/ui/Reveal'
import { SwipeHint } from '@/components/ui/SwipeHint'
import { Annotation } from '@/components/ui/Annotation'
import { useI18n } from '@/i18n/i18n'
import { useDocumentMeta } from '@/hooks/useDocumentMeta'
import { areas, stackGroups, stackNote } from '@/data/stack'
import { getProject } from '@/data/projects'
import { notes } from '@/data/notes'
import '@/pages/page-kit.css'
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

  /* Counted from the page's own data rather than typed in, so the strip cannot drift away from
     the list underneath it. `proven` only counts slugs that actually resolve to a project — a
     dead reference should shrink the number, not quietly inflate it. */
  const { entries, proven } = useMemo(() => {
    const slugs = new Set<string>()
    stackGroups.forEach((g) => g.items.forEach((i) => i.usedIn?.forEach((s) => slugs.add(s))))
    areas.forEach((a) => a.proof.forEach((s) => slugs.add(s)))

    return {
      entries: stackGroups.reduce((n, g) => n + g.items.length, 0),
      proven: [...slugs].filter((s) => getProject(s) !== undefined).length,
    }
  }, [])

  const stats = [
    { v: String(entries), k: t.stack.statTools },
    { v: String(proven), k: t.stack.statProven },
    { v: String(areas.length), k: t.stack.statAreas },
    { v: '0', k: t.stack.statBars },
  ]

  return (
    <div className="page pk stack-page">
      <div className="container">
        <PageHeader
          kicker={t.stack.kicker}
          title={t.stack.title}
          lede={t.stack.lede}
          meta={
            <span className="chip stack__meta">
              {stackGroups.length} {t.stack.metaGroups} · {entries} {t.stack.metaEntries}
            </span>
          }
        />

        <section className="stack__scale" aria-label={t.stack.statTools}>
          <dl className="pk-stats">
            {stats.map((s) => (
              <div className="pk-stat" key={s.k}>
                <dt>{s.v}</dt>
                <dd>{s.k}</dd>
              </div>
            ))}
          </dl>
          <p className="pk-foot">{t.stack.foot}</p>
        </section>

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
                  <div className="sgroup__copy">
                    <h2 className="sgroup__title sgroup__heading">{tr(group.title)}</h2>
                    <span className="sgroup__blurb">{tr(group.blurb)}</span>
                  </div>
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

        <section className="stack-areas" aria-labelledby="stack-areas-title">
          <div className="pk-rule stack__rule">
            <h2 id="stack-areas-title">{t.stack.areasTitle}</h2>
            <p className="pk-rule__aside">{t.stack.areasAside}</p>
          </div>

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
        </section>

        <section className="stack-note" aria-labelledby="stack-note-title">
          <div className="pk-rule stack__rule stack__rule--note">
            <h2 id="stack-note-title">{t.stack.noteTitle}</h2>
            <p className="pk-rule__aside">{t.stack.noteAside}</p>
          </div>

          <div className="stack__note-row">
            <p className="ddisclaimer">
              <Info aria-hidden="true" />
              <span>{tr(stackNote)}</span>
            </p>
            <Annotation className="stack__note" arrow="none" tilt={-5} accent="violet">
              {tr(notes.stackNoBars)}
            </Annotation>
          </div>
        </section>
      </div>
    </div>
  )
}

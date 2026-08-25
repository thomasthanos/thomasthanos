import { useEffect, useRef, useState } from 'react'
import { ArrowUpRight, Check, Copy, Github, Mail, MessageSquare } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { PageHeader } from '@/components/ui/PageHeader'
import { Section } from '@/components/ui/Section'
import { Annotation } from '@/components/ui/Annotation'
import { useI18n } from '@/i18n/i18n'
import { useDocumentMeta } from '@/hooks/useDocumentMeta'
import { site } from '@/data/site'
import { notes } from '@/data/notes'
import { external } from '@/utils'
import '@/pages/contact.css'

interface MethodProps {
  index: string
  icon: LucideIcon
  label: string
  value: string
  href?: string
  accent: 'lime' | 'violet' | 'blue'
}

function Method({ index, icon: Icon, label, value, href, accent }: MethodProps) {
  const { t } = useI18n()
  const [copied, setCopied] = useState(false)
  const timer = useRef<number>(0)

  useEffect(() => () => window.clearTimeout(timer.current), [])

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(value)
      setCopied(true)
      window.clearTimeout(timer.current)
      timer.current = window.setTimeout(() => setCopied(false), 1800)
    } catch {
    }
  }

  return (
    <div className="cmethod" data-accent={accent}>
      <div className="cmethod__head">
        <span className="cmethod__icon" aria-hidden="true">
          <Icon />
        </span>
        <span className="cmethod__index" aria-hidden="true">
          {index}
        </span>
      </div>
      <div className="cmethod__text">
        <span className="cmethod__label">{label}</span>
        <span className="cmethod__value">{value}</span>
      </div>
      <div className="cmethod__actions">
        <button
          type="button"
          className="cmethod__btn"
          onClick={copy}
          aria-label={`${t.common.copy} ${label}`}
        >
          {copied ? <Check aria-hidden="true" /> : <Copy aria-hidden="true" />}
          <span aria-live="polite">{copied ? t.common.copied : t.common.copy}</span>
        </button>
        {href && (
          <a
            className="cmethod__btn cmethod__btn--go"
            href={href}
            {...(href.startsWith('http') ? external : {})}
            aria-label={`${t.contact.open} ${label}`}
          >
            <ArrowUpRight aria-hidden="true" />
            <span>{t.contact.open}</span>
          </a>
        )}
      </div>
    </div>
  )
}

export function Contact() {
  const { t, tr } = useI18n()

  useDocumentMeta({
    title: t.nav.contact,
    description: t.contact.lede,
    path: '/contact',
  })

  return (
    <div className="page contact-page">
      <div className="container">
        <div className="contact__shell">
          <PageHeader
            kicker={t.contact.kicker}
            title={t.contact.title}
            lede={t.contact.lede}
            meta={
              <div className="contact__header-meta">
                <span>06 / contact</span>
                <span className="contact__status">
                  <span className="live-dot" aria-hidden="true" />
                  {t.about.factStatusValue}
                </span>
              </div>
            }
          />

          <section className="contact__direct" aria-label={t.nav.contact}>
            <div className="contact__intro-card">
              <p className="label label--accent">
                <span className="label__tick" aria-hidden="true" />
                {t.contact.availabilityKicker}
              </p>
              <h2>{t.contact.availabilityNote}</h2>
              <div className="contact__reply-state">
                <span className="live-dot" aria-hidden="true" />
                {t.about.factStatusValue}
              </div>
              <Annotation className="cnote-anno" arrow="ne" tilt={-7} accent="violet">
                {tr(notes.contactSend)}
              </Annotation>
            </div>

            <div className="cmethods">
              <Method
                index="01"
                icon={MessageSquare}
                label={t.contact.discordLabel}
                value={site.discord}
                accent="violet"
              />
              <Method
                index="02"
                icon={Mail}
                label={t.contact.emailLabel}
                value={site.email}
                href={`mailto:${site.email}`}
                accent="lime"
              />
              <Method
                index="03"
                icon={Github}
                label={t.contact.githubLabel}
                value={`github.com/${site.handle}`}
                href={site.github}
                accent="blue"
              />
            </div>
          </section>

          <Section className="contact__availability" title={t.contact.availabilityTitle}>
            <p className="label contact__section-kicker">
              <span className="label__tick" aria-hidden="true" />
              {t.contact.availabilityKicker}
            </p>

            <div className="cavail">
              <ul className="cavail__yes">
                {t.contact.availability.map((item, i) => (
                  <li key={item}>
                    <span aria-hidden="true">{String(i + 1).padStart(2, '0')}</span>
                    {item}
                  </li>
                ))}
              </ul>

              <div className="cavail__no">
                <h3>{t.contact.notInterested}</h3>
                <ul>
                  {t.contact.notInterestedItems.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            </div>
          </Section>
        </div>
      </div>
    </div>
  )
}

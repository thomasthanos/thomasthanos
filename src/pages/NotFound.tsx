import { Link } from 'react-router-dom'
import { ArrowRight, Home } from 'lucide-react'
import { Pumpkin } from '../components/brand/Pumpkin'
import { useI18n } from '../i18n/i18n'
import { useDocumentMeta } from '../hooks/useDocumentMeta'
import { notFound } from '../data/eggs'
import './not-found.css'

export function NotFound() {
  const { t, tr } = useI18n()

  useDocumentMeta({
    title: `404 — ${tr(notFound.title)}`,
    description: tr(notFound.body),
    path: '/404',
  })

  return (
    <div className="page">
      <div className="container nf">
        <div className="nf__top">
          <Pumpkin size={110} mood="sleepy" />
          <p className="nf__code" aria-hidden="true">
            404
          </p>
        </div>
        <h1 className="nf__title">{tr(notFound.title)}</h1>
        <p className="nf__body">{tr(notFound.body)}</p>

        <pre className="nf__term" aria-hidden="true">
          {'$ cat this-page\ncat: this-page: No such file or directory\n$ '}
          <span className="caret" />
        </pre>

        <div className="nf__cta">
          <Link className="btn btn--primary" to="/">
            <Home aria-hidden="true" />
            {t.notFound.back}
          </Link>
          <Link className="btn btn--ghost" to="/projects">
            {t.notFound.browse}
            <ArrowRight aria-hidden="true" />
          </Link>
        </div>
      </div>
    </div>
  )
}

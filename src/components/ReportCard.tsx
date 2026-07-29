import { ArrowUpRight } from 'lucide-react'
import type { Lang } from '../data'
import { tx } from '../data'
import type { ReportItem } from '../reportData'
import { reportCategories } from '../reportData'

export default function ReportCard({
  report,
  lang,
  featured = false,
}: {
  report: ReportItem
  lang: Lang
  featured?: boolean
}) {
  const category = reportCategories.find((item) => item.key === report.category)

  return (
    <a
      className={`report-card ${featured ? 'report-card-featured' : ''}`}
      href={report.url}
      target="_blank"
      rel="noreferrer"
      aria-label={`${tx(report.title, lang)} — ${report.source}`}
    >
      <div className="report-card-image">
        <img src={report.image} alt={tx(report.imageAlt, lang)} loading="lazy" />
        <span>{category ? tx(category.label, lang) : ''}</span>
      </div>
      <div className="report-card-body">
        <div className="report-card-meta">
          <span>{report.source}</span>
          <span>{report.published}</span>
        </div>
        <h2>{tx(report.title, lang)}</h2>
        <p>{tx(report.summary, lang)}</p>
        <span className="report-card-link">
          {lang === 'zh' ? '阅读原文' : 'Open original'}
          <ArrowUpRight size={18} />
        </span>
      </div>
    </a>
  )
}

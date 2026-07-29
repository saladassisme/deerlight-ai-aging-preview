import { ArrowRight } from 'lucide-react'
import type { Lang } from '../data'
import { reports } from '../reportData'
import ReportCard from './ReportCard'

export default function ReportsPreview({ lang }: { lang: Lang }) {
  return (
    <section className="reports-preview">
      <div className="reports-preview-heading">
        <h2>Reports</h2>
        <a href="/reports.html">
          {lang === 'zh' ? '查看全部' : 'View all'}
          <ArrowRight size={19} />
        </a>
      </div>
      <div className="reports-preview-grid">
        {reports.slice(0, 3).map((report) => (
          <ReportCard key={report.id} report={report} lang={lang} />
        ))}
      </div>
    </section>
  )
}

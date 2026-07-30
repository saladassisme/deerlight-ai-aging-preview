import { Search } from 'lucide-react'
import { useMemo, useState } from 'react'
import ReportCard from '../components/ReportCard'
import { ProductHero, SiteFooter } from '../components/ProductShell'
import type { Lang } from '../data'
import { tx } from '../data'
import type { ReportCategory } from '../reportData'
import { reportCategories, reports } from '../reportData'

const copy = {
  zh: { title: '洞察报告', statement: '关于人工智能、数字生活与年龄的研究、文章和重要数据。', lead: '我们从全球研究、产品实践与真实生活中，挑选值得继续读下去的内容。所有卡片都会带你回到原始来源。', search: '搜索标题、来源或主题', empty: '没有找到匹配的内容，试试其他关键词。', count: '篇内容', curated: '小鹿光年精选', topics: '报告主题' },
  en: { title: 'Reports', statement: 'Research, essays, and essential data on AI, digital life, and age.', lead: 'Selected from global research, product practice, and lived experience. Every card links directly to its original source.', search: 'Search titles, sources, or topics', empty: 'No matching reports. Try another keyword.', count: 'items', curated: 'Curated by Deerlight', topics: 'Report topics' },
}

export default function ReportsPage({ lang, setLang }: { lang: Lang; setLang: (lang: Lang) => void }) {
  const [category, setCategory] = useState<'all' | ReportCategory>('all')
  const [query, setQuery] = useState('')
  const t = copy[lang]
  const filtered = useMemo(() => {
    const normalized = query.trim().toLowerCase()
    return reports.filter((report) => (category === 'all' || report.category === category) && (!normalized || tx(report.title, lang).toLowerCase().includes(normalized) || tx(report.summary, lang).toLowerCase().includes(normalized) || report.source.toLowerCase().includes(normalized)))
  }, [category, lang, query])

  return <main className="product-page reports-page">
    <ProductHero lang={lang} setLang={setLang} title={t.title} statement={t.statement} className="reports-hero unified-subpage-hero" />
    <section className="reports-intro"><p>{t.lead}</p></section>
    <section className="reports-gallery-section">
      <div className="reports-controls">
        <label className="reports-search"><Search size={19} /><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder={t.search} aria-label={t.search} /></label>
        <div className="reports-filter" role="group" aria-label={t.topics}>{reportCategories.map((item) => <button type="button" key={item.key} className={category === item.key ? 'active' : ''} aria-pressed={category === item.key} onClick={() => setCategory(item.key)}>{tx(item.label, lang)}</button>)}</div>
      </div>
      <div className="reports-count"><span>{String(filtered.length).padStart(2, '0')} {t.count}</span><span>{t.curated}</span></div>
      {filtered.length > 0 ? <div className="reports-gallery">{filtered.map((report, index) => <ReportCard key={report.id} report={report} lang={lang} featured={category === 'all' && !query && index === 0} />)}</div> : <div className="reports-empty">{t.empty}</div>}
    </section>
    <SiteFooter lang={lang} />
  </main>
}

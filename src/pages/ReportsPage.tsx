import { ArrowUpRight, Search } from 'lucide-react'
import { useMemo, useState } from 'react'
import ReportCard from '../components/ReportCard'
import { ProductHero, SiteFooter } from '../components/ProductShell'
import type { Lang } from '../data'
import { tx } from '../data'
import type { ReportCategory } from '../reportData'
import { reportCategories, reports } from '../reportData'
import '../reports-originals.css'

const copy = {
  zh: { title: '洞察报告', statement: '关于人工智能、数字生活与年龄的研究、文章和重要数据。', lead: '这里同时收录小鹿光年的原创方法与全球高质量研究。外部精选会带你回到原始来源。', search: '搜索标题、来源或主题', empty: '没有找到匹配的内容，试试其他关键词。', count: '篇内容', curated: '小鹿光年精选', topics: '报告主题', originals: 'Deerlight Originals', originalLead: '来自真实产品、用户研究与原型实践的方法和观察。' },
  en: { title: 'Reports', statement: 'Research, essays, and essential data on AI, digital life, and age.', lead: 'Deerlight Originals sit alongside high-quality global research. Every external card links directly to its source.', search: 'Search titles, sources, or topics', empty: 'No matching reports. Try another keyword.', count: 'items', curated: 'Curated by Deerlight', topics: 'Report topics', originals: 'Deerlight Originals', originalLead: 'Methods and observations from real products, user research, and prototypes.' },
}

const originals = {
  zh: [
    ['让 AI 对银发用户真正好用：小鹿光年的六条设计原则', '从大字和简化界面进一步走向记忆、权限、安全确认、可撤回与家庭协作。', '/about'],
    ['从固定功能到可分发技能：SilverOS 的能力架构', '为什么银发智能系统需要可运行、可评估、可跨设备使用的技能层。', '/skillhub'],
    ['42 个银发 AI 技能背后的生活任务地图', '从安全、健康、家庭、学习、日常生活和机构服务重新理解需求。', '/skillhub'],
  ],
  en: [
    ['Making AI genuinely usable for older adults: six Deerlight principles', 'Moving beyond large text toward memory, permissions, safety confirmation, reversibility, and family collaboration.', '/about'],
    ['From fixed features to distributable skills: the SilverOS capability model', 'Why later-life AI systems need runnable, evaluable capabilities that work across devices.', '/skillhub'],
    ['The life-task map behind 42 later-life AI skills', 'A new view of needs across safety, health, family, learning, daily life, and provider services.', '/skillhub'],
  ],
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
    <section className="deerlight-originals">
      <div className="section-title"><h2>{t.originals}</h2><p>{t.originalLead}</p></div>
      <div className="deerlight-original-grid">{originals[lang].map(([title, summary, href], index) => <article key={title}><span>{String(index + 1).padStart(2, '0')}</span><h3>{title}</h3><p>{summary}</p><a href={href}>{lang === 'zh' ? '阅读当前版本' : 'Read current edition'}<ArrowUpRight size={16} /></a></article>)}</div>
    </section>
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

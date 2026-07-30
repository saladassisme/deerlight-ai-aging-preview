import { BadgeCheck, BookOpen, Building2, HeartPulse, Home, Search, ShieldCheck, Sparkles, Users } from 'lucide-react'
import { useMemo, useState } from 'react'
import type { Lang, SkillCategory } from '../data'
import { skillCategories, skills, tx } from '../data'
import Navbar from '../components/Navbar'
import { ContactBand, SectionTitle, SiteFooter } from '../components/ProductShell'

const copy = {
  zh: {
    heroTitle: 'SkillHub',
    heroStatement: '不是概念陈列，而是一组可以打开、体验并接入设备的适老 AI 能力。',
    resident: 'Skills 目录',
    categories: '生活场景',
    live: '可体验 Skills',
    galleryTitle: 'Skills Gallery',
    galleryLead: '首批三个 Skill 已有独立子页面和可操作原型，其余能力将按真实可用状态逐步开放。',
    search: '搜索 Skill 或生活场景',
    noResult: '没有找到匹配的 Skill，换一个关键词试试。',
    tryNow: '查看并体验',
    building: '开发中',
    realTitle: '首批三个真实 Skill',
    realLead: '每个 Skill 都展示输入、输出、权限和责任边界，并提供无需登录的即时体验。',
  },
  en: {
    heroTitle: 'SkillHub',
    heroStatement: 'Not a concept catalog, but practical AI capabilities that can be opened, tested, and integrated into devices.',
    resident: 'skills catalog',
    categories: 'life categories',
    live: 'live skills',
    galleryTitle: 'Skills Gallery',
    galleryLead: 'The first three skills now have dedicated pages and interactive prototypes. Others open only when genuinely usable.',
    search: 'Search skills or life situations',
    noResult: 'No matching skill. Try another keyword.',
    tryNow: 'View live skill',
    building: 'In development',
    realTitle: 'The first three real skills',
    realLead: 'Each skill shows its input, output, access, and responsibility boundary, with a no-login live demo.',
  },
}

const categoryIcons = {
  生活: Home,
  家庭: Users,
  安全: ShieldCheck,
  健康: HeartPulse,
  学习: BookOpen,
  机构: Building2,
}

const liveRoutes: Record<number, string> = {
  1: '/skills/scam-check',
  3: '/skills/visit-prep',
  8: '/skills/photo-memory',
}

export default function SkillHubPage({ lang, setLang }: { lang: Lang; setLang: (lang: Lang) => void }) {
  const t = copy[lang]
  const [category, setCategory] = useState<'全部' | SkillCategory>('全部')
  const [query, setQuery] = useState('')

  const filtered = useMemo(() => {
    const normalized = query.trim().toLowerCase()
    return skills.filter((skill) => {
      const categoryMatch = category === '全部' || skill.category === category
      const queryMatch = !normalized
        || skill.name.zh.toLowerCase().includes(normalized)
        || skill.name.en.toLowerCase().includes(normalized)
        || skill.description.zh.toLowerCase().includes(normalized)
        || skill.description.en.toLowerCase().includes(normalized)
      return categoryMatch && queryMatch
    })
  }, [category, query])

  return (
    <main className="product-page skillhub-page">
      <section className="skillhub-hero">
        <Navbar lang={lang} setLang={setLang} light />
        <div className="skillhub-orbit" aria-hidden="true">
          <span><ShieldCheck /></span><span><HeartPulse /></span><span><Users /></span><span><BookOpen /></span><i />
        </div>
        <div className="product-hero-copy"><h1>{t.heroTitle}</h1><p>{t.heroStatement}</p></div>
      </section>

      <section className="skill-stats">
        <div><strong>{skills.length}</strong><span>{t.resident}</span></div>
        <div><strong>06</strong><span>{t.categories}</span></div>
        <div><strong>03</strong><span>{t.live}</span></div>
      </section>

      <section className="live-skills-intro">
        <SectionTitle title={t.realTitle} lead={t.realLead} />
        <div className="live-skill-links">
          {[skills[0], skills[2], skills[7]].map((skill) => {
            const Icon = categoryIcons[skill.category]
            return <a href={liveRoutes[skill.id]} key={skill.id}>
              <span><Icon size={22} /></span>
              <div><small>LIVE SKILL</small><h3>{tx(skill.name, lang)}</h3><p>{tx(skill.description, lang)}</p></div>
              <strong>↗</strong>
            </a>
          })}
        </div>
      </section>

      <section className="gallery-section">
        <SectionTitle title={t.galleryTitle} lead={t.galleryLead} />
        <div className="gallery-controls">
          <label className="skill-search"><Search size={20} /><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder={t.search} aria-label={t.search} /></label>
          <div className="category-filter" role="group" aria-label="Skill categories">
            {skillCategories.map((item) => <button key={item.key} type="button" className={category === item.key ? 'active' : ''} aria-pressed={category === item.key} onClick={() => setCategory(item.key)}>{lang === 'zh' ? item.zh : item.en}</button>)}
          </div>
        </div>
        <p className="gallery-result-count">{filtered.length} / {skills.length}</p>
        {filtered.length > 0 ? <div className="skill-gallery">
          {filtered.map((skill) => {
            const Icon = categoryIcons[skill.category]
            const route = liveRoutes[skill.id]
            return <article className={`${skill.featured ? 'featured' : ''} ${route ? 'live-card' : 'planned-card'}`} key={skill.id}>
              <div className="skill-card-top"><span className="skill-icon"><Icon size={21} /></span>{route ? <span className="verified"><BadgeCheck size={15} /> LIVE</span> : <span className="verified">ROADMAP</span>}</div>
              <h3>{tx(skill.name, lang)}</h3><p>{tx(skill.description, lang)}</p>
              <div className="skill-provider"><span>{skill.provider}</span><strong>{tx(skill.price, lang)}</strong></div>
              {route ? <a className="skill-card-action" href={route}>{t.tryNow}<span>↗</span></a> : <span className="skill-card-action disabled">{t.building}</span>}
            </article>
          })}
        </div> : <div className="empty-gallery"><Sparkles size={24} /><p>{t.noResult}</p></div>}
      </section>

      <ContactBand lang={lang} title={lang === 'zh' ? '把真实能力带进 SkillHub' : 'Bring a real capability to SkillHub'} />
      <SiteFooter lang={lang} />
    </main>
  )
}

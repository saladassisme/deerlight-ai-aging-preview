import { BadgeCheck, BookOpen, Building2, HeartPulse, Home, Search, ShieldCheck, Sparkles, Users } from 'lucide-react'
import { useMemo, useState } from 'react'
import type { Lang, SkillCategory } from '../data'
import { skillCategories, skills, tx } from '../data'
import Navbar from '../components/Navbar'
import { ContactBand, SectionTitle, SiteFooter } from '../components/ProductShell'

const copy = {
  zh: {
    heroTitle: '技能中心',
    heroStatement: '不是概念陈列，而是一组可以打开、体验并接入设备的适老人工智能能力。',
    resident: '技能目录',
    categories: '生活场景',
    live: '可体验技能',
    galleryTitle: '技能目录',
    galleryLead: '首批三个技能已有独立子页面和可操作原型，其余能力将按真实可用状态逐步开放。',
    search: '搜索技能或生活场景',
    noResult: '没有找到匹配的技能，换一个关键词试试。',
    tryNow: '查看并体验',
    building: '开发中',
    realTitle: '首批三个真实技能',
    realLead: '每个技能都展示输入、输出、权限和责任边界，并提供无需登录的即时体验。',
    liveTag: '可体验',
    roadmapTag: '规划中',
    filterLabel: '技能分类',
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
    liveTag: 'LIVE',
    roadmapTag: 'ROADMAP',
    filterLabel: 'Skill categories',
  },
}

const categoryIcons = { 生活: Home, 家庭: Users, 安全: ShieldCheck, 健康: HeartPulse, 学习: BookOpen, 机构: Building2 }
const liveRoutes: Record<number, string> = { 1: '/skills/scam-check', 3: '/skills/visit-prep', 8: '/skills/photo-memory' }
const providerNames: Record<string, { zh: string; en: string }> = {
  'Deerlight Safety': { zh: '小鹿安全', en: 'Deerlight Safety' },
  'CareNote': { zh: '安心就医', en: 'CareNote' },
  'Memora': { zh: '小鹿回忆录', en: 'Memora' },
  'Kindred AI': { zh: '亲情智能', en: 'Kindred AI' },
  'Deerlight Learn': { zh: '小鹿学习', en: 'Deerlight Learn' },
  'Rhythm Care': { zh: '安心节奏', en: 'Rhythm Care' },
  'Wayhome': { zh: '安心出行', en: 'Wayhome' },
  'Goodday Studio': { zh: '好日子工作室', en: 'Goodday Studio' },
  'Plainly': { zh: '明白说', en: 'Plainly' },
  'Mellow Motion': { zh: '轻运动', en: 'Mellow Motion' },
  'Evergreen': { zh: '常青学堂', en: 'Evergreen' },
  'Home Voice': { zh: '家声', en: 'Home Voice' },
  'Harbor Living': { zh: '港湾生活', en: 'Harbor Living' },
  'CareOps': { zh: '照护运营', en: 'CareOps' },
  'Common Room': { zh: '共享客厅', en: 'Common Room' },
  'Deerlight Labs': { zh: '小鹿实验室', en: 'Deerlight Labs' },
  'Dayline': { zh: '日程线', en: 'Dayline' },
}

export default function SkillHubPage({ lang, setLang }: { lang: Lang; setLang: (lang: Lang) => void }) {
  const t = copy[lang]
  const [category, setCategory] = useState<'全部' | SkillCategory>('全部')
  const [query, setQuery] = useState('')
  const filtered = useMemo(() => {
    const normalized = query.trim().toLowerCase()
    return skills.filter((skill) => (category === '全部' || skill.category === category) && (!normalized || skill.name.zh.toLowerCase().includes(normalized) || skill.name.en.toLowerCase().includes(normalized) || skill.description.zh.toLowerCase().includes(normalized) || skill.description.en.toLowerCase().includes(normalized)))
  }, [category, query])

  return <main className="product-page skillhub-page">
    <section className="skillhub-hero">
      <Navbar lang={lang} setLang={setLang} light />
      <div className="skillhub-orbit" aria-hidden="true"><span><ShieldCheck /></span><span><HeartPulse /></span><span><Users /></span><span><BookOpen /></span><i /></div>
      <div className="product-hero-copy"><h1>{t.heroTitle}</h1><p>{t.heroStatement}</p></div>
    </section>
    <section className="skill-stats"><div><strong>{skills.length}</strong><span>{t.resident}</span></div><div><strong>06</strong><span>{t.categories}</span></div><div><strong>03</strong><span>{t.live}</span></div></section>
    <section className="live-skills-intro">
      <SectionTitle title={t.realTitle} lead={t.realLead} />
      <div className="live-skill-links">{[skills[0], skills[2], skills[7]].map((skill) => { const Icon = categoryIcons[skill.category]; return <a href={liveRoutes[skill.id]} key={skill.id}><span><Icon size={22} /></span><div><small>{t.liveTag}</small><h3>{tx(skill.name, lang)}</h3><p>{tx(skill.description, lang)}</p></div><strong>↗</strong></a> })}</div>
    </section>
    <section className="gallery-section">
      <SectionTitle title={t.galleryTitle} lead={t.galleryLead} />
      <div className="gallery-controls"><label className="skill-search"><Search size={20} /><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder={t.search} aria-label={t.search} /></label><div className="category-filter" role="group" aria-label={t.filterLabel}>{skillCategories.map((item) => <button key={item.key} type="button" className={category === item.key ? 'active' : ''} aria-pressed={category === item.key} onClick={() => setCategory(item.key)}>{lang === 'zh' ? item.zh : item.en}</button>)}</div></div>
      <p className="gallery-result-count">{filtered.length} / {skills.length}</p>
      {filtered.length > 0 ? <div className="skill-gallery">{filtered.map((skill) => { const Icon = categoryIcons[skill.category]; const route = liveRoutes[skill.id]; return <article className={`${skill.featured ? 'featured' : ''} ${route ? 'live-card' : 'planned-card'}`} key={skill.id}><div className="skill-card-top"><span className="skill-icon"><Icon size={21} /></span><span className="verified">{route ? <><BadgeCheck size={15} /> {t.liveTag}</> : t.roadmapTag}</span></div><h3>{tx(skill.name, lang)}</h3><p>{tx(skill.description, lang)}</p><div className="skill-provider"><span>{providerNames[skill.provider]?.[lang] ?? skill.provider}</span><strong>{tx(skill.price, lang)}</strong></div>{route ? <a className="skill-card-action" href={route}>{t.tryNow}<span>↗</span></a> : <span className="skill-card-action disabled">{t.building}</span>}</article> })}</div> : <div className="empty-gallery"><Sparkles size={24} /><p>{t.noResult}</p></div>}
    </section>
    <ContactBand lang={lang} title={lang === 'zh' ? '把真实能力带进技能中心' : 'Bring a real capability to SkillHub'} />
    <SiteFooter lang={lang} />
  </main>
}

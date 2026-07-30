import { Building2, HeartHandshake, Lightbulb, ShieldCheck } from 'lucide-react'
import type { Lang } from '../data'
import { ContactBand, ProductHero, SectionTitle, SiteFooter } from '../components/ProductShell'

const copy = {
  zh: {
    title: '关于我们',
    statement: '从银发用户出发，让人工智能真正进入每个人的生活。',
    intro: '小鹿光年是一家面向银发数字生活的人工智能产品与创新平台。我们不只做单个应用，而是同时建设银发智能系统、技能中心、共创社区、研究报告与真实场景试点，让技术、服务和人之间形成更长期的连接。',
    principlesTitle: '我们相信',
    principles: [
      ['技术应该更容易使用', '复杂度应由系统承担，而不是转嫁给用户。'],
      ['安全必须成为默认设置', '重要操作要可解释、可撤回，并保留人工确认。'],
      ['真实生活决定产品方向', '通过用户共创、原型测试和机构试点持续验证。'],
      ['生态比单点产品更有价值', '系统、技能、硬件和服务需要在同一套信任框架中协同。'],
    ],
    systemTitle: '我们正在构建的生态',
    systemLead: '以银发智能系统为入口，以技能中心为能力市场，以共创社区和研究体系持续发现、验证和放大真实需求。',
    system: [
      ['银发智能系统', '负责身份、记忆、权限、安全确认和跨设备任务编排。'],
      ['技能中心', '让开发者与服务商发布、定价和分发可复用的人工智能能力。'],
      ['共创社区', '让用户、家庭、机构和行业伙伴直接进入产品现场。'],
      ['洞察与实验', '把研究、原型、评估和真实场景试点沉淀成长期方法。'],
    ],
  },
  en: {
    title: 'About',
    statement: 'Starting with older adults, we make AI genuinely usable in everyday life.',
    intro: 'Deerlight is an AI product and innovation platform for later-life digital living. We do not build isolated apps. We connect SilverOS, SkillHub, Community, research, and field pilots into one ecosystem where technology, services, and people can work together over time.',
    principlesTitle: 'What we believe',
    principles: [
      ['Technology should be easier to use', 'Complexity belongs inside the system, not on the person.'],
      ['Safety must be the default', 'Consequential actions should be explainable, reversible, and human-confirmed.'],
      ['Real life should shape products', 'Co-creation, prototypes, and field pilots guide the roadmap.'],
      ['Ecosystems create more value', 'Systems, skills, devices, and services need one shared trust layer.'],
    ],
    systemTitle: 'The ecosystem we are building',
    systemLead: 'SilverOS is the entry point, SkillHub is the capability market, and Community plus research continuously discover and validate real needs.',
    system: [
      ['SilverOS', 'Identity, memory, permissions, safety confirmation, and cross-device orchestration.'],
      ['SkillHub', 'A marketplace for developers and providers to publish, price, and distribute reusable AI skills.'],
      ['Community', 'A place where people, families, providers, and partners enter the product process directly.'],
      ['Reports & Labs', 'Research, prototypes, evaluation, and field pilots turned into reusable methods.'],
    ],
  },
}

const icons = [Lightbulb, ShieldCheck, HeartHandshake, Building2]

export default function AboutPage({ lang, setLang }: { lang: Lang; setLang: (lang: Lang) => void }) {
  const t = copy[lang]
  return <main className="product-page about-page">
    <ProductHero lang={lang} setLang={setLang} title={t.title} statement={t.statement} className="about-hero" />
    <section className="statement-section"><p>{t.intro}</p></section>
    <section className="about-principles"><SectionTitle title={t.principlesTitle} /><div className="about-principle-grid">{t.principles.map(([title, body], index) => { const Icon = icons[index]; return <article key={title}><Icon size={24} /><h3>{title}</h3><p>{body}</p></article> })}</div></section>
    <section className="about-system"><SectionTitle title={t.systemTitle} lead={t.systemLead} inverted /><div className="about-system-grid">{t.system.map(([title, body], index) => <article key={title}><span>{String(index + 1).padStart(2, '0')}</span><h3>{title}</h3><p>{body}</p></article>)}</div></section>
    <ContactBand lang={lang} />
    <SiteFooter lang={lang} />
  </main>
}

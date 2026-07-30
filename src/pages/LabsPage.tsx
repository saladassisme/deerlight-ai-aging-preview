import type { Lang } from '../data'
import { ContactBand, ProductHero, SectionTitle, SiteFooter } from '../components/ProductShell'

const content = {
  zh: {
    heroTitle: '创新实验室',
    statement: '在产品固化之前，先验证人与技术、家庭和机构之间的新关系。',
    intro: '创新实验室聚焦记忆、身份、陪伴、无障碍与跨世代数字生活，通过研究、原型、咨询和真实试点推动新产品落地。',
    title: '研究与试点',
    items: [
      ['研究主题', '数字记忆、身份连续性、智能陪伴、长期助手、无障碍交互、家庭协作与可信人工智能。'],
      ['工作方式', '趋势研究、用户研究、服务蓝图、快速原型、现场试点与效果评估。'],
      ['合作模式', '联合研究、企业咨询、创新工作坊、产品概念验证与场景试点。'],
      ['成果形式', '研究报告、产品原型、评估框架、行业建议与新业务机会。'],
    ],
  },
  en: {
    heroTitle: 'Labs',
    statement: 'Testing new relationships between people, technology, families, and institutions before products harden.',
    intro: 'Labs explores memory, identity, companionship, accessibility, and digital life across generations through research, prototypes, consulting, and pilots.',
    title: 'Research and pilots',
    items: [
      ['Research themes', 'Digital memory, identity continuity, AI companionship, long-lived agents, accessibility, family collaboration, and trustworthy AI.'],
      ['How we work', 'Trend research, user research, service blueprints, rapid prototypes, field pilots, and evaluation.'],
      ['Engagement models', 'Joint research, enterprise consulting, innovation workshops, proofs of concept, and scenario pilots.'],
      ['Outputs', 'Research reports, product prototypes, evaluation frameworks, industry recommendations, and new business opportunities.'],
    ],
  },
}

export default function LabsPage({ lang, setLang }: { lang: Lang; setLang: (lang: Lang) => void }) {
  const t = content[lang]
  return <main className="product-page labs-page">
    <ProductHero lang={lang} setLang={setLang} title={t.heroTitle} statement={t.statement} className="labs-hero" />
    <section className="statement-section"><p>{t.intro}</p></section>
    <section className="labs-content"><SectionTitle title={t.title} /><div>{t.items.map(([title, body]) => <article key={title}><h3>{title}</h3><p>{body}</p></article>)}</div></section>
    <ContactBand lang={lang} />
    <SiteFooter lang={lang} />
  </main>
}

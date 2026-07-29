import type { Lang } from '../data'
import { ContactBand, ProductHero, SectionTitle, SiteFooter } from '../components/ProductShell'

const content = {
  zh: {
    statement: '在产品固化之前，先验证人、技术与制度之间的新关系。',
    intro: 'Labs 聚焦记忆、身份、陪伴、无障碍与跨世代数字生活，通过研究、原型、咨询和试点推动新产品落地。',
    title: '研究与试点',
    items: [
      ['研究主题', '数字记忆、身份连续性、AI 陪伴、长期 Agent、无障碍交互、家庭协作与可信 AI。'],
      ['工作方式', '趋势研究、用户研究、服务蓝图、快速原型、现场试点与效果评估。'],
      ['合作模式', '联合研究、企业咨询、创新工作坊、产品概念验证与场景试点。'],
      ['输出', '研究报告、产品原型、评估框架、行业建议与新业务机会。'],
    ],
  },
  en: {
    statement: 'Testing new relationships between people, technology, and institutions before products harden.',
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
  return (
    <main className="product-page labs-page">
      <ProductHero lang={lang} setLang={setLang} title="Labs" statement={t.statement} className="labs-hero" />
      <section className="statement-section"><p>{t.intro}</p></section>
      <section className="labs-content">
        <SectionTitle title={t.title} />
        <div>{t.items.map(([title, body]) => <article key={title}><h3>{title}</h3><p>{body}</p></article>)}</div>
      </section>
      <ContactBand lang={lang} />
      <SiteFooter lang={lang} />
    </main>
  )
}

import { useEffect, useMemo, useState } from 'react'

type Lang = 'zh' | 'en'
type ProductKey = 'silver-os' | 'skillhub' | 'community' | 'labs'

const copy = {
  zh: {
    nav: { ecosystem: '生态', products: '产品', memoir: '回忆录', contact: '联系' },
    heroEyebrow: 'AI FOR AGING',
    heroTitle1: '让更长的人生',
    heroTitle2: '也更丰盛',
    heroDesc: 'Deerlight 构建面向长寿时代的 AI 产品、能力与基础设施，让技术承担复杂度，让人保有选择、尊严与连接。',
    explore: '探索产品',
    aboutLead: '我们不把老年人简化成“需要被照顾的人”，而是把他们视为仍在学习、创造、连接和做决定的人。',
    aboutTitle: '让 AI 承担认知负担，把人生还给人本身。',
    aboutBody: '从人生故事、数字生活到家庭协作与服务网络，Deerlight 以更安静、更可信、更可解释的方式，把 AI 嵌入长寿社会的日常。',
    ecosystemTitle: '一个面向长寿社会的产品生态',
    ecosystemDesc: '从单一产品走向操作系统、能力市场、社区与研究平台。',
    cards: {
      memoir: ['Deerlight Memoir', '小鹿光年', '通过语音访谈、动态追问、家庭共创与 AI 成文，帮助每个人保存一生的故事。'],
      silver: ['SilverOS', '银龄 AI 操作系统', '让身份、记忆、家庭、设备、安全与 Agent 能力跨设备协同。'],
      skillhub: ['SkillHub', '银龄 AI 能力市场', '把经过验证的 AI 能力模块化，连接家庭、硬件厂商、服务机构与开发者。'],
      community: ['Community', '长寿社会知识网络', '汇聚用户、家庭、专家、研究者、机构与产业伙伴。'],
      labs: ['Labs', '研究与试点', '探索记忆、身份、陪伴、无障碍交互与人机关系的下一代产品。'],
    },
    ctaTitle: '一起构建长寿社会的 AI 基础设施',
    ctaBody: '合作试点、产品共创、行业研究与能力接入。',
    cta: '开始合作',
  },
  en: {
    nav: { ecosystem: 'Ecosystem', products: 'Products', memoir: 'Memoir', contact: 'Contact' },
    heroEyebrow: 'AI FOR AGING',
    heroTitle1: 'A longer life',
    heroTitle2: 'without less life',
    heroDesc: 'Deerlight builds AI products, skills, and infrastructure for a longevity society—so technology carries complexity while people keep agency, dignity, and connection.',
    explore: 'Explore products',
    aboutLead: 'We do not reduce older adults to people who need care. We design for people who are still learning, creating, connecting, and making decisions.',
    aboutTitle: 'Let AI carry cognitive weight, so people can keep living their lives.',
    aboutBody: 'From life stories and digital access to family collaboration and service networks, Deerlight embeds AI into everyday aging in a quieter, more trustworthy, and more explainable way.',
    ecosystemTitle: 'A product ecosystem for a longevity society',
    ecosystemDesc: 'Moving from a single product toward an operating layer, a skill marketplace, a community, and a research platform.',
    cards: {
      memoir: ['Deerlight Memoir', 'Voice-first life storytelling', 'Voice interviews, adaptive follow-ups, family co-creation, and AI-assisted writing help preserve a lifetime of stories.'],
      silver: ['SilverOS', 'An AI operating layer for aging', 'Coordinate identity, memory, family, devices, safety, and agents across the full journey.'],
      skillhub: ['SkillHub', 'Installable intelligence for aging', 'Turn validated AI capabilities into modular skills for families, device makers, service providers, and developers.'],
      community: ['Community', 'The aging intelligence network', 'Connect older adults, families, experts, researchers, institutions, and industry partners.'],
      labs: ['Labs', 'Research and pilots', 'Explore memory, identity, companionship, accessibility, and human–AI relationships.'],
    },
    ctaTitle: 'Build the AI infrastructure for longer lives with us',
    ctaBody: 'Pilots, product co-creation, industry research, and capability integration.',
    cta: 'Start a conversation',
  },
} as const

const productContent: Record<ProductKey, { zh: any; en: any }> = {
  'silver-os': {
    zh: {
      eyebrow: 'SILVEROS', title: '银龄 AI 操作系统', subtitle: '一个跨设备、跨服务、跨家庭协作的 AI 操作层。',
      intro: 'SilverOS 不是把手机界面做大，而是重新组织老年人的数字生活：让身份、记忆、家庭、安全和服务围绕人的意图运转。',
      sections: [
        ['一个身份，贯穿所有设备', '统一管理偏好、联系人、信任关系、历史记录与授权，让电视、手机、音箱、机器人和服务终端拥有连续体验。'],
        ['五层核心架构', '身份层 Identity、记忆层 Memory、家庭层 Family、安全层 Safety、Agent 层 Intelligence。'],
        ['面向真实生活旅程', '晨间提醒、健康管理、社交沟通、学习娱乐、出行支付、诈骗防护与紧急协助。'],
        ['合作对象', '硬件厂商、养老机构、社区服务商、保险与医疗平台、家庭服务企业。'],
      ],
      modules: ['意图优先首页', '家庭支持但不过度监控', '反诈骗与可信通信', '跨设备连续记忆', '可解释的 Agent 行动', '适老化引导与无障碍'],
      model: ['设备与入口', 'SilverOS 统一身份与权限', 'Skills / Agents 能力层', '家庭与服务生态'],
    },
    en: {
      eyebrow: 'SILVEROS', title: 'An AI operating layer for aging', subtitle: 'A cross-device, cross-service, family-aware operating layer.',
      intro: 'SilverOS is not a bigger home screen. It reorganizes digital life around human intent, connecting identity, memory, family, safety, and services.',
      sections: [
        ['One identity across every device', 'Carry preferences, trusted contacts, permissions, and history across phones, TVs, speakers, robots, and service terminals.'],
        ['Five core layers', 'Identity, Memory, Family, Safety, and Intelligence.'],
        ['Designed around real life journeys', 'Morning routines, health, communication, learning, mobility, payments, fraud prevention, and emergency support.'],
        ['Built for partners', 'Device makers, care providers, community services, insurers, health platforms, and family-service companies.'],
      ],
      modules: ['Intent-first home', 'Family support without surveillance', 'Fraud-aware communication', 'Continuous memory', 'Explainable agent actions', 'Adaptive accessibility'],
      model: ['Devices and touchpoints', 'SilverOS identity and permissions', 'Skills and agent layer', 'Family and service ecosystem'],
    },
  },
  skillhub: {
    zh: {
      eyebrow: 'SKILLHUB', title: '银龄 AI 能力市场', subtitle: '把“对老年人真正有用”的 AI 能力做成可安装、可评估、可组合的模块。',
      intro: 'SkillHub 连接模型、设备、服务机构与真实用户，让硬件厂商和服务商无需从零构建整套 AI 能力。',
      sections: [
        ['日常生活', '用药提醒、预约协助、购物清单、出行规划、数字教练。'],
        ['家庭与沟通', '家庭消息助手、代际翻译、纪念日提醒、家庭记忆共创。'],
        ['安全与健康', '诈骗识别、风险提示、就医准备、健康记录整理。'],
        ['机构与行业', '员工 Copilot、入住陪伴、服务质检、场景化 Agent。'],
      ],
      modules: ['反诈骗助手', '数字生活教练', '家庭消息助手', '就医准备助手', '记忆分享技能', '学习陪练', '机构员工 Copilot', '居民陪伴 Agent'],
      model: ['设备 / 服务入口', 'SkillHub 能力编排', '模型与知识库', '用户、家庭、机构'],
    },
    en: {
      eyebrow: 'SKILLHUB', title: 'Installable intelligence for aging', subtitle: 'Modular, measurable, composable AI skills for real later-life needs.',
      intro: 'SkillHub connects models, devices, providers, and real users so partners can add trusted AI capabilities without rebuilding the whole stack.',
      sections: [
        ['Daily life', 'Medication reminders, appointments, shopping, mobility, and digital coaching.'],
        ['Family and communication', 'Family message assistance, intergenerational translation, important dates, and shared memory.'],
        ['Safety and health', 'Fraud detection, risk alerts, visit preparation, and health-record organization.'],
        ['Providers and enterprises', 'Staff copilots, resident companions, service QA, and scenario-specific agents.'],
      ],
      modules: ['Fraud protection', 'Digital coach', 'Family messenger', 'Doctor visit assistant', 'Memory sharing', 'Learning companion', 'Staff copilot', 'Resident companion'],
      model: ['Device or service entry', 'SkillHub orchestration', 'Models and knowledge', 'Users, families, providers'],
    },
  },
  community: {
    zh: {
      eyebrow: 'COMMUNITY', title: '长寿社会知识网络', subtitle: '把真实经验、行业资源与试点场景连接起来。',
      intro: 'Community 不只是会员社区，而是 Deerlight 的用户研究网络、合作伙伴网络、资源地图和行业情报基础设施。',
      sections: [
        ['参与者', '老年用户、成年子女、专家、研究者、养老机构、硬件公司、AI 公司、投资人与公共部门。'],
        ['共同产出', '用户洞察、场景案例、行业地图、研究报告、产品共创、试点项目与政策建议。'],
        ['资源地图', '组织、产品、专家、试点地点、研究与数据集的可检索网络。'],
        ['为什么加入', '更快找到真实需求、可信合作方、试点场景与长期行业机会。'],
      ],
      modules: ['Focus Group', '用户访谈', '行业圆桌', '产品共创营', '试点招募', '案例数据库', '企业与机构地图', '专家网络'],
      model: ['真实用户与家庭', '研究与知识沉淀', '产业伙伴与资源', '试点与规模化'],
    },
    en: {
      eyebrow: 'COMMUNITY', title: 'The aging intelligence network', subtitle: 'Connect lived experience, industry resources, and pilot environments.',
      intro: 'Community is not only a membership space. It is Deerlight’s user-research network, partner graph, resource map, and industry intelligence layer.',
      sections: [
        ['Who participates', 'Older adults, adult children, experts, researchers, providers, device makers, AI companies, investors, and public organizations.'],
        ['What we create together', 'Customer insights, field cases, industry maps, research, product co-design, pilots, and policy recommendations.'],
        ['Resource map', 'A searchable network of organizations, products, experts, pilot sites, research, and datasets.'],
        ['Why join', 'Find real needs, trusted partners, pilot environments, and long-term market opportunities faster.'],
      ],
      modules: ['Focus groups', 'User interviews', 'Industry roundtables', 'Co-design programs', 'Pilot recruitment', 'Case library', 'Company map', 'Expert network'],
      model: ['People and families', 'Research and knowledge', 'Industry partners', 'Pilots and scale'],
    },
  },
  labs: {
    zh: {
      eyebrow: 'LABS', title: '面向未来百年的研究与试点', subtitle: '在产品固化之前，先验证人、技术与制度之间的新关系。',
      intro: 'Labs 聚焦记忆、身份、陪伴、无障碍与长寿社会基础设施，通过研究、原型、咨询和试点推动新产品落地。',
      sections: [
        ['研究主题', '数字记忆、身份连续性、AI 陪伴、长期 Agent、无障碍交互、家庭协作与可信 AI。'],
        ['工作方式', '趋势研究、用户研究、服务蓝图、快速原型、现场试点与效果评估。'],
        ['合作模式', '联合研究、企业咨询、创新工作坊、产品概念验证与场景试点。'],
        ['输出', '研究报告、产品原型、评估框架、行业建议与新业务机会。'],
      ],
      modules: ['记忆界面', '陪伴 Agent', '无障碍 AI', '长寿身份系统', '服务设计', '行业研究', '企业创新咨询', '试点评估'],
      model: ['问题与趋势', '研究与原型', '真实场景试点', '产品化与行业扩散'],
    },
    en: {
      eyebrow: 'LABS', title: 'Research and pilots for the next 100 years', subtitle: 'Test new relationships between people, technology, and institutions before they harden.',
      intro: 'Labs explores memory, identity, companionship, accessibility, and longevity infrastructure through research, prototypes, consulting, and pilots.',
      sections: [
        ['Research themes', 'Digital memory, identity continuity, AI companionship, long-lived agents, accessibility, family collaboration, and trustworthy AI.'],
        ['How we work', 'Trend research, user research, service blueprints, rapid prototypes, field pilots, and evaluation.'],
        ['Engagement models', 'Joint research, enterprise consulting, innovation workshops, proofs of concept, and scenario pilots.'],
        ['Outputs', 'Research reports, product prototypes, evaluation frameworks, industry recommendations, and new business opportunities.'],
      ],
      modules: ['Memory interfaces', 'Companion agents', 'Accessible AI', 'Long-life identity', 'Service design', 'Industry research', 'Innovation consulting', 'Pilot evaluation'],
      model: ['Problems and trends', 'Research and prototypes', 'Real-world pilots', 'Products and diffusion'],
    },
  },
}

function LanguageToggle({ lang, setLang }: { lang: Lang; setLang: (lang: Lang) => void }) {
  return <div className="lang-toggle"><button className={lang === 'zh' ? 'active' : ''} onClick={() => setLang('zh')}>中</button><button className={lang === 'en' ? 'active' : ''} onClick={() => setLang('en')}>EN</button></div>
}

function Header({ lang, setLang, dark = false }: { lang: Lang; setLang: (lang: Lang) => void; dark?: boolean }) {
  const t = copy[lang]
  return <header className={`site-header ${dark ? 'dark' : ''}`}>
    <a className="brand" href="/">Deerlight.</a>
    <nav>
      <a href="/#ecosystem">{t.nav.ecosystem}</a>
      <a href="/#products">{t.nav.products}</a>
      <a href="https://deerlight.cn">{t.nav.memoir}</a>
      <a href="mailto:hello@deerlight.cn">{t.nav.contact}</a>
    </nav>
    <LanguageToggle lang={lang} setLang={setLang} />
  </header>
}

function Home({ lang, setLang }: { lang: Lang; setLang: (lang: Lang) => void }) {
  const t = copy[lang]
  const cards = [
    { key: 'memoir', href: 'https://deerlight.cn', video: 'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260702_102608_5fa1187d-9ac6-44fb-82ab-54376200abc0.mp4' },
    { key: 'silver', href: '/silver-os.html', video: 'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260625_174131_395bc785-bb21-4e65-abf6-27c56f0764b6.mp4' },
    { key: 'skillhub', href: '/skillhub.html', video: 'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260525_052706_d2e390fd-1846-4fe7-a4d8-8d2f1c875358.mp4' },
    { key: 'community', href: '/community.html', video: 'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260711_090308_1dd0cea7-f9ba-4db4-8147-c7d746061c9e.mp4' },
    { key: 'labs', href: '/labs.html', video: 'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260702_102608_5fa1187d-9ac6-44fb-82ab-54376200abc0.mp4' },
  ] as const
  return <main>
    <section className="hero" id="ecosystem">
      <video autoPlay muted loop playsInline src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260403_050628_c4e32401-fab4-4a27-b7a8-6e9291cd5959.mp4" />
      <div className="hero-overlay" />
      <Header lang={lang} setLang={setLang} />
      <div className="hero-content">
        <p className="eyebrow">{t.heroEyebrow}</p>
        <h1>{t.heroTitle1}<br /><em>{t.heroTitle2}</em></h1>
        <p className="hero-desc">{t.heroDesc}</p>
        <a className="pill light" href="#products">{t.explore} <span>↘</span></a>
      </div>
    </section>

    <section className="about cream">
      <div className="narrow center"><p className="lead">{t.aboutLead}</p></div>
      <div className="divider"><span /><i /><span /></div>
      <div className="about-grid"><div className="mark">D<br /><small>AGING<br />AMPLIFIED</small></div><div><h2>{t.aboutTitle}</h2><p>{t.aboutBody}</p></div></div>
    </section>

    <section className="products-section" id="products">
      <div className="section-heading"><p className="eyebrow">DEERLIGHT ECOSYSTEM</p><h2>{t.ecosystemTitle}</h2><p>{t.ecosystemDesc}</p></div>
      <div className="product-grid">
        {cards.map((card, index) => {
          const [name, label, desc] = t.cards[card.key]
          return <a className="product-card" key={card.key} href={card.href}>
            <div className="product-media"><video autoPlay muted loop playsInline src={card.video} /></div>
            <div className="product-meta"><span>0{index + 1}</span><span>↗</span></div>
            <p className="micro">{label}</p><h3>{name}</h3><p>{desc}</p>
          </a>
        })}
      </div>
    </section>

    <section className="closing"><p className="eyebrow">WORK WITH DEERLIGHT</p><h2>{t.ctaTitle}</h2><p>{t.ctaBody}</p><a className="pill light" href="mailto:hello@deerlight.cn">{t.cta} ↗</a></section>
    <footer><span>© 2026 Deerlight</span><span>AI for Aging</span></footer>
  </main>
}

function ProductPage({ productKey, lang, setLang }: { productKey: ProductKey; lang: Lang; setLang: (lang: Lang) => void }) {
  const p = productContent[productKey][lang]
  return <main className={`detail detail-${productKey}`}>
    <section className="detail-hero">
      <Header lang={lang} setLang={setLang} dark />
      <div className="detail-hero-inner"><p className="eyebrow">{p.eyebrow}</p><h1>{p.title}</h1><p>{p.subtitle}</p></div>
    </section>
    <section className="detail-intro"><p>{p.intro}</p></section>
    <section className="detail-sections">{p.sections.map(([title, body]: string[], i: number) => <article key={title}><span>0{i + 1}</span><h2>{title}</h2><p>{body}</p></article>)}</section>
    <section className="module-section"><div><p className="eyebrow">CAPABILITIES</p><h2>{lang === 'zh' ? '核心能力模块' : 'Core capability modules'}</h2></div><div className="module-grid">{p.modules.map((m: string) => <div key={m}>{m}</div>)}</div></section>
    <section className="architecture"><p className="eyebrow">HOW IT WORKS</p><h2>{lang === 'zh' ? '从入口到生态的完整链路' : 'From entry point to ecosystem'}</h2><div className="flow">{p.model.map((m: string, i: number) => <div key={m}><span>{i + 1}</span><strong>{m}</strong>{i < p.model.length - 1 && <b>→</b>}</div>)}</div></section>
    <section className="closing"><h2>{lang === 'zh' ? '一起把概念变成真实场景' : 'Turn the concept into a real-world pilot'}</h2><a className="pill light" href="mailto:hello@deerlight.cn">{lang === 'zh' ? '联系 Deerlight' : 'Contact Deerlight'} ↗</a></section>
    <footer><a href="/">← Deerlight.</a><span>AI for Aging</span></footer>
  </main>
}

export default function App() {
  const [lang, setLangState] = useState<Lang>(() => (localStorage.getItem('deerlight-lang') as Lang) || 'zh')
  const setLang = (value: Lang) => { setLangState(value); localStorage.setItem('deerlight-lang', value); document.documentElement.lang = value === 'zh' ? 'zh-CN' : 'en' }
  useEffect(() => { document.documentElement.lang = lang === 'zh' ? 'zh-CN' : 'en' }, [lang])
  const path = window.location.pathname
  const key = useMemo<ProductKey | null>(() => path.includes('silver-os') ? 'silver-os' : path.includes('skillhub') ? 'skillhub' : path.includes('community') ? 'community' : path.includes('labs') ? 'labs' : null, [path])
  return key ? <ProductPage productKey={key} lang={lang} setLang={setLang} /> : <Home lang={lang} setLang={setLang} />
}

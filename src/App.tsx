import { useEffect, useMemo, useState } from 'react'

type Lang = 'zh' | 'en'
type ProductKey = 'silver-os' | 'skillhub' | 'community' | 'labs'

const copy = {
  zh: {
    nav: { ecosystem: '生态', products: '产品', memoir: '回忆录', contact: '联系' },
    heroTitle1: '让科技延展生命，',
    heroTitle2: '而不是复杂度',
    heroDesc: 'Deerlight 构建面向长寿时代的 AI 产品、能力与基础设施，让技术承担认知负担，让人保有选择、尊严与连接。',
    heroChip: '更少负担，更多人生',
    explore: '探索产品',
    aboutLead: '我们打造与人生后半程共同前进的 AI 系统，而不是凌驾于人之上的技术。',
    hello: '联系我们',
    aboutCta: '探索生态',
    aboutTitle: '我们为更长的人生构建 AI 产品、能力与基础设施。更重要的是，在技术日益复杂的时代，帮助每个人继续掌握自己的生活。',
    productTitle: '扩展人生，而不是扩展复杂度。',
    productIntro: '从回忆录产品出发，逐步形成银龄操作系统、能力市场、知识网络与研究平台。',
    workTitle: '一起构建长寿社会的 AI 基础设施',
    workBody: '合作试点、产品共创、行业研究与能力接入。',
    workCta: '开始合作',
    products: {
      silver: ['SilverOS', '银龄 AI 操作系统', '让身份、记忆、家庭、设备、安全与 Agent 能力跨设备协同。'],
      skillhub: ['SkillHub', '银龄 AI 能力市场', '把经过验证的 AI 能力模块化，连接家庭、硬件厂商、服务机构与开发者。'],
      community: ['Community', '长寿社会知识网络', '汇聚用户、家庭、专家、研究者、机构与产业伙伴。'],
      labs: ['Labs', '研究与试点', '探索记忆、身份、陪伴、无障碍交互与人机关系的下一代产品。'],
    },
  },
  en: {
    nav: { ecosystem: 'Ecosystem', products: 'Products', memoir: 'Memoir', contact: 'Contact' },
    heroTitle1: 'Technology that expands life,',
    heroTitle2: 'not complexity',
    heroDesc: 'Deerlight builds AI products, skills, and infrastructure for a longevity society—so technology carries cognitive weight while people keep agency, dignity, and connection.',
    heroChip: 'Less cognitive load. More life.',
    explore: 'Explore',
    aboutLead: 'We craft AI systems that move with later life, not over it.',
    hello: 'Say hello',
    aboutCta: 'Explore ecosystem',
    aboutTitle: 'We make AI products, skills, and infrastructure for a longer life. More importantly, we help people keep agency as technology becomes more complex.',
    productTitle: 'Technology that expands life, not complexity.',
    productIntro: 'Starting with memoir, Deerlight grows toward an operating layer, a skill marketplace, an intelligence network, and a research platform.',
    workTitle: 'Build the AI infrastructure for longer lives with us',
    workBody: 'Pilots, product co-creation, industry research, and capability integration.',
    workCta: 'Start a conversation',
    products: {
      silver: ['SilverOS', 'An AI operating layer for aging', 'Coordinate identity, memory, family, devices, safety, and agents across the full journey.'],
      skillhub: ['SkillHub', 'Installable intelligence for aging', 'Turn validated AI capabilities into modular skills for families, device makers, service providers, and developers.'],
      community: ['Community', 'The aging intelligence network', 'Connect older adults, families, experts, researchers, institutions, and industry partners.'],
      labs: ['Labs', 'Research and pilots', 'Explore memory, identity, companionship, accessibility, and human–AI relationships.'],
    },
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

const featureVideos = {
  silver: 'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260702_102608_5fa1187d-9ac6-44fb-82ab-54376200abc0.mp4',
  skillhub: 'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260625_174131_395bc785-bb21-4e65-abf6-27c56f0764b6.mp4',
  community: 'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260525_052706_d2e390fd-1846-4fe7-a4d8-8d2f1c875358.mp4',
  labs: 'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260711_090308_1dd0cea7-f9ba-4db4-8147-c7d746061c9e.mp4',
}

function LanguageToggle({ lang, setLang, dark = false }: { lang: Lang; setLang: (lang: Lang) => void; dark?: boolean }) {
  return <div className={`lang-toggle ${dark ? 'lang-dark' : ''}`}><button className={lang === 'zh' ? 'active' : ''} onClick={() => setLang('zh')}>中</button><button className={lang === 'en' ? 'active' : ''} onClick={() => setLang('en')}>EN</button></div>
}

function HomeNav({ lang, setLang }: { lang: Lang; setLang: (lang: Lang) => void }) {
  const [open, setOpen] = useState(false)
  const t = copy[lang]
  return <>
    <div className="floating-nav">
      <a href="/" className="floating-brand">Deerlight.</a>
      <button className={`menu-button ${open ? 'open' : ''}`} onClick={() => setOpen(!open)} aria-label="Menu"><i /><i /></button>
      <div className={`floating-menu ${open ? 'show' : ''}`}>
        <a href="#ecosystem">{t.nav.ecosystem}</a>
        <a href="#products">{t.nav.products}</a>
        <a href="https://deerlight.cn">{t.nav.memoir}</a>
        <a href="mailto:hello@deerlight.cn">{t.nav.contact}</a>
      </div>
    </div>
    <div className="home-language"><LanguageToggle lang={lang} setLang={setLang} /></div>
  </>
}

function DetailHeader({ lang, setLang }: { lang: Lang; setLang: (lang: Lang) => void }) {
  const t = copy[lang]
  return <header className="site-header dark"><a className="brand" href="/">Deerlight.</a><nav><a href="/#ecosystem">{t.nav.ecosystem}</a><a href="/#products">{t.nav.products}</a><a href="https://deerlight.cn">{t.nav.memoir}</a><a href="mailto:hello@deerlight.cn">{t.nav.contact}</a></nav><LanguageToggle lang={lang} setLang={setLang} dark /></header>
}

function Home({ lang, setLang }: { lang: Lang; setLang: (lang: Lang) => void }) {
  const t = copy[lang]
  const products = [
    { key: 'silver' as const, href: '/silver-os.html', video: featureVideos.silver },
    { key: 'skillhub' as const, href: '/skillhub.html', video: featureVideos.skillhub },
    { key: 'community' as const, href: '/community.html', video: featureVideos.community },
    { key: 'labs' as const, href: '/labs.html', video: featureVideos.labs },
  ]
  return <main className="home-page">
    <section className="classic-hero" id="ecosystem">
      <video autoPlay muted loop playsInline src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260711_090308_1dd0cea7-f9ba-4db4-8147-c7d746061c9e.mp4" />
      <div className="classic-overlay" />
      <HomeNav lang={lang} setLang={setLang} />
      <div className="classic-hero-content">
        <h1>{t.heroTitle1}<br /><em>{t.heroTitle2}</em></h1>
        <p>{t.heroDesc}</p>
        <div className="hero-chip"><span>{t.heroChip}</span><a href="#products">{t.explore}</a></div>
      </div>
    </section>

    <section className="classic-about">
      <div className="about-top">
        <p>{t.aboutLead}</p>
        <div className="about-actions"><a className="round-action primary" href="mailto:hello@deerlight.cn"><b>✉</b>{t.hello}</a><a className="round-action muted" href="#products"><b>＋</b>{t.aboutCta}</a></div>
      </div>
      <div className="classic-divider"><span /><i /><span /></div>
      <div className="classic-about-grid">
        <div className="deer-mark"><strong>✣</strong><small>AGING<br />AMPLIFIED</small></div>
        <h2>{t.aboutTitle}</h2>
      </div>
    </section>

    <section className="classic-products" id="products">
      <div className="products-layout">
        <aside className="products-sidebar">
          <div><p className="eyebrow">DEERLIGHT ECOSYSTEM</p><h2>{t.productTitle}</h2><p>{t.productIntro}</p></div>
          <nav>{products.map((item) => <a key={item.key} href={`#card-${item.key}`}>{t.products[item.key][0]}</a>)}</nav>
          <div className="partner-box"><p>{t.workBody}</p><a href="mailto:hello@deerlight.cn">{t.workCta} ↗</a></div>
        </aside>
        <div className="vertical-products">
          {products.map((item, index) => {
            const [name, label, desc] = t.products[item.key]
            return <article className="vertical-card" id={`card-${item.key}`} key={item.key}>
              <div className="vertical-card-head"><div><span className="mini-mark">✣</span><p>{label}</p><h3>{name}</h3></div><a href={item.href}>↗</a></div>
              <div className="vertical-media"><video autoPlay muted loop playsInline src={item.video} /></div>
              <div className="vertical-card-foot"><span>0{index + 1}</span><p>{desc}</p></div>
            </article>
          })}
        </div>
      </div>
    </section>

    <section className="classic-closing"><p className="eyebrow">WORK WITH DEERLIGHT</p><h2>{t.workTitle}</h2><p>{t.workBody}</p><a href="mailto:hello@deerlight.cn">{t.workCta} ↗</a></section>
    <footer><span>© 2026 Deerlight</span><span>AI for Aging</span></footer>
  </main>
}

function ProductPage({ productKey, lang, setLang }: { productKey: ProductKey; lang: Lang; setLang: (lang: Lang) => void }) {
  const p = productContent[productKey][lang]
  return <main className={`detail detail-${productKey}`}>
    <section className="detail-hero"><DetailHeader lang={lang} setLang={setLang} /><div className="detail-hero-inner"><p className="eyebrow">{p.eyebrow}</p><h1>{p.title}</h1><p>{p.subtitle}</p></div></section>
    <section className="detail-intro"><p>{p.intro}</p></section>
    <section className="detail-sections">{p.sections.map(([title, body]: string[], i: number) => <article key={title}><span>0{i + 1}</span><h2>{title}</h2><p>{body}</p></article>)}</section>
    <section className="module-section"><div><p className="eyebrow">CAPABILITIES</p><h2>{lang === 'zh' ? '核心能力模块' : 'Core capability modules'}</h2></div><div className="module-grid">{p.modules.map((m: string) => <div key={m}>{m}</div>)}</div></section>
    <section className="architecture"><p className="eyebrow">HOW IT WORKS</p><h2>{lang === 'zh' ? '从入口到生态的完整链路' : 'From entry point to ecosystem'}</h2><div className="flow">{p.model.map((m: string, i: number) => <div key={m}><span>{i + 1}</span><strong>{m}</strong>{i < p.model.length - 1 && <b>→</b>}</div>)}</div></section>
    <section className="classic-closing"><h2>{lang === 'zh' ? '一起把概念变成真实场景' : 'Turn the concept into a real-world pilot'}</h2><a href="mailto:hello@deerlight.cn">{lang === 'zh' ? '联系 Deerlight' : 'Contact Deerlight'} ↗</a></section>
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

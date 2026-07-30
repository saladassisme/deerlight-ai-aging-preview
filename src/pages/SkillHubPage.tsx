import {
  BadgeCheck, BookOpen, Building2, Check, ChevronRight, Code2, Copy, CreditCard,
  HeartPulse, Home, Search, ShieldCheck, Sparkles, Store, UserRound, Users, X,
} from 'lucide-react'
import { useEffect, useMemo, useState } from 'react'
import type { Lang, SkillCategory, SkillItem } from '../data'
import { skillCategories, skills, tx } from '../data'
import { ContactBand, ProductHero, SectionTitle, SiteFooter } from '../components/ProductShell'

const copy = {
  zh: {
    heroTitle: '技能中心',
    heroStatement: '为银发智能系统、智能硬件和开发工具提供可添加、可购买、可分发的人工智能技能。',
    resident: '技能目录', categories: '生活场景', live: '可添加技能',
    galleryTitle: '技能商城',
    galleryLead: '点击任意技能，在弹窗中查看能力、对话开场白、动态演示和适用环境。',
    search: '搜索技能或生活场景', noResult: '没有找到匹配的技能。',
    add: '添加技能', added: '已添加', featured: '精选',
    creator: '创建者', worksOn: '可用于的系统', capabilities: '主要能力', starters: '对话开场白',
    preview: '对话演示', previewHint: '点击左侧任意开场白，右侧会模拟用户提问并逐字生成结果。',
    input: '用户', output: '技能', close: '关闭', price: '价格',
    planTitle: '选择订阅方案', planLead: '购买后无需注册账号，系统会生成一次性激活链接和设备绑定码。',
    monthly: '月度订阅', yearly: '年度订阅', best: '更划算', buy: '确认购买',
    successTitle: '技能已准备好', successLead: '请保存激活链接或绑定码。第一次在设备或开发工具中使用时完成绑定。',
    activationLink: '激活链接', deviceCode: '设备绑定码', copy: '复制', done: '完成',
    publishTitle: '发布你的技能',
    publishLead: '开发者、机构和服务商可开通收款、提交技能、设置价格，并发布到银发智能系统与合作硬件。',
    publisherSteps: [
      ['开通商户', '验证主体信息，绑定支付宝或其他收款渠道。'],
      ['创建技能', '填写能力、输入输出、权限、示例与责任边界。'],
      ['设置商品', '选择免费、月订阅、年订阅或机构授权。'],
      ['审核发布', '完成安全、可用性和适老体验评估后上架。'],
    ],
    openStore: '开通发布者中心',
    deliveryTitle: '一次购买，跨环境使用',
    deliveryLead: '同一份购买权益可绑定到银发智能系统、合作硬件或开发工具，不必先建立复杂的网站账号。',
    delivery: [
      ['智能硬件', '设备显示六位绑定码，用户用购买后的链接确认绑定。'],
      ['命令行与编辑器', '通过短期激活链接换取可撤销的本地访问凭证。'],
      ['银发智能系统', '购买后技能自动进入“我的技能”，在需要时由系统调用。'],
    ],
  },
  en: {
    heroTitle: 'SkillHub',
    heroStatement: 'AI skills that can be added, purchased, and distributed across SilverOS, smart devices, and developer tools.',
    resident: 'skills', categories: 'life categories', live: 'addable skills',
    galleryTitle: 'Skill marketplace',
    galleryLead: 'Open any skill to review its capabilities, conversation starters, live preview, and compatible environments.',
    search: 'Search skills or situations', noResult: 'No matching skill.',
    add: 'Add skill', added: 'Added', featured: 'Featured',
    creator: 'Creator', worksOn: 'Available on', capabilities: 'Capabilities', starters: 'Conversation starters',
    preview: 'Conversation preview', previewHint: 'Choose a starter on the left to simulate a user message and typed response on the right.',
    input: 'You', output: 'Skill', close: 'Close', price: 'Price',
    planTitle: 'Choose a subscription', planLead: 'No account required. A one-time activation link and device code are issued after purchase.',
    monthly: 'Monthly', yearly: 'Annual', best: 'Best value', buy: 'Confirm purchase',
    successTitle: 'Your skill is ready', successLead: 'Save the activation link or device code and bind it on first use.',
    activationLink: 'Activation link', deviceCode: 'Device code', copy: 'Copy', done: 'Done',
    publishTitle: 'Publish a skill',
    publishLead: 'Developers and service providers can connect payments, submit a skill, set pricing, and distribute it to SilverOS and partner devices.',
    publisherSteps: [
      ['Open merchant account', 'Verify the entity and connect Alipay or another payout channel.'],
      ['Create the skill', 'Describe capabilities, inputs, outputs, permissions, examples, and boundaries.'],
      ['Configure the offer', 'Choose free, monthly, annual, or provider licensing.'],
      ['Review and publish', 'Pass safety, usability, and accessibility review before listing.'],
    ],
    openStore: 'Open publisher center',
    deliveryTitle: 'Buy once, use across environments',
    deliveryLead: 'One entitlement can be bound to SilverOS, partner hardware, or developer tools without creating a complex website account first.',
    delivery: [
      ['Smart hardware', 'The device shows a six-digit code; the buyer confirms it using the activation link.'],
      ['CLI and editors', 'A short-lived activation link exchanges for a revocable local credential.'],
      ['SilverOS', 'The skill appears in My Skills and is invoked by the system when relevant.'],
    ],
  },
}

const categoryIcons = { 生活: Home, 家庭: Users, 安全: ShieldCheck, 健康: HeartPulse, 学习: BookOpen, 机构: Building2 }
const featuredIds = new Set([1, 3, 8])
const providerNames: Record<string, { zh: string; en: string }> = {
  'Deerlight Safety': { zh: '小鹿安全', en: 'Deerlight Safety' }, CareNote: { zh: '安心就医', en: 'CareNote' },
  Memora: { zh: '小鹿回忆录', en: 'Memora' }, 'Kindred AI': { zh: '亲情智能', en: 'Kindred AI' },
  'Deerlight Learn': { zh: '小鹿学习', en: 'Deerlight Learn' }, 'Rhythm Care': { zh: '安心节奏', en: 'Rhythm Care' },
  Wayhome: { zh: '安心出行', en: 'Wayhome' }, 'Goodday Studio': { zh: '好日子工作室', en: 'Goodday Studio' },
  Plainly: { zh: '明白说', en: 'Plainly' }, 'Mellow Motion': { zh: '轻运动', en: 'Mellow Motion' },
  Evergreen: { zh: '常青学堂', en: 'Evergreen' }, 'Home Voice': { zh: '家声', en: 'Home Voice' },
  'Harbor Living': { zh: '港湾生活', en: 'Harbor Living' }, CareOps: { zh: '照护运营', en: 'CareOps' },
  'Common Room': { zh: '共享客厅', en: 'Common Room' }, 'Deerlight Labs': { zh: '小鹿实验室', en: 'Deerlight Labs' },
  Dayline: { zh: '日程线', en: 'Dayline' },
}

type RichDetail = {
  bullets: { zh: string[]; en: string[] }
  starters: { zh: string[]; en: string[] }
  example: { zh: [string, string]; en: [string, string] }
}

const richDetails: Record<number, RichDetail> = {
  1: {
    bullets: { zh: ['识别可疑链接与仿冒网址', '发现催促、威胁和验证码索取', '给出官方核实路径与风险解释'], en: ['Detect suspicious links and impersonation', 'Flag urgency, threats, and code requests', 'Explain risk and suggest official verification'] },
    starters: { zh: ['帮我看看这条短信是真的吗', '这个转账要求安全吗', '为什么这条消息看起来可疑'], en: ['Check whether this message is real', 'Is this transfer request safe?', 'Why does this look suspicious?'] },
    example: { zh: ['“今晚前点击链接完成验证，否则账户冻结。”', '高风险：包含外部链接、强烈催促与账户威胁。请勿点击，改用官方应用或官方电话核实。'], en: ['“Verify through this link tonight or your account will be frozen.”', 'High risk: external link, urgency, and account threat. Do not click; verify in the official app or by official phone.'] },
  },
  3: {
    bullets: { zh: ['整理症状、持续时间与变化', '汇总用药和既往问题', '生成就诊时可直接提问的清单'], en: ['Organize symptoms and timeline', 'Summarize medicines and history', 'Create a practical question list'] },
    starters: { zh: ['帮我准备明天的就诊清单', '把这些症状整理给医生看', '我应该问医生哪些问题'], en: ['Prepare my visit checklist', 'Organize these symptoms for my doctor', 'What should I ask at the appointment?'] },
    example: { zh: ['“夜间咳嗽两周，走快会喘，正在服用降压药。”', '就诊摘要：症状时间线、当前用药、建议向医生确认的检查项目，以及需要立即就医的警示表现。'], en: ['“Night cough for two weeks, breathless when walking fast, taking blood-pressure medicine.”', 'Visit brief: symptom timeline, current medicine, questions about tests, and warning signs requiring urgent care.'] },
  },
  8: {
    bullets: { zh: ['从照片人物、时间和地点开始追问', '生成非虚构回忆故事草稿', '邀请家人补充并进入小鹿回忆录'], en: ['Prompt from people, time, and place', 'Create a nonfiction memory draft', 'Invite family input and send to Memora'] },
    starters: { zh: ['帮我讲讲这张老照片', '根据这段回忆写成一个故事', '接下来可以问长辈什么'], en: ['Help me tell the story of this photo', 'Turn this memory into a story', 'What should I ask next?'] },
    example: { zh: ['“1998年夏天，外公把最大的一串葡萄留给我。”', '故事草稿：从院子里的蝉声、葡萄藤下的阴影和外公假装生气的表情，写出藏在日常里的疼爱。'], en: ['“Summer 1998, Grandpa saved the biggest bunch of grapes for me.”', 'Story draft: summer sounds, shade under the vines, and affection hidden in a playful scolding.'] },
  },
}

function isFree(skill: SkillItem) {
  return skill.price.zh === '免费'
}

function getDetail(skill: SkillItem, lang: Lang): RichDetail {
  return richDetails[skill.id] ?? {
    bullets: {
      zh: [tx(skill.description, 'zh'), '输出清楚、可修改的结构化结果', '关键操作保留用户确认'],
      en: [tx(skill.description, 'en'), 'Produces clear, editable structured output', 'Keeps user confirmation for consequential actions'],
    },
    starters: {
      zh: [`帮我使用${tx(skill.name, 'zh')}`, '先告诉我需要准备什么', '给我一个简单示例'],
      en: [`Help me use ${tx(skill.name, 'en')}`, 'Tell me what information you need', 'Show me a simple example'],
    },
    example: {
      zh: [tx(skill.description, 'zh'), `${tx(skill.name, 'zh')}会根据你的目标整理信息，生成清晰结果，并给出下一步操作。`],
      en: [tx(skill.description, 'en'), `${tx(skill.name, 'en')} organizes the request, produces a clear result, and suggests the next action.`],
    },
  }
}

function ConversationPreview({ skill, lang }: { skill: SkillItem; lang: Lang }) {
  const t = copy[lang]
  const detail = getDetail(skill, lang)
  const [prompt, setPrompt] = useState('')
  const [typed, setTyped] = useState('')
  const [run, setRun] = useState(0)
  const response = detail.example[lang][1]

  useEffect(() => {
    setPrompt('')
    setTyped('')
    setRun(0)
  }, [skill.id, lang])

  useEffect(() => {
    if (run === 0) return undefined
    setTyped('')
    let index = 0
    const timer = window.setInterval(() => {
      index += 1
      setTyped(response.slice(0, index))
      if (index >= response.length) window.clearInterval(timer)
    }, 17)
    return () => window.clearInterval(timer)
  }, [run, response])

  return <div className="skill-conversation-layout">
    <div className="starter-panel">
      <h3>{t.starters}</h3>
      <p>{t.previewHint}</p>
      <div className="starter-list">
        {detail.starters[lang].map((item) => <button key={item} type="button" className={prompt === item ? 'active' : ''} onClick={() => { setPrompt(item); setRun((value) => value + 1) }}>{item}<ChevronRight size={15} /></button>)}
      </div>
    </div>
    <div className="conversation-preview">
      <div className="conversation-toolbar"><span>{t.preview}</span><i>{typed && typed.length < response.length ? '●' : '○'}</i></div>
      <div className="conversation-stream">
        {!prompt && <div className="conversation-empty"><Sparkles size={23} /><p>{t.previewHint}</p></div>}
        {prompt && <>
          <div className="chat-row user-row"><span>{t.input}</span><p>{prompt}</p></div>
          <div className="chat-row skill-row"><span>{t.output}</span><p>{typed}<b className={typed.length < response.length ? 'typing-cursor' : ''} /></p></div>
        </>}
      </div>
    </div>
  </div>
}

export default function SkillHubPage({ lang, setLang }: { lang: Lang; setLang: (lang: Lang) => void }) {
  const t = copy[lang]
  const [category, setCategory] = useState<'全部' | SkillCategory>('全部')
  const [query, setQuery] = useState('')
  const [selected, setSelected] = useState<SkillItem | null>(null)
  const [checkout, setCheckout] = useState<SkillItem | null>(null)
  const [success, setSuccess] = useState<SkillItem | null>(null)
  const [added, setAdded] = useState<number[]>([])
  const [plan, setPlan] = useState<'month' | 'year'>('year')

  const filtered = useMemo(() => {
    const normalized = query.trim().toLowerCase()
    return skills.filter((skill) => (category === '全部' || skill.category === category) && (!normalized || tx(skill.name, lang).toLowerCase().includes(normalized) || tx(skill.description, lang).toLowerCase().includes(normalized)))
  }, [category, query, lang])

  const addSkill = (skill: SkillItem) => {
    if (isFree(skill)) {
      setAdded((current) => current.includes(skill.id) ? current : [...current, skill.id])
      setSelected(null)
      setSuccess(skill)
    } else {
      setSelected(null)
      setCheckout(skill)
    }
  }

  const finishPurchase = () => {
    if (!checkout) return
    setAdded((current) => current.includes(checkout.id) ? current : [...current, checkout.id])
    setSuccess(checkout)
    setCheckout(null)
  }

  return <main className="product-page skillhub-page">
    <ProductHero lang={lang} setLang={setLang} title={t.heroTitle} statement={t.heroStatement} className="skillhub-hero">
      <div className="skillhub-orbit product-hero-visual" aria-hidden="true"><span><ShieldCheck /></span><span><HeartPulse /></span><span><Users /></span><span><BookOpen /></span><i /></div>
    </ProductHero>

    <section className="skill-stats"><div><strong>{skills.length}</strong><span>{t.resident}</span></div><div><strong>06</strong><span>{t.categories}</span></div><div><strong>{skills.length}</strong><span>{t.live}</span></div></section>

    <section className="gallery-section">
      <SectionTitle title={t.galleryTitle} lead={t.galleryLead} />
      <div className="gallery-controls"><label className="skill-search"><Search size={20} /><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder={t.search} /></label><div className="category-filter">{skillCategories.map((item) => <button key={item.key} type="button" className={category === item.key ? 'active' : ''} onClick={() => setCategory(item.key)}>{lang === 'zh' ? item.zh : item.en}</button>)}</div></div>
      {filtered.length > 0 ? <div className="skill-gallery">{filtered.map((skill) => {
        const Icon = categoryIcons[skill.category]
        const isAdded = added.includes(skill.id)
        const categoryLabel = skillCategories.find((item) => item.key === skill.category)
        return <article className={featuredIds.has(skill.id) ? 'featured' : ''} key={skill.id} onClick={() => setSelected(skill)}>
          <div className="skill-card-top"><span className="skill-icon"><Icon size={21} /></span><span className="verified">{featuredIds.has(skill.id) && <BadgeCheck size={15} />}{featuredIds.has(skill.id) ? t.featured : (lang === 'zh' ? categoryLabel?.zh : categoryLabel?.en)}</span></div>
          <h3>{tx(skill.name, lang)}</h3><p>{tx(skill.description, lang)}</p>
          <div className="skill-provider"><span>{t.creator} · {providerNames[skill.provider]?.[lang] ?? skill.provider}</span><strong>{tx(skill.price, lang)}</strong></div>
          <button className="skill-card-action" onClick={(event) => { event.stopPropagation(); isAdded ? setSelected(skill) : addSkill(skill) }}>{isAdded ? <><Check size={16} />{t.added}</> : <>{t.add}<ChevronRight size={16} /></>}</button>
        </article>
      })}</div> : <div className="empty-gallery"><Sparkles size={24} /><p>{t.noResult}</p></div>}
    </section>

    <section className="skill-delivery-section"><SectionTitle title={t.deliveryTitle} lead={t.deliveryLead} inverted /><div className="skill-delivery-grid">{t.delivery.map(([title, body], index) => { const Icon = index === 0 ? Home : index === 1 ? Code2 : Sparkles; return <article key={title}><Icon size={25} /><h3>{title}</h3><p>{body}</p></article> })}</div></section>

    <section className="publisher-section"><div className="publisher-heading"><Store size={34} /><SectionTitle title={t.publishTitle} lead={t.publishLead} /></div><div className="publisher-steps">{t.publisherSteps.map(([title, body], index) => <article key={title}><span>{String(index + 1).padStart(2, '0')}</span><h3>{title}</h3><p>{body}</p></article>)}</div><button className="publisher-cta" onClick={() => alert(lang === 'zh' ? '发布者中心原型即将开放' : 'Publisher center prototype coming next')}>{t.openStore}<ChevronRight size={18} /></button></section>

    <ContactBand lang={lang} title={lang === 'zh' ? '把真实能力带进技能中心' : 'Bring a real capability to SkillHub'} />
    <SiteFooter lang={lang} />

    {selected && <div className="market-modal-backdrop" onClick={() => setSelected(null)}><section className="market-modal" onClick={(event) => event.stopPropagation()}>
      <button className="modal-close" onClick={() => setSelected(null)} aria-label={t.close}><X /></button>
      <div className="modal-header"><span className="modal-icon">{(() => { const Icon = categoryIcons[selected.category]; return <Icon /> })()}</span><div><h2>{tx(selected.name, lang)}</h2><p>{tx(selected.description, lang)}</p></div></div>
      <div className="skill-identity-row">
        <div className="creator-identity"><span><UserRound size={18} /></span><div><small>{t.creator}</small><strong>{providerNames[selected.provider]?.[lang] ?? selected.provider}</strong></div></div>
        <div className="system-code-block"><small>{t.worksOn}</small><div><code>SilverOS</code><code>Smart Hardware</code><code>CLI</code><code>VS Code</code></div></div>
      </div>
      <div className="modal-capabilities"><h3>{t.capabilities}</h3><ul>{getDetail(selected, lang).bullets[lang].map((item) => <li key={item}>{item}</li>)}</ul></div>
      <ConversationPreview skill={selected} lang={lang} />
      <footer><div className="modal-price"><small>{t.price}</small><strong>{tx(selected.price, lang)}</strong></div><button onClick={() => addSkill(selected)}>{added.includes(selected.id) ? t.added : t.add}<ChevronRight size={17} /></button></footer>
    </section></div>}

    {checkout && <div className="market-modal-backdrop" onClick={() => setCheckout(null)}><section className="checkout-modal" onClick={(event) => event.stopPropagation()}><button className="modal-close" onClick={() => setCheckout(null)}><X /></button><CreditCard size={30} /><h2>{t.planTitle}</h2><p>{t.planLead}</p><div className="price-options"><button className={plan === 'month' ? 'active' : ''} onClick={() => setPlan('month')}><span>{t.monthly}</span><strong>¥18 / 月</strong></button><button className={plan === 'year' ? 'active' : ''} onClick={() => setPlan('year')}><em>{t.best}</em><span>{t.yearly}</span><strong>¥168 / 年</strong></button></div><button className="purchase-button" onClick={finishPurchase}>{t.buy}</button></section></div>}

    {success && <div className="market-modal-backdrop"><section className="success-modal"><span className="success-icon"><Check /></span><h2>{t.successTitle}</h2><p>{t.successLead}</p><label>{t.activationLink}<div><code>deerlight.cn/a/DL-{String(success.id).padStart(4, '0')}-7KQ2</code><button><Copy size={15} />{t.copy}</button></div></label><label>{t.deviceCode}<div><code>482 731</code><button><Copy size={15} />{t.copy}</button></div></label><button className="purchase-button" onClick={() => setSuccess(null)}>{t.done}</button></section></div>}
  </main>
}

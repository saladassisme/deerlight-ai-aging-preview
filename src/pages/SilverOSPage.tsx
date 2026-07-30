import { AppWindow, Cpu, HeartHandshake, Layers3, ShieldCheck, Smartphone, Sparkles } from 'lucide-react'
import type { Lang } from '../data'
import { media } from '../data'
import { ContactBand, ProductHero, SectionTitle, SiteFooter } from '../components/ProductShell'

const copy = {
  zh: {
    heroTitle: '银发智能系统',
    heroStatement: '让用户只需说出目标，系统负责理解、执行、解释与确认。',
    intro: '银发智能系统从安卓手机开始，把意图式首页、生活助手、安全确认、长期记忆与家人协作放进同一套体验。它不是把图标放大，而是减少用户需要理解和记住的步骤。',
    prototypeTitle: '直接体验原型',
    prototypeLead: '点击任务卡片、尝试语音入口，体验“说出目标—逐步确认—完成任务”的核心流程。',
    mvpTitle: '首个版本只做三件事',
    mvp: [
      ['看得懂', '首页只呈现此刻最重要的任务，不再要求用户寻找应用。'],
      ['说得出', '用户可以直接用语音或文字表达目标，系统一次只问一个问题。'],
      ['做得成', '涉及付款、授权和健康时停下来确认，并始终保留返回和求助。'],
    ],
    systemTitle: 'SilverOS 如何工作',
    systemLead: '技能负责完成具体任务，SilverOS 负责身份、上下文、权限、安全和跨设备协同。',
    system: [
      ['意图入口', '把“联系家人、准备复诊、检查消息”等目标放在首页。'],
      ['技能编排', '按任务调用合适的技能、服务和设备。'],
      ['信任与安全', '解释将要发生什么，并在关键动作前再次确认。'],
      ['跨设备运行', '从手机扩展到平板、电视、音箱、机器人和机构终端。'],
    ],
    deliveryTitle: '从应用到系统层',
    deliveryLead: '先用可安装应用验证体验，再与机构和硬件伙伴逐步深入。',
    delivery: [
      ['01 · 消费者版本', 'SilverOS App', '可设为默认桌面，提供意图式首页、助手、通知摘要和技能中心。'],
      ['02 · 机构版本', 'SilverOS Managed', '增加设备管理、远程配置、服务台和统一权限策略。'],
      ['03 · 原生版本', 'SilverOS Native', '与硬件厂商进入系统服务、硬件按键和出厂体验。'],
    ],
  },
  en: {
    heroTitle: 'SilverOS',
    heroStatement: 'People state the goal; the system understands, acts, explains, and confirms.',
    intro: 'SilverOS starts on Android and combines an intent-first home, daily assistance, safety checks, long-term memory, and trusted-family collaboration. It is not a larger-icon launcher; it reduces what people must understand and remember.',
    prototypeTitle: 'Try the prototype',
    prototypeLead: 'Open a task, try the voice entry point, and experience the core goal–confirmation–completion flow.',
    mvpTitle: 'The first version does three things',
    mvp: [
      ['Understandable', 'The home screen shows the most important tasks instead of a wall of apps.'],
      ['Speakable', 'People state a goal by voice or text, while the system asks one question at a time.'],
      ['Actionable', 'Payments, access, and health actions pause for confirmation and always preserve undo and help.'],
    ],
    systemTitle: 'How SilverOS works',
    systemLead: 'Skills complete tasks. SilverOS manages identity, context, permission, safety, and cross-device continuity.',
    system: [
      ['Intent entry', 'Goals such as contact family, prepare a visit, and check a message appear on the home screen.'],
      ['Skill orchestration', 'The system selects the right skill, service, and device for the task.'],
      ['Trust and safety', 'It explains what will happen and confirms consequential actions.'],
      ['Device runtime', 'The same experience can extend to tablets, TVs, speakers, robots, and provider terminals.'],
    ],
    deliveryTitle: 'From app to system layer',
    deliveryLead: 'Validate the experience as an installable app, then deepen integration with providers and device partners.',
    delivery: [
      ['01 · Consumer', 'SilverOS App', 'An optional default home with intent entry, assistance, notification digest, and skills.'],
      ['02 · Provider', 'SilverOS Managed', 'Adds device management, remote configuration, service desks, and permission policy.'],
      ['03 · Native', 'SilverOS Native', 'Works with hardware makers on system services, physical controls, and out-of-box experience.'],
    ],
  },
}

const mvpIcons = [Sparkles, HeartHandshake, ShieldCheck]
const systemIcons = [Smartphone, Layers3, ShieldCheck, Cpu]
const deliveryIcons = [AppWindow, Layers3, Cpu]

export default function SilverOSPage({ lang, setLang }: { lang: Lang; setLang: (lang: Lang) => void }) {
  const t = copy[lang]
  return <main className="product-page silver-page">
    <ProductHero lang={lang} setLang={setLang} title={t.heroTitle} statement={t.heroStatement} background={media.silverHero} className="silver-hero" />

    <section className="statement-section silver-intro"><p>{t.intro}</p></section>

    <section className="silver-prototype-section">
      <SectionTitle title={t.prototypeTitle} lead={t.prototypeLead} />
      <div className="silver-prototype-frame">
        <div className="prototype-browser-bar"><span /><span /><span /><strong>silveros://prototype</strong></div>
        <iframe src="/silveros-prototype.html" title={lang === 'zh' ? 'SilverOS 交互原型' : 'Interactive SilverOS prototype'} loading="lazy" />
      </div>
    </section>

    <section className="android-first-section compact-section">
      <SectionTitle title={t.mvpTitle} />
      <div className="delivery-path compact-cards">{t.mvp.map(([title, body], index) => { const Icon = mvpIcons[index]; return <article key={title}><Icon size={25} /><h3>{title}</h3><p>{body}</p></article> })}</div>
    </section>

    <section className="feature-section dark-section compact-section">
      <SectionTitle title={t.systemTitle} lead={t.systemLead} inverted />
      <div className="feature-grid silver-system-grid">{t.system.map(([title, body], index) => { const Icon = systemIcons[index]; return <article key={title}><Icon size={24} /><h3>{title}</h3><p>{body}</p></article> })}</div>
    </section>

    <section className="android-first-section compact-section">
      <SectionTitle title={t.deliveryTitle} lead={t.deliveryLead} />
      <div className="delivery-path">{t.delivery.map(([stage, title, body], index) => { const Icon = deliveryIcons[index]; return <article key={title}><div className="delivery-card-top"><span>{stage}</span><Icon size={24} /></div><h3>{title}</h3><p>{body}</p></article> })}</div>
    </section>

    <ContactBand lang={lang} />
    <SiteFooter lang={lang} />
  </main>
}

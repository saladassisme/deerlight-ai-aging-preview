import {
  Accessibility, AppWindow, Brain, CheckCircle2, Cpu, Eye, Fingerprint,
  HeartHandshake, Home, Layers3, LockKeyhole, MemoryStick, MessageCircle,
  MonitorSmartphone, Network, ShieldCheck, Smartphone, Sparkles, Users,
} from 'lucide-react'
import type { Lang } from '../data'
import { media } from '../data'
import { ContactBand, ProductHero, SectionTitle, SiteFooter } from '../components/ProductShell'

const copy = {
  zh: {
    heroTitle: '银发智能系统',
    heroStatement: '从安卓手机开始，为需要更多协助的银发用户构建人工智能原生的系统入口。',
    intro: '银发智能系统不是把图标放大的“老人桌面”，也不是一个孤立的智能助手。它把桌面、对话助手、生活技能、长期记忆、安全确认与家人协作放进同一个系统体验：用户只需说出目标，系统负责理解、拆解、执行和解释。',
    mvpTitle: '正在构建的首个可用版本',
    mvpLead: '首个版本不追求替代完整手机系统，而是先把最关键的日常入口做真实：看得懂、说得出、做得成、随时能撤回。',
    mvp: [
      ['意图式首页', '不再让用户寻找应用图标。首页根据时间、习惯和当前任务，呈现“联系家人”“查看通知”“安排就医”等清晰入口。'],
      ['持续可见的生活助手', '语音和文字都可以直接表达目标；助手一次只问一个问题，解释每一步，并在付款、授权和健康场景停下来确认。'],
      ['可信家人协作', '用户主动求助时，系统把当前步骤和必要信息交给指定家人；家人可以协助，但不能在后台持续监控。'],
    ],
    prototypeTitle: '首批原型与技能验证',
    prototypeLead: '系统层先与三个可操作技能联动，验证安全、健康与家庭记忆三类高价值场景。',
    prototypes: [
      ['反诈消息检查', '识别可疑链接、催促威胁、验证码与异常转账要求，并引导用户通过官方渠道核实。'],
      ['就医准备清单', '把症状、用药和担忧整理成可带去就诊的清单，但不替代医生诊断。'],
      ['照片回忆讲述', '从一张老照片开始生成追问、故事草稿和家人共写提示，连接小鹿回忆录。'],
    ],
    androidTitle: '从安卓开始，逐步深入系统层',
    androidLead: '消费者版本先以应用交付，并可设为默认桌面；机构版本加入设备管理与远程配置；原生版本再与硬件厂商进入系统服务和出厂体验。',
    delivery: [
      ['01 · 消费者版本', '银发智能系统应用', '从应用商店安装，可选择设为默认桌面。提供意图式首页、语音助手、通知摘要、可信联系人、技能中心与逐步引导。'],
      ['02 · 机构管理版本', '银发智能系统管理版', '与社区、养老机构、运营商或硬件伙伴预装，增加远程配置、服务台、设备管理与统一权限策略。'],
      ['03 · 硬件原生版本', '银发智能系统原生版', '与手机、平板、电视、音箱和机器人厂商合作，进入系统服务、硬件按键、设备配网与跨屏运行层。'],
    ],
    boundaryTitle: '普通应用能做到什么，哪些需要合作？',
    appCanTitle: '首个版本可以独立完成',
    appCan: [
      '申请成为默认桌面，重构用户每天最常用的手机入口。',
      '在用户明确开启后读取通知，并提供解释、摘要和逐步协助。',
      '通过系统调用、深层链接和合作接口连接地图、日历、出行和生活服务。',
      '在关键动作前展示对象、权限、费用与风险，并保留撤销和求助路径。',
    ],
    appNeedsTitle: '继续深入需要伙伴共同完成',
    appNeeds: [
      '完整设备策略、开机即用、远程配置与批量分发需要企业设备管理能力。',
      '硬件按键、系统设置、跨设备底层服务和出厂体验需要硬件厂商合作。',
      '支付、医疗和紧急事务必须由可信服务方与人工机制共同兜底。',
      '任何系统级权限都必须由用户明确开启，不能静默取得或绕过确认。',
    ],
    architectureTitle: '系统架构',
    architectureLead: '智能助手和技能是可调用能力；银发智能系统负责判断谁在使用、当前发生什么、允许做什么、调用哪项能力，以及何时必须停下来确认。',
    layers: [
      ['交互层', '语音、触控、视觉与实体按钮按照个人能力和当前场景动态切换。'],
      ['意图编排层', '理解用户真正想完成的事，选择正确的技能、服务与设备协同执行。'],
      ['身份与信任层', '统一管理本人、家人和服务方的角色、授权范围与关键操作确认。'],
      ['长期记忆层', '保留偏好、关系、历史和生活节奏，让体验在不同设备间连续。'],
      ['安全与解释层', '高风险动作分级处理，说明准备做什么、为什么做、如何撤回。'],
      ['设备运行层', '运行在手机、平板、电视、音箱、机器人、车机和机构终端。'],
    ],
    featuresTitle: '系统设计原则',
    featuresLead: '银发友好不是一种视觉主题，而是一套从默认设置开始的完整产品原则。',
    features: [
      ['意图优先', '首页只呈现此刻最重要的事；用户说目标，系统负责拆解步骤。'],
      ['极度易读', '字体、对比度、语速、信息密度与点击范围根据个人能力持续适配。'],
      ['随时可退', '每一步都能解释、撤销和求助，避免用户被流程锁住。'],
      ['家庭协作', '家人可以支持但不能越界；系统明确区分协助、代办与监控。'],
      ['跨设备连续', '在客厅屏幕开始的任务，可以在手机或线下服务终端继续。'],
      ['默认安全', '陌生联系人、可疑链接、异常付款与敏感授权进入更谨慎的确认路径。'],
    ],
    usersTitle: '面向谁',
    usersLead: '首批用户是使用智能手机时需要更多协助的银发人群，随后扩展到可信家人、机构服务者与硬件伙伴。',
    users: [
      ['银发用户', '在看不清、记不住步骤或担心误操作时，仍能自主完成高频任务。'],
      ['可信家人与协助者', '只在本人授权或主动求助时介入，支持但不替代、不监控。'],
      ['机构与一线服务者', '把数字服务延伸到真实场景，并保留清楚的服务与授权记录。'],
      ['手机与智能硬件伙伴', '将同一套身份、记忆、安全和技能能力带到更多屏幕。'],
    ],
    capabilityTitle: '核心能力模块',
    capabilities: ['意图式首页','连续身份','可信联系人','长期生活记忆','行动解释','通知摘要','反诈与交易保护','家庭授权中心','远程协助','无障碍自适应','跨屏任务接力','紧急协助','技能编排','人工服务转接','服务记录'],
    usageTitle: '一次完整任务如何发生',
    usageLead: '用户不需要学习新的系统语言，只需表达目标；系统在每个关键节点保持透明。',
    usage: [
      ['01', '说出目标', '“帮我安排下周三上午复诊，别太早。”'],
      ['02', '逐步确认', '一次只问一个问题，确认医院、时间偏好和谁可以协助。'],
      ['03', '组合能力', '调用预约、日历、路线、就医清单与提醒能力。'],
      ['04', '确认并执行', '把关键结果放在一屏内；涉及费用或授权时再次确认。'],
      ['05', '持续跟进', '出发前提醒、途中导航，需要时把当前步骤交给可信家人。'],
    ],
    partnersTitle: '合作对象与方式',
    partnersLead: '银发智能系统可以成为硬件的原生操作层，也可以作为现有系统之上的适老智能层。',
    partners: [
      ['手机与硬件厂商', '联合定义设备形态、系统入口和出厂级体验。'],
      ['养老与社区机构', '围绕入住、活动、沟通与服务记录开展真实场景试点。'],
      ['医疗、保险与生活服务', '接入可信服务，让复杂流程以银发友好的方式完成。'],
      ['模型与开发者伙伴', '通过标准化接口提供智能助手、技能、知识库与评估能力。'],
    ],
    models: [
      ['系统授权', '将银发智能系统作为设备或产品的原生体验层。'],
      ['开发工具接入', '在现有应用、硬件和服务中接入特定系统能力。'],
      ['联合产品', '针对特定人群与场景共同定义、研发和上市。'],
      ['真实场景试点', '在社区、机构或家庭中验证可用性与业务价值。'],
    ],
  },
  en: {
    heroTitle: 'SilverOS',
    heroStatement: 'Starting on Android phones: an AI-native system entry point for older adults who need more support.',
    intro: 'SilverOS is not a launcher with larger icons and not another isolated assistant. It combines the home screen, conversational help, skills, long-term memory, safety checks, and trusted-family collaboration. The person states the goal; the system understands, plans, acts, and explains.',
    mvpTitle: 'The first usable version',
    mvpLead: 'The MVP does not try to replace the entire phone OS. It first makes the most important daily entry points understandable, speakable, actionable, and reversible.',
    mvp: [
      ['Intent-first home', 'Instead of searching for app icons, people see clear tasks such as contact family, review notifications, or prepare for a visit.'],
      ['Persistent daily assistant', 'People state a goal by voice or text. The assistant asks one question at a time, explains each step, and pauses for health, access, or payment confirmation.'],
      ['Trusted family collaboration', 'When the user asks for help, the current step and minimum necessary context can be handed to a chosen family member without background monitoring.'],
    ],
    prototypeTitle: 'Initial prototypes and skill validation',
    prototypeLead: 'The system layer first connects with three interactive skills across safety, health, and family memory.',
    prototypes: [
      ['Scam Message Check', 'Flags suspicious links, urgency, verification-code requests, and unusual transfers, then directs users to official verification channels.'],
      ['Visit Prep', 'Organizes symptoms, medicines, and concerns into a practical appointment brief without diagnosing.'],
      ['Photo Memory Story', 'Turns one old photo into follow-up prompts, a story draft, and family co-writing cues connected to Memora.'],
    ],
    androidTitle: 'Android first, then deeper system integration',
    androidLead: 'The consumer edition begins as an app and optional default launcher. Managed and native editions extend into device administration, system services, and out-of-box hardware experiences.',
    delivery: [
      ['01 · Consumer', 'SilverOS App', 'Install from an app store and optionally set it as the default home. Includes an intent-first home, voice assistance, notification digests, trusted people, skills, and step-by-step guidance.'],
      ['02 · Provider', 'SilverOS Managed', 'Preinstalled with communities, care providers, carriers, or hardware partners, adding remote configuration, service desks, device management, and consistent permission policies.'],
      ['03 · OEM', 'SilverOS Native', 'Works with phone and AI hardware makers at the system-service, hardware-button, provisioning, and cross-screen runtime layers.'],
    ],
    boundaryTitle: 'What can the app do, and what needs partners?',
    appCanTitle: 'The first version can',
    appCan: ['Request the default Home role and redesign the daily entry point.','Use notification and accessibility capabilities after explicit consent.','Coordinate maps, calendars, mobility, and services through intents, deep links, and partner APIs.','Show recipient, access, price, and risk before consequential actions, with undo and help paths.'],
    appNeedsTitle: 'Deeper integration needs partners',
    appNeeds: ['Fleet configuration and out-of-box setup require managed-device capabilities.','Hardware buttons, system settings, cross-device services, and factory experiences require OEM integration.','Payments, health, and emergencies require trusted providers and human escalation.','System privileges must never be acquired silently or used to bypass confirmation.'],
    architectureTitle: 'System architecture',
    architectureLead: 'Assistants and skills are callable capabilities. SilverOS decides who is using the device, what is happening, what is allowed, which capability should act, and when to stop for confirmation.',
    layers: [['Interaction layer','Voice, touch, vision, and physical controls adapt to ability and context.'],['Intent orchestration','Understands the goal, then selects the right skills, services, and devices.'],['Identity and trust','Manages roles, permissions, trusted people, and confirmations.'],['Long-term memory','Carries preferences, relationships, history, and routines across devices.'],['Safety and explanation','Grades risk and explains what will happen, why, and how to undo it.'],['Device runtime','Runs across phones, tablets, TVs, speakers, robots, vehicles, and provider terminals.']],
    featuresTitle: 'System principles',
    featuresLead: 'Senior-friendly is not a visual theme. It is a complete set of product defaults.',
    features: [['Intent first','The home screen shows what matters now; the user states the goal and the system handles the steps.'],['Radically legible','Type, contrast, pace, density, and tap targets adapt to the individual.'],['Always reversible','Every step can be explained, undone, or escalated for help.'],['Family-aware','Family can support without overreaching; assistance, delegation, and monitoring stay distinct.'],['Cross-device continuity','A task started on a home display can continue on a phone or service terminal.'],['Safe by default','Unknown contacts, suspicious links, payments, and sensitive permissions receive added care.']],
    usersTitle: 'Who it serves',
    usersLead: 'The first audience is older adults who need more help using a smartphone, followed by trusted family, providers, and hardware partners.',
    users: [['Older adults','Complete frequent tasks even when text, memory load, or fear of mistakes makes a phone difficult.'],['Trusted family and helpers','Step in only after consent or a help request, without replacing or monitoring.'],['Providers and frontline teams','Extend digital services into real settings with clear service and permission records.'],['Phone and AI hardware partners','Bring the same identity, memory, safety, and skills to more screens.']],
    capabilityTitle: 'Core capability modules',
    capabilities: ['Intent-first home','Continuous identity','Trusted contacts','Long-life memory','Explainable actions','Notification digest','Fraud and payment safety','Family permissions','Remote assistance','Adaptive accessibility','Cross-screen handoff','Emergency help','Skills orchestration','Human service handoff','Service records'],
    usageTitle: 'How one task happens',
    usageLead: 'There is no new system language to learn. The person states a goal; SilverOS stays transparent at every consequential step.',
    usage: [['01','State the goal','“Plan my follow-up next Wednesday morning—not too early.”'],['02','Clarify one step at a time','Confirm the provider, time preference, and who may help.'],['03','Compose capabilities','Use booking, calendar, routing, visit prep, and reminders.'],['04','Confirm and act','Keep the key result on one screen and confirm again for cost or access.'],['05','Stay with the task','Remind before departure, guide the trip, and hand the current step to trusted family when asked.']],
    partnersTitle: 'Partners and engagement',
    partnersLead: 'SilverOS can become a native device layer or an intelligent accessibility layer over an existing system.',
    partners: [['Device makers','Co-design hardware, system entry points, and the out-of-box experience.'],['Care and community providers','Pilot move-in, activities, communication, and service-record workflows.'],['Health, insurance, and daily services','Make complex trusted services usable in a senior-friendly form.'],['Model and developer partners','Provide assistants, skills, knowledge, and evaluation through standard interfaces.']],
    models: [['System licensing','Ship SilverOS as the native experience layer of a device or product.'],['SDK and API integration','Bring selected capabilities into an existing app, device, or service.'],['Joint products','Define, build, and launch for a specific audience and setting.'],['Field pilots','Validate usability and business value in homes, communities, or institutions.']],
  },
}

const featureIcons = [Sparkles, Eye, CheckCircle2, Users, MonitorSmartphone, ShieldCheck]
const layerIcons = [Accessibility, Layers3, Fingerprint, MemoryStick, LockKeyhole, Cpu]
const userIcons = [Brain, HeartHandshake, Home, Smartphone]
const deliveryIcons = [AppWindow, Network, Cpu]

export default function SilverOSPage({ lang, setLang }: { lang: Lang; setLang: (lang: Lang) => void }) {
  const t = copy[lang]
  return <main className="product-page silver-page">
    <ProductHero lang={lang} setLang={setLang} title={t.heroTitle} statement={t.heroStatement} background={media.silverHero} className="silver-hero" />
    <section className="statement-section"><p>{t.intro}</p></section>

    <section className="android-first-section">
      <SectionTitle title={t.mvpTitle} lead={t.mvpLead} />
      <div className="delivery-path">{t.mvp.map(([title, body], index) => { const Icon = deliveryIcons[index]; return <article key={title}><div className="delivery-card-top"><span>{String(index + 1).padStart(2, '0')}</span><Icon size={24} strokeWidth={1.6} /></div><h3>{title}</h3><p>{body}</p></article> })}</div>
    </section>

    <section className="usage-section">
      <SectionTitle title={t.prototypeTitle} lead={t.prototypeLead} />
      <div className="usage-steps">{t.prototypes.map(([title, body], index) => <article key={title}><span>{String(index + 1).padStart(2, '0')}</span><h3>{title}</h3><p>{body}</p></article>)}</div>
    </section>

    <section className="android-first-section">
      <SectionTitle title={t.androidTitle} lead={t.androidLead} />
      <div className="delivery-path">{t.delivery.map(([stage, title, body], index) => { const Icon = deliveryIcons[index]; return <article key={title}><div className="delivery-card-top"><span>{stage}</span><Icon size={24} strokeWidth={1.6} /></div><h3>{title}</h3><p>{body}</p></article> })}</div>
      <div className="app-boundary"><h3>{t.boundaryTitle}</h3><div className="app-boundary-grid"><article><h4>{t.appCanTitle}</h4><ul>{t.appCan.map((item) => <li key={item}><CheckCircle2 size={18} />{item}</li>)}</ul></article><article><h4>{t.appNeedsTitle}</h4><ul>{t.appNeeds.map((item) => <li key={item}><Layers3 size={18} />{item}</li>)}</ul></article></div></div>
    </section>

    <section className="architecture-section"><SectionTitle title={t.architectureTitle} lead={t.architectureLead} /><div className="architecture-stack">{t.layers.map(([title, body], index) => { const Icon = layerIcons[index]; return <article key={title}><span>{String(index + 1).padStart(2, '0')}</span><Icon size={22} strokeWidth={1.7} /><div><h3>{title}</h3><p>{body}</p></div></article> })}</div></section>
    <section className="feature-section dark-section"><SectionTitle title={t.featuresTitle} lead={t.featuresLead} inverted /><div className="feature-grid">{t.features.map(([title, body], index) => { const Icon = featureIcons[index]; return <article key={title}><Icon size={24} strokeWidth={1.6} /><h3>{title}</h3><p>{body}</p></article> })}</div></section>
    <section className="audience-section"><SectionTitle title={t.usersTitle} lead={t.usersLead} /><div className="audience-layout"><div className="audience-image"><img src={media.seniorPhone} alt={lang === 'zh' ? '银发用户使用智能手机' : 'An older adult using a smartphone'} loading="lazy" /></div><div className="audience-list">{t.users.map(([title, body], index) => { const Icon = userIcons[index]; return <article key={title}><Icon size={25} strokeWidth={1.6} /><div><h3>{title}</h3><p>{body}</p></div></article> })}</div></div></section>
    <section className="capability-section"><SectionTitle title={t.capabilityTitle} inverted /><div className="capability-grid">{t.capabilities.map((capability, index) => <div key={capability}><span>{String(index + 1).padStart(2, '0')}</span><strong>{capability}</strong></div>)}</div></section>
    <section className="usage-section"><SectionTitle title={t.usageTitle} lead={t.usageLead} /><div className="usage-steps">{t.usage.map(([number, title, body]) => <article key={number}><span>{number}</span><h3>{title}</h3><p>{body}</p></article>)}</div></section>
    <section className="partner-section"><SectionTitle title={t.partnersTitle} lead={t.partnersLead} /><div className="partner-photo-grid"><img src={media.threeGenerations} alt="" loading="lazy" /><div className="partner-types">{t.partners.map(([title, body]) => <article key={title}><h3>{title}</h3><p>{body}</p></article>)}</div></div><div className="engagement-grid">{t.models.map(([title, body]) => <article key={title}><MessageCircle size={19} /><h3>{title}</h3><p>{body}</p></article>)}</div></section>
    <ContactBand lang={lang} />
    <SiteFooter lang={lang} />
  </main>
}

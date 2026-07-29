import {
  Accessibility,
  AppWindow,
  Brain,
  CheckCircle2,
  Cpu,
  Eye,
  Fingerprint,
  HeartHandshake,
  Home,
  Layers3,
  LockKeyhole,
  MemoryStick,
  MessageCircle,
  MonitorSmartphone,
  Network,
  ShieldCheck,
  Smartphone,
  Sparkles,
  Users,
} from 'lucide-react'
import type { Lang } from '../data'
import { media } from '../data'
import { ContactBand, ProductHero, SectionTitle, SiteFooter } from '../components/ProductShell'

const copy = {
  zh: {
    heroTitle: 'SilverOS',
    heroStatement: '从 Android 手机开始，为需要更多协助的 65+ 用户构建 AI-native 的系统入口。',
    intro: 'SilverOS 不是把图标放大的“老人桌面”，也不是又一个孤立的 AI Agent。它把桌面、助手、Skills、长期记忆、安全确认与家人协作放进同一个系统体验：用户只需表达目标，系统负责理解、拆解、执行和解释。',
    androidTitle: 'Android first',
    androidLead: 'ToC 可以先以 App 交付，但要比普通桌面应用更深：成为默认桌面和持续可见的 AI 助手；ToB 与 OEM 形态则继续向设备管理和系统服务层深入。',
    delivery: [
      ['01 · ToC App', 'SilverOS App', '用户从应用商店安装，并可选择设为默认桌面。提供意图式首页、语音助手、通知摘要、可信联系人、Skills 与逐步引导。'],
      ['02 · ToB 设备', 'SilverOS Managed', '与机构、运营商或硬件伙伴预装，结合设备管理、远程配置、服务台与统一权限策略，形成可运营的终端方案。'],
      ['03 · OEM 原生', 'SilverOS Native', '与手机及 AI 硬件厂商合作进入系统服务、硬件按键、设备配网与跨屏运行时，成为真正的操作系统层。'],
    ],
    boundaryTitle: '一个 App 能做到多深？',
    appCanTitle: '普通 Android App 可以',
    appCan: [
      '申请成为默认 Home / Launcher，重构每天最常用的入口。',
      '在用户明确开启后，使用通知读取与无障碍能力提供解释和逐步协助。',
      '通过 Intents、深链和合作方 API 调用地图、日历、出行、服务与 Skills。',
      '在关键动作前展示对象、权限、费用与风险，并保留撤销和求助路径。',
    ],
    appNeedsTitle: '需要合作才能继续深入',
    appNeeds: [
      '普通 App 不能静默取得系统权限，也不应绕过用户确认。',
      '完整设备策略、开机即用、远程配置与批量分发需要企业设备管理能力。',
      '硬件按键、系统设置、跨设备底层服务和出厂体验需要 OEM 或系统级合作。',
      '支付、医疗和紧急事务必须由可信服务方与人工机制共同兜底。',
    ],
    architectureTitle: '系统架构',
    architectureLead: 'Agent 是可调用的能力；SilverOS 决定谁在使用、此刻发生什么、允许做什么、由哪个 Skill 执行，以及何时必须停下来确认。',
    layers: [
      ['交互层', '大字并不是终点。语音、触控、视觉与实体按钮按照能力和场景动态切换。'],
      ['意图与编排层', '理解用户真正想完成的事，选择正确的 Skill、Agent 与设备协同执行。'],
      ['身份与信任层', '统一管理本人、家人、服务方的角色、授权范围与关键操作确认。'],
      ['长期记忆层', '保留偏好、关系、历史与生活节奏，让体验在不同设备间连续。'],
      ['安全与解释层', '高风险动作分级处理，说明系统准备做什么、为什么做、如何撤回。'],
      ['设备运行层', '植入手机、平板、电视、音箱、机器人、车机和机构终端。'],
    ],
    featuresTitle: '系统特征',
    featuresLead: '银发友好不是视觉主题，而是从系统默认值开始的完整设计原则。',
    features: [
      ['意图优先', '首页只呈现此刻最重要的事；用户说目标，系统负责拆解步骤。'],
      ['极度易读', '字体、对比度、语速、信息密度与点击范围根据个人能力持续适配。'],
      ['随时可退', '每一步都能解释、撤销和求助，避免用户被流程锁住。'],
      ['家庭协作', '家人可以支持但不能越界；系统明确区分协助、代办与监控。'],
      ['跨设备连续', '在客厅屏幕开始的任务，可以在手机或线下服务终端无缝继续。'],
      ['默认安全', '陌生联系人、可疑链接、异常付款与敏感授权进入更谨慎的确认路径。'],
    ],
    usersTitle: '面向谁',
    usersLead: '首批用户非常明确：65 岁以上、使用智能手机时需要更多协助的人。系统随后扩展给家人、机构与更多希望降低数字负担的用户。',
    users: [
      ['首批用户 · 65+', '在看不清、记不住步骤、容易担心误操作时，仍能自主完成高频任务。'],
      ['可信家人与协助者', '只在本人授权或主动求助时介入，支持但不替代、不监控。'],
      ['机构与一线服务者', '把数字服务延伸到真实场景，并保留清楚的服务与授权记录。'],
      ['手机与 AI 硬件伙伴', '将同一套身份、记忆、安全和 Skills 能力带到更多屏幕。'],
    ],
    capabilityTitle: '核心能力模块',
    capabilities: [
      '意图式首页',
      '连续身份',
      '可信联系人',
      '长期生活记忆',
      'Agent 行动解释',
      '通知摘要',
      '反诈与交易保护',
      '家庭授权中心',
      '远程协助',
      '无障碍自适应',
      '跨屏任务接力',
      '紧急协助',
      'Skills 编排',
      '人工服务转接',
      '服务记录',
    ],
    usageTitle: '用户如何使用',
    usageLead: '不用学习一个新的系统语言。用户只需表达目标，SilverOS 在关键节点保持透明。',
    usage: [
      ['01', '说出目标', '“帮我安排下周三上午复诊，别太早。”'],
      ['02', '系统澄清', '用一问一答确认医院、医生、时间偏好和谁可以协助。'],
      ['03', '组合 Skills', '调用预约、日历、路线、就医清单与提醒能力。'],
      ['04', '确认并执行', '把关键结果放在一屏内；涉及费用或授权时再次确认。'],
      ['05', '持续跟进', '出发前提醒、途中导航，需要时把当前步骤交给可信家人。'],
    ],
    partnersTitle: '合作对象与方式',
    partnersLead: 'SilverOS 可以成为硬件的原生操作层，也可以作为现有系统之上的适老智能层。',
    partners: [
      ['手机与硬件厂商', '联合定义设备形态、系统入口和出厂级体验。'],
      ['养老与社区机构', '围绕入住、活动、沟通与服务记录开展场景试点。'],
      ['医疗、保险与生活服务', '接入可信服务，让复杂流程以银发友好的方式完成。'],
      ['模型与开发者伙伴', '通过标准化接口提供 Agent、Skill、知识库与评估能力。'],
    ],
    models: [
      ['系统授权', '将 SilverOS 作为设备或产品的原生体验层。'],
      ['SDK / API 接入', '在现有 App、硬件和服务中接入特定系统能力。'],
      ['联合产品', '针对特定人群与场景共同定义、研发和上市。'],
      ['真实场景试点', '在社区、机构或家庭中验证可用性与业务价值。'],
    ],
  },
  en: {
    heroTitle: 'SilverOS',
    heroStatement: 'Starting on Android phones: an AI-native system entry point for people 65+ who need more support.',
    intro: 'SilverOS is not a launcher with larger icons, and it is not another isolated AI agent. It brings the home screen, assistant, skills, long-term memory, safety checks, and trusted-family collaboration into one system experience. The person states the goal; the system understands, plans, acts, and explains.',
    androidTitle: 'Android first',
    androidLead: 'The consumer experience can begin as an app, but it goes deeper than a typical launcher: it becomes the default home and a persistent AI assistant. Provider and OEM editions can then move into device management and native system services.',
    delivery: [
      ['01 · Consumer', 'SilverOS App', 'Install from an app store and optionally set it as the default home. Includes an intent-first home, voice assistance, notification digests, trusted people, skills, and step-by-step guidance.'],
      ['02 · Provider', 'SilverOS Managed', 'Preinstalled with providers, carriers, or device partners, adding managed configuration, service desks, remote support, and consistent permission policies.'],
      ['03 · OEM', 'SilverOS Native', 'Works with phone and AI hardware makers at the system-service, hardware-button, provisioning, and cross-screen runtime layers.'],
    ],
    boundaryTitle: 'How deep can an app go?',
    appCanTitle: 'A standard Android app can',
    appCan: [
      'Request the Home / Launcher role and redesign the most-used entry point.',
      'Use notification and accessibility capabilities after the person explicitly enables them.',
      'Coordinate maps, calendars, mobility, services, and skills through intents, deep links, and partner APIs.',
      'Show the recipient, access, price, and risk before consequential actions, with undo and help paths.',
    ],
    appNeedsTitle: 'Deeper integration needs partners',
    appNeeds: [
      'A normal app cannot silently acquire system privileges or bypass confirmation.',
      'Out-of-box setup, fleet configuration, and policy control require managed-device capabilities.',
      'Hardware buttons, system settings, cross-device services, and factory experience require OEM or system-level integration.',
      'Payments, health, and emergencies need trusted providers and human escalation—not automation alone.',
    ],
    architectureTitle: 'System architecture',
    architectureLead: 'Agents are callable capabilities. SilverOS decides who is using the device, what is happening now, what is allowed, which skill should act, and when the system must stop for confirmation.',
    layers: [
      ['Interaction layer', 'Voice, touch, vision, and physical controls adapt to ability and context—not just larger type.'],
      ['Intent orchestration', 'Understands the goal, then selects the right skills, agents, and devices to complete it.'],
      ['Identity and trust', 'Manages roles, permissions, trusted people, and confirmations for consequential actions.'],
      ['Long-term memory', 'Carries preferences, relationships, history, and routines continuously across devices.'],
      ['Safety and explanation', 'Grades risk and explains what will happen, why, and how to undo it.'],
      ['Device runtime', 'Embeds in phones, tablets, TVs, speakers, robots, vehicles, and provider terminals.'],
    ],
    featuresTitle: 'System characteristics',
    featuresLead: 'Senior-friendly is not a visual theme. It is a complete set of system defaults.',
    features: [
      ['Intent first', 'The home screen shows what matters now; the user states the goal and the system handles the steps.'],
      ['Radically legible', 'Type, contrast, pace, density, and tap targets adapt to the individual.'],
      ['Always reversible', 'Every step can be explained, undone, or escalated for help.'],
      ['Family-aware', 'Family can support without overreaching; assistance, delegation, and monitoring stay distinct.'],
      ['Cross-device continuity', 'A task started on a home display can continue on a phone or service terminal.'],
      ['Safe by default', 'Unknown contacts, suspicious links, payments, and sensitive permissions receive added care.'],
    ],
    usersTitle: 'Who it serves',
    usersLead: 'The first audience is explicit: people over 65 who need more help using a smartphone. The system then extends to trusted family, providers, and anyone who wants less digital burden.',
    users: [
      ['First users · 65+', 'Complete frequent tasks even when text, memory load, or fear of mistakes makes a phone difficult.'],
      ['Trusted family and helpers', 'Step in only after consent or a help request—supporting without replacing or monitoring.'],
      ['Providers and frontline teams', 'Extend digital services into real settings with clear service and permission records.'],
      ['Phone and AI hardware partners', 'Bring the same identity, memory, safety, and skills to more screens.'],
    ],
    capabilityTitle: 'Core capability modules',
    capabilities: [
      'Intent-first home',
      'Continuous identity',
      'Trusted contacts',
      'Long-life memory',
      'Explainable actions',
      'Notification digest',
      'Fraud and payment safety',
      'Family permissions',
      'Remote assistance',
      'Adaptive accessibility',
      'Cross-screen handoff',
      'Emergency help',
      'Skills orchestration',
      'Human service handoff',
      'Service records',
    ],
    usageTitle: 'How people use it',
    usageLead: 'There is no new system language to learn. The person states a goal; SilverOS stays transparent at every consequential step.',
    usage: [
      ['01', 'State the goal', '“Plan my follow-up next Wednesday morning—not too early.”'],
      ['02', 'Clarify', 'Confirm the provider, time preference, and who may help through one question at a time.'],
      ['03', 'Compose skills', 'Use booking, calendar, routing, visit prep, and reminder capabilities.'],
      ['04', 'Confirm and act', 'Keep the key result on one screen; confirm again for cost or access.'],
      ['05', 'Stay with the task', 'Remind before departure, guide the trip, and hand the current step to trusted family when asked.'],
    ],
    partnersTitle: 'Partners and engagement',
    partnersLead: 'SilverOS can become a native device layer or an intelligent accessibility layer over an existing system.',
    partners: [
      ['Device makers', 'Co-design hardware, system entry points, and the out-of-box experience.'],
      ['Care and community providers', 'Pilot move-in, activities, communication, and service-record workflows.'],
      ['Health, insurance, and daily services', 'Make complex trusted services usable in a senior-friendly form.'],
      ['Model and developer partners', 'Provide agents, skills, knowledge, and evaluation through standard interfaces.'],
    ],
    models: [
      ['System licensing', 'Ship SilverOS as the native experience layer of a device or product.'],
      ['SDK / API integration', 'Bring selected system capabilities into an existing app, device, or service.'],
      ['Joint products', 'Define, build, and launch for a specific audience and setting.'],
      ['Field pilots', 'Validate usability and business value in homes, communities, or institutions.'],
    ],
  },
}

const featureIcons = [Sparkles, Eye, CheckCircle2, Users, MonitorSmartphone, ShieldCheck]
const layerIcons = [Accessibility, Layers3, Fingerprint, MemoryStick, LockKeyhole, Cpu]
const userIcons = [Brain, HeartHandshake, Home, Smartphone]
const deliveryIcons = [AppWindow, Network, Cpu]

export default function SilverOSPage({ lang, setLang }: { lang: Lang; setLang: (lang: Lang) => void }) {
  const t = copy[lang]
  return (
    <main className="product-page silver-page">
      <ProductHero
        lang={lang}
        setLang={setLang}
        title={t.heroTitle}
        statement={t.heroStatement}
        background={media.silverHero}
        className="silver-hero"
      />

      <section className="statement-section">
        <p>{t.intro}</p>
      </section>

      <section className="android-first-section">
        <SectionTitle title={t.androidTitle} lead={t.androidLead} />
        <div className="delivery-path">
          {t.delivery.map(([stage, title, body], index) => {
            const Icon = deliveryIcons[index]
            return (
              <article key={title}>
                <div className="delivery-card-top">
                  <span>{stage}</span>
                  <Icon size={24} strokeWidth={1.6} />
                </div>
                <h3>{title}</h3>
                <p>{body}</p>
              </article>
            )
          })}
        </div>

        <div className="app-boundary">
          <h3>{t.boundaryTitle}</h3>
          <div className="app-boundary-grid">
            <article>
              <h4>{t.appCanTitle}</h4>
              <ul>
                {t.appCan.map((item) => <li key={item}><CheckCircle2 size={18} />{item}</li>)}
              </ul>
            </article>
            <article>
              <h4>{t.appNeedsTitle}</h4>
              <ul>
                {t.appNeeds.map((item) => <li key={item}><Layers3 size={18} />{item}</li>)}
              </ul>
            </article>
          </div>
        </div>
      </section>

      <section className="architecture-section">
        <SectionTitle title={t.architectureTitle} lead={t.architectureLead} />
        <div className="architecture-stack">
          {t.layers.map(([title, body], index) => {
            const Icon = layerIcons[index]
            return (
              <article key={title}>
                <span>{String(index + 1).padStart(2, '0')}</span>
                <Icon size={22} strokeWidth={1.7} />
                <div><h3>{title}</h3><p>{body}</p></div>
              </article>
            )
          })}
        </div>
      </section>

      <section className="feature-section dark-section">
        <SectionTitle title={t.featuresTitle} lead={t.featuresLead} inverted />
        <div className="feature-grid">
          {t.features.map(([title, body], index) => {
            const Icon = featureIcons[index]
            return (
              <article key={title}>
                <Icon size={24} strokeWidth={1.6} />
                <h3>{title}</h3>
                <p>{body}</p>
              </article>
            )
          })}
        </div>
      </section>

      <section className="audience-section">
        <SectionTitle title={t.usersTitle} lead={t.usersLead} />
        <div className="audience-layout">
          <div className="audience-image">
            <img src={media.seniorPhone} alt={lang === 'zh' ? '银发用户使用智能手机' : 'An older adult using a smartphone'} loading="lazy" />
          </div>
          <div className="audience-list">
            {t.users.map(([title, body], index) => {
              const Icon = userIcons[index]
              return (
                <article key={title}>
                  <Icon size={25} strokeWidth={1.6} />
                  <div><h3>{title}</h3><p>{body}</p></div>
                </article>
              )
            })}
          </div>
        </div>
      </section>

      <section className="capability-section">
        <SectionTitle title={t.capabilityTitle} inverted />
        <div className="capability-grid">
          {t.capabilities.map((capability, index) => (
            <div key={capability}>
              <span>{String(index + 1).padStart(2, '0')}</span>
              <strong>{capability}</strong>
            </div>
          ))}
        </div>
      </section>

      <section className="usage-section">
        <SectionTitle title={t.usageTitle} lead={t.usageLead} />
        <div className="usage-steps">
          {t.usage.map(([number, title, body]) => (
            <article key={number}>
              <span>{number}</span>
              <h3>{title}</h3>
              <p>{body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="partner-section">
        <SectionTitle title={t.partnersTitle} lead={t.partnersLead} />
        <div className="partner-photo-grid">
          <img src={media.threeGenerations} alt="" loading="lazy" />
          <div className="partner-types">
            {t.partners.map(([title, body]) => (
              <article key={title}><h3>{title}</h3><p>{body}</p></article>
            ))}
          </div>
        </div>
        <div className="engagement-grid">
          {t.models.map(([title, body]) => (
            <article key={title}><MessageCircle size={19} /><h3>{title}</h3><p>{body}</p></article>
          ))}
        </div>
      </section>

      <ContactBand lang={lang} />
      <SiteFooter lang={lang} />
    </main>
  )
}

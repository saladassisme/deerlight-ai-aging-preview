import {
  ArrowDownRight,
  Building2,
  CalendarDays,
  Handshake,
  Lightbulb,
  MessageSquareText,
  Mic2,
  Search,
  Sparkles,
  Users,
} from 'lucide-react'
import type { Lang } from '../data'
import { media } from '../data'
import Navbar from '../components/Navbar'
import { ContactBand, SectionTitle, SiteFooter } from '../components/ProductShell'

const copy = {
  zh: {
    heroTitle: 'Community',
    heroStatement: '连接 C 端用户与行业从业者，让真实生活经验进入产品、服务与产业决策。',
    intro: 'Deerlight Community 是一个持续发生的共创现场。用户、家庭成员、产品团队、一线服务者、研究者与行业伙伴在这里相遇，把模糊的“适老需求”变成具体任务、原型、服务流程与真实试点。',
    principle: '不是替用户发声，而是让用户直接进入产品现场。',
    activitiesTitle: '共创现场',
    activitiesLead: '活动不是单向宣讲。每一种形式都对应从理解人，到定义问题，再到验证方案的一步。',
    activities: [
      ['手机一件事诊所', '不讲一整套课程，每次只解决打车、挂号、视频通话或支付中的一个真实任务，并记录卡点。'],
      ['AI 尝鲜会', '一起试用新模型、新设备和新交互，让用户用自己的语言判断什么有用、什么只是炫技。'],
      ['家庭数字协作实验室', '让本人和成年子女一起定义求助、代办、远程协助与隐私之间的边界。'],
      ['行业从业者圆桌', '邀请养老、硬件、医疗、保险、社区与 AI 团队交换一线问题和可落地资源。'],
      ['原型开放测试', '让用户在低压力环境中完成真实任务，观察理解、错误恢复、信任与放弃发生在哪里。'],
      ['兴趣与故事小组', '从摄影、旅行、音乐、园艺和写作出发，探索 AI 如何支持表达、学习与连接。'],
    ],
    peopleTitle: '我们连接谁',
    people: [
      ['银发用户与家庭', '真实需求、生活智慧、使用反馈与长期共创关系。'],
      ['一线服务者', '照护、社区、教育、健康和公共服务中的现场经验。'],
      ['产品与技术团队', '把模型与硬件能力转化为能被理解和使用的产品。'],
      ['研究与产业伙伴', '形成行业知识、试点场景、标准与规模化合作。'],
    ],
    methodTitle: '从一次活动到真实改变',
    methodLead: '每次连接都进入同一条闭环，避免洞察停留在活动现场。',
    method: [
      ['听见', '通过访谈、观察与体验课理解真实生活。'],
      ['共创', '让用户与从业者一起定义问题、优先级与边界。'],
      ['验证', '把想法做成可体验原型，在真实场景中试用。'],
      ['沉淀', '形成案例、研究、工具包与可复用的产品原则。'],
      ['试点', '与机构、企业和社区伙伴推进长期落地。'],
    ],
    joinTitle: '参与方式',
    joins: [
      ['作为用户参与', '体验产品、分享故事、参加访谈或成为长期共创成员。'],
      ['发起一场活动', '社区、机构与品牌可共同策划主题工作坊或体验日。'],
      ['成为行业伙伴', '提供专家、场地、真实服务能力或试点资源。'],
      ['开展联合研究', '围绕用户、场景、技术与行业议题形成公开或内部成果。'],
    ],
  },
  en: {
    heroTitle: 'Community',
    heroStatement: 'Connecting consumers and industry practitioners so lived experience can shape products, services, and decisions.',
    intro: 'Deerlight Community is an ongoing co-creation space. People, families, product teams, frontline practitioners, researchers, and industry partners turn vague “age-friendly needs” into concrete tasks, prototypes, service flows, and field pilots.',
    principle: 'We do not speak for people. We bring people directly into the product room.',
    activitiesTitle: 'Where co-creation happens',
    activitiesLead: 'These are not one-way talks. Each format advances the path from understanding people to defining and validating a solution.',
    activities: [
      ['One-task phone clinics', 'Each session solves one real task—rides, appointments, video calls, or payment—and records where the experience breaks.'],
      ['AI try-out sessions', 'People test new models, devices, and interactions, then decide in their own language what is useful and what is just spectacle.'],
      ['Family digital-boundary labs', 'People and adult children define the line between asking, delegating, remote help, and privacy.'],
      ['Practitioner roundtables', 'Care, hardware, health, insurance, community, and AI teams exchange frontline problems and delivery resources.'],
      ['Open prototype tests', 'People complete real tasks in a low-pressure setting while teams observe comprehension, recovery, trust, and abandonment.'],
      ['Interest and story circles', 'Photography, travel, music, gardening, and writing become starting points for expression, learning, and connection.'],
    ],
    peopleTitle: 'Who we connect',
    people: [
      ['Older adults and families', 'Real needs, lived wisdom, feedback, and long-term co-creation relationships.'],
      ['Frontline practitioners', 'Experience from care, community, education, health, and public services.'],
      ['Product and technology teams', 'Turn model and hardware capability into understandable, usable products.'],
      ['Research and industry partners', 'Build knowledge, pilots, standards, and pathways to scale.'],
    ],
    methodTitle: 'From one event to real change',
    methodLead: 'Every connection enters the same loop so insight never stays in the room.',
    method: [
      ['Listen', 'Use interviews, observation, and classes to understand real life.'],
      ['Co-create', 'Define problems, priorities, and boundaries with people and practitioners.'],
      ['Validate', 'Make ideas tangible and test them in the settings that matter.'],
      ['Codify', 'Create cases, research, toolkits, and reusable product principles.'],
      ['Pilot', 'Work with providers, companies, and communities on sustained delivery.'],
    ],
    joinTitle: 'Ways to participate',
    joins: [
      ['Join as a user', 'Try products, share stories, join interviews, or become a long-term co-creator.'],
      ['Host a program', 'Communities, providers, and brands can co-design a workshop or experience day.'],
      ['Become an industry partner', 'Contribute experts, spaces, services, or field-pilot resources.'],
      ['Run joint research', 'Develop public or internal work around people, contexts, technology, and industry.'],
    ],
  },
}

const activityImages = [
  media.conversation,
  media.communitySquare,
  media.threeGenerations,
  media.seniorPhone,
  media.workshop,
  media.knittingPortrait,
]
const peopleIcons = [Users, Mic2, Lightbulb, Building2]
const methodIcons = [Search, MessageSquareText, Sparkles, CalendarDays, Handshake]

export default function CommunityPage({ lang, setLang }: { lang: Lang; setLang: (lang: Lang) => void }) {
  const t = copy[lang]
  return (
    <main className="product-page community-page">
      <section className="community-hero">
        <Navbar lang={lang} setLang={setLang} light />
        <div className="community-hero-collage" aria-hidden="true">
          <img src={media.communitySquare} alt="" />
          <img src={media.conversation} alt="" />
        </div>
        <div className="product-hero-copy">
          <h1>{t.heroTitle}</h1>
          <p>{t.heroStatement}</p>
        </div>
      </section>

      <section className="community-intro">
        <p>{t.intro}</p>
        <ArrowDownRight size={42} strokeWidth={1.3} />
      </section>

      <section className="community-principle">
        <p>{t.principle}</p>
      </section>

      <section className="activity-section">
        <SectionTitle title={t.activitiesTitle} lead={t.activitiesLead} />
        <div className="activity-grid">
          {t.activities.map(([title, body], index) => (
            <article key={title} className={`activity-card activity-${index + 1}`}>
              <img src={activityImages[index]} alt="" loading="lazy" />
              <div>
                <h3>{title}</h3>
                <p>{body}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="community-people">
        <SectionTitle title={t.peopleTitle} inverted />
        <div className="people-grid">
          {t.people.map(([title, body], index) => {
            const Icon = peopleIcons[index]
            return (
              <article key={title}>
                <Icon size={25} strokeWidth={1.6} />
                <h3>{title}</h3>
                <p>{body}</p>
              </article>
            )
          })}
        </div>
      </section>

      <section className="community-method">
        <SectionTitle title={t.methodTitle} lead={t.methodLead} />
        <div className="method-track">
          {t.method.map(([title, body], index) => {
            const Icon = methodIcons[index]
            return (
              <article key={title}>
                <div><span>{String(index + 1).padStart(2, '0')}</span><Icon size={21} /></div>
                <h3>{title}</h3>
                <p>{body}</p>
              </article>
            )
          })}
        </div>
      </section>

      <section className="community-join">
        <SectionTitle title={t.joinTitle} />
        <div className="join-grid">
          {t.joins.map(([title, body]) => (
            <a href="mailto:hello@deerlight.cn" key={title}>
              <h3>{title}</h3>
              <p>{body}</p>
              <ArrowDownRight size={20} />
            </a>
          ))}
        </div>
      </section>

      <ContactBand lang={lang} title={lang === 'zh' ? '来现场，和我们一起构建' : 'Join us and build from real life'} />
      <SiteFooter lang={lang} />
    </main>
  )
}

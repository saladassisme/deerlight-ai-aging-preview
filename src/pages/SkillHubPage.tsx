import {
  BadgeCheck,
  BookOpen,
  Building2,
  Check,
  CircleDollarSign,
  Code2,
  Database,
  Download,
  HeartPulse,
  Headphones,
  Home,
  PackagePlus,
  Puzzle,
  Search,
  ShieldCheck,
  Sparkles,
  UploadCloud,
  Users,
  WandSparkles,
} from 'lucide-react'
import { useMemo, useState } from 'react'
import type { Lang, SkillCategory } from '../data'
import { skillCategories, skills, tx } from '../data'
import Navbar from '../components/Navbar'
import { ContactBand, SectionTitle, SiteFooter } from '../components/ProductShell'

const copy = {
  zh: {
    heroTitle: 'SkillHub',
    heroStatement: '面向银领用户、家庭与服务机构的 AI Skills 市场：找到、安装并组合真正有用的 AI 能力。',
    resident: '已入驻 Skills',
    categories: '生活场景',
    providers: '入驻提供方',
    galleryTitle: 'Skills Gallery',
    galleryLead: '按生活场景筛选，找到可以直接加入 SilverOS 或合作方设备的能力。',
    search: '搜索 Skill、场景或提供方',
    noResult: '没有找到匹配的 Skill，换一个关键词试试。',
    install: '安装',
    installed: '已添加',
    howTitle: '如何安装与使用',
    howLead: '整个过程不要求用户理解模型、提示词或复杂设置。',
    how: [
      ['找到需要的 Skill', '在 Gallery 中搜索或从 SilverOS 的场景建议进入。'],
      ['查看权限与费用', '用普通语言说明它需要读取什么、会做什么、何时收费。'],
      ['一键安装', '确认后加入个人或家庭空间，也可由机构统一分发。'],
      ['直接说出目标', '不必打开独立 App；SilverOS 会在合适的时机调用它。'],
    ],
    creatorTitle: '上传你的 Skill',
    creatorLead: '开发者、机构与服务品牌可以把成熟能力发布到银龄场景，而不必独立构建整套前端。',
    creator: [
      ['01 · 提交', '上传接口说明、权限清单、适用人群、价格和服务承诺。'],
      ['02 · 评估', '检查安全、准确性、可解释性、无障碍与真实任务完成率。'],
      ['03 · 上架', '通过后进入 Gallery，并可被 SilverOS、设备或机构目录调用。'],
      ['04 · 迭代', '依据匿名使用反馈、投诉与评估结果持续优化版本。'],
    ],
    formatTitle: 'Skill 可以是什么',
    formatLead: 'Skill 不只是一段提示词。它必须有清楚的输入、输出、权限、失败处理、价格与责任边界。',
    formats: [
      ['API Skill', '通过标准接口完成查询、生成或操作，由 SilverOS 负责身份、上下文和确认。'],
      ['设备 Skill', '在手机或合作硬件本地运行，适合无障碍、传感器和低延迟能力。'],
      ['知识 Skill', '以经过审核并持续更新的内容包回答特定领域问题，同时展示来源。'],
      ['服务 Skill', '把 AI 与人工服务连接起来，明确何时自动处理、何时转交专业人员。'],
    ],
    feeTitle: '收费模式',
    feeLead: '收费在安装前清晰展示；任何敏感操作与额外支出都需要再次确认。',
    fees: [
      ['免费', '适合公共服务、基础工具与品牌入口。'],
      ['按次付费', '适合报告生成、人工复核或单次高价值服务。'],
      ['订阅', '适合持续提醒、内容更新与长期陪伴型能力。'],
      ['机构授权', '按设备、席位、使用量或服务包计费。'],
    ],
    revenue: '对付费 Skill，平台按实际成交收取服务费；开发者始终保留定价权，并在发布前看到完整分成规则。',
  },
  en: {
    heroTitle: 'SkillHub',
    heroStatement: 'An AI skills market for older adults, families, and providers: discover, install, and combine capabilities that are genuinely useful.',
    resident: 'resident skills',
    categories: 'life categories',
    providers: 'skill providers',
    galleryTitle: 'Skills Gallery',
    galleryLead: 'Filter by life context and find capabilities ready for SilverOS or a partner device.',
    search: 'Search skills, situations, or providers',
    noResult: 'No matching skill. Try another keyword or category.',
    install: 'Install',
    installed: 'Added',
    howTitle: 'Install and use',
    howLead: 'People never need to understand models, prompts, or complicated setup.',
    how: [
      ['Find the right skill', 'Search the Gallery or enter from a contextual SilverOS suggestion.'],
      ['Review access and price', 'See what it reads, what it does, and when it charges in plain language.'],
      ['Install once', 'Add it to a personal or family space, or let a provider distribute it.'],
      ['State the goal', 'No separate app required; SilverOS calls the skill at the right moment.'],
    ],
    creatorTitle: 'Upload your skill',
    creatorLead: 'Developers, providers, and service brands can publish mature capabilities to later-life settings without building an entire front end.',
    creator: [
      ['01 · Submit', 'Provide interfaces, permissions, intended users, pricing, and service commitments.'],
      ['02 · Evaluate', 'Review safety, accuracy, explainability, accessibility, and real task completion.'],
      ['03 · Publish', 'Approved skills enter the Gallery and can run through SilverOS, devices, or provider catalogs.'],
      ['04 · Improve', 'Iterate from anonymous usage signals, complaints, and evaluation outcomes.'],
    ],
    formatTitle: 'What a skill can be',
    formatLead: 'A skill is more than a prompt. It needs explicit inputs, outputs, access, failure handling, price, and accountability.',
    formats: [
      ['API skill', 'Completes a query, generation, or action through a standard interface while SilverOS handles identity, context, and confirmation.'],
      ['Device skill', 'Runs on a phone or partner device for accessibility, sensors, and low-latency capabilities.'],
      ['Knowledge skill', 'Answers within a reviewed, continuously updated domain content pack and shows its sources.'],
      ['Service skill', 'Connects AI with human delivery and states clearly when automation stops and a professional takes over.'],
    ],
    feeTitle: 'Pricing models',
    feeLead: 'Pricing is clear before installation; sensitive actions and extra costs always require confirmation.',
    fees: [
      ['Free', 'For public services, essential tools, and branded entry points.'],
      ['Pay per use', 'For generated reports, human review, and one-off high-value services.'],
      ['Subscription', 'For ongoing reminders, updated content, and long-term assistance.'],
      ['Provider license', 'Priced by device, seat, usage, or service package.'],
    ],
    revenue: 'For paid skills, the platform charges a service fee on completed transactions. Developers retain pricing control and see the full revenue-share terms before publishing.',
  },
}

const categoryIcons = {
  生活: Home,
  家庭: Users,
  安全: ShieldCheck,
  健康: HeartPulse,
  学习: BookOpen,
  机构: Building2,
}

const providerCount = new Set(skills.map((skill) => skill.provider)).size
const creatorIcons = [PackagePlus, ShieldCheck, WandSparkles, BadgeCheck]
const formatIcons = [Code2, Puzzle, Database, Headphones]

export default function SkillHubPage({ lang, setLang }: { lang: Lang; setLang: (lang: Lang) => void }) {
  const t = copy[lang]
  const [category, setCategory] = useState<'全部' | SkillCategory>('全部')
  const [query, setQuery] = useState('')
  const [installed, setInstalled] = useState<number[]>([])

  const filtered = useMemo(() => {
    const normalized = query.trim().toLowerCase()
    return skills.filter((skill) => {
      const categoryMatch = category === '全部' || skill.category === category
      const queryMatch = !normalized
        || skill.name.zh.toLowerCase().includes(normalized)
        || skill.name.en.toLowerCase().includes(normalized)
        || skill.description.zh.toLowerCase().includes(normalized)
        || skill.description.en.toLowerCase().includes(normalized)
        || skill.provider.toLowerCase().includes(normalized)
      return categoryMatch && queryMatch
    })
  }, [category, query])

  const toggleInstall = (id: number) => {
    setInstalled((current) => current.includes(id) ? current.filter((item) => item !== id) : [...current, id])
  }

  return (
    <main className="product-page skillhub-page">
      <section className="skillhub-hero">
        <Navbar lang={lang} setLang={setLang} light />
        <div className="skillhub-orbit" aria-hidden="true">
          <span><ShieldCheck /></span>
          <span><HeartPulse /></span>
          <span><Users /></span>
          <span><BookOpen /></span>
          <i />
        </div>
        <div className="product-hero-copy">
          <h1>{t.heroTitle}</h1>
          <p>{t.heroStatement}</p>
        </div>
      </section>

      <section className="skill-stats">
        <div><strong>{skills.length}</strong><span>{t.resident}</span></div>
        <div><strong>06</strong><span>{t.categories}</span></div>
        <div><strong>{providerCount}</strong><span>{t.providers}</span></div>
      </section>

      <section className="gallery-section">
        <SectionTitle title={t.galleryTitle} lead={t.galleryLead} />
        <div className="gallery-controls">
          <label className="skill-search">
            <Search size={20} />
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder={t.search}
              aria-label={t.search}
            />
          </label>
          <div className="category-filter" role="group" aria-label="Skill categories">
            {skillCategories.map((item) => (
              <button
                key={item.key}
                type="button"
                className={category === item.key ? 'active' : ''}
                aria-pressed={category === item.key}
                onClick={() => setCategory(item.key)}
              >
                {lang === 'zh' ? item.zh : item.en}
              </button>
            ))}
          </div>
        </div>

        <p className="gallery-result-count">{filtered.length} / {skills.length}</p>
        {filtered.length > 0 ? (
          <div className="skill-gallery">
            {filtered.map((skill) => {
              const Icon = categoryIcons[skill.category]
              const isInstalled = installed.includes(skill.id)
              return (
                <article className={skill.featured ? 'featured' : ''} key={skill.id}>
                  <div className="skill-card-top">
                    <span className="skill-icon"><Icon size={21} /></span>
                    {skill.featured && <span className="verified"><BadgeCheck size={15} /> {lang === 'zh' ? '精选' : 'Curated'}</span>}
                  </div>
                  <h3>{tx(skill.name, lang)}</h3>
                  <p>{tx(skill.description, lang)}</p>
                  <div className="skill-provider"><span>{skill.provider}</span><strong>{tx(skill.price, lang)}</strong></div>
                  <button
                    className={isInstalled ? 'installed' : ''}
                    aria-pressed={isInstalled}
                    onClick={() => toggleInstall(skill.id)}
                  >
                    {isInstalled ? <Check size={17} /> : <Download size={17} />}
                    {isInstalled ? t.installed : t.install}
                  </button>
                </article>
              )
            })}
          </div>
        ) : (
          <div className="empty-gallery"><Sparkles size={24} /><p>{t.noResult}</p></div>
        )}
      </section>

      <section className="install-section">
        <SectionTitle title={t.howTitle} lead={t.howLead} inverted />
        <div className="install-flow">
          {t.how.map(([title, body], index) => (
            <article key={title}>
              <span>{String(index + 1).padStart(2, '0')}</span>
              <div><h3>{title}</h3><p>{body}</p></div>
            </article>
          ))}
        </div>
      </section>

      <section className="creator-section">
        <div className="creator-heading">
          <UploadCloud size={34} strokeWidth={1.5} />
          <SectionTitle title={t.creatorTitle} lead={t.creatorLead} />
        </div>
        <div className="creator-steps">
          {t.creator.map(([title, body], index) => {
            const Icon = creatorIcons[index]
            return <article key={title}><Icon size={22} /><h3>{title}</h3><p>{body}</p></article>
          })}
        </div>
        <div className="skill-format-heading">
          <SectionTitle title={t.formatTitle} lead={t.formatLead} />
        </div>
        <div className="skill-format-grid">
          {t.formats.map(([title, body], index) => {
            const Icon = formatIcons[index]
            return <article key={title}><Icon size={22} /><h3>{title}</h3><p>{body}</p></article>
          })}
        </div>
      </section>

      <section className="pricing-section">
        <SectionTitle title={t.feeTitle} lead={t.feeLead} />
        <div className="pricing-grid">
          {t.fees.map(([title, body], index) => (
            <article key={title}>
              <span>{index === 0 ? <Sparkles /> : index === 1 ? <CircleDollarSign /> : index === 2 ? <WandSparkles /> : <Building2 />}</span>
              <h3>{title}</h3>
              <p>{body}</p>
            </article>
          ))}
        </div>
        <p className="revenue-note">{t.revenue}</p>
      </section>

      <ContactBand lang={lang} title={lang === 'zh' ? '把你的能力带进 SkillHub' : 'Bring your capability to SkillHub'} />
      <SiteFooter lang={lang} />
    </main>
  )
}

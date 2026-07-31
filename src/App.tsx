import { useEffect, useState } from 'react'
import type { Lang } from './data'
import AboutPage from './pages/AboutPage'
import CommunityPage from './pages/CommunityPage'
import HomePage from './pages/HomePage'
import LabsPage from './pages/LabsPage'
import ReportsPage from './pages/ReportsPage'
import SilverOSPage from './pages/SilverOSPage'
import SkillHubPage from './pages/SkillHubPage'
import './skill-pages.css'
import './skill-marketplace.css'
import './unified-subpages.css'
import './skill-card-fix.css'
import './subpage-hero-images.css'
import './live-skill-demo.css'
import './site-enhancements.css'

const skillIconByTitle: Record<string, string> = {
  '反诈消息检查': '盾', 'Scam Message Check': '盾', '家人消息助手': '讯', 'Family Message Helper': '讯',
  '就医准备清单': '医', 'Visit Prep': '医', '数字生活教练': '学', 'Digital Life Coach': '学',
  '用药节奏': '药', 'Medication Rhythm': '药', '出行规划助手': '行', 'Easy Trip Planner': '行',
  '家庭纪念日': '日', 'Family Dates': '日', '照片回忆讲述': '忆', 'Photo Memory Story': '忆',
  '购物清单搭子': '购', 'Shopping Companion': '购', '可信联系人': '联', 'Trusted Contacts': '联',
  '合同看明白': '约', 'Plain-language Contracts': '约', '每日轻运动': '动', 'Gentle Daily Movement': '动',
  '兴趣学习伙伴': '趣', 'Interest Learning Buddy': '趣', '方言家书': '书', 'Dialect Family Letters': '书',
  '入住陪伴员': '家', 'Move-in Companion': '家', '服务记录 Copilot': '录', 'Service Note Copilot': '录',
  '活动灵感库': '创', 'Activity Idea Bank': '创', '智能设备引导': '机', 'Device Walkthrough': '机',
  '通知摘要': '摘', 'Notification Digest': '摘', '语音日历': '历', 'Voice Calendar': '历',
  '账单看明白': '账', 'Bill Explainer': '账', '陌生来电提醒': '电', 'Unknown Caller Check': '电',
  '支付二次确认': '付', 'Payment Double Check': '付', '家人远程协助': '助', 'Family Remote Assist': '助',
  '家庭相册整理': '册', 'Family Album Organizer': '册', '视频通话字幕': '字', 'Call Captions': '字',
  '复诊事项追踪': '诊', 'Follow-up Tracker': '诊', '检查报告提问清单': '问', 'Report Question List': '问',
  '健康数据汇总': '图', 'Health Data Summary': '图', '轻松学手机': '手', 'Phone Learning Guide': '手',
  '新闻看明白': '闻', 'Plain-language News': '闻', '摄影兴趣课': '摄', 'Photography Club': '摄',
  '社区活动发现': '近', 'Nearby Activities': '近', '办事材料清单': '办', 'Civic Service Checklist': '办',
  '打车陪伴': '车', 'Ride Companion': '车', '餐厅菜单助手': '餐', 'Menu Helper': '餐',
  '服务预约助手': '约', 'Service Booking Assistant': '约', '探访记录': '访', 'Visit Notes': '访',
  '风险事件上报': '报', 'Incident Reporting': '报', '员工培训问答': '训', 'Staff Learning Assistant': '训',
  '家庭服务周报': '周', 'Family Service Brief': '周', '方言实时字幕': '言', 'Dialect Live Captions': '言',
}

const pageMeta = {
  home: {
    zh: ['小鹿光年 Deerlight — 面向银发数字生活的人工智能生态', '小鹿光年构建银发智能系统、可运行 AI 技能、共创社区与研究体系，让人工智能对每个人都好用。'],
    en: ['Deerlight — AI for later-life digital living', 'Deerlight builds SilverOS, runnable AI skills, co-creation, and research so the future works for everyone.'],
  },
  silver: { zh: ['SilverOS 银发智能系统 — 小鹿光年', '用自然语言、记忆、权限与安全确认，让银发用户更容易完成数字生活任务。'], en: ['SilverOS — Deerlight', 'A natural-language AI system with memory, permissions, and safety confirmation for later-life digital living.'] },
  skill: { zh: ['技能中心 — 42 个可运行的银发 AI 技能', '在线运行反诈、健康、家庭、学习、生活和机构服务技能。'], en: ['SkillHub — 42 runnable AI skills', 'Run safety, health, family, learning, daily-life, and provider AI skills online.'] },
  community: { zh: ['共创社区 — 小鹿光年', '让银发用户、家庭、研究者和机构共同进入人工智能产品研究与测试。'], en: ['Community — Deerlight', 'Co-create and test AI products with older adults, families, researchers, and providers.'] },
  reports: { zh: ['洞察报告 — 人工智能、数字生活与年龄', '阅读小鹿光年关于 AI、数字生活、银发用户和适老设计的研究与精选内容。'], en: ['Reports — AI, digital life, and age', 'Research and selected reading on AI, digital life, aging, and inclusive design.'] },
  about: { zh: ['关于小鹿光年 Deerlight', '了解小鹿光年的产品生态、设计原则、真实进展和合作方式。'], en: ['About Deerlight', 'Learn about Deerlight’s ecosystem, principles, progress, and partnership opportunities.'] },
  labs: { zh: ['Labs 实验室 — 小鹿光年', '探索小鹿光年的人工智能原型、评估方法和真实场景实验。'], en: ['Deerlight Labs', 'Explore AI prototypes, evaluation methods, and real-world experiments.'] },
}

function metaKey(path: string) {
  if (path.includes('silver')) return 'silver'
  if (path.includes('skill')) return 'skill'
  if (path.includes('community')) return 'community'
  if (path.includes('reports')) return 'reports'
  if (path.includes('about')) return 'about'
  if (path.includes('labs')) return 'labs'
  return 'home'
}

function setMeta(name: string, content: string, property = false) {
  const selector = property ? `meta[property="${name}"]` : `meta[name="${name}"]`
  let element = document.head.querySelector<HTMLMetaElement>(selector)
  if (!element) {
    element = document.createElement('meta')
    element.setAttribute(property ? 'property' : 'name', name)
    document.head.appendChild(element)
  }
  element.content = content
}

export default function App() {
  const [lang, setLangState] = useState<Lang>(() => localStorage.getItem('deerlight-lang') === 'en' ? 'en' : 'zh')
  const setLang = (next: Lang) => { setLangState(next); localStorage.setItem('deerlight-lang', next) }
  const path = window.location.pathname.toLowerCase()

  useEffect(() => {
    document.documentElement.lang = lang === 'zh' ? 'zh-CN' : 'en'
    const [title, description] = pageMeta[metaKey(path) as keyof typeof pageMeta][lang]
    document.title = title
    setMeta('description', description)
    setMeta('og:title', title, true)
    setMeta('og:description', description, true)
    setMeta('og:type', 'website', true)
    setMeta('og:url', window.location.href, true)
    setMeta('twitter:card', 'summary_large_image')
    let canonical = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]')
    if (!canonical) { canonical = document.createElement('link'); canonical.rel = 'canonical'; document.head.appendChild(canonical) }
    canonical.href = `${window.location.origin}${window.location.pathname}`
  }, [lang, path])

  useEffect(() => {
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const observed = new WeakSet<Element>()
    const observer = reducedMotion ? null : new IntersectionObserver((entries) => entries.forEach((entry) => { if (entry.isIntersecting) { entry.target.classList.add('is-revealed'); observer?.unobserve(entry.target) } }), { threshold: 0.08, rootMargin: '0px 0px -7% 0px' })
    const enhancePage = () => {
      document.querySelectorAll<HTMLElement>('.skillhub-page .skill-gallery > article').forEach((card) => {
        const title = card.querySelector('h3')?.textContent?.trim() ?? ''
        const icon = card.querySelector<HTMLElement>('.skill-icon')
        if (icon && skillIconByTitle[title]) { icon.dataset.symbol = skillIconByTitle[title]; icon.setAttribute('aria-label', title) }
      })
      document.querySelectorAll<HTMLElement>('.product-page section, .product-page article, .product-page .section-title, .product-page .product-hero-copy > *').forEach((element, index) => {
        if (observed.has(element)) return
        observed.add(element); element.classList.add('scroll-reveal'); element.style.setProperty('--reveal-delay', `${Math.min(index % 4, 3) * 55}ms`)
        if (reducedMotion) element.classList.add('is-revealed'); else observer?.observe(element)
      })
    }
    enhancePage()
    const mutationObserver = new MutationObserver(enhancePage)
    mutationObserver.observe(document.body, { childList: true, subtree: true })
    return () => { mutationObserver.disconnect(); observer?.disconnect() }
  }, [lang])

  if (path.includes('silver-os') || path.includes('silveros')) return <SilverOSPage lang={lang} setLang={setLang} />
  if (path.includes('skillhub') || path.includes('/skills/')) return <SkillHubPage lang={lang} setLang={setLang} />
  if (path.includes('community')) return <CommunityPage lang={lang} setLang={setLang} />
  if (path.includes('reports')) return <ReportsPage lang={lang} setLang={setLang} />
  if (path.includes('about')) return <AboutPage lang={lang} setLang={setLang} />
  if (path.includes('labs')) return <LabsPage lang={lang} setLang={setLang} />
  return <HomePage lang={lang} setLang={setLang} />
}

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

const skillIconByTitle: Record<string, string> = {
  '反诈消息检查': '盾', 'Scam Message Check': '盾',
  '家人消息助手': '讯', 'Family Message Helper': '讯',
  '就医准备清单': '医', 'Visit Prep': '医',
  '数字生活教练': '学', 'Digital Life Coach': '学',
  '用药节奏': '药', 'Medication Rhythm': '药',
  '出行规划助手': '行', 'Easy Trip Planner': '行',
  '家庭纪念日': '日', 'Family Dates': '日',
  '照片回忆讲述': '忆', 'Photo Memory Story': '忆',
  '购物清单搭子': '购', 'Shopping Companion': '购',
  '可信联系人': '联', 'Trusted Contacts': '联',
  '合同看明白': '约', 'Plain-language Contracts': '约',
  '每日轻运动': '动', 'Gentle Daily Movement': '动',
  '兴趣学习伙伴': '趣', 'Interest Learning Buddy': '趣',
  '方言家书': '书', 'Dialect Family Letters': '书',
  '入住陪伴员': '家', 'Move-in Companion': '家',
  '服务记录 Copilot': '录', 'Service Note Copilot': '录',
  '活动灵感库': '创', 'Activity Idea Bank': '创',
  '智能设备引导': '机', 'Device Walkthrough': '机',
  '通知摘要': '摘', 'Notification Digest': '摘',
  '语音日历': '历', 'Voice Calendar': '历',
  '账单看明白': '账', 'Bill Explainer': '账',
  '陌生来电提醒': '电', 'Unknown Caller Check': '电',
  '支付二次确认': '付', 'Payment Double Check': '付',
  '家人远程协助': '助', 'Family Remote Assist': '助',
  '家庭相册整理': '册', 'Family Album Organizer': '册',
  '视频通话字幕': '字', 'Call Captions': '字',
  '复诊事项追踪': '诊', 'Follow-up Tracker': '诊',
  '检查报告提问清单': '问', 'Report Question List': '问',
  '健康数据汇总': '图', 'Health Data Summary': '图',
}

export default function App() {
  const [lang, setLangState] = useState<Lang>(() => {
    const saved = localStorage.getItem('deerlight-lang')
    return saved === 'en' ? 'en' : 'zh'
  })

  const setLang = (next: Lang) => {
    setLangState(next)
    localStorage.setItem('deerlight-lang', next)
  }

  useEffect(() => {
    document.documentElement.lang = lang === 'zh' ? 'zh-CN' : 'en'
  }, [lang])

  useEffect(() => {
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const observed = new WeakSet<Element>()
    const observer = reducedMotion ? null : new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return
        entry.target.classList.add('is-revealed')
        observer?.unobserve(entry.target)
      })
    }, { threshold: 0.08, rootMargin: '0px 0px -7% 0px' })

    const enhancePage = () => {
      document.querySelectorAll<HTMLElement>('.skillhub-page .skill-gallery > article').forEach((card) => {
        const title = card.querySelector('h3')?.textContent?.trim() ?? ''
        const icon = card.querySelector<HTMLElement>('.skill-icon')
        if (icon && skillIconByTitle[title]) {
          icon.dataset.symbol = skillIconByTitle[title]
          icon.setAttribute('aria-label', title)
        }
      })

      document.querySelectorAll<HTMLElement>('.product-page section, .product-page article, .product-page .section-title, .product-page .product-hero-copy > *').forEach((element, index) => {
        if (observed.has(element)) return
        observed.add(element)
        element.classList.add('scroll-reveal')
        element.style.setProperty('--reveal-delay', `${Math.min(index % 4, 3) * 55}ms`)
        if (reducedMotion) element.classList.add('is-revealed')
        else observer?.observe(element)
      })
    }

    enhancePage()
    const mutationObserver = new MutationObserver(enhancePage)
    mutationObserver.observe(document.body, { childList: true, subtree: true })

    return () => {
      mutationObserver.disconnect()
      observer?.disconnect()
    }
  }, [lang])

  const path = window.location.pathname.toLowerCase()
  if (path.includes('silver-os') || path.includes('silveros')) return <SilverOSPage lang={lang} setLang={setLang} />
  if (path.includes('skillhub') || path.includes('/skills/')) return <SkillHubPage lang={lang} setLang={setLang} />
  if (path.includes('community')) return <CommunityPage lang={lang} setLang={setLang} />
  if (path.includes('reports')) return <ReportsPage lang={lang} setLang={setLang} />
  if (path.includes('about')) return <AboutPage lang={lang} setLang={setLang} />
  if (path.includes('labs')) return <LabsPage lang={lang} setLang={setLang} />
  return <HomePage lang={lang} setLang={setLang} />
}

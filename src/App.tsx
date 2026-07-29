import { useEffect, useState } from 'react'
import type { Lang } from './data'
import CommunityPage from './pages/CommunityPage'
import HomePage from './pages/HomePage'
import LabsPage from './pages/LabsPage'
import ReportsPage from './pages/ReportsPage'
import SilverOSPage from './pages/SilverOSPage'
import SkillHubPage from './pages/SkillHubPage'

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

  const path = window.location.pathname.toLowerCase()
  if (path.includes('silver-os') || path.includes('silveros')) return <SilverOSPage lang={lang} setLang={setLang} />
  if (path.includes('skillhub')) return <SkillHubPage lang={lang} setLang={setLang} />
  if (path.includes('community')) return <CommunityPage lang={lang} setLang={setLang} />
  if (path.includes('reports')) return <ReportsPage lang={lang} setLang={setLang} />
  if (path.includes('labs')) return <LabsPage lang={lang} setLang={setLang} />
  return <HomePage lang={lang} setLang={setLang} />
}

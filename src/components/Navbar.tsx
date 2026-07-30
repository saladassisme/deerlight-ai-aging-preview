import { Mail, Menu, X } from 'lucide-react'
import { useEffect, useState } from 'react'
import type { Lang } from '../data'
import { BrandLockup } from './BrandLogo'

type NavbarProps = {
  lang: Lang
  setLang: (lang: Lang) => void
  light?: boolean
}

const labels = {
  zh: { contact: '联系方式', open: '打开菜单', close: '关闭菜单' },
  en: { contact: 'Contact', open: 'Open menu', close: 'Close menu' },
}

const productLinks = [
  { label: { zh: '小鹿回忆录', en: 'Memora' }, href: 'https://deerlight.cn', external: true },
  { label: { zh: '银发智能系统', en: 'SilverOS' }, href: '/silver-os' },
  { label: { zh: '技能中心', en: 'SkillHub' }, href: '/skillhub' },
  { label: { zh: '共创社区', en: 'Community' }, href: '/community' },
  { label: { zh: '洞察报告', en: 'Reports' }, href: '/reports' },
  { label: { zh: '关于我们', en: 'About' }, href: '/about' },
]

export default function Navbar({ lang, setLang, light = false }: NavbarProps) {
  const [mobileOpen, setMobileOpen] = useState(false)
  const t = labels[lang]

  useEffect(() => {
    const closeWithEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setMobileOpen(false)
    }
    document.addEventListener('keydown', closeWithEscape)
    return () => document.removeEventListener('keydown', closeWithEscape)
  }, [])

  return (
    <header className={`main-nav ${light ? 'main-nav-light' : ''}`}>
      <a className="nav-brand" href="/" aria-label="Deerlight home"><BrandLockup compact /></a>

      <nav className="desktop-nav" aria-label={lang === 'zh' ? '主导航' : 'Primary navigation'}>
        {productLinks.map((item) => <a key={item.href} href={item.href} target={item.external ? '_blank' : undefined} rel={item.external ? 'noreferrer' : undefined}>{item.label[lang]}</a>)}
      </nav>

      <div className="nav-actions">
        <a className="nav-contact" href="mailto:hello@deerlight.cn" aria-label={t.contact}><Mail size={15} /></a>
        <div className="language-switch" aria-label={lang === 'zh' ? '语言切换' : 'Language'}>
          <button className={lang === 'zh' ? 'active' : ''} aria-pressed={lang === 'zh'} onClick={() => setLang('zh')}>中</button>
          <button className={lang === 'en' ? 'active' : ''} aria-pressed={lang === 'en'} onClick={() => setLang('en')}>EN</button>
        </div>
        <button className="mobile-menu-button" type="button" aria-label={mobileOpen ? t.close : t.open} aria-expanded={mobileOpen} onClick={() => setMobileOpen((value) => !value)}>{mobileOpen ? <X size={20} /> : <Menu size={20} />}</button>
      </div>

      <div className={`mobile-panel ${mobileOpen ? 'visible' : ''}`}>
        {productLinks.map((item) => <a key={item.href} href={item.href} target={item.external ? '_blank' : undefined} rel={item.external ? 'noreferrer' : undefined} onClick={() => setMobileOpen(false)}>{item.label[lang]}</a>)}
        <span className="mobile-divider" />
        <a href="mailto:hello@deerlight.cn" onClick={() => setMobileOpen(false)}>{t.contact}</a>
      </div>
    </header>
  )
}

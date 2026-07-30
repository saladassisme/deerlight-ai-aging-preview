import { ChevronDown, Mail, Menu, X } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import type { Lang } from '../data'
import { BrandLockup } from './BrandLogo'

type NavbarProps = {
  lang: Lang
  setLang: (lang: Lang) => void
  light?: boolean
}

const labels = {
  zh: {
    about: '关于我们',
    contact: '联系方式',
    intro: '品牌介绍',
    open: '打开菜单',
    close: '关闭菜单',
  },
  en: {
    about: 'About',
    contact: 'Contact',
    intro: 'Our story',
    open: 'Open menu',
    close: 'Close menu',
  },
}

const productLinks = [
  { label: { zh: '小鹿回忆录', en: 'Memora' }, href: 'https://deerlight.cn', external: true },
  { label: { zh: '银发智能系统', en: 'SilverOS' }, href: '/silver-os.html' },
  { label: { zh: '技能中心', en: 'SkillHub' }, href: '/skillhub.html' },
  { label: { zh: '共创社区', en: 'Community' }, href: '/community.html' },
  { label: { zh: '洞察报告', en: 'Reports' }, href: '/reports.html' },
]

export default function Navbar({ lang, setLang, light = false }: NavbarProps) {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [aboutOpen, setAboutOpen] = useState(false)
  const aboutRef = useRef<HTMLDivElement>(null)
  const t = labels[lang]

  useEffect(() => {
    const close = (event: MouseEvent) => {
      if (aboutRef.current && !aboutRef.current.contains(event.target as Node)) setAboutOpen(false)
    }
    const closeWithEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setAboutOpen(false)
        setMobileOpen(false)
      }
    }
    document.addEventListener('mousedown', close)
    document.addEventListener('keydown', closeWithEscape)
    return () => {
      document.removeEventListener('mousedown', close)
      document.removeEventListener('keydown', closeWithEscape)
    }
  }, [])

  const closeAll = () => {
    setMobileOpen(false)
    setAboutOpen(false)
  }

  return (
    <header className={`main-nav ${light ? 'main-nav-light' : ''}`}>
      <a className="nav-brand" href="/" aria-label="Deerlight home">
        <BrandLockup compact />
      </a>

      <nav className="desktop-nav" aria-label={lang === 'zh' ? '主导航' : 'Primary navigation'}>
        {productLinks.map((item) => (
          <a
            key={item.href}
            href={item.href}
            target={item.external ? '_blank' : undefined}
            rel={item.external ? 'noreferrer' : undefined}
          >
            {item.label[lang]}
          </a>
        ))}
        <div className="about-menu" ref={aboutRef}>
          <button
            type="button"
            aria-expanded={aboutOpen}
            onClick={() => setAboutOpen((value) => !value)}
          >
            {t.about}
            <ChevronDown size={14} strokeWidth={1.8} />
          </button>
          <div className={`about-popover ${aboutOpen ? 'visible' : ''}`}>
            <a href="mailto:hello@deerlight.cn" onClick={closeAll}>
              <Mail size={15} />
              {t.contact}
            </a>
            <a href="/#about-deerlight" onClick={closeAll}>{t.intro}</a>
          </div>
        </div>
      </nav>

      <div className="nav-actions">
        <div className="language-switch" aria-label={lang === 'zh' ? '语言切换' : 'Language'}>
          <button className={lang === 'zh' ? 'active' : ''} aria-pressed={lang === 'zh'} onClick={() => setLang('zh')}>中</button>
          <button className={lang === 'en' ? 'active' : ''} aria-pressed={lang === 'en'} onClick={() => setLang('en')}>EN</button>
        </div>
        <button
          className="mobile-menu-button"
          type="button"
          aria-label={mobileOpen ? t.close : t.open}
          aria-expanded={mobileOpen}
          onClick={() => setMobileOpen((value) => !value)}
        >
          {mobileOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      <div className={`mobile-panel ${mobileOpen ? 'visible' : ''}`}>
        {productLinks.map((item) => (
          <a
            key={item.href}
            href={item.href}
            target={item.external ? '_blank' : undefined}
            rel={item.external ? 'noreferrer' : undefined}
            onClick={closeAll}
          >
            {item.label[lang]}
          </a>
        ))}
        <span className="mobile-divider" />
        <a href="/#about-deerlight" onClick={closeAll}>{t.intro}</a>
        <a href="mailto:hello@deerlight.cn" onClick={closeAll}>{t.contact}</a>
      </div>
    </header>
  )
}

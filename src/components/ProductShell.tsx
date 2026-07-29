import { ArrowUpRight } from 'lucide-react'
import type { ReactNode } from 'react'
import type { Lang } from '../data'
import { BrandLockup } from './BrandLogo'
import Navbar from './Navbar'

type ProductHeroProps = {
  lang: Lang
  setLang: (lang: Lang) => void
  title: string
  statement: string
  background?: string
  children?: ReactNode
  className?: string
}

export function ProductHero({
  lang,
  setLang,
  title,
  statement,
  background,
  children,
  className = '',
}: ProductHeroProps) {
  return (
    <section
      className={`product-hero ${className}`}
      style={background ? { backgroundImage: `linear-gradient(90deg, rgba(13,9,5,.78) 0%, rgba(13,9,5,.42) 46%, rgba(13,9,5,.12) 100%), url(${background})` } : undefined}
    >
      <Navbar lang={lang} setLang={setLang} light />
      {children}
      <div className="product-hero-copy">
        <h1>{title}</h1>
        <p>{statement}</p>
      </div>
    </section>
  )
}

export function SectionTitle({
  title,
  lead,
  inverted = false,
}: {
  title: string
  lead?: string
  inverted?: boolean
}) {
  return (
    <div className={`section-title ${inverted ? 'inverted' : ''}`}>
      <h2>{title}</h2>
      {lead && <p>{lead}</p>}
    </div>
  )
}

export function ContactBand({ lang, title }: { lang: Lang; title?: string }) {
  return (
    <section className="contact-band">
      <h2>
        {title ?? (lang === 'zh' ? '一起把想法带进真实场景' : 'Bring the idea into a real setting')}
      </h2>
      <a href="mailto:hello@deerlight.cn">
        hello@deerlight.cn
        <ArrowUpRight size={20} />
      </a>
    </section>
  )
}

export function SiteFooter({ lang }: { lang: Lang }) {
  return (
    <footer className="site-footer">
      <a href="/" aria-label="Deerlight home"><BrandLockup compact /></a>
      <span>{lang === 'zh' ? '让未来，对每个人都好用。' : 'Making the future work for everyone.'}</span>
      <span>© 2026</span>
    </footer>
  )
}

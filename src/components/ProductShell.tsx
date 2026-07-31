import { ArrowUpRight, Send } from 'lucide-react'
import type { FormEvent, ReactNode } from 'react'
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

export function ProductHero({ lang, setLang, title, statement, background, children, className = '' }: ProductHeroProps) {
  return (
    <section className={`product-hero ${className}`} style={background ? { backgroundImage: `linear-gradient(90deg, rgba(13,9,5,.78) 0%, rgba(13,9,5,.42) 46%, rgba(13,9,5,.12) 100%), url(${background})` } : undefined}>
      <Navbar lang={lang} setLang={setLang} light />
      {children}
      <div className="product-hero-copy"><h1>{title}</h1><p>{statement}</p></div>
    </section>
  )
}

export function SectionTitle({ title, lead, inverted = false }: { title: string; lead?: string; inverted?: boolean }) {
  return <div className={`section-title ${inverted ? 'inverted' : ''}`}><h2>{title}</h2>{lead && <p>{lead}</p>}</div>
}

const contactContent = {
  silver: { zh: ['申请 SilverOS 试点', '告诉我们你的设备、使用场景或目标用户。'], en: ['Apply for a SilverOS pilot', 'Tell us about the device, setting, or people you want to support.'] },
  skill: { zh: ['发布或接入一个真实技能', '开发者、服务商和机构可以提交能力与使用场景。'], en: ['Publish or integrate a real skill', 'Developers, providers, and organizations can submit capabilities and use cases.'] },
  community: { zh: ['加入下一次共创', '以用户、家属、研究者或机构伙伴身份参与。'], en: ['Join the next co-creation session', 'Participate as a user, family member, researcher, or partner.'] },
  reports: { zh: ['订阅研究与报告更新', '留下邮箱，我们会发送重要研究和原创报告。'], en: ['Subscribe to research updates', 'Leave your email for important research and original reports.'] },
  about: { zh: ['与小鹿光年合作', '适合机构合作、试点、媒体、研究与投资联系。'], en: ['Work with Deerlight', 'For pilots, partnerships, media, research, and investment conversations.'] },
  default: { zh: ['一起把想法带进真实场景', '告诉我们你希望解决的问题。'], en: ['Bring the idea into a real setting', 'Tell us what problem you want to solve.'] },
}

function pageIntent() {
  const path = window.location.pathname.toLowerCase()
  if (path.includes('silver')) return 'silver'
  if (path.includes('skill')) return 'skill'
  if (path.includes('community')) return 'community'
  if (path.includes('reports')) return 'reports'
  if (path.includes('about')) return 'about'
  return 'default'
}

export function ContactBand({ lang, title }: { lang: Lang; title?: string }) {
  const content = contactContent[pageIntent() as keyof typeof contactContent] ?? contactContent.default
  const [defaultTitle, lead] = content[lang]
  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const data = new FormData(event.currentTarget)
    const name = String(data.get('name') ?? '')
    const email = String(data.get('email') ?? '')
    const role = String(data.get('role') ?? '')
    const message = String(data.get('message') ?? '')
    const subject = encodeURIComponent(`${defaultTitle} — ${name || email}`)
    const body = encodeURIComponent(`${lang === 'zh' ? '姓名' : 'Name'}: ${name}\n${lang === 'zh' ? '邮箱' : 'Email'}: ${email}\n${lang === 'zh' ? '身份/机构' : 'Role / organization'}: ${role}\n\n${message}`)
    window.location.href = `mailto:hello@deerlight.cn?subject=${subject}&body=${body}`
  }

  return (
    <section className="contact-band">
      <div className="contact-band-inner">
        <header className="contact-band-header">
          <div className="contact-band-title">
            <span>{lang === 'zh' ? '开始合作' : 'Start a conversation'}</span>
            <h2>{title ?? defaultTitle}</h2>
          </div>
          <div className="contact-band-intro">
            <p>{lead}</p>
            <a href="mailto:hello@deerlight.cn">hello@deerlight.cn<ArrowUpRight size={18} /></a>
          </div>
        </header>

        <form className="contact-band-form" onSubmit={submit}>
          <label><span>{lang === 'zh' ? '姓名' : 'Name'}</span><input name="name" autoComplete="name" required /></label>
          <label><span>{lang === 'zh' ? '邮箱' : 'Email'}</span><input name="email" type="email" autoComplete="email" required /></label>
          <label><span>{lang === 'zh' ? '身份或机构' : 'Role or organization'}</span><input name="role" autoComplete="organization-title" /></label>
          <label className="contact-message"><span>{lang === 'zh' ? '你希望讨论什么？' : 'What would you like to discuss?'}</span><textarea name="message" rows={4} required /></label>
          <div className="contact-band-form-footer">
            <p>{lang === 'zh' ? '点击后会打开你的默认邮件应用，内容仍由你确认后发送。' : 'This opens your default email app. You can review everything before sending.'}</p>
            <button type="submit">{lang === 'zh' ? '生成联系邮件' : 'Create email'}<Send size={16} /></button>
          </div>
        </form>
      </div>
    </section>
  )
}

export function SiteFooter({ lang }: { lang: Lang }) {
  return <footer className="site-footer"><a href="/" aria-label="Deerlight home"><BrandLockup compact /></a><span>{lang === 'zh' ? '让未来，对每个人都好用。' : 'Making the future work for everyone.'}</span><span>© 2026</span></footer>
}

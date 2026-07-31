import { ArrowUpRight } from 'lucide-react'
import { useEffect, useMemo, useRef, useState } from 'react'
import type { Lang } from '../data'
import { media } from '../data'
import { BrandMark } from './BrandLogo'

export default function FeaturesSection({ lang }: { lang: Lang }) {
  const products = useMemo(() => [
    {
      key: 'memora', name: lang === 'zh' ? '小鹿回忆录' : 'Memora', href: 'https://deerlight.cn', video: media.memoraVideo, external: true,
      value: lang === 'zh' ? '用每天一个问题，帮助个人和家庭逐步保存真实人生故事。' : 'One question a day helps people and families preserve real life stories.',
      audience: lang === 'zh' ? '个人 · 家庭' : 'Individuals · Families', status: lang === 'zh' ? '已上线' : 'Live',
    },
    {
      key: 'silveros', name: lang === 'zh' ? '银发智能系统' : 'SilverOS', href: '/silver-os', image: media.silverHero,
      value: lang === 'zh' ? '让不熟悉复杂设备的人，也能用自然语言完成日常数字任务。' : 'Natural-language help for everyday digital tasks without complex device steps.',
      audience: lang === 'zh' ? '银发用户 · 家庭 · 硬件伙伴' : 'Older adults · Families · Hardware', status: lang === 'zh' ? '互动原型' : 'Interactive prototype',
    },
    {
      key: 'skillhub', name: lang === 'zh' ? '技能中心' : 'SkillHub', href: '/skillhub', video: media.skillVideo,
      value: lang === 'zh' ? '把反诈、就医、家庭沟通和机构服务做成可运行、可分发的 AI 技能。' : 'Runnable, distributable AI skills for safety, health, family, and provider workflows.',
      audience: lang === 'zh' ? '用户 · 开发者 · 服务机构' : 'Users · Developers · Providers', status: lang === 'zh' ? '42 个技能可运行' : '42 runnable skills',
    },
    {
      key: 'community', name: lang === 'zh' ? '共创社区' : 'Community', href: '/community', image: media.communitySquare,
      value: lang === 'zh' ? '让用户、家庭和机构直接进入研究、测试与产品共创过程。' : 'Brings people, families, and providers directly into research and product testing.',
      audience: lang === 'zh' ? '用户 · 研究者 · 合作机构' : 'People · Researchers · Partners', status: lang === 'zh' ? '开放共创' : 'Open for co-creation',
    },
  ], [lang])
  const [active, setActive] = useState(0)
  const cardRefs = useRef<Array<HTMLElement | null>>([])

  useEffect(() => {
    const activeObserver = new IntersectionObserver((entries) => entries.forEach((entry) => entry.isIntersecting && setActive(Number((entry.target as HTMLElement).dataset.index))), { threshold: 0.58 })
    const revealObserver = new IntersectionObserver((entries) => entries.forEach((entry) => { if (entry.isIntersecting) { entry.target.classList.add('revealed'); revealObserver.unobserve(entry.target) } }), { threshold: 0.12 })
    const cards = cardRefs.current.filter(Boolean) as HTMLElement[]
    cards.forEach((card) => { activeObserver.observe(card); revealObserver.observe(card) })
    return () => { activeObserver.disconnect(); revealObserver.disconnect() }
  }, [])

  return (
    <section className="home-products" id="products">
      <div className="home-products-grid">
        <aside className="product-index" aria-label={lang === 'zh' ? '产品导航' : 'Product index'}>
          <BrandMark size={42} />
          <nav>{products.map((product, index) => <button type="button" key={product.key} className={active === index ? 'active' : ''} onClick={() => cardRefs.current[index]?.scrollIntoView({ behavior: 'smooth', block: 'center' })}>{product.name}</button>)}</nav>
          <span className="index-count">{String(active + 1).padStart(2, '0')} / 04</span>
        </aside>
        <div className="product-card-list">
          {products.map((product, index) => (
            <article className="home-product-card" key={product.key} data-index={index} ref={(element) => { cardRefs.current[index] = element }}>
              <div className="home-card-heading">
                <div><span className="product-status">{product.status}</span><h3>{product.name}</h3><p>{product.value}</p><small>{product.audience}</small></div>
                <a href={product.href} target={product.external ? '_blank' : undefined} rel={product.external ? 'noreferrer' : undefined} aria-label={lang === 'zh' ? `打开${product.name}` : `Open ${product.name}`}><ArrowUpRight size={22} /></a>
              </div>
              <a className="home-card-media" href={product.href} target={product.external ? '_blank' : undefined} rel={product.external ? 'noreferrer' : undefined} aria-label={lang === 'zh' ? `打开${product.name}` : `Open ${product.name}`}>
                {product.video ? <video autoPlay muted loop playsInline preload="metadata" src={product.video} aria-hidden="true" /> : <img src={product.image} alt={lang === 'zh' ? `${product.name} 产品预览` : `${product.name} product preview`} loading="lazy" decoding="async" />}
              </a>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

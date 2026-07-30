import { ArrowUpRight } from 'lucide-react'
import { useEffect, useMemo, useRef, useState } from 'react'
import type { Lang } from '../data'
import { media } from '../data'
import { BrandMark } from './BrandLogo'

export default function FeaturesSection({ lang }: { lang: Lang }) {
  const products = useMemo(() => [
    { key: 'memora', name: lang === 'zh' ? '小鹿回忆录' : 'Memora', href: 'https://deerlight.cn', video: media.memoraVideo, external: true },
    { key: 'silveros', name: lang === 'zh' ? '银发智能系统' : 'SilverOS', href: '/silver-os.html', image: media.silverHero },
    { key: 'skillhub', name: lang === 'zh' ? '技能中心' : 'SkillHub', href: '/skillhub.html', video: media.skillVideo },
    { key: 'community', name: lang === 'zh' ? '共创社区' : 'Community', href: '/community.html', image: media.communitySquare },
  ], [lang])
  const [active, setActive] = useState(0)
  const cardRefs = useRef<Array<HTMLElement | null>>([])

  useEffect(() => {
    const activeObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) setActive(Number((entry.target as HTMLElement).dataset.index))
      })
    }, { threshold: 0.58 })
    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed')
          revealObserver.unobserve(entry.target)
        }
      })
    }, { threshold: 0.12 })
    const cards = cardRefs.current.filter(Boolean) as HTMLElement[]
    cards.forEach((card) => { activeObserver.observe(card); revealObserver.observe(card) })
    return () => { activeObserver.disconnect(); revealObserver.disconnect() }
  }, [])

  return (
    <section className="home-products" id="products">
      <div className="home-products-grid">
        <aside className="product-index" aria-label={lang === 'zh' ? '产品导航' : 'Product index'}>
          <BrandMark size={42} />
          <nav>
            {products.map((product, index) => (
              <button type="button" key={product.key} className={active === index ? 'active' : ''} onClick={() => cardRefs.current[index]?.scrollIntoView({ behavior: 'smooth', block: 'center' })}>
                {product.name}
              </button>
            ))}
          </nav>
          <span className="index-count">{String(active + 1).padStart(2, '0')} / 04</span>
        </aside>
        <div className="product-card-list">
          {products.map((product, index) => (
            <article className="home-product-card" key={product.key} data-index={index} ref={(element) => { cardRefs.current[index] = element }}>
              <div className="home-card-heading">
                <h3>{product.name}</h3>
                <a href={product.href} target={product.external ? '_blank' : undefined} rel={product.external ? 'noreferrer' : undefined} aria-label={lang === 'zh' ? `打开${product.name}` : `Open ${product.name}`}><ArrowUpRight size={22} /></a>
              </div>
              <a className="home-card-media" href={product.href} target={product.external ? '_blank' : undefined} rel={product.external ? 'noreferrer' : undefined} aria-label={lang === 'zh' ? `打开${product.name}` : `Open ${product.name}`}>
                {product.video ? <video autoPlay muted loop playsInline src={product.video} /> : <img src={product.image} alt="" loading="lazy" />}
              </a>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

import { ArrowUpRight } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { media } from '../data'
import { BrandMark } from './BrandLogo'

const products = [
  {
    key: 'memora',
    name: 'Memora',
    href: 'https://deerlight.cn',
    video: media.memoraVideo,
    external: true,
  },
  {
    key: 'silveros',
    name: 'SilverOS',
    href: '/silver-os.html',
    image: media.silverHero,
  },
  {
    key: 'skillhub',
    name: 'SkillHub',
    href: '/skillhub.html',
    video: media.skillVideo,
  },
  {
    key: 'community',
    name: 'Community',
    href: '/community.html',
    image: media.communitySquare,
  },
]

export default function FeaturesSection() {
  const [active, setActive] = useState(0)
  const cardRefs = useRef<Array<HTMLElement | null>>([])

  useEffect(() => {
    const activeObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = Number((entry.target as HTMLElement).dataset.index)
            setActive(index)
          }
        })
      },
      { threshold: 0.58 },
    )

    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed')
            revealObserver.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.12 },
    )

    const cards = cardRefs.current.filter(Boolean) as HTMLElement[]
    cards.forEach((card) => {
      activeObserver.observe(card)
      revealObserver.observe(card)
    })
    return () => {
      activeObserver.disconnect()
      revealObserver.disconnect()
    }
  }, [])

  const scrollToCard = (index: number) => {
    cardRefs.current[index]?.scrollIntoView({ behavior: 'smooth', block: 'center' })
  }

  return (
    <section className="home-products" id="products">
      <div className="home-products-grid">
        <aside className="product-index" aria-label="Product index">
          <BrandMark size={42} />
          <nav>
            {products.map((product, index) => (
              <button
                type="button"
                key={product.key}
                className={active === index ? 'active' : ''}
                onClick={() => scrollToCard(index)}
              >
                {product.name}
              </button>
            ))}
          </nav>
          <span className="index-count">{String(active + 1).padStart(2, '0')} / 04</span>
        </aside>

        <div className="product-card-list">
          {products.map((product, index) => (
            <article
              className="home-product-card"
              key={product.key}
              data-index={index}
              ref={(element) => { cardRefs.current[index] = element }}
            >
              <div className="home-card-heading">
                <h3>{product.name}</h3>
                <a
                  href={product.href}
                  target={product.external ? '_blank' : undefined}
                  rel={product.external ? 'noreferrer' : undefined}
                  aria-label={`Open ${product.name}`}
                >
                  <ArrowUpRight size={22} />
                </a>
              </div>
              <a
                className="home-card-media"
                href={product.href}
                target={product.external ? '_blank' : undefined}
                rel={product.external ? 'noreferrer' : undefined}
                aria-label={`Open ${product.name}`}
              >
                {product.video ? (
                  <video autoPlay muted loop playsInline src={product.video} />
                ) : (
                  <img src={product.image} alt="" loading="lazy" />
                )}
              </a>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

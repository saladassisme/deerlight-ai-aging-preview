import type { Lang } from '../data'
import { BrandMark } from './BrandLogo'

export default function AboutSection({ lang }: { lang: Lang }) {
  return (
    <section className="home-about">
      <div className="dot-divider" aria-hidden="true"><span /><i /><span /></div>
      <div className="home-about-grid">
        <div className="home-about-mark">
          <BrandMark size={48} />
          <p>{lang === 'zh' ? '小鹿光年' : 'DEERLIGHT'}</p>
        </div>
        <h2>Deerlight</h2>
      </div>
    </section>
  )
}

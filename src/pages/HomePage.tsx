import type { Lang } from '../data'
import { media } from '../data'
import AboutSection from '../components/AboutSection'
import FeaturesSection from '../components/FeaturesSection'
import Navbar from '../components/Navbar'
import { SiteFooter } from '../components/ProductShell'
import ReportsPreview from '../components/ReportsPreview'

export default function HomePage({ lang, setLang }: { lang: Lang; setLang: (lang: Lang) => void }) {
  return (
    <main className="home-page">
      <section className="home-hero">
        <video autoPlay muted loop playsInline src={media.homeVideo} />
        <div className="home-hero-overlay" />
        <Navbar lang={lang} setLang={setLang} />
        <div className="home-hero-copy">
          <h1>
            {lang === 'zh' ? (
              <>
                让未来，
                <br />
                对每个人都<em className="hero-highlight-zh">好用</em>。
              </>
            ) : (
              <>
                Making the future
                <br />
                work for <em>everyone</em>.
              </>
            )}
          </h1>
        </div>
      </section>

      <AboutSection lang={lang} />
      <FeaturesSection />
      <ReportsPreview lang={lang} />

      <section className="about-deerlight" id="about-deerlight">
        <p className="about-deerlight-label">Deerlight.</p>
        <div>
          <h2>
            {lang === 'zh'
              ? 'AI 越来越强，更重要的是每个人都能真正使用它。'
              : 'As AI grows more capable, what matters is whether everyone can truly use it.'}
          </h2>
          <p>
            {lang === 'zh'
              ? '小鹿光年从需要更多协助的 65+ 用户出发，构建更容易理解、信任和控制的 AI 产品。我们把复杂度留给系统，让好用、安心和选择权回到每个人手里。'
              : 'Deerlight starts with people over 65 who need more support, then builds AI products that are easier to understand, trust, and control. Complexity stays inside the system; clarity, confidence, and choice stay with the person.'}
          </p>
          <a href="mailto:hello@deerlight.cn">hello@deerlight.cn</a>
        </div>
      </section>
      <SiteFooter lang={lang} />
    </main>
  )
}

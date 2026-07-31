import { ArrowRight } from 'lucide-react'
import type { Lang } from '../data'
import { media } from '../data'
import AboutSection from '../components/AboutSection'
import FeaturesSection from '../components/FeaturesSection'
import Navbar from '../components/Navbar'
import { SiteFooter } from '../components/ProductShell'

const progress = {
  zh: [
    ['10,000+', '小鹿光年产品累计用户'],
    ['7 位数', '人民币天使轮融资'],
    ['42', '已可在线运行的人工智能技能'],
    ['4', '产品、系统与共创方向'],
  ],
  en: [
    ['10,000+', 'users across Deerlight products'],
    ['7-figure', 'RMB angel investment'],
    ['42', 'AI skills available to run online'],
    ['4', 'product, system, and co-creation tracks'],
  ],
}

export default function HomePage({ lang, setLang }: { lang: Lang; setLang: (lang: Lang) => void }) {
  return (
    <main className="home-page">
      <section className="home-hero">
        <video autoPlay muted loop playsInline preload="metadata" src={media.homeVideo} aria-hidden="true" />
        <div className="home-hero-overlay" />
        <Navbar lang={lang} setLang={setLang} />
        <div className="home-hero-copy">
          <h1>{lang === 'zh' ? <><span>让未来，</span><br /><span>对每个人都<em className="hero-highlight-zh">好用</em>。</span></> : <><span>Making the future</span><br /><span>work for <em>everyone</em>.</span></>}</h1>
          <p className="home-hero-definition">{lang === 'zh' ? '小鹿光年是一套面向银发数字生活的人工智能产品、系统与服务生态。' : 'Deerlight is an ecosystem of AI products, systems, and services for later-life digital living.'}</p>
          <div className="home-hero-actions">
            <a href="/silver-os">{lang === 'zh' ? '体验 SilverOS' : 'Explore SilverOS'}<ArrowRight size={17} /></a>
            <a href="/skillhub" className="secondary">{lang === 'zh' ? '运行人工智能技能' : 'Run AI skills'}<ArrowRight size={17} /></a>
          </div>
        </div>
      </section>
      <AboutSection lang={lang} />
      <FeaturesSection lang={lang} />
      <section className="home-progress" aria-labelledby="progress-title">
        <div className="home-progress-heading">
          <span>{lang === 'zh' ? '正在发生' : 'In progress'}</span>
          <h2 id="progress-title">{lang === 'zh' ? '不只提出未来，也把它做成可以使用的产品。' : 'Not only imagining the future, but building products people can use.'}</h2>
          <p>{lang === 'zh' ? '从真实用户、小鹿回忆录和交互原型开始，我们持续验证银发用户、家庭与服务机构真正需要的人工智能。' : 'Starting with real users, Memora, and interactive prototypes, we continuously test what older adults, families, and providers actually need from AI.'}</p>
        </div>
        <div className="home-progress-grid">{progress[lang].map(([value, label]) => <article key={label}><strong>{value}</strong><p>{label}</p></article>)}</div>
        <div className="home-progress-note">{lang === 'zh' ? '产品数据会随着实际运营持续更新。技能数量以技能中心当前可运行目录为准。' : 'Product figures are updated as operations grow. Skill count reflects the current runnable SkillHub catalog.'}</div>
      </section>
      <section className="about-deerlight" id="about-deerlight">
        <p className="about-deerlight-label">{lang === 'zh' ? '小鹿光年' : 'Deerlight.'}</p>
        <div>
          <h2>{lang === 'zh' ? '人工智能越来越强，更重要的是每个人都能真正使用它。' : 'As AI grows more capable, what matters is whether everyone can truly use it.'}</h2>
          <p>{lang === 'zh' ? '小鹿光年从需要更多协助的银发用户出发，构建更容易理解、信任和控制的智能产品。我们把复杂度留给系统，让好用、安心和选择权回到每个人手里。' : 'Deerlight starts with older adults who need more support, then builds AI products that are easier to understand, trust, and control. Complexity stays inside the system; clarity, confidence, and choice stay with the person.'}</p>
          <a href="mailto:hello@deerlight.cn">hello@deerlight.cn</a>
        </div>
      </section>
      <SiteFooter lang={lang} />
    </main>
  )
}

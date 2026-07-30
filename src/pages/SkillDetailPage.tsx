import { AlertTriangle, ArrowLeft, CheckCircle2, HeartPulse, Image, ShieldCheck, Sparkles } from 'lucide-react'
import { useMemo, useState } from 'react'
import type { Lang } from '../data'
import Navbar from '../components/Navbar'
import { SiteFooter } from '../components/ProductShell'

type SkillSlug = 'scam-check' | 'visit-prep' | 'photo-memory'

type Props = {
  lang: Lang
  setLang: (lang: Lang) => void
  slug: SkillSlug
}

const detail = {
  'scam-check': {
    title: { zh: '反诈消息检查', en: 'Scam Message Check' },
    eyebrow: { zh: '安全守护技能 · 可立即体验', en: 'Safety skill · Live demo' },
    summary: { zh: '粘贴短信、聊天或转账要求，识别可疑链接、催促话术和异常付款请求。', en: 'Paste a message or payment request to flag suspicious links, pressure tactics, and unusual transfers.' },
    icon: ShieldCheck,
    tone: 'lime',
  },
  'visit-prep': {
    title: { zh: '就医准备清单', en: 'Visit Prep' },
    eyebrow: { zh: '健康支持技能 · 可立即体验', en: 'Health skill · Live demo' },
    summary: { zh: '把零散症状、用药和担忧整理成一份就诊前可以直接使用的清单。', en: 'Turn scattered symptoms, medicines, and concerns into a practical appointment checklist.' },
    icon: HeartPulse,
    tone: 'blue',
  },
  'photo-memory': {
    title: { zh: '照片回忆讲述', en: 'Photo Memory Story' },
    eyebrow: { zh: '家庭记忆技能 · 可立即体验', en: 'Family memory skill · Live demo' },
    summary: { zh: '从一张老照片和几句线索出发，生成追问、故事草稿与家人共写提示。', en: 'Start from one old photo and a few clues to create prompts, a story draft, and family co-writing cues.' },
    icon: Image,
    tone: 'amber',
  },
} as const

function ScamDemo({ lang }: { lang: Lang }) {
  const [value, setValue] = useState('【客服通知】您的账户存在异常，请立即点击 http://safe-pay.example.com 完成验证，并将验证码告诉客服，否则今晚冻结账户。')
  const [checked, setChecked] = useState(false)
  const signals = useMemo(() => {
    const text = value.toLowerCase()
    const items: string[] = []
    if (/http|www\.|点击|链接/.test(text)) items.push(lang === 'zh' ? '包含外部链接或引导点击' : 'Contains an external link or click prompt')
    if (/立即|马上|否则|冻结|最后/.test(text)) items.push(lang === 'zh' ? '使用强烈催促或威胁话术' : 'Uses urgency or threats')
    if (/验证码|密码|转账|付款|汇款/.test(text)) items.push(lang === 'zh' ? '索取敏感信息或要求付款' : 'Requests sensitive data or payment')
    return items
  }, [value, lang])
  const risk = signals.length >= 2 ? 'high' : signals.length === 1 ? 'medium' : 'low'

  return <div className="skill-demo-card">
    <label>{lang === 'zh' ? '粘贴需要检查的消息' : 'Paste the message to check'}</label>
    <textarea value={value} onChange={(e) => { setValue(e.target.value); setChecked(false) }} rows={7} />
    <button onClick={() => setChecked(true)}><ShieldCheck size={18} />{lang === 'zh' ? '开始检查' : 'Check message'}</button>
    {checked && <div className={`skill-result risk-${risk}`}>
      <div className="result-heading"><AlertTriangle size={22} /><strong>{risk === 'high' ? (lang === 'zh' ? '高风险' : 'High risk') : risk === 'medium' ? (lang === 'zh' ? '需要留意' : 'Review needed') : (lang === 'zh' ? '未发现明显风险' : 'No obvious risk')}</strong></div>
      {signals.length > 0 ? <ul>{signals.map((item) => <li key={item}>{item}</li>)}</ul> : <p>{lang === 'zh' ? '没有检测到常见诈骗信号，但仍请核实发件人身份。' : 'No common scam signals found, but still verify the sender.'}</p>}
      <p className="result-advice">{lang === 'zh' ? '建议：不要点击链接，不要提供验证码；通过官方应用或官方电话自行联系机构核实。' : 'Advice: do not click the link or share codes. Verify through the official app or phone number.'}</p>
    </div>}
  </div>
}

function VisitDemo({ lang }: { lang: Lang }) {
  const [symptom, setSymptom] = useState(lang === 'zh' ? '最近两周夜里咳嗽，走快一点会喘。' : 'Night cough for two weeks and shortness of breath when walking fast.')
  const [medicine, setMedicine] = useState(lang === 'zh' ? '每天服用降压药，药名记不清。' : 'Daily blood-pressure medicine; exact name unknown.')
  const [concern, setConcern] = useState(lang === 'zh' ? '担心是不是肺部问题，也想问药会不会冲突。' : 'Worried about a lung issue and possible medicine interactions.')
  const [ready, setReady] = useState(false)
  return <div className="skill-demo-card">
    <div className="demo-field-grid">
      <label>{lang === 'zh' ? '主要不舒服' : 'Main symptoms'}<textarea rows={3} value={symptom} onChange={(e) => { setSymptom(e.target.value); setReady(false) }} /></label>
      <label>{lang === 'zh' ? '正在使用的药' : 'Current medicines'}<textarea rows={3} value={medicine} onChange={(e) => { setMedicine(e.target.value); setReady(false) }} /></label>
      <label>{lang === 'zh' ? '最想问医生什么' : 'Main concern'}<textarea rows={3} value={concern} onChange={(e) => { setConcern(e.target.value); setReady(false) }} /></label>
    </div>
    <button onClick={() => setReady(true)}><Sparkles size={18} />{lang === 'zh' ? '生成就医准备单' : 'Create visit brief'}</button>
    {ready && <div className="skill-result visit-result">
      <div className="result-heading"><CheckCircle2 size={22} /><strong>{lang === 'zh' ? '就诊准备单' : 'Visit brief'}</strong></div>
      <h4>{lang === 'zh' ? '向医生描述' : 'Tell the clinician'}</h4><p>{symptom || '—'}</p>
      <h4>{lang === 'zh' ? '用药信息' : 'Medication note'}</h4><p>{medicine || '—'}</p>
      <h4>{lang === 'zh' ? '建议提问' : 'Questions to ask'}</h4>
      <ol><li>{concern || (lang === 'zh' ? '这可能与什么原因有关？' : 'What might be causing this?')}</li><li>{lang === 'zh' ? '是否需要检查？出现哪些情况应立即就医？' : 'Do I need tests, and which warning signs require urgent care?'}</li><li>{lang === 'zh' ? '现有药物是否需要调整或带药盒确认？' : 'Should current medication be adjusted or brought in for review?'}</li></ol>
      <p className="result-disclaimer">{lang === 'zh' ? '本技能只整理信息，不提供诊断。紧急不适请及时联系急救或医疗机构。' : 'This skill organizes information and does not diagnose. Seek urgent medical care for emergencies.'}</p>
    </div>}
  </div>
}

function PhotoDemo({ lang }: { lang: Lang }) {
  const [who, setWho] = useState(lang === 'zh' ? '外公、外婆和小时候的我' : 'My grandparents and me as a child')
  const [place, setPlace] = useState(lang === 'zh' ? '1998年夏天，苏州老家院子里' : 'Summer 1998, in our old family courtyard in Suzhou')
  const [memory, setMemory] = useState(lang === 'zh' ? '外公刚摘完葡萄，我一直偷吃，他假装生气，最后把最大的一串留给我。' : 'Grandpa had just picked grapes. I kept sneaking them, and he pretended to be angry before saving the biggest bunch for me.')
  const [made, setMade] = useState(false)
  return <div className="skill-demo-card">
    <div className="photo-placeholder"><Image size={38} /><span>{lang === 'zh' ? '老照片示意区' : 'Old photo placeholder'}</span></div>
    <div className="demo-field-grid">
      <label>{lang === 'zh' ? '照片里有谁' : 'Who is in it'}<input value={who} onChange={(e) => { setWho(e.target.value); setMade(false) }} /></label>
      <label>{lang === 'zh' ? '时间与地点' : 'When and where'}<input value={place} onChange={(e) => { setPlace(e.target.value); setMade(false) }} /></label>
      <label className="wide-field">{lang === 'zh' ? '你记得的一件小事' : 'One detail you remember'}<textarea rows={4} value={memory} onChange={(e) => { setMemory(e.target.value); setMade(false) }} /></label>
    </div>
    <button onClick={() => setMade(true)}><Sparkles size={18} />{lang === 'zh' ? '生成回忆故事' : 'Create memory story'}</button>
    {made && <div className="skill-result memory-result">
      <span className="story-kicker">{place}</span>
      <h3>{lang === 'zh' ? '院子里最大的一串葡萄' : 'The biggest bunch of grapes'}</h3>
      <p>{lang === 'zh' ? `${place}，照片里是${who}。${memory} 现在再看这张照片，最先回来的不是画面，而是院子里的蝉声、葡萄藤下的阴影，以及一个长辈把疼爱藏在“假装生气”里的样子。` : `${place}. In the photo: ${who}. ${memory} Looking at it now, what returns first is not only the image, but the summer sound, the shade under the vines, and the way affection was hidden inside a playful scolding.`}</p>
      <h4>{lang === 'zh' ? '下一步可以问' : 'A useful follow-up'}</h4>
      <p>{lang === 'zh' ? '外公平时还会把哪些“最好的一份”悄悄留给你？' : 'What other “best part” did your grandfather quietly save for you?'}</p>
    </div>}
  </div>
}

export default function SkillDetailPage({ lang, setLang, slug }: Props) {
  const item = detail[slug]
  const Icon = item.icon
  return <main className={`skill-detail-page tone-${item.tone}`}>
    <section className="skill-detail-hero">
      <Navbar lang={lang} setLang={setLang} light />
      <div className="skill-detail-hero-inner">
        <a className="skill-back-link" href="/skillhub"><ArrowLeft size={17} />{lang === 'zh' ? '返回技能中心' : 'Back to SkillHub'}</a>
        <div className="skill-detail-icon"><Icon size={30} /></div>
        <span>{item.eyebrow[lang]}</span>
        <h1>{item.title[lang]}</h1>
        <p>{item.summary[lang]}</p>
      </div>
    </section>
    <section className="skill-live-section">
      <div className="skill-live-heading"><span>{lang === 'zh' ? '实时体验' : 'LIVE DEMO'}</span><h2>{lang === 'zh' ? '现在就试一次' : 'Try it now'}</h2><p>{lang === 'zh' ? '这是可操作的前端原型：输入内容后会即时生成结构化结果，不需要登录，也不会上传数据。' : 'This is an interactive front-end prototype. It creates structured results locally without login or uploading data.'}</p></div>
      {slug === 'scam-check' && <ScamDemo lang={lang} />}
      {slug === 'visit-prep' && <VisitDemo lang={lang} />}
      {slug === 'photo-memory' && <PhotoDemo lang={lang} />}
    </section>
    <section className="skill-boundary-section">
      <div><span>01</span><h3>{lang === 'zh' ? '输入' : 'Input'}</h3><p>{lang === 'zh' ? '只收集完成任务所需的最少信息。' : 'Only the minimum information needed for the task.'}</p></div>
      <div><span>02</span><h3>{lang === 'zh' ? '输出' : 'Output'}</h3><p>{lang === 'zh' ? '结果清楚、可修改，并解释判断依据。' : 'Clear, editable output with visible reasoning signals.'}</p></div>
      <div><span>03</span><h3>{lang === 'zh' ? '边界' : 'Boundary'}</h3><p>{lang === 'zh' ? '高风险、医疗和付款场景始终保留人工确认。' : 'Human confirmation remains required for risk, health, and payment.'}</p></div>
    </section>
    <SiteFooter lang={lang} />
  </main>
}

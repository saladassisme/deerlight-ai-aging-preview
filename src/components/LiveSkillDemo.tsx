import { AlertTriangle, CheckCircle2, LoaderCircle, Play, Sparkles } from 'lucide-react'
import { useEffect, useMemo, useState } from 'react'
import type { Lang, SkillItem } from '../data'
import type { SkillResult } from '../skillDemos'
import { getElderSkillConfig, getInstantSkillResult, runReliableSkill } from '../elderSkillExperience'

export default function LiveSkillDemo({ skill, lang }: { skill: SkillItem; lang: Lang }) {
  const config = useMemo(() => getElderSkillConfig(skill.id), [skill.id])
  const [input, setInput] = useState('')
  const [result, setResult] = useState<SkillResult | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [selectedExample, setSelectedExample] = useState<number | null>(0)

  useEffect(() => {
    if (!config) return
    const firstExample = config.starters[lang][0]
    setInput(firstExample)
    setResult(getInstantSkillResult(skill.id, firstExample, lang))
    setSelectedExample(0)
    setLoading(false)
    setError('')
  }, [skill.id, lang, config])

  if (!config) return null

  const run = async (value = input) => {
    const normalized = value.trim()
    if (normalized.length < 3) {
      setError(lang === 'zh' ? '您先随便说几句遇到的情况就可以。' : 'Please tell us a little about what happened.')
      return
    }

    setLoading(true)
    setError('')
    setResult(getInstantSkillResult(skill.id, normalized, lang))

    try {
      const next = await runReliableSkill(skill.id, normalized, lang)
      setResult(next)
    } catch {
      setResult(getInstantSkillResult(skill.id, normalized, lang))
    } finally {
      setLoading(false)
    }
  }

  const chooseExample = (starter: string, index: number) => {
    setSelectedExample(index)
    setInput(starter)
    setError('')
    setLoading(false)
    setResult(getInstantSkillResult(skill.id, starter, lang))
  }

  return <div className="live-skill-demo">
    <div className="live-skill-input-panel">
      <div className="live-skill-panel-heading">
        <span>{lang === 'zh' ? '像平时说话一样' : 'Use your own words'}</span>
        <strong>{lang === 'zh' ? '不用写得正式，您怎么说都可以' : 'No formal wording is needed'}</strong>
      </div>
      <label>
        <span>{config.inputLabel[lang]}</span>
        <textarea
          value={input}
          onChange={(event) => {
            const value = event.target.value
            setSelectedExample(null)
            setInput(value)
            setResult(value.trim().length >= 3 ? getInstantSkillResult(skill.id, value, lang) : null)
          }}
          placeholder={config.placeholder[lang]}
          rows={6}
        />
      </label>
      <div className="live-skill-examples">
        <small>{lang === 'zh' ? '也可以点一个相近的情况' : 'Or choose a similar situation'}</small>
        {config.starters[lang].map((starter, index) => <button key={starter} className={selectedExample === index ? 'active' : ''} type="button" onClick={() => chooseExample(starter, index)}>
          <span>{String(index + 1).padStart(2, '0')}</span>
          <p>{starter}</p>
        </button>)}
      </div>
      {error && <p className="live-skill-error">{error}</p>}
      <button className="run-live-skill" type="button" onClick={() => run()} disabled={loading}>
        {loading ? <LoaderCircle className="spin" size={18} /> : <Play size={18} />}
        {loading ? (lang === 'zh' ? '正在帮您整理…' : 'Organizing it for you…') : (lang === 'zh' ? '帮我处理一下' : 'Help me with this')}
      </button>
    </div>

    <div className="live-skill-result-panel">
      <div className="conversation-toolbar">
        <span>{lang === 'zh' ? '技能处理结果' : 'Skill output'}</span>
        <i>{result?.engine === 'ai' ? 'AI' : result ? (lang === 'zh' ? '已生成' : 'Ready') : '○'}</i>
      </div>
      {!result && !loading && <div className="live-result-empty">
        <Sparkles size={28} />
        <h3>{lang === 'zh' ? '把情况说出来，这里马上给您结果' : 'Describe the situation to see a result'}</h3>
        <p>{lang === 'zh' ? '不用学提示词，也不用写完整句子。系统会先听懂您的意思，再把事情整理清楚。' : 'No prompt-writing skills are needed. The system first understands the situation, then organizes it clearly.'}</p>
      </div>}
      {loading && !result && <div className="live-result-loading">
        <LoaderCircle className="spin" size={30} />
        <h3>{lang === 'zh' ? '正在帮您处理' : 'Working on it'}</h3>
        <p>{lang === 'zh' ? '先把情况听明白，再给出清楚的下一步。' : 'Understanding the situation and preparing clear next steps.'}</p>
      </div>}
      {result && <div className={`live-skill-result risk-${result.level ?? 'low'}`}>
        <div className="live-result-title">
          {result.level === 'high' ? <AlertTriangle size={24} /> : <CheckCircle2 size={24} />}
          <div>
            <small>{result.engine === 'ai' ? (lang === 'zh' ? 'AI + 技能生成' : 'AI + Skill generated') : (lang === 'zh' ? '技能已根据当前内容生成' : 'Generated from the current input')}</small>
            <h3>{result.title}</h3>
          </div>
        </div>
        <p className="live-result-summary">{result.summary}</p>
        <div className="live-result-sections">
          {result.sections.map((section) => <section key={section.heading}>
            <h4>{section.heading}</h4>
            <ul>{section.items.map((item) => <li key={item}>{item}</li>)}</ul>
          </section>)}
        </div>
        {result.note && <p className="live-result-note">{result.note}</p>}
      </div>}
    </div>
  </div>
}

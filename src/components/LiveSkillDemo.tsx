import { AlertTriangle, CheckCircle2, LoaderCircle, Play, Sparkles } from 'lucide-react'
import { useEffect, useState } from 'react'
import type { Lang, SkillItem } from '../data'
import { getLiveSkillConfig, runLiveSkill, type SkillResult } from '../skillDemos'

export default function LiveSkillDemo({ skill, lang }: { skill: SkillItem; lang: Lang }) {
  const config = getLiveSkillConfig(skill.id)
  const [input, setInput] = useState('')
  const [result, setResult] = useState<SkillResult | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    if (!config) return
    setInput(config.starters[lang][0])
    setResult(null)
    setError('')
  }, [config, lang, skill.id])

  if (!config) return null

  const run = async (value = input) => {
    const normalized = value.trim()
    if (normalized.length < 3) {
      setError(lang === 'zh' ? '请先输入一些内容。' : 'Please enter some content first.')
      return
    }
    setLoading(true)
    setError('')
    setResult(null)
    const next = await runLiveSkill(skill.id, normalized, lang)
    setResult(next)
    setLoading(false)
  }

  return <div className="live-skill-demo">
    <div className="live-skill-input-panel">
      <div className="live-skill-panel-heading">
        <span>{lang === 'zh' ? '真实输入' : 'Live input'}</span>
        <strong>{lang === 'zh' ? '这个技能会真正处理你输入的内容' : 'This skill actually processes your input'}</strong>
      </div>
      <label>
        <span>{config.inputLabel[lang]}</span>
        <textarea
          value={input}
          onChange={(event) => setInput(event.target.value)}
          placeholder={config.placeholder[lang]}
          rows={6}
        />
      </label>
      <div className="live-skill-examples">
        <small>{lang === 'zh' ? '试一个真实案例' : 'Try a real case'}</small>
        {config.starters[lang].map((starter, index) => <button key={starter} type="button" onClick={() => { setInput(starter); setResult(null) }}>
          <span>{String(index + 1).padStart(2, '0')}</span>
          <p>{starter}</p>
        </button>)}
      </div>
      {error && <p className="live-skill-error">{error}</p>}
      <button className="run-live-skill" type="button" onClick={() => run()} disabled={loading}>
        {loading ? <LoaderCircle className="spin" size={18} /> : <Play size={18} />}
        {loading ? (lang === 'zh' ? '技能正在运行…' : 'Running skill…') : (lang === 'zh' ? '运行这个技能' : 'Run this skill')}
      </button>
    </div>

    <div className="live-skill-result-panel">
      <div className="conversation-toolbar">
        <span>{lang === 'zh' ? '技能运行结果' : 'Skill output'}</span>
        <i>{result?.engine === 'ai' ? 'AI' : result ? (lang === 'zh' ? '本地引擎' : 'Local engine') : '○'}</i>
      </div>
      {!result && !loading && <div className="live-result-empty">
        <Sparkles size={28} />
        <h3>{lang === 'zh' ? '这里会展示结构化结果' : 'Structured output appears here'}</h3>
        <p>{lang === 'zh' ? '它不是预先写好的固定回复。运行后，技能会根据当前输入重新分析和生成结果。' : 'This is not a fixed canned reply. The skill analyzes the current input and generates a fresh result.'}</p>
      </div>}
      {loading && <div className="live-result-loading">
        <LoaderCircle className="spin" size={30} />
        <h3>{lang === 'zh' ? '正在调用技能能力' : 'Calling skill capabilities'}</h3>
        <p>{lang === 'zh' ? '分析输入、应用技能规则并组织结果。' : 'Analyzing input, applying skill rules, and organizing the result.'}</p>
      </div>}
      {result && <div className={`live-skill-result risk-${result.level ?? 'low'}`}>
        <div className="live-result-title">
          {result.level === 'high' ? <AlertTriangle size={24} /> : <CheckCircle2 size={24} />}
          <div>
            <small>{result.engine === 'ai' ? (lang === 'zh' ? 'AI + Skill 生成' : 'AI + Skill generated') : (lang === 'zh' ? 'Skill 本地引擎生成' : 'Skill local engine generated')}</small>
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

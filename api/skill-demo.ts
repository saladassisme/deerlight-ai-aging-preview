type Lang = 'zh' | 'en'

type Bilingual = { zh?: string; en?: string }
type RequestBody = {
  skillId?: number
  input?: string
  lang?: Lang
  skill?: { name?: Bilingual; description?: Bilingual; category?: string }
}

const schema = {
  type: 'object', additionalProperties: false,
  required: ['title', 'summary', 'sections', 'note'],
  properties: {
    title: { type: 'string' }, summary: { type: 'string' },
    level: { type: 'string', enum: ['low', 'medium', 'high'] },
    sections: { type: 'array', minItems: 2, maxItems: 5, items: { type: 'object', additionalProperties: false, required: ['heading', 'items'], properties: { heading: { type: 'string' }, items: { type: 'array', minItems: 1, maxItems: 6, items: { type: 'string' } } } } },
    note: { type: 'string' },
  },
}

function send(res: any, status: number, body: unknown) {
  res.statusCode = status
  res.setHeader('Content-Type', 'application/json; charset=utf-8')
  res.end(JSON.stringify(body))
}

const categoryRules: Record<string, string> = {
  '安全': 'Pause irreversible actions, identify specific risks, verify through independent trusted channels, and preserve human confirmation.',
  '健康': 'Organize facts without diagnosing, prescribing, or changing medication. Identify missing details, clinician questions, and urgent warning signs.',
  '家庭': 'Preserve the user’s voice and facts, separate confirmed information from assumptions, and protect private information.',
  '学习': 'Teach one action at a time with short, repeatable, accessible steps and a simple completion check.',
  '生活': 'Create practical, low-friction steps, prefer familiar and reversible options, and clearly mark decisions requiring confirmation.',
  '机构': 'Produce structured, traceable outputs with facts, actions, owners, permissions, sources, and escalation paths.',
}

export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') return send(res, 405, { error: 'Method not allowed' })
  try {
    const body = (typeof req.body === 'string' ? JSON.parse(req.body) : req.body) as RequestBody
    const input = String(body?.input ?? '').trim().slice(0, 6000)
    const lang: Lang = body?.lang === 'en' ? 'en' : 'zh'
    const name = String(body?.skill?.name?.[lang] ?? body?.skill?.name?.zh ?? 'Deerlight Skill').slice(0, 120)
    const description = String(body?.skill?.description?.[lang] ?? body?.skill?.description?.zh ?? '').slice(0, 500)
    const category = String(body?.skill?.category ?? '')
    if (input.length < 3 || !name) return send(res, 400, { error: 'Invalid skill or input' })
    if (!process.env.OPENAI_API_KEY) return send(res, 503, { error: 'AI engine is not configured' })

    const languageInstruction = lang === 'zh' ? 'Respond entirely in clear, natural Simplified Chinese with readable spacing and no unnecessary jargon.' : 'Respond entirely in clear, natural English.'
    const safety = categoryRules[category] ?? 'Produce a useful, editable result grounded only in the user input. Do not invent facts. Clearly mark uncertainty and anything requiring human confirmation.'
    const response = await fetch('https://api.openai.com/v1/responses', {
      method: 'POST',
      headers: { Authorization: `Bearer ${process.env.OPENAI_API_KEY}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model: process.env.OPENAI_SKILL_MODEL || 'gpt-4.1-mini',
        store: false,
        instructions: `You are running the Deerlight skill “${name}”. Capability: ${description}. ${safety} ${languageInstruction} Return a concrete result tailored to the current input, not generic advice. Return only the requested JSON structure.`,
        input,
        text: { format: { type: 'json_schema', name: 'skill_result', strict: true, schema } },
      }),
    })
    if (!response.ok) return send(res, 502, { error: 'AI generation failed' })
    const data = await response.json()
    const text = data.output_text || data.output?.flatMap((item: any) => item.content || []).find((item: any) => item.type === 'output_text')?.text
    if (!text) return send(res, 502, { error: 'Empty AI result' })
    return send(res, 200, JSON.parse(text))
  } catch (error) {
    console.error('Skill demo handler error', error)
    return send(res, 500, { error: 'Skill execution failed' })
  }
}

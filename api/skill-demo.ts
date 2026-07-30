type Lang = 'zh' | 'en'

type RequestBody = {
  skillId?: number
  input?: string
  lang?: Lang
}

type SkillSpec = {
  name: string
  instructions: string
}

const skills: Record<number, SkillSpec> = {
  1: {
    name: 'Scam Message Check',
    instructions: `Analyze only the behavior patterns in the message. Do not claim certainty about identity. Identify specific risk signals, give safe verification steps, and provide one short reply template. Never ask the user to click a link, call a number found in the suspicious message, share credentials, or continue a payment.`,
  },
  3: {
    name: 'Visit Prep',
    instructions: `Turn the user's health description into a clinician-ready visit brief. Do not diagnose, prescribe, or recommend changing medicine. Preserve the user's facts, identify missing details to record, create practical questions for a clinician, and clearly name urgent warning signs when relevant.`,
  },
  8: {
    name: 'Photo Memory Story',
    instructions: `Turn the memory into a warm nonfiction draft without inventing new facts. Keep the emotional insight grounded in the details supplied. Then suggest three specific follow-up questions and three useful materials the family could add.`,
  },
}

const schema = {
  type: 'object',
  additionalProperties: false,
  required: ['title', 'summary', 'sections', 'note'],
  properties: {
    title: { type: 'string' },
    summary: { type: 'string' },
    level: { type: 'string', enum: ['low', 'medium', 'high'] },
    sections: {
      type: 'array',
      minItems: 2,
      maxItems: 5,
      items: {
        type: 'object',
        additionalProperties: false,
        required: ['heading', 'items'],
        properties: {
          heading: { type: 'string' },
          items: { type: 'array', minItems: 1, maxItems: 5, items: { type: 'string' } },
        },
      },
    },
    note: { type: 'string' },
  },
}

function send(res: any, status: number, body: unknown) {
  res.statusCode = status
  res.setHeader('Content-Type', 'application/json; charset=utf-8')
  res.end(JSON.stringify(body))
}

export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') return send(res, 405, { error: 'Method not allowed' })

  const body = (typeof req.body === 'string' ? JSON.parse(req.body) : req.body) as RequestBody
  const skillId = Number(body?.skillId)
  const input = String(body?.input ?? '').trim().slice(0, 5000)
  const lang: Lang = body?.lang === 'en' ? 'en' : 'zh'
  const skill = skills[skillId]

  if (!skill || input.length < 3) return send(res, 400, { error: 'Invalid skill or input' })
  if (!process.env.OPENAI_API_KEY) return send(res, 503, { error: 'AI engine is not configured' })

  const languageInstruction = lang === 'zh'
    ? 'Respond entirely in clear, natural Simplified Chinese. Use readable Chinese phrasing and avoid unnecessary jargon.'
    : 'Respond entirely in clear, natural English.'

  try {
    const response = await fetch('https://api.openai.com/v1/responses', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: process.env.OPENAI_SKILL_MODEL || 'gpt-4.1-mini',
        store: false,
        instructions: `You are running the ${skill.name} skill. ${skill.instructions} ${languageInstruction} Return only the requested structured result.`,
        input,
        text: {
          format: {
            type: 'json_schema',
            name: 'skill_result',
            strict: true,
            schema,
          },
        },
      }),
    })

    if (!response.ok) {
      const detail = await response.text()
      console.error('OpenAI skill demo error', response.status, detail.slice(0, 500))
      return send(res, 502, { error: 'AI generation failed' })
    }

    const data = await response.json()
    const text = data.output_text || data.output?.flatMap((item: any) => item.content || []).find((item: any) => item.type === 'output_text')?.text
    if (!text) return send(res, 502, { error: 'Empty AI result' })

    const parsed = JSON.parse(text)
    return send(res, 200, parsed)
  } catch (error) {
    console.error('Skill demo handler error', error)
    return send(res, 500, { error: 'Skill execution failed' })
  }
}

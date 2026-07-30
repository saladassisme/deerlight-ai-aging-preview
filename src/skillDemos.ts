import type { Lang } from './data'

export type SkillResult = {
  title: string
  summary: string
  level?: 'low' | 'medium' | 'high'
  sections: Array<{ heading: string; items: string[] }>
  note?: string
  engine: 'ai' | 'local'
}

type LiveSkillConfig = {
  id: number
  inputLabel: { zh: string; en: string }
  placeholder: { zh: string; en: string }
  starters: { zh: string[]; en: string[] }
}

const configs: Record<number, LiveSkillConfig> = {
  1: {
    id: 1,
    inputLabel: { zh: '粘贴需要检查的消息', en: 'Paste the message to check' },
    placeholder: { zh: '例如：银行客服说账户异常，让我点击链接并提供验证码……', en: 'Example: A bank agent says my account is at risk and asks me to click a link and share a code…' },
    starters: {
      zh: [
        '【XX银行】您的账户存在异常，今晚前点击 http://bank-safe.example 完成验证，否则将被冻结。请勿向他人泄露本短信。',
        '我是你女儿，手机坏了，现在急用 5000 元。先转到这个新账户，晚点再解释。',
        '快递客服说包裹丢失，要给我三倍赔偿，让我下载会议软件并开启屏幕共享。',
      ],
      en: [
        'Your bank account is at risk. Verify tonight at http://bank-safe.example or it will be frozen. Send us the code you receive.',
        'This is your daughter. My phone broke and I urgently need 5,000. Please transfer it to this new account now.',
        'A courier agent offered triple compensation and asked me to install a meeting app and share my screen.',
      ],
    },
  },
  3: {
    id: 3,
    inputLabel: { zh: '描述症状、持续时间和正在使用的药物', en: 'Describe symptoms, duration, and current medicines' },
    placeholder: { zh: '例如：夜间咳嗽两周，走快会喘，正在服用降压药……', en: 'Example: Night cough for two weeks, breathless when walking fast, taking blood-pressure medicine…' },
    starters: {
      zh: [
        '夜间咳嗽两周，白天较轻，走快会喘。没有测过体温，正在服用降压药，明天下午去呼吸科。',
        '右膝上下楼疼了一个月，早晨不明显，走久后加重。以前扭伤过，没有明显红肿。',
        '最近三天头晕，起床时更明显。昨天忘记吃降压药，今天血压 158/92。',
      ],
      en: [
        'Night cough for two weeks, milder during the day, and breathless when walking fast. I take blood-pressure medicine and see respiratory medicine tomorrow.',
        'Right knee pain on stairs for one month, worse after long walks. Previous sprain, no obvious redness or swelling.',
        'Dizziness for three days, especially when getting up. I missed my blood-pressure medicine yesterday; today the reading was 158/92.',
      ],
    },
  },
  8: {
    id: 8,
    inputLabel: { zh: '写下一段真实回忆', en: 'Write a real memory' },
    placeholder: { zh: '例如：1998 年夏天，外公把最大的一串葡萄留给我……', en: 'Example: In the summer of 1998, Grandpa saved the biggest bunch of grapes for me…' },
    starters: {
      zh: [
        '1998 年夏天，我住在外公家的院子里。葡萄成熟后，他总把最大的一串留给我，自己只吃掉落的小颗。',
        '我第一次去外地上大学时，妈妈一路没有说太多话。火车开动后，我才发现行李侧袋里塞着她手写的地址和二百元钱。',
        '父亲退休后的第一年开始学做饭。他第一次做的番茄炒蛋有点咸，却坚持把最完整的一块蛋夹到我碗里。',
      ],
      en: [
        'In the summer of 1998 I stayed in Grandpa’s courtyard. When the grapes ripened, he saved the biggest bunch for me and ate only the small fallen ones.',
        'When I first left home for university, Mum barely spoke. After the train moved, I found her handwritten address and some money hidden in the side pocket.',
        'In his first year after retirement, Dad learned to cook. His first tomato-and-egg dish was salty, but he put the best piece in my bowl.',
      ],
    },
  },
}

export function getLiveSkillConfig(id: number) {
  return configs[id]
}

function scamFallback(input: string, lang: Lang): SkillResult {
  const text = input.toLowerCase()
  const signals: string[] = []
  let score = 0

  const add = (condition: boolean, points: number, zh: string, en: string) => {
    if (!condition) return
    score += points
    signals.push(lang === 'zh' ? zh : en)
  }

  add(/https?:\/\/|www\.|点击.*链接|link/.test(text), 3, '包含外部链接或要求点击链接', 'Contains an external link or asks you to click one')
  add(/验证码|密码|口令|code|password|otp/.test(text), 3, '索取验证码、密码或其他私密凭证', 'Requests a verification code, password, or private credential')
  add(/今晚|立即|马上|限时|冻结|逾期|urgent|immediately|tonight|frozen/.test(text), 2, '使用紧迫时间或账户威胁推动立即操作', 'Uses urgency or an account threat to force immediate action')
  add(/转账|付款|赔偿|退款|汇款|transfer|payment|refund|compensation/.test(text), 2, '涉及转账、退款或赔偿流程', 'Involves a transfer, refund, or compensation flow')
  add(/屏幕共享|会议软件|远程控制|share.*screen|remote access|meeting app/.test(text), 3, '要求屏幕共享、安装会议软件或远程控制', 'Requests screen sharing, meeting software, or remote access')
  add(/女儿|儿子|家人|客服|银行|公安|快递|daughter|son|family|bank|police|courier/.test(text), 1, '使用家人或机构身份建立信任', 'Uses a family or institutional identity to establish trust')

  const level = score >= 6 ? 'high' : score >= 3 ? 'medium' : 'low'
  const levelText = lang === 'zh'
    ? { high: '高风险', medium: '需要核实', low: '暂未发现明显高风险特征' }[level]
    : { high: 'High risk', medium: 'Verification needed', low: 'No strong high-risk pattern detected' }[level]

  return {
    title: levelText,
    level,
    summary: lang === 'zh'
      ? `${levelText}。这不是对发送者身份的最终判定，而是根据消息中的行为特征给出的风险提示。`
      : `${levelText}. This is a behavioral risk assessment, not a final judgment of the sender’s identity.`,
    sections: [
      {
        heading: lang === 'zh' ? '发现的风险信号' : 'Risk signals found',
        items: signals.length ? signals : [lang === 'zh' ? '未匹配到常见高风险话术，但仍应通过官方渠道确认身份。' : 'No common high-risk pattern matched, but the identity should still be verified through an official channel.'],
      },
      {
        heading: lang === 'zh' ? '现在建议这样做' : 'Recommended next steps',
        items: lang === 'zh'
          ? ['不要点击消息中的链接，也不要安装对方指定的软件。', '不要提供验证码、密码、身份证号或银行卡信息。', '暂停转账，通过官方 App、卡背电话或本人原有联系方式独立核实。']
          : ['Do not click links or install software requested in the message.', 'Do not share codes, passwords, identity numbers, or bank details.', 'Pause any payment and verify independently through the official app, card phone number, or an existing contact.'],
      },
      {
        heading: lang === 'zh' ? '可直接发送的回复' : 'Safe reply template',
        items: [lang === 'zh' ? '“我不会通过此链接或新账户操作。我会自行联系官方渠道或家人原来的号码核实。”' : '“I will not use this link or new account. I will verify through the official channel or the person’s existing number.”'],
      },
    ],
    note: lang === 'zh' ? '涉及资金损失或已泄露验证码时，请立即联系银行并报警。' : 'If money has been sent or a code was exposed, contact the bank and local authorities immediately.',
    engine: 'local',
  }
}

function visitFallback(input: string, lang: Lang): SkillResult {
  const text = input.toLowerCase()
  const questions: string[] = []
  const redFlags: string[] = []

  const pushQuestion = (condition: boolean, zh: string, en: string) => {
    if (condition) questions.push(lang === 'zh' ? zh : en)
  }
  pushQuestion(/咳|cough/.test(text), '咳嗽可能与哪些常见原因有关，需要做哪些检查？', 'What common causes should be considered for the cough, and which tests may be useful?')
  pushQuestion(/喘|呼吸|breath|shortness/.test(text), '活动后气喘是否需要检查血氧、心肺功能或影像？', 'Should exertional breathlessness be evaluated with oxygen level, heart/lung tests, or imaging?')
  pushQuestion(/膝|疼|痛|knee|pain/.test(text), '哪些动作需要暂时减少，是否适合康复训练或影像检查？', 'Which movements should be reduced, and would rehabilitation or imaging be appropriate?')
  pushQuestion(/头晕|dizz/.test(text), '头晕是否可能与体位、血压或用药有关，应该如何记录？', 'Could the dizziness relate to posture, blood pressure, or medicine, and how should it be tracked?')
  pushQuestion(/降压药|血压|blood pressure/.test(text), '现有降压药是否需要调整？漏服后应该如何处理？', 'Does the current blood-pressure medicine need review, and what should be done after a missed dose?')
  if (questions.length === 0) questions.push(lang === 'zh' ? '这些症状最需要排除哪些情况？下一步建议做什么检查或观察？' : 'Which conditions should be ruled out first, and what examination or monitoring is appropriate next?')

  if (/胸痛|呼吸困难|昏厥|意识不清|剧烈|chest pain|cannot breathe|faint|confusion|severe/.test(text)) {
    redFlags.push(lang === 'zh' ? '描述中可能包含需要尽快评估的警示表现，请不要等待普通门诊。' : 'The description may include a warning sign that needs prompt assessment rather than waiting for a routine visit.')
  } else {
    redFlags.push(lang === 'zh' ? '若出现胸痛、明显呼吸困难、昏厥、意识变化或症状快速加重，应及时就医。' : 'Seek timely care for chest pain, marked breathing difficulty, fainting, confusion, or rapidly worsening symptoms.')
  }

  return {
    title: lang === 'zh' ? '就诊准备已整理' : 'Visit brief prepared',
    summary: lang === 'zh' ? '以下内容可以直接给医生看。系统只整理信息与提问，不提供诊断或替代专业判断。' : 'This can be shown directly to a clinician. It organizes information and questions but does not diagnose or replace professional judgment.',
    sections: [
      {
        heading: lang === 'zh' ? '本人描述' : 'Patient description',
        items: [input.trim()],
      },
      {
        heading: lang === 'zh' ? '建议补充记录' : 'Useful details to add',
        items: lang === 'zh'
          ? ['症状第一次出现的日期、每天发生的时间和变化趋势。', '最近测量的体温、血压、心率或血氧，以及测量时间。', '所有正在使用的药物、剂量、服用时间和是否有漏服。']
          : ['Date of first onset, time of day, frequency, and how the symptom is changing.', 'Recent temperature, blood pressure, pulse, or oxygen readings with measurement times.', 'All medicines, doses, timing, and any missed doses.'],
      },
      {
        heading: lang === 'zh' ? '建议询问医生' : 'Questions for the clinician',
        items: questions.slice(0, 4),
      },
      {
        heading: lang === 'zh' ? '安全提醒' : 'Safety note',
        items: redFlags,
      },
    ],
    note: lang === 'zh' ? '不要根据此结果自行停药或改变剂量。' : 'Do not stop or change medicine based on this result.',
    engine: 'local',
  }
}

function memoryFallback(input: string, lang: Lang): SkillResult {
  const cleaned = input.trim().replace(/\s+/g, ' ')
  const story = lang === 'zh'
    ? `${cleaned} 这段记忆真正留下来的，是一个很小却很清楚的动作。它没有被郑重地说出口，却让关心有了可以触摸的形状。多年以后再回头看，当时普通的一天，也因此成为值得被保存的一页。`
    : `${cleaned} What remains is a small but precise gesture. Nothing had to be declared aloud; care became visible through an ordinary action. Looking back years later, an everyday moment has become a page worth preserving.`

  return {
    title: lang === 'zh' ? '回忆故事草稿' : 'Memory story draft',
    summary: lang === 'zh' ? '草稿只使用你提供的事实，并把情感线索整理成更可读的叙事。' : 'The draft uses only the facts provided and shapes their emotional thread into a readable narrative.',
    sections: [
      {
        heading: lang === 'zh' ? '故事草稿' : 'Story draft',
        items: [story],
      },
      {
        heading: lang === 'zh' ? '下一轮可以追问' : 'Good follow-up questions',
        items: lang === 'zh'
          ? ['当时周围是什么季节、光线或声音？', '对方做这个动作时，有没有说过一句你还记得的话？', '现在的你如何理解当时没有说出口的心意？']
          : ['What season, light, or sound do you remember around the moment?', 'Did the person say anything you still remember?', 'How do you understand the unspoken feeling now?'],
      },
      {
        heading: lang === 'zh' ? '适合补充的素材' : 'Useful material to add',
        items: lang === 'zh'
          ? ['人物和地点的准确称呼', '对应年份的照片、票据或手写文字', '另一位家人对同一件事的记忆']
          : ['Exact names of people and places', 'A photo, ticket, or handwritten note from that year', 'Another family member’s version of the same event'],
      },
    ],
    note: lang === 'zh' ? '生成内容应由本人确认后再保存为正式回忆。' : 'The writer should confirm the generated text before saving it as a formal memory.',
    engine: 'local',
  }
}

function runLocalSkill(id: number, input: string, lang: Lang) {
  if (id === 1) return scamFallback(input, lang)
  if (id === 3) return visitFallback(input, lang)
  return memoryFallback(input, lang)
}

function isValidResult(value: unknown): value is SkillResult {
  if (!value || typeof value !== 'object') return false
  const candidate = value as SkillResult
  return typeof candidate.title === 'string' && typeof candidate.summary === 'string' && Array.isArray(candidate.sections)
}

export async function runLiveSkill(id: number, input: string, lang: Lang): Promise<SkillResult> {
  const fallback = runLocalSkill(id, input, lang)
  const controller = new AbortController()
  const timeout = window.setTimeout(() => controller.abort(), 16000)

  try {
    const response = await fetch('/api/skill-demo', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ skillId: id, input, lang }),
      signal: controller.signal,
    })
    if (!response.ok) return fallback
    const result = await response.json()
    if (!isValidResult(result)) return fallback
    return { ...result, engine: 'ai' }
  } catch {
    return fallback
  } finally {
    window.clearTimeout(timeout)
  }
}

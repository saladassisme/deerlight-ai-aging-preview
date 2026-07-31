import type { Lang, SkillItem } from './data'
import { skills, tx } from './data'

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

const specialized: Record<number, LiveSkillConfig> = {
  1: {
    id: 1,
    inputLabel: { zh: '粘贴需要检查的消息', en: 'Paste the message to check' },
    placeholder: { zh: '例如：银行客服说账户异常，让我点击链接并提供验证码……', en: 'Example: A bank agent says my account is at risk and asks me to click a link and share a code…' },
    starters: {
      zh: ['【XX银行】您的账户存在异常，今晚前点击链接完成验证，否则将被冻结。', '我是你女儿，手机坏了，现在急用 5000 元，请转到这个新账户。', '快递客服说包裹丢失，要赔偿，让我下载会议软件并共享屏幕。'],
      en: ['Your bank account is at risk. Verify tonight using this link or it will be frozen.', 'This is your daughter. My phone broke and I urgently need a transfer to a new account.', 'A courier agent offered compensation and asked me to install a meeting app and share my screen.'],
    },
  },
  3: {
    id: 3,
    inputLabel: { zh: '描述症状、持续时间和正在使用的药物', en: 'Describe symptoms, duration, and current medicines' },
    placeholder: { zh: '例如：夜间咳嗽两周，走快会喘，正在服用降压药……', en: 'Example: Night cough for two weeks, breathless when walking fast, taking blood-pressure medicine…' },
    starters: {
      zh: ['夜间咳嗽两周，白天较轻，走快会喘。正在服用降压药，明天下午去呼吸科。', '右膝上下楼疼了一个月，走久后加重，以前扭伤过，没有明显红肿。', '最近三天头晕，起床时更明显。昨天忘记吃降压药，今天血压 158/92。'],
      en: ['Night cough for two weeks, milder in daytime, breathless when walking fast. I take blood-pressure medicine.', 'Right knee pain on stairs for one month, worse after long walks, with a previous sprain.', 'Dizziness for three days, especially when getting up. I missed blood-pressure medicine yesterday.'],
    },
  },
  8: {
    id: 8,
    inputLabel: { zh: '写下一段真实回忆', en: 'Write a real memory' },
    placeholder: { zh: '例如：1998 年夏天，外公把最大的一串葡萄留给我……', en: 'Example: In summer 1998, Grandpa saved the biggest bunch of grapes for me…' },
    starters: {
      zh: ['1998 年夏天，我住在外公家的院子里。葡萄成熟后，他总把最大的一串留给我。', '第一次去外地上大学时，火车开动后，我发现妈妈在行李侧袋里塞了地址和二百元钱。', '父亲退休后开始学做饭，第一次做的番茄炒蛋有点咸，却把最完整的一块夹到我碗里。'],
      en: ['In summer 1998 I stayed in Grandpa’s courtyard. He always saved the biggest bunch of grapes for me.', 'When I first left for university, I found Mum’s handwritten address and money hidden in my bag.', 'After retirement Dad learned to cook and put the best piece of his first dish in my bowl.'],
    },
  },
}

function genericConfig(skill: SkillItem): LiveSkillConfig {
  const zhName = tx(skill.name, 'zh')
  const enName = tx(skill.name, 'en')
  return {
    id: skill.id,
    inputLabel: { zh: `告诉“${zhName}”你现在需要处理什么`, en: `Tell “${enName}” what you need help with` },
    placeholder: { zh: `请写下真实情况、目标和必要限制。${tx(skill.description, 'zh')}`, en: `Describe the real situation, goal, and constraints. ${tx(skill.description, 'en')}` },
    starters: {
      zh: [`请帮我处理这件事：${tx(skill.description, 'zh')}我希望步骤简单、结果清楚。`, '这是我的真实情况：我不熟悉复杂操作，请先整理信息，再告诉我下一步。', '请根据我的目标生成一个可以直接使用的结果，并标出需要我确认的地方。'],
      en: [`Help me with this real task: ${tx(skill.description, 'en')} Keep the steps simple and the result clear.`, 'Here is my situation: I am not comfortable with complex steps. Organize the information first, then tell me what to do next.', 'Create a result I can use directly and clearly mark anything that needs my confirmation.'],
    },
  }
}

export function getLiveSkillConfig(id: number) {
  const skill = skills.find((item) => item.id === id)
  if (!skill) return undefined
  return specialized[id] ?? genericConfig(skill)
}

function scamFallback(input: string, lang: Lang): SkillResult {
  const text = input.toLowerCase()
  const signals: string[] = []
  const add = (condition: boolean, zh: string, en: string) => condition && signals.push(lang === 'zh' ? zh : en)
  add(/https?:\/\/|点击.*链接|link/.test(text), '包含外部链接或要求点击链接', 'Contains an external link or asks you to click one')
  add(/验证码|密码|code|password|otp/.test(text), '索取验证码、密码或私密凭证', 'Requests a code, password, or private credential')
  add(/立即|马上|今晚|冻结|urgent|immediately|frozen/.test(text), '使用紧迫时间或账户威胁', 'Uses urgency or an account threat')
  add(/转账|付款|退款|赔偿|transfer|payment|refund/.test(text), '涉及转账、退款或赔偿', 'Involves a transfer, refund, or compensation')
  add(/屏幕共享|远程控制|share.*screen|remote/.test(text), '要求屏幕共享或远程控制', 'Requests screen sharing or remote access')
  const level = signals.length >= 3 ? 'high' : signals.length ? 'medium' : 'low'
  return {
    title: lang === 'zh' ? (level === 'high' ? '高风险' : level === 'medium' ? '需要核实' : '暂未发现明显高风险特征') : (level === 'high' ? 'High risk' : level === 'medium' ? 'Verification needed' : 'No strong high-risk pattern detected'),
    level,
    summary: lang === 'zh' ? '这是根据消息行为特征生成的风险提示，不是对发送者身份的最终判定。' : 'This is a behavioral risk assessment, not a final judgment of identity.',
    sections: [
      { heading: lang === 'zh' ? '风险信号' : 'Risk signals', items: signals.length ? signals : [lang === 'zh' ? '未匹配到常见高风险话术，仍建议独立核实。' : 'No common high-risk pattern matched; independent verification is still recommended.'] },
      { heading: lang === 'zh' ? '安全操作' : 'Safe actions', items: lang === 'zh' ? ['不要点击消息中的链接。', '不要提供验证码、密码或银行卡信息。', '通过官方 App、卡背电话或原有联系方式独立核实。'] : ['Do not click links in the message.', 'Do not share codes, passwords, or bank details.', 'Verify independently through an official app, card phone number, or existing contact.'] },
    ],
    note: lang === 'zh' ? '已发生资金损失时，请立即联系银行并报警。' : 'If money has been lost, contact the bank and local authorities immediately.',
    engine: 'local',
  }
}

function visitFallback(input: string, lang: Lang): SkillResult {
  return {
    title: lang === 'zh' ? '就诊准备已整理' : 'Visit brief prepared',
    summary: lang === 'zh' ? '以下内容可以直接给医生看。系统只整理信息与问题，不提供诊断。' : 'This can be shown to a clinician. It organizes information and questions but does not diagnose.',
    sections: [
      { heading: lang === 'zh' ? '本人描述' : 'Patient description', items: [input.trim()] },
      { heading: lang === 'zh' ? '建议补充记录' : 'Useful details to add', items: lang === 'zh' ? ['首次出现日期、发生频率和变化趋势。', '近期体温、血压、心率或血氧。', '全部药物、剂量、服用时间和漏服情况。'] : ['Onset date, frequency, and trend.', 'Recent temperature, blood pressure, pulse, or oxygen readings.', 'All medicines, doses, timing, and missed doses.'] },
      { heading: lang === 'zh' ? '建议询问医生' : 'Questions for the clinician', items: lang === 'zh' ? ['最需要排除哪些情况？', '需要做哪些检查或持续观察？', '哪些变化需要提前就医？'] : ['Which conditions should be ruled out?', 'Which tests or monitoring may be useful?', 'Which changes require earlier care?'] },
    ],
    note: lang === 'zh' ? '不要根据此结果自行停药或改变剂量。' : 'Do not stop or change medicine based on this result.',
    engine: 'local',
  }
}

function memoryFallback(input: string, lang: Lang): SkillResult {
  return {
    title: lang === 'zh' ? '回忆故事草稿' : 'Memory story draft',
    summary: lang === 'zh' ? '草稿只使用你提供的事实，把情感线索整理成更可读的叙事。' : 'The draft uses only the supplied facts and shapes them into a readable narrative.',
    sections: [
      { heading: lang === 'zh' ? '故事草稿' : 'Story draft', items: [lang === 'zh' ? `${input.trim()} 这段记忆留下来的，是一个很小却清楚的动作。它没有被郑重说出口，却让关心有了可以触摸的形状。` : `${input.trim()} What remains is a small but precise gesture. Nothing had to be declared aloud; care became visible through an ordinary action.`] },
      { heading: lang === 'zh' ? '下一轮可以追问' : 'Follow-up questions', items: lang === 'zh' ? ['当时周围是什么季节、光线或声音？', '对方有没有说过一句你还记得的话？', '现在的你如何理解当时的心意？'] : ['What season, light, or sound do you remember?', 'Did the person say anything you still remember?', 'How do you understand the feeling now?'] },
    ],
    note: lang === 'zh' ? '请由本人确认后再保存为正式回忆。' : 'Confirm the draft before saving it as a formal memory.',
    engine: 'local',
  }
}

function genericFallback(skill: SkillItem, input: string, lang: Lang): SkillResult {
  const name = tx(skill.name, lang)
  const description = tx(skill.description, lang)
  const categoryGuidance: Record<string, { zh: string[]; en: string[] }> = {
    生活: { zh: ['把目标拆成少量清楚步骤。', '优先使用熟悉、可回退的方案。', '标出需要本人确认的信息。'], en: ['Break the goal into a few clear steps.', 'Prefer familiar and reversible options.', 'Mark information that needs confirmation.'] },
    家庭: { zh: ['区分事实、待确认信息和可直接发送的内容。', '保留本人表达，不替代本人做决定。', '敏感内容只分享给明确选择的人。'], en: ['Separate facts, open questions, and ready-to-send content.', 'Preserve the person’s voice and decisions.', 'Share sensitive content only with explicitly chosen people.'] },
    安全: { zh: ['先暂停不可逆操作。', '通过独立可信渠道核实。', '重要步骤保留人工确认。'], en: ['Pause irreversible actions first.', 'Verify through an independent trusted channel.', 'Keep human confirmation for important steps.'] },
    健康: { zh: ['整理事实，不做诊断。', '标出需要专业人员确认的问题。', '出现明显警示表现时及时就医。'], en: ['Organize facts without diagnosing.', 'Mark questions for a professional.', 'Seek timely care for warning signs.'] },
    学习: { zh: ['一次只处理一个动作。', '使用短句和可重复步骤。', '完成后给出简单检查方法。'], en: ['Handle one action at a time.', 'Use short, repeatable steps.', 'Include a simple completion check.'] },
    机构: { zh: ['输出结构化记录和责任人。', '区分事实、判断和后续行动。', '保留来源、授权和升级路径。'], en: ['Produce a structured record with owners.', 'Separate facts, judgments, and follow-ups.', 'Preserve sources, permissions, and escalation paths.'] },
  }
  return {
    title: lang === 'zh' ? `${name}已完成处理` : `${name} completed`,
    summary: lang === 'zh' ? `已根据“${description}”处理当前输入，并把结果整理成可以继续修改和确认的格式。` : `The input was processed using the “${description}” capability and organized into an editable, confirmable result.`,
    sections: [
      { heading: lang === 'zh' ? '当前输入摘要' : 'Input summary', items: [input.trim()] },
      { heading: lang === 'zh' ? '技能生成结果' : 'Generated result', items: categoryGuidance[skill.category][lang] },
      { heading: lang === 'zh' ? '下一步' : 'Next steps', items: lang === 'zh' ? ['检查摘要是否准确。', '补充缺失信息。', '确认后再执行或分享。'] : ['Check the summary for accuracy.', 'Add missing information.', 'Confirm before acting or sharing.'] },
    ],
    note: lang === 'zh' ? '这是可编辑的辅助结果；涉及资金、健康、法律或机构责任时，请由相应人员确认。' : 'This is editable assistance; financial, health, legal, or provider decisions require appropriate human confirmation.',
    engine: 'local',
  }
}

function runLocalSkill(skill: SkillItem, input: string, lang: Lang) {
  if (skill.id === 1) return scamFallback(input, lang)
  if (skill.id === 3) return visitFallback(input, lang)
  if (skill.id === 8) return memoryFallback(input, lang)
  return genericFallback(skill, input, lang)
}

function isValidResult(value: unknown): value is SkillResult {
  if (!value || typeof value !== 'object') return false
  const result = value as SkillResult
  return typeof result.title === 'string' && typeof result.summary === 'string' && Array.isArray(result.sections)
}

export async function runLiveSkill(id: number, input: string, lang: Lang): Promise<SkillResult> {
  const skill = skills.find((item) => item.id === id)
  if (!skill) throw new Error('Unknown skill')
  const fallback = runLocalSkill(skill, input, lang)
  const controller = new AbortController()
  const timeout = window.setTimeout(() => controller.abort(), 18000)
  try {
    const response = await fetch('/api/skill-demo', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ skillId: id, input, lang, skill: { name: skill.name, description: skill.description, category: skill.category } }),
      signal: controller.signal,
    })
    if (!response.ok) return fallback
    const result = await response.json()
    return isValidResult(result) ? { ...result, engine: 'ai' } : fallback
  } catch {
    return fallback
  } finally {
    window.clearTimeout(timeout)
  }
}

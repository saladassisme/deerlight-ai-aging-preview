import type { Lang, SkillItem } from './data'
import { skills, tx } from './data'
import { runLiveSkill, type SkillResult } from './skillDemos'

export type ElderSkillConfig = {
  id: number
  inputLabel: { zh: string; en: string }
  placeholder: { zh: string; en: string }
  starters: { zh: string[]; en: string[] }
}

const naturalExamples: Record<number, string[]> = {
  1: ['这条短信说我账户有问题，还让我点链接，我有点害怕，你帮我看看。', '有人说是我女儿，换了新号码，让我赶紧转五千块钱，这是真的吗？', '快递说东西丢了，要赔我钱，可他让我开屏幕共享，我该怎么办？'],
  2: ['家里群一会儿来了好多消息，我看得眼花，你帮我说说最要紧的是哪几件。', '孩子发了一大段话，我没看明白，你用简单的话告诉我他说了什么。', '这几条语音我听不清，你帮我整理成几句好懂的话。'],
  3: ['我晚上咳了有两个礼拜，走快一点就喘，明天去医院，你帮我想想该跟医生怎么说。', '我右边膝盖上下楼疼了一个月，坐着不疼，走久了就疼，我该问医生什么？', '这几天一起来就头晕，昨天还忘了吃降压药，你帮我把情况理一理。'],
  4: ['我想学着在手机上叫车，可我怕按错，你一步一步教我。', '我不会跟孩子视频，你别一下说太多，慢慢告诉我先按哪里。', '我拍了照片，可不知道怎么发给家里人，你教教我。'],
  5: ['这几种药我老记不住什么时候吃，你帮我排得简单一点。', '我今天想不起来药吃没吃，你先告诉我该怎么确认，别让我乱补。', '孩子白天不在家，我想让他知道我有没有按时吃药，怎么弄最省事？'],
  6: ['我明天要去医院，腿脚不太方便，最好少换车、少走路，你帮我看看怎么去。', '我想去看女儿，可我不太会看地图，你把路线说得简单一点。', '回来的时候天可能黑了，帮我挑一条我容易认的路。'],
  7: ['我老记不住孩子们的生日，你帮我都记下来，到时候提前提醒我。', '我们结婚纪念日快到了，我想提醒老伴，可别搞得太复杂。', '每年清明家里都有安排，你帮我记着，快到的时候告诉我。'],
  8: ['这是我年轻时候和老伴的照片，那年我们刚搬进新家，你帮我把这段事写下来。', '照片里是我外公，他总把最好吃的留给我，我想把这个故事讲给孩子听。', '这张老照片我记不清是哪一年了，你先问我几个简单问题，帮我慢慢想起来。'],
  9: ['我等会儿去买菜，家里缺什么我想到一点说一点，你帮我归归类。', '我要去超市，帮我把东西按蔬菜、日用品分开，省得来回找。', '我念给你听，你帮我记住，买完一样就划掉一样。'],
  10: ['这件事我拿不准该找哪个孩子，你帮我看看联系谁合适。', '我要去医院，想让家里知道，帮我找到最方便联系的人。', '要是我手机弄不明白，应该先找谁帮忙？'],
  11: ['这份合同字太多，我看不懂，你把要花多少钱、哪里要小心说清楚。', '这张账单我不知道为什么这么贵，你帮我看看哪些钱必须交。', '这里写着自动续费，我怕以后一直扣钱，你告诉我怎么处理。'],
  12: ['我膝盖不太好，今天在家能做点什么轻松的运动？', '这两天腰有点酸，别安排太累的，十分钟左右就行。', '我今天精神还可以，想活动一下，你带着我慢慢做。'],
  13: ['我最近想学养花，别一下教太多，每天教我一点。', '我喜欢听戏，想知道这段唱的是什么，你用好懂的话讲讲。', '我想学手机拍照，先教我今天能学会的一件事。'],
  14: ['我想给孩子说几句话，还是用我平时说话的味道，你帮我整理一下。', '我想用家乡话给孙女留一封信，别写得太书面。', '我说得有点乱，你帮我整理成一封家书，可别改得不像我。'],
  15: ['我刚搬进来，有点分不清吃饭、活动都在哪儿，你慢慢跟我说。', '明天一天都安排了什么？别一下说太多，按早中晚告诉我。', '我想找护理员，可不知道该去哪里，你帮我。'],
  16: ['王阿姨今天胃口不太好，下午有点困，帮我整理成一条服务记录。', '李叔叔刚才说腿疼，我已经陪他坐下休息了，帮我记清楚后面要跟进什么。', '我说一遍今天的情况，你帮我整理成大家都看得懂的记录。'],
  17: ['今天有六位老人参加活动，有两位腿脚不方便，帮我想个大家都能参加的。', '下午下雨不能出门，帮我安排一个不吵、准备又简单的小活动。', '大家最近喜欢聊老电影，能不能围绕这个做一个小时的活动？'],
  18: ['这个手机字太小，我不知道去哪里调大，你一步一步教我。', '电视突然没声音了，我不太会设置，你先告诉我最简单的检查方法。', '我想把微信声音开大一点，可别让我进太多菜单。'],
  19: ['今天手机弹了好多通知，我看不明白，你只告诉我最要紧的。', '这些消息哪些今天一定要处理，哪些可以先放着？', '别把广告算进去，帮我把真正有用的通知说清楚。'],
  20: ['明天下午三点我要去复诊，帮我记下来，提前一个小时提醒我。', '周六孩子来吃饭，帮我放到日历里，也提醒我提前买菜。', '下周二的活动改到周三上午，帮我把时间改好。'],
  21: ['这张电费单我看不懂，你告诉我一共多少钱、什么时候要交。', '这里怎么多了一笔钱？你帮我看看是不是自动续费。', '我只想知道哪些费用正常，哪些最好打电话问一下。'],
  22: ['这个陌生号码一直打来，说是银行，我该不该接？', '刚才有人打电话让我提供身份证号，你帮我看看有没有问题。', '他说自己是快递客服，还让我加微信，我有点拿不准。'],
  23: ['我要给这个人转两千块，你帮我再核对一下收款人和原因。', '孩子发来一个新账户让我打钱，我怕弄错，你先帮我检查。', '付款前你再问我一遍金额和对方是谁，别让我按错。'],
  24: ['我手机卡在这个页面了，我想让女儿看看，但要先问过我再让她看到。', '我不会改这个设置，能不能让家里人一步一步带着我弄？', '我只想让孩子看到现在这个页面，别的东西不要给他看。'],
  25: ['家里照片太多了，我想按孩子、年份慢慢整理，你先帮我分一分。', '这些照片里有好多重复的，你帮我挑出清楚的留下。', '我想找十年前全家过年的照片，你帮我理个找法。'],
  26: ['孩子视频里说得太快，我听不清，你帮我把话变成大字。', '我耳朵不太好，视频的时候把对方说的话写出来。', '方言我有时候听不懂，你帮我把重点显示出来。'],
  27: ['上次看完病，医生说过几周再去，我记不清了，你帮我把要做的事列出来。', '复诊前我还要测几次血压？帮我安排得清楚一点。', '这些检查结果出来以后，我下一步该先做什么？'],
  28: ['这份检查报告我看不懂，你先告诉我去见医生时该问哪几句。', '报告里有几个箭头，我有点担心，帮我把要问医生的问题列出来。', '别替我下结论，只帮我准备好明天要问的事。'],
  29: ['我这几天量了血压和心率，数字有点多，你帮我整理一下。', '把这一周的数据按天排好，哪里变化大就提醒我。', '我想把这些数字拿给医生看，你帮我整理成简单的一页。'],
}

const categoryExamples: Record<string, string[]> = {
  生活: ['这件事我不太会弄，你慢慢告诉我先做哪一步。', '我怕按错，你把最简单的办法说给我听。', '我把现在的情况说给你，你帮我理清楚。'],
  家庭: ['我想跟家里人说件事，可我说得有点乱，你帮我整理一下。', '这件事我想让孩子知道，帮我写得像我平时说话。', '家里的消息太多了，你帮我挑出最要紧的。'],
  安全: ['这件事我有点拿不准，你先帮我看看有没有风险。', '我怕被骗，你先告诉我哪些地方不对劲。', '先别让我付款，你帮我把人、钱和事情核对一遍。'],
  健康: ['我把身体哪里不舒服告诉你，你帮我整理好，别替我下诊断。', '这些药和症状我记得不太清，你先帮我一项一项理出来。', '我明天去医院，你帮我准备几句该问医生的话。'],
  学习: ['我年纪大了，别一下说太多，一步一步教我。', '这个我不会，你先教我最简单的一步。', '我怕忘，你说短一点，做完一步再说下一步。'],
  机构: ['我把今天发生的事说一遍，你帮我整理成清楚的记录。', '大家情况不一样，帮我安排一个都能参加的办法。', '把重点、后续要做的事和负责人都列清楚。'],
}

export function getElderSkillConfig(id: number): ElderSkillConfig | undefined {
  const skill = skills.find((item) => item.id === id)
  if (!skill) return undefined
  const zhName = tx(skill.name, 'zh')
  const enName = tx(skill.name, 'en')
  const zhExamples = naturalExamples[id] ?? categoryExamples[skill.category]
  return {
    id,
    inputLabel: {
      zh: `像平时说话一样，告诉“${zhName}”您遇到了什么`,
      en: `Tell “${enName}” what happened in your own words`,
    },
    placeholder: {
      zh: '不用写得正式，想到什么就说什么。比如：“这个我看不懂，你帮我慢慢说清楚。”',
      en: 'No formal wording needed. Just describe what happened and what you need.',
    },
    starters: {
      zh: zhExamples,
      en: [
        `I am not very comfortable with this. Please help me use ${enName} one simple step at a time.`,
        `Here is what happened. Please explain the important part in plain language.`,
        `I may have missed something. Please organize it first and tell me what to do next.`,
      ],
    },
  }
}

function localSections(skill: SkillItem, input: string, lang: Lang): SkillResult {
  const name = tx(skill.name, lang)
  const common = {
    生活: { zh: ['先确认您现在最想完成的一件事。', '把操作拆成少量、可以随时返回的步骤。', '完成后再检查一次结果。'], en: ['Confirm the one thing you want to finish.', 'Break it into a few reversible steps.', 'Check the result once more when finished.'] },
    家庭: { zh: ['保留您原来的说话方式。', '把重点和需要家人回应的地方分开。', '发送前让您再看一遍。'], en: ['Keep your own voice.', 'Separate the key point from what needs a reply.', 'Let you review it before sharing.'] },
    安全: { zh: ['先暂停点击、转账或提供验证码。', '通过原来的电话号码或官方渠道核实。', '需要付款时让本人再次确认对象和金额。'], en: ['Pause links, payments, and code sharing.', 'Verify through an existing number or official channel.', 'Confirm recipient and amount again before payment.'] },
    健康: { zh: ['把症状、时间、用药和变化整理清楚。', '列出需要向医生确认的问题。', '不自行停药或更改剂量。'], en: ['Organize symptoms, timing, medicine, and changes.', 'List questions for a clinician.', 'Do not change medicine without professional advice.'] },
    学习: { zh: ['一次只做一步。', '每一步使用短句并说明按钮在哪里。', '做完后再继续下一步。'], en: ['Do one step at a time.', 'Use short instructions and identify the button.', 'Continue only after the step is done.'] },
    机构: { zh: ['区分事实、判断和后续行动。', '写明需要跟进的人和时间。', '保留来源、授权和升级路径。'], en: ['Separate facts, judgment, and follow-up.', 'Record owner and timing.', 'Keep sources, permission, and escalation path.'] },
  }[skill.category]

  return {
    title: lang === 'zh' ? `${name}已经帮您整理好了` : `${name} has organized this for you`,
    summary: lang === 'zh' ? '我先按您刚才的说法把事情理顺，再给出最少、最清楚的下一步。' : 'The situation has been organized into a small number of clear next steps.',
    sections: [
      { heading: lang === 'zh' ? '我听到的情况' : 'What I understood', items: [input.trim()] },
      { heading: lang === 'zh' ? '建议这样处理' : 'Suggested approach', items: common[lang] },
      { heading: lang === 'zh' ? '请您再确认' : 'Please confirm', items: [lang === 'zh' ? '上面的情况有没有听错？涉及联系人、金额、时间或健康信息时，请本人最后确认。' : 'Please confirm names, amounts, dates, and health details before taking action.'] },
    ],
    note: lang === 'zh' ? '这是技能生成的辅助结果，重要决定仍由您本人或可信专业人员确认。' : 'This is assistive output; important decisions still require your or a trusted professional’s confirmation.',
    engine: 'local',
  }
}

export function getInstantSkillResult(id: number, input: string, lang: Lang): SkillResult {
  const skill = skills.find((item) => item.id === id)
  if (!skill) {
    return {
      title: lang === 'zh' ? '已经整理好了' : 'Organized',
      summary: input,
      sections: [],
      engine: 'local',
    }
  }
  return localSections(skill, input, lang)
}

export async function runReliableSkill(id: number, input: string, lang: Lang): Promise<SkillResult> {
  const fallback = getInstantSkillResult(id, input, lang)
  try {
    const timeout = new Promise<SkillResult>((resolve) => {
      window.setTimeout(() => resolve(fallback), 12000)
    })
    return await Promise.race([runLiveSkill(id, input, lang), timeout])
  } catch {
    return fallback
  }
}

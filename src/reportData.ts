import type { BilingualText } from './data'

export type ReportCategory = 'ai' | 'digital' | 'design' | 'health' | 'china'

export type ReportItem = {
  id: number
  title: BilingualText
  summary: BilingualText
  category: ReportCategory
  source: string
  published: string
  image: string
  imageAlt: BilingualText
  url: string
  featured?: boolean
}

export const reportCategories: Array<{
  key: 'all' | ReportCategory
  label: BilingualText
}> = [
  { key: 'all', label: { zh: '全部', en: 'All' } },
  { key: 'ai', label: { zh: 'AI 与社会', en: 'AI & society' } },
  { key: 'digital', label: { zh: '数字生活', en: 'Digital life' } },
  { key: 'design', label: { zh: '产品设计', en: 'Product design' } },
  { key: 'health', label: { zh: '健康与认知', en: 'Health & cognition' } },
  { key: 'china', label: { zh: '中国观察', en: 'China' } },
]

const covers = {
  phoneRed: 'https://images.unsplash.com/photo-1776176065418-8d33aeca47e4?auto=format&fit=crop&fm=jpg&q=82&w=1600',
  learningTogether: 'https://images.unsplash.com/photo-1758612898592-5dbcdc693224?auto=format&fit=crop&fm=jpg&q=82&w=1600',
  aiAbstract: 'https://images.unsplash.com/photo-1655635949384-f737c5133dfe?auto=format&fit=crop&fm=jpg&q=82&w=1600',
  phonePortrait: 'https://images.unsplash.com/photo-1702648156997-eaa417d98b9e?auto=format&fit=crop&fm=jpg&q=82&w=1600',
  laptopPortrait: 'https://images.unsplash.com/photo-1719070548736-9952be4a0ef4?auto=format&fit=crop&fm=jpg&q=82&w=1600',
  threeGenerations: 'https://images.unsplash.com/photo-1742750278243-6596976af769?auto=format&fit=crop&fm=jpg&q=82&w=1600',
  quietPhone: 'https://images.unsplash.com/photo-1641736257757-2c4cce5f9ed5?auto=format&fit=crop&fm=jpg&q=82&w=1600',
  agePositivePhone: 'https://images.unsplash.com/photo-1685703207038-b8d1817049f3?auto=format&fit=crop&fm=jpg&q=82&w=1600',
} as const

export const reports: ReportItem[] = [
  {
    id: 1,
    title: {
      zh: '人工智能与老龄化：通往包容性数字未来的路径',
      en: 'Artificial intelligence and ageing: Inclusive pathways for older persons in a digital world',
    },
    summary: {
      zh: '从 AI 鸿沟、AI 素养到健康、经济参与和社区生活，系统梳理 AI 如何服务而不是排除老龄人口。',
      en: 'A new framework for the AI divide, literacy, health, economic participation, and community life.',
    },
    category: 'ai',
    source: 'ITU × EY × KAIST',
    published: '2026',
    image: covers.aiAbstract,
    imageAlt: { zh: '抽象的人工智能结构图', en: 'Abstract artificial intelligence structure' },
    url: 'https://www.itu.int/dms_pub/itu-d/opb/phcb/D-PHCB-AI_AGE-2026-PDF-E.pdf',
    featured: true,
  },
  {
    id: 2,
    title: {
      zh: '理解老一代如何采用 AI',
      en: 'Understanding older generations’ adoption of AI',
    },
    summary: {
      zh: '覆盖 16 个国家、2,515 位 60—85 岁受访者，观察熟悉度、使用场景、风险认知与学习意愿。',
      en: 'A 16-country study of 2,515 people aged 60–85, covering familiarity, use, risk, and learning.',
    },
    category: 'ai',
    source: 'EY',
    published: 'Mar 2026',
    image: covers.phoneRed,
    imageAlt: { zh: '使用智能手机的银发女性', en: 'Older woman using a smartphone' },
    url: 'https://www.ey.com/content/dam/ey-unified-site/ey-com/en-gl/about-us/corporate-responsibility/documents/ey-gl-how-older-generations-are-engaging-with-ai-03-2026.pdf',
  },
  {
    id: 3,
    title: {
      zh: '老年人正在使用 AI，但仍有顾虑',
      en: 'Older Adults Are Using Artificial Intelligence Despite Concerns',
    },
    summary: {
      zh: 'AARP 调查显示，50+ 人群已在使用问答、语音与预测输入，同时更在意隐私、可信度和被打扰。',
      en: 'How people 50+ use AI for answers, voice, and prediction while weighing privacy and trust.',
    },
    category: 'ai',
    source: 'AARP Research',
    published: 'Sep 2025',
    image: covers.agePositivePhone,
    imageAlt: { zh: '自信使用手机的成熟女性', en: 'Confident older woman using a phone' },
    url: 'https://www.aarp.org/pri/topics/technology/internet-media-devices/artificial-intelligence-survey/',
  },
  {
    id: 4,
    title: {
      zh: '2025 年 50+ 人群科技趋势',
      en: '2025 Tech Trends and Adults 50+',
    },
    summary: {
      zh: '从设备拥有量、智能家居到健康科技与付费意愿，理解科技如何进入 50+ 人群的真实日常。',
      en: 'Devices, smart homes, health technology, spending, and the daily priorities of adults 50+.',
    },
    category: 'digital',
    source: 'AARP Research',
    published: 'Jul 2025',
    image: covers.laptopPortrait,
    imageAlt: { zh: '在家使用笔记本电脑的女性', en: 'Woman using a laptop at home' },
    url: 'https://www.aarp.org/pri/topics/technology/internet-media-devices/2025-technology-trends-older-adults/',
  },
  {
    id: 5,
    title: {
      zh: '数字技术使用与认知老化：一项荟萃分析',
      en: 'A meta-analysis of technology use and cognitive aging',
    },
    summary: {
      zh: '综合 57 项研究与超过 41 万名参与者，讨论数字技术使用与认知障碍风险之间的关联及其边界。',
      en: 'A meta-analysis of 57 studies and more than 411,000 participants on technology and cognitive ageing.',
    },
    category: 'health',
    source: 'Nature Human Behaviour',
    published: 'Apr 2025',
    image: covers.quietPhone,
    imageAlt: { zh: '在自然光中查看手机的年长女性', en: 'Older woman looking at a phone in natural light' },
    url: 'https://www.nature.com/articles/s41562-025-02159-9',
  },
  {
    id: 6,
    title: {
      zh: '面向老年人的 AI 使用指南',
      en: 'AI Guide for Older Adults',
    },
    summary: {
      zh: '用容易理解的方式说明生成式 AI 能做什么、如何提问、如何核查回答，以及需要警惕哪些风险。',
      en: 'A plain-language introduction to what generative AI can do, how to prompt, verify, and stay safe.',
    },
    category: 'digital',
    source: 'Senior Planet from AARP',
    published: 'Nov 2024',
    image: covers.learningTogether,
    imageAlt: { zh: '祖孙一起使用电脑学习', en: 'Grandfather and grandson learning on a laptop' },
    url: 'https://cms.seniorplanet.org/wp-content/uploads/2024/11/AI-Guide-for-Older-Adults_Dig.pdf',
  },
  {
    id: 7,
    title: {
      zh: '数字世界中的老龄化：从脆弱走向价值',
      en: 'Ageing in a digital world — from vulnerable to valuable',
    },
    summary: {
      zh: '联合国视角下的数字包容：让老年人从技术的被动接受者，转变为数字社会的参与者与贡献者。',
      en: 'A UN perspective on shifting older people from passive recipients to participants in digital society.',
    },
    category: 'digital',
    source: 'United Nations DESA',
    published: 'Perspective',
    image: covers.phonePortrait,
    imageAlt: { zh: '使用手机沟通的成熟女性', en: 'Older woman speaking on a phone' },
    url: 'https://social.desa.un.org/sdn/ageing-in-a-digital-world-from-vulnerable-to-valuable',
  },
  {
    id: 8,
    title: {
      zh: '健康老龄化十年行动',
      en: 'Decade of Healthy Ageing 2021–2030',
    },
    summary: {
      zh: 'WHO 对健康老龄化的全球行动框架，涵盖环境、社区支持、整合照护与长期照护体系。',
      en: 'WHO’s global framework for age-friendly environments, integrated care, and long-term support.',
    },
    category: 'health',
    source: 'World Health Organization',
    published: '2021–2030',
    image: covers.threeGenerations,
    imageAlt: { zh: '在户外相聚的三代人', en: 'Three generations together outdoors' },
    url: 'https://iris.who.int/bitstreams/7f2af8f0-3413-47b6-a309-eaca584beb76/download',
  },
  {
    id: 9,
    title: {
      zh: '面向老年用户的 UX 设计',
      en: 'UX Design for Seniors, 3rd Edition',
    },
    summary: {
      zh: '从可读性、操作路径、错误恢复与用户测试出发，整理面向老年用户设计数字产品的具体方法。',
      en: 'Practical usability guidance covering legibility, task paths, error recovery, and user testing.',
    },
    category: 'design',
    source: 'Nielsen Norman Group',
    published: '3rd Edition',
    image: covers.agePositivePhone,
    imageAlt: { zh: '使用智能手机的成熟女性', en: 'Older woman using a smartphone' },
    url: 'https://www.nngroup.com/reports/senior-citizens-on-the-web/',
  },
  {
    id: 10,
    title: {
      zh: '数字时代：支持人生后半程的新方法',
      en: 'The digital age: new approaches to supporting people in later life',
    },
    summary: {
      zh: '为什么设备可得并不等于数字包容，以及社区、培训与产品支持如何共同降低使用门槛。',
      en: 'Why access alone is not inclusion, and how community, training, and support can reduce barriers.',
    },
    category: 'design',
    source: 'Centre for Ageing Better',
    published: '2018',
    image: covers.learningTogether,
    imageAlt: { zh: '两代人一起使用笔记本电脑', en: 'Two generations using a laptop together' },
    url: 'https://ageing-better.org.uk/sites/default/files/2018-05/The-digital-age.pdf',
  },
  {
    id: 11,
    title: {
      zh: '数字化转型背景下我国老年人数字素养模型',
      en: 'A digital literacy model for older adults in China',
    },
    summary: {
      zh: '基于 25 个省份、13,452 份样本，从意愿、使用、沟通、服务、安全与学习六个维度理解数字素养。',
      en: 'A six-dimension digital literacy model based on 13,452 responses across 25 Chinese provinces.',
    },
    category: 'china',
    source: '现代远距离教育',
    published: 'Nov 2025',
    image: covers.laptopPortrait,
    imageAlt: { zh: '使用笔记本电脑处理信息的女性', en: 'Woman working with information on a laptop' },
    url: 'https://yuan.cbpt.cnki.net/portal/journal/portal/client/paper/7167a205d1c6e82a830db394f2447323',
  },
  {
    id: 12,
    title: {
      zh: '2025“银发+AI”应用趋势报告',
      en: '2025 Silver Economy + AI Application Trends',
    },
    summary: {
      zh: '从城乡差异、医疗健康、居家安全、陪伴机器人到 AI 培训，梳理中国银发 AI 的八个应用趋势。',
      en: 'Eight China-focused trends spanning access, health, home safety, robotics, companionship, and learning.',
    },
    category: 'china',
    source: '浙江开放大学 × 阿里研究院',
    published: 'Oct 2025',
    image: covers.phoneRed,
    imageAlt: { zh: '使用智能手机处理日常事务的女性', en: 'Older woman using a smartphone in daily life' },
    url: 'https://hulianhutongshequ.cn/upload/tank/report/2025/202511/1/5adf5d5459ae46f88cc6a8cfd19eb2ab.pdf',
  },
]

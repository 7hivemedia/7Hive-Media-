import { Service, CaseStudy, Testimonial, FAQItem, BlogPost } from './types';

export const SERVICES: Service[] = [
  {
    id: 'web-dev',
    icon: 'Globe',
    title: 'Website Development',
    desc: 'High-performance, conversion-optimized websites built with modern technology. Fast, responsive, and designed to turn visitors into customers.',
    category: 'dev',
    benefits: ['Custom Design', 'Fast Loading', 'Mobile-First'],
    outcome: '3x higher conversion rates on average'
  },
  {
    id: 'waas',
    icon: 'RefreshCw',
    title: 'Website-as-a-Service',
    desc: 'Subscribe to a professionally managed website. We handle design, development, hosting, updates, and optimization — so you never worry about your site again.',
    category: 'dev',
    benefits: ['Monthly Updates', 'Managed Hosting', '24/7 Uptime'],
    outcome: 'Zero maintenance overhead for your team'
  },
  {
    id: 'seo',
    icon: 'Search',
    title: 'Search Engine Optimization',
    desc: 'Rank for the terms your customers actually search. Technical SEO, content strategy, and local optimization that compounds over time.',
    category: 'marketing',
    benefits: ['Technical SEO', 'Content Strategy', 'Local SEO'],
    outcome: 'Sustainable organic traffic growth'
  },
  {
    id: 'google-ads',
    icon: 'BarChart3',
    title: 'Google Ads',
    desc: 'Precision-targeted search and display campaigns that capture high-intent buyers. Every rupee tracked, every conversion measured.',
    category: 'marketing',
    benefits: ['Search Ads', 'Display Network', 'Remarketing'],
    outcome: 'Lower cost-per-lead within 90 days'
  },
  {
    id: 'meta-ads',
    icon: 'Smartphone',
    title: 'Meta Ads',
    desc: 'Reach your ideal audience on Facebook and Instagram with creative-driven campaigns designed for engagement, leads, and conversions.',
    category: 'marketing',
    benefits: ['Lead Funnels', 'Creative Strategy', 'Audience Building'],
    outcome: 'Predictable lead flow at scale'
  },
  {
    id: 'social-mgmt',
    icon: 'Megaphone',
    title: 'Social Media Management',
    desc: 'Strategic content creation and community management that builds brand authority. Not just posts — a complete social presence system.',
    category: 'marketing',
    benefits: ['Content Calendar', 'Brand Voice', 'Analytics'],
    outcome: 'Consistent brand visibility and engagement'
  },
  {
    id: 'lead-gen',
    icon: 'Target',
    title: 'Lead Generation',
    desc: 'Multi-channel lead generation systems that attract, qualify, and deliver sales-ready prospects directly to your pipeline.',
    category: 'marketing',
    benefits: ['Landing Pages', 'Lead Magnets', 'Qualification'],
    outcome: 'Qualified leads delivered to your sales team'
  },
  {
    id: 'marketing-auto',
    icon: 'Zap',
    title: 'Marketing Automation',
    desc: 'Automated email sequences, follow-ups, and nurturing workflows that convert leads while you sleep. Set it up once, scale infinitely.',
    category: 'automation',
    benefits: ['Email Flows', 'Drip Campaigns', 'Lead Scoring'],
    outcome: '80% reduction in manual follow-up time'
  },
  {
    id: 'whatsapp-auto',
    icon: 'MessageSquare',
    title: 'WhatsApp Automation',
    desc: 'Engage leads and customers through automated WhatsApp workflows. Instant responses, appointment booking, and broadcast campaigns.',
    category: 'automation',
    benefits: ['Auto-Reply', 'Chatbots', 'Broadcasts'],
    outcome: '98% message open rates'
  },
  {
    id: 'crm-setup',
    icon: 'Database',
    title: 'CRM Setup & Integration',
    desc: 'Organize your entire sales pipeline with a custom CRM setup. Track every lead, automate follow-ups, and never lose a deal again.',
    category: 'dev',
    benefits: ['Pipeline Tracking', 'Auto Follow-ups', 'Reporting'],
    outcome: 'Complete visibility into your sales funnel'
  }
];

export const CASE_STUDIES: CaseStudy[] = [
  {
    id: 'solar-edge',
    icon: 'Sun',
    industry: 'Solar Industry',
    title: 'SolarEdge Pro — Lead Gen Funnel',
    desc: 'We deployed an integrated Google Ads and high-speed Landing Page campaign connected to an automated SMS/email follow-up schedule. This transformed their sales pipelines with high-intent inbound opportunities.',
    category: 'lead-gen',
    metrics: [
      { value: '340%', label: 'Lead Increase' },
      { value: '₹85', label: 'Cost Per Lead' },
      { value: '4.2x', label: 'ROAS' }
    ]
  },
  {
    id: 'urban-bite',
    icon: 'Store',
    industry: 'Local Business',
    title: 'UrbanBite — Restaurant Scale System',
    desc: 'We launched a modern ordering interface, optimized Meta lead funnels, and deployed WhatsApp auto-responders that automated delivery tracking and repeat-order discounts.',
    category: 'local',
    metrics: [
      { value: '2.8x', label: 'Revenue Growth' },
      { value: '1,200+', label: 'Monthly Orders' },
      { value: '62%', label: 'Repeat Customers' }
    ]
  },
  {
    id: 'legal-first',
    icon: 'Scale',
    industry: 'Professional Services',
    title: 'LegalFirst — Inbound SEO Infrastructure',
    desc: 'We re-engineered their website technical architecture, wrote detailed practice-area resources, and structured calendar automation for booking client consultations.',
    category: 'seo',
    metrics: [
      { value: '520%', label: 'Organic Traffic' },
      { value: '45+', label: 'Monthly Consults' },
      { value: 'Page 1', label: 'Google Ranking' }
    ]
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 't1',
    stars: 5,
    text: '7Hive didn\'t just build us a website — they built a system that generates leads while we focus on our work. Our lead flow has tripled in four months.',
    author: 'Rajesh Kumar',
    avatarInitials: 'RK',
    role: 'CEO, SolarEdge Pro'
  },
  {
    id: 't2',
    stars: 5,
    text: 'The automation alone saved us 20 hours a week. Our WhatsApp follow-ups now happen instantly, and our conversion rate jumped significantly.',
    author: 'Anita Patel',
    avatarInitials: 'AP',
    role: 'Founder, UrbanBite'
  },
  {
    id: 't3',
    stars: 5,
    text: 'We went from zero online presence to ranking on page one for our most important keywords. The quality of inbound leads has been exceptional.',
    author: 'Suresh Mehta',
    avatarInitials: 'SM',
    role: 'Managing Partner, LegalFirst'
  },
  {
    id: 't4',
    stars: 5,
    text: 'What impressed me most was their systems thinking. Everything connects — the ads feed the landing page, the landing page feeds the CRM, the CRM triggers the follow-ups.',
    author: 'Deepak Gupta',
    avatarInitials: 'DG',
    role: 'Director, BuildRight Construction'
  },
  {
    id: 't5',
    stars: 5,
    text: 'Their Website-as-a-Service model is perfect for us. We never have to worry about updates, security, or hosting. They handle everything while we grow.',
    author: 'Neha Sharma',
    avatarInitials: 'NS',
    role: 'COO, GreenLeaf Organics'
  },
  {
    id: 't6',
    stars: 5,
    text: 'We saw a reduction of 80% in manual lead sorting. The automation system validates emails, parses fields, and maps them to calendars automatically.',
    author: 'Vikram Khanna',
    avatarInitials: 'VK',
    role: 'Managing Director, Khanna Logistics'
  }
];

export const FAQS: FAQItem[] = [
  {
    id: 'faq1',
    question: 'Why choose 7Hive Media over other agencies?',
    answer: 'Most agencies offer isolated services — a website here, some ads there. We build integrated digital growth systems where everything works together. Your website feeds your CRM, your ads feed your funnels, and your automation nurtures every lead. We\'re not a vendor — we\'re your growth infrastructure partner.',
    category: 'general'
  },
  {
    id: 'faq2',
    question: 'How does Website-as-a-Service (WaaS) work?',
    answer: 'Instead of a large one-time payment, WaaS gives you a premium, professionally managed website for a predictable monthly fee. This includes design, development, hosting, security updates, content changes, performance monitoring, and ongoing optimization. Think of it as having a full web team on retainer — without the overhead.',
    category: 'pricing'
  },
  {
    id: 'faq3',
    question: 'Do you offer flexible monthly plans?',
    answer: 'Yes. We offer monthly plans for most of our services. Whether it\'s website management, social media, ad campaigns, or automation — you can start with a plan that fits your budget and scale as your business grows. No long-term lock-ins required.',
    category: 'pricing'
  },
  {
    id: 'faq4',
    question: 'How long does a website project take?',
    answer: 'A typical website project takes 2 to 4 weeks from kickoff to launch, depending on complexity. This includes discovery, design, development, content integration, and testing. For WaaS clients, we can often launch a high-quality initial version within 10 business days and continuously improve from there.',
    category: 'services'
  },
  {
    id: 'faq5',
    question: 'Can you manage our entire digital marketing?',
    answer: 'Absolutely. That\'s where we create the most impact. When we manage your website, advertising, social media, content, and automation as one system, every piece amplifies the other. You get one partner, one strategy, and one dashboard — instead of managing five different vendors.',
    category: 'services'
  },
  {
    id: 'faq6',
    question: 'What kind of automation do you provide?',
    answer: 'We set up email automation, WhatsApp automation, CRM workflows, lead scoring, appointment scheduling, follow-up sequences, and reporting dashboards. The goal is to eliminate repetitive manual tasks so your team can focus on closing deals and serving customers.',
    category: 'automation'
  },
  {
    id: 'faq7',
    question: 'Is there a setup fee for marketing automation?',
    answer: 'Setup fees depend on the complexity of your stack. Simple email integrations have zero setup fee, while complex multi-channel CRM setups with custom webhook APIs have a small, transparent onboarding cost.',
    category: 'general'
  }
];

export const BLOG_POSTS: BlogPost[] = [
  {
    id: 'b1',
    visual: 'Globe',
    date: 'June 15, 2026',
    tag: 'Growth',
    title: 'WaaS vs. Traditional Custom Dev: Which is Best for You?',
    desc: 'A detailed breakdown comparing Website-as-a-Service with traditional development models, examining upfront fees, maintenance, and long-term conversions.'
  },
  {
    id: 'b2',
    visual: 'Zap',
    date: 'June 10, 2026',
    tag: 'Automation',
    title: 'Top 5 Automation Workflows Every Enterprise Needs',
    desc: 'Save up to 20 hours a week by automating lead verification schedules, calendar bookings, WhatsApp messaging pipelines, and CRM mappings.'
  },
  {
    id: 'b3',
    visual: 'Search',
    date: 'May 28, 2026',
    tag: 'Marketing',
    title: 'The SEO Blueprint: Rank Page 1 for Local Keywords',
    desc: 'Learn the technical optimization guidelines, content mapping architectures, and Google profile updates we used to scale organic consultation clicks.'
  }
];

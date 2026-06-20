import { Check, Zap, HelpCircle } from 'lucide-react';

interface ProcessViewProps {
  onNavigate: (view: string) => void;
}

export function ProcessView({ onNavigate }: ProcessViewProps) {
  const steps = [
    {
      num: '01',
      title: 'Discover',
      duration: 'Week 1: Research & Audit',
      desc: 'We dive deep into your business metrics, audit your current digital channels, map competitor funnels, and outline customer journeys to identify the path of least resistance to your growth goals.',
      tasks: [
        'Audit website speed, performance, SEO structures, and conversion setup.',
        'Analyze competitor traffic sources, advertising creatives, and landing pages.',
        'Define clear KPIs and map out a tailored Growth Blueprint.'
      ],
      deliverables: ['Comprehensive Funnel Audit', 'Competitor Analysis Matrix', 'Tactical Growth Blueprint']
    },
    {
      num: '02',
      title: 'Build',
      duration: 'Week 2-4: Core Assembly',
      desc: 'We build your complete growth infrastructure. We design and develop conversion-driven web pages, set up automation rules, design advertising creatives, and deploy analytics pixels.',
      tasks: [
        'Code high-performance, responsive pages using clean typography.',
        'Integrate CRM, email databases, and configure automated WhatsApp flows.',
        'Establish end-to-end tracking to trace every lead back to its marketing source.'
      ],
      deliverables: ['High-speed Website / Landing pages', 'Email & WhatsApp automation flows', 'Ad Creative and Copy templates']
    },
    {
      num: '03',
      title: 'Launch',
      duration: 'Week 5: Activation',
      desc: 'We activate the ecosystem simultaneously. Search campaigns, social media funnels, email broadcasts, and organic keyword optimization trigger to start drawing targeted traffic into the system.',
      tasks: [
        'Launch Google Search, Meta Display, and Hyperlocal campaigns.',
        'Run live tests of lead form flows, notifications, and auto-responders.',
        'Index all core pages on major search engine platforms.'
      ],
      deliverables: ['Live Marketing Campaigns', 'Activated System Workflows', 'Real-Time Performance Dashboard']
    },
    {
      num: '04',
      title: 'Optimize',
      duration: 'Ongoing: Refinement',
      desc: 'We analyze data to find friction points. Through continuous split testing, audience exclusions, and layout iterations, we reduce your cost-per-lead and increase page conversion rates.',
      tasks: [
        'Conduct A/B split testing on headlines, CTA placements, and layouts.',
        'Audit search terms to add negative keywords and improve Google Ads quality score.',
        'Monitor conversion paths and user hover session screen replays.'
      ],
      deliverables: ['Monthly Performance Report', 'A/B Testing Insights', 'Friction Point Diagnostics']
    },
    {
      num: '05',
      title: 'Scale',
      duration: 'Ongoing: Expansion',
      desc: 'With stable cost-per-acquisition metrics, we scale. We open new advertising channels, expand keyword scopes, increment budgets, and add automations to maximize business volume.',
      tasks: [
        'Increase budgets systematically based on positive ROI.',
        'Expand campaigns into lookalike audiences, retargeting groups, and new networks.',
        'Build automated pipelines to nurture warm leads into repeat clients.'
      ],
      deliverables: ['Scale Campaign Architecture', 'Lookalike & Audience lists', 'Omni-Channel Lead Funnels']
    }
  ];

  return (
    <div className="pt-20">
      {/* Hero */}
      <section className="relative py-16 px-6 md:px-12 bg-white dark:bg-[#121212] transition-colors duration-300 overflow-hidden text-center border-b border-black/5 dark:border-white/10">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-100/10 via-transparent to-transparent dark:from-[#0A84FF]/5 pointer-none" />
        <div className="max-w-4xl mx-auto space-y-4 relative z-10">
          <p className="text-xs font-bold text-[#0A84FF] uppercase tracking-widest">Our Methodology</p>
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight">How Growth is Engineered</h1>
          <p className="text-lg text-neutral-500 dark:text-neutral-400 max-w-xl mx-auto">
            We don't believe in random marketing. We build structured, metric-checked, repeatable systems designed to scale your brand with math.
          </p>
        </div>
      </section>

      {/* Steps list */}
      <section className="py-20 px-6 md:px-12 bg-neutral-50 dark:bg-[#1a1a1a] transition-colors duration-300">
        <div className="max-w-5xl mx-auto space-y-12">
          <div className="relative border-l border-[#0A84FF]/20 pl-8 ml-4 md:ml-12 space-y-16">
            {steps.map((st) => (
              <div key={st.num} className="relative space-y-6">
                {/* Visual Connector Dot */}
                <div className="absolute left-0 -translate-x-1/2 -ml-8 top-1.5 w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-[#0A84FF] text-white font-extrabold flex items-center justify-center text-[10px] sm:text-xs leading-none shadow-sm select-none">
                  {st.num}
                </div>

                <div className="bg-white dark:bg-[#121212] border border-black/5 dark:border-white/10 rounded-2xl p-8 shadow-sm grid grid-cols-1 lg:grid-cols-3 gap-8">
                  {/* Summary */}
                  <div className="lg:col-span-2 space-y-4">
                    <span className="inline-block text-xs uppercase tracking-wider font-semibold text-[#0A84FF]">
                      {st.duration}
                    </span>
                    <h2 className="text-2xl font-bold text-neutral-900 dark:text-neutral-50">{st.title}</h2>
                    <p className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed mb-6">
                      {st.desc}
                    </p>

                    {/* Tasks list */}
                    <div className="space-y-3 pt-2 border-t border-black/5 dark:border-white/5">
                      {st.tasks.map((task, ti) => (
                        <div key={ti} className="flex items-start gap-2.5 text-sm text-neutral-500 dark:text-neutral-400">
                          <Check className="w-4 h-4 text-[#0A84FF] mt-1 flex-shrink-0" />
                          <span>{task}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Deliverables card */}
                  <div className="bg-neutral-50 dark:bg-[#1a1a1a] border border-black/5 dark:border-white/5 rounded-xl p-6 flex flex-col justify-between">
                    <div className="space-y-4">
                      <span className="text-[10px] font-bold uppercase tracking-widest text-[#0A84FF] border-b border-black/5 dark:border-white/5 pb-2 block">
                        Deliverables Map
                      </span>
                      <div className="space-y-3">
                        {st.deliverables.map((del, di) => (
                          <div key={di} className="flex items-center gap-2 text-xs font-semibold text-neutral-700 dark:text-neutral-300">
                            <Zap className="w-3.5 h-3.5 text-[#0A84FF] fill-[#0A84FF]/10 shrink-0" />
                            <span>{del}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* CTA */}
          <div className="bg-white dark:bg-[#121212] border border-black/5 dark:border-white/10 rounded-2xl p-8 md:p-12 text-center max-w-4xl mx-auto space-y-4">
            <h2 className="text-2xl font-bold">Ready to align your operations with growth engineering?</h2>
            <p className="text-sm text-neutral-500 dark:text-neutral-400 max-w-lg mx-auto leading-relaxed">
              We begin every campaign by configuring live dashboards so you see your metrics rise in real time.
            </p>
            <div className="pt-2">
              <a
                href="#contact"
                onClick={(e) => {
                  e.preventDefault();
                  onNavigate('contact');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="inline-flex items-center justify-center px-8 py-3 bg-[#0A84FF] text-white font-bold rounded-full select-none hover:bg-blue-600 transition-colors cursor-pointer animate-pulse"
              >
                Let's Outline Your System Pipeline
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

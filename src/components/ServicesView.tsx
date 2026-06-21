import { useState, useEffect } from 'react';
import { Check, ArrowRight, X, Sparkles, TrendingUp, Zap, HelpCircle } from 'lucide-react';
import { dynamicStore } from '../lib/dynamicStore';
import { motion, AnimatePresence } from 'motion/react';
import { Service } from '../types';
import { PremiumIcon } from './PremiumIcon';


interface ServicesViewProps {
  onNavigate: (view: string) => void;
}

const SERVICE_DETAILS: Record<string, { strategy: string; focus: string; whyEssential: string }> = {
  'web-dev': {
    strategy: 'We design high‑speed custom single-page systems or full-stack corporate portals optimized for modern devices. Our websites feature zero legacy layout shifts, optimized media pipelines, and dense Conversion Rate Optimization (CRO) frameworks.',
    focus: 'UI/UX Polish, Content Optimization, Core Web Vitals',
    whyEssential: 'If your digital center behaves sluggishly, every currency unit routed into paid advertisement campaigns faces rapid customer decay. Speed guarantees maximum lead retention.'
  },
  'waas': {
    strategy: 'A dedicated flat-rate partnership model including responsive asset maintenance, lightning hosting, immediate priority updates, weekly security patches, and periodic conversion audits.',
    focus: 'Continuous Delivery, Unlimited Content Updates, Dynamic Optimization',
    whyEssential: 'Digital platforms scale or degrade. Website-as-a-Service cuts internal management overhead completely, allowing your core business leaders to focus strictly on operations.'
  },
  'seo': {
    strategy: 'Our technical SEO strategy repairs crawl structures, builds keyword clusters, optimizes schema structures, and engineers local citation maps to build highly relevant, long-term traffic streams.',
    focus: 'Keyword Clusters, Crawl Cleanups, Content Funnels',
    whyEssential: 'Paid outreach captures demand. Technical search optimization creates compounding organic interest, securing high-conversion positioning without linear ad costs.'
  },
  'google-ads': {
    strategy: 'Precision bid management utilizing rigorous negative match filters, targeted user intent clusters, and localized geofencing to direct high-consideration buyers directly to your service nodes.',
    focus: 'High-Intent Targeting, ROI Mapping, Quality Score Max',
    whyEssential: 'Google searchers are active buyers seeking solutions. We capture that precise active intent and route it straight into custom qualification funnels immediately.'
  },
  'meta-ads': {
    strategy: 'We synthesize scroll-stopping creative variations, dynamic lead capture overlays, and advanced custom lookalike audiences on Facebook and Instagram to scale top-of-funnel customer traffic.',
    focus: 'Dynamic Creative Variations, Pixel Engineering, Custom Segments',
    whyEssential: 'Interruption marketing requires stunning visuals and psychological hooks. We build high-impact creative sequences that turn ambient interest into verified leads.'
  },
  'social-mgmt': {
    strategy: 'Building authoritative, consistent brand assets through rich custom vectors, highly engaging post designs, structured weekly release calendars, and authentic interactive response rules.',
    focus: 'Grid Aesthetics, Authority Positioning, Direct Community Ties',
    whyEssential: 'Before committing to a consulting engagement, modern clients investigate your feeds. Pristine, active social grids validate your expertise and build trust instantly.'
  },
  'lead-gen': {
    strategy: 'Deploying high-speed standalone landing page architectures packed with specialized micro-copy, engaging interactive calculators, and multi-stage verification fields to maximize inquiry quality.',
    focus: 'Copywriting Sprints, Form Validation, Live API Hookups',
    whyEssential: 'General information sites confuse traffic. Custom landing structures serve a single, clear objective: converting curious visitors into scheduled corporate consultations.'
  },
  'marketing-auto': {
    strategy: 'Mapping comprehensive behavioral auto-responders, multi-stage drip messaging paths, and customized scoring metrics to nurture leads throughout their buying journey completely automatically.',
    focus: 'Email Delivery Sprints, Lead Score Matrices, Automation Rules',
    whyEssential: 'Up to 70% of raw inbound leads require consistent nurture before conversion. Smart marketing automation processes those prospects, keeping your brand top-of-mind without manual labor.'
  },
  'whatsapp-auto': {
    strategy: 'Implementing real-time conversational triggers, direct meeting links, visual product carousels, and quick-reply option templates using highly stable, official WhatsApp Business APIs.',
    focus: 'Instant Auto-Replies, Schedule Hooks, Broadcasters',
    whyEssential: 'Modern lead conversion hinges directly on speed to contact. Instant WhatsApp validation prompts can increase engagement metrics ten-fold over email notifications.'
  },
  'crm-setup': {
    strategy: 'Re-engineering complete sales operations within leading CRM software suites. We map stages, automate task generation, program automated custom webhooks, and deploy robust direct notification alerts.',
    focus: 'Pipeline Layouts, Team Dashboard, Automated Tasks',
    whyEssential: 'Untracked leads represent waste. A centralized CRM setup gives managers absolute clarity, streamlines salesperson workflows, and ensures no closing opportunity drops.'
  }
};

export function ServicesView({ onNavigate }: ServicesViewProps) {
  const [activeCategory, setActiveCategory] = useState<'all' | 'dev' | 'marketing' | 'automation'>('all');
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [services, setServices] = useState<Service[]>([]);

  useEffect(() => {
    dynamicStore.getServices().then(setServices);
  }, []);

  const filteredServices = services.filter(
    (srv) => activeCategory === 'all' || srv.category === activeCategory
  );

  const categories = [
    { label: 'All Services', key: 'all' as const },
    { label: 'Development & Systems', key: 'dev' as const },
    { label: 'Traffic & Marketing', key: 'marketing' as const },
    { label: 'Automation & Scales', key: 'automation' as const },
  ];

  return (
    <div className="pt-20">
      {/* Hero */}
      <section className="relative py-16 px-6 md:px-12 bg-white dark:bg-[#121212] transition-colors duration-300 overflow-hidden text-center border-b border-black/5 dark:border-white/10">
        <div className="absolute inset-x-0 top-0 h-64 bg-gradient-to-b from-[#0A84FF]/5 to-transparent pointer-none select-none" />
        <div className="max-w-4xl mx-auto space-y-4 relative z-10">
          <p className="text-xs font-bold text-[#0A84FF] uppercase tracking-widest">Our Ecosystem</p>
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight">Ecosystem of Digital Growth</h1>
          <p className="text-lg text-neutral-500 dark:text-neutral-400 max-w-xl mx-auto">
            We build, manage, and continuously optimize full‑funnel structures designed to capture, qualify, and automated leads.
          </p>
        </div>
      </section>

      {/* Filters & Grid */}
      <section className="py-16 px-6 md:px-12 bg-neutral-50 dark:bg-[#1a1a1a] transition-colors duration-300">
        <div className="max-w-7xl mx-auto space-y-12">
          {/* Navigation Filter Header */}
          <div className="flex flex-wrap gap-2 justify-center">
            {categories.map((cat) => (
              <button
                key={cat.key}
                onClick={() => setActiveCategory(cat.key)}
                className={`px-5 py-2.5 rounded-full text-xs font-bold tracking-wider transition-all select-none cursor-pointer ${
                  activeCategory === cat.key
                    ? 'bg-[#0A84FF] text-white shadow-sm'
                    : 'bg-white dark:bg-[#121212] border border-black/5 dark:border-white/10 text-neutral-500 hover:text-black dark:hover:text-white'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredServices.map((srv) => (
              <div
                key={srv.id}
                onClick={() => setSelectedService(srv)}
                className="bg-white dark:bg-[#121212] border border-black/5 dark:border-white/10 rounded-2xl p-8 flex flex-col justify-between hover:border-[#0A84FF]/40 hover:shadow-[0_20px_50px_rgba(10,132,255,0.06)] hover:scale-[1.02] active:scale-[0.99] transition-all duration-305 group cursor-pointer relative overflow-hidden select-none"
              >
                {/* Subtle card glow on hover */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-[#0A84FF]/5 rounded-full blur-3xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity" />
                
                <div className="space-y-6">
                  <PremiumIcon name={srv.icon} className="w-12 h-12" size={22} />
                  <div>
                    <h3 className="text-lg font-bold mb-2 text-stone-900 dark:text-white flex items-center justify-between gap-2 group-hover:text-[#0A84FF] transition-colors">
                      <span>{srv.title}</span>
                      <ArrowRight className="w-4 h-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-[#0A84FF]" />
                    </h3>
                    <p className="text-sm text-neutral-500 dark:text-neutral-400 leading-relaxed line-clamp-3">
                      {srv.desc}
                    </p>
                  </div>

                  {/* Benefits */}
                  <div className="space-y-2 pt-2">
                    {srv.benefits.map((ben, bi) => (
                      <div key={bi} className="flex items-center gap-2 text-sm text-neutral-600 dark:text-neutral-400">
                        <Check className="w-4 h-4 text-[#0A84FF] shrink-0" />
                        <span className="truncate">{ben}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-8 pt-4 border-t border-black/5 dark:border-white/5 flex items-center justify-between">
                  <div className="flex items-center gap-1.5 text-xs text-[#0A84FF] font-semibold">
                    <span>↘ Impact:</span>
                    <span className="text-stone-800 dark:text-stone-300 font-bold">{srv.outcome}</span>
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-neutral-450 dark:text-neutral-500 group-hover:text-[#0A84FF] transition-colors bg-neutral-100 dark:bg-stone-800 px-2 py-1 rounded-md">
                    Explore Details
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Bottom Call Action */}
          <div className="bg-white dark:bg-[#121212] border border-black/5 dark:border-white/10 rounded-2xl p-8 md:p-12 text-center max-w-4xl mx-auto space-y-6">
            <h2 className="text-2xl md:text-3xl font-bold">Unsure which options fit your current stage?</h2>
            <p className="text-sm text-neutral-500 dark:text-neutral-400 max-w-lg mx-auto">
              Our growth engineers perform complete channels analyses and draft a cohesive plan prior to live strategy calls.
            </p>
            <div>
              <a
                href="#contact"
                onClick={(e) => {
                  e.preventDefault();
                  onNavigate('contact');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="inline-flex items-center justify-center px-8 py-3 bg-[#0A84FF] text-white font-bold rounded-full select-none hover:bg-blue-600 transition-colors cursor-pointer"
              >
                Request Consultation Call
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Detailed Service Modal Popups */}
      <AnimatePresence>
        {selectedService && (() => {
          const det = SERVICE_DETAILS[selectedService.id] || {
            strategy: 'We perform complete assessments, map custom workflows, and build tailored channels designed to maximize digital reach and organic conversions.',
            focus: 'Strategic Integration, Speed Tuning, Data Quality Checks',
            whyEssential: 'Cohesive, automated channel structures prevent lead dropoffs and optimize your acquisition efficiency.'
          };

          return (
            <div
              className="fixed inset-0 bg-stone-900/60 dark:bg-black/80 backdrop-blur-md z-60 flex items-center justify-center p-4 overflow-y-auto cursor-pointer"
              onClick={() => setSelectedService(null)}
              id="service-details-modal-overlay"
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 30 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 30 }}
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                onClick={(e) => e.stopPropagation()}
                className="relative w-full max-w-2xl bg-white/95 dark:bg-[#1a1a1a]/95 backdrop-blur-2xl rounded-3xl border border-white/80 dark:border-white/10 shadow-[0_50px_100px_-20px_rgba(0,0,0,0.3),inset_0_1px_1px_rgba(255,255,255,0.4)] overflow-hidden cursor-default p-6 md:p-8 space-y-6"
                id="service-details-modal-container"
              >
                {/* Dynamic Corner Background Glow matching branding theme */}
                <div className="absolute top-[-50px] left-[-50px] w-48 h-48 rounded-full bg-[#0A84FF]/10 blur-[60px] pointer-events-none" />
                <div className="absolute bottom-[-50px] right-[-50px] w-48 h-48 rounded-full bg-[#0A84FF]/5 blur-[60px] pointer-events-none" />

                {/* Spatial Modal Header */}
                <div className="flex items-start justify-between gap-4 relative z-10">
                  <div className="flex items-center gap-4">
                    <PremiumIcon name={selectedService.icon} className="w-14 h-14" size={26} />
                    <div>
                      <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 bg-[#0A84FF]/10 text-xs font-bold text-[#0A84FF] rounded-full uppercase tracking-wider mb-1">
                        <Sparkles className="w-3 h-3" />
                        {selectedService.category === 'dev' ? 'Systems & Dev' : selectedService.category === 'automation' ? 'Scales & Automate' : 'Traffic & Marketing'}
                      </div>
                      <h2 className="text-2xl font-black text-stone-900 dark:text-white tracking-tight leading-tight">
                        {selectedService.title}
                      </h2>
                    </div>
                  </div>
                  <button
                    onClick={() => setSelectedService(null)}
                    className="p-2 rounded-full border border-black/5 dark:border-white/10 hover:bg-neutral-100 dark:hover:bg-stone-800 text-stone-400 hover:text-stone-900 dark:hover:text-white transition-all cursor-pointer select-none active:scale-95"
                    aria-label="Close details"
                  >
                    <X className="w-4 h-4 stroke-[2.5]" />
                  </button>
                </div>

                {/* Spatial Content Body */}
                <div className="space-y-6 overflow-y-auto max-h-[60vh] pr-1.5 relative z-10 scrollbar-thin scrollbar-thumb-stone-200 scrollbar-track-transparent">
                  {/* Service Core Intro Description */}
                  <div className="space-y-2">
                    <h3 className="text-xs font-black uppercase tracking-widest text-[#0A84FF]">Service Objective</h3>
                    <p className="text-stone-600 dark:text-stone-300 text-sm md:text-base leading-relaxed font-semibold">
                      {selectedService.desc}
                    </p>
                  </div>

                  {/* Core Strategy Description */}
                  <div className="space-y-2 p-5 rounded-2xl bg-neutral-50 dark:bg-stone-800/40 border border-black/5 dark:border-stone-800">
                    <h3 className="text-xs font-black uppercase tracking-widest text-[#0A84FF] flex items-center gap-1.5">
                      <Zap className="w-3.5 h-3.5 animate-bounce" />
                      The Framework Blueprint
                    </h3>
                    <p className="text-stone-600 dark:text-stone-300 text-sm leading-relaxed">
                      {det.strategy}
                    </p>
                    <div className="flex flex-wrap items-center gap-1.5 text-xs text-stone-400 dark:text-stone-500 pt-2.5 font-mono">
                      <span className="font-bold uppercase text-stone-500 dark:text-stone-400">Core Focus Areas:</span>
                      <span className="text-[#0A84FF] font-semibold">{det.focus}</span>
                    </div>
                  </div>

                  {/* Why Essential */}
                  <div className="space-y-2">
                    <h3 className="text-xs font-black uppercase tracking-widest text-[#0A84FF] flex items-center gap-1.5">
                      <HelpCircle className="w-3.5 h-3.5 text-[#0A84FF]" />
                      Why It Compounds Growth
                    </h3>
                    <p className="text-stone-500 dark:text-stone-400 text-sm leading-relaxed italic">
                      "{det.whyEssential}"
                    </p>
                  </div>

                  {/* Split Lists of benefits and outcome */}
                  <div className="grid md:grid-cols-2 gap-4">
                    {/* Benefits Package */}
                    <div className="p-4 rounded-2xl bg-emerald-500/5 dark:bg-emerald-500/5 border border-emerald-500/10 space-y-3">
                      <h3 className="text-xs font-extrabold uppercase tracking-widest text-emerald-600 dark:text-emerald-400">Package Deliverables</h3>
                      <ul className="space-y-2">
                        {selectedService.benefits.map((ben, bi) => (
                          <li key={bi} className="flex items-center gap-2 text-xs text-stone-700 dark:text-stone-300 font-medium">
                            <Check className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                            <span>{ben}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Operational Impact */}
                    <div className="p-4 rounded-2xl bg-blue-500/5 dark:bg-blue-500/5 border border-[#0A84FF]/10 flex flex-col justify-between gap-3">
                      <div>
                        <h3 className="text-xs font-extrabold uppercase tracking-widest text-[#0A84FF] flex items-center gap-1.5">
                          <TrendingUp className="w-3.5 h-3.5" />
                          Expected Output
                        </h3>
                        <p className="text-stone-600 dark:text-stone-300 text-sm font-semibold leading-snug mt-2">
                          {selectedService.outcome}
                        </p>
                      </div>
                      <span className="text-[10px] font-mono text-stone-400 dark:text-stone-400 uppercase tracking-widest">
                        Verified 7Hive Standard
                      </span>
                    </div>
                  </div>
                </div>

                {/* Glass actions segment */}
                <div className="pt-4 border-t border-black/5 dark:border-stone-800 flex flex-col sm:flex-row items-center justify-between gap-4 relative z-10">
                  <span className="text-xs text-stone-400 dark:text-stone-500 font-mono text-center sm:text-left">
                    Direct scope engineering consultations.
                  </span>
                  <div className="flex gap-2.5 w-full sm:w-auto">
                    <button
                      onClick={() => setSelectedService(null)}
                      className="flex-1 sm:flex-initial text-xs font-bold uppercase tracking-wider px-5 py-3 rounded-full border border-black/5 dark:border-white/10 hover:bg-neutral-50 dark:hover:bg-stone-800 text-stone-600 dark:text-stone-300 transition-all cursor-pointer select-none text-center active:scale-95"
                    >
                      Close Details
                    </button>
                    <button
                      onClick={() => {
                        setSelectedService(null);
                        onNavigate('contact');
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }}
                      className="flex-1 sm:flex-initial text-xs font-bold uppercase tracking-wider px-6 py-3 rounded-full bg-[#0A84FF] hover:bg-sky-500 text-white dark:text-[#121212] transition-all shadow-[0_8px_20px_rgba(10,132,255,0.15),inset_0_1px_1px_rgba(255,255,255,0.4)] cursor-pointer select-none text-center hover:-translate-y-0.5 active:translate-y-0 active:scale-95 duration-200"
                    >
                      Assemble Scoping Call
                    </button>
                  </div>
                </div>
              </motion.div>
            </div>
          );
        })()}
      </AnimatePresence>
    </div>
  );
}

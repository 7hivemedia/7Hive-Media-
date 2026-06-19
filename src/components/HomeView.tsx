import React, { useState, useEffect } from 'react';
import { ArrowRight, Check, Zap, X, ShieldAlert, Award, MessageSquare, ChevronRight, ChevronLeft } from 'lucide-react';
import { motion } from 'motion/react';
import { SERVICES, CASE_STUDIES, TESTIMONIALS, FAQS } from '../data';

interface HomeViewProps {
  onNavigate: (view: string) => void;
}

export function HomeView({ onNavigate }: HomeViewProps) {
  // Star Counters
  const [leadCounter, setLeadCounter] = useState(0);
  const [siteCounter, setSiteCounter] = useState(0);
  const [revCounter, setRevCounter] = useState(0);

  // Testimonial position state
  const [activeTestimonialIdx, setActiveTestimonialIdx] = useState(0);

  // FAQ accordion status
  const [activeFaqId, setActiveFaqId] = useState<string | null>(null);

  // Ticking counters effect on view active
  useEffect(() => {
    let tick = 0;
    const interval = setInterval(() => {
      tick += 1;
      if (tick <= 100) {
        setLeadCounter(Math.round(15000 * (tick / 100)));
        setSiteCounter(Math.round(120 * (tick / 100)));
        setRevCounter(Math.round(50 * (tick / 100)));
      } else {
        clearInterval(interval);
      }
    }, 15);
    return () => clearInterval(interval);
  }, []);

  const handleFaqToggle = (id: string) => {
    setActiveFaqId(activeFaqId === id ? null : id);
  };

  const handleTestimonialScroll = (dir: 'next' | 'prev') => {
    if (dir === 'next') {
      setActiveTestimonialIdx((prev) => (prev + 1) % TESTIMONIALS.length);
    } else {
      setActiveTestimonialIdx((prev) => (prev === 0 ? TESTIMONIALS.length - 1 : prev - 1));
    }
  };

  const handleCtaClick = (view: string, e: React.MouseEvent) => {
    e.preventDefault();
    onNavigate(view);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const honeycombCells = [
    { icon: '🌐', label: 'Websites', delay: 0, x: 155, top: 0 },
    { icon: '🔍', label: 'SEO', delay: 100, x: 270, top: 0 },
    { icon: '📊', label: 'Google Ads', delay: 200, x: 95, top: 95 },
    { icon: '📱', label: 'Meta Ads', delay: 300, x: 210, top: 95 },
    { icon: '⚡', label: 'Automation', delay: 400, x: 325, top: 95 },
    { icon: '🎯', label: 'Leads', delay: 500, x: 155, top: 190 },
    { icon: '✍️', label: 'Content', delay: 600, x: 270, top: 190 },
  ];

  return (
    <div className="pt-20">
      {/* 1. Hero Block */}
      <section className="relative min-h-[92vh] flex items-center justify-center overflow-hidden py-16 px-6 md:px-12 bg-white dark:bg-[#121212] transition-colors duration-300">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-sky-100/10 via-neutral-100/10 to-transparent dark:from-[#0A84FF]/5 dark:via-transparent dark:to-transparent" />
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10 w-full">
          <div className="text-left space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#0A84FF]/10 border border-[#0A84FF]/20 rounded-full text-xs font-semibold text-[#0A84FF]">
              <span className="w-2 h-2 rounded-full bg-[#0A84FF] animate-pulse" />
              Digital Growth Agency
            </div>
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-neutral-900 dark:text-neutral-50 leading-tight">
              Turn Attention <br />
              Into <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0A84FF] to-blue-500 underline decoration-[#FFD700] decoration-wavy decoration-3 underline-offset-8">Revenue.</span>
            </h1>
            <p className="text-lg text-neutral-600 dark:text-neutral-400 max-w-xl">
              7Hive Media builds and manages comprehensive, conversion-optimized ecosystems where web pages, target campaigns, CRM mappings, and WhatsApp sequences work as one unified engine.
            </p>
            <div className="flex flex-wrap gap-4 pt-4">
              <a
                href="#contact"
                onClick={(e) => handleCtaClick('contact', e)}
                className="px-8 py-3.5 bg-[#0A84FF] text-white font-bold rounded-full select-none hover:bg-blue-600 transition-all shadow-md active:scale-95"
              >
                Book Free Strategy Call
              </a>
              <a
                href="#services"
                onClick={(e) => handleCtaClick('services', e)}
                className="px-8 py-3.5 border border-black/10 dark:border-white/10 text-neutral-800 dark:text-neutral-200 font-semibold rounded-full select-none hover:bg-neutral-50 dark:hover:bg-neutral-800 transition-all"
              >
                Explore Services
              </a>
            </div>
          </div>

          <div className="hidden lg:flex items-center justify-center h-[460px] relative pointer-events-none select-none">
            <div className="relative w-[440px] h-[340px]">
              {honeycombCells.map((cell, idx) => (
                <div
                  key={idx}
                  className="absolute w-[110px] h-[126px] bg-neutral-50 dark:bg-neutral-900 border border-black/5 dark:border-white/5 flex flex-col items-center justify-center gap-1 shadow-sm transition-transform duration-300 hover:scale-108 hover:border-[#0A84FF]/20"
                  style={{
                    left: `${cell.x}px`,
                    top: `${cell.top}px`,
                    clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)',
                  }}
                >
                  <span className="text-2xl">{cell.icon}</span>
                  <span className="text-[10px] font-bold text-neutral-500 dark:text-neutral-400 uppercase tracking-widest leading-none">
                    {cell.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 2. Intro Section */}
      <section className="py-20 px-6 md:px-12 bg-neutral-50 dark:bg-[#1a1a1a] transition-colors duration-300">
        <div className="max-w-7xl mx-auto text-center space-y-12">
          <div className="space-y-4">
            <p className="text-xs font-bold text-[#0A84FF] uppercase tracking-widest">The Problem</p>
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight">
              Most Businesses Don't Need More Marketing. <br />
              <span className="text-neutral-400 dark:text-neutral-600 font-medium">They Need Better Systems.</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            <div className="bg-white dark:bg-[#121212] border border-black/5 dark:border-white/10 rounded-xl p-8 space-y-3 relative overflow-hidden group">
              <div className="absolute top-0 left-0 right-0 h-1 bg-red-400/50" />
              <div className="text-3xl">🔗</div>
              <h4 className="font-bold text-lg">Disconnected Website</h4>
              <p className="text-sm text-neutral-500 dark:text-neutral-400">
                Created on legacy templates, rarely audited, completely disconnected from your analytics and campaigns.
              </p>
            </div>

            <div className="bg-white dark:bg-[#121212] border border-black/5 dark:border-white/10 rounded-xl p-8 space-y-3 relative overflow-hidden group">
              <div className="absolute top-0 left-0 right-0 h-1 bg-red-400/50" />
              <div className="text-3xl">📢</div>
              <h4 className="font-bold text-lg">Scattered Ad Spending</h4>
              <p className="text-sm text-neutral-500 dark:text-neutral-400">
                Pumping budgets into Google or Meta with zero qualification pipelines, leading to manual sorting fatigue.
              </p>
            </div>

            <div className="bg-white dark:bg-[#121212] border border-black/5 dark:border-white/10 rounded-xl p-8 space-y-3 relative overflow-hidden group">
              <div className="absolute top-0 left-0 right-0 h-1 bg-red-400/50" />
              <div className="text-3xl">📱</div>
              <h4 className="font-bold text-lg">Manual sorting noise</h4>
              <p className="text-sm text-neutral-500 dark:text-neutral-400">
                Staff spending hours daily typing WhatsApp greetings and checking schedules manually, losing leads in-flight.
              </p>
            </div>
          </div>

          <div className="bg-white dark:bg-[#121212] border border-[#0A84FF]/20 rounded-2xl p-8 max-w-3xl mx-auto space-y-4 shadow-sm">
            <p className="text-xs font-bold text-[#0A84FF] uppercase tracking-wider">The 7Hive Alignment</p>
            <h3 className="text-2xl font-bold">One Connected, High-Converting Machine.</h3>
            <p className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
              We replace legacy, isolated vendors with engineered pipelines. Your custom website feeds smart calendars, ad traffic hits dynamic pre-qualifying systems, and CRM mappings trigger instant follow-ups on WhatsApp automatically. 
            </p>
          </div>
        </div>
      </section>

      {/* 3. Services Summary */}
      <section className="py-20 px-6 md:px-12 bg-white dark:bg-[#121212] transition-colors duration-300">
        <div className="max-w-7xl mx-auto space-y-12">
          <div className="text-center space-y-4">
            <p className="text-xs font-bold text-[#0A84FF] uppercase tracking-widest">Our Ecosystem</p>
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight">Everything Your Business Needs To Grow.</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {SERVICES.slice(0, 3).map((srv) => (
              <div
                key={srv.id}
                className="bg-neutral-50 dark:bg-[#1a1a1a] border border-black/5 dark:border-white/5 rounded-xl p-8 flex flex-col justify-between group hover:border-[#0A84FF]/30 transition-all duration-300"
              >
                <div className="space-y-4">
                  <div className="w-12 h-12 rounded-lg bg-[#0A84FF]/10 flex items-center justify-center text-xl font-bold text-[#0A84FF]">
                    {srv.icon}
                  </div>
                  <h3 className="text-lg font-bold">{srv.title}</h3>
                  <p className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">{srv.desc}</p>
                </div>
                <div className="mt-6 pt-4 border-t border-black/5 dark:border-white/5 flex items-center justify-between">
                  <span className="text-xs text-[#0A84FF] font-semibold">{srv.outcome}</span>
                  <ArrowRight className="w-4 h-4 text-neutral-400 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            ))}
          </div>

          <div className="text-center pt-4">
            <a
              href="#services"
              onClick={(e) => handleCtaClick('services', e)}
              className="inline-flex items-center gap-2 text-sm font-bold text-[#0A84FF] hover:text-[#0A84FF]/80 group"
            >
              See our complete 10-piece package
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </a>
          </div>
        </div>
      </section>

      {/* 4. Case Studies Brief */}
      <section className="py-20 px-6 md:px-12 bg-neutral-50 dark:bg-[#1a1a1a] transition-colors duration-300">
        <div className="max-w-7xl mx-auto space-y-12">
          <div className="text-center space-y-4">
            <p className="text-xs font-bold text-[#0A84FF] uppercase tracking-widest">Our Work</p>
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight">Growth Proof & Custom Audits.</h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {CASE_STUDIES.map((cs) => (
              <div
                key={cs.id}
                className="bg-white dark:bg-[#121212] border border-black/5 dark:border-white/10 rounded-2xl overflow-hidden shadow-sm flex flex-col justify-between group hover:border-[#0A84FF]/20 transition-all"
              >
                <div className="p-8 space-y-4">
                  <span className="text-[10px] uppercase font-bold tracking-widest text-[#0A84FF]">
                    {cs.industry}
                  </span>
                  <h3 className="text-xl font-bold">{cs.title}</h3>
                  <p className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">{cs.desc}</p>
                </div>
                <div className="p-8 pt-0">
                  <div className="grid grid-cols-3 gap-4 border-t border-black/5 dark:border-white/10 pt-6">
                    {cs.metrics.map((met, mi) => (
                      <div key={mi} className="text-center">
                        <span className="block text-xl font-extrabold text-[#0A84FF] leading-none mb-1">
                          {met.value}
                        </span>
                        <span className="text-[10px] font-medium text-neutral-400 uppercase tracking-wider">
                          {met.label}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center">
            <a
              href="#work"
              onClick={(e) => handleCtaClick('work', e)}
              className="inline-flex items-center gap-2 text-sm font-bold text-[#0A84FF] hover:text-[#0A84FF]/80 group"
            >
              Examine detailed client testimonials
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </a>
          </div>
        </div>
      </section>

      {/* 5. Metrics counter view */}
      <section className="py-16 px-6 md:px-12 bg-white dark:bg-[#121212] border-y border-black/5 dark:border-white/10 transition-colors duration-300">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
          <div className="text-center space-y-2">
            <div className="text-4xl font-extrabold text-[#0A84FF]">{leadCounter.toLocaleString('en-IN')}+</div>
            <div className="text-xs uppercase tracking-widest text-neutral-400 font-bold">Leads Generated</div>
          </div>
          <div className="text-center space-y-2">
            <div className="text-4xl font-extrabold text-[#0A84FF]">{siteCounter}+</div>
            <div className="text-xs uppercase tracking-widest text-neutral-400 font-bold">Sites Launched</div>
          </div>
          <div className="text-center space-y-2">
            <div className="text-4xl font-extrabold text-[#0A84FF]">₹{revCounter}Cr+</div>
            <div className="text-xs uppercase tracking-widest text-neutral-400 font-bold">Revenue Influenced</div>
          </div>
          <div className="text-center space-y-2">
            <div className="text-4xl font-extrabold text-[#0A84FF]">98%</div>
            <div className="text-xs uppercase tracking-widest text-neutral-400 font-bold">Satisfaction Scale</div>
          </div>
        </div>
      </section>

      {/* 6. Client Carousel Block */}
      <section className="py-20 px-6 md:px-12 bg-neutral-50 dark:bg-[#1a1a1a] transition-colors duration-300 overflow-hidden">
        <div className="max-w-5xl mx-auto space-y-12 relative">
          <div className="text-center space-y-4">
            <p className="text-xs font-bold text-[#0A84FF] uppercase tracking-widest">Feedback</p>
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-neutral-900 dark:text-neutral-50">
              Trusted By Scaling Brands.
            </h2>
          </div>

          <div className="relative bg-white dark:bg-[#121212] border border-black/5 dark:border-white/10 rounded-2xl p-8 md:p-12 shadow-sm min-h-[250px] flex flex-col justify-between">
            <div className="space-y-6">
              <div className="text-amber-400 text-lg">{'★'.repeat(TESTIMONIALS[activeTestimonialIdx].stars)}</div>
              <p className="text-lg md:text-xl font-medium italic text-neutral-800 dark:text-neutral-200 leading-relaxed">
                "{TESTIMONIALS[activeTestimonialIdx].text}"
              </p>
            </div>
            <div className="flex items-center justify-between mt-8 pt-6 border-t border-black/5 dark:border-white/10">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gradient-to-tr from-[#0A84FF] to-sky-400 rounded-full flex items-center justify-center font-bold text-white select-none">
                  {TESTIMONIALS[activeTestimonialIdx].avatarInitials}
                </div>
                <div>
                  <div className="font-bold text-sm text-neutral-900 dark:text-neutral-50">
                    {TESTIMONIALS[activeTestimonialIdx].author}
                  </div>
                  <div className="text-xs text-neutral-400">{TESTIMONIALS[activeTestimonialIdx].role}</div>
                </div>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => handleTestimonialScroll('prev')}
                  className="w-10 h-10 rounded-full border border-black/5 dark:border-white/10 flex items-center justify-center text-neutral-500 hover:text-black dark:hover:text-white transition-colors cursor-pointer"
                  id="testimonial-prev-action"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  onClick={() => handleTestimonialScroll('next')}
                  className="w-10 h-10 rounded-full border border-black/5 dark:border-white/10 flex items-center justify-center text-neutral-500 hover:text-black dark:hover:text-white transition-colors cursor-pointer"
                  id="testimonial-next-action"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7. Quick FAQ accordion */}
      <section className="py-20 px-6 md:px-12 bg-white dark:bg-[#121212] transition-colors duration-300">
        <div className="max-w-4xl mx-auto space-y-12">
          <div className="text-center space-y-4">
            <p className="text-xs font-bold text-[#0A84FF] uppercase tracking-widest">Knowledge Base</p>
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight">Questions & Answers</h2>
          </div>

          <div className="space-y-4">
            {FAQS.slice(0, 4).map((faq) => {
              const isSelected = activeFaqId === faq.id;
              return (
                <div
                  key={faq.id}
                  className="bg-neutral-50 dark:bg-[#1a1a1a] border border-black/5 dark:border-white/10 rounded-xl overflow-hidden transition-all duration-300"
                >
                  <button
                    onClick={() => handleFaqToggle(faq.id)}
                    className="w-full px-6 py-5 flex items-center justify-between text-left font-semibold text-neutral-900 dark:text-neutral-50 hover:text-[#0A84FF] transition-colors"
                  >
                    <span>{faq.question}</span>
                    <span className="text-lg leading-none text-[#0A84FF]">{isSelected ? '−' : '+'}</span>
                  </button>
                  {isSelected && (
                    <div className="px-6 pb-5 text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed border-t border-black/5 dark:border-white/5 pt-4">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          <div className="text-center">
            <a
              href="#faq"
              onClick={(e) => handleCtaClick('faq', e)}
              className="inline-flex items-center gap-2 text-sm font-bold text-[#0A84FF] hover:text-[#0A84FF]/80 group"
            >
              See all frequently asked questions
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </a>
          </div>
        </div>
      </section>

      {/* 8. Bottom Action Banner */}
      <section className="py-20 px-6 md:px-12 bg-neutral-950 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.03] bg-[radial-gradient(#F4B400_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none select-none" />
        <div className="max-w-4xl mx-auto text-center space-y-6 relative z-10">
          <p className="text-xs font-bold text-[#0A84FF] uppercase tracking-wider">Join The Hive</p>
          <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight">Ready to build your digital growth system?</h2>
          <p className="text-lg text-neutral-400 max-w-xl mx-auto leading-relaxed">
            Stop losing leads in isolated systems. Connect websites, WhatsApp automation, and prequalified channels into a singular predictable engine today.
          </p>
          <div className="flex flex-wrap gap-4 justify-center pt-6">
            <a
              href="#contact"
              onClick={(e) => handleCtaClick('contact', e)}
              className="px-8 py-3.5 bg-[#0A84FF] text-white font-extrabold rounded-full select-none hover:bg-blue-600 transition-all shadow-md active:scale-95"
            >
              Book Strategic Call Free
            </a>
            <a
              href="#contact?type=audit"
              onClick={(e) => handleCtaClick('contact', e)}
              className="px-8 py-3.5 border border-white/20 hover:border-white/40 text-white font-semibold rounded-full select-none hover:bg-white/5 transition-all"
            >
              Request Free Audit report
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}

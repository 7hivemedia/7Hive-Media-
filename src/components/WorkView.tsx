import { useState } from 'react';
import { CASE_STUDIES } from '../data';

interface WorkViewProps {
  onNavigate: (view: string) => void;
}

export function WorkView({ onNavigate }: WorkViewProps) {
  const [activeFilter, setActiveCategory] = useState<'all' | 'lead-gen' | 'local' | 'seo'>('all');

  const filteredStudies = CASE_STUDIES.filter(
    (cs) => activeFilter === 'all' || cs.category === activeFilter
  );

  const filters = [
    { label: 'All Work', key: 'all' as const },
    { label: 'Lead Generation', key: 'lead-gen' as const },
    { label: 'Local Business', key: 'local' as const },
    { label: 'SEO & Organic', key: 'seo' as const },
  ];

  return (
    <div className="pt-20">
      {/* Hero */}
      <section className="relative py-16 px-6 md:px-12 bg-white dark:bg-[#121212] transition-colors duration-300 overflow-hidden text-center border-b border-black/5 dark:border-white/10">
        <div className="absolute inset-x-0 top-0 h-64 bg-gradient-to-b from-[#0A84FF]/5 to-transparent pointer-none select-none" />
        <div className="max-w-4xl mx-auto space-y-4 relative z-10">
          <p className="text-xs font-bold text-[#0A84FF] uppercase tracking-widest">Case Studies</p>
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight">Growth Stories That Matter</h1>
          <p className="text-lg text-neutral-500 dark:text-neutral-400 max-w-xl mx-auto">
            Take a look at how we design, audit, and scale growth systems for various industries. Real data, real results.
          </p>
        </div>
      </section>

      {/* Grid */}
      <section className="py-16 px-6 md:px-12 bg-neutral-50 dark:bg-[#1a1a1a] transition-colors duration-300">
        <div className="max-w-7xl mx-auto space-y-12">
          {/* Navigation Filter Header */}
          <div className="flex flex-wrap gap-2 justify-center">
            {filters.map((flt) => (
              <button
                key={flt.key}
                onClick={() => setActiveCategory(flt.key)}
                className={`px-5 py-2.5 rounded-full text-xs font-bold tracking-wider transition-all select-none cursor-pointer ${
                  activeFilter === flt.key
                    ? 'bg-[#0A84FF] text-white shadow-sm'
                    : 'bg-white dark:bg-[#121212] border border-black/5 dark:border-white/10 text-neutral-500 hover:text-black dark:hover:text-white'
                }`}
              >
                {flt.label}
              </button>
            ))}
          </div>

          {/* Grid list */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredStudies.map((cs) => (
              <div
                key={cs.id}
                className="bg-white dark:bg-[#121212] border border-black/5 dark:border-white/10 rounded-2xl overflow-hidden flex flex-col justify-between hover:border-[#0A84FF]/20 transition-all duration-300"
              >
                <div className="p-8 space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] uppercase font-bold tracking-widest text-[#0A84FF]">
                      {cs.industry}
                    </span>
                    <span className="text-2xl select-none">{cs.icon}</span>
                  </div>
                  <h3 className="text-xl font-bold text-neutral-905 dark:text-neutral-50">{cs.title}</h3>
                  <p className="text-sm text-neutral-500 dark:text-neutral-400 leading-relaxed">
                    {cs.desc}
                  </p>
                </div>
                <div className="p-8 pt-0">
                  <div className="grid grid-cols-3 gap-4 border-t border-black/5 dark:border-white/10 pt-6">
                    {cs.metrics.map((met, mi) => (
                      <div key={mi} className="text-center">
                        <span className="block text-2xl font-extrabold text-[#0A84FF] leading-none mb-1">
                          {met.value}
                        </span>
                        <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest leading-none">
                          {met.label}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* CTA */}
          <div className="bg-white dark:bg-[#121212] border border-black/5 dark:border-white/10 rounded-2xl p-8 md:p-12 text-center max-w-4xl mx-auto space-y-4">
            <h2 className="text-2xl font-bold">Want to achieve similar milestones for your business?</h2>
            <p className="text-sm text-neutral-500 dark:text-neutral-400 max-w-lg mx-auto leading-relaxed">
              We perform a comprehensive channels audit showing loading speeds, conversion blocks, and ranking benchmarks completely free.
            </p>
            <div className="pt-2">
              <a
                href="#contact?type=audit"
                onClick={(e) => {
                  e.preventDefault();
                  onNavigate('contact');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="inline-flex items-center justify-center px-8 py-3 bg-[#0A84FF] text-white font-bold rounded-full select-none hover:bg-blue-600 transition-colors cursor-pointer"
              >
                Request Free Website Audit Report
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

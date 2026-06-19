import { useState } from 'react';
import { Check, ArrowRight } from 'lucide-react';
import { SERVICES } from '../data';

interface ServicesViewProps {
  onNavigate: (view: string) => void;
}

export function ServicesView({ onNavigate }: ServicesViewProps) {
  const [activeCategory, setActiveCategory] = useState<'all' | 'dev' | 'marketing' | 'automation'>('all');

  const filteredServices = SERVICES.filter(
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
                className="bg-white dark:bg-[#121212] border border-black/5 dark:border-white/10 rounded-2xl p-8 flex flex-col justify-between hover:border-[#0A84FF]/20 hover:shadow-sm transition-all duration-300 group"
              >
                <div className="space-y-6">
                  <div className="w-12 h-12 rounded-xl bg-[#0A84FF]/10 flex items-center justify-center text-xl font-bold text-[#0A84FF] select-none">
                    {srv.icon}
                  </div>
                  <div>
                    <h3 className="text-lg font-bold mb-2">{srv.title}</h3>
                    <p className="text-sm text-neutral-500 dark:text-neutral-400 leading-relaxed">
                      {srv.desc}
                    </p>
                  </div>

                  {/* Benefits */}
                  <div className="space-y-2 pt-2">
                    {srv.benefits.map((ben, bi) => (
                      <div key={bi} className="flex items-center gap-2 text-sm text-neutral-600 dark:text-neutral-400">
                        <Check className="w-4 h-4 text-[#0A84FF]" />
                        <span>{ben}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-8 pt-4 border-t border-black/5 dark:border-white/5">
                  <div className="flex items-center gap-1.5 text-xs text-[#0A84FF] font-semibold">
                    <span>↘ Impact:</span>
                    <span>{srv.outcome}</span>
                  </div>
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
    </div>
  );
}

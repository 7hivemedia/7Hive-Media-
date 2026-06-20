import { TESTIMONIALS } from '../data';

interface TestimonialsViewProps {
  onNavigate: (view: string) => void;
}

export function TestimonialsView({ onNavigate }: TestimonialsViewProps) {
  return (
    <div className="pt-20">
      {/* Hero */}
      <section className="relative py-16 px-6 md:px-12 bg-white dark:bg-[#121212] transition-colors duration-300 overflow-hidden text-center border-b border-black/5 dark:border-white/10">
        <div className="absolute inset-x-0 top-0 h-64 bg-gradient-to-b from-[#0A84FF]/5 to-transparent pointer-none select-none" />
        <div className="max-w-4xl mx-auto space-y-4 relative z-10">
          <p className="text-xs font-bold text-[#0A84FF] uppercase tracking-widest">PROOF OF VALUE</p>
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight">What Our Partners Say About Us</h1>
          <p className="text-lg text-neutral-500 dark:text-neutral-400 max-w-xl mx-auto">
            Read first-hand accounts of operational hours saved, lead count multiples, and revenue scaling created by our connected systems.
          </p>
        </div>
      </section>

      {/* Grid */}
      <section className="py-16 px-6 md:px-12 bg-neutral-50 dark:bg-[#1a1a1a] transition-colors duration-300">
        <div className="max-w-7xl mx-auto space-y-12">
          {/* Card list */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {TESTIMONIALS.map((t) => (
              <div
                key={t.id}
                className="bg-white dark:bg-[#121212] border border-black/5 dark:border-white/10 rounded-2xl p-8 flex flex-col justify-between hover:border-[#0A84FF]/25 hover:shadow-sm transition-all duration-300"
              >
                <div className="space-y-4">
                  <span className="text-amber-400 text-sm tracking-tight">{'★'.repeat(t.stars)}</span>
                  <p className="text-base text-neutral-800 dark:text-neutral-200 italic leading-relaxed">
                    "{t.text}"
                  </p>
                </div>
                <div className="flex items-center gap-4 mt-8 pt-6 border-t border-black/5 dark:border-white/10">
                  <div className="w-10 h-10 bg-gradient-to-tr from-[#0A84FF] to-[#FFD700] rounded-full flex items-center justify-center font-bold text-white text-xs select-none">
                    {t.avatarInitials}
                  </div>
                  <div>
                    <div className="text-sm font-bold text-[#212121] dark:text-[#E0E0E0]">{t.author}</div>
                    <div className="text-xs text-neutral-400">{t.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* CTA */}
          <div className="bg-white dark:bg-[#121212] border border-black/5 dark:border-white/10 rounded-2xl p-8 md:p-12 text-center max-w-4xl mx-auto space-y-4">
            <h2 className="text-2xl font-bold">Ready to be our next success story?</h2>
            <p className="text-sm text-neutral-500 dark:text-neutral-400 max-w-lg mx-auto leading-relaxed">
              We focus purely on long-term client tenure. We outline, build, and configure systems targeting key pre-arranged operational gains.
            </p>
            <div className="pt-2">
              <a
                href="#contact"
                onClick={(e) => {
                  e.preventDefault();
                  onNavigate('contact');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="inline-flex items-center justify-center px-8 py-3 bg-[#0A84FF] text-white font-bold rounded-full select-none hover:bg-blue-600 transition-colors cursor-pointer"
              >
                Let's Build Your Onboarding Blueprint
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

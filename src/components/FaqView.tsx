import { useState, useMemo, useEffect } from 'react';
import { Search } from 'lucide-react';
import { dynamicStore } from '../lib/dynamicStore';
import { FAQItem } from '../types';

interface FaqViewProps {
  onNavigate: (view: string) => void;
}

export function FaqView({ onNavigate }: FaqViewProps) {
  const [activeFaqId, setActiveFaqId] = useState<string | null>(null);
  const [activeCategory, setActiveCategory] = useState<'all' | 'general' | 'services' | 'automation' | 'pricing'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [faqs, setFaqs] = useState<FAQItem[]>([]);

  useEffect(() => {
    dynamicStore.getFAQs().then(setFaqs);
  }, []);

  const handleFaqToggle = (id: string) => {
    setActiveFaqId(activeFaqId === id ? null : id);
  };

  const categories = [
    { label: 'All FAQs', key: 'all' as const },
    { label: 'General', key: 'general' as const },
    { label: 'Services', key: 'services' as const },
    { label: 'Automation', key: 'automation' as const },
    { label: 'Pricing & WaaS', key: 'pricing' as const },
  ];

  const filteredFaqs = useMemo(() => {
    return faqs.filter((faq) => {
      const matchesCategory = activeCategory === 'all' || faq.category === activeCategory;
      const matchesQuery =
        searchQuery === '' ||
        faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
        faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesQuery;
    });
  }, [faqs, activeCategory, searchQuery]);


  return (
    <div className="pt-20">
      {/* Hero */}
      <section className="relative py-16 px-6 md:px-12 bg-white dark:bg-[#121212] transition-colors duration-300 overflow-hidden text-center border-b border-black/5 dark:border-white/10">
        <div className="absolute inset-x-0 top-0 h-64 bg-gradient-to-b from-[#0A84FF]/5 to-transparent pointer-none select-none" />
        <div className="max-w-4xl mx-auto space-y-6 relative z-10">
          <p className="text-xs font-bold text-[#0A84FF] uppercase tracking-widest font-sans">RESOURCE CENTER</p>
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight">Frequently Asked Questions</h1>
          <p className="text-lg text-neutral-500 dark:text-neutral-400 max-w-xl mx-auto mb-8 font-sans">
            Find immediate answers regards to our growth methodologies, onboarding, subscriptions, systems support, and analytics workflows.
          </p>

          {/* Search bar */}
          <div className="max-w-md mx-auto relative flex items-center">
            <Search className="w-5 h-5 text-neutral-400 absolute left-4" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search questions or keyword answers..."
              className="w-full pl-12 pr-4 py-3 bg-neutral-50 dark:bg-[#1a1a1a] border border-black/5 dark:border-white/10 rounded-full focus:outline-none focus:border-[#0A84FF] text-sm text-neutral-800 dark:text-neutral-50 transition-colors shadow-sm"
              id="faq-search-input-field"
            />
          </div>
        </div>
      </section>

      {/* Grid */}
      <section className="py-20 px-6 md:px-12 bg-neutral-50 dark:bg-[#1a1a1a] transition-colors duration-300">
        <div className="max-w-4xl mx-auto space-y-12">
          {/* Navigation Filter Header */}
          <div className="flex flex-wrap gap-2 justify-center">
            {categories.map((cat) => (
              <button
                key={cat.key}
                onClick={() => setActiveCategory(cat.key)}
                className={`px-5 py-2.5 rounded-full text-xs font-bold tracking-wider transition-all select-none cursor-pointer ${
                  activeCategory === cat.key
                    ? 'bg-[#0A84FF] text-white shadow-xs'
                    : 'bg-white dark:bg-[#121212] border border-black/5 dark:border-white/10 text-neutral-500 hover:text-black dark:hover:text-white'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Accordion list */}
          <div className="space-y-4">
            {filteredFaqs.length > 0 ? (
              filteredFaqs.map((faq) => {
                const isSelected = activeFaqId === faq.id;
                return (
                  <div
                    key={faq.id}
                    className="bg-white dark:bg-[#121212] border border-black/5 dark:border-white/10 rounded-xl overflow-hidden shadow-xs hover:border-[#0A84FF]/20 transition-all duration-300"
                  >
                    <button
                      onClick={() => handleFaqToggle(faq.id)}
                      className="w-full px-6 py-5 flex items-center justify-between text-left font-semibold text-neutral-800 dark:text-neutral-50 hover:text-[#0A84FF] transition-colors cursor-pointer"
                    >
                      <span className="pr-4">{faq.question}</span>
                      <span className="text-xl leading-none text-[#0A84FF]">{isSelected ? '−' : '+'}</span>
                    </button>
                    {isSelected && (
                      <div className="px-6 pb-6 text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed border-t border-black/5 dark:border-white/5 pt-4">
                        {faq.answer}
                      </div>
                    )}
                  </div>
                );
              })
            ) : (
              <div className="text-center py-12 text-sm text-neutral-400 font-medium">
                No answers matching "{searchQuery}" could be found.
              </div>
            )}
          </div>

          {/* CTA */}
          <div className="bg-white dark:bg-[#121212] border border-black/5 dark:border-white/10 rounded-2xl p-8 md:p-12 text-center max-w-4xl mx-auto space-y-4 shadow-xs">
            <h2 className="text-2xl font-bold">Have more specific operational questions?</h2>
            <p className="text-sm text-neutral-500 dark:text-neutral-400 max-w-lg mx-auto leading-relaxed">
              We respond to all general query contacts and emails within 24 hours. Leave us a prompt.
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
                Send Us Message Details
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

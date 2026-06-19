import React, { useState } from 'react';
import { BLOG_POSTS } from '../data';

interface BlogViewProps {
  onNavigate: (view: string) => void;
}

export function BlogView({ onNavigate }: BlogViewProps) {
  const [subscribeEmail, setSubscribeEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubscribeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (subscribeEmail.trim() && subscribeEmail.includes('@')) {
      setIsSubscribed(true);
      setSubscribeEmail('');
      setTimeout(() => setIsSubscribed(false), 4000);
    }
  };

  return (
    <div className="pt-20">
      {/* Hero */}
      <section className="relative py-16 px-6 md:px-12 bg-white dark:bg-[#121212] transition-colors duration-300 overflow-hidden text-center border-b border-black/5 dark:border-white/10">
        <div className="absolute inset-x-0 top-0 h-64 bg-gradient-to-b from-[#0A84FF]/5 to-transparent pointer-none select-none" />
        <div className="max-w-4xl mx-auto space-y-4 relative z-10">
          <p className="text-xs font-bold text-[#0A84FF] uppercase tracking-widest font-sans">COMPANY INSIGHTS</p>
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-neutral-900 dark:text-neutral-50 leading-tight">
            7Hive Growth Insights
          </h1>
          <p className="text-lg text-neutral-500 dark:text-neutral-400 max-w-xl mx-auto font-sans leading-relaxed">
            Read our reports and articles detailing conversions, marketing automation layouts, search optimization, and web systems.
          </p>
        </div>
      </section>

      {/* Grid Content */}
      <section className="py-16 px-6 md:px-12 bg-neutral-50 dark:bg-[#1a1a1a] transition-colors duration-300">
        <div className="max-w-7xl mx-auto space-y-16">
          {/* Article blocks */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {BLOG_POSTS.map((post) => (
              <div
                key={post.id}
                className="bg-white dark:bg-[#121212] border border-black/5 dark:border-white/10 rounded-2xl overflow-hidden hover:border-[#0A84FF]/25 hover:shadow-xs transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  <div className="h-44 bg-neutral-50 dark:bg-neutral-950 flex items-center justify-center text-4xl select-none group-hover:scale-102 transition-transform duration-300">
                    {post.visual}
                  </div>
                  <div className="p-6 space-y-4">
                    <div className="flex items-center justify-between text-xs text-neutral-400 font-medium">
                      <span>{post.date}</span>
                      <span className="px-2 py-0.5 bg-[#0A84FF]/10 text-[#0A84FF] rounded-full uppercase tracking-wider font-bold text-[9px]">
                        {post.tag}
                      </span>
                    </div>
                    <h3 className="text-base font-extrabold text-neutral-900 dark:text-white leading-snug group-hover:text-[#0A84FF] transition-colors">
                      {post.title}
                    </h3>
                    <p className="text-xs text-neutral-500 dark:text-neutral-400 leading-relaxed font-sans">
                      {post.desc}
                    </p>
                  </div>
                </div>

                <div className="p-6 pt-0">
                  <a
                    href="#"
                    onClick={(e) => e.preventDefault()}
                    className="inline-flex items-center gap-1.5 text-xs text-[#0A84FF] font-bold uppercase tracking-wider group-hover:underline"
                  >
                    Read Article <span>→</span>
                  </a>
                </div>
              </div>
            ))}
          </div>

          {/* Newsletter Subscribe */}
          <div className="relative bg-white dark:bg-[#121212] border border-black/5 dark:border-white/10 rounded-2xl p-8 md:p-12 text-center max-w-4xl mx-auto overflow-hidden">
            <div className="absolute right-0 bottom-0 w-64 h-64 bg-radial-gradient from-[#0A84FF]/5 to-transparent pointer-none select-none" />
            <div className="space-y-4 relative z-10">
              <h2 className="text-2xl md:text-3xl font-extrabold">Join Our Weekly Growth Newsletter</h2>
              <p className="text-sm text-[#555] dark:text-[#888] max-w-lg mx-auto leading-relaxed">
                Get conversion strategies, web design guides, and automation frameworks delivered directly to your inbox. Zero spam.
              </p>

              <form onSubmit={handleSubscribeSubmit} className="flex flex-col sm:flex-row gap-2 max-w-md mx-auto pt-4">
                <input
                  type="email"
                  required
                  value={subscribeEmail}
                  onChange={(e) => setSubscribeEmail(e.target.value)}
                  placeholder="your@email.com"
                  className="w-full text-xs px-4 py-3 border border-black/5 dark:border-white/10 rounded-full bg-neutral-50 dark:bg-[#1e1e1e] text-neutral-805 dark:text-neutral-50 focus:outline-none focus:border-[#0A84FF] transition-colors"
                />
                <button
                  type="submit"
                  disabled={isSubscribed}
                  className={`px-8 py-3 rounded-full text-xs font-bold select-none cursor-pointer transition-colors ${
                    isSubscribed
                      ? 'bg-green-500 text-white'
                      : 'bg-[#0A84FF] hover:bg-sky-505 hover:bg-blue-600 text-white font-bold tracking-widest'
                  }`}
                  id="weekly-growth-subs-btn"
                >
                  {isSubscribed ? 'Subscribed ✓' : 'Subscribe'}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

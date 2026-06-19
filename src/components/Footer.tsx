import React, { useState } from 'react';
import { Mail, Linkedin, Instagram, Twitter } from 'lucide-react';

interface FooterProps {
  onNavigate: (view: string) => void;
}

export function Footer({ onNavigate }: FooterProps) {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim() && email.includes('@')) {
      setSubscribed(true);
      setEmail('');
      setTimeout(() => setSubscribed(false), 4000);
    }
  };

  const handleLinkClick = (view: string, e: React.MouseEvent) => {
    e.preventDefault();
    onNavigate(view);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="border-t border-black/5 dark:border-white/10 bg-white dark:bg-[#121212] pt-16 pb-8 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-12">
          {/* Brand */}
          <div className="lg:col-span-2 max-w-sm">
            <div className="flex items-center gap-3 mb-4">
              <svg className="w-8 h-8" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <linearGradient id="gold-footer" x1="18" y1="8" x2="100" y2="106" gradientUnits="userSpaceOnUse">
                    <stop offset="0%" stop-color="#FFE082" />
                    <stop offset="40%" stop-color="#F4B400" />
                    <stop offset="100%" stop-color="#B27A00" />
                  </linearGradient>
                </defs>
                <path
                  d="M 20 60 L 50 8 L 68 17.6 L 68 31.25 L 58 37 L 58 48.5 L 68 54.25 L 68 65.75 L 58 71.5 L 58 83 L 68 88.75 L 50 112 Z"
                  fill="url(#gold-footer)"
                />
                <polygon points="69.96,31.25 79.92,37 79.92,48.5 69.96,54.25 60,48.5 60,37" fill="url(#gold-footer)" />
                <polygon
                  points="79.92,14 89.88,19.75 89.88,31.25 79.92,37 69.96,31.25 69.96,19.75"
                  stroke="url(#gold-footer)"
                  strokeWidth="2.5"
                  fill="none"
                />
              </svg>
              <span className="text-xl font-bold tracking-tight">
                7Hive <span className="text-[#0A84FF]">MEDIA</span>
              </span>
            </div>
            <p className="text-sm text-[#555] dark:text-[#888] leading-relaxed mb-6">
              Building digital hives for business growth. We help businesses scale through intelligent websites, SEO, high-intent advertising, and process automations.
            </p>
            <div className="flex gap-3">
              <a
                href="https://www.linkedin.com/company/7hivemedia"
                target="_blank"
                rel="noopener text-slate"
                className="w-9 h-9 border border-black/5 dark:border-white/10 rounded-full flex items-center justify-center text-[#555] dark:text-[#888] hover:text-[#0A84FF] hover:border-[#0A84FF] transition-all"
                title="LinkedIn"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <a
                href="https://www.instagram.com/7hivemedia"
                target="_blank"
                rel="noopener"
                className="w-9 h-9 border border-black/5 dark:border-white/10 rounded-full flex items-center justify-center text-[#555] dark:text-[#888] hover:text-[#0A84FF] hover:border-[#0A84FF] transition-all"
                title="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="https://twitter.com/7hivemedia"
                target="_blank"
                rel="noopener"
                className="w-9 h-9 border border-black/5 dark:border-white/10 rounded-full flex items-center justify-center text-[#555] dark:text-[#888] hover:text-[#0A84FF] hover:border-[#0A84FF] transition-all"
                title="Twitter"
              >
                <Twitter className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Column 2: Company */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-black dark:text-white mb-4">Company</h4>
            <div className="flex flex-col gap-3 text-sm text-[#555] dark:text-[#888]">
              <a href="#home" onClick={(e) => handleLinkClick('home', e)} className="hover:text-[#0A84FF] transition-colors">
                Home
              </a>
              <a href="#process" onClick={(e) => handleLinkClick('process', e)} className="hover:text-[#0A84FF] transition-colors">
                Our Process
              </a>
              <a href="#work" onClick={(e) => handleLinkClick('work', e)} className="hover:text-[#0A84FF] transition-colors">
                Case Studies
              </a>
              <a href="#testimonials" onClick={(e) => handleLinkClick('testimonials', e)} className="hover:text-[#0A84FF] transition-colors">
                Reviews
              </a>
            </div>
          </div>

          {/* Column 3: Services */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-black dark:text-white mb-4">Services</h4>
            <div className="flex flex-col gap-3 text-sm text-[#555] dark:text-[#888]">
              <a href="#services" onClick={(e) => handleLinkClick('services', e)} className="hover:text-[#0A84FF] transition-colors">
                Web Development
              </a>
              <a href="#services" onClick={(e) => handleLinkClick('services', e)} className="hover:text-[#0A84FF] transition-colors">
                Rank SEO Optimization
              </a>
              <a href="#services" onClick={(e) => handleLinkClick('services', e)} className="hover:text-[#0A84FF] transition-colors">
                Google & Meta Ads
              </a>
              <a href="#services" onClick={(e) => handleLinkClick('services', e)} className="hover:text-[#0A84FF] transition-colors">
                WhatsApp Automation
              </a>
            </div>
          </div>

          {/* Column 4: Newsletter */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-black dark:text-white mb-4">Newsletter</h4>
            <p className="text-sm text-[#555] dark:text-[#888] mb-4 leading-relaxed">
              Real conversion strategies and automation blueprints, directly to your inbox.
            </p>
            <form onSubmit={handleSubscribeSubmit} className="flex gap-2">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                className="w-full text-xs px-3 py-2 border border-black/5 dark:border-white/10 rounded bg-neutral-50 dark:bg-[#1e1e1e] text-black dark:text-white focus:outline-none focus:border-[#0A84FF] transition-all"
              />
              <button
                type="submit"
                disabled={subscribed}
                className={`px-4 py-2 rounded text-xs font-semibold select-none transition-all ${
                  subscribed
                    ? 'bg-green-500 text-white'
                    : 'bg-[#0A84FF] hover:bg-[#0A84FF]/90 text-white dark:text-neutral-900 shadow-sm'
                }`}
                id="footer-subscription-btn"
              >
                {subscribed ? 'Joined ✓' : 'Join'}
              </button>
            </form>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-black/5 dark:border-white/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-[#555] dark:text-[#888] transition-colors">
          <p>© 2026 7Hive Media. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-black dark:hover:text-white transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-black dark:hover:text-white transition-colors">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

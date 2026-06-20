import React, { useState, useEffect } from 'react';
import { Menu, X, Plus } from 'lucide-react';
import { Logo } from './Logo';

interface HeaderProps {
  currentView: string;
  onNavigate: (view: string) => void;
}

export function Header({ currentView, onNavigate }: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLinkClick = (view: string, e: React.MouseEvent) => {
    e.preventDefault();
    onNavigate(view);
    setIsMobileMenuOpen(false);
  };

  const navItems = [
    { label: 'Services', view: 'services' },
    { label: 'Process', view: 'process' },
    { label: 'Work', view: 'work' },
    { label: 'Testimonials', view: 'testimonials' },
    { label: 'FAQ', view: 'faq' },
    { label: 'Blog', view: 'blog' },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/60 dark:bg-[#121212]/60 backdrop-blur-xl border-b border-white/80 dark:border-white/10 shadow-[0_12px_40px_-15px_rgba(0,0,0,0.08),inset_0_1px_1px_rgba(255,255,255,0.5)] py-3'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
        {/* Logo */}
        <a
          href="#home"
          onClick={(e) => handleLinkClick('home', e)}
          className="flex items-center gap-2 sm:gap-3 group"
          id="nav-brand-logo"
        >
          <Logo className="w-8 h-8 sm:w-10 sm:h-10 transition-transform duration-300 group-hover:scale-105" />
          <div className="flex flex-col">
            <span className="text-base sm:text-lg font-bold tracking-tight text-black dark:text-white leading-none flex items-center gap-0.5">
              7Hive <span className="text-[#0A84FF] font-semibold tracking-wider flex items-center gap-0.5">MEDIA<Plus className="w-3 h-3 sm:w-3.5 sm:h-3.5 stroke-[3] ml-0.5" /></span>
            </span>
            <span className="text-[9px] text-[#555] dark:text-[#888] font-medium tracking-wide mt-0.5 hidden sm:block">
              Building Digital Hives for Business Growth.
            </span>
          </div>
        </a>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <a
              key={item.view}
              href={`#${item.view}`}
              onClick={(e) => handleLinkClick(item.view, e)}
              className={`text-sm font-medium transition-colors relative py-1 ${
                currentView === item.view
                  ? 'text-[#0A84FF]'
                  : 'text-[#212121] dark:text-[#B0B0B0] hover:text-black dark:hover:text-white'
              }`}
            >
              {item.label}
              {currentView === item.view && (
                <span className="absolute bottom-0 left-0 w-full h-[2px] bg-[#0A84FF] rounded-full" />
              )}
            </a>
          ))}

          {/* Nav CTA */}
          <a
            href="#contact"
            onClick={(e) => handleLinkClick('contact', e)}
            className="inline-flex items-center justify-center text-xs font-semibold uppercase tracking-wider px-5 py-2.5 rounded-full bg-[#0A84FF] hover:bg-sky-500 text-white dark:text-[#121212] transition-all shadow-[0_4px_16px_rgba(10,132,255,0.2),inset_0_1px_1px_rgba(255,255,255,0.4)] hover:-translate-y-0.5 active:translate-y-0 active:scale-95 duration-200"
            id="nav-cta-action"
          >
            Get Started
          </a>
        </div>

        {/* Mobile controls */}
        <div className="flex md:hidden items-center gap-3">
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2 text-black dark:text-white"
            aria-label="Toggle menu"
            id="mobile-menu-hamburger"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile panel */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 top-[60px] bg-white/97 dark:bg-[#121212]/97 backdrop-blur-xl z-40 flex flex-col items-center justify-center gap-6 animate-fade-in md:hidden border-t border-black/5 dark:border-white/10">
          {navItems.map((item) => (
            <a
              key={item.view}
              href={`#${item.view}`}
              onClick={(e) => handleLinkClick(item.view, e)}
              className={`text-xl font-medium ${
                currentView === item.view ? 'text-[#0A84FF]' : 'text-neutral-600 dark:text-neutral-400'
              }`}
            >
              {item.label}
            </a>
          ))}
          <a
            href="#contact"
            onClick={(e) => handleLinkClick('contact', e)}
            className="mt-4 px-8 py-3 rounded-full bg-[#0A84FF] text-white dark:text-[#121212] font-semibold"
          >
            Get Started
          </a>
        </div>
      )}
    </nav>
  );
}

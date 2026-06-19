import React, { useState, useEffect } from 'react';
import { Menu, X, Sun, Moon } from 'lucide-react';

interface HeaderProps {
  currentView: string;
  onNavigate: (view: string) => void;
  theme: 'light' | 'dark';
  onToggleTheme: () => void;
}

export function Header({ currentView, onNavigate, theme, onToggleTheme }: HeaderProps) {
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
          ? 'bg-white/90 dark:bg-[#121212]/92 backdrop-blur-md border-b border-black/5 dark:border-white/10 shadow-sm py-3'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
        {/* Logo */}
        <a
          href="#home"
          onClick={(e) => handleLinkClick('home', e)}
          className="flex items-center gap-3 group"
          id="nav-brand-logo"
        >
          <svg
            className="w-8 h-8 transition-transform duration-300 group-hover:scale-105"
            viewBox="0 0 120 120"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <linearGradient id="gold-nav" x1="18" y1="8" x2="100" y2="106" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stop-color="#FFE082" />
                <stop offset="40%" stop-color="#F4B400" />
                <stop offset="100%" stop-color="#B27A00" />
              </linearGradient>
            </defs>
            <path
              d="M 20 60 L 50 8 L 68 17.6 L 68 31.25 L 58 37 L 58 48.5 L 68 54.25 L 68 65.75 L 58 71.5 L 58 83 L 68 88.75 L 50 112 Z"
              fill="url(#gold-nav)"
            />
            <polygon points="69.96,31.25 79.92,37 79.92,48.5 69.96,54.25 60,48.5 60,37" fill="url(#gold-nav)" />
            <polygon
              points="79.92,14 89.88,19.75 89.88,31.25 79.92,37 69.96,31.25 69.96,19.75"
              stroke="url(#gold-nav)"
              strokeWidth="2.5"
              fill="none"
            />
            <polygon
              points="89.88,31.25 99.84,37 99.84,48.5 89.88,54.25 79.92,48.5 79.92,37"
              stroke="url(#gold-nav)"
              strokeWidth="2.5"
              fill="none"
            />
            <polygon
              points="79.92,48.5 89.88,54.25 89.88,65.75 79.92,71.5 69.96,65.75 69.96,54.25"
              stroke="url(#gold-nav)"
              strokeWidth="2.5"
              fill="none"
            />
            <polygon
              points="89.88,65.75 99.84,71.5 99.84,83 89.88,88.75 79.92,83 79.92,71.5"
              stroke="url(#gold-nav)"
              strokeWidth="2.5"
              fill="none"
            />
            <polygon
              points="79.92,83 89.88,88.75 89.88,100.25 79.92,106 69.96,100.25 69.96,88.75"
              stroke="url(#gold-nav)"
              strokeWidth="2.5"
              fill="none"
            />
            <polygon points="69.96,65.75 79.92,71.5 79.92,83 69.96,88.75 60,83 60,71.5" fill="url(#gold-nav)" />
            <polygon
              points="99.84,48.5 109.8,54.25 109.8,65.75 99.84,71.5 89.88,65.75 89.88,54.4"
              stroke="url(#gold-nav)"
              strokeWidth="2.5"
              fill="none"
            />
          </svg>
          <div className="flex flex-col">
            <span className="text-lg font-bold tracking-tight text-black dark:text-white leading-none">
              7Hive <span className="text-[#0A84FF] font-semibold tracking-wider">MEDIA</span>
            </span>
            <span className="text-[9px] text-[#555] dark:text-[#888] font-medium tracking-wide mt-0.5">
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

          {/* Theme custom Toggle toggle */}
          <button
            onClick={onToggleTheme}
            className="p-2 border border-black/5 dark:border-white/10 rounded-full hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
            title="Toggle theme"
            id="theme-switcher-btn"
          >
            {theme === 'dark' ? (
              <Sun className="w-4 h-4 text-amber-400" />
            ) : (
              <Moon className="w-4 h-4 text-neutral-600" />
            )}
          </button>

          {/* Nav CTA */}
          <a
            href="#contact"
            onClick={(e) => handleLinkClick('contact', e)}
            className="inline-flex items-center justify-center text-xs font-semibold uppercase tracking-wider px-5 py-2.5 rounded-full bg-[#0A84FF] hover:bg-sky-500 text-white dark:text-neutral-900 transition-all shadow-sm hover:shadow"
            id="nav-cta-action"
          >
            Get Started
          </a>
        </div>

        {/* Mobile controls */}
        <div className="flex md:hidden items-center gap-3">
          <button
            onClick={onToggleTheme}
            className="p-2 border border-black/5 dark:border-white/10 rounded-full hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
            id="mobile-theme-switcher"
          >
            {theme === 'dark' ? (
              <Sun className="w-4 h-4 text-amber-400" />
            ) : (
              <Moon className="w-4 h-4 text-neutral-600" />
            )}
          </button>

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

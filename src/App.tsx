import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { HomeView } from './components/HomeView';
import { ServicesView } from './components/ServicesView';
import { ProcessView } from './components/ProcessView';
import { WorkView } from './components/WorkView';
import { TestimonialsView } from './components/TestimonialsView';
import { FaqView } from './components/FaqView';
import { BlogView } from './components/BlogView';
import { ContactView } from './components/ContactView';
import { PhoneCall } from 'lucide-react';

export default function App() {
  // Theme state
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    const saved = localStorage.getItem('theme');
    if (saved === 'dark' || saved === 'light') return saved;
    // Default to light as specified in the guidelines: "Default to a clean, high-contrast light theme (soft off-whites and deep charcoal grays) with elegant typography."
    return 'light';
  });

  // Current subview state tracking hash
  const [currentView, setCurrentView] = useState<string>(() => {
    const hash = window.location.hash;
    const clean = hash.replace('#', '').split('?')[0];
    return clean || 'home';
  });

  // Floating CTA visibility status
  const [showFloatingCta, setShowFloatingCta] = useState(false);

  // Custom coordinate mouse tracker
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [trailPos, setTrailPos] = useState({ x: 0, y: 0 });
  const [cursorHover, setCursorHover] = useState(false);
  const [isFinePointer, setIsFinePointer] = useState(false);

  // Sync route hash changes
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash;
      const clean = hash.replace('#', '').split('?')[0];
      setCurrentView(clean || 'home');
      window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  // Update floating CTA visibility on scroll
  useEffect(() => {
    const handleScroll = () => {
      setShowFloatingCta(window.scrollY > window.innerHeight * 0.8);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Update body tag elements for theme
  useEffect(() => {
    if (theme === 'dark') {
      document.body.classList.add('dark-theme');
    } else {
      document.body.classList.remove('dark-theme');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  // Client coordinate tracker
  useEffect(() => {
    const checkFinePointer = () => {
      setIsFinePointer(window.matchMedia('(pointer: fine)').matches);
    };
    checkFinePointer();

    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };

    const handleMouseEnterInteractive = () => setCursorHover(true);
    const handleMouseLeaveInteractive = () => setCursorHover(false);

    window.addEventListener('mousemove', handleMouseMove);

    // Apply interactive hooks
    const applyHoverLocks = () => {
      const links = document.querySelectorAll('a, button, [role="button"]');
      links.forEach((l) => {
        l.addEventListener('mouseenter', handleMouseEnterInteractive);
        l.addEventListener('mouseleave', handleMouseLeaveInteractive);
      });
    };

    // Delay a bit to ensure DOM elements render
    const timer = setTimeout(applyHoverLocks, 500);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      clearTimeout(timer);
    };
  }, [currentView]);

  // Trail smooth physics tick
  useEffect(() => {
    if (!isFinePointer) return;
    let frameId: number;
    const updateTrail = () => {
      setTrailPos((prev) => {
        const dx = mousePos.x - prev.x;
        const dy = mousePos.y - prev.y;
        return {
          x: prev.x + dx * 0.15,
          y: prev.y + dy * 0.15,
        };
      });
      frameId = requestAnimationFrame(updateTrail);
    };
    frameId = requestAnimationFrame(updateTrail);
    return () => cancelAnimationFrame(frameId);
  }, [mousePos, isFinePointer]);

  const handleToggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  const handleNavigate = (view: string) => {
    window.location.hash = view;
    setCurrentView(view);
  };

  const handleFloatingCtaClick = (e: React.MouseEvent) => {
    e.preventDefault();
    handleNavigate('contact');
  };

  const renderActiveView = () => {
    switch (currentView) {
      case 'services':
        return <ServicesView onNavigate={handleNavigate} />;
      case 'process':
        return <ProcessView onNavigate={handleNavigate} />;
      case 'work':
        return <WorkView onNavigate={handleNavigate} />;
      case 'testimonials':
        return <TestimonialsView onNavigate={handleNavigate} />;
      case 'faq':
        return <FaqView onNavigate={handleNavigate} />;
      case 'blog':
        return <BlogView onNavigate={handleNavigate} />;
      case 'contact':
        return <ContactView onNavigate={handleNavigate} />;
      case 'home':
      default:
        return <HomeView onNavigate={handleNavigate} />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col font-sans bg-[#F5F5F5] dark:bg-[#121212] text-black dark:text-[#E0E0E0] transition-colors duration-300 relative selection:bg-[#0A84FF] selection:text-white">
      {/* Dynamic Trail Mouse Cursor for Desktop screens */}
      {isFinePointer && (
        <div
          className={`fixed pointer-events-none z-[100] transform -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#0A84FF] mix-blend-difference transition-all duration-150 ${
            cursorHover ? 'w-10 h-10 bg-[#0A84FF]/10' : 'w-5 h-5 bg-transparent'
          }`}
          style={{
            left: `${trailPos.x}px`,
            top: `${trailPos.y}px`,
          }}
          aria-hidden="true"
        />
      )}

      {/* Persistent Page Header Navbar */}
      <Header
        currentView={currentView}
        onNavigate={handleNavigate}
        theme={theme}
        onToggleTheme={handleToggleTheme}
      />

      {/* Active screen content layout */}
      <main className="flex-grow">
        {renderActiveView()}
      </main>

      {/* Floating CTA Click-to-Action button */}
      <div
        className={`fixed bottom-8 right-8 z-[90] transition-all duration-300 ${
          showFloatingCta ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'
        }`}
        id="persistent-floating-call-cta"
      >
        <a
          href="#contact"
          onClick={handleFloatingCtaClick}
          className="inline-flex items-center gap-2 px-5 py-3.5 bg-[#0A84FF] hover:bg-sky-505 hover:bg-blue-600 text-white rounded-full font-bold text-xs uppercase tracking-wider transition-all shadow-md hover:shadow-lg active:scale-95 select-none"
        >
          <PhoneCall className="w-4 h-4 animate-bounce" />
          Book A Call
        </a>
      </div>

      {/* Consolidated footer element */}
      <Footer onNavigate={handleNavigate} />
    </div>
  );
}

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
import { PrivacyPolicyView } from './components/PrivacyPolicyView';
import { TermsView } from './components/TermsView';
import { LoginView } from './components/LoginView';
import { AdminPanel } from './components/AdminPanel';
import { PhoneCall } from 'lucide-react';
import { dynamicStore } from './lib/dynamicStore';

export default function App() {
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

  // Ensure any dark-theme class on body is cleaned up
  useEffect(() => {
    document.body.classList.remove('dark-theme');
  }, []);

  // Sync dynamic page-specific SEO metadata variables live
  useEffect(() => {
    dynamicStore.getSEOConfig().then((configs) => {
      const config = configs.find((c) => c.page_id === currentView) || configs.find((c) => c.page_id === 'home');
      if (config) {
        document.title = config.title;
        
        let metaDescription = document.querySelector('meta[name="description"]');
        if (!metaDescription) {
          metaDescription = document.createElement('meta');
          metaDescription.setAttribute('name', 'description');
          document.head.appendChild(metaDescription);
        }
        metaDescription.setAttribute('content', config.description);

        let metaKeywords = document.querySelector('meta[name="keywords"]');
        if (!metaKeywords) {
          metaKeywords = document.createElement('meta');
          metaKeywords.setAttribute('name', 'keywords');
          document.head.appendChild(metaKeywords);
        }
        metaKeywords.setAttribute('content', config.keywords);
      }
    });
  }, [currentView]);

  // Client coordinate tracker with robust event delegation for interactive elements
  useEffect(() => {
    const checkFinePointer = () => {
      setIsFinePointer(window.matchMedia('(pointer: fine)').matches);
    };
    checkFinePointer();

    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (target && target.closest?.('a, button, [role="button"], input, select, textarea, [data-interactive="true"]')) {
        setCursorHover(true);
      }
    };

    const handleMouseOut = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (target && target.closest?.('a, button, [role="button"], input, select, textarea, [data-interactive="true"]')) {
        setCursorHover(false);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseover', handleMouseOver);
    window.addEventListener('mouseout', handleMouseOut);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseover', handleMouseOver);
      window.removeEventListener('mouseout', handleMouseOut);
    };
  }, []);

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
      case 'privacy-policy':
        return <PrivacyPolicyView onNavigate={handleNavigate} />;
      case 'terms-conditions':
        return <TermsView onNavigate={handleNavigate} />;
      case 'login':
        return <LoginView onNavigate={handleNavigate} />;
      case 'admin':
        return <AdminPanel onNavigate={handleNavigate} />;
      case 'home':
      default:
        return <HomeView onNavigate={handleNavigate} />;
    }
  };

  const isPlainLayout = currentView === 'login' || currentView === 'admin';

  return (
    <div className="min-h-screen flex flex-col font-sans bg-transparent text-stone-900 transition-colors duration-300 relative selection:bg-amber-600 selection:text-white overflow-x-hidden">
      {/* Persistent Page Header Navbar */}
      {!isPlainLayout && (
        <Header
          currentView={currentView}
          onNavigate={handleNavigate}
        />
      )}

      {/* Active screen content layout */}
      <main className="flex-grow">
        {renderActiveView()}
      </main>

      {/* Floating CTA Click-to-Action button */}
      {!isPlainLayout && (
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
      )}

      {/* Consolidated footer element */}
      {!isPlainLayout && <Footer onNavigate={handleNavigate} />}
    </div>
  );
}

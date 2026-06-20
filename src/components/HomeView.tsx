import React, { useState, useEffect } from 'react';
import { ArrowRight, Check, Zap, X, ShieldAlert, Award, MessageSquare, ChevronRight, ChevronLeft, TrendingUp, Code, BrainCircuit, Clapperboard, Building2, Search, Cpu, ShoppingBag } from 'lucide-react';
import { motion } from 'motion/react';
import { SERVICES, CASE_STUDIES, TESTIMONIALS, FAQS } from '../data';
import { PremiumIcon } from './PremiumIcon';

interface HomeViewProps {
  onNavigate: (view: string) => void;
}

export function HomeView({ onNavigate }: HomeViewProps) {
  // Star Counters
  const [leadCounter, setLeadCounter] = useState(0);
  const [siteCounter, setSiteCounter] = useState(0);
  const [revCounter, setRevCounter] = useState(0);

  // Testimonial position state
  const [activeTestimonialIdx, setActiveTestimonialIdx] = useState(0);

  // FAQ accordion status
  const [activeFaqId, setActiveFaqId] = useState<string | null>(null);

  // 3D Parallax state
  const [rotate, setRotate] = useState({ x: 0, y: 0 });
  const [glare, setGlare] = useState({ x: 50, y: 50 });
  const [isHovered, setIsHovered] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const handleMouseMoveHero = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    
    // Normalize coordinates from -0.5 to 0.5
    const normX = (mouseX / width) - 0.5;
    const normY = (mouseY / height) - 0.5;
    
    const maxRotX = 22; // max tilt degrees on X-axis (pitch)
    const maxRotY = 22; // max tilt degrees on Y-axis (yaw)
    
    setRotate({
      x: -normY * maxRotX,
      y: normX * maxRotY
    });
    
    setGlare({
      x: (mouseX / width) * 100,
      y: (mouseY / height) * 100
    });
  };

  // Ticking counters effect on view active
  useEffect(() => {
    let tick = 0;
    const interval = setInterval(() => {
      tick += 1;
      if (tick <= 100) {
        setLeadCounter(Math.round(15000 * (tick / 100)));
        setSiteCounter(Math.round(120 * (tick / 100)));
        setRevCounter(Math.round(50 * (tick / 100)));
      } else {
        clearInterval(interval);
      }
    }, 15);
    return () => clearInterval(interval);
  }, []);

  const handleFaqToggle = (id: string) => {
    setActiveFaqId(activeFaqId === id ? null : id);
  };

  const handleTestimonialScroll = (dir: 'next' | 'prev') => {
    if (dir === 'next') {
      setActiveTestimonialIdx((prev) => (prev + 1) % TESTIMONIALS.length);
    } else {
      setActiveTestimonialIdx((prev) => (prev === 0 ? TESTIMONIALS.length - 1 : prev - 1));
    }
  };

  const handleCtaClick = (view: string, e: React.MouseEvent) => {
    e.preventDefault();
    onNavigate(view);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="pt-20">
      {/* 1. Hero Block */}
      <section className="relative min-h-[92vh] flex items-center justify-center overflow-hidden py-16 px-6 md:px-12 bg-white dark:bg-[#121212] transition-colors duration-300">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-sky-100/10 via-neutral-100/10 to-transparent dark:from-[#0A84FF]/5 dark:via-transparent dark:to-transparent" />
        
        {/* Full-width elegant sweeping golden wave & decorative assets */}
        <div className="absolute inset-0 pointer-events-none select-none z-0 overflow-hidden hidden lg:block">
          <svg className="w-full h-full" viewBox="0 0 1440 600" fill="none" preserveAspectRatio="none">
            <defs>
              <pattern id="base-dot-grid" x="0" y="0" width="16" height="16" patternUnits="userSpaceOnUse">
                <circle cx="2" cy="2" r="1" fill="#cbd5e1" className="opacity-45 dark:opacity-25" />
              </pattern>
            </defs>

            {/* Background grids matching exact patterns */}
            <rect x="520" y="140" width="80" height="120" fill="url(#base-dot-grid)" className="opacity-40" />
            <rect x="1220" y="160" width="60" height="140" fill="url(#base-dot-grid)" className="opacity-45" />

            {/* Precise Blue Outline Circles */}
            <circle cx="950" cy="110" r="14" stroke="#0a84ff" strokeWidth="1.5" className="opacity-45" />
            <circle cx="560" cy="285" r="7" stroke="#0a84ff" strokeWidth="1.5" className="opacity-35" />

            {/* Dynamic Delta shape */}
            <polygon points="510,310 518,324 502,324" stroke="#0a84ff" strokeWidth="1.5" fill="none" className="opacity-45" />

            {/* Soft gold focus pebble */}
            <circle cx="1280" cy="264" r="6" fill="#f59e0b" className="opacity-75" />
          </svg>
        </div>

        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10 w-full">
          <div className="text-center lg:text-left space-y-5 sm:space-y-6 flex flex-col items-center lg:items-start max-w-2xl mx-auto lg:max-w-none">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#0A84FF]/10 border border-[#0A84FF]/20 rounded-full text-xs font-semibold text-[#0A84FF]">
              <span className="w-2 h-2 rounded-full bg-[#0A84FF] animate-pulse" />
              Digital Growth Agency
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-7xl font-extrabold tracking-tight text-neutral-900 dark:text-neutral-50 leading-[1.12] sm:leading-tight">
              Turn Attention <br className="hidden sm:inline" />
              Into <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0A84FF] to-blue-500 underline decoration-[#FFD700] decoration-wavy decoration-3 underline-offset-8">Revenue.</span>
            </h1>
            <p className="text-base sm:text-lg text-neutral-600 dark:text-neutral-400 max-w-xl mx-auto lg:mx-0 font-medium">
              We build and manage conversion-optimized ecosystems that turn clicks into customers. Web, campaigns, CRM, and automation—working together to drive measurable growth.
            </p>
            
            {/* Benefit Bullets (Pills wrap naturally for maximum readability and visual balance) */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 pt-2 w-full max-w-md sm:max-w-none">
              <div className="flex items-center gap-2 bg-neutral-100/60 dark:bg-neutral-900/60 border border-neutral-200/50 dark:border-neutral-800/40 py-1.5 px-3.5 rounded-full shadow-sm">
                <div id="benefit-check-1" className="w-4 h-4 rounded-full bg-[#0A84FF] flex items-center justify-center text-white shrink-0">
                  <Check className="w-2.5 h-2.5 stroke-[3.5]" />
                </div>
                <span className="text-xs font-bold text-neutral-800 dark:text-neutral-200">Data-Driven Strategies</span>
              </div>
              <div className="flex items-center gap-2 bg-neutral-100/60 dark:bg-neutral-900/60 border border-neutral-200/50 dark:border-neutral-800/40 py-1.5 px-3.5 rounded-full shadow-sm">
                <div id="benefit-check-2" className="w-4 h-4 rounded-full bg-[#0A84FF] flex items-center justify-center text-white shrink-0">
                  <Check className="w-2.5 h-2.5 stroke-[3.5]" />
                </div>
                <span className="text-xs font-bold text-neutral-800 dark:text-neutral-200">Full-Funnel Integration</span>
              </div>
              <div className="flex items-center gap-2 bg-neutral-100/60 dark:bg-neutral-900/60 border border-neutral-200/50 dark:border-neutral-800/40 py-1.5 px-3.5 rounded-full shadow-sm">
                <div id="benefit-check-3" className="w-4 h-4 rounded-full bg-[#0A84FF] flex items-center justify-center text-white shrink-0">
                  <Check className="w-2.5 h-2.5 stroke-[3.5]" />
                </div>
                <span className="text-xs font-bold text-neutral-800 dark:text-neutral-200">Measurable Results</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-3 w-full">
              <a
                href="#contact"
                onClick={(e) => handleCtaClick('contact', e)}
                className="inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-[#0A84FF] text-white font-black rounded-full select-none hover:bg-blue-600 hover:-translate-y-0.5 active:translate-y-0 transition-all shadow-md active:scale-95 text-sm w-full sm:w-auto"
              >
                Book Free Strategy Call <ArrowRight className="w-4 h-4 stroke-[3]" />
              </a>
              <a
                href="#services"
                onClick={(e) => handleCtaClick('services', e)}
                className="inline-flex items-center justify-center px-8 py-3.5 bg-white dark:bg-stone-900 border border-neutral-200 dark:border-stone-800 text-stone-800 dark:text-stone-200 font-bold rounded-full select-none hover:bg-neutral-50 dark:hover:bg-neutral-800 hover:-translate-y-0.5 active:translate-y-0 transition-all text-sm shadow-sm w-full sm:w-auto"
              >
                Explore Services
              </a>
            </div>

            {/* Trusted by Brands */}
            <div className="pt-8 space-y-3 w-full text-center lg:text-left">
              <p className="text-xs text-stone-400 font-extrabold tracking-wider uppercase font-mono">Trusted by growth-focused brands</p>
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-x-8 gap-y-4 text-stone-400 opacity-60">
                <div className="flex items-center gap-1.5 font-bold tracking-tight text-xs select-none">
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M12 2L2 22h20L12 2zm0 4l6.5 13H5.5L12 6z"/>
                  </svg>
                  <span>logoipsum</span>
                </div>
                <div className="flex items-center gap-1.5 font-bold tracking-tight text-xs select-none">
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <rect x="3" y="3" width="18" height="18" rx="2" />
                    <rect x="7" y="7" width="10" height="10" rx="1" fill="#fff" />
                  </svg>
                  <span>logoipsum</span>
                </div>
                <div className="flex items-center gap-1.5 font-bold tracking-tight text-xs select-none">
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <circle cx="12" cy="12" r="8" />
                    <circle cx="12" cy="12" r="4" fill="#fff" />
                  </svg>
                  <span>logoipsum</span>
                </div>
                <div className="flex items-center gap-1.5 font-bold tracking-tight text-xs select-none">
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <polygon points="12,2 22,12 12,22 2,12" />
                  </svg>
                  <span>logoipsum</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right composition of pristine dashboard components from the image - enabled beautifully on mobile with responsive scale */}
          <div 
            className="flex items-center justify-center min-h-[360px] xs:min-h-[420px] sm:min-h-[480px] lg:min-h-[540px] relative select-none mt-6 lg:mt-0 w-full overflow-hidden"
            id="hero-dashboard-scene-container"
          >
            {/* Ambient Multi-Colored Background Glows matching the reference image */}
            <div className="absolute top-[-50px] right-[60px] w-[300px] sm:w-[360px] h-[300px] sm:h-[360px] rounded-full bg-blue-400/25 dark:bg-[#0A84FF]/10 blur-[80px] sm:blur-[100px] pointer-events-none z-0 mix-blend-multiply dark:mix-blend-normal animate-pulse duration-[8000ms]" />
            <div className="absolute bottom-[-60px] right-[-40px] w-[280px] sm:w-[340px] h-[280px] sm:h-[340px] rounded-full bg-amber-300/25 dark:bg-amber-500/10 blur-[80px] sm:blur-[100px] pointer-events-none z-0 mix-blend-multiply dark:mix-blend-normal animate-pulse duration-[10000ms]" />
            <div className="absolute top-[40px] left-[-40px] w-[260px] sm:w-[320px] h-[260px] sm:h-[320px] rounded-full bg-amber-200/20 dark:bg-amber-400/5 blur-[70px] sm:blur-[90px] pointer-events-none z-0 mix-blend-multiply dark:mix-blend-normal" />
            <div className="absolute bottom-[10px] left-[-50px] w-[240px] sm:w-[280px] h-[240px] sm:h-[280px] rounded-full bg-sky-200/20 dark:bg-[#0A84FF]/5 blur-[65px] sm:blur-[85px] pointer-events-none z-0 mix-blend-multiply dark:mix-blend-normal" />

            {/* Composition Grid wrapper with auto-scale matching mobile and desktop screen sizes */}
            <div className="relative w-[500px] h-[380px] z-10 scale-[0.6] xs:scale-[0.72] sm:scale-85 md:scale-100 lg:scale-100 origin-center shrink-0">
              
              {/* 1. CENTRAL MAIN DASHBOARD (REVENUE OVER TIME) */}
              <div 
                id="dashboard-center-card" 
                className="absolute top-12 left-12 w-[370px] bg-white/70 dark:bg-stone-900/60 backdrop-blur-xl rounded-3xl border border-white/70 dark:border-white/10 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.12),inset_0_1px_1px_rgba(255,255,255,0.5)] p-6 transition-all duration-500 hover:scale-[1.01] hover:shadow-[0_30px_70px_-12px_rgba(0,0,0,0.16)] ease-out"
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[9px] font-black tracking-widest text-stone-400 dark:text-stone-500 uppercase font-mono">
                    REVENUE OVER TIME
                  </span>
                  {/* Styled Mimic Dropdown */}
                  <div className="flex items-center gap-1.5 px-2 py-1 bg-white/60 dark:bg-stone-800/60 backdrop-blur-md border border-white/40 dark:border-stone-700/60 rounded-lg text-[9px] text-stone-500 dark:text-stone-400 font-bold shadow-sm">
                    <span>This Month</span>
                    <span className="text-[7px]">▼</span>
                  </div>
                </div>

                <div className="mb-2">
                  <span className="text-[10px] text-stone-400 font-bold uppercase tracking-wider font-mono">Total Revenue</span>
                  <div className="flex items-baseline gap-2 mt-0.5">
                    <span className="text-3xl font-black text-stone-900 dark:text-white tracking-tight">₹1,28,450</span>
                    <div className="flex items-center gap-0.5 text-emerald-500 text-[10px] font-bold">
                      <span>↑ 8%</span>
                    </div>
                  </div>
                  <span className="text-[9px] text-stone-400 font-medium tracking-wide">vs last month</span>
                </div>

                {/* SVG Visual line graph */}
                <div className="h-[120px] w-full mt-4 flex items-end relative">
                  <svg className="w-full h-full text-amber-500" viewBox="0 0 320 120" fill="none">
                    <defs>
                      <linearGradient id="area-gradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#f59e0b" stopOpacity="0.25" />
                        <stop offset="100%" stopColor="#f59e0b" stopOpacity="0.0" />
                      </linearGradient>
                    </defs>
                    
                    {/* Horizontal grids */}
                    <line x1="0" y1="90" x2="320" y2="90" stroke="currentColor" className="text-stone-100 dark:text-stone-800" strokeWidth="1" strokeDasharray="3 3" />
                    <line x1="0" y1="60" x2="320" y2="60" stroke="currentColor" className="text-stone-100 dark:text-stone-800" strokeWidth="1" strokeDasharray="3 3" />
                    <line x1="0" y1="30" x2="320" y2="30" stroke="currentColor" className="text-stone-100 dark:text-stone-800" strokeWidth="1" strokeDasharray="3 3" />

                    {/* Gradient Area under curve */}
                    <path
                      d="M 20,95 Q 60,65 100,75 T 180,45 T 260,60 T 300,15 L 300,115 L 20,115 Z"
                      fill="url(#area-gradient)"
                    />
                    
                    {/* Bold Gold Curve */}
                    <path
                      d="M 20,95 Q 60,65 100,75 T 180,45 T 260,60 T 300,15"
                      fill="none"
                      stroke="#f59e0b"
                      strokeWidth="3"
                      strokeLinecap="round"
                    />
                    
                    {/* Node dots on key milestones */}
                    <circle cx="20" cy="95" r="4.5" fill="#ffffff" stroke="#f59e0b" strokeWidth="2" />
                    <circle cx="100" cy="75" r="4.5" fill="#ffffff" stroke="#f59e0b" strokeWidth="2" />
                    <circle cx="180" cy="45" r="4.5" fill="#ffffff" stroke="#f59e0b" strokeWidth="2" />
                    <circle cx="260" cy="60" r="4.5" fill="#ffffff" stroke="#f59e0b" strokeWidth="2" />
                    <circle cx="300" cy="15" r="5" fill="#f59e0b" stroke="#ffffff" strokeWidth="2" className="animate-pulse" />
                  </svg>
                </div>

                <div className="flex justify-between text-[9px] font-bold text-stone-400 dark:text-stone-500 tracking-wider uppercase mt-3">
                  <span>May 1</span>
                  <span>May 8</span>
                  <span>May 15</span>
                  <span>May 22</span>
                  <span>May 29</span>
                </div>
              </div>

              {/* 2. OVERLAPPING CARD: WHATSAPP & CRM (Top Left) */}
              <div 
                id="floating-card-whatsapp" 
                className="group absolute -top-6 -left-10 w-[195px] bg-white/60 dark:bg-stone-900/50 backdrop-blur-xl rounded-2xl border border-white/80 dark:border-white/10 shadow-[0_15px_35px_-8px_rgba(0,0,0,0.08),inset_0_1px_1px_rgba(255,255,255,0.6)] p-4 hover:-translate-y-2 hover:scale-[1.03] transition-all duration-500 z-20 cursor-pointer overflow-hidden after:absolute after:inset-0 after:translate-x-[-150%] hover:after:translate-x-[150%] after:transition-transform after:duration-1000 after:bg-gradient-to-r after:from-transparent after:via-white/30 dark:after:via-white/10 after:to-transparent"
                onClick={(e) => handleCtaClick('services', e)}
              >
                <div className="flex items-center justify-between mb-2.5">
                  <div className="w-7 h-7 rounded-full bg-emerald-100/80 dark:bg-emerald-950/40 backdrop-blur-md flex items-center justify-center text-emerald-500 text-xs shadow-sm">
                    <Zap className="w-3.5 h-3.5 fill-emerald-500" />
                  </div>
                  <span className="text-[8px] text-stone-400 font-bold uppercase tracking-wider font-mono">AUTOMATED</span>
                </div>
                <h4 className="text-xs font-black text-stone-900 dark:text-white font-sans">WhatsApp & CRM</h4>
                <p className="text-[9px] text-stone-400 mt-1 leading-snug">Instant triggers connect your leads directory instantly</p>
                <div className="h-1 bg-stone-100/80 dark:bg-stone-800 rounded-full overflow-hidden mt-3">
                  <div className="bg-emerald-500 h-full w-[80%]" />
                </div>
              </div>

              {/* 3. OVERLAPPING CARD: CAMPAIGN FUNNEL (Top Right) */}
              <div 
                id="floating-card-campaigns" 
                className="group absolute -top-10 -right-8 w-[200px] bg-white/60 dark:bg-stone-900/50 backdrop-blur-xl rounded-2xl border border-white/80 dark:border-white/10 shadow-[0_15px_35px_-8px_rgba(0,0,0,0.08),inset_0_1px_1px_rgba(255,255,255,0.6)] p-4 hover:-translate-y-2 hover:scale-[1.03] transition-all duration-500 z-20 cursor-pointer overflow-hidden after:absolute after:inset-0 after:translate-x-[-150%] hover:after:translate-x-[150%] after:transition-transform after:duration-1000 after:bg-gradient-to-r after:from-transparent after:via-white/30 dark:after:via-white/10 after:to-transparent"
                onClick={(e) => handleCtaClick('services', e)}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="w-7 h-7 rounded-lg bg-orange-100/80 dark:bg-orange-950/45 backdrop-blur-md flex items-center justify-center text-orange-500 shadow-sm">
                    <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <path d="M23 6l-9.5 9.5-5-5L1 18" />
                      <path d="M17 6h6v6" />
                    </svg>
                  </div>
                  <span className="text-[8px] bg-blue-50/80 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 px-2 py-0.5 rounded-full font-black shadow-xs">
                    9.2x ROAS
                  </span>
                </div>
                <h4 className="text-xs font-black text-stone-900 dark:text-white">Campaign Funnel</h4>
                <p className="text-[9px] text-stone-400 mt-1 leading-snug">Google & Meta smart bidding integration</p>
              </div>

              {/* 4. OVERLAPPING CARD: LEADS HUB MONITOR (Bottom Left) */}
              <div 
                id="floating-card-leads" 
                className="group absolute -bottom-10 -left-6 w-[200px] bg-white/60 dark:bg-stone-900/50 backdrop-blur-xl rounded-2xl border border-white/80 dark:border-white/10 shadow-[0_15px_35px_-8px_rgba(0,0,0,0.08),inset_0_1px_1px_rgba(255,255,255,0.6)] p-4 hover:-translate-y-2 hover:scale-[1.03] transition-all duration-500 z-20 cursor-pointer overflow-hidden after:absolute after:inset-0 after:translate-x-[-150%] hover:after:translate-x-[150%] after:transition-transform after:duration-1000 after:bg-gradient-to-r after:from-transparent after:via-white/30 dark:after:via-white/10 after:to-transparent"
                onClick={(e) => handleCtaClick('services', e)}
              >
                <div className="flex items-center justify-between mb-2.5">
                  <div className="w-7 h-7 rounded-full bg-red-100/80 dark:bg-red-950/40 backdrop-blur-md flex items-center justify-center text-red-500 text-xs shadow-sm">
                    🎯
                  </div>
                  <span className="text-[8px] font-black text-[#0A84FF] bg-blue-50/50 dark:bg-blue-950/30 px-1.5 py-0.5 rounded uppercase tracking-wider font-mono">
                    ACTIVE SCAN
                  </span>
                </div>
                <h4 className="text-xs font-black text-stone-900 dark:text-white">Leads Hub Monitor</h4>
                <p className="text-[9px] text-stone-400 mt-1 leading-snug">Real-time mapping & audit ecosystem integration</p>
              </div>

              {/* 5. OVERLAPPING CARD: SEO DOMAIN AUTHORITY (Bottom Right) */}
              <div 
                id="floating-card-seo" 
                className="group absolute -bottom-4 -right-12 w-[195px] bg-white/60 dark:bg-stone-900/50 backdrop-blur-xl rounded-2xl border border-white/80 dark:border-white/10 shadow-[0_15px_35px_-8px_rgba(0,0,0,0.08),inset_0_1px_1px_rgba(255,255,255,0.6)] p-4 hover:-translate-y-2 hover:scale-[1.03] transition-all duration-500 z-20 cursor-pointer overflow-hidden after:absolute after:inset-0 after:translate-x-[-150%] hover:after:translate-x-[150%] after:transition-transform after:duration-1000 after:bg-gradient-to-r after:from-transparent after:via-white/30 dark:after:via-white/10 after:to-transparent"
                onClick={(e) => handleCtaClick('services', e)}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="w-7 h-7 rounded-lg bg-yellow-500/10 dark:bg-yellow-500/15 backdrop-blur-md flex items-center justify-center text-yellow-600 dark:text-yellow-400 text-xs shadow-sm">
                    <Search className="w-3.5 h-3.5 stroke-[2.2]" />
                  </div>
                  <span className="text-[8px] text-stone-400 font-extrabold tracking-wider uppercase font-mono">ORGANIC</span>
                </div>
                <h4 className="text-xs font-black text-stone-900 dark:text-white">SEO Domain Authority</h4>
                <div className="mt-2.5 pt-2 border-t border-stone-100 dark:border-stone-800/85 space-y-1 font-mono">
                  <div className="flex justify-between items-center text-[9px]">
                    <span className="text-stone-400 font-medium">Rank Authority</span>
                    <span className="font-bold text-emerald-500">99/100</span>
                  </div>
                  <div className="flex justify-between items-center text-[9px]">
                    <span className="text-stone-400 font-medium">Organic Traffic</span>
                    <span className="font-bold text-emerald-500">+184%</span>
                  </div>
                </div>
              </div>

            </div>

            {/* 6. BOTTOM WIDE GRADIENT BRANDING ENGINE BLOCK */}
            <div 
              id="unifined-engine-bar" 
              className="absolute -bottom-16 left-12 right-0 bg-gradient-to-r from-blue-600/90 via-indigo-600/90 to-purple-600/90 backdrop-blur-lg rounded-2xl p-4 shadow-[0_20px_45px_-8px_rgba(79,70,229,0.25)] border border-white/20 flex items-center justify-between z-30 transition-all duration-500 hover:shadow-[0_25px_50px_-6px_rgba(79,70,229,0.35)] hover:scale-[1.01]"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center text-white text-base shadow-inner">
                  🏰
                </div>
                <div>
                  <h5 className="text-[11px] font-black text-white uppercase tracking-wider">One Unified Engine. Endless Growth.</h5>
                  <p className="text-[9px] text-white/80 font-medium">Web • Campaigns • CRM • WhatsApp • SEO</p>
                </div>
              </div>
              <button 
                onClick={(e) => handleCtaClick('services', e)}
                className="px-3.5 py-1.5 bg-white/25 hover:bg-white/35 active:scale-95 text-white font-extrabold rounded-full text-[9px] flex items-center gap-2 transition-all outline-none border border-white/20 shadow-sm"
              >
                <span className="w-1.5 h-1.5 bg-white rounded-full animate-ping" />
                See How It Works
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Intro Section */}
      <section className="py-20 px-6 md:px-12 bg-neutral-50 dark:bg-[#1a1a1a] transition-colors duration-300">
        <div className="max-w-7xl mx-auto text-center space-y-12">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="space-y-4"
          >
            <p className="text-xs font-bold text-[#0A84FF] uppercase tracking-widest">The Problem</p>
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight">
              Most Businesses Don't Need More Marketing. <br />
              <span className="text-neutral-400 dark:text-neutral-600 font-medium">They Need Better Systems.</span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            <motion.div 
              initial={{ opacity: 0, y: 45 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6 }}
              className="bg-white dark:bg-[#121212] border border-black/5 dark:border-white/10 rounded-xl p-8 space-y-3 relative overflow-hidden group text-center"
            >
              <div className="absolute top-0 left-0 right-0 h-1 bg-amber-400/50 dark:bg-amber-500/30 group-hover:bg-[#0A84FF] transition-all duration-305" />
              <div className="inline-flex justify-center w-full">
                <PremiumIcon name="Unlink" className="w-12 h-12 mb-1" size={22} />
              </div>
              <h4 className="font-bold text-lg">Disconnected Website</h4>
              <p className="text-sm text-neutral-500 dark:text-neutral-400">
                Created on legacy templates, rarely audited, completely disconnected from your analytics and campaigns.
              </p>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 45 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="bg-white dark:bg-[#121212] border border-black/5 dark:border-white/10 rounded-xl p-8 space-y-3 relative overflow-hidden group text-center"
            >
              <div className="absolute top-0 left-0 right-0 h-1 bg-amber-400/50 dark:bg-amber-500/30 group-hover:bg-[#0A84FF] transition-all duration-305" />
              <div className="inline-flex justify-center w-full">
                <PremiumIcon name="Megaphone" className="w-12 h-12 mb-1" size={22} />
              </div>
              <h4 className="font-bold text-lg">Scattered Ad Spending</h4>
              <p className="text-sm text-neutral-500 dark:text-neutral-400">
                Pumping budgets into Google or Meta with zero qualification pipelines, leading to manual sorting fatigue.
              </p>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 45 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-white dark:bg-[#121212] border border-black/5 dark:border-white/10 rounded-xl p-8 space-y-3 relative overflow-hidden group text-center"
            >
              <div className="absolute top-0 left-0 right-0 h-1 bg-amber-400/50 dark:bg-amber-500/30 group-hover:bg-[#0A84FF] transition-all duration-305" />
              <div className="inline-flex justify-center w-full">
                <PremiumIcon name="Smartphone" className="w-12 h-12 mb-1" size={22} />
              </div>
              <h4 className="font-bold text-lg">Manual sorting noise</h4>
              <p className="text-sm text-neutral-500 dark:text-neutral-400">
                Staff spending hours daily typing WhatsApp greetings and checking schedules manually, losing leads in-flight.
              </p>
            </motion.div>
          </div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="bg-white dark:bg-[#121212] border border-[#0A84FF]/20 rounded-2xl p-8 max-w-3xl mx-auto space-y-4 shadow-sm"
          >
            <p className="text-xs font-bold text-[#0A84FF] uppercase tracking-wider">The 7Hive Alignment</p>
            <h3 className="text-2xl font-bold">One Connected, High-Converting Machine.</h3>
            <p className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
              We replace legacy, isolated vendors with engineered pipelines. Your custom website feeds smart calendars, ad traffic hits dynamic pre-qualifying systems, and CRM mappings trigger instant follow-ups on WhatsApp automatically. 
            </p>
          </motion.div>
        </div>
      </section>

      {/* Our Expertise Section */}
      <section className="relative py-24 px-6 md:px-12 bg-neutral-50 dark:bg-[#0d0d0d] border-t border-b border-black/5 dark:border-white/5 overflow-hidden transition-colors duration-300" id="expertise">
        {/* Subtle ambient light leaks */}
        <div className="absolute top-1/4 left-1/3 w-96 h-96 bg-[#0A84FF]/5 dark:bg-[#0a84ff]/5 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-emerald-500/5 dark:bg-emerald-500/5 rounded-full blur-[120px] pointer-events-none" />

        <div className="max-w-7xl mx-auto space-y-16 relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto space-y-4"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#0A84FF]/10 dark:bg-[#0A84FF]/15 border border-[#0A84FF]/20 rounded-full text-xs font-bold text-[#0A84FF] tracking-wider uppercase">
              <span className="w-1.5 h-1.5 rounded-full bg-[#0A84FF]" />
              Domain Mastery
            </div>
            <h2 className="text-4xl md:text-6xl font-black tracking-tight text-neutral-900 dark:text-white leading-none">
              Our Expertise
            </h2>
            <p className="text-base md:text-lg text-neutral-500 dark:text-neutral-400 font-medium leading-relaxed">
              Growth ke liye har cheez under one roof — custom engineered for market domination.
            </p>
          </motion.div>

          <div className="space-y-8">
            {/* Row 1: Two premium, high-impact cards with bento characteristics */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              
              {/* Card 1: Performance Marketing (Colspan: 7) */}
              <motion.div 
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.7, ease: "easeOut" }}
                className="lg:col-span-12 xl:col-span-7 bg-white/70 dark:bg-[#121212]/70 backdrop-blur-md border border-neutral-200/50 dark:border-white/10 rounded-3xl p-8 md:p-10 space-y-8 flex flex-col justify-between hover:border-[#0A84FF]/40 dark:hover:border-[#0A84FF]/40 hover:-translate-y-2 hover:shadow-[0_20px_50px_rgba(10,132,255,0.08)] transition-all duration-500 relative group overflow-hidden"
              >
                {/* Radial glow background on hover */}
                <div className="absolute -inset-px bg-gradient-to-br from-[#0A84FF]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl pointer-events-none" />
                <div className="absolute top-0 right-0 w-48 h-48 bg-[#0A84FF]/5 rounded-full blur-3xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                <div className="space-y-5 relative z-10">
                  <div className="w-14 h-14 rounded-2xl bg-[#0A84FF]/10 dark:bg-[#0A84FF]/15 flex items-center justify-center text-[#0A84FF] border border-[#0A84FF]/20 shadow-[inset_0_1.5px_1px_rgba(255,255,255,0.15)] group-hover:scale-110 transition-transform duration-300">
                    <TrendingUp className="w-7 h-7 stroke-[2.2]" />
                  </div>
                  <div className="space-y-3">
                    <h3 className="text-2xl md:text-3xl font-extrabold text-neutral-900 dark:text-white tracking-tight group-hover:text-[#0A84FF] transition-colors duration-300">
                      Performance Marketing
                    </h3>
                    <p className="text-neutral-600 dark:text-neutral-300 text-sm md:text-base leading-relaxed font-normal">
                      Paid Ads that actually convert. Hum sirf clicks nahi, customers laate hain. Facebook, Google, & LinkedIn dominance.
                    </p>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2.5 pt-4 relative z-10">
                  <span className="inline-flex items-center gap-1 text-[11px] font-bold uppercase tracking-wider px-3.5 py-1.5 bg-[#0A84FF]/10 text-[#0A84FF] border border-[#0A84FF]/20 rounded-full">
                    <Zap className="w-3 h-3 text-[#0A84FF]" /> ROAS Focus
                  </span>
                  <span className="inline-flex items-center gap-1 text-[11px] font-bold uppercase tracking-wider px-3.5 py-1.5 bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-300 border border-transparent dark:border-neutral-700/55 rounded-full">
                    <TrendingUp className="w-3 h-3 text-emerald-500" /> Data Driven
                  </span>
                </div>
              </motion.div>

              {/* Card 2: Tech & Product (Colspan: 5) */}
              <motion.div 
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.7, delay: 0.15, ease: "easeOut" }}
                className="lg:col-span-12 xl:col-span-5 bg-white/70 dark:bg-[#121212]/70 backdrop-blur-md border border-neutral-200/50 dark:border-white/10 rounded-3xl p-8 md:p-10 space-y-8 flex flex-col justify-between hover:border-emerald-500/40 dark:hover:border-emerald-500/40 hover:-translate-y-2 hover:shadow-[0_20px_50px_rgba(16,185,129,0.08)] transition-all duration-500 relative group overflow-hidden"
              >
                {/* Radial glow background on hover */}
                <div className="absolute -inset-px bg-gradient-to-br from-emerald-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl pointer-events-none" />
                <div className="absolute top-0 right-0 w-48 h-48 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                <div className="space-y-5 relative z-10">
                  <div className="w-14 h-14 rounded-2xl bg-emerald-500/10 dark:bg-emerald-500/15 flex items-center justify-center text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 shadow-[inset_0_1.5px_1px_rgba(255,255,255,0.15)] group-hover:scale-110 transition-transform duration-300">
                    <Code className="w-7 h-7 stroke-[2.2]" />
                  </div>
                  <div className="space-y-3">
                    <h3 className="text-2xl md:text-3xl font-extrabold text-neutral-900 dark:text-white tracking-tight group-hover:text-emerald-500 transition-colors duration-300">
                      Tech & Product
                    </h3>
                    <p className="text-neutral-600 dark:text-neutral-300 text-sm md:text-base leading-relaxed font-normal">
                      Shopify, custom apps, and AI bots. Hum humesha next-gen technologies use karte hain for maximum efficiency.
                    </p>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2.5 pt-4 relative z-10">
                  <span className="inline-flex items-center gap-1 text-[11px] font-bold uppercase tracking-wider px-3.5 py-1.5 bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border border-cyan-500/15 rounded-full">
                    <Cpu className="w-3 h-3 text-cyan-500" /> Next-JS
                  </span>
                  <span className="inline-flex items-center gap-1 text-[11px] font-bold uppercase tracking-wider px-3.5 py-1.5 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/15 rounded-full">
                    <ShoppingBag className="w-3 h-3 text-emerald-500" /> Shopify
                  </span>
                </div>
              </motion.div>

            </div>

            {/* Row 2: Three exquisite, micro-bento cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              
              {/* Card 3: AI & Automation */}
              <motion.div 
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="bg-white/70 dark:bg-[#121212]/70 backdrop-blur-md border border-neutral-200/50 dark:border-white/10 rounded-2xl p-8 space-y-6 hover:border-purple-500/40 dark:hover:border-purple-500/40 hover:-translate-y-2 hover:shadow-[0_15px_35px_rgba(168,85,247,0.06)] transition-all duration-500 relative group overflow-hidden flex flex-col justify-between"
              >
                <div className="absolute -inset-px bg-gradient-to-br from-purple-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl pointer-events-none" />
                <div className="space-y-4 relative z-10">
                  <div className="w-12 h-12 rounded-xl bg-purple-500/10 dark:bg-purple-500/15 flex items-center justify-center text-purple-600 dark:text-purple-400 border border-purple-500/20 group-hover:scale-110 transition-transform duration-300">
                    <BrainCircuit className="w-6 h-6 stroke-[2.2]" />
                  </div>
                  <h3 className="text-xl font-bold text-neutral-900 dark:text-white tracking-tight group-hover:text-purple-500 transition-colors duration-300">
                    AI & Automation
                  </h3>
                  <p className="text-neutral-600 dark:text-neutral-300 text-sm leading-relaxed">
                    Automate repetitive tasks. Hum use karte hain AI to make your marketing 10x smarter.
                  </p>
                </div>
              </motion.div>

              {/* Card 4: Content Production */}
              <motion.div 
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
                className="bg-white/70 dark:bg-[#121212]/70 backdrop-blur-md border border-neutral-200/50 dark:border-white/10 rounded-2xl p-8 space-y-6 hover:border-rose-500/40 dark:hover:border-rose-500/40 hover:-translate-y-2 hover:shadow-[0_15px_35px_rgba(244,63,94,0.06)] transition-all duration-500 relative group overflow-hidden flex flex-col justify-between"
              >
                <div className="absolute -inset-px bg-gradient-to-br from-rose-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl pointer-events-none" />
                <div className="space-y-4 relative z-10">
                  <div className="w-12 h-12 rounded-xl bg-rose-500/10 dark:bg-rose-500/15 flex items-center justify-center text-rose-600 dark:text-rose-400 border border-rose-500/20 group-hover:scale-110 transition-transform duration-300">
                    <Clapperboard className="w-6 h-6 stroke-[2.2]" />
                  </div>
                  <h3 className="text-xl font-bold text-neutral-900 dark:text-white tracking-tight group-hover:text-rose-500 transition-colors duration-300">
                    Content Production
                  </h3>
                  <p className="text-neutral-600 dark:text-neutral-300 text-sm leading-relaxed">
                    Viral-worthy reels and high-production brand films. Storytelling that stops the scroll.
                  </p>
                </div>
              </motion.div>

              {/* Card 5: Offline Marketing */}
              <motion.div 
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
                className="bg-white/70 dark:bg-[#121212]/70 backdrop-blur-md border border-neutral-200/50 dark:border-white/10 rounded-2xl p-8 space-y-6 hover:border-indigo-500/40 dark:hover:border-indigo-500/40 hover:-translate-y-2 hover:shadow-[0_15px_35px_rgba(99,102,241,0.06)] transition-all duration-500 relative group overflow-hidden flex flex-col justify-between"
              >
                <div className="absolute -inset-px bg-gradient-to-br from-indigo-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl pointer-events-none" />
                <div className="space-y-4 relative z-10">
                  <div className="w-12 h-12 rounded-xl bg-indigo-500/10 dark:bg-indigo-500/15 flex items-center justify-center text-indigo-600 dark:text-indigo-400 border border-indigo-500/20 group-hover:scale-110 transition-transform duration-300">
                    <Building2 className="w-6 h-6 stroke-[2.2]" />
                  </div>
                  <h3 className="text-xl font-bold text-neutral-900 dark:text-white tracking-tight group-hover:text-indigo-500 transition-colors duration-300">
                    Offline Marketing
                  </h3>
                  <p className="text-neutral-600 dark:text-neutral-300 text-sm leading-relaxed">
                    Connecting the digital world with physical impact. Events, BTL, and traditional media.
                  </p>
                </div>
              </motion.div>

            </div>
          </div>
        </div>
      </section>

      {/* 3. Services Summary */}
      <section className="py-20 px-6 md:px-12 bg-white dark:bg-[#121212] transition-colors duration-300">
        <div className="max-w-7xl mx-auto space-y-12">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="text-center space-y-4"
          >
            <p className="text-xs font-bold text-[#0A84FF] uppercase tracking-widest">Our Ecosystem</p>
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight">Everything Your Business Needs To Grow.</h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {SERVICES.slice(0, 3).map((srv, index) => (
              <motion.div
                key={srv.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-neutral-50 dark:bg-[#1a1a1a] border border-black/5 dark:border-white/5 rounded-xl p-8 flex flex-col justify-between group hover:border-[#0A84FF]/30 transition-all duration-300"
              >
                <div className="space-y-4">
                  <PremiumIcon name={srv.icon} className="w-12 h-12" size={22} />
                  <h3 className="text-lg font-bold">{srv.title}</h3>
                  <p className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">{srv.desc}</p>
                </div>
                <div className="mt-6 pt-4 border-t border-black/5 dark:border-white/5 flex items-center justify-between">
                  <span className="text-xs text-[#0A84FF] font-semibold">{srv.outcome}</span>
                  <ArrowRight className="w-4 h-4 text-neutral-400 group-hover:translate-x-1 transition-transform" />
                </div>
              </motion.div>
            ))}
          </div>

          <div className="text-center pt-4">
            <a
              href="#services"
              onClick={(e) => handleCtaClick('services', e)}
              className="inline-flex items-center gap-2 text-sm font-bold text-[#0A84FF] hover:text-[#0A84FF]/80 group"
            >
              See our complete 10-piece package
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </a>
          </div>
        </div>
      </section>

      {/* 4. Case Studies Brief */}
      <section className="py-20 px-6 md:px-12 bg-neutral-50 dark:bg-[#1a1a1a] transition-colors duration-300">
        <div className="max-w-7xl mx-auto space-y-12">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="text-center space-y-4"
          >
            <p className="text-xs font-bold text-[#0A84FF] uppercase tracking-widest">Our Work</p>
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight">Growth Proof & Custom Audits.</h2>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {CASE_STUDIES.map((cs, index) => (
              <motion.div
                key={cs.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white dark:bg-[#121212] border border-black/5 dark:border-white/10 rounded-2xl overflow-hidden shadow-sm flex flex-col justify-between group hover:border-[#0A84FF]/20 transition-all"
              >
                <div className="p-8 space-y-4">
                  <span className="text-[10px] uppercase font-bold tracking-widest text-[#0A84FF]">
                    {cs.industry}
                  </span>
                  <h3 className="text-xl font-bold">{cs.title}</h3>
                  <p className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">{cs.desc}</p>
                </div>
                <div className="p-8 pt-0">
                  <div className="grid grid-cols-3 gap-4 border-t border-black/5 dark:border-white/10 pt-6">
                    {cs.metrics.map((met, mi) => (
                      <div key={mi} className="text-center">
                        <span className="block text-xl font-extrabold text-[#0A84FF] leading-none mb-1">
                          {met.value}
                        </span>
                        <span className="text-[10px] font-medium text-neutral-400 uppercase tracking-wider">
                          {met.label}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="text-center">
            <a
              href="#work"
              onClick={(e) => handleCtaClick('work', e)}
              className="inline-flex items-center gap-2 text-sm font-bold text-[#0A84FF] hover:text-[#0A84FF]/80 group"
            >
              Examine detailed client testimonials
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </a>
          </div>
        </div>
      </section>

      {/* 5. Metrics counter view */}
      <section className="py-16 px-6 md:px-12 bg-white dark:bg-[#121212] border-y border-black/5 dark:border-white/10 transition-colors duration-300">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8"
        >
          <div className="text-center space-y-2">
            <div className="text-4xl font-extrabold text-[#0A84FF]">{leadCounter.toLocaleString('en-IN')}+</div>
            <div className="text-xs uppercase tracking-widest text-neutral-400 font-bold">Leads Generated</div>
          </div>
          <div className="text-center space-y-2">
            <div className="text-4xl font-extrabold text-[#0A84FF]">₹{revCounter}Cr+</div>
            <div className="text-xs uppercase tracking-widest text-neutral-400 font-bold">Revenue Influenced</div>
          </div>
          <div className="text-center space-y-2">
            <div className="text-4xl font-extrabold text-[#0A84FF]">{siteCounter}+</div>
            <div className="text-xs uppercase tracking-widest text-neutral-400 font-bold">Sites Launched</div>
          </div>
          <div className="text-center space-y-2">
            <div className="text-4xl font-extrabold text-[#0A84FF]">98%</div>
            <div className="text-xs uppercase tracking-widest text-neutral-400 font-bold">Satisfaction Scale</div>
          </div>
        </motion.div>
      </section>

      {/* 6. Client Carousel Block */}
      <section className="py-20 px-6 md:px-12 bg-neutral-50 dark:bg-[#1a1a1a] transition-colors duration-300 overflow-hidden">
        <div className="max-w-5xl mx-auto space-y-12 relative">
          <div className="text-center space-y-4">
            <p className="text-xs font-bold text-[#0A84FF] uppercase tracking-widest">Feedback</p>
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-neutral-900 dark:text-neutral-50">
              Trusted By Scaling Brands.
            </h2>
          </div>

          <div className="relative bg-white dark:bg-[#121212] border border-black/5 dark:border-white/10 rounded-2xl p-8 md:p-12 shadow-sm min-h-[250px] flex flex-col justify-between">
            <div className="space-y-6">
              <div className="text-amber-400 text-lg">{'★'.repeat(TESTIMONIALS[activeTestimonialIdx].stars)}</div>
              <p className="text-lg md:text-xl font-medium italic text-neutral-800 dark:text-neutral-200 leading-relaxed">
                "{TESTIMONIALS[activeTestimonialIdx].text}"
              </p>
            </div>
            <div className="flex items-center justify-between mt-8 pt-6 border-t border-black/5 dark:border-white/10">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gradient-to-tr from-[#0A84FF] to-sky-400 rounded-full flex items-center justify-center font-bold text-white select-none">
                  {TESTIMONIALS[activeTestimonialIdx].avatarInitials}
                </div>
                <div>
                  <div className="font-bold text-sm text-neutral-900 dark:text-neutral-50">
                    {TESTIMONIALS[activeTestimonialIdx].author}
                  </div>
                  <div className="text-xs text-neutral-400">{TESTIMONIALS[activeTestimonialIdx].role}</div>
                </div>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => handleTestimonialScroll('prev')}
                  className="w-10 h-10 rounded-full border border-black/5 dark:border-white/10 flex items-center justify-center text-neutral-500 hover:text-black dark:hover:text-white transition-colors cursor-pointer"
                  id="testimonial-prev-action"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  onClick={() => handleTestimonialScroll('next')}
                  className="w-10 h-10 rounded-full border border-black/5 dark:border-white/10 flex items-center justify-center text-neutral-500 hover:text-black dark:hover:text-white transition-colors cursor-pointer"
                  id="testimonial-next-action"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7. Quick FAQ accordion */}
      <section className="py-20 px-6 md:px-12 bg-white dark:bg-[#121212] transition-colors duration-300">
        <div className="max-w-4xl mx-auto space-y-12">
          <div className="text-center space-y-4">
            <p className="text-xs font-bold text-[#0A84FF] uppercase tracking-widest">Knowledge Base</p>
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight">Questions & Answers</h2>
          </div>

          <div className="space-y-4">
            {FAQS.slice(0, 4).map((faq) => {
              const isSelected = activeFaqId === faq.id;
              return (
                <div
                  key={faq.id}
                  className="bg-neutral-50 dark:bg-[#1a1a1a] border border-black/5 dark:border-white/10 rounded-xl overflow-hidden transition-all duration-300"
                >
                  <button
                    onClick={() => handleFaqToggle(faq.id)}
                    className="w-full px-6 py-5 flex items-center justify-between text-left font-semibold text-neutral-900 dark:text-neutral-50 hover:text-[#0A84FF] transition-colors"
                  >
                    <span>{faq.question}</span>
                    <span className="text-lg leading-none text-[#0A84FF]">{isSelected ? '−' : '+'}</span>
                  </button>
                  {isSelected && (
                    <div className="px-6 pb-5 text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed border-t border-black/5 dark:border-white/5 pt-4">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          <div className="text-center">
            <a
              href="#faq"
              onClick={(e) => handleCtaClick('faq', e)}
              className="inline-flex items-center gap-2 text-sm font-bold text-[#0A84FF] hover:text-[#0A84FF]/80 group"
            >
              See all frequently asked questions
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </a>
          </div>
        </div>
      </section>

      {/* 8. Bottom Action Banner */}
      <section className="py-20 px-6 md:px-12 bg-neutral-950 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.03] bg-[radial-gradient(#F4B400_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none select-none" />
        <div className="max-w-4xl mx-auto text-center space-y-6 relative z-10">
          <p className="text-xs font-bold text-[#0A84FF] uppercase tracking-wider">Join The Hive</p>
          <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight">Ready to build your digital growth system?</h2>
          <p className="text-lg text-neutral-400 max-w-xl mx-auto leading-relaxed">
            Stop losing leads in isolated systems. Connect websites, WhatsApp automation, and prequalified channels into a singular predictable engine today.
          </p>
          <div className="flex flex-wrap gap-4 justify-center pt-6">
            <a
              href="#contact"
              onClick={(e) => handleCtaClick('contact', e)}
              className="px-8 py-3.5 bg-[#0A84FF] text-white font-extrabold rounded-full select-none hover:bg-blue-600 transition-all shadow-md active:scale-95"
            >
              Book Strategic Call Free
            </a>
            <a
              href="#contact?type=audit"
              onClick={(e) => handleCtaClick('contact', e)}
              className="px-8 py-3.5 border border-white/20 hover:border-white/40 text-white font-semibold rounded-full select-none hover:bg-white/5 transition-all"
            >
              Request Free Audit report
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}

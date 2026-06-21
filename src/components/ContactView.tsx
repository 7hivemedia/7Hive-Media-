import { useState, useEffect } from 'react';
import { OnboardingState } from '../types';
import { PremiumIcon } from './PremiumIcon';
import { motion } from 'motion/react';
import { Logo } from './Logo';
import { dynamicStore } from '../lib/dynamicStore';

interface ContactViewProps {
  onNavigate: (view: string) => void;
}

export function ContactView({ onNavigate }: ContactViewProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<OnboardingState>({
    fullName: '',
    emailAddr: '',
    companyName: '',
    services: [],
    budget: '',
    websiteUrl: '',
    additionalNotes: '',
  });

  const [validationError, setValidationError] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Hook to check for URL hash queries (e.g. #contact?type=audit or #contact?type=call)
  useEffect(() => {
    const rawHash = window.location.hash;
    if (rawHash.includes('?')) {
      const queryStr = rawHash.split('?')[1];
      const params = new URLSearchParams(queryStr);
      const auditType = params.get('type');
      if (auditType === 'audit') {
        setFormData((prev) => ({
          ...prev,
          services: ['audit'],
        }));
      } else if (auditType === 'call' || auditType === 'ads') {
        setFormData((prev) => ({
          ...prev,
          services: ['ads'],
        }));
      }
    }
  }, []);

  const handleToggleService = (srvId: string) => {
    setFormData((prev) => {
      const active = prev.services.includes(srvId);
      const updated = active
        ? prev.services.filter((s) => s !== srvId)
        : [...prev.services, srvId];
      return { ...prev, services: updated };
    });
  };

  const handleSelectBudget = (val: 'under-50k' | '50k-2l' | 'above-2l') => {
    setFormData((prev) => ({ ...prev, budget: val }));
  };

  const validateStep = (step: number): boolean => {
    setValidationError('');

    if (step === 1) {
      if (!formData.fullName.trim()) {
        setValidationError('Please enter your full name to proceed.');
        return false;
      }
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.emailAddr.trim())) {
        setValidationError('Please provide a valid business email address.');
        return false;
      }
    } else if (step === 3) {
      if (!formData.budget) {
        setValidationError('Please select a budget range that matches your expectations.');
        return false;
      }
    }
    return true;
  };

  const handleNextStep = async () => {
    if (!validateStep(currentStep)) return;
    if (currentStep < 3) {
       setCurrentStep((prev) => prev + 1);
    } else {
       // Submit action
       await dynamicStore.captureLead(formData);
       setIsSubmitted(true);
    }
  };


  const handlePrevStep = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1);
      setValidationError('');
    }
  };

  const servicesOpts = [
    { id: 'web-dev', label: 'Web Development' },
    { id: 'seo', label: 'SEO & Rank Optimization' },
    { id: 'ads', label: 'Google & Meta Ads' },
    { id: 'automation', label: 'Automation (WhatsApp/CRM)' },
    { id: 'audit', label: 'Free Website Audit Reports' },
  ];

  const budgetOpts = [
    { id: 'under-50k' as const, label: 'Below ₹50k' },
    { id: '50k-2l' as const, label: '₹50k - ₹2L' },
    { id: 'above-2l' as const, label: '₹2L+' },
  ];

  return (
    <div className="pt-20">
      {/* Hero */}
      <section className="relative py-14 md:py-20 px-6 md:px-12 bg-white dark:bg-[#121212] transition-colors duration-300 overflow-hidden border-b border-black/5 dark:border-white/10">
        <div className="absolute inset-x-0 top-0 h-64 bg-gradient-to-b from-[#0A84FF]/5 to-transparent pointer-events-none select-none" />
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center relative z-10">
              {/* Logo in the empty part on the left */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.85, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="lg:col-span-4 flex justify-center lg:justify-start"
          >
            <div className="relative group">
              {/* Vibrant soft radial shadow */}
              <div className="absolute -inset-1.5 bg-gradient-to-r from-[#0A84FF]/20 to-cyan-500/10 rounded-full blur-2xl opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>
              <Logo className="w-44 h-44 md:w-52 md:h-52 filter drop-shadow-[0_12px_30px_rgba(10,132,255,0.22)] relative transition-all duration-300 group-hover:scale-105" />
            </div>
          </motion.div>

          {/* Text and Context on the Right */}
          <div className="lg:col-span-8 text-center lg:text-left space-y-4">
            <p className="text-xs font-bold text-[#0A84FF] uppercase tracking-widest font-sans">GET IN TOUCH</p>
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-neutral-900 dark:text-neutral-50 leading-tight">
              Let's Build Your Hive
            </h1>
            <p className="text-lg text-neutral-500 dark:text-neutral-400 max-w-xl mx-auto lg:mx-0 font-sans leading-relaxed">
              Select your service parameters and budget guidelines, provide challenge notes, and request your custom Growth Blueprint.
            </p>
          </div>

        </div>
      </section>

      {/* Main Section Form / Info */}
      <section className="py-16 px-6 md:px-12 bg-neutral-50 dark:bg-[#1a1a1a] transition-colors duration-300">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-5 gap-12">
          {/* Info panel */}
          <div className="lg:col-span-2 space-y-8 pr-4">
            <h2 className="text-2xl font-bold">Why Partner With 7Hive Media?</h2>
            <p className="text-sm text-neutral-500 dark:text-neutral-400 leading-relaxed">
              We specialize in engineering complete digital ecosystems that attract, qualify, and automate marketing pipelines directly to your calendar.
            </p>

            <div className="space-y-6">
              <div className="flex gap-4 items-start">
                <PremiumIcon name="BarChart3" size={18} className="w-9 h-9 shrink-0" />
                <div>
                  <h4 className="font-semibold text-sm">Custom Growth Audit</h4>
                  <p className="text-xs text-neutral-500 dark:text-neutral-400 leading-relaxed mt-1">
                    We perform granular site speed, traffic channel, and competitor funnels diagnostics prior to our consultation meetings.
                  </p>
                </div>
              </div>

              <div className="flex gap-4 items-start">
                <PremiumIcon name="Zap" size={18} className="w-9 h-9 shrink-0" />
                <div>
                  <h4 className="font-semibold text-sm">System Integrations</h4>
                  <p className="text-xs text-neutral-500 dark:text-neutral-400 leading-relaxed mt-1">
                    We write, connect, and automate web properties, Google Search campaigns, CRM pathways, and instant WhatsApp reply flows.
                  </p>
                </div>
              </div>

              <div className="flex gap-4 items-start">
                <PremiumIcon name="Trophy" size={18} className="w-9 h-9 shrink-0" />
                <div>
                  <h4 className="font-semibold text-sm font-sans">98% Retention Success</h4>
                  <p className="text-xs text-[#555] dark:text-[#888] leading-relaxed mt-1">
                    We maintain transparent, live metric scoreboards. You check your cost‑per‑acquisition and sales numbers at a glance.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Form questionnaire screen */}
          <div className="lg:col-span-3">
            <div className="bg-white dark:bg-[#121212] border border-black/5 dark:border-white/10 rounded-2xl p-8 md:p-10 shadow-xs relative">
              {!isSubmitted ? (
                <div className="space-y-8">
                  {/* Step indicators */}
                  <div className="flex items-center justify-between relative mb-6">
                    <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-[2px] bg-neutral-100 dark:bg-neutral-800 z-10" />
                    {[1, 2, 3].map((s) => (
                      <div
                        key={s}
                        className={`w-10 h-10 rounded-full border-2 flex items-center justify-center font-bold text-xs relative z-20 transition-all ${
                          currentStep === s
                            ? 'bg-[#0A84FF] border-[#0A84FF] text-white shadow-xs'
                            : currentStep > s
                            ? 'bg-emerald-500 border-green-500 text-white'
                            : 'bg-neutral-50 dark:bg-[#1e1e1e] border-neutral-200 dark:border-white/10 text-neutral-400'
                        }`}
                      >
                        {s}
                      </div>
                    ))}
                  </div>

                  {/* Warning Alerts */}
                  {validationError && (
                    <div className="p-4 bg-red-400/10 border border-red-500/20 text-red-500 rounded-xl text-xs font-semibold">
                      ⚠ {validationError}
                    </div>
                  )}

                  {/* Step 1 Form fields */}
                  {currentStep === 1 && (
                    <div className="space-y-4 animate-fade-in">
                      <h3 className="text-lg font-bold">Tell us about yourself</h3>
                      <div className="space-y-4">
                        <div className="space-y-1">
                          <label className="text-xs font-semibold text-neutral-400">Full Name *</label>
                          <input
                            type="text"
                            required
                            placeholder="John Doe"
                            value={formData.fullName}
                            onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                            className="w-full text-xs px-4 py-3 border border-black/5 dark:border-white/10 rounded-lg bg-neutral-50 dark:bg-[#1e1e1e] text-black dark:text-white"
                          />
                        </div>

                        <div className="space-y-1">
                          <label className="text-xs font-semibold text-neutral-400">Email Address *</label>
                          <input
                            type="email"
                            required
                            placeholder="john@company.com"
                            value={formData.emailAddr}
                            onChange={(e) => setFormData({ ...formData, emailAddr: e.target.value })}
                            className="w-full text-xs px-4 py-3 border border-black/5 dark:border-white/10 rounded-lg bg-neutral-50 dark:bg-[#1e1e1e] text-black dark:text-white"
                          />
                        </div>

                        <div className="space-y-1">
                          <label className="text-xs font-semibold text-neutral-400">Company Name</label>
                          <input
                            type="text"
                            placeholder="Acme Corp"
                            value={formData.companyName}
                            onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                            className="w-full text-xs px-4 py-3 border border-black/5 dark:border-white/10 rounded-lg bg-neutral-50 dark:bg-[#1e1e1e] text-black dark:text-white"
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Step 2 Form choices check fields */}
                  {currentStep === 2 && (
                    <div className="space-y-4 animate-fade-in">
                      <h3 className="text-lg font-bold">Select service categories you're interested in</h3>
                      <div className="grid grid-cols-1 gap-2.5">
                        {servicesOpts.map((opt) => {
                          const isChecked = formData.services.includes(opt.id);
                          return (
                            <div
                              key={opt.id}
                              onClick={() => handleToggleService(opt.id)}
                              className={`p-4 border rounded-xl flex items-center justify-between cursor-pointer transition-all select-none ${
                                isChecked
                                  ? 'border-[#0A84FF] bg-[#0A84FF]/5'
                                  : 'border-black/5 dark:border-white/10 bg-neutral-50 dark:bg-[#1e1e1e] hover:border-black/20 dark:hover:border-white/20'
                              }`}
                            >
                              <span className="text-xs font-semibold">{opt.label}</span>
                              <div
                                className={`w-5 h-5 rounded border flex items-center justify-center text-xs font-bold leading-none ${
                                  isChecked
                                    ? 'bg-[#0A84FF] border-[#0A84FF] text-white'
                                    : 'border-neutral-350 bg-white dark:bg-[#1a1a1a]'
                                }`}
                              >
                                {isChecked && '✓'}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}

                  {/* Step 3 Budget radio fields */}
                  {currentStep === 3 && (
                    <div className="space-y-4 animate-fade-in col-span">
                      <h3 className="text-lg font-bold">Details & Project Requirements</h3>
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <label className="text-xs font-semibold text-neutral-400">Monthly Marketing Budget *</label>
                          <div className="grid grid-cols-3 gap-2.5">
                            {budgetOpts.map((opt) => {
                              const isChecked = formData.budget === opt.id;
                              return (
                                <div
                                  key={opt.id}
                                  onClick={() => handleSelectBudget(opt.id)}
                                  className={`p-3 border rounded-xl text-center cursor-pointer transition-all select-none text-xs font-semibold ${
                                    isChecked
                                      ? 'border-[#0A84FF] bg-[#0A84FF]/5 text-[#0A84FF]'
                                      : 'border-black/5 dark:border-white/10 bg-neutral-50 dark:bg-[#1e1e1e]'
                                  }`}
                                >
                                  {opt.label}
                                </div>
                              );
                            })}
                          </div>
                        </div>

                        <div className="space-y-1">
                          <label className="text-xs font-semibold text-neutral-400">Website URL (if any)</label>
                          <input
                            type="url"
                            placeholder="https://mycompany.com"
                            value={formData.websiteUrl}
                            onChange={(e) => setFormData({ ...formData, websiteUrl: e.target.value })}
                            className="w-full text-xs px-4 py-3 border border-black/5 dark:border-white/10 rounded-lg bg-neutral-50 dark:bg-[#1e1e1e] text-black dark:text-white"
                          />
                        </div>

                        <div className="space-y-1">
                          <label className="text-xs font-semibold text-neutral-400">Growth Challenges or Specific Notes</label>
                          <textarea
                            rows={3}
                            placeholder="Brief us on lead sorting limits, speed bottlenecks, or target goals..."
                            value={formData.additionalNotes}
                            onChange={(e) => setFormData({ ...formData, additionalNotes: e.target.value })}
                            className="w-full text-xs px-4 py-3 border border-black/5 dark:border-white/10 rounded-lg bg-neutral-50 dark:bg-[#1e1e1e] text-black dark:text-white resize-none"
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Nav button indicators */}
                  <div className="flex items-center justify-between pt-6 border-t border-black/5 dark:border-white/5">
                    <button
                      type="button"
                      onClick={handlePrevStep}
                      className="px-6 py-2.5 rounded-full border border-black/10 dark:border-white/10 text-xs font-semibold text-neutral-500 hover:text-black dark:hover:text-white transition-colors cursor-pointer select-none"
                      style={{ visibility: currentStep === 1 ? 'hidden' : 'visible' }}
                    >
                      Previous
                    </button>
                    <button
                      type="button"
                      onClick={handleNextStep}
                      className="px-6 py-2.5 bg-[#0A84FF] hover:bg-blue-600 active:scale-95 transition-all text-white font-bold rounded-full select-none cursor-pointer"
                      id="form-action-btn-navigate"
                    >
                      {currentStep === 3 ? 'Request Blueprint' : 'Next'}
                    </button>
                  </div>
                </div>
              ) : (
                <div className="text-center py-12 space-y-6 animate-fade-in flex flex-col items-center">
                  <div className="w-16 h-10 border-2 rounded-full border-green-500 flex items-center justify-center font-bold text-2xl text-green-500 max-w-16">
                    ✓
                  </div>
                  <h3 className="text-2xl font-bold">Onboarding Proposal Sent!</h3>
                  <p className="text-sm text-neutral-500 dark:text-neutral-400 max-w-md leading-relaxed mx-auto">
                    Thanks {formData.fullName}! Our growth engineers are analyzing {formData.companyName || 'your business'} competitor matrix and web diagnostics. We will send the full calendar invite within 24 hours.
                  </p>
                  <div className="pt-4">
                    <button
                      onClick={() => {
                        onNavigate('home');
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }}
                      className="px-6 py-2.5 bg-neutral-100 dark:bg-neutral-800 text-neutral-800 dark:text-neutral-200 text-xs font-bold rounded-full cursor-pointer hover:bg-neutral-200 transition-colors"
                    >
                      Return to Homepage
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

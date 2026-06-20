import React from 'react';
import { motion } from 'motion/react';
import { ArrowLeft, Shield, CheckCircle, ExternalLink, Mail, Globe } from 'lucide-react';

interface PrivacyPolicyViewProps {
  onNavigate: (view: string) => void;
}

export function PrivacyPolicyView({ onNavigate }: PrivacyPolicyViewProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className="pt-24 pb-20 px-6 md:px-12 relative overflow-hidden"
    >
      {/* Liquid Glass Background Ambient Glows */}
      <div className="absolute top-20 left-[-100px] w-[500px] h-[500px] rounded-full bg-blue-400/10 dark:bg-[#0A84FF]/5 blur-[120px] pointer-events-none z-0 mix-blend-multiply" />
      <div className="absolute bottom-10 right-[-100px] w-[500px] h-[500px] rounded-full bg-indigo-400/15 dark:bg-indigo-600/5 blur-[130px] pointer-events-none z-0 mix-blend-multiply" />

      <div className="max-w-4xl mx-auto relative z-10">
        
        {/* Spatial Navigation Breadcrumb */}
        <button
          onClick={() => onNavigate('home')}
          className="group mb-8 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-stone-500 dark:text-stone-400 bg-white/40 dark:bg-stone-900/40 backdrop-blur-md border border-white/60 dark:border-white/10 px-4 py-2 rounded-full hover:bg-[#0A84FF] hover:text-white dark:hover:text-[#121212] hover:border-[#0A84FF] active:scale-95 transition-all shadow-[0_4px_12px_rgba(0,0,0,0.03)] cursor-pointer select-none"
        >
          <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform" />
          Back to Home
        </button>

        {/* Hero glass banner - Spatial Layout */}
        <div className="mb-12 p-8 md:p-12 bg-white/40 dark:bg-stone-900/30 backdrop-blur-2xl rounded-3xl border border-white/80 dark:border-white/10 shadow-[0_20px_50px_-12px_rgba(0,0,0,0.05),inset_0_1px_1px_rgba(255,255,255,0.6)] relative overflow-hidden">
          {/* Subtle grid accent */}
          <div className="absolute inset-0 bg-[radial-gradient(#0A84FF_1px,transparent_1px)] [background-size:20px_20px] opacity-5 pointer-events-none" />
          
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-50/80 dark:bg-[#0A84FF]/10 text-[#0A84FF] text-[10px] font-black uppercase tracking-wider rounded-full shadow-xs mb-4">
                <Shield className="w-3 h-3 fill-[#0A84FF]/10" />
                Legal Framework
              </div>
              <h1 className="text-3xl md:text-5xl font-black text-stone-900 dark:text-white tracking-tight leading-none">
                Privacy Policy
              </h1>
              <p className="text-sm text-stone-500 dark:text-stone-400 mt-2 font-medium">
                Effective Solutions with Absolute Transparency.
              </p>
            </div>
            <div className="flex flex-col items-start md:items-end text-xs font-mono text-stone-400 dark:text-stone-500 bg-white/60 dark:bg-stone-900/50 backdrop-blur-md border border-white/40 dark:border-stone-800 p-4 rounded-2xl shadow-sm md:text-right">
              <span className="font-bold text-stone-500 dark:text-stone-400">LAST UPDATED</span>
              <span className="text-[#0A84FF] font-semibold">June 20, 2026</span>
            </div>
          </div>
        </div>

        {/* Liquid Glass Main Content Container */}
        <div className="bg-white/60 dark:bg-stone-900/40 backdrop-blur-2xl rounded-3xl border border-white/80 dark:border-white/10 shadow-[0_30px_70px_-15px_rgba(0,0,0,0.08),inset_0_1px_1px_rgba(255,255,255,0.7)] p-8 md:p-12 space-y-10 leading-relaxed text-stone-700 dark:text-stone-300">
          
          <div className="prose prose-stone dark:prose-invert max-w-none space-y-6">
            <p className="text-base text-stone-800 dark:text-stone-200 font-medium">
              At <strong className="text-[#0A84FF]">7Hive Media</strong>, we value your privacy and are committed to protecting your personal information. This Privacy Policy explains how we collect, use, disclose, and safeguard information when you visit our website, use our services, or interact with us.
            </p>
            <p className="p-4 bg-white/50 dark:bg-stone-800/40 border border-white/40 dark:border-stone-800 rounded-2xl text-sm italic text-stone-600 dark:text-stone-400 shadow-xs">
              By using our website and services, you agree to the practices described in this Privacy Policy.
            </p>
          </div>

          {/* Policy Sections */}
          <div className="space-y-8 divide-y divide-black/5 dark:divide-white/5">
            
            {/* Section 1 */}
            <div className="pt-8 first:pt-0 space-y-4">
              <h2 className="text-xl font-bold text-stone-900 dark:text-white flex items-center gap-2.5">
                <span className="flex items-center justify-center w-7 h-7 rounded-lg bg-blue-50/80 dark:bg-[#0A84FF]/10 text-xs font-black text-[#0A84FF]">1</span>
                Information We Collect
              </h2>
              <div className="grid md:grid-cols-2 gap-6 pt-2">
                <div className="p-5 rounded-2xl bg-white/40 dark:bg-stone-900/30 border border-white/40 dark:border-stone-800/50 shadow-xs">
                  <h3 className="text-sm font-extrabold uppercase tracking-wider text-stone-900 dark:text-white mb-3">Personal Information</h3>
                  <p className="text-xs text-stone-500 dark:text-stone-400 mb-4">We may collect:</p>
                  <ul className="space-y-2 text-sm text-stone-700 dark:text-stone-300">
                    {['Full Name', 'Email Address', 'Phone Number', 'Company Name', 'Business Information', 'Billing Information', 'Service Requirements'].map((item) => (
                      <li key={item} className="flex items-center gap-2">
                        <CheckCircle className="w-3.5 h-3.5 text-[#0A84FF] shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="p-5 rounded-2xl bg-white/40 dark:bg-stone-900/30 border border-white/40 dark:border-stone-800/50 shadow-xs">
                  <h3 className="text-sm font-extrabold uppercase tracking-wider text-stone-900 dark:text-white mb-3">Automatically Collected</h3>
                  <p className="text-xs text-stone-500 dark:text-stone-400 mb-4">When you visit our website, we automatically compile:</p>
                  <ul className="space-y-2 text-sm text-stone-700 dark:text-stone-300">
                    {['IP Address', 'Browser Type', 'Device Information', 'Operating System', 'Pages Visited', 'Time Spent on Website', 'Referring Website details'].map((item) => (
                      <li key={item} className="flex items-center gap-2">
                        <CheckCircle className="w-3.5 h-3.5 text-[#0A84FF] shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* Section 2 */}
            <div className="pt-8 space-y-4">
              <h2 className="text-xl font-bold text-stone-900 dark:text-white flex items-center gap-2.5">
                <span className="flex items-center justify-center w-7 h-7 rounded-lg bg-blue-50/80 dark:bg-[#0A84FF]/10 text-xs font-black text-[#0A84FF]">2</span>
                How We Use Your Information
              </h2>
              <div className="grid sm:grid-cols-2 gap-4">
                {[
                  'Provide requested services and support',
                  'Respond directly to queries and consultations',
                  'Create detailed custom proposals and blueprints',
                  'Process invoicing and secure billing operations',
                  'Improve digital frameworks and website services',
                  'Send critical service-related update alerts',
                  'Deliver focused, consenting marketing assets',
                  'Prevent digital fraud, breaches, and exploits'
                ].map((useCase, idx) => (
                  <div key={idx} className="flex gap-3 p-3.5 rounded-xl bg-white/30 dark:bg-stone-900/20 border border-white/20 dark:border-stone-900 shadow-2xs">
                    <span className="text-[#0A84FF] font-bold text-xs shrink-0 mt-0.5">✓</span>
                    <span className="text-sm font-medium">{useCase}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Section 3 */}
            <div className="pt-8 space-y-4">
              <h2 className="text-xl font-bold text-stone-900 dark:text-white flex items-center gap-2.5">
                <span className="flex items-center justify-center w-7 h-7 rounded-lg bg-blue-50/80 dark:bg-[#0A84FF]/10 text-xs font-black text-[#0A84FF]">3</span>
                Cookies & Tracking Technologies
              </h2>
              <p className="text-sm">
                Our platform integrates cookies and localized web indicators to enhance performance benchmarks, analyze routing structures, and remember specific performance specifications to optimize marketing automation.
              </p>
              <div className="p-4 bg-amber-50/50 dark:bg-amber-950/10 border border-amber-100/60 dark:border-amber-950/30 rounded-2xl text-xs text-amber-800 dark:text-amber-300">
                ⭐ <strong>Optimization Note:</strong> You hold full capabilities to adjust, decline, or purge browser cookies at any stage inside your system browser parameters.
              </div>
            </div>

            {/* Section 4 */}
            <div className="pt-8 space-y-4">
              <h2 className="text-xl font-bold text-stone-900 dark:text-white flex items-center gap-2.5">
                <span className="flex items-center justify-center w-7 h-7 rounded-lg bg-blue-50/80 dark:bg-[#0A84FF]/10 text-xs font-black text-[#0A84FF]">4</span>
                Third-Party Services
              </h2>
              <p className="text-sm">
                We pipeline operational assets through certified external digital ecosystems for seamless deployment. Trusted secure hubs include:
              </p>
              <div className="flex flex-wrap gap-2 pt-1">
                {['Google Analytics', 'Google Ads', 'Meta (Facebook & Instagram)', 'Secure Payment Processors', 'CRM Platforms', 'Email Delivery Engines', 'Cloud Node Environments'].map((serv) => (
                  <span key={serv} className="px-3.5 py-1.5 rounded-lg bg-neutral-100 dark:bg-stone-800 text-xs font-semibold text-stone-700 dark:text-stone-300 border border-neutral-200/50 dark:border-stone-700/50">
                    {serv}
                  </span>
                ))}
              </div>
              <p className="text-xs text-stone-400 dark:text-stone-500">
                These trusted providers operate under distinct individual privacy architectures and rules.
              </p>
            </div>

            {/* Section 5 */}
            <div className="pt-8 space-y-4">
              <h2 className="text-xl font-bold text-stone-900 dark:text-white flex items-center gap-2.5">
                <span className="flex items-center justify-center w-7 h-7 rounded-lg bg-blue-50/80 dark:bg-[#0A84FF]/10 text-xs font-black text-[#0A84FF]">5</span>
                Data Sharing Principles
              </h2>
              <p className="text-sm font-semibold text-stone-800 dark:text-stone-200">
                7Hive Media does not sell, rent, lease, or trade your critical personal credentials with external third parties.
              </p>
              <p className="text-sm text-stone-500 dark:text-stone-400">
                Sharing only occurs exclusively with qualified service processors executing specialized supporting roles, under legal disclosures, to defend legal structures, or during unified business restructuring/acquisitions.
              </p>
            </div>

            {/* Section 6 */}
            <div className="pt-8 space-y-4">
              <h2 className="text-xl font-bold text-stone-900 dark:text-white flex items-center gap-2.5">
                <span className="flex items-center justify-center w-7 h-7 rounded-lg bg-blue-50/80 dark:bg-[#0A84FF]/10 text-xs font-black text-[#0A84FF]">6</span>
                Secure Architectural Standards
              </h2>
              <p className="text-sm">
                Our servers integrate enterprise technical standards, SSL/TLS transmissions, and access restrictions to block malicious intrusions, modification, loss, or leakage. Despite maximum efforts, no digital channel achieves absolute immunity, and safe usage remains a cooperative effort.
              </p>
            </div>

            {/* Section 7 */}
            <div className="pt-8 space-y-4">
              <h2 className="text-xl font-bold text-stone-900 dark:text-white flex items-center gap-2.5">
                <span className="flex items-center justify-center w-7 h-7 rounded-lg bg-blue-50/80 dark:bg-[#0A84FF]/10 text-xs font-black text-[#0A84FF]">7</span>
                Data Retention
              </h2>
              <p className="text-sm">
                Information profiles remain stored exclusively for durations required to fulfill active service contracts, adhere to compliance obligations, settle disputes fairly, or maintain platform integrity.
              </p>
            </div>

            {/* Section 8 */}
            <div className="pt-8 space-y-4">
              <h2 className="text-xl font-bold text-stone-900 dark:text-white flex items-center gap-2.5">
                <span className="flex items-center justify-center w-7 h-7 rounded-lg bg-blue-50/80 dark:bg-[#0A84FF]/10 text-xs font-black text-[#0A84FF]">8</span>
                Your Legal Rights
              </h2>
              <p className="text-sm mb-4">
                You holding specific data protection capabilities, which include requesting:
              </p>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {[
                  'Access to Records',
                  'Correction of Mistakes',
                  'Deletion of Personal Data',
                  'Withdrawal of Consent',
                  'Restriction on Usage'
                ].map((right, idx) => (
                  <div key={idx} className="p-3 rounded-xl bg-[#0A84FF]/5 border border-[#0A84FF]/10 text-center text-xs font-bold text-[#0A84FF]">
                    {right}
                  </div>
                ))}
              </div>
            </div>

            {/* Section 9 */}
            <div className="pt-8 space-y-4">
              <h2 className="text-xl font-bold text-stone-900 dark:text-white flex items-center gap-2.5">
                <span className="flex items-center justify-center w-7 h-7 rounded-lg bg-blue-50/80 dark:bg-[#0A84FF]/10 text-xs font-black text-[#0A84FF]">9</span>
                Third-Party Redirections
              </h2>
              <p className="text-sm">
                Links pointing outside our scope lead to external sites beyond our oversight. Please consult individual privacy frameworks before routing sensitive data over unknown paths.
              </p>
            </div>

            {/* Section 10 */}
            <div className="pt-8 space-y-4">
              <h2 className="text-xl font-bold text-stone-900 dark:text-white flex items-center gap-2.5">
                <span className="flex items-center justify-center w-7 h-7 rounded-lg bg-blue-50/80 dark:bg-[#0A84FF]/10 text-xs font-black text-[#0A84FF]">10</span>
                Children's Policies
              </h2>
              <p className="text-sm">
                Our services are built exclusively for business entities and professional partners minimum 18 years old. We avoid compiling metrics or files of underage users.
              </p>
            </div>

            {/* Section 11 */}
            <div className="pt-8 space-y-4">
              <h2 className="text-xl font-bold text-stone-900 dark:text-white flex items-center gap-2.5">
                <span className="flex items-center justify-center w-7 h-7 rounded-lg bg-blue-50/80 dark:bg-[#0A84FF]/10 text-xs font-black text-[#0A84FF]">11</span>
                Policy Improvements
              </h2>
              <p className="text-sm">
                We update these practices as technology updates. All refinements publish immediately on this page with an updated timestamp record.
              </p>
            </div>

            {/* Section 12 */}
            <div className="pt-8 space-y-6">
              <h2 className="text-xl font-bold text-stone-900 dark:text-white flex items-center gap-2.5">
                <span className="flex items-center justify-center w-7 h-7 rounded-lg bg-blue-50/80 dark:bg-[#0A84FF]/10 text-xs font-black text-[#0A84FF]">12</span>
                Contact Information
              </h2>
              <div className="p-6 rounded-2xl bg-white/40 dark:bg-stone-900/30 border border-white/60 dark:border-stone-800 shadow-sm grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-extrabold text-[#0A84FF] text-lg mb-1">7Hive Media</h4>
                  <p className="text-xs font-medium text-stone-400 dark:text-stone-500">Building Digital Hives for Business Growth</p>
                </div>
                <div className="flex flex-col gap-2.5 justify-center">
                  <a href="mailto:hello@7hive.com" className="inline-flex items-center gap-2 text-sm font-semibold hover:text-[#0A84FF] transition-colors">
                    <Mail className="w-4 h-4 text-[#0A84FF]" />
                    hello@7hive.com
                  </a>
                  <a href="https://7hive.com" target="_blank" rel="noopener" className="inline-flex items-center gap-2 text-sm font-semibold hover:text-[#0A84FF] transition-colors">
                    <Globe className="w-4 h-4 text-[#0A84FF]" />
                    7hive.com
                    <ExternalLink className="w-3 h-3 text-stone-400" />
                  </a>
                </div>
              </div>
            </div>

          </div>

        </div>

        {/* Spatial Bottom Navigation */}
        <div className="mt-12 text-center">
          <button
            onClick={() => onNavigate('home')}
            className="inline-flex items-center justify-center text-xs font-bold uppercase tracking-wider px-8 py-4 rounded-full bg-[#0A84FF] hover:bg-sky-550 hover:bg-blue-600 text-white dark:text-neutral-900 transition-all shadow-[0_12px_40px_rgba(10,132,255,0.25),inset_0_1px_1px_rgba(255,255,255,0.4)] hover:-translate-y-0.5 active:translate-y-0 active:scale-95 cursor-pointer"
          >
            I Understand, Take Me Home
          </button>
        </div>

      </div>
    </motion.div>
  );
}

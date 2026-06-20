import React from 'react';
import { motion } from 'motion/react';
import { ArrowLeft, BookOpen, CheckCircle2, AlertTriangle, Scale, Mail, Globe, ExternalLink } from 'lucide-react';

interface TermsViewProps {
  onNavigate: (view: string) => void;
}

export function TermsView({ onNavigate }: TermsViewProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className="pt-24 pb-20 px-6 md:px-12 relative overflow-hidden"
    >
      {/* Liquid Glass Background Ambient Glows */}
      <div className="absolute top-20 right-[-100px] w-[500px] h-[500px] rounded-full bg-blue-400/10 dark:bg-[#0A84FF]/5 blur-[120px] pointer-events-none z-0 mix-blend-multiply" />
      <div className="absolute bottom-10 left-[-100px] w-[500px] h-[500px] rounded-full bg-indigo-400/15 dark:bg-indigo-600/5 blur-[130px] pointer-events-none z-0 mix-blend-multiply" />

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
                <Scale className="w-3 h-3 fill-[#0A84FF]/10" />
                Agreement Terms
              </div>
              <h1 className="text-3xl md:text-5xl font-black text-stone-900 dark:text-white tracking-tight leading-none">
                Terms & Conditions
              </h1>
              <p className="text-sm text-stone-500 dark:text-stone-400 mt-2 font-medium">
                Mutual Collaboration with Secure Framework Boundaries.
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
              These Terms and Conditions govern your use of the <strong className="text-[#0A84FF]">7Hive Media</strong> website and services.
            </p>
            <p className="p-4 bg-white/50 dark:bg-stone-800/40 border border-white/40 dark:border-stone-800 rounded-2xl text-sm italic text-stone-600 dark:text-stone-400 shadow-xs">
              By accessing our website or engaging our services, you agree to comply to these Terms. Please read them with attention.
            </p>
          </div>

          {/* Terms Sections */}
          <div className="space-y-8 divide-y divide-black/5 dark:divide-white/5">
            
            {/* Section 1 */}
            <div className="pt-8 first:pt-0 space-y-4">
              <h2 className="text-xl font-bold text-stone-900 dark:text-white flex items-center gap-2.5">
                <span className="flex items-center justify-center w-7 h-7 rounded-lg bg-blue-50/80 dark:bg-[#0A84FF]/10 text-xs font-black text-[#0A84FF]">1</span>
                Our Specialized Services
              </h2>
              <p className="text-sm">
                7Hive Media delivers custom business-engineering solutions and growth pipelines including but not limited to:
              </p>
              <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-3 pt-2">
                {[
                  'Website Development',
                  'Website-as-a-Service (WaaS)',
                  'SEO Services',
                  'Social Media Marketing',
                  'Google Ads Management',
                  'Meta Ads Management',
                  'Lead Generation Pipelines',
                  'Marketing Automation',
                  'CRM System Setup',
                  'Content Creation',
                  'Consulting Services'
                ].map((srv, idx) => (
                  <div key={idx} className="flex items-center gap-2 p-3 rounded-xl bg-white/40 dark:bg-stone-900/30 border border-white/30 dark:border-stone-800 shadow-2xs">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#0A84FF] shrink-0" />
                    <span className="text-xs font-semibold">{srv}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Section 2 */}
            <div className="pt-8 space-y-4">
              <h2 className="text-xl font-bold text-stone-900 dark:text-white flex items-center gap-2.5">
                <span className="flex items-center justify-center w-7 h-7 rounded-lg bg-blue-50/80 dark:bg-[#0A84FF]/10 text-xs font-black text-[#0A84FF]">2</span>
                Client Responsibilities
              </h2>
              <p className="text-sm">
                For smooth delivery benchmarks, clients covenant and agree to:
              </p>
              <ul className="space-y-2.5 text-sm">
                {[
                  'Provide highly accurate, updated parameters and guidelines',
                  'Supply content, design assets, and review approvals within reasonable timelines',
                  'Maintain totally lawful, authorized use of deliverables and service assets',
                  'Pay invoicing fees transparently according to mutual agreement schedules'
                ].map((item, idx) => (
                  <li key={idx} className="flex gap-3 text-stone-700 dark:text-stone-300">
                    <span className="text-[#0A84FF] font-bold">▶</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <div className="p-4 bg-amber-50/40 dark:bg-amber-950/10 border border-amber-100/60 dark:border-amber-950/30 rounded-2xl text-xs text-amber-800 dark:text-amber-300">
                ⚠️ <strong>Project Delay Clause:</strong> Delivery timelines may shift proportionally in case of client approval delays or missing materials.
              </div>
            </div>

            {/* Section 3 */}
            <div className="pt-8 space-y-4">
              <h2 className="text-xl font-bold text-stone-900 dark:text-white flex items-center gap-2.5">
                <span className="flex items-center justify-center w-7 h-7 rounded-lg bg-blue-50/80 dark:bg-[#0A84FF]/10 text-xs font-black text-[#0A84FF]">3</span>
                Payments & Billing Policies
              </h2>
              <p className="text-sm">
                All outstanding statements and invoices must be settled according to agreed payment milestones. Non-payment may trigger proportional results:
              </p>
              <div className="grid sm:grid-cols-2 gap-3 pt-1">
                {['Immediate Service Suspension', 'Subscription Website Pause', 'Platform Access Restrictions', 'Project Timeline Adjustments'].map((res, idx) => (
                  <div key={idx} className="p-3.5 rounded-xl bg-orange-50/45 dark:bg-orange-950/5 text-orange-850 dark:text-orange-350 border border-orange-100/40 dark:border-orange-950/30 text-xs font-bold flex items-center gap-2">
                    <AlertTriangle className="w-3.5 h-3.5 text-orange-500" />
                    {res}
                  </div>
                ))}
              </div>
              <p className="text-xs text-stone-400 dark:text-stone-500">
                All payments processed are non-refundable unless specified otherwise in direct legal agreements.
              </p>
            </div>

            {/* Section 4 */}
            <div className="pt-8 space-y-4">
              <h2 className="text-xl font-bold text-stone-900 dark:text-white flex items-center gap-2.5">
                <span className="flex items-center justify-center w-7 h-7 rounded-lg bg-blue-50/80 dark:bg-[#0A84FF]/10 text-xs font-black text-[#0A84FF]">4</span>
                Website-as-a-Service (WaaS)
              </h2>
              <p className="text-sm">
                Under flat rate sub-website models:
              </p>
              <ul className="space-y-2 text-sm text-stone-700 dark:text-stone-300 list-disc list-inside">
                <li>Website infrastructure remains direct physical property of 7Hive Media.</li>
                <li>Client receives temporary licensing keys to use the asset during paid schedules.</li>
                <li>Failing subscription requirements can launch instant website pause or removal.</li>
                <li>Full asset buyout and transfer relies under distinct custom billings.</li>
              </ul>
            </div>

            {/* Section 5 */}
            <div className="pt-8 space-y-4">
              <h2 className="text-xl font-bold text-stone-900 dark:text-white flex items-center gap-2.5">
                <span className="flex items-center justify-center w-7 h-7 rounded-lg bg-blue-50/80 dark:bg-[#0A84FF]/10 text-xs font-black text-[#0A84FF]">5</span>
                Intellectual Property Rights
              </h2>
              <p className="text-sm">
                Upon complete invoicing clearances:
              </p>
              <ul className="space-y-2 text-sm text-stone-700 dark:text-stone-300 list-disc list-inside">
                <li>Client-provided properties, images, and text content belong strictly to the client.</li>
                <li>Finished custom assets specifically developed and bought of client transfer to client ownership.</li>
              </ul>
              <p className="text-sm mt-3 font-semibold">
                7Hive Media retains absolute ownership rights over:
              </p>
              <p className="text-sm">
                Internal systems, programmatic frameworks, pre-made themes, automated code scripts, methodology benchmarks, and workflow utilities.
              </p>
            </div>

            {/* Section 6 */}
            <div className="pt-8 space-y-4">
              <h2 className="text-xl font-bold text-stone-900 dark:text-white flex items-center gap-2.5">
                <span className="flex items-center justify-center w-7 h-7 rounded-lg bg-blue-50/80 dark:bg-[#0A84FF]/10 text-xs font-black text-[#0A84FF]">6</span>
                Marketing & Revenue Disclaimers
              </h2>
              <div className="p-5 rounded-2xl bg-white/40 dark:bg-stone-900/30 border border-white/60 dark:border-stone-800 shadow-3xs space-y-3">
                <p className="text-xs font-bold uppercase tracking-widest text-[#0A84FF]">Guarantees Exclusion</p>
                <p className="text-sm leading-relaxed">
                  7Hive Media does not guarantee exact search engine positioning, targeted monthly leads volumes, exact revenue metrics, visual ad interactions, or closed sales outputs.
                </p>
                <p className="text-xs text-stone-500 dark:text-stone-400">
                  Performance targets remain influenced by fluctuating global search engine algorithms and independent market trends.
                </p>
              </div>
            </div>

            {/* Section 7 */}
            <div className="pt-8 space-y-4">
              <h2 className="text-xl font-bold text-stone-900 dark:text-white flex items-center gap-2.5">
                <span className="flex items-center justify-center w-7 h-7 rounded-lg bg-blue-50/80 dark:bg-[#0A84FF]/10 text-xs font-black text-[#0A84FF]">7</span>
                Limitation of Liability
              </h2>
              <p className="text-sm">
                Under absolute bounds allowed under statutes, 7Hive Media avoids direct liability for lost profits, structural system crashes, data failures, or any indirect/consequential outages. Total compiled liability is capped to fees processed over the active three-month timeline.
              </p>
            </div>

            {/* Section 8 */}
            <div className="pt-8 space-y-4">
              <h2 className="text-xl font-bold text-stone-900 dark:text-white flex items-center gap-2.5">
                <span className="flex items-center justify-center w-7 h-7 rounded-lg bg-blue-50/80 dark:bg-[#0A84FF]/10 text-xs font-black text-[#0A84FF]">8</span>
                Third-Party Ecosystems
              </h2>
              <p className="text-sm">
                Integrations connect clients to external ecosystems (Google, Meta, global CRM suites, etc.). We are not responsible for software updates, downtime, policy shifts, or API terminations forced by these platforms.
              </p>
            </div>

            {/* Section 9 */}
            <div className="pt-8 space-y-4">
              <h2 className="text-xl font-bold text-stone-900 dark:text-white flex items-center gap-2.5">
                <span className="flex items-center justify-center w-7 h-7 rounded-lg bg-blue-50/80 dark:bg-[#0A84FF]/10 text-xs font-black text-[#0A84FF]">9</span>
                Confidentiality Covenants
              </h2>
              <p className="text-sm">
                Both parties protect sensitive operational metrics, system blueprints, strategy logs, financial details, and target data against external leakages with absolute professional care.
              </p>
            </div>

            {/* Section 10 */}
            <div className="pt-8 space-y-4">
              <h2 className="text-xl font-bold text-stone-900 dark:text-white flex items-center gap-2.5">
                <span className="flex items-center justify-center w-7 h-7 rounded-lg bg-blue-50/80 dark:bg-[#0A84FF]/10 text-xs font-black text-[#0A84FF]">10</span>
                Agreement Termination
              </h2>
              <p className="text-sm">
                Either party is empowered to close agreements using written notice profiles. Invoicing liabilities remain fully payable post-termination, and licensing keys reset on expiration.
              </p>
            </div>

            {/* Section 11 */}
            <div className="pt-8 space-y-4">
              <h2 className="text-xl font-bold text-stone-900 dark:text-white flex items-center gap-2.5">
                <span className="flex items-center justify-center w-7 h-7 rounded-lg bg-blue-50/80 dark:bg-[#0A84FF]/10 text-xs font-black text-[#0A84FF]">11</span>
                Forbidden System Access
              </h2>
              <p className="text-sm">
                Users are strictly forbidden from executing code attacks, hosting deceptive or unlawful landing pages, copying core agency assets, or distributing malicious files.
              </p>
            </div>

            {/* Section 12 */}
            <div className="pt-8 space-y-4">
              <h2 className="text-xl font-bold text-stone-900 dark:text-white flex items-center gap-2.5">
                <span className="flex items-center justify-center w-7 h-7 rounded-lg bg-blue-50/80 dark:bg-[#0A84FF]/10 text-xs font-black text-[#0A84FF]">12</span>
                Governing Jurisdiction
              </h2>
              <p className="text-sm">
                These conditions operate under the legal frameworks of **India**. Any legal actions find exclusive settlement domains inside the qualified courts of <strong className="text-stone-900 dark:text-white">New Delhi, India</strong>.
              </p>
            </div>

            {/* Section 13 */}
            <div className="pt-8 space-y-4">
              <h2 className="text-xl font-bold text-stone-900 dark:text-white flex items-center gap-2.5">
                <span className="flex items-center justify-center w-7 h-7 rounded-lg bg-blue-50/80 dark:bg-[#0A84FF]/10 text-xs font-black text-[#0A84FF]">13</span>
                Terms Restructures
              </h2>
              <p className="text-sm">
                We retain absolute authority to refine, expand, or adjust these parameters at any point. Continued utilization of our assets binds users to revised specifications.
              </p>
            </div>

            {/* Section 14 */}
            <div className="pt-8 space-y-6">
              <h2 className="text-xl font-bold text-stone-900 dark:text-white flex items-center gap-2.5">
                <span className="flex items-center justify-center w-7 h-7 rounded-lg bg-blue-50/80 dark:bg-[#0A84FF]/10 text-xs font-black text-[#0A84FF]">14</span>
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
            I Accept These Terms, Take Me Home
          </button>
        </div>

      </div>
    </motion.div>
  );
}

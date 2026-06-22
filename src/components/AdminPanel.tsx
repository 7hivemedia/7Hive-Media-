import React, { useState, useEffect } from 'react';
import { 
  Database, ShieldAlert, CheckCircle, ShieldCheck, Trash2, Plus, Edit3, 
  Settings, Link2, KeyRound, Copy, Check, FileText, Globe, MessageSquare, 
  HelpCircle, UserCheck, LayoutGrid, Sparkles, LogOut, ArrowUpRight, Search, 
  Trash, ChevronRight, RefreshCw, Layers, Calendar, Star, HelpCircle as HelpIcon,
  Tag
} from 'lucide-react';
import { dynamicStore, SEOItem, SUPABASE_SQL_SETUP } from '../lib/dynamicStore';
import { Service, CaseStudy, Testimonial, FAQItem, BlogPost, OnboardingState } from '../types';
import { SERVICES, CASE_STUDIES, TESTIMONIALS, FAQS, BLOG_POSTS } from '../data';

interface AdminPanelProps {
  onNavigate: (view: string) => void;
}

type AdminTab = 'leads' | 'blogs' | 'seo' | 'testimonials' | 'faqs' | 'services' | 'works' | 'settings';

export function AdminPanel({ onNavigate }: AdminPanelProps) {
  // Authorization check
  const [authorized, setAuthorized] = useState(false);
  
  // App states loaded from store
  const [leads, setLeads] = useState<any[]>([]);
  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  const [seoConfig, setSeoConfig] = useState<SEOItem[]>([]);
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [faqs, setFaqs] = useState<FAQItem[]>([]);
  const [services, setServices] = useState<Service[]>([]);
  const [caseStudies, setCaseStudies] = useState<CaseStudy[]>([]);

  // Selected tab
  const [activeTab, setActiveTab] = useState<AdminTab>('leads');
  const [isLoading, setIsLoading] = useState(true);
  const [statusMsg, setStatusMsg] = useState<{ text: string; type: 'success' | 'error' | '' }>({ text: '', type: '' });

  // Supabase state
  const [supabaseUrl, setSupabaseUrl] = useState('');
  const [supabaseAnonKey, setSupabaseAnonKey] = useState('');
  const [isConnected, setIsConnected] = useState(false);
  const [copiedSql, setCopiedSql] = useState(false);
  const [seedLog, setSeedLog] = useState('');
  const [isSeeding, setIsSeeding] = useState(false);

  // Administrative password settings state
  const [adminPassword, setAdminPassword] = useState('');

  // Editing forms state
  // Generic IDs to check if editing existing item
  const [editId, setEditId] = useState<string | null>(null);

  // SEO Editing states (holds the fields for the active SEO editing)
  const [seoPageId, setSeoPageId] = useState('home');
  const [seoTitle, setSeoTitle] = useState('');
  const [seoDesc, setSeoDesc] = useState('');
  const [seoKeywords, setSeoKeywords] = useState('');

  // Blog Form state
  const [blogTitle, setBlogTitle] = useState('');
  const [blogDesc, setBlogDesc] = useState('');
  const [blogTag, setBlogTag] = useState('');
  const [blogDate, setBlogDate] = useState('');
  const [blogVisual, setBlogVisual] = useState('Globe');

  // Testimonial Form state
  const [testStars, setTestStars] = useState(5);
  const [testText, setTestText] = useState('');
  const [testAuthor, setTestAuthor] = useState('');
  const [testRole, setTestRole] = useState('');
  const [testAvatar, setTestAvatar] = useState('');

  // FAQ Form State
  const [faqQuestion, setFaqQuestion] = useState('');
  const [faqAnswer, setFaqAnswer] = useState('');
  const [faqCategory, setFaqCategory] = useState<'general' | 'services' | 'automation' | 'pricing'>('general');

  // Services Form state
  const [svcTitle, setSvcTitle] = useState('');
  const [svcDesc, setSvcDesc] = useState('');
  const [svcCategory, setSvcCategory] = useState<'dev' | 'marketing' | 'automation'>('dev');
  const [svcIcon, setSvcIcon] = useState('Globe');
  const [svcOutcome, setSvcOutcome] = useState('');
  const [svcBenefits, setSvcBenefits] = useState('');

  // Case Studies (Client work) Form State
  const [workTitle, setWorkTitle] = useState('');
  const [workDesc, setWorkDesc] = useState('');
  const [workIndustry, setWorkIndustry] = useState('');
  const [workCategory, setWorkCategory] = useState<'lead-gen' | 'local' | 'seo'>('lead-gen');
  const [workIcon, setWorkIcon] = useState('Layers');
  const [metric1Val, setMetric1Val] = useState('');
  const [metric1Lbl, setMetric1Lbl] = useState('');
  const [metric2Val, setMetric2Val] = useState('');
  const [metric2Lbl, setMetric2Lbl] = useState('');
  const [metric3Val, setMetric3Val] = useState('');
  const [metric3Lbl, setMetric3Lbl] = useState('');

  // Form panels toggle
  const [showItemForm, setShowItemForm] = useState(false);

  // Auth Protection verification
  useEffect(() => {
    const isAuth = sessionStorage.getItem('7hive_admin_authorized');
    if (isAuth === 'true') {
      setAuthorized(true);
    } else {
      // Redirect to login page
      onNavigate('login');
    }
  }, [onNavigate]);

  // Load backend variables
  useEffect(() => {
    if (!authorized) return;
    loadAllData();
    const config = dynamicStore.getSupabaseConfig();
    setSupabaseUrl(config.url);
    setSupabaseAnonKey(config.key);
    setAdminPassword(dynamicStore.getAdminPassword());
  }, [authorized]);

  // Test Connection status whenever URL or Key updates
  useEffect(() => {
    if (!authorized) return;
    testSupabaseConnection();
  }, [supabaseUrl, supabaseAnonKey, authorized]);

  const loadAllData = async () => {
    setIsLoading(true);
    try {
      const liveServices = await dynamicStore.getServices();
      const liveCaseStudies = await dynamicStore.getCaseStudies();
      const liveTestimonials = await dynamicStore.getTestimonials();
      const liveFAQs = await dynamicStore.getFAQs();
      const liveBlogs = await dynamicStore.getBlogs();
      const liveLeads = await dynamicStore.getLeads();
      const liveSeo = await dynamicStore.getSEOConfig();

      setServices(liveServices);
      setCaseStudies(liveCaseStudies);
      setTestimonials(liveTestimonials);
      setFaqs(liveFAQs);
      setBlogs(liveBlogs);
      setLeads(liveLeads);
      setSeoConfig(liveSeo);

      // Pre-fill initial SEO active page fields
      const homeSeo = liveSeo.find(s => s.page_id === seoPageId);
      if (homeSeo) {
        setSeoTitle(homeSeo.title);
        setSeoDesc(homeSeo.description);
        setSeoKeywords(homeSeo.keywords);
      }
    } catch (err) {
      console.error("Load backend error", err);
    } finally {
      setIsLoading(false);
    }
  };

  const testSupabaseConnection = async () => {
    const client = dynamicStore.createSupabase();
    if (!client) {
      setIsConnected(false);
      return;
    }
    try {
      // Try a simple select count on schemas
      const { error } = await client.from('seo_config').select('page_id').limit(1);
      if (error) {
        setIsConnected(false);
      } else {
        setIsConnected(true);
      }
    } catch (e) {
      setIsConnected(false);
    }
  };

  const showBriefStatus = (text: string, type: 'success' | 'error') => {
    setStatusMsg({ text, type });
    setTimeout(() => setStatusMsg({ text: '', type: '' }), 5000);
  };

  const handleLogout = () => {
    sessionStorage.removeItem('7hive_admin_authorized');
    onNavigate('login');
  };

  const copySqlToClipboard = () => {
    navigator.clipboard.writeText(SUPABASE_SQL_SETUP);
    setCopiedSql(true);
    setTimeout(() => setCopiedSql(false), 2000);
    showBriefStatus("SQL Schema copied to clipboard!", "success");
  };

  const handleSaveConnectionSettings = () => {
    dynamicStore.saveLocalSupabaseConfig(supabaseUrl, supabaseAnonKey);
    showBriefStatus("Connection parameters updated! Testing handshake status...", "success");
    testSupabaseConnection();
  };

  const handleClearConnectionSettings = () => {
    setSupabaseUrl('');
    setSupabaseAnonKey('');
    dynamicStore.saveLocalSupabaseConfig('', '');
    showBriefStatus("Supabase connection details cleared from client session.", "success");
    localStorage.removeItem('7hive_supabase_url');
    localStorage.removeItem('7hive_supabase_anon_key');
    setIsConnected(false);
  };

  const handleSaveAdminPassword = () => {
    if (!adminPassword.trim()) {
      showBriefStatus("Passphrase cannot be empty.", "error");
      return;
    }
    dynamicStore.setAdminPassword(adminPassword);
    showBriefStatus(`Administrator passphrase updated successfully to "${adminPassword}"`, "success");
  };

  const handleSeedAction = async () => {
    setIsSeeding(true);
    setSeedLog("Sending seed request...");
    try {
      const res = await dynamicStore.seedSupabase();
      setSeedLog(res.log);
      if (res.success) {
        showBriefStatus("Supabase database tables successfully synchronized!", "success");
        loadAllData();
        testSupabaseConnection();
      } else {
        showBriefStatus("Sync failed. Check logs for details.", "error");
      }
    } catch (e: any) {
      setSeedLog(`Seeding Error: ${e.message || e}`);
      showBriefStatus("Synchronization terminated with errors.", "error");
    } finally {
      setIsSeeding(false);
    }
  };

  // SEO Editing Tab Change
  const selectSeoPageItem = (pageId: string) => {
    setSeoPageId(pageId);
    const item = seoConfig.find(s => s.page_id === pageId);
    if (item) {
      setSeoTitle(item.title);
      setSeoDesc(item.description);
      setSeoKeywords(item.keywords);
    } else {
      setSeoTitle('');
      setSeoDesc('');
      setSeoKeywords('');
    }
  };

  const handleSaveSEOElement = async () => {
    const updated = seoConfig.map(s => {
      if (s.page_id === seoPageId) {
        return { page_id: seoPageId, title: seoTitle, description: seoDesc, keywords: seoKeywords };
      }
      return s;
    });

    if (!seoConfig.some(s => s.page_id === seoPageId)) {
      updated.push({ page_id: seoPageId, title: seoTitle, description: seoDesc, keywords: seoKeywords });
    }

    setSeoConfig(updated);
    const res = await dynamicStore.saveSEOConfig(updated);
    if (res) {
      showBriefStatus(`SEO Tags for [${seoPageId}] written to database!`, "success");
    } else {
      showBriefStatus("Failed to submit to Supabase. Cached locally instead.", "error");
    }
  };

  // LEADS ACTIONS
  const handleDeleteLead = async (id: string) => {
    if (window.confirm("Verify deleting this capture lead? This action is non-reversible.")) {
      const res = await dynamicStore.deleteLead(id);
      if (res) {
        showBriefStatus("Lead permanently purged.", "success");
        setLeads(leads.filter(l => l.id !== id));
      } else {
        showBriefStatus("Purge execution failed on database.", "error");
      }
    }
  };

  // BLOG CRUD
  const initCreateBlog = () => {
    setEditId(null);
    setBlogTitle('');
    setBlogDesc('');
    setBlogTag('Growth');
    setBlogDate(new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }));
    setBlogVisual('Globe');
    setShowItemForm(true);
  };

  const editBlogItem = (item: BlogPost) => {
    setEditId(item.id);
    setBlogTitle(item.title);
    setBlogDesc(item.desc);
    setBlogTag(item.tag);
    setBlogDate(item.date);
    setBlogVisual(item.visual);
    setShowItemForm(true);
  };

  const handleSaveBlog = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!blogTitle || !blogDesc) {
      showBriefStatus("Please fill in basic uploader fields.", "error");
      return;
    }

    const id = editId || `blog-${Math.random().toString(36).substring(2, 7)}`;
    const newBlogItem: BlogPost = { id, title: blogTitle, desc: blogDesc, tag: blogTag, date: blogDate, visual: blogVisual };
    
    let updatedBlogs = [...blogs];
    if (editId) {
      updatedBlogs = updatedBlogs.map(b => b.id === editId ? newBlogItem : b);
    } else {
      updatedBlogs.unshift(newBlogItem);
    }

    setBlogs(updatedBlogs);
    const res = await dynamicStore.saveBlogs(updatedBlogs);
    setShowItemForm(false);
    if (res) {
      showBriefStatus(`Blog article successfully ${editId ? 'rewritten' : 'published'}!`, "success");
    } else {
      showBriefStatus("Published locally. Supabase write failed.", "error");
    }
  };

  const handleDeleteBlog = async (id: string) => {
    if (window.confirm("Purge selected blog entry?")) {
      const updated = blogs.filter(b => b.id !== id);
      setBlogs(updated);
      const res = await dynamicStore.saveBlogs(updated);
      showBriefStatus("Blog post removed.", res ? "success" : "error");
    }
  };

  // TESTIMONIAL CRUD
  const initCreateTestimonial = () => {
    setEditId(null);
    setTestText('');
    setTestStars(5);
    setTestAuthor('');
    setTestRole('');
    setTestAvatar('');
    setShowItemForm(true);
  };

  const editTestimonialItem = (item: Testimonial) => {
    setEditId(item.id);
    setTestText(item.text);
    setTestStars(item.stars);
    setTestAuthor(item.author);
    setTestRole(item.role);
    setTestAvatar(item.avatarInitials);
    setShowItemForm(true);
  };

  const handleSaveTestimonial = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!testText || !testAuthor || !testRole) {
      showBriefStatus("Please fill in main testimonial blocks.", "error");
      return;
    }

    const id = editId || `t-${Math.random().toString(36).substring(2, 7)}`;
    const initials = testAvatar.trim().toUpperCase() || testAuthor.slice(0, 2).toUpperCase();
    const item: Testimonial = { id, stars: testStars, text: testText, author: testAuthor, avatarInitials: initials, role: testRole };

    let updatedList = [...testimonials];
    if (editId) {
      updatedList = updatedList.map(t => t.id === editId ? item : t);
    } else {
      updatedList.push(item);
    }

    setTestimonials(updatedList);
    const res = await dynamicStore.saveTestimonials(updatedList);
    setShowItemForm(false);
    showBriefStatus(`Testimonial saved ${res ? 'and database synced' : 'locally'}!`, res ? 'success' : 'error');
  };

  const handleDeleteTestimonial = async (id: string) => {
    if (window.confirm("Remove testimonial?")) {
      const updated = testimonials.filter(t => t.id !== id);
      setTestimonials(updated);
      const res = await dynamicStore.saveTestimonials(updated);
      showBriefStatus("Testimonial deleted.", res ? "success" : "error");
    }
  };

  // FAQ CRUD
  const initCreateFAQ = () => {
    setEditId(null);
    setFaqQuestion('');
    setFaqAnswer('');
    setFaqCategory('general');
    setShowItemForm(true);
  };

  const editFAQItem = (item: FAQItem) => {
    setEditId(item.id);
    setFaqQuestion(item.question);
    setFaqAnswer(item.answer);
    setFaqCategory(item.category);
    setShowItemForm(true);
  };

  const handleSaveFAQ = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!faqQuestion || !faqAnswer) {
      showBriefStatus("Missing FAQ blocks.", "error");
      return;
    }

    const id = editId || `faq-${Math.random().toString(36).substring(2, 7)}`;
    const item: FAQItem = { id, question: faqQuestion, answer: faqAnswer, category: faqCategory };

    let updatedList = [...faqs];
    if (editId) {
      updatedList = updatedList.map(f => f.id === editId ? item : f);
    } else {
      updatedList.push(item);
    }

    setFaqs(updatedList);
    const res = await dynamicStore.saveFAQs(updatedList);
    setShowItemForm(false);
    showBriefStatus(`FAQ Registry saved ${res ? 'and database synced' : 'locally'}!`, res ? 'success' : 'error');
  };

  const handleDeleteFAQ = async (id: string) => {
    if (window.confirm("Purge selected FAQ node?")) {
      const updated = faqs.filter(f => f.id !== id);
      setFaqs(updated);
      const res = await dynamicStore.saveFAQs(updated);
      showBriefStatus("FAQ deleted.", res ? "success" : "error");
    }
  };

  // SERVICES CRUD
  const initCreateService = () => {
    setEditId(null);
    setSvcTitle('');
    setSvcDesc('');
    setSvcCategory('dev');
    setSvcIcon('Globe');
    setSvcOutcome('');
    setSvcBenefits('');
    setShowItemForm(true);
  };

  const editServiceItem = (item: Service) => {
    setEditId(item.id);
    setSvcTitle(item.title);
    setSvcDesc(item.desc);
    setSvcCategory(item.category);
    setSvcIcon(item.icon);
    setSvcOutcome(item.outcome);
    setSvcBenefits(item.benefits.join(', '));
    setShowItemForm(true);
  };

  const handleSaveService = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!svcTitle || !svcDesc) {
      showBriefStatus("Service blocks cannot be empty.", "error");
      return;
    }

    const id = editId || `service-${Math.random().toString(36).substring(2, 7)}`;
    const benefitsArr = svcBenefits.split(',').map(b => b.trim()).filter(b => b);
    const item: Service = {
      id,
      title: svcTitle,
      desc: svcDesc,
      category: svcCategory,
      icon: svcIcon,
      outcome: svcOutcome || 'Significant conversion increase',
      benefits: benefitsArr.length > 0 ? benefitsArr : ['Premium Quality', 'Instant Support']
    };

    let updatedList = [...services];
    if (editId) {
      updatedList = updatedList.map(s => s.id === editId ? item : s);
    } else {
      updatedList.push(item);
    }

    setServices(updatedList);
    const res = await dynamicStore.saveServices(updatedList);
    setShowItemForm(false);
    showBriefStatus(`Service Saved ${res ? 'and synced' : 'locally'}!`, res ? 'success' : 'error');
  };

  const handleDeleteService = async (id: string) => {
    if (window.confirm("Delete services element?")) {
      const updated = services.filter(s => s.id !== id);
      setServices(updated);
      const res = await dynamicStore.saveServices(updated);
      showBriefStatus("Service deleted.", res ? "success" : "error");
    }
  };

  // CASE STUDIES CRUD
  const initCreateWork = () => {
    setEditId(null);
    setWorkTitle('');
    setWorkDesc('');
    setWorkIndustry('');
    setWorkCategory('lead-gen');
    setWorkIcon('Layers');
    setMetric1Val(''); setMetric1Lbl('');
    setMetric2Val(''); setMetric2Lbl('');
    setMetric3Val(''); setMetric3Lbl('');
    setShowItemForm(true);
  };

  const editWorkItem = (item: CaseStudy) => {
    setEditId(item.id);
    setWorkTitle(item.title);
    setWorkDesc(item.desc);
    setWorkIndustry(item.industry);
    setWorkCategory(item.category);
    setWorkIcon(item.icon || 'Layers');
    
    // metrics array
    setMetric1Val(item.metrics[0]?.value || '');
    setMetric1Lbl(item.metrics[0]?.label || '');
    setMetric2Val(item.metrics[1]?.value || '');
    setMetric2Lbl(item.metrics[1]?.label || '');
    setMetric3Val(item.metrics[2]?.value || '');
    setMetric3Lbl(item.metrics[2]?.label || '');
    
    setShowItemForm(true);
  };

  const handleSaveWork = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!workTitle || !workDesc || !workIndustry) {
      showBriefStatus("Please fill in title context.", "error");
      return;
    }

    const id = editId || `cs-${Math.random().toString(36).substring(2, 7)}`;
    const metricsArr = [];
    if (metric1Val || metric1Lbl) metricsArr.push({ value: metric1Val, label: metric1Lbl });
    if (metric2Val || metric2Lbl) metricsArr.push({ value: metric2Val, label: metric2Lbl });
    if (metric3Val || metric3Lbl) metricsArr.push({ value: metric3Val, label: metric3Lbl });

    const item: CaseStudy = {
      id,
      title: workTitle,
      desc: workDesc,
      industry: workIndustry,
      category: workCategory,
      icon: workIcon,
      metrics: metricsArr.length > 0 ? metricsArr : [{ value: '3x', label: 'Conversions Boosted' }]
    };

    let updatedList = [...caseStudies];
    if (editId) {
      updatedList = updatedList.map(c => c.id === editId ? item : c);
    } else {
      updatedList.push(item);
    }

    setCaseStudies(updatedList);
    const res = await dynamicStore.saveCaseStudies(updatedList);
    setShowItemForm(false);
    showBriefStatus(`Client work case study saved ${res ? 'and synced' : 'locally'}!`, res ? "success" : "error");
  };

  const handleDeleteWork = async (id: string) => {
    if (window.confirm("Purge selected client work record?")) {
      const updated = caseStudies.filter(c => c.id !== id);
      setCaseStudies(updated);
      const res = await dynamicStore.saveCaseStudies(updated);
      showBriefStatus("Client work deleted.", res ? "success" : "error");
    }
  };

  if (!authorized) {
    return (
      <div className="pt-24 text-center min-h-screen flex items-center justify-center font-bold">
        Checking authorization rules...
      </div>
    );
  }

  const sidebarMenu: { id: AdminTab; label: string; icon: any }[] = [
    { id: 'leads', label: 'Forms Inbox', icon: MessageSquare },
    { id: 'blogs', label: 'Blog Composer', icon: FileText },
    { id: 'seo', label: 'SEO tags', icon: Globe },
    { id: 'services', label: 'Services', icon: Layers },
    { id: 'works', label: 'Client Works', icon: LayoutGrid },
    { id: 'testimonials', label: 'Testimonials', icon: Star },
    { id: 'faqs', label: 'FAQs Nodes', icon: HelpIcon },
    { id: 'settings', label: 'System & DB Link', icon: Settings },
  ];

  return (
    <div className="pt-20 min-h-screen bg-[#f9fafb] dark:bg-[#121212] text-neutral-800 dark:text-neutral-200 transition-colors duration-300">
      
      {/* Visual background glows */}
      <div className="absolute top-20 left-0 w-80 h-80 bg-blue-500/5 dark:bg-blue-400/5 rounded-full blur-[100px] select-none pointer-events-none" />
      <div className="absolute bottom-10 right-0 w-80 h-80 bg-amber-500/5 dark:bg-amber-400/5 rounded-full blur-[100px] select-none pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 py-8 relative z-10 space-y-6">
        
        {/* Top Header details */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-black/5 dark:border-white/10">
          <div className="space-y-1">
            <h1 className="text-3xl font-extrabold tracking-tight flex items-center gap-2 text-[#0A84FF]">
              <Database className="w-8 h-8" />
              Administrative Control Deck
            </h1>
            <p className="text-xs text-neutral-500 dark:text-neutral-400">
              Complete full-stack platform uploader. Modify content variables live, view captured lead workflows, and synchronize database collections.
            </p>
          </div>
          <div className="flex items-center gap-3">
            {/* Supabase status badge */}
            <div className={`px-3.5 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-wider flex items-center gap-2 shrink-0 border ${
              isConnected 
                ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20' 
                : 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20'
            }`}>
              <div className={`w-2 h-2 rounded-full ${isConnected ? 'bg-emerald-500 animate-pulse' : 'bg-amber-500'}`} />
              Supabase Backend: {isConnected ? 'Synchronized' : 'Offline Mode (Local Cache)'}
            </div>

            <button
              onClick={handleLogout}
              className="px-4 py-2 border border-black/10 dark:border-white/10 rounded-full text-xs font-bold uppercase tracking-wider hover:bg-red-500/10 hover:text-red-600 transition-colors cursor-pointer flex items-center gap-1.5"
            >
              <LogOut className="w-3.5 h-3.5" />
              Exit
            </button>
          </div>
        </div>

        {/* Temporary brief notification banner */}
        {statusMsg.text && (
          <div className={`p-4 rounded-2xl text-xs font-semibold flex items-center gap-3 border animate-fade-in ${
            statusMsg.type === 'success' 
              ? 'bg-green-500/10 text-green-600 dark:text-green-400 border-green-500/20'
              : 'bg-red-500/10 text-red-600 dark:text-red-400 border-red-500/20'
          }`}>
            {statusMsg.type === 'success' ? <CheckCircle className="w-5 h-5 text-green-500" /> : <ShieldAlert className="w-5 h-5 text-red-500" />}
            <span>{statusMsg.text}</span>
          </div>
        )}

        {/* Outer Desktop Structure (Sidebar + Tab Content Panel) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Navigation Sidebar */}
          <div className="lg:col-span-3 bg-white dark:bg-[#1a1a1a] rounded-3xl border border-black/5 dark:border-white/10 p-5 space-y-2">
            <p className="text-[10px] font-bold text-neutral-400 dark:text-neutral-500 uppercase tracking-widest pl-3 pb-1">
              Resource Subdivisions
            </p>
            {sidebarMenu.map((itm) => {
              const Icon = itm.icon;
              const isSelected = activeTab === itm.id;
              return (
                <button
                  key={itm.id}
                  onClick={() => {
                    setActiveTab(itm.id);
                    setShowItemForm(false);
                  }}
                  className={`w-full py-3 px-4 rounded-xl text-xs font-bold transition-all flex items-center justify-between group cursor-pointer select-none ${
                    isSelected
                      ? 'bg-[#0A84FF] text-white shadow-sm'
                      : 'text-neutral-500 hover:text-black dark:hover:text-white hover:bg-neutral-50 dark:hover:bg-[#1c1c1c]'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon className="w-4 h-4" />
                    <span>{itm.label}</span>
                  </div>
                  <ChevronRight className={`w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-all ${
                    isSelected ? 'translate-x-0 opacity-100' : '-translate-x-1'
                  }`} />
                </button>
              );
            })}
          </div>

          {/* ACTIVE TAB VIEW PANEL */}
          <div className="lg:col-span-9 bg-white dark:bg-[#1a1a1a] rounded-3xl border border-black/5 dark:border-white/10 p-6 min-h-[500px]">
            {isLoading ? (
              <div className="h-96 flex flex-col items-center justify-center gap-4">
                <RefreshCw className="w-8 h-8 text-[#0A84FF] animate-spin" />
                <p className="text-xs text-neutral-400 font-mono">Loading dynamic system registries...</p>
              </div>
            ) : (
              <>
                
                {/* 1. SECURED FORMS INBOX TAB */}
                {activeTab === 'leads' && (
                  <div className="space-y-6">
                    <div className="flex items-center justify-between pb-4 border-b border-black/5 dark:border-white/5">
                      <div>
                        <h2 className="text-lg font-extrabold flex items-center gap-2">
                          <MessageSquare className="w-5 h-5 text-[#0A84FF]" />
                          Captured Leads ({leads.length})
                        </h2>
                        <p className="text-xs text-neutral-500 dark:text-neutral-400">Incoming blueprint proposals generated from your Contact onboarding form.</p>
                      </div>
                      {leads.length > 0 && (
                        <button
                          onClick={() => {
                            const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(leads, null, 2));
                            const dn = document.createElement('a');
                            dn.setAttribute("href", dataStr);
                            dn.setAttribute("download", `7hive_captured_leads_backup.json`);
                            dn.click();
                          }}
                          className="px-3 py-1.5 bg-neutral-100 dark:bg-neutral-800 text-[10px] font-bold rounded-lg uppercase tracking-wider hover:bg-neutral-200 cursor-pointer"
                        >
                          Export Leads (JSON)
                        </button>
                      )}
                    </div>

                    {leads.length === 0 ? (
                      <div className="py-20 text-center border-2 border-dashed border-black/5 dark:border-white/5 rounded-2xl max-w-lg mx-auto space-y-3">
                        <MessageSquare className="w-12 h-12 text-neutral-300 mx-auto" />
                        <h4 className="font-bold text-neutral-400 uppercase tracking-widest text-xs">No entries collected yet</h4>
                        <p className="text-xs text-neutral-500 dark:text-neutral-400 max-w-xs mx-auto leading-relaxed">
                          Once business operators requests proposals using your digital onboarding funnel, they will register here instantly.
                        </p>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        {leads.map((lead) => (
                          <div 
                            key={lead.id} 
                            className="p-5 bg-neutral-50 dark:bg-[#121212] border border-black/5 dark:border-white/5 rounded-2xl relative space-y-4"
                          >
                            <button
                              onClick={() => handleDeleteLead(lead.id)}
                              className="absolute top-4 right-4 p-2 text-neutral-400 hover:text-red-500 hover:bg-red-500/10 rounded-lg transition-colors cursor-pointer"
                              title="Delete lead entry"
                            >
                              <Trash2 className="w-4.5 h-4.5" />
                            </button>
                            
                            {/* Metadata row */}
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                              <div>
                                <span className="text-[10px] uppercase font-bold text-neutral-400 block mb-0.5">Author (Full Name)</span>
                                <span className="text-xs font-bold text-stone-900 dark:text-white leading-tight block">{lead.fullName}</span>
                                <span className="text-[10px] text-neutral-500 font-mono block">{lead.emailAddr}</span>
                                {lead.contactNumber && (
                                  <span className="text-[10px] text-neutral-500 font-medium block mt-0.5">📞 {lead.contactNumber}</span>
                                )}
                              </div>
                              <div>
                                <span className="text-[10px] uppercase font-bold text-neutral-400 block mb-0.5">Company Profile</span>
                                <span className="text-xs font-semibold block">{lead.companyName || '— Nil —'}</span>
                                {lead.websiteUrl && (
                                  <a 
                                    href={lead.websiteUrl} 
                                    target="_blank" 
                                    rel="noreferrer" 
                                    className="text-[10px] text-[#0A84FF] font-mono hover:underline flex items-center gap-1 mt-0.5"
                                  >
                                    <Link2 className="w-3 h-3" /> Visit Site
                                  </a>
                                )}
                              </div>
                              <div>
                                <span className="text-[10px] uppercase font-bold text-neutral-400 block mb-0.5">Budget Class / Date</span>
                                <span className="text-xs font-bold text-sky-600 dark:text-sky-400 block">
                                  {lead.budget === 'under-50k' ? 'Below ₹50k' : lead.budget === '50k-2l' ? '₹50k - ₹2L' : lead.budget === 'above-2l' ? '₹2L+' : 'Unspecified'}
                                </span>
                                <span className="text-[9px] text-neutral-400 font-mono block mt-0.5">
                                  {new Date(lead.created_at || Date.now()).toLocaleString()}
                                </span>
                              </div>
                            </div>

                            {/* Chosen services */}
                            {lead.services && lead.services.length > 0 && (
                              <div className="space-y-1">
                                <span className="text-[9px] uppercase font-bold text-[#0A84FF] block">Required Capabilities:</span>
                                <div className="flex flex-wrap gap-1.5">
                                  {lead.services.map((srv: string) => (
                                    <span key={srv} className="px-2.5 py-0.5 rounded-full bg-[#0A84FF]/10 text-[#0A84FF] text-[9px] font-bold uppercase tracking-wider border border-[#0A84FF]/15">
                                      {srv}
                                    </span>
                                  ))}
                                </div>
                              </div>
                            )}

                            {/* Challenges Notes content */}
                            {lead.additionalNotes && (
                              <div className="bg-white dark:bg-neutral-900 border border-black/5 dark:border-white/5 p-3 rounded-lg space-y-1">
                                <span className="text-[9px] uppercase font-bold text-neutral-400 block">Operator Challenge Notes:</span>
                                <p className="text-xs text-neutral-600 dark:text-neutral-300 whitespace-pre-wrap leading-relaxed">{lead.additionalNotes}</p>
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}

                {/* 2. BLOG COMPOSER TAB */}
                {activeTab === 'blogs' && (
                  <div className="space-y-6">
                    <div className="flex items-center justify-between pb-4 border-b border-black/5 dark:border-white/5">
                      <div>
                        <h2 className="text-lg font-extrabold flex items-center gap-2">
                          <FileText className="w-5 h-5 text-[#0A84FF]" />
                          Blog Publications ({blogs.length})
                        </h2>
                        <p className="text-xs text-neutral-500 dark:text-neutral-400">Manage, draft, and publish company knowledge updates instantly.</p>
                      </div>
                      {!showItemForm && (
                        <button
                          onClick={initCreateBlog}
                          className="px-4 py-2 bg-[#0A84FF] hover:bg-sky-500 text-white rounded-full text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 transition-all active:scale-95 cursor-pointer"
                        >
                          <Plus className="w-4 h-4" /> Add Blog Post
                        </button>
                      )}
                    </div>

                    {showItemForm ? (
                      <form onSubmit={handleSaveBlog} className="bg-neutral-50 dark:bg-[#121212] rounded-2xl border border-black/5 dark:border-white/5 p-5 space-y-5 animate-fade-in">
                        <h3 className="text-sm font-bold uppercase tracking-widest text-[#0A84FF]">
                          {editId ? 'Edit Blog Publication Metadata' : 'Draft New Publication'}
                        </h3>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-1">
                            <label className="text-xs font-bold text-neutral-400 uppercase tracking-wider">Article Title</label>
                            <input
                              type="text"
                              value={blogTitle}
                              onChange={(e) => setBlogTitle(e.target.value)}
                              placeholder="e.g. WaaS vs Traditional Dev..."
                              className="w-full text-xs px-3.5 py-2.5 border border-black/10 dark:border-white/10 rounded-xl bg-white dark:bg-neutral-900 focus:outline-none focus:border-[#0A84FF]"
                            />
                          </div>

                          <div className="space-y-1">
                            <label className="text-xs font-bold text-neutral-400 uppercase tracking-wider">Publication Tag</label>
                            <input
                              type="text"
                              value={blogTag}
                              onChange={(e) => setBlogTag(e.target.value)}
                              placeholder="e.g. Growth, Automation, SEO..."
                              className="w-full text-xs px-3.5 py-2.5 border border-black/10 dark:border-white/10 rounded-xl bg-white dark:bg-neutral-900 focus:outline-none focus:border-[#0A84FF]"
                            />
                          </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <div className="space-y-1">
                            <label className="text-xs font-bold text-neutral-400 uppercase tracking-wider">Display Visual Icon</label>
                            <select
                              value={blogVisual}
                              onChange={(e) => setBlogVisual(e.target.value)}
                              className="w-full text-xs px-3.5 py-2.5 border border-black/10 dark:border-white/10 rounded-xl bg-white dark:bg-neutral-900 focus:outline-none"
                            >
                              <option value="Globe">Globe (Web/Strategy)</option>
                              <option value="Zap">Zap (Automation/Speed)</option>
                              <option value="Search">Search (SEO/Optimization)</option>
                              <option value="Database">Database (Integrations/CRM)</option>
                              <option value="Smartphone">Smartphone (Ads/Growth)</option>
                              <option value="MessageSquare">MessageSquare (Chat/Replies)</option>
                            </select>
                          </div>

                          <div className="space-y-1 md:col-span-2">
                            <label className="text-xs font-bold text-neutral-400 uppercase tracking-wider">Draft Date</label>
                            <input
                              type="text"
                              value={blogDate}
                              onChange={(e) => setBlogDate(e.target.value)}
                              placeholder="e.g. June 15, 2026"
                              className="w-full text-xs px-3.5 py-2.5 border border-black/10 dark:border-white/10 rounded-xl bg-white dark:bg-neutral-900 focus:outline-none focus:border-[#0A84FF]"
                            />
                          </div>
                        </div>

                        <div className="space-y-1">
                          <label className="text-xs font-bold text-neutral-400 uppercase tracking-wider">Short Abstract/Description (Website Snippet)</label>
                          <textarea
                            rows={4}
                            value={blogDesc}
                            onChange={(e) => setBlogDesc(e.target.value)}
                            placeholder="Provide deep abstract summaries detailing ROI, strategic benefits or technical maps..."
                            className="w-full text-xs px-4 py-3 border border-black/10 dark:border-white/10 rounded-xl bg-white dark:bg-neutral-900 focus:outline-none focus:border-[#0A84FF] resize-none"
                          />
                        </div>

                        <div className="flex gap-3 justify-end pt-2">
                          <button
                            type="button"
                            onClick={() => setShowItemForm(false)}
                            className="px-5 py-2.5 border border-black/10 dark:border-white/10 rounded-full text-xs font-bold text-neutral-500 hover:text-black dark:hover:text-white transition-colors cursor-pointer"
                          >
                            Cancel
                          </button>
                          <button
                            type="submit"
                            className="px-6 py-2.5 bg-[#0A84FF] hover:bg-[#0070e3] text-white rounded-full text-xs font-bold transition-all uppercase cursor-pointer"
                          >
                            {editId ? 'Update Publication' : 'Release Publication'}
                          </button>
                        </div>
                      </form>
                    ) : (
                      <div className="space-y-3">
                        {blogs.map((b) => (
                          <div 
                            key={b.id} 
                            className="flex items-start justify-between gap-4 p-4 rounded-2xl bg-neutral-50 dark:bg-[#121212]/50 border border-black/5 dark:border-white/5 hover:border-black/10 dark:hover:border-white/10 transition-colors"
                          >
                            <div className="flex gap-4 items-center">
                              <div className="p-3 bg-white dark:bg-neutral-900 rounded-xl border border-black/5 dark:border-white/10 flex items-center justify-center">
                                <span className="text-[#0A84FF] text-xs font-mono font-bold">{b.visual}</span>
                              </div>
                              <div className="space-y-1">
                                <div className="flex items-center gap-2">
                                  <span className="px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider bg-sky-500/10 text-sky-600 rounded-full border border-sky-500/15">
                                    {b.tag}
                                  </span>
                                  <span className="text-[10px] text-neutral-400 font-mono flex items-center gap-1">
                                    <Calendar className="w-3 h-3" /> {b.date}
                                  </span>
                                </div>
                                <h4 className="text-sm font-bold leading-tight block">{b.title}</h4>
                                <p className="text-xs text-neutral-500 line-clamp-1 max-w-xl">{b.desc}</p>
                              </div>
                            </div>

                            <div className="flex items-center gap-1.5 shrink-0">
                              <button
                                onClick={() => editBlogItem(b)}
                                className="p-1.5 text-neutral-400 hover:text-amber-500 hover:bg-amber-500/10 rounded-lg transition-colors cursor-pointer"
                                title="Edit Post"
                              >
                                <Edit3 className="w-4 h-4" />
                              </button>
                              <button
                                onClick={() => handleDeleteBlog(b.id)}
                                className="p-1.5 text-neutral-400 hover:text-red-500 hover:bg-red-500/10 rounded-lg transition-colors cursor-pointer"
                                title="Delete Post"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}

                {/* 3. SEO CONFIG TAB */}
                {activeTab === 'seo' && (
                  <div className="space-y-6">
                    <div>
                      <h2 className="text-lg font-extrabold flex items-center gap-2">
                        <Globe className="w-5 h-5 text-[#0A84FF]" />
                        Meta SEO Page Studio
                      </h2>
                      <p className="text-xs text-neutral-500 dark:text-neutral-400">Configure page headers, descriptors, and focus keyword targets for organic indexing.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 items-start">
                      
                      {/* Left list of pages */}
                      <div className="md:col-span-1 bg-neutral-50 dark:bg-[#121212]/50 rounded-2xl p-3 border border-black/5 dark:border-white/5 space-y-1">
                        {seoConfig.map((item) => (
                          <button
                            key={item.page_id}
                            onClick={() => selectSeoPageItem(item.page_id)}
                            className={`w-full text-left py-2.5 px-3.5 rounded-xl text-xs font-bold block select-none uppercase tracking-wider ${
                              seoPageId === item.page_id
                                ? 'bg-[#0A84FF]/15 text-[#0A84FF] border border-[#0A84FF]/20'
                                : 'text-neutral-500 hover:text-black dark:hover:text-white'
                            }`}
                          >
                            /{item.page_id}
                          </button>
                        ))}
                      </div>

                      {/* Right Editor form */}
                      <div className="md:col-span-3 bg-neutral-50 dark:bg-[#121212] rounded-2xl border border-black/5 dark:border-white/5 p-5 space-y-5">
                        <div className="flex items-center justify-between">
                          <h3 className="text-xs font-bold uppercase tracking-widest text-[#0A84FF] flex items-center gap-1.5">
                            <Layers className="w-4 h-4" />
                            Editing Config: /{seoPageId}
                          </h3>
                        </div>

                        <div className="space-y-4">
                          <div className="space-y-1">
                            <label className="text-xs font-bold text-neutral-400 uppercase tracking-wider">Browser document.title</label>
                            <input
                              type="text"
                              value={seoTitle}
                              onChange={(e) => setSeoTitle(e.target.value)}
                              placeholder="e.g. Elegant Web Systems | 7Hive Media"
                              className="w-full text-xs px-3.5 py-2.5 border border-black/10 dark:border-white/10 rounded-xl bg-white dark:bg-neutral-900 focus:outline-none focus:border-[#0A84FF]"
                            />
                            <span className="text-[10px] text-neutral-400 font-mono self-end">Recommended length: 50-60 characters. Current: {seoTitle.length}</span>
                          </div>

                          <div className="space-y-1">
                            <label className="text-xs font-bold text-neutral-400 uppercase tracking-wider">Meta Description Tag</label>
                            <textarea
                              rows={3}
                              value={seoDesc}
                              onChange={(e) => setSeoDesc(e.target.value)}
                              placeholder="Brief description for search snippet indexes..."
                              className="w-full text-xs px-4 py-3 border border-black/10 dark:border-white/10 rounded-xl bg-white dark:bg-neutral-900 focus:outline-none focus:border-[#0A84FF] resize-none"
                            />
                            <span className="text-[10px] text-neutral-400 font-mono">Recommended length: 140-160 characters. Current: {seoDesc.length}</span>
                          </div>

                          <div className="space-y-1">
                            <label className="text-xs font-bold text-neutral-400 uppercase tracking-wider">Meta Keywords Targets</label>
                            <input
                              type="text"
                              value={seoKeywords}
                              onChange={(e) => setSeoKeywords(e.target.value)}
                              placeholder="Comma-separated keys, e.g. services, local seo, crm, landing page"
                              className="w-full text-xs px-3.5 py-2.5 border border-black/10 dark:border-white/10 rounded-xl bg-white dark:bg-neutral-900 focus:outline-none focus:border-[#0A84FF]"
                            />
                          </div>
                        </div>

                        <button
                          onClick={handleSaveSEOElement}
                          className="w-full py-3 bg-[#0A84FF] hover:bg-blue-600 text-white rounded-xl text-xs font-bold uppercase tracking-wider transition-all cursor-pointer"
                        >
                          Save /{seoPageId} Header Configurations
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                {/* 4. SERVICES MANAGEMENT TAB */}
                {activeTab === 'services' && (
                  <div className="space-y-6">
                    <div className="flex items-center justify-between pb-4 border-b border-black/5 dark:border-white/5">
                      <div>
                        <h2 className="text-lg font-extrabold flex items-center gap-2">
                          <Layers className="w-5 h-5 text-[#0A84FF]" />
                          Services Portfolio ({services.length})
                        </h2>
                        <p className="text-xs text-neutral-500 dark:text-neutral-400">Add, edit, or configure capability offerings on the main services view.</p>
                      </div>
                      {!showItemForm && (
                        <button
                          onClick={initCreateService}
                          className="px-4 py-2 bg-[#0A84FF] hover:bg-sky-500 text-white rounded-full text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 transition-all active:scale-95 cursor-pointer"
                        >
                          <Plus className="w-4 h-4" /> Add Custom Service
                        </button>
                      )}
                    </div>

                    {showItemForm ? (
                      <form onSubmit={handleSaveService} className="bg-neutral-50 dark:bg-[#121212] rounded-2xl border border-black/5 dark:border-white/5 p-5 space-y-5">
                        <h3 className="text-sm font-bold uppercase tracking-widest text-[#0A84FF]">
                          {editId ? 'Edit Capability Metrics' : 'Introduce New Capability Offering'}
                        </h3>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-1">
                            <label className="text-xs font-bold text-neutral-400 uppercase tracking-wider">Service Title</label>
                            <input
                              type="text"
                              value={svcTitle}
                              onChange={(e) => setSvcTitle(e.target.value)}
                              placeholder="e.g. Custom Web Development"
                              className="w-full text-xs px-3.5 py-2.5 border border-black/10 dark:border-white/10 rounded-xl bg-white dark:bg-neutral-900 focus:outline-none focus:border-[#0A84FF]"
                            />
                          </div>

                          <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-1">
                              <label className="text-xs font-bold text-neutral-400 uppercase tracking-wider">Category Category</label>
                              <select
                                value={svcCategory}
                                onChange={(e) => setSvcCategory(e.target.value as any)}
                                className="w-full text-xs px-3.5 py-2.5 border border-black/10 dark:border-white/10 rounded-xl bg-white dark:bg-neutral-900 focus:outline-none"
                              >
                                <option value="dev">Development (dev)</option>
                                <option value="marketing">Marketing (marketing)</option>
                                <option value="automation">Automation (automation)</option>
                              </select>
                            </div>
                            <div className="space-y-1">
                              <label className="text-xs font-bold text-neutral-400 uppercase tracking-wider">Visual Icon Key</label>
                              <select
                                value={svcIcon}
                                onChange={(e) => setSvcIcon(e.target.value)}
                                className="w-full text-xs px-3.5 py-2.5 border border-black/10 dark:border-white/10 rounded-xl bg-white dark:bg-neutral-900 focus:outline-none"
                              >
                                <option value="Globe">Globe</option>
                                <option value="Zap">Zap</option>
                                <option value="Search">Search</option>
                                <option value="Database">Database</option>
                                <option value="Smartphone">Smartphone</option>
                                <option value="MessageSquare">MessageSquare</option>
                                <option value="RefreshCw">RefreshCw</option>
                                <option value="BarChart3">BarChart3</option>
                                <option value="Megaphone">Megaphone</option>
                                <option value="Target">Target</option>
                              </select>
                            </div>
                          </div>
                        </div>

                        <div className="space-y-1">
                          <label className="text-xs font-bold text-neutral-400 uppercase tracking-wider">Primary Outcome Tagline (Displayed in Details)</label>
                          <input
                            type="text"
                            value={svcOutcome}
                            onChange={(e) => setSvcOutcome(e.target.value)}
                            placeholder="e.g. 3x higher conversion rates on average"
                            className="w-full text-xs px-3.5 py-2.5 border border-black/10 dark:border-white/10 rounded-xl bg-white dark:bg-neutral-900 focus:outline-none focus:border-[#0A84FF]"
                          />
                        </div>

                        <div className="space-y-1">
                          <label className="text-xs font-bold text-neutral-400 uppercase tracking-wider">Benefits Checklist (Comma separated list)</label>
                          <input
                            type="text"
                            value={svcBenefits}
                            onChange={(e) => setSvcBenefits(e.target.value)}
                            placeholder="e.g. Tech Audit Support, Responsive Grid, Fast Assets"
                            className="w-full text-xs px-3.5 py-2.5 border border-black/10 dark:border-white/10 rounded-xl bg-white dark:bg-neutral-900 focus:outline-none focus:border-[#0A84FF]"
                          />
                        </div>

                        <div className="space-y-1">
                          <label className="text-xs font-bold text-neutral-400 uppercase tracking-wider">Detailed Description Content</label>
                          <textarea
                            rows={3}
                            value={svcDesc}
                            onChange={(e) => setSvcDesc(e.target.value)}
                            placeholder="Provide deep descriptions for this capability..."
                            className="w-full text-xs px-4 py-3 border border-black/10 dark:border-white/10 rounded-xl bg-white dark:bg-neutral-900 focus:outline-none focus:border-[#0A84FF] resize-none"
                          />
                        </div>

                        <div className="flex gap-3 justify-end pt-2">
                          <button
                            type="button"
                            onClick={() => setShowItemForm(false)}
                            className="px-5 py-2.5 border border-black/10 dark:border-white/10 rounded-full text-xs font-bold hover:bg-neutral-100 dark:hover:bg-neutral-900 cursor-pointer"
                          >
                            Cancel
                          </button>
                          <button
                            type="submit"
                            className="px-6 py-2.5 bg-[#0A84FF] text-white rounded-full text-xs font-bold transition-all uppercase cursor-pointer"
                          >
                            Save Capability
                          </button>
                        </div>
                      </form>
                    ) : (
                      <div className="space-y-3">
                        {services.map((item) => (
                          <div 
                            key={item.id} 
                            className="flex items-start justify-between gap-4 p-4 rounded-xl bg-neutral-50 dark:bg-neutral-900/30 border border-black/5 dark:border-white/5"
                          >
                            <div className="flex gap-3 items-start">
                              <span className="p-2.5 bg-neutral-100 dark:bg-neutral-900 rounded-lg text-[#0A84FF] font-mono text-[10px] uppercase font-bold shrink-0">{item.icon}</span>
                              <div className="space-y-1">
                                <div className="flex items-center gap-2">
                                  <h4 className="text-sm font-extrabold leading-tight">{item.title}</h4>
                                  <span className="px-2 py-0.5 text-[8px] font-bold tracking-widest bg-[#0A84FF]/10 text-[#0A84FF] uppercase rounded border border-[#0A84FF]/15">
                                    {item.category}
                                  </span>
                                </div>
                                <p className="text-xs text-neutral-500">{item.desc}</p>
                                <span className="text-[10px] font-bold text-sky-600 block">✦ {item.outcome}</span>
                              </div>
                            </div>
                            
                            <div className="flex items-center gap-1 justify-end shrink-0">
                              <button
                                onClick={() => editServiceItem(item)}
                                className="p-1.5 hover:text-amber-500 rounded-lg cursor-pointer"
                                title="Edit Capability"
                              >
                                <Edit3 className="w-4 h-4" />
                              </button>
                              <button
                                onClick={() => handleDeleteService(item.id)}
                                className="p-1.5 hover:text-red-500 rounded-lg cursor-pointer"
                                title="Delete Capability"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}

                {/* 5. CLIENT WORKS (CASE STUDIES) TAB */}
                {activeTab === 'works' && (
                  <div className="space-y-6">
                    <div className="flex items-center justify-between pb-4 border-b border-black/5 dark:border-white/5">
                      <div>
                        <h2 className="text-lg font-extrabold flex items-center gap-2">
                          <LayoutGrid className="w-5 h-5 text-[#0A84FF]" />
                          Client Works & Case Studies ({caseStudies.length})
                        </h2>
                        <p className="text-xs text-neutral-500 dark:text-neutral-400">Control active portfolio showcase entries on the Work section.</p>
                      </div>
                      {!showItemForm && (
                        <button
                          onClick={initCreateWork}
                          className="px-4 py-2 bg-[#0A84FF] hover:bg-sky-500 text-white rounded-full text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 transition-all active:scale-95 cursor-pointer"
                        >
                          <Plus className="w-4 h-4" /> Add Case Study
                        </button>
                      )}
                    </div>

                    {showItemForm ? (
                      <form onSubmit={handleSaveWork} className="bg-neutral-50 dark:bg-[#121212] rounded-2xl border border-black/5 dark:border-white/5 p-5 space-y-5">
                        <h3 className="text-sm font-bold uppercase tracking-widest text-[#0A84FF]">
                          {editId ? 'Edit Showcase Entry Metadata' : 'Draft New Success Blueprint'}
                        </h3>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-1">
                            <label className="text-xs font-bold text-neutral-400 uppercase tracking-wider">Project / Client Title Name</label>
                            <input
                              type="text"
                              value={workTitle}
                              onChange={(e) => setWorkTitle(e.target.value)}
                              placeholder="e.g. SolarEdge Pro - Lead Funnel"
                              className="w-full text-xs px-3.5 py-2.5 border border-black/10 dark:border-white/10 rounded-xl bg-white dark:bg-neutral-900 focus:outline-none"
                            />
                          </div>

                          <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-1">
                              <label className="text-xs font-bold text-neutral-400 uppercase tracking-wider">Industry Title</label>
                              <input
                                type="text"
                                value={workIndustry}
                                onChange={(e) => setWorkIndustry(e.target.value)}
                                placeholder="e.g. Solar Industry, Medical, SaaS"
                                className="w-full text-xs px-3.5 py-2.5 border border-black/10 dark:border-white/10 rounded-xl bg-white dark:bg-neutral-900 focus:outline-none"
                              />
                            </div>
                            <div className="space-y-1">
                              <label className="text-xs font-bold text-neutral-400 uppercase tracking-wider">Case category</label>
                              <select
                                value={workCategory}
                                onChange={(e) => setWorkCategory(e.target.value as any)}
                                className="w-full text-xs px-3.5 py-2.5 border border-black/10 dark:border-white/10 rounded-xl bg-white dark:bg-neutral-900 focus:outline-none font-sans"
                              >
                                <option value="lead-gen">Lead Generation (lead-gen)</option>
                                <option value="local">Local Business (local)</option>
                                <option value="seo">SEO & organic (seo)</option>
                              </select>
                            </div>
                          </div>
                        </div>

                        {/* Metrics fields block */}
                        <div className="bg-white dark:bg-neutral-950 p-4 rounded-xl border border-black/5 dark:border-white/5 space-y-3">
                          <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider block">Showcase Visual Metrics (KPI Highlights)</span>
                          
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div className="space-y-1">
                              <label className="text-[10px] text-neutral-400 uppercase">Metric 1 (Value / Label)</label>
                              <div className="flex gap-2">
                                <input type="text" value={metric1Val} onChange={(e) => setMetric1Val(e.target.value)} placeholder="e.g. 340%" className="w-1/2 text-xs px-2.5 py-1.5 border border-neutral-200 dark:border-neutral-800 rounded bg-neutral-50 dark:bg-neutral-900" />
                                <input type="text" value={metric1Lbl} onChange={(e) => setMetric1Lbl(e.target.value)} placeholder="e.g. Lead Increase" className="w-1/2 text-xs px-2.5 py-1.5 border border-neutral-200 dark:border-neutral-800 rounded bg-neutral-50 dark:bg-neutral-900 animate-none" />
                              </div>
                            </div>

                            <div className="space-y-1">
                              <label className="text-[10px] text-neutral-400 uppercase">Metric 2 (Value / Label)</label>
                              <div className="flex gap-2">
                                <input type="text" value={metric2Val} onChange={(e) => setMetric2Val(e.target.value)} placeholder="e.g. ₹85" className="w-1/2 text-xs px-2.5 py-1.5 border border-neutral-200 dark:border-neutral-800 rounded bg-neutral-50 dark:bg-neutral-900 animate-none" />
                                <input type="text" value={metric2Lbl} onChange={(e) => setMetric2Lbl(e.target.value)} placeholder="e.g. Cost Per Lead" className="w-1/2 text-xs px-2.5 py-1.5 border border-neutral-200 dark:border-neutral-800 rounded bg-neutral-50 dark:bg-neutral-900 animate-none" />
                              </div>
                            </div>

                            <div className="space-y-1">
                              <label className="text-[10px] text-neutral-400 uppercase">Metric 3 (Value / Label)</label>
                              <div className="flex gap-2">
                                <input type="text" value={metric3Val} onChange={(e) => setMetric3Val(e.target.value)} placeholder="e.g. 4.2x" className="w-1/2 text-xs px-2.5 py-1.5 border border-neutral-200 dark:border-neutral-800 rounded bg-neutral-50 dark:bg-neutral-900 animate-none" />
                                <input type="text" value={metric3Lbl} onChange={(e) => setMetric3Lbl(e.target.value)} placeholder="e.g. ROAS Increase" className="w-1/2 text-xs px-2.5 py-1.5 border border-neutral-200 dark:border-neutral-800 rounded bg-neutral-50 dark:bg-neutral-900 animate-none" />
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="space-y-1">
                          <label className="text-xs font-bold text-neutral-400 uppercase tracking-wider font-sans">Strategic Summary Detail</label>
                          <textarea
                            rows={3}
                            value={workDesc}
                            onChange={(e) => setWorkDesc(e.target.value)}
                            placeholder="Draft the operational narrative showing initial challenges and downstream ROI achievements..."
                            className="w-full text-xs px-4 py-3 border border-black/10 dark:border-white/10 rounded-xl bg-white dark:bg-neutral-900 focus:outline-none focus:border-[#0A84FF] resize-none"
                          />
                        </div>

                        <div className="flex gap-3 justify-end pt-2">
                          <button
                            type="button"
                            onClick={() => setShowItemForm(false)}
                            className="px-5 py-2.5 border border-black/10 dark:border-white/10 rounded-full text-xs font-bold hover:bg-neutral-100 dark:hover:bg-neutral-900 cursor-pointer"
                          >
                            Cancel
                          </button>
                          <button
                            type="submit"
                            className="px-6 py-2.5 bg-[#0A84FF] text-white rounded-full text-xs font-bold transition-all uppercase cursor-pointer"
                          >
                            Save Case Study
                          </button>
                        </div>
                      </form>
                    ) : (
                      <div className="space-y-3">
                        {caseStudies.map((cs) => (
                          <div 
                            key={cs.id}
                            className="flex items-start justify-between gap-4 p-4 rounded-xl bg-neutral-50 dark:bg-neutral-900/30 border border-black/5 dark:border-white/5 hover:border-black/10 transition-colors"
                          >
                            <div className="space-y-1.5">
                              <div className="flex items-center gap-2">
                                <span className="text-xs font-bold text-neutral-400">{cs.industry}</span>
                                <span className="px-2 py-0.5 text-[8px] bg-[#0A84FF]/10 text-[#0A84FF] border border-[#0A84FF]/15 uppercase tracking-wide font-bold rounded">
                                  {cs.category}
                                </span>
                              </div>
                              <h4 className="text-sm font-extrabold block">{cs.title}</h4>
                              <p className="text-xs text-neutral-500 line-clamp-1">{cs.desc}</p>
                              
                              <div className="flex gap-3 pt-1">
                                {cs.metrics.map((m, mi) => (
                                  <span key={mi} className="text-[10px] bg-neutral-100 dark:bg-neutral-900 px-2 py-1 rounded text-stone-700 dark:text-stone-300">
                                    <strong>{m.value}</strong>: {m.label}
                                  </span>
                                ))}
                              </div>
                            </div>

                            <div className="flex items-center gap-1 justify-end shrink-0">
                              <button
                                onClick={() => editWorkItem(cs)}
                                className="p-1.5 hover:text-amber-500 rounded-lg cursor-pointer"
                                title="Edit Project Link"
                              >
                                <Edit3 className="w-4 h-4" />
                              </button>
                              <button
                                onClick={() => handleDeleteWork(cs.id)}
                                className="p-1.5 hover:text-red-500 rounded-lg cursor-pointer"
                                title="Delete Project Link"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}

                {/* 6. TESTIMONIALS CONFIG TAB */}
                {activeTab === 'testimonials' && (
                  <div className="space-y-6">
                    <div className="flex items-center justify-between pb-4 border-b border-black/5 dark:border-white/5">
                      <div>
                        <h2 className="text-lg font-extrabold flex items-center gap-2">
                          <Star className="w-5 h-5 text-amber-400 fill-amber-400 animate-none" />
                          Partner Testimonials Registry ({testimonials.length})
                        </h2>
                        <p className="text-xs text-neutral-500 dark:text-neutral-400">Configure references, star ratings, and professional client quotes displayed on section sheets.</p>
                      </div>
                      {!showItemForm && (
                        <button
                          onClick={initCreateTestimonial}
                          className="px-4 py-2 bg-[#0A84FF] hover:bg-sky-500 text-white rounded-full text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 transition-all active:scale-95 cursor-pointer"
                        >
                          <Plus className="w-4 h-4" /> Add Testimonial
                        </button>
                      )}
                    </div>

                    {showItemForm ? (
                      <form onSubmit={handleSaveTestimonial} className="bg-neutral-50 dark:bg-[#121212] rounded-2xl border border-black/5 dark:border-white/5 p-5 space-y-5 animate-fade-in animate-none">
                        <h3 className="text-sm font-bold uppercase tracking-widest text-[#0A84FF]">
                          {editId ? 'Edit Testimonial Context' : 'Draft Customer Endorsement'}
                        </h3>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <div className="space-y-1">
                            <label className="text-xs font-bold text-neutral-400 uppercase tracking-wider font-sans">Author Name</label>
                            <input
                              type="text"
                              value={testAuthor}
                              onChange={(e) => setTestAuthor(e.target.value)}
                              placeholder="e.g. Anita Patel"
                              className="w-full text-xs px-3.5 py-2.5 border border-black/10 dark:border-white/10 rounded-xl bg-white dark:bg-neutral-900 focus:outline-none"
                            />
                          </div>

                          <div className="space-y-1">
                            <label className="text-xs font-bold text-neutral-400 uppercase tracking-wider text-sans">Role / Position</label>
                            <input
                              type="text"
                              value={testRole}
                              onChange={(e) => setTestRole(e.target.value)}
                              placeholder="e.g. COO, SolarEdge Pro"
                              className="w-full text-xs px-3.5 py-2.5 border border-black/10 dark:border-white/10 rounded-xl bg-white dark:bg-neutral-900 focus:outline-none"
                            />
                          </div>

                          <div className="grid grid-cols-2 gap-2">
                            <div className="space-y-1">
                              <label className="text-xs font-bold text-neutral-400 uppercase tracking-wider text-sans">Stars (1-5)</label>
                              <select
                                value={testStars}
                                onChange={(e) => setTestStars(Number(e.target.value))}
                                className="w-full text-xs px-3.5 py-2.5 border border-black/10 dark:border-white/10 rounded-xl bg-white dark:bg-neutral-900 focus:outline-none"
                              >
                                <option value="5">5 Stars</option>
                                <option value="4">4 Stars</option>
                                <option value="3">3 Stars</option>
                              </select>
                            </div>
                            
                            <div className="space-y-1">
                              <label className="text-xs font-bold text-neutral-400 uppercase tracking-wider text-sans">Initials</label>
                              <input
                                type="text"
                                value={testAvatar}
                                onChange={(e) => setTestAvatar(e.target.value)}
                                placeholder="AP"
                                className="w-full text-xs px-3.5 py-2.5 border border-black/10 dark:border-white/10 rounded-xl bg-white dark:bg-neutral-900 focus:outline-none text-center"
                              />
                            </div>
                          </div>
                        </div>

                        <div className="space-y-1">
                          <label className="text-xs font-bold text-neutral-400 uppercase tracking-wider text-sans">Verification Quotes (Content Body)</label>
                          <textarea
                            rows={3}
                            value={testText}
                            onChange={(e) => setTestText(e.target.value)}
                            placeholder="e.g. 7Hive didn't just build us a website — they built a system..."
                            className="w-full text-xs px-4 py-3 border border-black/10 dark:border-white/10 rounded-xl bg-white dark:bg-neutral-900 focus:outline-none focus:border-[#0A84FF] resize-none"
                          />
                        </div>

                        <div className="flex gap-3 justify-end pt-2">
                          <button
                            type="button"
                            onClick={() => setShowItemForm(false)}
                            className="px-5 py-2.5 border border-black/10 dark:border-white/10 rounded-full text-xs font-bold hover:bg-neutral-100 dark:hover:bg-neutral-900 cursor-pointer"
                          >
                            Cancel
                          </button>
                          <button
                            type="submit"
                            className="px-6 py-2.5 bg-[#0A84FF] text-white rounded-full text-xs font-bold uppercase cursor-pointer"
                          >
                            Save Testimonial
                          </button>
                        </div>
                      </form>
                    ) : (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {testimonials.map((t) => (
                          <div 
                            key={t.id} 
                            className="p-4 rounded-xl bg-neutral-100/50 dark:bg-neutral-900/40 border border-black/5 dark:border-white/10 flex flex-col justify-between"
                          >
                            <div className="space-y-2">
                              <div className="flex justify-between items-center">
                                <span className="text-amber-500 text-xs font-bold">{'★'.repeat(t.stars)}</span>
                                <div className="flex items-center gap-1">
                                  <button onClick={() => editTestimonialItem(t)} className="p-1 hover:text-amber-500 rounded"><Edit3 className="w-3.5 h-3.5" /></button>
                                  <button onClick={() => handleDeleteTestimonial(t.id)} className="p-1 hover:text-red-500 rounded"><Trash2 className="w-3.5 h-3.5" /></button>
                                </div>
                              </div>
                              <p className="text-xs text-stone-600 dark:text-stone-300 italic">"{t.text}"</p>
                            </div>
                            <div className="pt-3 border-t border-black/5 dark:border-white/5 mt-3 flex items-center gap-2">
                              <div className="w-7 h-7 bg-[#0A84FF] text-[9px] font-bold rounded-full flex items-center justify-center text-white">{t.avatarInitials}</div>
                              <div>
                                <h5 className="text-[11px] font-bold leading-none">{t.author}</h5>
                                <span className="text-[9px] text-neutral-400">{t.role}</span>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}

                {/* 7. FAQ RESOURCE MANAGEMENT TAB */}
                {activeTab === 'faqs' && (
                  <div className="space-y-6">
                    <div className="flex items-center justify-between pb-4 border-b border-black/5 dark:border-white/5">
                      <div>
                        <h2 className="text-lg font-extrabold flex items-center gap-2">
                          <HelpCircle className="w-5 h-5 text-[#0A84FF]" />
                          FAQ Resource Items ({faqs.length})
                        </h2>
                        <p className="text-xs text-neutral-500 dark:text-neutral-400">Configure questions, detail answers, and categories for helper dropdown sections.</p>
                      </div>
                      {!showItemForm && (
                        <button
                          onClick={initCreateFAQ}
                          className="px-4 py-2 bg-[#0A84FF] hover:bg-sky-500 text-white rounded-full text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 transition-all active:scale-95 cursor-pointer"
                        >
                          <Plus className="w-4 h-4" /> Add FAQ Item
                        </button>
                      )}
                    </div>

                    {showItemForm ? (
                      <form onSubmit={handleSaveFAQ} className="bg-neutral-50 dark:bg-[#121212] rounded-2xl border border-black/5 dark:border-white/5 p-5 space-y-5 animate-fade-in animate-none">
                        <h3 className="text-sm font-bold uppercase tracking-widest text-[#0A84FF]">
                          {editId ? 'Edit FAQ node context' : 'Draft New FAQ Entry'}
                        </h3>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 animate-none">
                          <div className="md:col-span-2 space-y-1">
                            <label className="text-xs font-bold text-neutral-400 uppercase tracking-wider">Question Headline</label>
                            <input
                              type="text"
                              value={faqQuestion}
                              onChange={(e) => setFaqQuestion(e.target.value)}
                              placeholder="e.g. Why choose 7Hive Media over others?"
                              className="w-full text-xs px-3.5 py-2.5 border border-black/10 dark:border-white/10 rounded-xl bg-white dark:bg-neutral-900 focus:outline-none"
                            />
                          </div>

                          <div className="space-y-1">
                            <label className="text-xs font-bold text-neutral-400 uppercase tracking-wider">Category Category</label>
                            <select
                              value={faqCategory}
                              onChange={(e) => setFaqCategory(e.target.value as any)}
                              className="w-full text-xs px-3.5 py-2.5 border border-black/10 dark:border-white/10 rounded-xl bg-white dark:bg-neutral-900 focus:outline-none"
                            >
                              <option value="general">General (general)</option>
                              <option value="services">Services (services)</option>
                              <option value="pricing">Pricing & Cost (pricing)</option>
                              <option value="automation">Automations (automation)</option>
                            </select>
                          </div>
                        </div>

                        <div className="space-y-1">
                          <label className="text-xs font-bold text-neutral-400 uppercase tracking-wider">Resolution Answer (Short Explanation)</label>
                          <textarea
                            rows={4}
                            value={faqAnswer}
                            onChange={(e) => setFaqAnswer(e.target.value)}
                            placeholder="Draft simple, readable resolutions to operator questions..."
                            className="w-full text-xs px-4 py-3 border border-black/10 dark:border-white/10 rounded-xl bg-white dark:bg-neutral-900 focus:outline-none focus:border-[#0A84FF] resize-none"
                          />
                        </div>

                        <div className="flex gap-3 justify-end pt-2">
                          <button
                            type="button"
                            onClick={() => setShowItemForm(false)}
                            className="px-5 py-2.5 border border-black/10 dark:border-white/10 rounded-full text-xs font-bold hover:bg-neutral-100 cursor-pointer"
                          >
                            Cancel
                          </button>
                          <button
                            type="submit"
                            className="px-6 py-2.5 bg-[#0A84FF] text-white rounded-full text-xs font-bold uppercase tracking-wider cursor-pointer font-sans"
                          >
                            Save FAQ Node
                          </button>
                        </div>
                      </form>
                    ) : (
                      <div className="space-y-3">
                        {faqs.map((f) => (
                          <div 
                            key={f.id} 
                            className="p-4 rounded-xl bg-neutral-100/30 dark:bg-neutral-900/30 border border-black/5 dark:border-white/10 flex items-start justify-between gap-4"
                          >
                            <div className="space-y-1.5 font-sans">
                              <div className="flex items-center gap-2">
                                <span className="px-2 py-0.5 text-[8px] bg-[#0A84FF]/10 text-[#0A84FF] uppercase font-mono font-bold tracking-wider rounded">FAQ CATEGORY: {f.category}</span>
                              </div>
                              <h5 className="text-sm font-bold">{f.question}</h5>
                              <p className="text-xs text-neutral-500 leading-relaxed">{f.answer}</p>
                            </div>

                            <div className="flex items-center gap-1 justify-end shrink-0">
                              <button onClick={() => editFAQItem(f)} className="p-1 hover:text-amber-500 rounded cursor-pointer"><Edit3 className="w-4 h-4" /></button>
                              <button onClick={() => handleDeleteFAQ(f.id)} className="p-1 hover:text-red-500 rounded cursor-pointer"><Trash2 className="w-4 h-4" /></button>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}

                {/* 8. SYSTEM & SUPABASE SETTINGS TAB */}
                {activeTab === 'settings' && (
                  <div className="space-y-8 animate-fade-in font-sans">
                    
                    {/* Supabase connection panel */}
                    <div className="bg-neutral-50 dark:bg-neutral-905 p-6 rounded-3xl border border-black/5 dark:border-white/5 space-y-5">
                      <div className="flex items-center justify-between">
                        <h3 className="font-extrabold text-base flex items-center gap-2">
                          <Database className="w-5 h-5 text-emerald-500" />
                          Supabase Database Credentials
                        </h3>
                        <span className={`px-2 py-1 rounded text-[10px] font-bold uppercase tracking-wider border ${
                          isConnected 
                            ? 'bg-emerald-500/15 text-emerald-500 border-emerald-500/20' 
                            : 'bg-amber-500/15 text-amber-500 border-amber-500/20'
                        }`}>
                          {isConnected ? 'Handshake success' : 'Handshake unavailable'}
                        </span>
                      </div>
                      
                      <p className="text-xs text-neutral-500 leading-relaxed">
                        Expose your custom project variables to turn on secure remote storage instead of simple browser-cached `localStorage` persistence. 
                        <strong> Save yours instantly right below:</strong>
                      </p>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-1">
                          <label className="text-[11px] font-bold text-neutral-400 uppercase tracking-wider block">Supabase URL</label>
                          <input
                            type="text"
                            value={supabaseUrl}
                            onChange={(e) => setSupabaseUrl(e.target.value)}
                            placeholder="https://yourprojectid.supabase.co"
                            className="w-full text-xs px-3.5 py-2.5 border border-black/10 dark:border-white/10 rounded-xl bg-white dark:bg-neutral-900 focus:outline-none"
                          />
                        </div>

                        <div className="space-y-1">
                          <label className="text-[11px] font-bold text-neutral-400 uppercase tracking-wider block">Supabase Anon Key</label>
                          <input
                            type="password"
                            value={supabaseAnonKey}
                            onChange={(e) => setSupabaseAnonKey(e.target.value)}
                            placeholder="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
                            className="w-full text-xs px-3.5 py-2.5 border border-black/10 dark:border-white/10 rounded-xl bg-white dark:bg-neutral-900 focus:outline-none font-mono"
                          />
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-2.5 pt-2">
                        <button
                          onClick={handleSaveConnectionSettings}
                          className="px-5 py-2.5 bg-[#0A84FF] hover:bg-blue-600 text-white rounded-full text-xs font-bold uppercase tracking-wider transition-all cursor-pointer"
                        >
                          Apply Connection credentials
                        </button>
                        
                        {(supabaseUrl || supabaseAnonKey) && (
                          <button
                            onClick={handleClearConnectionSettings}
                            className="px-5 py-2.5 border border-black/10 dark:border-white/10 rounded-full text-xs font-bold uppercase text-neutral-500 hover:text-black hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors cursor-pointer"
                          >
                            Clear Parameters
                          </button>
                        )}
                      </div>
                    </div>

                    {/* SQL Bootstrap command */}
                    <div className="space-y-4">
                      <h3 className="font-extrabold text-base flex items-center gap-1.5">
                        <Layers className="w-5 h-5 text-[#0A84FF]" />
                        Supabase Database Setup Script Guide
                      </h3>
                      <p className="text-xs text-neutral-500 leading-relaxed">
                        To operate smoothly, the Supabase instance expects these backend tables to search from. 
                        Simply copy the setup script below and execute inside your **Supabase Dashboard → SQL Editor** with a single run:
                      </p>

                      <div className="relative border border-black/10 dark:border-white/10 rounded-2xl bg-neutral-950 p-4.5 overflow-hidden">
                        <button
                          onClick={copySqlToClipboard}
                          className="absolute top-4 right-4 p-2 bg-neutral-900 hover:bg-neutral-800 text-neutral-400 hover:text-white rounded-lg transition-colors border border-neutral-800 cursor-pointer flex items-center gap-1"
                        >
                          {copiedSql ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
                          <span className="text-[10px] uppercase font-bold tracking-wider">{copiedSql ? 'Copied' : 'Copy'}</span>
                        </button>
                        <pre className="text-[10px] font-mono text-stone-300 max-h-60 overflow-y-auto whitespace-pre leading-relaxed pr-10">
                          {SUPABASE_SQL_SETUP}
                        </pre>
                      </div>
                    </div>

                    {/* Mass Seeder */}
                    <div className="bg-amber-500/5 p-6 rounded-3xl border border-amber-500/10 space-y-4">
                      <h3 className="font-extrabold text-base flex items-center gap-2 text-amber-500">
                        <Sparkles className="w-5 h-5" />
                        Synchronize Default Static Website Content to Supabase Database
                      </h3>
                      <p className="text-xs text-neutral-500 leading-relaxed">
                        Want to populate your empty Supabase tables with the standard website details (Faq, Cases, Blogs, Testimonials, Services) instantly? 
                        Verify your handshake status is online, then trigger catalog seeding:
                      </p>

                      <button
                        onClick={handleSeedAction}
                        disabled={isSeeding || !isConnected}
                        className={`px-5 py-2.5 font-bold text-xs uppercase tracking-wider rounded-full transition-all cursor-pointer ${
                          isConnected 
                            ? 'bg-amber-500 hover:bg-amber-600 text-white' 
                            : 'bg-neutral-200 dark:bg-neutral-800 text-neutral-400 cursor-not-allowed'
                        }`}
                      >
                        {isSeeding ? 'Syncing...' : 'Seed Catalog to Supabase Database'}
                      </button>

                      {seedLog && (
                        <div className="p-4 rounded-xl bg-neutral-950 border border-neutral-850">
                          <span className="text-[9px] font-bold uppercase tracking-wider text-neutral-500 font-mono block mb-1">Synchronization Console Log:</span>
                          <pre className="text-[10px] font-mono text-emerald-500 max-h-40 overflow-y-auto whitespace-pre-wrap leading-relaxed">{seedLog}</pre>
                        </div>
                      )}
                    </div>

                    {/* Admin Password Override */}
                    <div className="bg-neutral-50 dark:bg-[#121212] p-6 rounded-3xl border border-black/5 dark:border-white/10 space-y-4">
                      <h3 className="font-extrabold text-base flex items-center gap-2">
                        <KeyRound className="w-5 h-5 text-sky-500" />
                        Administrate Verification Password
                      </h3>
                      <p className="text-xs text-neutral-500 leading-relaxed">
                        Customize the credential passphrase required to enter thisadministrative master dashboard deck:
                      </p>
                      
                      <div className="max-w-xs space-y-3">
                        <input
                          type="text"
                          value={adminPassword}
                          onChange={(e) => setAdminPassword(e.target.value)}
                          placeholder="Passphrase..."
                          className="w-full text-xs px-3.5 py-2.5 border border-black/10 dark:border-white/10 rounded-xl bg-white dark:bg-neutral-900 focus:outline-none"
                        />
                        <button
                          onClick={handleSaveAdminPassword}
                          className="px-5 py-2 bg-[#0A84FF] hover:bg-blue-600 text-white rounded-full text-xs font-bold uppercase tracking-wider transition-all cursor-pointer"
                        >
                          Modify Password
                        </button>
                      </div>
                    </div>

                  </div>
                )}

              </>
            )}
          </div>

        </div>

      </div>
    </div>
  );
}

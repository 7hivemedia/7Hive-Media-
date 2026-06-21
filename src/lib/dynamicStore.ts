import { createClient } from '@supabase/supabase-js';
import { Service, CaseStudy, Testimonial, FAQItem, BlogPost, OnboardingState } from '../types';
import { SERVICES, CASE_STUDIES, TESTIMONIALS, FAQS, BLOG_POSTS } from '../data';

export interface SEOItem {
  page_id: string;
  title: string;
  description: string;
  keywords: string;
}

// Initial default SEO tags
export const DEFAULT_SEO: SEOItem[] = [
  {
    page_id: 'home',
    title: '7Hive Media | Turn Attention Into Revenue',
    description: 'We build and manage conversion-optimized ecosystems that turn clicks into customers. Web, campaigns, CRM, and automation working together.',
    keywords: 'digital growth, conversion optimization, marketing automation, crm, website-as-a-service, google ads, seo'
  },
  {
    page_id: 'services',
    title: 'Our Conversion Systems & Services | 7Hive Media',
    description: 'From high-performance Web Development to Google Ads, Meta Ads, Search Engine Optimization and custom WhatsApp/CRM marketing automation.',
    keywords: 'web design, web development, seo services, Google ads, Meta campaigns, WhatsApp automation, lead generation, sales crm'
  },
  {
    page_id: 'process',
    title: 'Our 4-Step Ecosystem Process | 7Hive Media',
    description: 'Discover how we audit, engineer, automate, and scale your growth systems. Complete transparent workflows delivering measurable ROI.',
    keywords: 'marketing audit, digital engineering, lead nurturing, business scaling, agency process'
  },
  {
    page_id: 'work',
    title: 'Client Case Studies & Sales Proof | 7Hive Media',
    description: 'Review real success cases across Solar, local hospitality, and professional legal practices showing up to 340% increase in lead flow.',
    keywords: 'case studies, portfolio, customer proofs, lead growth, local revenue, search engine traffic'
  },
  {
    page_id: 'testimonials',
    title: 'Growth-Focused Client Endorsements | 7Hive Media',
    description: 'Read first-party testimonials from founders, directors, and managers who scaled their businesses using our digital growth solutions.',
    keywords: 'testimonials, agency reviews, customer reviews, feedback'
  },
  {
    page_id: 'faq',
    title: 'Frequently Answered Questions | 7Hive Media',
    description: 'Clear, direct answers about WaaS pricing, project delivery, automation setups, and agency management timelines.',
    keywords: 'help, faqs, custom pricing, waas explanation, maintenance contracts'
  },
  {
    page_id: 'blog',
    title: 'The Growth Blog & Technical Blueprints | 7Hive Media',
    description: 'Free articles on comparing WaaS to traditional dev, top 5 CRM automation strategies, and ranking page 1 local SEO guides.',
    keywords: 'insight posts, guides, automation blueprints, local SEO comparison, marketing guides'
  },
  {
    page_id: 'contact',
    title: 'Secure Your Free 30-Min Strategy Consultation | 7Hive Media',
    description: 'Schedule a discovery session. Our engineers will audit your current pipeline and map a tailored growth plan for your business.',
    keywords: 'free consultation, map funnel growth, book call, get in touch'
  }
];

export function getSupabaseConfig() {
  const localUrl = localStorage.getItem('7hive_supabase_url');
  const localKey = localStorage.getItem('7hive_supabase_anon_key');
  
  const url = localUrl || (import.meta as any).env.VITE_SUPABASE_URL || '';
  const key = localKey || (import.meta as any).env.VITE_SUPABASE_ANON_KEY || '';
  
  return {
    url: url ? url.trim() : '',
    key: key ? key.trim() : '',
    isCustom: !!(localUrl && localKey)
  };
}

export function saveLocalSupabaseConfig(url: string, key: string) {
  if (!url || !key) {
    localStorage.removeItem('7hive_supabase_url');
    localStorage.removeItem('7hive_supabase_anon_key');
  } else {
    localStorage.setItem('7hive_supabase_url', url.trim());
    localStorage.setItem('7hive_supabase_anon_key', key.trim());
  }
}

export function createSupabase() {
  const { url, key } = getSupabaseConfig();
  if (!url || !key) return null;
  try {
    return createClient(url, key);
  } catch (err) {
    console.error("Failed to initialize Supabase client:", err);
    return null;
  }
}

// Local Storage Fallback State Manager
const STORAGE_KEYS = {
  SERVICES: '7hive_store_services',
  CASE_STUDIES: '7hive_store_case_studies',
  TESTIMONIALS: '7hive_store_testimonials',
  FAQS: '7hive_store_faqs',
  BLOG_POSTS: '7hive_store_blog_posts',
  SEO: '7hive_store_seo',
  LEADS: '7hive_store_leads',
  ADMIN_PASSWORD: '7hive_admin_password'
};

// SQL Schema for users to copy/paste into Supabase SQL Editor
export const SUPABASE_SQL_SETUP = `-- 1. Services Table
CREATE TABLE IF NOT EXISTS public.services (
  id TEXT PRIMARY KEY,
  icon TEXT,
  title TEXT NOT NULL,
  "desc" TEXT NOT NULL,
  category TEXT NOT NULL CHECK (category IN ('dev', 'marketing', 'automation')),
  benefits TEXT[] NOT NULL DEFAULT '{}',
  outcome TEXT NOT NULL
);

-- 2. Client Works (Case Studies) Table
CREATE TABLE IF NOT EXISTS public.case_studies (
  id TEXT PRIMARY KEY,
  icon TEXT,
  industry TEXT NOT NULL,
  title TEXT NOT NULL,
  "desc" TEXT NOT NULL,
  category TEXT NOT NULL CHECK (category IN ('lead-gen', 'local', 'seo')),
  metrics JSONB NOT NULL DEFAULT '[]'
);

-- 3. Testimonials Table
CREATE TABLE IF NOT EXISTS public.testimonials (
  id TEXT PRIMARY KEY,
  stars INT NOT NULL DEFAULT 5,
  text TEXT NOT NULL,
  author TEXT NOT NULL,
  avatar_initials TEXT,
  role TEXT NOT NULL
);

-- 4. FAQ Item Table
CREATE TABLE IF NOT EXISTS public.faqs (
  id TEXT PRIMARY KEY,
  question TEXT NOT NULL,
  answer TEXT NOT NULL,
  category TEXT NOT NULL CHECK (category IN ('general', 'services', 'automation', 'pricing'))
);

-- 5. Blogs Table
CREATE TABLE IF NOT EXISTS public.blogs (
  id TEXT PRIMARY KEY,
  visual TEXT NOT NULL,
  date TEXT NOT NULL,
  tag TEXT NOT NULL,
  title TEXT NOT NULL,
  "desc" TEXT NOT NULL
);

-- 6. SEO Config Table
CREATE TABLE IF NOT EXISTS public.seo_config (
  page_id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  keywords TEXT NOT NULL
);

-- 7. Captured Leads Table
CREATE TABLE IF NOT EXISTS public.leads (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  full_name TEXT NOT NULL,
  email_addr TEXT NOT NULL,
  company_name TEXT,
  services TEXT[],
  budget TEXT,
  website_url TEXT,
  additional_notes TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Enable Real-time and security exceptions (optional)
ALTER TABLE public.services ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.case_studies ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.testimonials ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.faqs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.blogs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.seo_config ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.leads ENABLE ROW LEVEL SECURITY;

-- Creating general public select/update policies to ease bootstrapping
CREATE POLICY "Public Read Access Services" ON public.services FOR SELECT USING (true);
CREATE POLICY "Public Read Access Case Studies" ON public.case_studies FOR SELECT USING (true);
CREATE POLICY "Public Read Access Testimonials" ON public.testimonials FOR SELECT USING (true);
CREATE POLICY "Public Read Access FAQs" ON public.faqs FOR SELECT USING (true);
CREATE POLICY "Public Read Access Blogs" ON public.blogs FOR SELECT USING (true);
CREATE POLICY "Public Read Access SEO" ON public.seo_config FOR SELECT USING (true);

CREATE POLICY "Public Write Access Services" ON public.services FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Public Write Access Case Studies" ON public.case_studies FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Public Write Access Testimonials" ON public.testimonials FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Public Write Access FAQs" ON public.faqs FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Public Write Access Blogs" ON public.blogs FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Public Write Access SEO" ON public.seo_config FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Public Insert Access Leads" ON public.leads FOR INSERT WITH CHECK (true);
CREATE POLICY "Public Read Access Leads" ON public.leads FOR SELECT USING (true);
CREATE POLICY "Public Delete/Update Access Leads" ON public.leads FOR ALL USING (true) WITH CHECK (true);
`;

// Initialize local structures if missing
function getLocal<T>(key: string, initial: T): T {
  const cached = localStorage.getItem(key);
  if (cached) {
    try {
      return JSON.parse(cached);
    } catch (e) {
      return initial;
    }
  }
  localStorage.setItem(key, JSON.stringify(initial));
  return initial;
}

function setLocal<T>(key: string, data: T) {
  localStorage.setItem(key, JSON.stringify(data));
}

// Unified Store provider
export const dynamicStore = {
  getSupabaseConfig,
  saveLocalSupabaseConfig,
  createSupabase,

  // Load standard password (default is "7hiveAdmin123")
  getAdminPassword(): string {
    return localStorage.getItem(STORAGE_KEYS.ADMIN_PASSWORD) || '7hiveAdmin123';
  },

  setAdminPassword(pwd: string) {
    localStorage.setItem(STORAGE_KEYS.ADMIN_PASSWORD, pwd);
  },

  // 1. SERVICES
  async getServices(): Promise<Service[]> {
    const supabase = createSupabase();
    if (supabase) {
      try {
        const { data, error } = await supabase
          .from('services')
          .select('*');
        if (!error && data && data.length > 0) {
          return data.map(itm => ({
            id: itm.id,
            icon: itm.icon,
            title: itm.title,
            desc: itm.desc,
            category: itm.category,
            benefits: itm.benefits || [],
            outcome: itm.outcome
          }));
        }
      } catch (e) {
        console.warn("Supabase failed to load Services, falling back to local DB:", e);
      }
    }
    return getLocal<Service[]>(STORAGE_KEYS.SERVICES, SERVICES);
  },

  async saveServices(items: Service[]): Promise<boolean> {
    setLocal(STORAGE_KEYS.SERVICES, items);
    const supabase = createSupabase();
    if (supabase) {
      try {
        // Upsert all items elements
        const { error } = await supabase
          .from('services')
          .upsert(items.map(itm => ({
            id: itm.id,
            icon: itm.icon,
            title: itm.title,
            desc: itm.desc,
            category: itm.category,
            benefits: itm.benefits,
            outcome: itm.outcome
          })));
        return !error;
      } catch (e) {
        console.error("Supabase Services save error", e);
        return false;
      }
    }
    return true;
  },

  // 2. CLIENT WORKS (CASE STUDIES)
  async getCaseStudies(): Promise<CaseStudy[]> {
    const supabase = createSupabase();
    if (supabase) {
      try {
        const { data, error } = await supabase
          .from('case_studies')
          .select('*');
        if (!error && data && data.length > 0) {
          return data.map(itm => ({
            id: itm.id,
            icon: itm.icon,
            industry: itm.industry,
            title: itm.title,
            desc: itm.desc,
            category: itm.category,
            metrics: typeof itm.metrics === 'string' ? JSON.parse(itm.metrics) : itm.metrics
          }));
        }
      } catch (e) {
        console.warn("Supabase load CaseStudies error", e);
      }
    }
    return getLocal<CaseStudy[]>(STORAGE_KEYS.CASE_STUDIES, CASE_STUDIES);
  },

  async saveCaseStudies(items: CaseStudy[]): Promise<boolean> {
    setLocal(STORAGE_KEYS.CASE_STUDIES, items);
    const supabase = createSupabase();
    if (supabase) {
      try {
        const { error } = await supabase
          .from('case_studies')
          .upsert(items.map(itm => ({
            id: itm.id,
            icon: itm.icon,
            industry: itm.industry,
            title: itm.title,
            desc: itm.desc,
            category: itm.category,
            metrics: itm.metrics
          })));
        return !error;
      } catch (e) {
        console.error("Supabase Case Studies write error", e);
        return false;
      }
    }
    return true;
  },

  // 3. TESTIMONIALS
  async getTestimonials(): Promise<Testimonial[]> {
    const supabase = createSupabase();
    if (supabase) {
      try {
        const { data, error } = await supabase
          .from('testimonials')
          .select('*');
        if (!error && data && data.length > 0) {
          return data.map(itm => ({
            id: itm.id,
            stars: itm.stars,
            text: itm.text,
            author: itm.author,
            avatarInitials: itm.avatar_initials || itm.author.slice(0, 2).toUpperCase(),
            role: itm.role
          }));
        }
      } catch (e) {
        console.warn("Supabase testimonials load error", e);
      }
    }
    return getLocal<Testimonial[]>(STORAGE_KEYS.TESTIMONIALS, TESTIMONIALS);
  },

  async saveTestimonials(items: Testimonial[]): Promise<boolean> {
    setLocal(STORAGE_KEYS.TESTIMONIALS, items);
    const supabase = createSupabase();
    if (supabase) {
      try {
        const { error } = await supabase
          .from('testimonials')
          .upsert(items.map(itm => ({
            id: itm.id,
            stars: itm.stars,
            text: itm.text,
            author: itm.author,
            avatar_initials: itm.avatarInitials,
            role: itm.role
          })));
        return !error;
      } catch (e) {
        console.error("Supabase testimonials save error", e);
        return false;
      }
    }
    return true;
  },

  // 4. FAQS
  async getFAQs(): Promise<FAQItem[]> {
    const supabase = createSupabase();
    if (supabase) {
      try {
        const { data, error } = await supabase
          .from('faqs')
          .select('*');
        if (!error && data && data.length > 0) {
          return data;
        }
      } catch (e) {
        console.warn("Supabase FAQs load error", e);
      }
    }
    return getLocal<FAQItem[]>(STORAGE_KEYS.FAQS, FAQS);
  },

  async saveFAQs(items: FAQItem[]): Promise<boolean> {
    setLocal(STORAGE_KEYS.FAQS, items);
    const supabase = createSupabase();
    if (supabase) {
      try {
        const { error } = await supabase
          .from('faqs')
          .upsert(items);
        return !error;
      } catch (e) {
        console.error("Supabase FAQs save error", e);
        return false;
      }
    }
    return true;
  },

  // 5. BLOG POSTS (Uploading / Editing)
  async getBlogs(): Promise<BlogPost[]> {
    const supabase = createSupabase();
    if (supabase) {
      try {
        const { data, error } = await supabase
          .from('blogs')
          .select('*');
        if (!error && data && data.length > 0) {
          return data;
        }
      } catch (e) {
        console.warn("Supabase Blogs load error:", e);
      }
    }
    return getLocal<BlogPost[]>(STORAGE_KEYS.BLOG_POSTS, BLOG_POSTS);
  },

  async saveBlogs(items: BlogPost[]): Promise<boolean> {
    setLocal(STORAGE_KEYS.BLOG_POSTS, items);
    const supabase = createSupabase();
    if (supabase) {
      try {
        const { error } = await supabase
          .from('blogs')
          .upsert(items);
        return !error;
      } catch (e) {
        console.error("Supabase saveBlogs error:", e);
        return false;
      }
    }
    return true;
  },

  // 6. SEO configurations
  async getSEOConfig(): Promise<SEOItem[]> {
    const supabase = createSupabase();
    if (supabase) {
      try {
        const { data, error } = await supabase
          .from('seo_config')
          .select('*');
        if (!error && data && data.length > 0) {
          return data;
        }
      } catch (e) {
        console.warn("Supabase SEO config load error:", e);
      }
    }
    return getLocal<SEOItem[]>(STORAGE_KEYS.SEO, DEFAULT_SEO);
  },

  async saveSEOConfig(items: SEOItem[]): Promise<boolean> {
    setLocal(STORAGE_KEYS.SEO, items);
    const supabase = createSupabase();
    if (supabase) {
      try {
        const { error } = await supabase
          .from('seo_config')
          .upsert(items);
        return !error;
      } catch (e) {
        console.error("Supabase saveSEOConfig error:", e);
        return false;
      }
    }
    return true;
  },

  // 7. CAPTURED FORM LEADS
  async getLeads(): Promise<any[]> {
    const supabase = createSupabase();
    if (supabase) {
      try {
        const { data, error } = await supabase
          .from('leads')
          .select('*')
          .order('created_at', { ascending: false });
        if (!error && data) {
          return data.map(itm => ({
            id: itm.id,
            fullName: itm.full_name,
            emailAddr: itm.email_addr,
            companyName: itm.company_name,
            services: itm.services || [],
            budget: itm.budget || '',
            websiteUrl: itm.website_url || '',
            additionalNotes: itm.additional_notes || '',
            created_at: itm.created_at
          }));
        }
      } catch (e) {
        console.warn("Supabase Leads load error:", e);
      }
    }
    return getLocal<any[]>(STORAGE_KEYS.LEADS, []);
  },

  async captureLead(leadData: OnboardingState): Promise<boolean> {
    const id = Math.random().toString(36).substring(2, 9);
    const currentLeads = getLocal<any[]>(STORAGE_KEYS.LEADS, []);
    const newLead = {
      ...leadData,
      id,
      created_at: new Date().toISOString()
    };
    currentLeads.unshift(newLead);
    setLocal(STORAGE_KEYS.LEADS, currentLeads);

    const supabase = createSupabase();
    if (supabase) {
      try {
        const { error } = await supabase
          .from('leads')
          .insert([{
            full_name: leadData.fullName,
            email_addr: leadData.emailAddr,
            company_name: leadData.companyName,
            services: leadData.services,
            budget: leadData.budget,
            website_url: leadData.websiteUrl,
            additional_notes: leadData.additionalNotes
          }]);
        return !error;
      } catch (e) {
        console.error("Supabase captureLead error:", e);
        return false;
      }
    }
    return true;
  },

  async deleteLead(id: string): Promise<boolean> {
    const currentLeads = getLocal<any[]>(STORAGE_KEYS.LEADS, []);
    const updated = currentLeads.filter(l => l.id !== id);
    setLocal(STORAGE_KEYS.LEADS, updated);

    const supabase = createSupabase();
    if (supabase) {
      try {
        // Since id might be text locally, if it's uuid in Supabase, we try. If it's not a UUID, let's skip supabase delete if it is localized
        const { error } = await supabase
          .from('leads')
          .delete()
          .eq('id', id);
        return !error;
      } catch (e) {
        console.error("Supabase deleteLead error:", e);
        return false;
      }
    }
    return true;
  },

  // MASS INITIALIZER / SEED FUNCTION
  async seedSupabase(): Promise<{ success: boolean; log: string }> {
    const supabase = createSupabase();
    if (!supabase) {
      return { success: false, log: "Supabase client is not configured. Add credentials in Settings tab first." };
    }
    let logs = [];
    try {
      logs.push("Initializing seeding script...");
      
      const resSvc = await this.saveServices(getLocal<Service[]>(STORAGE_KEYS.SERVICES, SERVICES));
      logs.push(resSvc ? "✓ Successfully seeded Services table." : "✗ Failed to seed Services table. Ensure schema is applied.");

      const resCase = await this.saveCaseStudies(getLocal<CaseStudy[]>(STORAGE_KEYS.CASE_STUDIES, CASE_STUDIES));
      logs.push(resCase ? "✓ Successfully seeded Case Studies (client works) table." : "✗ Failed to seed Case Studies. Ensure schema is applied.");

      const resTest = await this.saveTestimonials(getLocal<Testimonial[]>(STORAGE_KEYS.TESTIMONIALS, TESTIMONIALS));
      logs.push(resTest ? "✓ Successfully seeded Testimonials table." : "✗ Failed to seed Testimonials. Ensure schema is applied.");

      const resFaq = await this.saveFAQs(getLocal<FAQItem[]>(STORAGE_KEYS.FAQS, FAQS));
      logs.push(resFaq ? "✓ Successfully seeded FAQs table." : "✗ Failed to seed FAQs. Ensure schema is applied.");

      const resBlog = await this.saveBlogs(getLocal<BlogPost[]>(STORAGE_KEYS.BLOG_POSTS, BLOG_POSTS));
      logs.push(resBlog ? "✓ Successfully seeded Blogs table." : "✗ Failed to seed Blogs. Ensure schema is applied.");

      const resSeo = await this.saveSEOConfig(getLocal<SEOItem[]>(STORAGE_KEYS.SEO, DEFAULT_SEO));
      logs.push(resSeo ? "✓ Successfully seeded SEO tag configurations." : "✗ Failed to seed SEO. Ensure schema is applied.");

      const allSuccess = resSvc && resCase && resTest && resFaq && resBlog && resSeo;
      return {
        success: allSuccess,
        log: logs.join("\n") + (allSuccess ? "\n\nSeeding completed successfully!" : "\n\nSome tables failed. Did you apply the SQL schema first via Supabase dashboard?")
      };
    } catch (e: any) {
      return { success: false, log: logs.join("\n") + `\n\nError: ${e.message || e}` };
    }
  }
};

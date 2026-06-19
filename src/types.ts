export interface Service {
  id: string;
  icon: string;
  title: string;
  desc: string;
  category: 'dev' | 'marketing' | 'automation';
  benefits: string[];
  outcome: string;
}

export interface CaseStudy {
  id: string;
  icon: string;
  industry: string;
  title: string;
  desc: string;
  category: 'lead-gen' | 'local' | 'seo';
  metrics: {
    value: string;
    label: string;
  }[];
}

export interface Testimonial {
  id: string;
  stars: number;
  text: string;
  author: string;
  avatarInitials: string;
  role: string;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: 'general' | 'services' | 'automation' | 'pricing';
}

export interface BlogPost {
  id: string;
  visual: string;
  date: string;
  tag: string;
  title: string;
  desc: string;
}

export interface OnboardingState {
  fullName: string;
  emailAddr: string;
  companyName: string;
  services: string[];
  budget: 'under-50k' | '50k-2l' | 'above-2l' | '';
  websiteUrl: string;
  additionalNotes: string;
}

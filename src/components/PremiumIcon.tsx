import React from 'react';
import {
  Globe,
  RefreshCw,
  Search,
  BarChart3,
  Smartphone,
  Megaphone,
  Target,
  Zap,
  MessageSquare,
  Database,
  Unlink,
  Sun,
  Store,
  Scale,
  HelpCircle,
  TrendingUp,
  Code,
  BrainCircuit,
  Clapperboard,
  Building2,
  Trophy,
  LucideProps
} from 'lucide-react';

const ICON_MAP: Record<string, React.ComponentType<LucideProps>> = {
  // Services & Solutions
  'Globe': Globe,
  'RefreshCw': RefreshCw,
  'Search': Search,
  'BarChart3': BarChart3,
  'Smartphone': Smartphone,
  'Megaphone': Megaphone,
  'Target': Target,
  'Zap': Zap,
  'MessageSquare': MessageSquare,
  'Database': Database,

  // Problem Grid / Home Problems
  'Unlink': Unlink,
  
  // Case Studies
  'Sun': Sun,
  'Store': Store,
  'Scale': Scale,

  // Expertise Section
  'TrendingUp': TrendingUp,
  'Code': Code,
  'BrainCircuit': BrainCircuit,
  'Clapperboard': Clapperboard,
  'Building2': Building2,
  'Trophy': Trophy
};

interface PremiumIconProps {
  name: string;
  className?: string;
  size?: number;
}

export function PremiumIcon({ name, className = '', size = 20 }: PremiumIconProps) {
  // Match by name directly or map old emojis if they occur
  const IconComponent = ICON_MAP[name] || (() => {
    // Graceful fallback / emoji backport mapping if data was not fully migrated
    switch (name) {
      case '🌐': return Globe;
      case '🔄': return RefreshCw;
      case '🔍': return Search;
      case '📊': return BarChart3;
      case '📱': return Smartphone;
      case '📣': return Megaphone;
      case '🎯': return Target;
      case '⚡': return Zap;
      case '💬': return MessageSquare;
      case '🗂️': return Database;
      case '🔗': return Unlink;
      case '📢': return Megaphone;
      case '☀️': return Sun;
      case '🏪': return Store;
      case '⚖️': return Scale;
      case '🏆': return Trophy;
      default: return HelpCircle;
    }
  })();

  return (
    <div 
      className={`inline-flex items-center justify-center rounded-xl bg-gradient-to-br from-[#0A84FF]/12 to-[#0A84FF]/2 dark:from-[#0A84FF]/18 dark:to-transparent text-[#0A84FF] border border-[#0A84FF]/20 shadow-[inset_0_1.5px_1px_rgba(255,255,255,0.15)] ${className}`}
      id={`premium-icon-${name.toLowerCase().replace(/[^a-z0-9]/g, '-')}`}
    >
      <IconComponent size={size} className="stroke-[2.2] drop-shadow-[0_2px_8px_rgba(10,132,255,0.25)]" />
    </div>
  );
}

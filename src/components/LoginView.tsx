import React, { useState } from 'react';
import { Lock, Eye, EyeOff, ShieldCheck, KeyRound } from 'lucide-react';
import { Logo } from './Logo';
import { dynamicStore } from '../lib/dynamicStore';

interface LoginViewProps {
  onNavigate: (view: string) => void;
}

export function LoginView({ onNavigate }: LoginViewProps) {
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    const correctPassword = dynamicStore.getAdminPassword();
    
    if (password === correctPassword) {
      setSuccess(true);
      sessionStorage.setItem('7hive_admin_authorized', 'true');
      setTimeout(() => {
        onNavigate('admin');
      }, 1000);
    } else {
      setError('Access denied. Incorrect administrator passphrase.');
    }
  };

  return (
    <div className="pt-20 min-h-screen flex items-center justify-center bg-neutral-50 dark:bg-[#121212] transition-colors duration-300 px-6">
      <div className="absolute inset-x-0 top-0 h-64 bg-gradient-to-b from-[#0A84FF]/5 to-transparent pointer-events-none select-none" />
      
      <div className="w-full max-w-md bg-white dark:bg-[#1a1a1a] rounded-3xl border border-black/5 dark:border-white/10 p-8 shadow-[0_20px_50px_rgba(0,0,0,0.05)] relative z-10 space-y-8">
        
        {/* Header Title branding */}
        <div className="text-center space-y-4">
          <div className="flex justify-center">
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-[#0A84FF]/25 to-blue-500/10 rounded-full blur-xl opacity-75"></div>
              <Logo className="w-24 h-24 relative" />
            </div>
          </div>
          <p className="text-xs font-bold text-[#0A84FF] uppercase tracking-widest font-sans">SECURITY GUARD</p>
          <h1 className="text-2xl font-bold tracking-tight text-neutral-900 dark:text-neutral-50">
            Admin Panel Access
          </h1>
          <p className="text-xs text-neutral-500 dark:text-neutral-400">
            Prove identity credentials to enter the 7Hive administrative backend framework.
          </p>
        </div>

        {/* Form content */}
        <form onSubmit={handleLoginSubmit} className="space-y-6">
          <div className="space-y-2 relative">
            <label className="text-xs font-bold text-neutral-400 dark:text-neutral-500 uppercase tracking-wide">
              Security Passphrase
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                <Lock className="h-4.5 w-4.5 text-neutral-400" />
              </span>
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter system master password..."
                className="w-full pl-10 pr-10 py-3.5 text-xs border border-black/10 dark:border-white/10 rounded-xl bg-neutral-50 dark:bg-[#121212] focus:outline-none focus:border-[#0A84FF] text-stone-950 dark:text-white transition-all font-mono"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-neutral-400 hover:text-[#0A84FF] transition-colors"
              >
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
          </div>

          {error && (
            <div className="p-3 text-xs text-red-600 dark:text-red-400 bg-red-500/10 rounded-lg text-center font-medium border border-red-500/20">
              {error}
            </div>
          )}

          {success && (
            <div className="p-3 text-xs text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 rounded-lg text-center font-medium border border-emerald-500/20 flex items-center justify-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-500" />
              Identified authorized operator — Logging in...
            </div>
          )}

          <button
            type="submit"
            className="w-full py-3 px-4 bg-[#0A84FF] hover:bg-blue-600 focus:outline-none text-white rounded-xl text-xs font-bold uppercase tracking-wider transition-all shadow-[0_4px_16px_rgba(10,132,255,0.22)] active:scale-98 cursor-pointer flex items-center justify-center gap-2"
          >
            <KeyRound className="w-3.5 h-3.5" />
            Proceed to Control Room
          </button>
        </form>

        <div className="text-center pt-2">
          <button
            type="button"
            onClick={() => onNavigate('home')}
            className="text-xs text-neutral-400 hover:text-[#0A84FF] transition-colors"
          >
            ← Return to public website
          </button>
        </div>
      </div>
    </div>
  );
}

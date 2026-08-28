import React, { useState } from 'react';
import {
  LayoutDashboard,
  Sparkles,
  FileText,
  TrendingUp,
  Search,
  BookmarkCheck,
  Menu,
  X,
  Compass,
  ArrowRight,
} from 'lucide-react';
import { ThemeToggle } from './ThemeToggle';

export type NavView =
  | 'landing'
  | 'dashboard'
  | 'analyzer'
  | 'generator'
  | 'trends'
  | 'search'
  | 'saved';

interface NavbarProps {
  currentView: NavView;
  onNavigate: (view: NavView) => void;
  savedCount?: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentView,
  onNavigate,
  savedCount = 0,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'dashboard' as NavView, label: 'Dashboard', icon: LayoutDashboard },
    { id: 'analyzer' as NavView, label: 'Product Analyzer', icon: Sparkles, badge: 'AI' },
    { id: 'generator' as NavView, label: 'Listing Generator', icon: FileText, badge: 'AI' },
    { id: 'trends' as NavView, label: 'Market Trends', icon: TrendingUp },
    { id: 'search' as NavView, label: 'Product Search', icon: Search },
    {
      id: 'saved' as NavView,
      label: 'Saved',
      icon: BookmarkCheck,
      count: savedCount,
    },
  ];

  const handleNav = (view: NavView) => {
    onNavigate(view);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b border-[#27272a] bg-[#09090b]/95 backdrop-blur-md text-[#fafafa] transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Brand Logo */}
          <div className="flex items-center gap-6">
            <button
              type="button"
              id="brand-logo-btn"
              onClick={() => handleNav('landing')}
              className="flex items-center gap-2.5 group text-left cursor-pointer focus:outline-none"
            >
              <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center text-white shadow-sm shadow-indigo-600/30 group-hover:scale-105 transition-transform">
                <TrendingUp className="w-5 h-5 text-white" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-bold text-xl tracking-tight text-[#fafafa]">
                    Prime Market
                  </span>
                  <span className="text-[10px] uppercase font-semibold tracking-wider px-1.5 py-0.5 rounded bg-[#18181b] text-indigo-400 border border-[#27272a]">
                    SaaS
                  </span>
                </div>
                <p className="text-[11px] text-[#71717a] -mt-0.5 font-medium hidden sm:block">
                  AI Marketplace Intelligence
                </p>
              </div>
            </button>

            {/* Desktop Navigation Links */}
            <nav className="hidden md:flex items-center gap-1.5">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = currentView === item.id;
                return (
                  <button
                    key={item.id}
                    type="button"
                    id={`nav-link-${item.id}`}
                    onClick={() => handleNav(item.id)}
                    className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-sm font-medium transition-all cursor-pointer ${
                      isActive
                        ? 'bg-[#27272a] text-white shadow-xs'
                        : 'text-[#a1a1aa] hover:text-white hover:bg-[#27272a]/60'
                    }`}
                  >
                    <Icon className={`w-4 h-4 ${isActive ? 'text-indigo-400' : 'text-[#71717a]'}`} />
                    <span>{item.label}</span>
                    {item.badge && (
                      <span className="text-[10px] font-bold px-1.5 py-0.2 rounded bg-[#18181b] text-indigo-400 border border-[#27272a]">
                        {item.badge}
                      </span>
                    )}
                    {item.count !== undefined && item.count > 0 && (
                      <span className="text-xs font-semibold px-2 py-0.2 rounded-full bg-[#18181b] text-[#a1a1aa] border border-[#27272a]">
                        {item.count}
                      </span>
                    )}
                  </button>
                );
              })}
            </nav>
          </div>

          {/* Right Action Controls: Quick Launch CTA & Theme Toggle (NO LOGIN, NO SIGNUP) */}
          <div className="flex items-center gap-3">
            <ThemeToggle />

            {currentView === 'landing' ? (
              <button
                type="button"
                id="header-quick-launch-btn"
                onClick={() => handleNav('analyzer')}
                className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-sm font-semibold bg-indigo-600 hover:bg-indigo-500 text-white shadow-xs transition-colors cursor-pointer"
              >
                <span>Launch App</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                type="button"
                id="header-quick-analyze-btn"
                onClick={() => handleNav('analyzer')}
                className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-sm font-semibold bg-[#18181b] hover:bg-[#27272a] text-[#fafafa] border border-[#27272a] transition-colors cursor-pointer"
              >
                <Sparkles className="w-4 h-4 text-indigo-400" />
                <span>Quick Analyze</span>
              </button>
            )}

            {/* Mobile menu hamburger button */}
            <button
              type="button"
              id="mobile-nav-toggle-btn"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-lg text-[#a1a1aa] hover:text-[#fafafa] hover:bg-[#18181b] focus:outline-none"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-[#27272a] bg-[#09090b] px-4 pt-3 pb-5 space-y-1 shadow-2xl">
          <div className="text-xs font-semibold uppercase tracking-wider text-[#71717a] px-3 py-1">
            Navigation
          </div>

          <button
            type="button"
            onClick={() => handleNav('landing')}
            className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors cursor-pointer ${
              currentView === 'landing'
                ? 'bg-[#27272a] text-white font-semibold'
                : 'text-[#a1a1aa] hover:bg-[#18181b] hover:text-white'
            }`}
          >
            <Compass className="w-4 h-4 text-indigo-400" />
            <span>Product Overview</span>
          </button>

          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentView === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => handleNav(item.id)}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium transition-colors cursor-pointer ${
                  isActive
                    ? 'bg-[#27272a] text-white font-semibold'
                    : 'text-[#a1a1aa] hover:bg-[#18181b] hover:text-white'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Icon className={`w-4 h-4 ${isActive ? 'text-indigo-400' : 'text-[#71717a]'}`} />
                  <span>{item.label}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  {item.badge && (
                    <span className="text-[10px] font-bold px-1.5 py-0.2 rounded bg-[#18181b] text-indigo-400 border border-[#27272a]">
                      {item.badge}
                    </span>
                  )}
                  {item.count !== undefined && item.count > 0 && (
                    <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-[#18181b] text-[#a1a1aa] border border-[#27272a]">
                      {item.count}
                    </span>
                  )}
                </div>
              </button>
            );
          })}
        </div>
      )}
    </header>
  );
};

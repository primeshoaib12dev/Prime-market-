import React, { useEffect, useState } from 'react';
import { Sun, Moon, Monitor } from 'lucide-react';

export type Theme = 'light' | 'dark' | 'system';

export const ThemeToggle: React.FC = () => {
  const [theme, setTheme] = useState<Theme>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('pm-theme') as Theme;
      if (saved) return saved;
    }
    return 'dark';
  });

  useEffect(() => {
    const root = document.documentElement;
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

    const applyTheme = () => {
      const isDark =
        theme === 'dark' || (theme === 'system' && mediaQuery.matches);
      if (isDark) {
        root.classList.add('dark');
      } else {
        root.classList.remove('dark');
      }
    };

    applyTheme();
    localStorage.setItem('pm-theme', theme);

    const listener = () => {
      if (theme === 'system') applyTheme();
    };
    mediaQuery.addEventListener('change', listener);
    return () => mediaQuery.removeEventListener('change', listener);
  }, [theme]);

  const cycleTheme = () => {
    if (theme === 'light') setTheme('dark');
    else if (theme === 'dark') setTheme('system');
    else setTheme('light');
  };

  return (
    <div className="flex items-center rounded-lg bg-[#18181b] p-0.5 border border-[#27272a]">
      <button
        type="button"
        id="theme-light-btn"
        onClick={() => setTheme('light')}
        className={`p-1.5 rounded-md text-xs font-medium transition-colors ${
          theme === 'light'
            ? 'bg-[#27272a] text-amber-400 shadow-xs'
            : 'text-[#71717a] hover:text-[#fafafa]'
        }`}
        title="Light Mode"
        aria-label="Switch to Light Mode"
      >
        <Sun className="w-4 h-4" />
      </button>

      <button
        type="button"
        id="theme-dark-btn"
        onClick={() => setTheme('dark')}
        className={`p-1.5 rounded-md text-xs font-medium transition-colors ${
          theme === 'dark'
            ? 'bg-[#27272a] text-indigo-400 shadow-xs'
            : 'text-[#71717a] hover:text-[#fafafa]'
        }`}
        title="Dark Mode"
        aria-label="Switch to Dark Mode"
      >
        <Moon className="w-4 h-4" />
      </button>

      <button
        type="button"
        id="theme-system-btn"
        onClick={() => setTheme('system')}
        className={`p-1.5 rounded-md text-xs font-medium transition-colors ${
          theme === 'system'
            ? 'bg-[#27272a] text-teal-400 shadow-xs'
            : 'text-[#71717a] hover:text-[#fafafa]'
        }`}
        title="System Preference"
        aria-label="Follow System Theme"
      >
        <Monitor className="w-4 h-4" />
      </button>
    </div>
  );
};

import React from 'react';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';

const ThemeToggle = ({ size = 'md', className = '' }) => {
  const { isDark, toggleTheme } = useTheme();
  const sizes = { sm: 'w-7 h-7', md: 'w-9 h-9', lg: 'w-10 h-10' };
  const icons = { sm: 'w-3.5 h-3.5', md: 'w-4 h-4', lg: 'w-5 h-5' };

  return (
    <button
      onClick={toggleTheme}
      title={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      className={`${sizes[size]} flex items-center justify-center rounded-lg border transition-all duration-200 ${className}`}
      style={{
        background:   isDark ? 'rgba(232,101,10,0.1)' : 'var(--bg-overlay)',
        borderColor:  isDark ? 'var(--brand-border)' : 'var(--border-base)',
        color:        isDark ? 'var(--brand)' : 'var(--text-secondary)',
      }}
    >
      {isDark
        ? <Sun  className={icons[size]} />
        : <Moon className={icons[size]} />
      }
    </button>
  );
};

export default ThemeToggle;

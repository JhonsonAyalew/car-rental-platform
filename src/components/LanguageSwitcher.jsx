import React, { useState, useRef, useEffect } from 'react';
import { Languages, ChevronDown, Check } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';

const LANGS = [
  { code: 'en', name: 'English',  short: 'EN' },
  { code: 'am', name: 'አማርኛ', short: 'አማ' },
];

const LanguageSwitcher = ({ compact = false }) => {
  const { i18n } = useTranslation();
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  const current = LANGS.find(l => l.code === i18n.language) ?? LANGS[0];

  useEffect(() => {
    const fn = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
    document.addEventListener('mousedown', fn);
    return () => document.removeEventListener('mousedown', fn);
  }, []);

  const change = (code) => {
    i18n.changeLanguage(code);
    localStorage.setItem('i18nextLng', code);
    setOpen(false);
  };

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen(o => !o)}
        className="flex items-center gap-1.5 px-2.5 py-1.5 border transition-all duration-150"
        style={{
          background:   open ? 'var(--brand-muted)' : 'transparent',
          borderColor:  open ? 'var(--brand-border)' : 'var(--border-base)',
          color:        open ? 'var(--brand)' : 'var(--text-muted)',
          borderRadius: 'var(--r-md)',
        }}
      >
        <Languages className="w-3.5 h-3.5 flex-shrink-0" />
        {!compact && <span className="text-xs font-bold tracking-wider">{current.short}</span>}
        <ChevronDown className={`w-3 h-3 transition-transform duration-200 ${open ? 'rotate-180' : ''}`} />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -6, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.97 }}
            transition={{ duration: 0.12 }}
            className="absolute right-0 mt-1.5 w-36 border z-50 overflow-hidden"
            style={{
              background:   'var(--bg-elevated)',
              borderColor:  'var(--border-base)',
              borderRadius: 'var(--r-md)',
              boxShadow:    'var(--shadow-md)',
            }}
          >
            {LANGS.map(lang => (
              <button
                key={lang.code}
                onClick={() => change(lang.code)}
                className="w-full text-left px-3 py-2.5 text-sm flex items-center gap-2.5 transition-colors"
                style={{
                  background: lang.code === current.code ? 'var(--brand-muted)' : 'transparent',
                  color:      lang.code === current.code ? 'var(--brand)' : 'var(--text-secondary)',
                }}
              >
                <span className="text-xs font-black w-5">{lang.short}</span>
                <span className="flex-1">{lang.name}</span>
                {lang.code === current.code && <Check className="w-3.5 h-3.5" />}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default LanguageSwitcher;

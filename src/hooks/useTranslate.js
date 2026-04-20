// ─── useTranslate.js ────────────────────────────────
import { useTranslation } from 'react-i18next';

/**
 * Thin wrapper around react-i18next's useTranslation.
 * Provides a `tl` helper that returns the translated string
 * or falls back to the key if missing.
 */
const useTranslate = (namespace = 'common') => {
  const { t, i18n } = useTranslation(namespace);
  return {
    t,
    tl: (key, fallback = key) => {
      const result = t(key);
      return result === key ? fallback : result;
    },
    lang:      i18n.language,
    changeLang: (lng) => {
      i18n.changeLanguage(lng);
      localStorage.setItem('i18nextLng', lng);
    },
    isAmharic: i18n.language === 'am',
    isEnglish: i18n.language === 'en',
  };
};

export default useTranslate;

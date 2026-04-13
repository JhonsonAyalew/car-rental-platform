import { useTranslation } from 'react-i18next';

export const useTranslate = () => {
  const { t, i18n } = useTranslation();
  
  const translate = (key, options = {}) => {
    return t(key, options);
  };
  
  const getCurrentLanguage = () => i18n.language;
  
  const isAmharic = () => i18n.language === 'am';
  
  const isEnglish = () => i18n.language === 'en';
  
  return {
    t: translate,
    i18n,
    currentLanguage: getCurrentLanguage(),
    isAmharic: isAmharic(),
    isEnglish: isEnglish(),
    changeLanguage: (lang) => i18n.changeLanguage(lang)
  };
};

export default useTranslate;

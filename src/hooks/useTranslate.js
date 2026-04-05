import { useTranslation } from 'react-i18next';

export const useTranslate = () => {
  const { t, i18n } = useTranslation();
  
  const changeLanguage = (lang) => {
    i18n.changeLanguage(lang);
    localStorage.setItem('language', lang);
  };
  
  const currentLanguage = i18n.language;
  
  return { t, changeLanguage, currentLanguage };
};

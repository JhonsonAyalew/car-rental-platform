import React from 'react';
import { useTranslation } from 'react-i18next';
import { Globe } from 'lucide-react';

const LanguageSwitcher = () => {
  const { i18n, t } = useTranslation();
  
  const languages = [
    { code: 'en', name: 'English', flag: '🇬🇧' },
    { code: 'am', name: 'አማርኛ', flag: '🇪🇹' }
  ];
  
  const changeLanguage = (langCode) => {
    i18n.changeLanguage(langCode);
    localStorage.setItem('i18nextLng', langCode);
  };
  
  const currentLanguage = languages.find(lang => lang.code === i18n.language) || languages[0];
  
  return (
    <div className="relative group">
      <button className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-[#F3F2EE] transition">
        <Globe className="w-4 h-4 text-[#52525B]" />
        <span className="text-sm font-medium text-[#1A1A1A]">{currentLanguage.flag} {currentLanguage.name}</span>
      </button>
      
      <div className="absolute right-0 mt-2 w-44 bg-white rounded-lg shadow-medium border border-[#E4E4E7] opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-50">
        {languages.map((lang) => (
          <button
            key={lang.code}
            onClick={() => changeLanguage(lang.code)}
            className={`
              w-full text-left px-4 py-2.5 hover:bg-[#F9F8F6] transition first:rounded-t-lg last:rounded-b-lg
              flex items-center gap-3
              ${i18n.language === lang.code ? 'bg-[#FEF3C7] text-[#D97706]' : 'text-[#1A1A1A]'}
            `}
          >
            <span className="text-lg">{lang.flag}</span>
            <span className="text-sm font-medium">{lang.name}</span>
            {i18n.language === lang.code && (
              <span className="ml-auto text-[#D97706] text-sm">✓</span>
            )}
          </button>
        ))}
      </div>
    </div>
  );
};

export default LanguageSwitcher;

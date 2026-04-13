import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Car, User, LogIn, Globe, ChevronDown, Languages } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const PublicLayout = () => {
  const { t } = useTranslation('publicLayout');
  const [languageMenuOpen, setLanguageMenuOpen] = React.useState(false);
  const [currentLang, setCurrentLang] = React.useState(() => {
    return localStorage.getItem('i18nextLng') || 'en';
  });
  
  const changeLanguage = (lng) => {
    setCurrentLang(lng);
    localStorage.setItem('i18nextLng', lng);
    window.location.reload();
  };
  
  const languageOptions = [
    { code: 'en', name: 'English' },
    { code: 'am', name: 'አማርኛ' }
  ];
  
  const currentLanguageName = languageOptions.find(lang => lang.code === currentLang)?.name || 'English';
  
  return (
    <div className="min-h-screen flex flex-col bg-[#F9F8F6]">
      {/* Navbar */}
      <nav className="bg-white border-b border-[#E4E4E7] sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2 group">
              <div className="relative">
                <Car className="w-8 h-8 text-[#D97706] group-hover:scale-110 transition-transform" />
                <div className="absolute -top-1 -right-1 w-2 h-2 bg-[#D97706] rounded-full animate-pulse" />
              </div>
              <span className="text-xl font-bold text-[#1A1A1A] group-hover:text-[#D97706] transition">
                {t('brand.name')}
              </span>
            </Link>
            
            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-6">
              <Link to="/search" className="text-[#52525B] hover:text-[#D97706] transition font-medium">
                {t('nav.browseCars')}
              </Link>
              <Link to="/about" className="text-[#52525B] hover:text-[#D97706] transition font-medium">
                {t('nav.about')}
              </Link>
              <Link to="/contact" className="text-[#52525B] hover:text-[#D97706] transition font-medium">
                {t('nav.contact')}
              </Link>
            </div>
            
            {/* Auth Buttons + Language Switcher */}
            <div className="flex items-center gap-3">
              {/* Language Switcher */}
              <div className="relative">
                <button
                  onClick={() => setLanguageMenuOpen(!languageMenuOpen)}
                  className="flex items-center gap-2 px-3 py-2 rounded-lg bg-[#F3F2EE] hover:bg-[#FEF3C7] transition group"
                >
                  <Languages className="w-4 h-4 text-[#D97706]" />
                  <span className="text-sm font-medium text-[#1A1A1A] hidden sm:inline">
                    {currentLanguageName}
                  </span>
                  <ChevronDown className={`w-3 h-3 text-[#52525B] transition-transform ${languageMenuOpen ? 'rotate-180' : ''}`} />
                </button>
                
                <AnimatePresence>
                  {languageMenuOpen && (
                    <>
                      <div className="fixed inset-0 z-40" onClick={() => setLanguageMenuOpen(false)} />
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="absolute right-0 mt-2 w-40 bg-white rounded-xl shadow-strong border border-[#E4E4E7] z-50 overflow-hidden"
                      >
                        {languageOptions.map((lang) => (
                          <button
                            key={lang.code}
                            onClick={() => {
                              changeLanguage(lang.code);
                              setLanguageMenuOpen(false);
                            }}
                            className={`
                              w-full text-left px-4 py-3 text-sm transition
                              ${currentLang === lang.code 
                                ? 'bg-[#D97706] text-white' 
                                : 'text-[#1A1A1A] hover:bg-[#FEF3C7]'
                              }
                            `}
                          >
                            <div className="flex items-center gap-2">
                              <div className={`w-2 h-2 rounded-full ${currentLang === lang.code ? 'bg-white' : 'bg-[#D97706]'}`} />
                              {lang.name}
                            </div>
                          </button>
                        ))}
                      </motion.div>
                    </>
                  )}
                </AnimatePresence>
              </div>
              
              <Link to="/login" className="text-[#52525B] hover:text-[#D97706] transition px-3 py-2">
                <LogIn className="w-5 h-5 md:hidden" />
                <span className="hidden md:inline font-medium">{t('auth.login')}</span>
              </Link>
              <Link 
                to="/register" 
                className="bg-gradient-to-r from-[#D97706] to-[#B45309] text-white px-4 py-2 rounded-lg font-medium hover:shadow-lg transition-all duration-300 hover:scale-105"
              >
                {t('auth.signUp')}
              </Link>
            </div>
          </div>
        </div>
      </nav>
      
      {/* Main Content */}
      <main className="flex-1">
        <Outlet />
      </main>
      
      {/* Footer */}
      <footer className="bg-white border-t border-[#E4E4E7] py-8 mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center text-[#A1A1AA] text-[13px]">
            {t('footer.copyright')}
          </div>
        </div>
      </footer>
    </div>
  );
};

export default PublicLayout;

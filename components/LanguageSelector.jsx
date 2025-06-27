import React, { useState, useEffect } from 'react';
import { t, setLanguage, getLanguage, useForceUpdate } from '../locales/i18n';

const LanguageSelector = ({ className = '', variant = 'default' }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentLang, setCurrentLang] = useState(getLanguage());
  const forceUpdate = useForceUpdate();

  const languages = [
    { code: 'en', name: 'English', flag: '🇺🇸' },
    { code: 'hi', name: 'हिंदी', flag: '🇮🇳' },
    { code: 'kn', name: 'ಕನ್ನಡ', flag: '🇮🇳' }
  ];

  const handleLanguageChange = (langCode) => {
    setLanguage(langCode);
    setCurrentLang(langCode);
    setIsOpen(false);
    forceUpdate();
    // Force re-render of parent components
    window.dispatchEvent(new CustomEvent('languageChanged', { detail: langCode }));
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isOpen && !event.target.closest('.language-selector')) {
        setIsOpen(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [isOpen]);

  const getButtonStyles = () => {
    switch (variant) {
      case 'header':
        return "flex items-center space-x-2 px-3 py-1 bg-white bg-opacity-20 rounded-lg text-white hover:bg-opacity-30 transition-colors";
      case 'footer':
        return "flex items-center space-x-2 px-3 py-1 bg-gray-800 bg-opacity-50 rounded-lg text-white hover:bg-opacity-70 transition-colors";
      default:
        return "flex items-center space-x-2 px-3 py-1 bg-orange-100 rounded-lg text-orange-600 hover:bg-orange-200 transition-colors";
    }
  };

  return (
    <div className={`relative language-selector ${className}`}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={getButtonStyles()}
        aria-label={t('select_language')}
      >
        <span>{languages.find(l => l.code === currentLang)?.flag}</span>
        <span className="text-sm">{languages.find(l => l.code === currentLang)?.code.toUpperCase()}</span>
        <i className={`fas fa-chevron-${isOpen ? 'up' : 'down'} text-xs`}></i>
      </button>
      
      {isOpen && (
        <div className="absolute top-full right-0 mt-2 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-50 min-w-[120px]">
          {languages.map((lang) => (
            <button
              key={lang.code}
              onClick={() => handleLanguageChange(lang.code)}
              className={`w-full text-left px-3 py-2 text-sm hover:bg-gray-100 flex items-center space-x-2 ${
                currentLang === lang.code ? 'bg-orange-50 text-orange-600' : 'text-gray-700'
              }`}
            >
              <span>{lang.flag}</span>
              <span>{lang.name}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default LanguageSelector;

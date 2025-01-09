import React from 'react';
import { useTranslation } from 'react-i18next';
import { Globe, ChevronDown } from 'lucide-react';

export function LanguageSwitcher() {
  const { i18n, t } = useTranslation();
  const [isOpen, setIsOpen] = React.useState(false);
  const dropdownRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const changeLanguage = (lang: string) => {
    i18n.changeLanguage(lang);
    setIsOpen(false);
  };

  const getCurrentLanguageLabel = () => {
    return t(`language.${i18n.language}`);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="h-[40px] px-4 flex items-center gap-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
      >
        <Globe className="w-4 h-4" />
        <span>{getCurrentLanguageLabel()}</span>
        <ChevronDown className="w-4 h-4" />
      </button>

      {isOpen && (
        <div className="absolute top-full left-0 mt-1 w-32 bg-white rounded-lg shadow-lg border border-gray-100 py-1 z-50">
          <button
            onClick={() => changeLanguage('en')}
            className="w-full px-4 py-2 text-left text-gray-700 hover:bg-gray-50"
          >
            {t('language.en')}
          </button>
          <button
            onClick={() => changeLanguage('zh')}
            className="w-full px-4 py-2 text-left text-gray-700 hover:bg-gray-50"
          >
            {t('language.zh')}
          </button>
        </div>
      )}
    </div>
  );
}
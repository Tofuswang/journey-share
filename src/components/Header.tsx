import React from 'react';
import { Map, PlusCircle, Info, Menu, X } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { LanguageSwitcher } from './LanguageSwitcher';

interface HeaderProps {
  onAddClick: () => void;
  onAboutClick: () => void;
}

export function Header({ onAddClick, onAboutClick }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const { t } = useTranslation();

  const handleTitleClick = () => {
    window.location.href = '/';
  };

  return (
    <header className="bg-white shadow-sm relative">
      <div className="max-w-6xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <button 
            onClick={handleTitleClick}
            className="flex items-center gap-3 hover:opacity-80 transition-opacity"
          >
            <Map className="w-8 h-8 text-emerald-600" />
            <h1 className="text-2xl font-bold text-gray-900">{t('site.title')}</h1>
          </button>
          
          {/* Desktop Navigation */}
          <div className="hidden sm:flex items-center gap-3">
            <LanguageSwitcher />
            <button
              onClick={onAboutClick}
              className="flex items-center gap-2 bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors"
            >
              <Info className="w-5 h-5" />
              {t('header.about')}
            </button>
            <button
              onClick={onAddClick}
              className="flex items-center gap-2 bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700 transition-colors"
            >
              <PlusCircle className="w-5 h-5" />
              {t('header.addJourney')}
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="sm:hidden p-2 text-gray-600 hover:text-gray-900"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu Dropdown */}
        {isMenuOpen && (
          <div className="absolute top-full left-0 right-0 bg-white border-t shadow-lg sm:hidden z-50">
            <div className="p-4 space-y-3">
              <LanguageSwitcher />
              <button
                onClick={() => {
                  onAboutClick();
                  setIsMenuOpen(false);
                }}
                className="w-full flex items-center gap-2 bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors"
              >
                <Info className="w-5 h-5" />
                {t('header.about')}
              </button>
              <button
                onClick={() => {
                  onAddClick();
                  setIsMenuOpen(false);
                }}
                className="w-full flex items-center gap-2 bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700 transition-colors"
              >
                <PlusCircle className="w-5 h-5" />
                {t('header.addJourney')}
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
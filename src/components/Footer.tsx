import React from 'react';
import { useTranslation } from 'react-i18next';

interface FooterProps {
  onShowLegal: (page: 'terms' | 'privacy' | 'disclaimer') => void;
}

export function Footer({ onShowLegal }: FooterProps) {
  const { t } = useTranslation();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-50 border-t mt-12">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 mb-6">
          <button 
            onClick={() => onShowLegal('terms')}
            className="text-gray-600 hover:text-emerald-600 transition-colors"
          >
            {t('footer.terms')}
          </button>
          <button 
            onClick={() => onShowLegal('privacy')}
            className="text-gray-600 hover:text-emerald-600 transition-colors"
          >
            {t('footer.privacy')}
          </button>
          <button 
            onClick={() => onShowLegal('disclaimer')}
            className="text-gray-600 hover:text-emerald-600 transition-colors"
          >
            {t('footer.disclaimer')}
          </button>
        </div>
        
        <div className="text-center text-gray-600 text-sm">
          <p>{t('footer.copyright', { year: currentYear })}</p>
          <p className="mt-2">
            {t('footer.developer')} Tofus | <a href="mailto:terry.f.wang@gmail.com" className="text-emerald-600 hover:text-emerald-700">{t('footer.contact')}</a>
          </p>
          <p className="mt-2">
            {t('footer.license')} <a href="https://creativecommons.org/licenses/by/4.0/" target="_blank" rel="noopener noreferrer" className="text-emerald-600 hover:text-emerald-700">CC-BY 4.0</a>
          </p>
        </div>
      </div>
    </footer>
  );
}
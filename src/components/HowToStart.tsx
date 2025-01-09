import React from 'react';
import { MessageCircle, Copy, Upload, Share2, Download } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export function HowToStart() {
  const { t } = useTranslation();

  const steps = [
    {
      icon: <MessageCircle className="w-8 h-8 text-emerald-600" />,
      title: t('howToStart.steps.1.title'),
      description: t('howToStart.steps.1.description')
    },
    {
      icon: <Copy className="w-8 h-8 text-emerald-600" />,
      title: t('howToStart.steps.2.title'),
      description: t('howToStart.steps.2.description')
    },
    {
      icon: <Upload className="w-8 h-8 text-emerald-600" />,
      title: t('howToStart.steps.3.title'),
      description: t('howToStart.steps.3.description')
    },
    {
      icon: <Share2 className="w-8 h-8 text-emerald-600" />,
      title: t('howToStart.steps.4.title'),
      description: t('howToStart.steps.4.description')
    },
    {
      icon: <Download className="w-8 h-8 text-emerald-600" />,
      title: t('howToStart.steps.5.title'),
      description: t('howToStart.steps.5.description')
    }
  ];

  return (
    <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">{t('howToStart.title')}</h2>
      <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
        {steps.map((step, index) => (
          <div key={index} className="bg-gray-50 rounded-lg p-6">
            <div className="flex flex-col items-center text-center">
              <div className="mb-4">
                {step.icon}
              </div>
              <h3 className="font-semibold text-gray-900 mb-3">{step.title}</h3>
              <p className="text-gray-600 text-sm">{step.description}</p>
            </div>
          </div>
        ))}
      </div>
      <p className="mt-6 text-gray-600 text-center">
        {t('howToStart.footer')}
      </p>
    </div>
  );
}
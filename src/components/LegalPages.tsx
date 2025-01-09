import React from 'react';
import { ArrowLeft, Scale, Shield, FileText } from 'lucide-react';
import { useTranslation } from 'react-i18next';

interface LegalPageProps {
  onClose: () => void;
}

const PageLayout: React.FC<{
  children: React.ReactNode;
  onClose: () => void;
  icon: React.ReactNode;
  title: string;
}> = ({ children, onClose, icon, title }) => {
  const { t } = useTranslation();
  return (
    <div className="max-w-3xl mx-auto py-4 px-4 md:py-8">
      <div className="flex items-center mb-4">
        <button
          onClick={onClose}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          {t('legal.backToHome')}
        </button>
      </div>

      <div className="bg-white rounded-lg shadow-sm p-8">
        <div className="flex items-center gap-3 mb-6">
          {icon}
          <h2 className="text-2xl font-bold text-gray-900">{title}</h2>
        </div>
        <div className="prose max-w-none text-gray-600">
          {children}
        </div>
      </div>
    </div>
  );
};

export function Terms({ onClose }: LegalPageProps) {
  const { t } = useTranslation();
  const list1 = t('legal.terms.content.list1', { returnObjects: true }) as string[];
  const list2 = t('legal.terms.content.list2', { returnObjects: true }) as string[];
  const list3 = t('legal.terms.content.list3', { returnObjects: true }) as string[];

  return (
    <PageLayout onClose={onClose} icon={<Scale className="w-6 h-6 text-amber-500" />} title={t('legal.terms.title')}>
      <h3 className="text-lg font-semibold text-gray-800 mt-6">{t('legal.terms.content.title1')}</h3>
      <ul>
        {list1.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>

      <h3 className="text-lg font-semibold text-gray-800 mt-6">{t('legal.terms.content.title2')}</h3>
      <ul>
        {list2.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>

      <h3 className="text-lg font-semibold text-gray-800 mt-6">{t('legal.terms.content.title3')}</h3>
      <ul>
        {list3.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    </PageLayout>
  );
}

export function Privacy({ onClose }: LegalPageProps) {
  const { t } = useTranslation();
  const list1 = t('legal.privacy.content.list1', { returnObjects: true }) as string[];
  const list2 = t('legal.privacy.content.list2', { returnObjects: true }) as string[];
  const list3 = t('legal.privacy.content.list3', { returnObjects: true }) as string[];

  return (
    <PageLayout onClose={onClose} icon={<Shield className="w-6 h-6 text-amber-500" />} title={t('legal.privacy.title')}>
      <h3 className="text-lg font-semibold text-gray-800 mt-6">{t('legal.privacy.content.title1')}</h3>
      <ul>
        {list1.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>

      <h3 className="text-lg font-semibold text-gray-800 mt-6">{t('legal.privacy.content.title2')}</h3>
      <ul>
        {list2.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>

      <h3 className="text-lg font-semibold text-gray-800 mt-6">{t('legal.privacy.content.title3')}</h3>
      <ul>
        {list3.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    </PageLayout>
  );
}

export function Disclaimer({ onClose }: LegalPageProps) {
  const { t } = useTranslation();
  const list1 = t('legal.disclaimer.content.list1', { returnObjects: true }) as string[];
  const list2 = t('legal.disclaimer.content.list2', { returnObjects: true }) as string[];
  const ccLicensePoints = t('legal.disclaimer.content.ccLicensePoints', { returnObjects: true }) as string[];
  const conditionsList = t('legal.disclaimer.content.conditions.list', { returnObjects: true }) as string[];

  return (
    <PageLayout onClose={onClose} icon={<FileText className="w-6 h-6 text-amber-500" />} title={t('legal.disclaimer.title')}>
      <h3 className="text-lg font-semibold text-gray-800 mt-6">{t('legal.disclaimer.content.title1')}</h3>
      <ul>
        {list1.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>

      <h3 className="text-lg font-semibold text-gray-800 mt-6">{t('legal.disclaimer.content.title2')}</h3>
      <ul>
        {list2.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>

      <h3 className="text-lg font-semibold text-gray-800 mt-6">{t('legal.disclaimer.content.title3')}</h3>
      <p>{t('legal.disclaimer.content.ccLicenseIntro')}</p>
      <ul>
        {ccLicensePoints.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
      <p className="mt-4">{t('legal.disclaimer.content.conditions.title')}</p>
      <ul>
        {conditionsList.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    </PageLayout>
  );
}
import React from 'react';
import { PromptTemplate } from './PromptTemplate';
import { useTranslation } from 'react-i18next';

export function UsageInstructions() {
  const { t } = useTranslation();

  return (
    <div className="bg-white rounded-lg shadow p-6 mb-6">
      <h3 className="text-xl font-bold text-gray-900 mb-4 pb-2 border-b">
        {t('usageInstructions.title')}
      </h3>
      
      <div className="space-y-6">
        <div>
          <h4 className="font-semibold text-gray-800 mb-2">
            {t('usageInstructions.steps.1.title')}
          </h4>
          <ul className="list-disc list-inside space-y-2 text-gray-600">
            {t('usageInstructions.steps.1.items', { returnObjects: true }).map((item: string, index: number) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="font-semibold text-gray-800 mb-2">
            {t('usageInstructions.steps.2.title')}
          </h4>
          <p className="text-gray-600 mb-3">
            {t('usageInstructions.steps.2.description')}
          </p>
          <PromptTemplate />
        </div>

        <div>
          <h4 className="font-semibold text-gray-800 mb-2">
            {t('usageInstructions.steps.3.title')}
          </h4>
          <ul className="list-disc list-inside space-y-2 text-gray-600">
            {t('usageInstructions.steps.3.items', { returnObjects: true }).map((item: string, index: number) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
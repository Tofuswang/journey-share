import React, { useState } from 'react';
import { UseFormRegister } from 'react-hook-form';
import { JourneyMap } from '../types/journey';
import { Frown, Meh, Smile } from 'lucide-react';
import { useTranslation } from 'react-i18next';

interface StepFormProps {
  stepNumber: number;
  stepTitle: string;
  register: UseFormRegister<JourneyMap>;
  stepKey: keyof JourneyMap;
}

export function StepForm({ stepNumber, stepTitle, register, stepKey }: StepFormProps) {
  const [emotionScore, setEmotionScore] = useState(10);
  const { t } = useTranslation();
  
  const getEmotionIcon = (score: number) => {
    if (score <= 3) return <Frown className="w-5 h-5 text-red-500" />;
    if (score <= 7) return <Meh className="w-5 h-5 text-yellow-500" />;
    return <Smile className="w-5 h-5 text-green-500" />;
  };

  return (
    <div className="bg-white rounded-lg shadow p-6 mb-6">
      <h3 className="text-xl font-bold text-gray-900 mb-4 pb-2 border-b">
        Step {stepNumber}: {stepTitle}
      </h3>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-800 mb-1">
            {t('journeyForm.stepForm.userAction')}
          </label>
          <input
            type="text"
            {...register(`${stepKey}.step_name` as any)}
            className="mt-1 block w-full rounded-md border border-gray-200 px-3 py-2 shadow-sm focus:border-emerald-500 focus:ring-1 focus:ring-emerald-200"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-800 mb-1">
            {t('journeyForm.stepForm.description')}
          </label>
          <textarea
            {...register(`${stepKey}.description` as any)}
            rows={3}
            className="mt-1 block w-full rounded-md border border-gray-200 px-3 py-2 shadow-sm focus:border-emerald-500 focus:ring-1 focus:ring-emerald-200"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-800 mb-1">
            {t('journeyForm.stepForm.systemResponse')}
          </label>
          <textarea
            {...register(`${stepKey}.scammer_action` as any)}
            rows={2}
            className="mt-1 block w-full rounded-md border border-gray-200 px-3 py-2 shadow-sm focus:border-emerald-500 focus:ring-1 focus:ring-emerald-200"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-800 mb-1">
            {t('journeyForm.stepForm.painPoint')}
          </label>
          <textarea
            {...register(`${stepKey}.pain_point` as any)}
            rows={2}
            className="mt-1 block w-full rounded-md border border-gray-200 px-3 py-2 shadow-sm focus:border-emerald-500 focus:ring-1 focus:ring-emerald-200"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="col-span-2">
            <label className="block text-sm font-medium text-gray-800 mb-1">
              {t('journeyForm.stepForm.emotionScore')}
            </label>
            <div className="flex items-center gap-4">
              <input
                type="range"
                min="1"
                max="10"
                step="1"
                defaultValue="10"
                {...register(`${stepKey}.emotion_score` as any)}
                onChange={(e) => setEmotionScore(parseInt(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-emerald-600"
              />
              <div className="flex items-center gap-2 min-w-[80px]">
                <span className="text-sm font-medium text-gray-600">
                  {emotionScore}
                </span>
                {getEmotionIcon(emotionScore)}
              </div>
            </div>
          </div>

          <div className="col-span-2">
            <label className="block text-sm font-medium text-gray-800 mb-1">
              {t('journeyForm.stepForm.emotion')}
            </label>
            <input
              type="text"
              {...register(`${stepKey}.emotion` as any)}
              className="mt-1 block w-full rounded-md border border-gray-200 px-3 py-2 shadow-sm focus:border-emerald-500 focus:ring-1 focus:ring-emerald-200"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
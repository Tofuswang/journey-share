import React from 'react';
import { useForm } from 'react-hook-form';
import { v4 as uuidv4 } from 'uuid';
import { JourneyMap } from '../types/journey';
import { StepForm } from './StepForm';
import { MapIcon, X } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { UsageInstructions } from './UsageInstructions';
import { useTranslation } from 'react-i18next';

interface JourneyFormProps {
  onCancel: () => void;
}

export function JourneyForm({ onCancel }: JourneyFormProps) {
  const { t } = useTranslation();
  const { register, handleSubmit } = useForm<JourneyMap>({
    defaultValues: {
      journey_id: uuidv4(),
      created_at: new Date().toISOString(),
    },
  });

  const onSubmit = async (data: JourneyMap) => {
    try {
      const { error } = await supabase
        .from('journey_maps')
        .insert(data);

      if (error) throw error;
      window.location.href = '/';
    } catch (error) {
      console.error('Error saving journey map:', error);
      alert(t('journeyForm.error.save'));
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="max-w-3xl mx-auto py-4 px-4 md:py-8">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
        <div className="flex items-center gap-3">
          <MapIcon className="w-8 h-8 text-emerald-600" />
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900">{t('journeyForm.title')}</h1>
        </div>
        <button
          type="button"
          onClick={onCancel}
          className="text-gray-500 hover:text-gray-700"
        >
          <X className="w-6 h-6" />
        </button>
      </div>

      <UsageInstructions />

      <div className="bg-white rounded-lg shadow p-6 mb-6">
        <h2 className="text-xl font-bold text-gray-900 mb-4 pb-2 border-b">{t('journeyForm.basicInfo.title')}</h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-800 mb-1">
              {t('journeyForm.basicInfo.authorName.label')}
            </label>
            <input
              type="text"
              {...register('author_name')}
              className="mt-1 block w-full rounded-md border border-gray-200 px-3 py-2 shadow-sm focus:border-emerald-500 focus:ring-1 focus:ring-emerald-200"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-800 mb-1">
              {t('journeyForm.basicInfo.userType.label')}
            </label>
            <input
              type="text"
              {...register('journey_title')}
              required
              placeholder={t('journeyForm.basicInfo.userType.placeholder')}
              className="mt-1 block w-full rounded-md border border-gray-200 px-3 py-2 shadow-sm focus:border-emerald-500 focus:ring-1 focus:ring-emerald-200"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-800 mb-1">
              {t('journeyForm.basicInfo.context.label')}
            </label>
            <textarea
              {...register('context')}
              required
              placeholder={t('journeyForm.basicInfo.context.placeholder')}
              rows={2}
              className="mt-1 block w-full rounded-md border border-gray-200 px-3 py-2 shadow-sm focus:border-emerald-500 focus:ring-1 focus:ring-emerald-200"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-800 mb-1">
              {t('journeyForm.basicInfo.goal.label')}
            </label>
            <textarea
              {...register('goal')}
              required
              placeholder={t('journeyForm.basicInfo.goal.placeholder')}
              rows={2}
              className="mt-1 block w-full rounded-md border border-gray-200 px-3 py-2 shadow-sm focus:border-emerald-500 focus:ring-1 focus:ring-emerald-200"
            />
          </div>
        </div>
      </div>

      <StepForm
        stepNumber={1}
        stepTitle={t('journeyList.steps.trigger')}
        register={register}
        stepKey="step1_trigger"
      />

      <StepForm
        stepNumber={2}
        stepTitle={t('journeyList.steps.interaction')}
        register={register}
        stepKey="step2_interaction"
      />

      <StepForm
        stepNumber={3}
        stepTitle={t('journeyList.steps.trust')}
        register={register}
        stepKey="step3_trust"
      />

      <StepForm
        stepNumber={4}
        stepTitle={t('journeyList.steps.turning')}
        register={register}
        stepKey="step4_turning"
      />

      <StepForm
        stepNumber={5}
        stepTitle={t('journeyList.steps.conclusion')}
        register={register}
        stepKey="step5_conclusion"
      />

      <StepForm
        stepNumber={6}
        stepTitle={t('journeyList.steps.aftermath')}
        register={register}
        stepKey="step6_aftermath"
      />

      <div className="mt-8 flex flex-col sm:flex-row gap-4">
        <button
          type="button"
          onClick={onCancel}
          className="w-full py-3 px-6 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
        >
          {t('journeyForm.buttons.cancel')}
        </button>
        <button
          type="submit"
          className="w-full bg-emerald-600 text-white py-3 px-6 rounded-lg hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 transition-colors"
        >
          {t('journeyForm.buttons.submit')}
        </button>
      </div>
    </form>
  );
}
import React from 'react';
import { Download } from 'lucide-react';
import { JourneyMap } from '../types/journey';
import { supabase } from '../lib/supabase';
import { EmotionChart } from './EmotionChart';
import { useTranslation } from 'react-i18next';

interface JourneyListProps {
  searchQuery?: string;
}

export function JourneyList({ searchQuery = '' }: JourneyListProps) {
  const [journeys, setJourneys] = React.useState<JourneyMap[]>([]);
  const [loading, setLoading] = React.useState(true);
  const { t } = useTranslation();

  const fetchJourneys = async () => {
    try {
      let query = supabase
        .from('journey_maps')
        .select('*')
        .order('created_at', { ascending: false });

      if (searchQuery) {
        query = query.or(`journey_title.ilike.%${searchQuery}%,context.ilike.%${searchQuery}%,goal.ilike.%${searchQuery}%`);
      }

      const { data, error } = await query;

      if (error) throw error;
      setJourneys(data || []);
    } catch (error) {
      console.error('Error fetching journeys:', error);
      alert(t('journeyList.error.fetch'));
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    fetchJourneys();
  }, [searchQuery]);

  const downloadJourneyCSV = (journey: JourneyMap) => {
    const steps = [
      { name: t('journeyList.steps.trigger'), data: journey.step1_trigger },
      { name: t('journeyList.steps.interaction'), data: journey.step2_interaction },
      { name: t('journeyList.steps.trust'), data: journey.step3_trust },
      { name: t('journeyList.steps.turning'), data: journey.step4_turning },
      { name: t('journeyList.steps.conclusion'), data: journey.step5_conclusion },
      { name: t('journeyList.steps.aftermath'), data: journey.step6_aftermath }
    ];

    const headers = [
      t('journeyList.fields.stepName'),
      t('journeyList.fields.userAction'),
      t('journeyList.fields.description'),
      t('journeyList.fields.systemResponse'),
      t('journeyList.fields.painPoint'),
      t('journeyList.fields.emotionScore'),
      t('journeyList.fields.emotion')
    ];
    
    const csvData = steps.map(({ name, data }) => [
      name,
      data.step_name,
      data.description,
      data.scammer_action,
      data.pain_point,
      data.emotion_score,
      data.emotion
    ]);

    const csvContent = [
      `${t('journeyList.userType')}：${journey.journey_title}`,
      `${t('journeyList.author')}：${journey.author_name || t('journeyList.anonymous')}`,
      `${t('journeyList.createdAt')}：${new Date(journey.created_at).toLocaleDateString()}`,
      `${t('journeyList.context')}：${journey.context || ''}`,
      `${t('journeyList.goal')}：${journey.goal || ''}`,
      '',
      headers.join(','),
      ...csvData.map(row => row.join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `journey-${journey.journey_id}.csv`;
    link.click();
  };

  if (loading) {
    return (
      <div className="text-center py-12 bg-white rounded-lg shadow">
        <p className="text-gray-500">{t('journeyList.loading')}</p>
      </div>
    );
  }

  if (journeys.length === 0) {
    return (
      <div className="text-center py-12 bg-white rounded-lg shadow">
        <p className="text-gray-500">
          {searchQuery ? t('journeyList.noResults') : t('journeyList.empty')}
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {journeys.map(journey => (
        <div key={journey.journey_id} className="bg-white rounded-lg shadow-md p-6">
          <div className="mb-6">
            <div className="flex justify-between items-start">
              <div className="flex flex-col gap-2">
                <h3 className="text-xl font-semibold text-gray-900">
                  {t('journeyList.userType')}：{journey.journey_title}
                </h3>
                <p className="text-sm text-gray-500">
                  {t('journeyList.author')}：{journey.author_name || t('journeyList.anonymous')} | 
                  {t('journeyList.createdAt')}：{new Date(journey.created_at).toLocaleDateString()}
                </p>
                {journey.context && (
                  <div className="mt-2">
                    <p className="text-sm font-medium text-gray-700">{t('journeyList.context')}：</p>
                    <p className="text-gray-600">{journey.context}</p>
                  </div>
                )}
                {journey.goal && (
                  <div className="mt-2">
                    <p className="text-sm font-medium text-gray-700">{t('journeyList.goal')}：</p>
                    <p className="text-gray-600">{journey.goal}</p>
                  </div>
                )}
              </div>
              <button
                onClick={() => downloadJourneyCSV(journey)}
                className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors px-3 py-1.5 rounded-md hover:bg-gray-100"
              >
                <Download className="w-5 h-5" />
                <span>{t('journeyList.download')}</span>
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-6 gap-4">
            {Object.entries({
              trigger: journey.step1_trigger,
              interaction: journey.step2_interaction,
              trust: journey.step3_trust,
              turning: journey.step4_turning,
              conclusion: journey.step5_conclusion,
              aftermath: journey.step6_aftermath
            }).map(([key, step]) => (
              <div key={key} className="bg-gray-50 rounded-lg p-4">
                <h4 className="font-medium text-gray-900 mb-3 pb-2 border-b">
                  {t(`journeyList.steps.${key}`)}
                </h4>
                <div className="space-y-3">
                  <div>
                    <p className="text-sm font-medium text-gray-500">{t('journeyList.fields.userAction')}</p>
                    <p className="text-gray-900">{step.step_name}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">{t('journeyList.fields.description')}</p>
                    <p className="text-gray-900 text-sm">{step.description}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">{t('journeyList.fields.systemResponse')}</p>
                    <p className="text-gray-900 text-sm">{step.scammer_action}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">{t('journeyList.fields.painPoint')}</p>
                    <p className="text-gray-900 text-sm">{step.pain_point}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">{t('journeyList.fields.emotionScore')}</p>
                    <p className="text-gray-900">{step.emotion_score}/10</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">{t('journeyList.fields.emotion')}</p>
                    <p className="text-gray-900 text-sm">{step.emotion}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6">
            <EmotionChart journey={journey} />
          </div>
        </div>
      ))}
    </div>
  );
}
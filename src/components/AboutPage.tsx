import React from 'react';
import { Map, Heart, Brain, Target, Users, ArrowLeft, Share2, Code, Mail, Github, Instagram, Star, Calendar } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { useTranslation } from 'react-i18next';

interface AboutPageProps {
  onClose: () => void;
}

interface ContributionStats {
  totalJourneys: number;
  totalContributors: number;
  recentContributions: {
    author_name: string;
    journey_title: string;
    created_at: string;
  }[];
}

export function AboutPage({ onClose }: AboutPageProps) {
  const { t } = useTranslation();
  const [stats, setStats] = React.useState<ContributionStats>({
    totalJourneys: 0,
    totalContributors: 0,
    recentContributions: []
  });

  React.useEffect(() => {
    async function fetchStats() {
      try {
        const { count: totalJourneys } = await supabase
          .from('journey_maps')
          .select('*', { count: 'exact', head: true });

        const { data: contributors } = await supabase
          .from('journey_maps')
          .select('author_name')
          .not('author_name', 'is', null);
        
        const uniqueContributors = new Set(contributors?.map(c => c.author_name));

        const { data: recentContributions } = await supabase
          .from('journey_maps')
          .select('author_name, journey_title, created_at')
          .order('created_at', { ascending: false })
          .limit(3);

        setStats({
          totalJourneys: totalJourneys || 0,
          totalContributors: uniqueContributors.size,
          recentContributions: recentContributions || []
        });
      } catch (error) {
        console.error('Error fetching stats:', error);
      }
    }

    fetchStats();
  }, []);

  return (
    <div className="max-w-3xl mx-auto py-4 px-4 md:py-8">
      <div className="flex items-center mb-4">
        <button
          onClick={onClose}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          {t('about.backToHome')}
        </button>
      </div>

      <div className="bg-white rounded-lg shadow-sm p-8">
        <div className="flex items-center gap-3 mb-6">
          <Map className="w-8 h-8 text-emerald-600" />
          <h2 className="text-2xl font-bold text-gray-900">{t('about.title')}</h2>
        </div>

        <div className="prose max-w-none">
          <div className="mb-8">
            <h3 className="text-xl font-semibold text-gray-800 flex items-center gap-2 mb-4">
              <Target className="w-6 h-6 text-emerald-600" />
              {t('about.projectGoal.title')}
            </h3>
            <p className="text-gray-600">{t('about.projectGoal.description')}</p>
          </div>

          <div className="mb-8">
            <h3 className="text-xl font-semibold text-gray-800 flex items-center gap-2 mb-4">
              <Brain className="w-6 h-6 text-emerald-600" />
              {t('about.coreValues.title')}
            </h3>
            <ul className="space-y-3 text-gray-600">
              <li className="flex items-start gap-2">
                <Share2 className="w-5 h-5 text-emerald-600 mt-1 flex-shrink-0" />
                <span>
                  <strong>{t('about.coreValues.openData.title')}</strong>
                  {t('about.coreValues.openData.description')}
                </span>
              </li>
              <li className="flex items-start gap-2">
                <Users className="w-5 h-5 text-emerald-600 mt-1 flex-shrink-0" />
                <span>
                  <strong>{t('about.coreValues.community.title')}</strong>
                  {t('about.coreValues.community.description', { count: stats.totalJourneys })}
                </span>
              </li>
              <li className="flex items-start gap-2">
                <Heart className="w-5 h-5 text-emerald-600 mt-1 flex-shrink-0" />
                <span>
                  <strong>{t('about.coreValues.empathy.title')}</strong>
                  {t('about.coreValues.empathy.description')}
                </span>
              </li>
            </ul>
          </div>

          <div className="mb-8">
            <h3 className="text-xl font-semibold text-gray-800 flex items-center gap-2 mb-4">
              <Users className="w-6 h-6 text-emerald-600" />
              {t('about.contributors.title')}
            </h3>
            <div className="grid grid-cols-1 gap-6">
              <div className="bg-gray-50 rounded-lg p-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                  <div className="bg-white rounded-lg p-4 text-center">
                    <p className="text-2xl font-bold text-emerald-600">{stats.totalJourneys}</p>
                    <p className="text-sm text-gray-600">{t('about.contributors.stats.journeys')}</p>
                  </div>
                  <div className="bg-white rounded-lg p-4 text-center">
                    <p className="text-2xl font-bold text-emerald-600">{stats.totalContributors}</p>
                    <p className="text-sm text-gray-600">{t('about.contributors.stats.contributors')}</p>
                  </div>
                  <div className="bg-white rounded-lg p-4 text-center">
                    <p className="text-2xl font-bold text-emerald-600">CC-BY 4.0</p>
                    <p className="text-sm text-gray-600">{t('about.contributors.stats.license')}</p>
                  </div>
                </div>
                
                <h4 className="font-semibold text-gray-800 mb-4">{t('about.contributors.recent.title')}</h4>
                <div className="space-y-4">
                  {stats.recentContributions.map((contribution, index) => (
                    <div key={index} className="bg-white rounded-lg p-4">
                      <div className="flex items-start justify-between">
                        <div>
                          <p className="font-medium text-gray-900">{contribution.journey_title}</p>
                          <p className="text-sm text-gray-600">
                            {t('about.contributors.recent.by', { 
                              author: contribution.author_name || t('journeyList.anonymous')
                            })}
                          </p>
                        </div>
                        <div className="flex items-center text-sm text-gray-500">
                          <Calendar className="w-4 h-4 mr-1" />
                          {new Date(contribution.created_at).toLocaleDateString()}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="mt-6 text-center">
              <p className="text-gray-600">
                {t('about.contributors.callToAction.text')}
                <a href="https://github.com/Tofuswang" target="_blank" rel="noopener noreferrer" className="text-emerald-600 hover:text-emerald-700">GitHub</a>
                {t('about.contributors.callToAction.or')}
                <a href="mailto:terry.f.wang@gmail.com" className="text-emerald-600 hover:text-emerald-700">{t('about.contributors.callToAction.contact')}</a>！
              </p>
            </div>
          </div>

          <div className="mb-8">
            <h3 className="text-xl font-semibold text-gray-800 flex items-center gap-2 mb-4">
              <Code className="w-6 h-6 text-emerald-600" />
              {t('about.developer.title')}
            </h3>
            <div className="bg-gray-50 p-6 rounded-lg">
              <p className="text-gray-700 mb-4">{t('about.developer.description')}</p>
              <div className="flex flex-wrap gap-3">
                <a
                  href="mailto:terry.f.wang@gmail.com"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-100 text-blue-700 hover:bg-blue-200 transition-colors"
                >
                  <Mail className="w-4 h-4" />
                  terry.f.wang@gmail.com
                </a>
                <a
                  href="https://github.com/Tofuswang"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gray-900 text-white hover:bg-gray-800 transition-colors"
                >
                  <Github className="w-4 h-4" />
                  github.com/Tofuswang
                </a>
                <a
                  href="https://www.instagram.com/0xtofus/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-pink-100 text-pink-700 hover:bg-pink-200 transition-colors"
                >
                  <Instagram className="w-4 h-4" />
                  instagram.com/0xtofus
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
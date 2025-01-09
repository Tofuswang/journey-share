import React from 'react';
import { Copy } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export function PromptTemplate() {
  const [copied, setCopied] = React.useState(false);
  const { t } = useTranslation();

  const generatePromptTemplate = () => {
    const template = [
      t('promptTemplate.content.intro'),
      '',
      '---',
      `**${t('promptTemplate.content.basicInfo.title')}**`,
      t('promptTemplate.content.basicInfo.authorName'),
      t('promptTemplate.content.basicInfo.userType'),
      t('promptTemplate.content.basicInfo.context'),
      t('promptTemplate.content.basicInfo.goal'),
      '',
      '---',
      `**${t('promptTemplate.content.journeySteps.title')}**`,
      `**${t('promptTemplate.content.journeySteps.steps.trigger')}**`,
      t('promptTemplate.content.journeySteps.fields.userAction'),
      t('promptTemplate.content.journeySteps.fields.description'),
      t('promptTemplate.content.journeySteps.fields.systemResponse'),
      t('promptTemplate.content.journeySteps.fields.painPoint'),
      t('promptTemplate.content.journeySteps.fields.emotionScore'),
      t('promptTemplate.content.journeySteps.fields.emotion'),
      '',
      `**${t('promptTemplate.content.journeySteps.steps.interaction')}**`,
      t('promptTemplate.content.journeySteps.fields.userAction'),
      t('promptTemplate.content.journeySteps.fields.description'),
      t('promptTemplate.content.journeySteps.fields.systemResponse'),
      t('promptTemplate.content.journeySteps.fields.painPoint'),
      t('promptTemplate.content.journeySteps.fields.emotionScore'),
      t('promptTemplate.content.journeySteps.fields.emotion'),
      '',
      `**${t('promptTemplate.content.journeySteps.steps.trust')}**`,
      t('promptTemplate.content.journeySteps.fields.userAction'),
      t('promptTemplate.content.journeySteps.fields.description'),
      t('promptTemplate.content.journeySteps.fields.systemResponse'),
      t('promptTemplate.content.journeySteps.fields.painPoint'),
      t('promptTemplate.content.journeySteps.fields.emotionScore'),
      t('promptTemplate.content.journeySteps.fields.emotion'),
      '',
      `**${t('promptTemplate.content.journeySteps.steps.turning')}**`,
      t('promptTemplate.content.journeySteps.fields.userAction'),
      t('promptTemplate.content.journeySteps.fields.description'),
      t('promptTemplate.content.journeySteps.fields.systemResponse'),
      t('promptTemplate.content.journeySteps.fields.painPoint'),
      t('promptTemplate.content.journeySteps.fields.emotionScore'),
      t('promptTemplate.content.journeySteps.fields.emotion'),
      '',
      `**${t('promptTemplate.content.journeySteps.steps.conclusion')}**`,
      t('promptTemplate.content.journeySteps.fields.userAction'),
      t('promptTemplate.content.journeySteps.fields.description'),
      t('promptTemplate.content.journeySteps.fields.systemResponse'),
      t('promptTemplate.content.journeySteps.fields.painPoint'),
      t('promptTemplate.content.journeySteps.fields.emotionScore'),
      t('promptTemplate.content.journeySteps.fields.emotion'),
      '',
      `**${t('promptTemplate.content.journeySteps.steps.aftermath')}**`,
      t('promptTemplate.content.journeySteps.fields.userAction'),
      t('promptTemplate.content.journeySteps.fields.description'),
      t('promptTemplate.content.journeySteps.fields.systemResponse'),
      t('promptTemplate.content.journeySteps.fields.painPoint'),
      t('promptTemplate.content.journeySteps.fields.emotionScore'),
      t('promptTemplate.content.journeySteps.fields.emotion'),
      '',
      '---',
      t('promptTemplate.content.footer')
    ].join('\n');

    return template;
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(generatePromptTemplate());
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold text-gray-900">{t('promptTemplate.title')}</h3>
        <button
          onClick={copyToClipboard}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors px-3 py-1.5 rounded-md hover:bg-gray-100"
        >
          <Copy className="w-4 h-4" />
          {copied ? t('promptTemplate.copied') : t('promptTemplate.copyAll')}
        </button>
      </div>
      <div className="bg-gray-50 p-4 rounded-lg">
        <pre className="text-sm text-gray-700 whitespace-pre-wrap">{generatePromptTemplate()}</pre>
      </div>
    </div>
  );
}
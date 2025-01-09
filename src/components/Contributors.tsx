import React from 'react';
import { Users, Star } from 'lucide-react';

interface Contributor {
  name: string;
  role: string;
  contributions: string[];
}

const contributors: Contributor[] = [
  {
    name: 'Tofus',
    role: '專案發起人',
    contributions: ['專案發想與規劃', '前端開發', 'UI/UX 設計']
  },
  {
    name: 'g0v 社群',
    role: '協作社群',
    contributions: ['提供寶貴建議', '協助推廣']
  },
  {
    name: '所有貢獻者',
    role: '內容貢獻者',
    contributions: ['分享使用者體驗', '提供改善建議']
  }
];

export function Contributors() {
  return (
    <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
      <div className="flex items-center gap-3 mb-6">
        <Users className="w-8 h-8 text-emerald-600" />
        <h2 className="text-2xl font-bold text-gray-900">感謝所有貢獻者</h2>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {contributors.map((contributor, index) => (
          <div key={index} className="bg-gray-50 rounded-lg p-6">
            <div className="flex items-center gap-2 mb-3">
              <Star className="w-5 h-5 text-emerald-600" />
              <h3 className="font-semibold text-gray-900">{contributor.name}</h3>
            </div>
            <p className="text-emerald-600 text-sm mb-2">{contributor.role}</p>
            <ul className="space-y-1">
              {contributor.contributions.map((contribution, i) => (
                <li key={i} className="text-gray-600 text-sm">
                  • {contribution}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="mt-6 text-center">
        <p className="text-gray-600">
          想要參與貢獻？歡迎到 <a href="https://github.com/Tofuswang" target="_blank" rel="noopener noreferrer" className="text-emerald-600 hover:text-emerald-700">GitHub</a> 提交 Pull Request 
          或是<a href="mailto:terry.f.wang@gmail.com" className="text-emerald-600 hover:text-emerald-700">聯絡我們</a>！
        </p>
      </div>
    </div>
  );
}
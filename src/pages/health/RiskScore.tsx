import { Shield, Activity, Heart, Brain } from 'lucide-react';
import { FeaturePage } from '../../components/FeaturePage';

export function RiskScore() {
  const categories = [
    { icon: Heart, name: 'Cardiovascular', score: 85, status: 'Good' },
    { icon: Activity, name: 'Physical Fitness', score: 78, status: 'Good' },
    { icon: Brain, name: 'Mental Wellness', score: 72, status: 'Fair' },
  ];

  return (
    <FeaturePage
      icon={Shield}
      title="Health Risk Score"
      description="Comprehensive assessment of your overall health status"
      gradient="from-orange-500 via-red-500 to-pink-500 dark:from-orange-900 dark:via-red-900 dark:to-pink-900"
    >
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12 p-12 rounded-3xl bg-gradient-to-br from-orange-50 to-red-50 dark:from-orange-950/30 dark:to-red-950/30 border border-orange-200 dark:border-orange-800">
          <div className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-2">Your Overall Health Score</div>
          <div className="text-7xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent mb-4">
            78
          </div>
          <div className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Good Health</div>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Your health indicators show positive trends. Continue with healthy habits and regular checkups.
          </p>
        </div>

        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
          Category Breakdown
        </h3>

        <div className="grid md:grid-cols-3 gap-6">
          {categories.map((category, index) => (
            <div key={index} className="p-6 rounded-2xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
              <category.icon className="w-8 h-8 text-orange-500 mb-4" />
              <div className="text-lg font-bold text-gray-900 dark:text-white mb-2">{category.name}</div>
              <div className="text-4xl font-bold text-gray-900 dark:text-white mb-2">{category.score}</div>
              <div className="text-sm text-green-600 dark:text-green-400">{category.status}</div>
            </div>
          ))}
        </div>

        <div className="mt-8 p-8 rounded-2xl bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
            Recommendations
          </h3>
          <ul className="space-y-2 text-gray-600 dark:text-gray-400">
            <li className="flex items-start space-x-2">
              <span className="text-blue-500 mt-1">•</span>
              <span>Maintain regular physical activity (150 minutes per week)</span>
            </li>
            <li className="flex items-start space-x-2">
              <span className="text-blue-500 mt-1">•</span>
              <span>Focus on stress management techniques</span>
            </li>
            <li className="flex items-start space-x-2">
              <span className="text-blue-500 mt-1">•</span>
              <span>Schedule annual health checkups</span>
            </li>
          </ul>
        </div>
      </div>
    </FeaturePage>
  );
}

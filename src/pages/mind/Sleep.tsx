import { Moon, Clock, TrendingUp } from 'lucide-react';
import { FeaturePage } from '../../components/FeaturePage';

export function Sleep() {
  const sleepData = [
    { day: 'Mon', hours: 7.5 },
    { day: 'Tue', hours: 6.5 },
    { day: 'Wed', hours: 8 },
    { day: 'Thu', hours: 7 },
    { day: 'Fri', hours: 6 },
    { day: 'Sat', hours: 8.5 },
    { day: 'Sun', hours: 8 },
  ];

  return (
    <FeaturePage
      icon={Moon}
      title="Sleep Wellness"
      description="Track and improve your sleep quality for better health"
      gradient="from-indigo-500 via-purple-500 to-pink-500 dark:from-indigo-900 dark:via-purple-900 dark:to-pink-900"
    >
      <div className="max-w-4xl mx-auto">
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <div className="p-6 rounded-2xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
            <Moon className="w-8 h-8 text-indigo-500 mb-3" />
            <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">Average Sleep</div>
            <div className="text-3xl font-bold text-gray-900 dark:text-white">7.4h</div>
          </div>
          <div className="p-6 rounded-2xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
            <Clock className="w-8 h-8 text-purple-500 mb-3" />
            <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">Sleep Quality</div>
            <div className="text-3xl font-bold text-gray-900 dark:text-white">82%</div>
          </div>
          <div className="p-6 rounded-2xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
            <TrendingUp className="w-8 h-8 text-pink-500 mb-3" />
            <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">Improvement</div>
            <div className="text-3xl font-bold text-gray-900 dark:text-white">+12%</div>
          </div>
        </div>

        <div className="p-8 rounded-2xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 mb-8">
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
            This Week's Sleep Pattern
          </h3>
          <div className="flex items-end justify-between h-48 space-x-2">
            {sleepData.map((data, index) => (
              <div key={index} className="flex-1 flex flex-col items-center">
                <div className="flex-1 flex items-end w-full">
                  <div
                    className="w-full bg-gradient-to-t from-indigo-500 to-purple-500 rounded-t-lg transition-all hover:opacity-80"
                    style={{ height: `${(data.hours / 10) * 100}%` }}
                  />
                </div>
                <div className="mt-2 text-sm font-medium text-gray-600 dark:text-gray-400">{data.day}</div>
                <div className="text-xs text-gray-500 dark:text-gray-500">{data.hours}h</div>
              </div>
            ))}
          </div>
        </div>

        <div className="p-8 rounded-2xl bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-950/30 dark:to-purple-950/30 border border-indigo-200 dark:border-indigo-800">
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Sleep Recommendations
          </h3>
          <ul className="space-y-2 text-gray-600 dark:text-gray-400">
            <li className="flex items-start space-x-2">
              <span className="text-indigo-500 mt-1">•</span>
              <span>Maintain a consistent sleep schedule, even on weekends</span>
            </li>
            <li className="flex items-start space-x-2">
              <span className="text-indigo-500 mt-1">•</span>
              <span>Create a relaxing bedtime routine</span>
            </li>
            <li className="flex items-start space-x-2">
              <span className="text-indigo-500 mt-1">•</span>
              <span>Avoid screens 1 hour before bed</span>
            </li>
            <li className="flex items-start space-x-2">
              <span className="text-indigo-500 mt-1">•</span>
              <span>Keep your bedroom cool, dark, and quiet</span>
            </li>
          </ul>
        </div>
      </div>
    </FeaturePage>
  );
}

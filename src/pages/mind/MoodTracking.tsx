import { Smile, TrendingUp } from 'lucide-react';
import { FeaturePage } from '../../components/FeaturePage';

export function MoodTracking() {
  const moods = [
    { emoji: '😊', label: 'Happy', count: 12 },
    { emoji: '😌', label: 'Calm', count: 8 },
    { emoji: '😔', label: 'Sad', count: 3 },
    { emoji: '😰', label: 'Anxious', count: 5 },
  ];

  return (
    <FeaturePage
      icon={Smile}
      title="Mood Tracking"
      description="Track your emotions and identify patterns for better mental wellness"
      gradient="from-yellow-500 via-orange-500 to-red-500 dark:from-yellow-900 dark:via-orange-900 dark:to-red-900"
    >
      <div className="max-w-4xl mx-auto">
        <div className="p-8 rounded-2xl bg-gradient-to-br from-yellow-50 to-orange-50 dark:from-yellow-950/30 dark:to-orange-950/30 border border-yellow-200 dark:border-yellow-800 mb-8">
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            How are you feeling today?
          </h3>
          <div className="grid grid-cols-4 gap-4">
            {moods.map((mood, index) => (
              <button
                key={index}
                className="p-6 rounded-xl bg-white dark:bg-gray-800 hover:shadow-lg transition-all text-center"
              >
                <div className="text-4xl mb-2">{mood.emoji}</div>
                <div className="text-sm font-medium text-gray-900 dark:text-white">{mood.label}</div>
              </button>
            ))}
          </div>
        </div>

        <div className="p-8 rounded-2xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
              This Month's Overview
            </h3>
            <TrendingUp className="w-6 h-6 text-green-500" />
          </div>
          <div className="space-y-4">
            {moods.map((mood, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <span className="text-2xl">{mood.emoji}</span>
                  <span className="text-gray-900 dark:text-white font-medium">{mood.label}</span>
                </div>
                <div className="text-gray-600 dark:text-gray-400">{mood.count} days</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </FeaturePage>
  );
}

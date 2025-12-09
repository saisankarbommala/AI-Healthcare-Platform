import { Wind, Play, Clock } from 'lucide-react';
import { FeaturePage } from '../../components/FeaturePage';

export function Meditation() {
  const sessions = [
    {
      title: 'Morning Mindfulness',
      duration: '10 min',
      description: 'Start your day with clarity and focus',
      difficulty: 'Beginner',
    },
    {
      title: 'Stress Relief',
      duration: '15 min',
      description: 'Release tension and find calm',
      difficulty: 'Intermediate',
    },
    {
      title: 'Deep Breathing',
      duration: '5 min',
      description: 'Quick breathing exercises for instant calm',
      difficulty: 'Beginner',
    },
    {
      title: 'Body Scan',
      duration: '20 min',
      description: 'Progressive relaxation for mind and body',
      difficulty: 'Advanced',
    },
  ];

  return (
    <FeaturePage
      icon={Wind}
      title="Guided Meditation"
      description="Mindfulness exercises and breathing techniques for inner peace"
      gradient="from-cyan-500 via-blue-500 to-indigo-500 dark:from-cyan-900 dark:via-blue-900 dark:to-indigo-900"
    >
      <div className="max-w-5xl mx-auto">
        <div className="grid md:grid-cols-2 gap-6">
          {sessions.map((session, index) => (
            <div
              key={index}
              className="p-6 rounded-2xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-all"
            >
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-1">
                    {session.title}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {session.description}
                  </p>
                </div>
                <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-full text-xs font-medium">
                  {session.difficulty}
                </span>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
                  <Clock className="w-4 h-4" />
                  <span>{session.duration}</span>
                </div>
                <button className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-cyan-600 to-blue-600 text-white rounded-lg font-medium hover:shadow-lg transition-all">
                  <Play className="w-4 h-4" />
                  <span>Start</span>
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 p-8 rounded-2xl bg-gradient-to-br from-cyan-50 to-blue-50 dark:from-cyan-950/30 dark:to-blue-950/30 border border-cyan-200 dark:border-cyan-800">
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            Daily Practice
          </h3>
          <p className="text-gray-600 dark:text-gray-400">
            Regular meditation practice can reduce stress, improve focus, and enhance overall wellbeing.
            Start with just 5 minutes a day.
          </p>
        </div>
      </div>
    </FeaturePage>
  );
}

import { Brain, TrendingUp, Award } from 'lucide-react';
import { FeaturePage } from '../../components/FeaturePage';

export function Habits() {
  const habits = [
    { name: 'Morning Exercise', streak: 15, target: 30, color: 'blue' },
    { name: 'Meditation', streak: 7, target: 21, color: 'purple' },
    { name: 'Reading', streak: 12, target: 30, color: 'green' },
  ];

  return (
    <FeaturePage
      icon={Brain}
      title="Positive Habit Builder"
      description="Build and maintain healthy habits for lasting change"
      gradient="from-purple-500 via-indigo-500 to-blue-500 dark:from-purple-900 dark:via-indigo-900 dark:to-blue-900"
    >
      <div className="max-w-4xl mx-auto">
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <div className="p-6 rounded-2xl bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-950/30 dark:to-cyan-950/30 border border-blue-200 dark:border-blue-800 text-center">
            <TrendingUp className="w-8 h-8 text-blue-600 dark:text-cyan-400 mx-auto mb-2" />
            <div className="text-3xl font-bold text-gray-900 dark:text-white mb-1">3</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Active Habits</div>
          </div>
          <div className="p-6 rounded-2xl bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-950/30 dark:to-pink-950/30 border border-purple-200 dark:border-purple-800 text-center">
            <Award className="w-8 h-8 text-purple-600 dark:text-pink-400 mx-auto mb-2" />
            <div className="text-3xl font-bold text-gray-900 dark:text-white mb-1">15</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Longest Streak</div>
          </div>
          <div className="p-6 rounded-2xl bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950/30 dark:to-emerald-950/30 border border-green-200 dark:border-green-800 text-center">
            <Brain className="w-8 h-8 text-green-600 dark:text-emerald-400 mx-auto mb-2" />
            <div className="text-3xl font-bold text-gray-900 dark:text-white mb-1">34</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Total Days</div>
          </div>
        </div>

        <div className="space-y-4 mb-8">
          {habits.map((habit, index) => (
            <div key={index} className="p-6 rounded-2xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">{habit.name}</h3>
                <span className="px-3 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 rounded-full text-sm font-medium">
                  {habit.streak} day streak
                </span>
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-400">
                  <span>Progress to {habit.target} days</span>
                  <span>{Math.round((habit.streak / habit.target) * 100)}%</span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                  <div
                    className="bg-gradient-to-r from-purple-500 to-indigo-500 h-2 rounded-full transition-all"
                    style={{ width: `${(habit.streak / habit.target) * 100}%` }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>

        <button className="w-full px-6 py-4 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-lg font-semibold text-lg hover:shadow-lg transition-all">
          Add New Habit
        </button>
      </div>
    </FeaturePage>
  );
}

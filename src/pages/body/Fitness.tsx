import { Dumbbell, Flame, Timer } from 'lucide-react';
import { FeaturePage } from '../../components/FeaturePage';

export function Fitness() {
  const todayStats = [
    { icon: Flame, label: 'Calories Burned', value: '320', color: 'orange' },
    { icon: Timer, label: 'Active Minutes', value: '45', color: 'blue' },
    { icon: Dumbbell, label: 'Workouts', value: '2', color: 'green' },
  ];

  const workouts = [
    {
      title: 'Morning Cardio',
      duration: '30 min',
      calories: '250 cal',
      status: 'Completed',
    },
    {
      title: 'Strength Training',
      duration: '45 min',
      calories: '180 cal',
      status: 'Scheduled',
    },
  ];

  return (
    <FeaturePage
      icon={Dumbbell}
      title="Fitness & Exercise"
      description="Custom workout plans and activity tracking to reach your fitness goals"
      gradient="from-orange-500 via-red-500 to-pink-500 dark:from-orange-900 dark:via-red-900 dark:to-pink-900"
    >
      <div className="max-w-4xl mx-auto">
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          {todayStats.map((stat, index) => (
            <div key={index} className="p-6 rounded-2xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
              <stat.icon className="w-8 h-8 text-orange-500 mb-4" />
              <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">{stat.label}</div>
              <div className="text-3xl font-bold text-gray-900 dark:text-white">{stat.value}</div>
            </div>
          ))}
        </div>

        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
          Today's Workouts
        </h3>

        <div className="space-y-4 mb-8">
          {workouts.map((workout, index) => (
            <div key={index} className="p-6 rounded-2xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-between mb-3">
                <h4 className="text-xl font-bold text-gray-900 dark:text-white">{workout.title}</h4>
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                  workout.status === 'Completed'
                    ? 'bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400'
                    : 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400'
                }`}>
                  {workout.status}
                </span>
              </div>
              <div className="flex items-center space-x-4 text-sm text-gray-600 dark:text-gray-400">
                <span>{workout.duration}</span>
                <span>•</span>
                <span>{workout.calories}</span>
              </div>
            </div>
          ))}
        </div>

        <button className="w-full px-6 py-4 bg-gradient-to-r from-orange-600 to-red-600 text-white rounded-lg font-semibold text-lg hover:shadow-lg transition-all">
          Start New Workout
        </button>
      </div>
    </FeaturePage>
  );
}

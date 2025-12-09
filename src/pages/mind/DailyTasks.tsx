import { CheckSquare, Sun } from 'lucide-react';
import { FeaturePage } from '../../components/FeaturePage';

export function DailyTasks() {
  const tasks = [
    { title: 'Practice gratitude', description: 'Write 3 things you\'re grateful for', completed: true },
    { title: 'Take a short walk', description: '15 minutes of outdoor activity', completed: true },
    { title: 'Connect with someone', description: 'Call or message a friend or family', completed: false },
    { title: 'Mindful breathing', description: '5 minutes of deep breathing', completed: false },
    { title: 'Evening reflection', description: 'Journal about your day', completed: false },
  ];

  return (
    <FeaturePage
      icon={CheckSquare}
      title="Daily Wellness Tasks"
      description="Simple daily activities to support your mental health"
      gradient="from-green-500 via-teal-500 to-cyan-500 dark:from-green-900 dark:via-teal-900 dark:to-cyan-900"
    >
      <div className="max-w-3xl mx-auto">
        <div className="p-8 rounded-2xl bg-gradient-to-br from-green-50 to-teal-50 dark:from-green-950/30 dark:to-teal-950/30 border border-green-200 dark:border-green-800 mb-8">
          <div className="flex items-center space-x-3 mb-4">
            <Sun className="w-8 h-8 text-yellow-500" />
            <div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white">Today's Progress</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">2 of 5 tasks completed</p>
            </div>
          </div>
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
            <div className="bg-gradient-to-r from-green-500 to-teal-500 h-3 rounded-full" style={{ width: '40%' }} />
          </div>
        </div>

        <div className="space-y-4">
          {tasks.map((task, index) => (
            <div
              key={index}
              className={`p-6 rounded-2xl border transition-all ${
                task.completed
                  ? 'bg-green-50 dark:bg-green-950/30 border-green-200 dark:border-green-800'
                  : 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700'
              }`}
            >
              <div className="flex items-start space-x-4">
                <button
                  className={`flex-shrink-0 w-6 h-6 rounded-md border-2 flex items-center justify-center transition ${
                    task.completed
                      ? 'bg-green-500 border-green-500'
                      : 'border-gray-300 dark:border-gray-600'
                  }`}
                >
                  {task.completed && (
                    <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  )}
                </button>
                <div className="flex-1">
                  <h4 className={`text-lg font-semibold mb-1 ${
                    task.completed
                      ? 'text-gray-500 dark:text-gray-500 line-through'
                      : 'text-gray-900 dark:text-white'
                  }`}>
                    {task.title}
                  </h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{task.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </FeaturePage>
  );
}

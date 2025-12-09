import { Heart, Activity } from 'lucide-react';
import { FeaturePage } from '../../components/FeaturePage';

export function StressAssessment() {
  const questions = [
    'How often have you felt nervous or stressed?',
    'How often have you felt unable to control important things?',
    'How often have you felt confident about handling problems?',
  ];

  return (
    <FeaturePage
      icon={Heart}
      title="Stress Assessment"
      description="Evaluate your stress levels and get personalized coping strategies"
      gradient="from-red-500 via-pink-500 to-rose-500 dark:from-red-900 dark:via-pink-900 dark:to-rose-900"
    >
      <div className="max-w-3xl mx-auto">
        <div className="p-8 rounded-2xl bg-rose-50 dark:bg-rose-950/30 border border-rose-200 dark:border-rose-800 mb-8">
          <div className="flex items-start space-x-3 mb-6">
            <Activity className="w-6 h-6 text-rose-600 flex-shrink-0 mt-1" />
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Assessment Notice</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                This assessment provides general guidance about stress levels. For persistent stress or anxiety,
                please consult a mental health professional.
              </p>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          {questions.map((question, index) => (
            <div key={index} className="p-6 rounded-2xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
              <p className="text-lg font-medium text-gray-900 dark:text-white mb-4">
                {index + 1}. {question}
              </p>
              <div className="grid grid-cols-5 gap-2">
                {['Never', 'Rarely', 'Sometimes', 'Often', 'Always'].map((option, i) => (
                  <button
                    key={i}
                    className="px-4 py-2 rounded-lg bg-gray-100 dark:bg-gray-700 hover:bg-blue-100 dark:hover:bg-blue-900/30 text-sm font-medium text-gray-900 dark:text-white transition"
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>

        <button className="mt-8 w-full px-6 py-4 bg-gradient-to-r from-red-600 to-pink-600 text-white rounded-lg font-semibold text-lg hover:shadow-lg transition-all">
          Complete Assessment
        </button>
      </div>
    </FeaturePage>
  );
}

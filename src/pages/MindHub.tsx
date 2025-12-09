import { Link } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import { Brain, Smile, Heart, Wind, CheckSquare, MessageCircle, Moon } from 'lucide-react';

export function MindHub() {
  const { t } = useLanguage();

  const features = [
    {
      icon: Smile,
      title: t('mind.mood'),
      description: t('mind.moodDesc'),
      link: '/mind/mood-tracking',
      gradient: 'from-yellow-500 to-orange-500',
    },
    {
      icon: Heart,
      title: t('mind.stress'),
      description: t('mind.stressDesc'),
      link: '/mind/stress-assessment',
      gradient: 'from-red-500 to-pink-500',
    },
    {
      icon: Wind,
      title: t('mind.meditation'),
      description: t('mind.meditationDesc'),
      link: '/mind/meditation',
      gradient: 'from-cyan-500 to-blue-500',
    },
    {
      icon: CheckSquare,
      title: t('mind.tasks'),
      description: t('mind.tasksDesc'),
      link: '/mind/daily-tasks',
      gradient: 'from-green-500 to-teal-500',
    },
    {
      icon: Brain,
      title: t('mind.habits'),
      description: t('mind.habitsDesc'),
      link: '/mind/habits',
      gradient: 'from-purple-500 to-indigo-500',
    },
    {
      icon: MessageCircle,
      title: t('mind.support'),
      description: t('mind.supportDesc'),
      link: '/mind/support',
      gradient: 'from-pink-500 to-rose-500',
    },
    {
      icon: Moon,
      title: t('mind.sleep'),
      description: t('mind.sleepDesc'),
      link: '/mind/sleep',
      gradient: 'from-indigo-500 to-purple-500',
    },
  ];

  return (
    <div className="min-h-screen">
      <section className="relative pt-20 pb-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-purple-50 via-pink-50 to-rose-50 dark:from-gray-900 dark:via-purple-950 dark:to-pink-950">
        <div className="max-w-7xl mx-auto text-center">
          <div className="inline-flex p-4 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-500 mb-6 animate-fade-in-up">
            <Brain className="w-12 h-12 text-white" />
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 dark:text-white mb-4 animate-fade-in-up animation-delay-100">
            {t('mind.title')}
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto animate-fade-in-up animation-delay-200">
            {t('mind.subtitle')}
          </p>
        </div>
      </section>

      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <Link
                key={index}
                to={feature.link}
                className="group relative overflow-hidden rounded-2xl p-6 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-5 transition-opacity`} />

                <div className={`inline-flex p-3 rounded-xl bg-gradient-to-br ${feature.gradient} mb-4 group-hover:scale-110 transition-transform`}>
                  <feature.icon className="w-6 h-6 text-white" />
                </div>

                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                  {feature.title}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {feature.description}
                </p>
              </Link>
            ))}
          </div>

          <div className="mt-16 p-8 rounded-3xl bg-gradient-to-br from-purple-100 to-pink-100 dark:from-purple-950/30 dark:to-pink-950/30 border border-purple-200 dark:border-purple-800">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Mental Wellness Matters
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Our platform provides safe guidance and information to support your mental health journey.
              If you're experiencing severe symptoms, please seek help from a qualified mental health professional.
            </p>
            <div className="grid md:grid-cols-3 gap-4">
              <div className="p-4 rounded-xl bg-white dark:bg-gray-800">
                <div className="text-2xl font-bold text-purple-600 dark:text-pink-400 mb-1">Private</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  Your mental health data is completely confidential
                </div>
              </div>
              <div className="p-4 rounded-xl bg-white dark:bg-gray-800">
                <div className="text-2xl font-bold text-purple-600 dark:text-pink-400 mb-1">Evidence-Based</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  Techniques backed by psychological research
                </div>
              </div>
              <div className="p-4 rounded-xl bg-white dark:bg-gray-800">
                <div className="text-2xl font-bold text-purple-600 dark:text-pink-400 mb-1">Supportive</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  Gentle guidance for your wellness journey
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

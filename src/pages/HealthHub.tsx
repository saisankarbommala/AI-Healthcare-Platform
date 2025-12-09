import { Link } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import { TrendingUp, Shield, Users, CalendarDays, FileBarChart, Scan, BookOpen } from 'lucide-react';

export function HealthHub() {
  const { t } = useLanguage();

  const features = [
    {
      icon: TrendingUp,
      title: t('health.prediction'),
      description: t('health.predictionDesc'),
      link: '/health/prediction',
      gradient: 'from-blue-500 to-cyan-500',
    },
    {
      icon: Shield,
      title: t('health.riskScore'),
      description: t('health.riskScoreDesc'),
      link: '/health/risk-score',
      gradient: 'from-orange-500 to-red-500',
    },
    {
      icon: Users,
      title: t('health.family'),
      description: t('health.familyDesc'),
      link: '/health/family',
      gradient: 'from-green-500 to-emerald-500',
    },
    {
      icon: CalendarDays,
      title: t('health.calendar'),
      description: t('health.calendarDesc'),
      link: '/health/calendar',
      gradient: 'from-purple-500 to-pink-500',
    },
    {
      icon: FileBarChart,
      title: t('health.analyzer'),
      description: t('health.analyzerDesc'),
      link: '/health/analyzer',
      gradient: 'from-indigo-500 to-blue-500',
    },
    {
      icon: Scan,
      title: t('health.scanner'),
      description: t('health.scannerDesc'),
      link: '/health/scanner',
      gradient: 'from-yellow-500 to-orange-500',
    },
    {
      icon: BookOpen,
      title: t('health.encyclopedia'),
      description: t('health.encyclopediaDesc'),
      link: '/health/encyclopedia',
      gradient: 'from-teal-500 to-cyan-500',
    },
  ];

  return (
    <div className="min-h-screen">
      <section className="relative pt-20 pb-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 dark:from-gray-900 dark:via-green-950 dark:to-emerald-950">
        <div className="max-w-7xl mx-auto text-center">
          <div className="inline-flex p-4 rounded-2xl bg-gradient-to-br from-green-500 to-emerald-500 mb-6 animate-fade-in-up">
            <TrendingUp className="w-12 h-12 text-white" />
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 dark:text-white mb-4 animate-fade-in-up animation-delay-100">
            {t('health.title')}
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto animate-fade-in-up animation-delay-200">
            {t('health.subtitle')}
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

          <div className="mt-16 p-8 rounded-3xl bg-gradient-to-br from-green-100 to-emerald-100 dark:from-green-950/30 dark:to-emerald-950/30 border border-green-200 dark:border-green-800">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Important Health Information
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Our AI provides health risk tendencies and information for educational purposes only.
              This platform does not diagnose conditions or replace professional medical advice.
              Always consult qualified healthcare providers for medical decisions.
            </p>
            <div className="grid md:grid-cols-3 gap-4">
              <div className="p-4 rounded-xl bg-white dark:bg-gray-800">
                <div className="text-2xl font-bold text-green-600 dark:text-emerald-400 mb-1">Guidance</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  Information to help you understand your health
                </div>
              </div>
              <div className="p-4 rounded-xl bg-white dark:bg-gray-800">
                <div className="text-2xl font-bold text-green-600 dark:text-emerald-400 mb-1">Prevention</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  Identify risk factors and take preventive action
                </div>
              </div>
              <div className="p-4 rounded-xl bg-white dark:bg-gray-800">
                <div className="text-2xl font-bold text-green-600 dark:text-emerald-400 mb-1">Empowerment</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  Make informed health decisions with AI insights
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

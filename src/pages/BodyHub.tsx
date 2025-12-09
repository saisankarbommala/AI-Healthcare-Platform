import { Link } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import { Activity, Stethoscope, Video, Calendar, Pill, FileText, Apple, Dumbbell } from 'lucide-react';

export function BodyHub() {
  const { t } = useLanguage();

  const features = [
    {
      icon: Activity,
      title: t('body.vitals'),
      description: t('body.vitalsDesc'),
      link: '/body/vitals',
      gradient: 'from-red-500 to-orange-500',
    },
    {
      icon: Stethoscope,
      title: t('body.symptom'),
      description: t('body.symptomDesc'),
      link: '/body/symptom-checker',
      gradient: 'from-blue-500 to-cyan-500',
    },
    {
      icon: Video,
      title: t('body.telemedicine'),
      description: t('body.telemedicineDesc'),
      link: '/body/telemedicine',
      gradient: 'from-purple-500 to-pink-500',
    },
    {
      icon: Calendar,
      title: t('body.appointment'),
      description: t('body.appointmentDesc'),
      link: '/body/appointments',
      gradient: 'from-green-500 to-emerald-500',
    },
    
    {
      icon: Apple,
      title: t('body.diet'),
      description: t('body.dietDesc'),
      link: '/body/diet',
      gradient: 'from-lime-500 to-green-500',
    },
    {
      icon: Dumbbell,
      title: t('body.fitness'),
      description: t('body.fitnessDesc'),
      link: '/body/fitness',
      gradient: 'from-orange-500 to-red-500',
    },
  ];

  return (
    <div className="min-h-screen">
      <section className="relative pt-20 pb-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-blue-50 via-cyan-50 to-teal-50 dark:from-gray-900 dark:via-blue-950 dark:to-cyan-950">
        <div className="max-w-7xl mx-auto text-center">
          <div className="inline-flex p-4 rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-500 mb-6 animate-fade-in-up">
            <Activity className="w-12 h-12 text-white" />
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 dark:text-white mb-4 animate-fade-in-up animation-delay-100">
            {t('body.title')}
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto animate-fade-in-up animation-delay-200">
            {t('body.subtitle')}
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

          <div className="mt-16 grid md:grid-cols-3 gap-8">
            <div className="p-6 rounded-2xl bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-950/50 dark:to-cyan-950/50 border border-blue-200 dark:border-blue-800">
              <div className="text-3xl font-bold text-blue-600 dark:text-cyan-400 mb-2">24/7</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                Round-the-clock health monitoring and support
              </div>
            </div>
            <div className="p-6 rounded-2xl bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950/50 dark:to-emerald-950/50 border border-green-200 dark:border-green-800">
              <div className="text-3xl font-bold text-green-600 dark:text-emerald-400 mb-2">AI-Powered</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                Advanced AI for accurate health insights
              </div>
            </div>
            <div className="p-6 rounded-2xl bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-950/50 dark:to-pink-950/50 border border-purple-200 dark:border-purple-800">
              <div className="text-3xl font-bold text-purple-600 dark:text-pink-400 mb-2">Secure</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                Your health data is encrypted and protected
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

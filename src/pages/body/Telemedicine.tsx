import { Video, Phone, MessageCircle } from 'lucide-react';
import { FeaturePage } from '../../components/FeaturePage';

export function Telemedicine() {
  const consultOptions = [
    {
      icon: Video,
      title: 'Video Consultation',
      description: 'Face-to-face consultations with healthcare professionals',
      gradient: 'from-blue-500 to-cyan-500',
    },
    {
      icon: Phone,
      title: 'Audio Call',
      description: 'Quick voice consultations for immediate guidance',
      gradient: 'from-green-500 to-emerald-500',
    },
    {
      icon: MessageCircle,
      title: 'Chat Support',
      description: 'Text-based consultations for non-urgent matters',
      gradient: 'from-purple-500 to-pink-500',
    },
  ];

  return (
    <FeaturePage
      icon={Video}
      title="Telemedicine"
      description="Connect with healthcare providers through video, audio, or chat"
      gradient="from-purple-500 via-pink-500 to-rose-500 dark:from-purple-900 dark:via-pink-900 dark:to-rose-900"
    >
      <div className="grid md:grid-cols-3 gap-6 mb-12">
        {consultOptions.map((option, index) => (
          <div key={index} className="p-6 rounded-2xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-all">
            <div className={`inline-flex p-3 rounded-xl bg-gradient-to-br ${option.gradient} mb-4`}>
              <option.icon className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{option.title}</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">{option.description}</p>
            <button className="w-full px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white rounded-lg font-medium hover:bg-gray-200 dark:hover:bg-gray-600 transition">
              Start Consultation
            </button>
          </div>
        ))}
      </div>

      <div className="p-8 rounded-2xl bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-950/30 dark:to-cyan-950/30 border border-blue-200 dark:border-blue-800">
        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
          Available 24/7
        </h3>
        <p className="text-gray-600 dark:text-gray-400">
          Our healthcare professionals are available round-the-clock to provide consultation and support when you need it most.
        </p>
      </div>
    </FeaturePage>
  );
}

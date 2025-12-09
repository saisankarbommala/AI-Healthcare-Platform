import { Pill, Bell, Clock } from 'lucide-react';
import { FeaturePage } from '../../components/FeaturePage';

export function Medicine() {
  const medications = [
    {
      name: 'Aspirin',
      dosage: '100mg',
      frequency: 'Once daily',
      time: '8:00 AM',
      stock: 25,
    },
    {
      name: 'Vitamin D',
      dosage: '1000 IU',
      frequency: 'Once daily',
      time: '9:00 AM',
      stock: 45,
    },
  ];

  return (
    <FeaturePage
      icon={Pill}
      title="Medicine Management"
      description="Track medications, set reminders, and manage prescriptions"
      gradient="from-yellow-500 via-amber-500 to-orange-500 dark:from-yellow-900 dark:via-amber-900 dark:to-orange-900"
    >
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <button className="w-full px-6 py-4 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-lg font-semibold text-lg hover:shadow-lg transition-all">
            Add New Medication
          </button>
        </div>

        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
          Current Medications
        </h3>

        <div className="space-y-4 mb-8">
          {medications.map((med, index) => (
            <div key={index} className="p-6 rounded-2xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h4 className="text-xl font-bold text-gray-900 dark:text-white">{med.name}</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{med.dosage}</p>
                </div>
                <div className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-full text-sm font-medium">
                  {med.stock} pills left
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center space-x-2 text-gray-600 dark:text-gray-400">
                  <Bell className="w-4 h-4" />
                  <span className="text-sm">{med.frequency}</span>
                </div>
                <div className="flex items-center space-x-2 text-gray-600 dark:text-gray-400">
                  <Clock className="w-4 h-4" />
                  <span className="text-sm">{med.time}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="p-8 rounded-2xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800">
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            Refill Reminders
          </h3>
          <p className="text-gray-600 dark:text-gray-400">
            Get notified when it's time to refill your medications. Never miss a dose again.
          </p>
        </div>
      </div>
    </FeaturePage>
  );
}

import { CalendarDays, Pill, Stethoscope, Activity } from 'lucide-react';
import { FeaturePage } from '../../components/FeaturePage';

export function Calendar() {
  const events = [
    {
      type: 'appointment',
      icon: Stethoscope,
      title: 'Doctor Visit',
      date: 'Dec 15',
      time: '10:00 AM',
      color: 'blue',
    },
    {
      type: 'medication',
      icon: Pill,
      title: 'Medication Refill',
      date: 'Dec 18',
      time: 'All day',
      color: 'purple',
    },
    {
      type: 'checkup',
      icon: Activity,
      title: 'Annual Checkup',
      date: 'Dec 20',
      time: '2:30 PM',
      color: 'green',
    },
  ];

  return (
    <FeaturePage
      icon={CalendarDays}
      title="Smart Health Calendar"
      description="Track appointments, medications, and health events in one place"
      gradient="from-purple-500 via-pink-500 to-rose-500 dark:from-purple-900 dark:via-pink-900 dark:to-rose-900"
    >
      <div className="max-w-5xl mx-auto">
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <div className="p-6 rounded-2xl bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-950/30 dark:to-cyan-950/30 border border-blue-200 dark:border-blue-800 text-center">
            <div className="text-3xl font-bold text-blue-600 dark:text-cyan-400 mb-1">5</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Appointments</div>
          </div>
          <div className="p-6 rounded-2xl bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-950/30 dark:to-pink-950/30 border border-purple-200 dark:border-purple-800 text-center">
            <div className="text-3xl font-bold text-purple-600 dark:text-pink-400 mb-1">8</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Medications</div>
          </div>
          <div className="p-6 rounded-2xl bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950/30 dark:to-emerald-950/30 border border-green-200 dark:border-green-800 text-center">
            <div className="text-3xl font-bold text-green-600 dark:text-emerald-400 mb-1">2</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Checkups Due</div>
          </div>
        </div>

        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
          Upcoming Events
        </h3>

        <div className="space-y-4">
          {events.map((event, index) => (
            <div key={index} className="p-6 rounded-2xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-all">
              <div className="flex items-center space-x-4">
                <div className={`p-3 rounded-xl bg-gradient-to-br ${
                  event.color === 'blue' ? 'from-blue-500 to-cyan-500' :
                  event.color === 'purple' ? 'from-purple-500 to-pink-500' :
                  'from-green-500 to-emerald-500'
                }`}>
                  <event.icon className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1">
                  <h4 className="text-lg font-bold text-gray-900 dark:text-white">{event.title}</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {event.date} • {event.time}
                  </p>
                </div>
                <button className="px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white rounded-lg text-sm font-medium hover:bg-gray-200 dark:hover:bg-gray-600 transition">
                  Details
                </button>
              </div>
            </div>
          ))}
        </div>

        <button className="mt-8 w-full px-6 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg font-semibold text-lg hover:shadow-lg transition-all">
          Add New Event
        </button>
      </div>
    </FeaturePage>
  );
}

import { Users, UserPlus, Activity } from 'lucide-react';
import { FeaturePage } from '../../components/FeaturePage';

export function Family() {
  const familyMembers = [
    {
      name: 'John Doe',
      relation: 'You',
      age: 35,
      status: 'Healthy',
      lastCheckup: 'Nov 2024',
    },
    {
      name: 'Jane Doe',
      relation: 'Spouse',
      age: 33,
      status: 'Healthy',
      lastCheckup: 'Oct 2024',
    },
    {
      name: 'Emily Doe',
      relation: 'Daughter',
      age: 8,
      status: 'Healthy',
      lastCheckup: 'Dec 2024',
    },
  ];

  return (
    <FeaturePage
      icon={Users}
      title="Family Health Management"
      description="Manage health records and appointments for your entire family"
      gradient="from-green-500 via-emerald-500 to-teal-500 dark:from-green-900 dark:via-emerald-900 dark:to-teal-900"
    >
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <button className="w-full flex items-center justify-center space-x-2 px-6 py-4 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-lg font-semibold text-lg hover:shadow-lg transition-all">
            <UserPlus className="w-5 h-5" />
            <span>Add Family Member</span>
          </button>
        </div>

        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
          Family Members
        </h3>

        <div className="space-y-4">
          {familyMembers.map((member, index) => (
            <div key={index} className="p-6 rounded-2xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-all">
              <div className="flex items-start justify-between">
                <div className="flex items-center space-x-4">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center">
                    <span className="text-2xl font-bold text-white">
                      {member.name.charAt(0)}
                    </span>
                  </div>
                  <div>
                    <h4 className="text-xl font-bold text-gray-900 dark:text-white">{member.name}</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {member.relation} • {member.age} years old
                    </p>
                  </div>
                </div>
                <span className="px-3 py-1 bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 rounded-full text-sm font-medium">
                  {member.status}
                </span>
              </div>

              <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700 flex items-center justify-between">
                <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
                  <Activity className="w-4 h-4" />
                  <span>Last Checkup: {member.lastCheckup}</span>
                </div>
                <button className="px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white rounded-lg text-sm font-medium hover:bg-gray-200 dark:hover:bg-gray-600 transition">
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </FeaturePage>
  );
}

import { DashboardLayout } from '../../components/DashboardLayout';
import { Activity, FileText, TrendingUp, Heart, AlertCircle, Calendar, Download, Sun, Moon, Coffee, Apple } from 'lucide-react';
import { motion } from 'framer-motion';

export const HealthPlan = () => {
  const sidebarLinks = [
    { path: '/body/dashboard', label: 'Dashboard', icon: <Activity className="w-5 h-5" /> },
    { path: '/body/symptoms', label: 'Symptoms Checker', icon: <FileText className="w-5 h-5" /> },
    { path: '/body/data-input', label: 'Body Data', icon: <TrendingUp className="w-5 h-5" /> },
    { path: '/body/analyzer', label: 'AI Analyzer', icon: <Heart className="w-5 h-5" /> },
    { path: '/body/score', label: 'Health Score', icon: <TrendingUp className="w-5 h-5" /> },
    { path: '/body/risk', label: 'Risk Levels', icon: <AlertCircle className="w-5 h-5" /> },
    { path: '/body/plan', label: 'Health Plan', icon: <Calendar className="w-5 h-5" /> },
    { path: '/body/report', label: 'Final Report', icon: <Download className="w-5 h-5" /> },
  ];

  const timeOfDay = [
    {
      icon: <Sun className="w-8 h-8" />,
      title: 'Morning (6:00 - 12:00)',
      color: 'from-yellow-500 to-orange-500',
      activities: [
        'Start with a glass of warm water',
        '20-30 minutes of cardio exercise',
        'Healthy breakfast with protein and fiber',
        'Take morning vitamins',
      ],
    },
    {
      icon: <Coffee className="w-8 h-8" />,
      title: 'Afternoon (12:00 - 18:00)',
      color: 'from-blue-500 to-cyan-500',
      activities: [
        'Balanced lunch with vegetables',
        'Short 10-minute walk after meals',
        'Stay hydrated (2-3 glasses of water)',
        'Healthy snacks if needed',
      ],
    },
    {
      icon: <Moon className="w-8 h-8" />,
      title: 'Evening (18:00 - 22:00)',
      color: 'from-purple-500 to-pink-500',
      activities: [
        'Light dinner 2-3 hours before sleep',
        'Gentle stretching or yoga',
        'Avoid screens 1 hour before bed',
        'Relaxation or meditation',
      ],
    },
  ];

  const weeklyGoals = [
    { day: 'Mon', exercise: true, diet: true, sleep: true },
    { day: 'Tue', exercise: true, diet: true, sleep: false },
    { day: 'Wed', exercise: false, diet: true, sleep: true },
    { day: 'Thu', exercise: true, diet: true, sleep: true },
    { day: 'Fri', exercise: true, diet: false, sleep: true },
    { day: 'Sat', exercise: true, diet: true, sleep: true },
    { day: 'Sun', exercise: false, diet: true, sleep: true },
  ];

  return (
    <DashboardLayout sidebarLinks={sidebarLinks}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-4xl font-bold text-gray-900 mb-2">Daily Health Plan</h1>
        <p className="text-gray-600 mb-8">Your personalized daily routine for optimal health</p>

        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-white shadow-xl mb-8">
          <div className="flex items-center space-x-3 mb-4">
            <Calendar className="w-10 h-10" />
            <h2 className="text-3xl font-bold">Your Customized Plan</h2>
          </div>
          <p className="text-blue-100">
            Follow this AI-generated daily routine tailored to your health needs and goals.
          </p>
        </div>

        <div className="space-y-6 mb-8">
          {timeOfDay.map((period, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.2 }}
              className="bg-white rounded-xl p-6 shadow-lg border border-gray-100"
            >
              <div className="flex items-center space-x-4 mb-4">
                <div className={`p-3 rounded-lg bg-gradient-to-r ${period.color} text-white`}>
                  {period.icon}
                </div>
                <h3 className="text-2xl font-bold text-gray-900">{period.title}</h3>
              </div>
              <ul className="space-y-2 ml-16">
                {period.activities.map((activity, idx) => (
                  <motion.li
                    key={idx}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.2 + idx * 0.1 }}
                    className="flex items-center space-x-3 text-gray-700"
                  >
                    <div className="w-2 h-2 bg-blue-500 rounded-full" />
                    <span>{activity}</span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        <div className="bg-white rounded-xl p-8 shadow-lg mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center space-x-2">
            <Apple className="w-8 h-8 text-green-600" />
            <span>Nutrition Guidelines</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <h3 className="font-semibold text-gray-900 mb-3">Foods to Include:</h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>• Fresh fruits and vegetables</li>
                <li>• Lean proteins (chicken, fish)</li>
                <li>• Whole grains</li>
                <li>• Nuts and seeds</li>
                <li>• Low-fat dairy</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-3">Foods to Limit:</h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>• Processed foods</li>
                <li>• Sugary drinks</li>
                <li>• Red meat</li>
                <li>• Fried foods</li>
                <li>• High-sodium foods</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-3">Hydration:</h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>• 8-10 glasses of water daily</li>
                <li>• Green tea or herbal tea</li>
                <li>• Limit caffeine intake</li>
                <li>• Avoid alcohol</li>
                <li>• Coconut water for electrolytes</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-8 shadow-lg">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Weekly Progress Tracker</h2>
          <div className="flex justify-between items-start">
            {weeklyGoals.map((day, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <div className="text-sm font-medium text-gray-900 mb-2">{day.day}</div>
                <div className="space-y-2">
                  <div className={`w-8 h-8 rounded-full ${day.exercise ? 'bg-green-500' : 'bg-gray-200'}`} title="Exercise" />
                  <div className={`w-8 h-8 rounded-full ${day.diet ? 'bg-blue-500' : 'bg-gray-200'}`} title="Diet" />
                  <div className={`w-8 h-8 rounded-full ${day.sleep ? 'bg-purple-500' : 'bg-gray-200'}`} title="Sleep" />
                </div>
              </motion.div>
            ))}
          </div>
          <div className="flex justify-center space-x-6 mt-6 text-sm">
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 bg-green-500 rounded-full" />
              <span className="text-gray-600">Exercise</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 bg-blue-500 rounded-full" />
              <span className="text-gray-600">Diet</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 bg-purple-500 rounded-full" />
              <span className="text-gray-600">Sleep</span>
            </div>
          </div>
        </div>
      </motion.div>
    </DashboardLayout>
  );
};

import { useState } from 'react';
import { DashboardLayout } from '../../components/DashboardLayout';
import { Brain, Smile, Moon, Calendar as CalendarIcon, Activity, TrendingUp, FileText } from 'lucide-react';
import { motion } from 'framer-motion';

export const MoodTracker = () => {
  const [selectedMood, setSelectedMood] = useState('');

  const sidebarLinks = [
    { path: '/mind/dashboard', label: 'Dashboard', icon: <Brain className="w-5 h-5" /> },
    { path: '/mind/mood', label: 'Mood Tracker', icon: <Smile className="w-5 h-5" /> },
    { path: '/mind/sleep', label: 'Sleep Analysis', icon: <Moon className="w-5 h-5" /> },
    { path: '/mind/routine', label: 'Daily Routine', icon: <CalendarIcon className="w-5 h-5" /> },
    { path: '/mind/symptoms', label: 'Mental Symptoms', icon: <Activity className="w-5 h-5" /> },
    { path: '/mind/assistant', label: 'AI Assistant', icon: <Brain className="w-5 h-5" /> },
    { path: '/mind/score', label: 'Mind Score', icon: <TrendingUp className="w-5 h-5" /> },
    { path: '/mind/report', label: 'Wellness Report', icon: <FileText className="w-5 h-5" /> },
  ];

  const moods = [
    { emoji: '😊', label: 'Happy', color: 'from-yellow-400 to-orange-400' },
    { emoji: '😌', label: 'Calm', color: 'from-blue-400 to-cyan-400' },
    { emoji: '😐', label: 'Neutral', color: 'from-gray-400 to-gray-500' },
    { emoji: '😔', label: 'Sad', color: 'from-blue-600 to-indigo-600' },
    { emoji: '😰', label: 'Anxious', color: 'from-purple-500 to-pink-500' },
    { emoji: '😡', label: 'Angry', color: 'from-red-500 to-rose-500' },
  ];

  return (
    <DashboardLayout sidebarLinks={sidebarLinks}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-4xl font-bold text-gray-900 mb-2">Mood Tracker</h1>
        <p className="text-gray-600 mb-8">How are you feeling today?</p>

        <div className="bg-white rounded-2xl p-8 shadow-lg mb-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Select Your Current Mood</h2>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
            {moods.map((mood, index) => (
              <motion.button
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                onClick={() => setSelectedMood(mood.label)}
                className={`p-6 rounded-xl border-2 transition-all duration-300 ${
                  selectedMood === mood.label
                    ? `border-purple-500 bg-gradient-to-br ${mood.color} text-white shadow-lg scale-105`
                    : 'border-gray-200 bg-white hover:border-purple-300'
                }`}
              >
                <div className="text-6xl mb-3">{mood.emoji}</div>
                <div className={`text-lg font-semibold ${selectedMood === mood.label ? 'text-white' : 'text-gray-900'}`}>
                  {mood.label}
                </div>
              </motion.button>
            ))}
          </div>

          {selectedMood && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-4"
            >
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  What's influencing your mood? (Optional)
                </label>
                <textarea
                  rows={4}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                  placeholder="Share your thoughts..."
                />
              </div>

              <button className="w-full py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg font-semibold hover:shadow-xl hover:scale-105 transition-all duration-200">
                Save Mood Entry
              </button>
            </motion.div>
          )}
        </div>

        <div className="bg-purple-50 border border-purple-200 rounded-xl p-6">
          <h3 className="text-lg font-semibold text-purple-900 mb-2">Tip</h3>
          <p className="text-purple-800 text-sm">
            Tracking your mood daily helps identify patterns and triggers, leading to better emotional awareness and mental health.
          </p>
        </div>
      </motion.div>
    </DashboardLayout>
  );
};

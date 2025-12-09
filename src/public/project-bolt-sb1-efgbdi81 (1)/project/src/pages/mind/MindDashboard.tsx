import { DashboardLayout } from '../../components/DashboardLayout';
import { Brain, Smile, Moon, Calendar as CalendarIcon, Activity, TrendingUp, FileText, Download } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

export const MindDashboard = () => {
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

  const cards = [
    {
      title: 'Mood Tracker',
      description: 'Track your daily mood and emotional patterns',
      icon: <Smile className="w-8 h-8" />,
      link: '/mind/mood',
      gradient: 'from-pink-500 to-rose-500',
    },
    {
      title: 'Sleep Analysis',
      description: 'Monitor your sleep quality and patterns',
      icon: <Moon className="w-8 h-8" />,
      link: '/mind/sleep',
      gradient: 'from-indigo-500 to-purple-500',
    },
    {
      title: 'Daily Routine',
      description: 'Manage your daily activities and habits',
      icon: <CalendarIcon className="w-8 h-8" />,
      link: '/mind/routine',
      gradient: 'from-blue-500 to-cyan-500',
    },
    {
      title: 'Mental Symptoms',
      description: 'Record and track mental health symptoms',
      icon: <Activity className="w-8 h-8" />,
      link: '/mind/symptoms',
      gradient: 'from-orange-500 to-red-500',
    },
    {
      title: 'AI Mental Assistant',
      description: 'Get AI-powered mental health insights',
      icon: <Brain className="w-8 h-8" />,
      link: '/mind/assistant',
      gradient: 'from-purple-500 to-pink-500',
    },
    {
      title: 'Mind Score',
      description: 'View your overall mental wellness score',
      icon: <TrendingUp className="w-8 h-8" />,
      link: '/mind/score',
      gradient: 'from-green-500 to-emerald-500',
    },
  ];

  return (
    <DashboardLayout sidebarLinks={sidebarLinks}>
      <div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Mind Wellness Module</h1>
          <p className="text-gray-600">Track and improve your mental health with AI-powered insights</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {cards.map((card, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Link to={card.link}>
                <div className="group bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 h-full">
                  <div className={`inline-flex p-3 rounded-lg bg-gradient-to-br ${card.gradient} text-white mb-4 group-hover:scale-110 transition-transform`}>
                    {card.icon}
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-purple-600 transition-colors">
                    {card.title}
                  </h3>
                  <p className="text-gray-600 text-sm">
                    {card.description}
                  </p>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
};

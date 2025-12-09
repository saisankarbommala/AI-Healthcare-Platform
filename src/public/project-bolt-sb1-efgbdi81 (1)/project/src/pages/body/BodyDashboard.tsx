import { DashboardLayout } from '../../components/DashboardLayout';
import { Activity, FileText, TrendingUp, Heart, AlertCircle, Calendar, Download } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

export const BodyDashboard = () => {
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

  const cards = [
    {
      title: 'Symptoms Checker',
      description: 'Check your symptoms and get initial insights',
      icon: <FileText className="w-8 h-8" />,
      link: '/body/symptoms',
      gradient: 'from-blue-500 to-cyan-500',
    },
    {
      title: 'Body Data Input',
      description: 'Enter your physical health measurements',
      icon: <TrendingUp className="w-8 h-8" />,
      link: '/body/data-input',
      gradient: 'from-green-500 to-emerald-500',
    },
    {
      title: 'AI Health Analyzer',
      description: 'Get AI-powered health analysis',
      icon: <Heart className="w-8 h-8" />,
      link: '/body/analyzer',
      gradient: 'from-purple-500 to-pink-500',
    },
    {
      title: 'Health Score',
      description: 'View your overall health condition score',
      icon: <TrendingUp className="w-8 h-8" />,
      link: '/body/score',
      gradient: 'from-orange-500 to-red-500',
    },
    {
      title: 'Risk Levels',
      description: 'Understand your health risk factors',
      icon: <AlertCircle className="w-8 h-8" />,
      link: '/body/risk',
      gradient: 'from-red-500 to-pink-500',
    },
    {
      title: 'Daily Health Plan',
      description: 'Personalized daily health recommendations',
      icon: <Calendar className="w-8 h-8" />,
      link: '/body/plan',
      gradient: 'from-indigo-500 to-purple-500',
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
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Body Health Module</h1>
          <p className="text-gray-600">Monitor and analyze your physical health with AI-powered insights</p>
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
                  <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
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

import { DashboardLayout } from '../../components/DashboardLayout';
import { User, Heart, Activity, FileText, Calendar, Pill, Apple, TrendingUp } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

export const PatientDashboard = () => {
  const sidebarLinks = [
    { path: '/patient/dashboard', label: 'Dashboard', icon: <User className="w-5 h-5" /> },
    { path: '/patient/vitals', label: 'Vital Signs', icon: <Activity className="w-5 h-5" /> },
    { path: '/patient/symptoms', label: 'Symptoms', icon: <Heart className="w-5 h-5" /> },
    { path: '/patient/predictions', label: 'AI Predictions', icon: <TrendingUp className="w-5 h-5" /> },
    { path: '/patient/medications', label: 'Medications', icon: <Pill className="w-5 h-5" /> },
    { path: '/patient/diet', label: 'Diet Plan', icon: <Apple className="w-5 h-5" /> },
    { path: '/patient/appointments', label: 'Appointments', icon: <Calendar className="w-5 h-5" /> },
    { path: '/patient/reports', label: 'Reports', icon: <FileText className="w-5 h-5" /> },
  ];

  const cards = [
    {
      title: 'Record Vitals',
      description: 'Track your blood pressure, heart rate, and more',
      icon: <Activity className="w-8 h-8" />,
      link: '/patient/vitals',
      gradient: 'from-red-500 to-pink-500',
    },
    {
      title: 'Report Symptoms',
      description: 'Log your symptoms for AI analysis',
      icon: <Heart className="w-8 h-8" />,
      link: '/patient/symptoms',
      gradient: 'from-blue-500 to-cyan-500',
    },
    {
      title: 'AI Health Predictions',
      description: 'Get AI-powered health insights',
      icon: <TrendingUp className="w-8 h-8" />,
      link: '/patient/predictions',
      gradient: 'from-purple-500 to-pink-500',
    },
    {
      title: 'Medications',
      description: 'View and manage your prescriptions',
      icon: <Pill className="w-8 h-8" />,
      link: '/patient/medications',
      gradient: 'from-green-500 to-emerald-500',
    },
    {
      title: 'Diet Guidance',
      description: 'Personalized nutrition recommendations',
      icon: <Apple className="w-8 h-8" />,
      link: '/patient/diet',
      gradient: 'from-orange-500 to-red-500',
    },
    {
      title: 'My Reports',
      description: 'Access your health reports and history',
      icon: <FileText className="w-8 h-8" />,
      link: '/patient/reports',
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
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Patient Dashboard</h1>
          <p className="text-gray-600">Manage your health and track your wellness journey</p>
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

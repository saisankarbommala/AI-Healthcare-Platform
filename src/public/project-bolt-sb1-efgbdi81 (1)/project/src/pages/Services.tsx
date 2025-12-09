import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Activity, Brain, Stethoscope, Users, ArrowRight } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export const Services = () => {
  const { user } = useAuth();

  const modules = [
    {
      icon: <Activity className="w-16 h-16" />,
      title: 'Body Module',
      description: 'Comprehensive physical health analysis with AI-powered insights, symptom checker, and personalized health plans.',
      path: user ? '/body/dashboard' : '/login?redirect=/body/dashboard',
      gradient: 'from-blue-500 to-cyan-500',
      features: ['Symptoms Checker', 'Health Analyzer', 'Body Score', 'Health Plans'],
    },
    {
      icon: <Brain className="w-16 h-16" />,
      title: 'Mind Module',
      description: 'Mental wellness tracking with mood analysis, sleep monitoring, and AI-driven mental health recommendations.',
      path: user ? '/mind/dashboard' : '/login?redirect=/mind/dashboard',
      gradient: 'from-purple-500 to-pink-500',
      features: ['Mood Tracking', 'Sleep Analysis', 'Mental Score', 'Wellness Tips'],
    },
    {
      icon: <Stethoscope className="w-16 h-16" />,
      title: 'Doctor Module',
      description: 'Complete doctor management system with appointments, digital prescriptions, and patient monitoring.',
      path: user ? '/doctor/dashboard' : '/login?redirect=/doctor/dashboard',
      gradient: 'from-green-500 to-emerald-500',
      features: ['Appointments', 'Prescriptions', 'Patient History', 'Scheduling'],
    },
    {
      icon: <Users className="w-16 h-16" />,
      title: 'Patient Module',
      description: 'Full patient care system with vitals tracking, AI disease prediction, and comprehensive health reports.',
      path: user ? '/patient/dashboard' : '/login?redirect=/patient/dashboard',
      gradient: 'from-orange-500 to-red-500',
      features: ['Vitals Monitoring', 'AI Predictions', 'Medicine Guide', 'Health Reports'],
    },
  ];

  return (
    <div className="min-h-screen pt-16 bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring' }}
            className="inline-block mb-4 px-6 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full text-sm font-medium"
          >
            Choose Your Module
          </motion.div>

          <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Our Healthcare Services
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Select the module that best fits your healthcare needs. Each module is powered by advanced AI technology.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {modules.map((module, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="group relative"
            >
              <Link to={module.path}>
                <div className="relative bg-white rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all duration-500 border border-gray-100 overflow-hidden h-full">
                  <div className={`absolute top-0 right-0 w-64 h-64 bg-gradient-to-br ${module.gradient} opacity-5 rounded-full blur-3xl group-hover:opacity-10 transition-opacity duration-500`} />

                  <div className="relative z-10">
                    <div className={`inline-flex p-5 rounded-2xl bg-gradient-to-br ${module.gradient} text-white mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                      {module.icon}
                    </div>

                    <h3 className="text-3xl font-bold mb-3 text-gray-900 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:bg-clip-text group-hover:from-blue-600 group-hover:to-purple-600 transition-all">
                      {module.title}
                    </h3>

                    <p className="text-gray-600 leading-relaxed mb-6">
                      {module.description}
                    </p>

                    <div className="space-y-2 mb-6">
                      {module.features.map((feature, idx) => (
                        <div key={idx} className="flex items-center space-x-2 text-sm text-gray-500">
                          <div className={`w-1.5 h-1.5 rounded-full bg-gradient-to-r ${module.gradient}`} />
                          <span>{feature}</span>
                        </div>
                      ))}
                    </div>

                    <div className="flex items-center space-x-2 text-blue-600 font-semibold group-hover:translate-x-2 transition-transform duration-300">
                      <span>Access Module</span>
                      <ArrowRight className="w-5 h-5" />
                    </div>
                  </div>

                  <div className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${module.gradient} transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left`} />
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {!user && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mt-12 text-center"
          >
            <div className="inline-block bg-blue-50 border border-blue-200 rounded-xl p-6">
              <p className="text-gray-700 mb-4">
                <span className="font-semibold">Note:</span> You need to login to access these modules.
              </p>
              <Link
                to="/login"
                className="inline-flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-semibold hover:shadow-lg hover:scale-105 transition-all duration-200"
              >
                <span>Login Now</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

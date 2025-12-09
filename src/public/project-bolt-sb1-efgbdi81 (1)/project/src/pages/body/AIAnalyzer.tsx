import { useState, useEffect } from 'react';
import { DashboardLayout } from '../../components/DashboardLayout';
import { Activity, FileText, TrendingUp, Heart, AlertCircle, Calendar, Download, Loader2, Brain } from 'lucide-react';
import { motion } from 'framer-motion';

export const AIAnalyzer = () => {
  const [analyzing, setAnalyzing] = useState(true);
  const [analysisComplete, setAnalysisComplete] = useState(false);

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

  useEffect(() => {
    setTimeout(() => {
      setAnalyzing(false);
      setAnalysisComplete(true);
    }, 3000);
  }, []);

  const insights = [
    {
      category: 'Cardiovascular Health',
      status: 'Good',
      details: 'Your heart rate and blood pressure are within normal ranges.',
      color: 'green',
    },
    {
      category: 'Body Composition',
      status: 'Normal',
      details: 'Your BMI indicates a healthy weight range for your height.',
      color: 'green',
    },
    {
      category: 'Vital Signs',
      status: 'Attention Needed',
      details: 'Slight elevation in temperature detected. Monitor for 24-48 hours.',
      color: 'yellow',
    },
  ];

  return (
    <DashboardLayout sidebarLinks={sidebarLinks}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-4xl font-bold text-gray-900 mb-2">AI Health Analyzer</h1>
        <p className="text-gray-600 mb-8">Advanced AI analysis of your health data</p>

        {analyzing && (
          <div className="bg-white rounded-2xl p-12 shadow-lg text-center">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
              className="inline-block mb-6"
            >
              <Brain className="w-16 h-16 text-blue-600" />
            </motion.div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Analyzing Your Health Data</h2>
            <p className="text-gray-600 mb-6">Our AI is processing your information...</p>
            <div className="max-w-md mx-auto">
              <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-blue-600 to-purple-600"
                  initial={{ width: '0%' }}
                  animate={{ width: '100%' }}
                  transition={{ duration: 3 }}
                />
              </div>
            </div>
          </div>
        )}

        {analysisComplete && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-6"
          >
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-white shadow-xl">
              <div className="flex items-center space-x-3 mb-4">
                <Brain className="w-10 h-10" />
                <h2 className="text-3xl font-bold">AI Analysis Complete</h2>
              </div>
              <p className="text-blue-100">
                Your health data has been analyzed using advanced machine learning algorithms.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-6">
              {insights.map((insight, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.2 }}
                  className="bg-white rounded-xl p-6 shadow-lg border border-gray-100"
                >
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="text-xl font-bold text-gray-900">{insight.category}</h3>
                    <span className={`px-4 py-1 rounded-full text-sm font-medium ${
                      insight.color === 'green'
                        ? 'bg-green-100 text-green-700'
                        : insight.color === 'yellow'
                        ? 'bg-yellow-100 text-yellow-700'
                        : 'bg-red-100 text-red-700'
                    }`}>
                      {insight.status}
                    </span>
                  </div>
                  <p className="text-gray-600">{insight.details}</p>
                </motion.div>
              ))}
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-blue-900 mb-2">Next Steps</h3>
              <ul className="space-y-2 text-blue-800 text-sm">
                <li>• Review your health score for a comprehensive overview</li>
                <li>• Check risk levels to identify areas needing attention</li>
                <li>• View your personalized health plan</li>
                <li>• Download your complete health report</li>
              </ul>
            </div>
          </motion.div>
        )}
      </motion.div>
    </DashboardLayout>
  );
};

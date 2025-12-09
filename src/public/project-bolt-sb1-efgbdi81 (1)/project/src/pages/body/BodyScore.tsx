import { DashboardLayout } from '../../components/DashboardLayout';
import { Activity, FileText, TrendingUp, Heart, AlertCircle, Calendar, Download, Award } from 'lucide-react';
import { motion } from 'framer-motion';

export const BodyScore = () => {
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

  const score = 78;
  const categories = [
    { name: 'Cardiovascular', score: 85, max: 100 },
    { name: 'Respiratory', score: 80, max: 100 },
    { name: 'Metabolic', score: 72, max: 100 },
    { name: 'Physical Fitness', score: 75, max: 100 },
  ];

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getScoreGradient = (score: number) => {
    if (score >= 80) return 'from-green-500 to-emerald-500';
    if (score >= 60) return 'from-yellow-500 to-orange-500';
    return 'from-red-500 to-pink-500';
  };

  return (
    <DashboardLayout sidebarLinks={sidebarLinks}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-4xl font-bold text-gray-900 mb-2">Body Condition Score</h1>
        <p className="text-gray-600 mb-8">Your overall health score based on AI analysis</p>

        <div className="bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl p-8 shadow-xl mb-8">
          <div className="text-center">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', duration: 1 }}
              className="inline-flex items-center justify-center w-48 h-48 bg-white rounded-full shadow-2xl mb-6 mx-auto"
            >
              <div className="text-center">
                <div className={`text-6xl font-bold ${getScoreColor(score)}`}>{score}</div>
                <div className="text-gray-500 text-sm">out of 100</div>
              </div>
            </motion.div>
            <h2 className="text-3xl font-bold text-white mb-2">Overall Health Score</h2>
            <p className="text-blue-100">
              {score >= 80 ? 'Excellent Health!' : score >= 60 ? 'Good Health' : 'Needs Attention'}
            </p>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-8 shadow-lg mb-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center space-x-2">
            <Award className="w-8 h-8 text-blue-600" />
            <span>Detailed Breakdown</span>
          </h2>

          <div className="space-y-6">
            {categories.map((category, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-lg font-medium text-gray-900">{category.name}</span>
                  <span className={`text-2xl font-bold ${getScoreColor(category.score)}`}>
                    {category.score}
                  </span>
                </div>
                <div className="h-4 bg-gray-200 rounded-full overflow-hidden">
                  <motion.div
                    className={`h-full bg-gradient-to-r ${getScoreGradient(category.score)}`}
                    initial={{ width: 0 }}
                    animate={{ width: `${category.score}%` }}
                    transition={{ duration: 1, delay: index * 0.1 }}
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-green-50 border border-green-200 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-green-900 mb-2">Strengths</h3>
            <ul className="space-y-2 text-green-800 text-sm">
              <li>• Strong cardiovascular health</li>
              <li>• Good respiratory function</li>
              <li>• Healthy vital signs</li>
            </ul>
          </div>

          <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-yellow-900 mb-2">Areas to Improve</h3>
            <ul className="space-y-2 text-yellow-800 text-sm">
              <li>• Metabolic health needs attention</li>
              <li>• Increase physical activity</li>
              <li>• Monitor diet quality</li>
            </ul>
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-blue-900 mb-2">Recommendations</h3>
            <ul className="space-y-2 text-blue-800 text-sm">
              <li>• Follow your health plan</li>
              <li>• Regular check-ups</li>
              <li>• Stay active and hydrated</li>
            </ul>
          </div>
        </div>
      </motion.div>
    </DashboardLayout>
  );
};

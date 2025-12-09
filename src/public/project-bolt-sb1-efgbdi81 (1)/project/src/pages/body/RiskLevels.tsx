import { DashboardLayout } from '../../components/DashboardLayout';
import { Activity, FileText, TrendingUp, Heart, AlertCircle, Calendar, Download, AlertTriangle, CheckCircle, XCircle } from 'lucide-react';
import { motion } from 'framer-motion';

export const RiskLevels = () => {
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

  const risks = [
    {
      category: 'Cardiovascular Disease',
      level: 'Low',
      percentage: 15,
      icon: <CheckCircle className="w-6 h-6" />,
      color: 'green',
      factors: ['Healthy blood pressure', 'Normal heart rate', 'Good cholesterol (assumed)'],
      recommendations: ['Maintain current lifestyle', 'Continue regular exercise'],
    },
    {
      category: 'Diabetes',
      level: 'Medium',
      percentage: 45,
      icon: <AlertTriangle className="w-6 h-6" />,
      color: 'yellow',
      factors: ['Slight metabolic concerns', 'BMI in moderate range'],
      recommendations: ['Monitor blood sugar', 'Reduce sugar intake', 'Increase physical activity'],
    },
    {
      category: 'Respiratory Issues',
      level: 'Low',
      percentage: 20,
      icon: <CheckCircle className="w-6 h-6" />,
      color: 'green',
      factors: ['Good lung function', 'No breathing difficulties'],
      recommendations: ['Avoid smoking', 'Maintain air quality'],
    },
  ];

  const getRiskColor = (level: string) => {
    switch (level) {
      case 'Low':
        return { bg: 'bg-green-50', border: 'border-green-200', text: 'text-green-700', gradient: 'from-green-500 to-emerald-500' };
      case 'Medium':
        return { bg: 'bg-yellow-50', border: 'border-yellow-200', text: 'text-yellow-700', gradient: 'from-yellow-500 to-orange-500' };
      case 'High':
        return { bg: 'bg-red-50', border: 'border-red-200', text: 'text-red-700', gradient: 'from-red-500 to-pink-500' };
      default:
        return { bg: 'bg-gray-50', border: 'border-gray-200', text: 'text-gray-700', gradient: 'from-gray-500 to-gray-600' };
    }
  };

  return (
    <DashboardLayout sidebarLinks={sidebarLinks}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-4xl font-bold text-gray-900 mb-2">Risk Level Assessment</h1>
        <p className="text-gray-600 mb-8">Understanding your health risks helps prevent future complications</p>

        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-white shadow-xl mb-8">
          <div className="flex items-center space-x-3 mb-4">
            <AlertCircle className="w-10 h-10" />
            <h2 className="text-3xl font-bold">Risk Analysis Overview</h2>
          </div>
          <p className="text-blue-100">
            Based on your health data, we've identified potential risk factors and provided actionable recommendations to improve your health outcomes.
          </p>
        </div>

        <div className="space-y-6">
          {risks.map((risk, index) => {
            const colors = getRiskColor(risk.level);
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.2 }}
                className={`bg-white rounded-xl p-6 shadow-lg border ${colors.border}`}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className={`p-3 rounded-lg ${colors.bg} ${colors.text}`}>
                      {risk.icon}
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-900">{risk.category}</h3>
                      <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium mt-1 ${colors.bg} ${colors.text}`}>
                        {risk.level} Risk
                      </span>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className={`text-3xl font-bold ${colors.text}`}>{risk.percentage}%</div>
                    <div className="text-gray-500 text-sm">Risk Score</div>
                  </div>
                </div>

                <div className="h-3 bg-gray-200 rounded-full overflow-hidden mb-6">
                  <motion.div
                    className={`h-full bg-gradient-to-r ${colors.gradient}`}
                    initial={{ width: 0 }}
                    animate={{ width: `${risk.percentage}%` }}
                    transition={{ duration: 1, delay: index * 0.2 }}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Contributing Factors:</h4>
                    <ul className="space-y-1 text-sm text-gray-600">
                      {risk.factors.map((factor, idx) => (
                        <li key={idx}>• {factor}</li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Recommendations:</h4>
                    <ul className="space-y-1 text-sm text-gray-600">
                      {risk.recommendations.map((rec, idx) => (
                        <li key={idx}>• {rec}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="mt-8 bg-blue-50 border border-blue-200 rounded-xl p-6"
        >
          <h3 className="text-lg font-semibold text-blue-900 mb-2">Important Note</h3>
          <p className="text-blue-800 text-sm">
            These risk assessments are AI-generated predictions based on your provided data. They should be used as guidance only.
            Always consult with healthcare professionals for accurate diagnosis and personalized treatment plans.
          </p>
        </motion.div>
      </motion.div>
    </DashboardLayout>
  );
};

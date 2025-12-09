import { DashboardLayout } from '../../components/DashboardLayout';
import { Activity, FileText, TrendingUp, Heart, AlertCircle, Calendar, Download, Printer, Share2 } from 'lucide-react';
import { motion } from 'framer-motion';

export const HealthReport = () => {
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

  const reportData = {
    date: new Date().toLocaleDateString(),
    overallScore: 78,
    metrics: [
      { label: 'Height', value: '170 cm' },
      { label: 'Weight', value: '70 kg' },
      { label: 'BMI', value: '24.2' },
      { label: 'Blood Pressure', value: '120/80 mmHg' },
      { label: 'Heart Rate', value: '72 bpm' },
      { label: 'Temperature', value: '37.2 °C' },
    ],
    risks: [
      { condition: 'Cardiovascular Disease', level: 'Low', percentage: 15 },
      { condition: 'Diabetes', level: 'Medium', percentage: 45 },
      { condition: 'Respiratory Issues', level: 'Low', percentage: 20 },
    ],
    recommendations: [
      'Maintain regular exercise routine',
      'Monitor blood sugar levels',
      'Continue balanced diet',
      'Stay well-hydrated',
      'Get 7-8 hours of sleep',
    ],
  };

  return (
    <DashboardLayout sidebarLinks={sidebarLinks}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold text-gray-900 mb-2">Final Health Report</h1>
            <p className="text-gray-600">Comprehensive summary of your health assessment</p>
          </div>
          <div className="flex space-x-3">
            <button className="flex items-center space-x-2 px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
              <Printer className="w-5 h-5 text-gray-600" />
              <span className="text-gray-700">Print</span>
            </button>
            <button className="flex items-center space-x-2 px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
              <Share2 className="w-5 h-5 text-gray-600" />
              <span className="text-gray-700">Share</span>
            </button>
            <button className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:shadow-lg transition-all">
              <Download className="w-5 h-5" />
              <span>Download PDF</span>
            </button>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-8 shadow-lg border-2 border-gray-200">
          <div className="border-b border-gray-200 pb-6 mb-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-2">Health Assessment Report</h2>
                <p className="text-gray-600">Generated on {reportData.date}</p>
              </div>
              <div className="text-right">
                <div className="text-5xl font-bold text-blue-600">{reportData.overallScore}</div>
                <div className="text-gray-500">Health Score</div>
              </div>
            </div>
          </div>

          <div className="space-y-8">
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Body Metrics</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {reportData.metrics.map((metric, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-gray-50 rounded-lg p-4 border border-gray-200"
                  >
                    <div className="text-sm text-gray-600 mb-1">{metric.label}</div>
                    <div className="text-xl font-bold text-gray-900">{metric.value}</div>
                  </motion.div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Risk Assessment</h3>
              <div className="space-y-3">
                {reportData.risks.map((risk, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-200"
                  >
                    <span className="font-medium text-gray-900">{risk.condition}</span>
                    <div className="flex items-center space-x-4">
                      <span className="text-gray-600">{risk.percentage}%</span>
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                        risk.level === 'Low'
                          ? 'bg-green-100 text-green-700'
                          : risk.level === 'Medium'
                          ? 'bg-yellow-100 text-yellow-700'
                          : 'bg-red-100 text-red-700'
                      }`}>
                        {risk.level} Risk
                      </span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">AI Recommendations</h3>
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                <ul className="space-y-2">
                  {reportData.recommendations.map((rec, index) => (
                    <motion.li
                      key={index}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-start space-x-3 text-gray-700"
                    >
                      <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                        <span className="text-white text-xs font-bold">{index + 1}</span>
                      </div>
                      <span>{rec}</span>
                    </motion.li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="border-t border-gray-200 pt-6">
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
                <h4 className="font-semibold text-yellow-900 mb-2 flex items-center space-x-2">
                  <AlertCircle className="w-5 h-5" />
                  <span>Medical Disclaimer</span>
                </h4>
                <p className="text-yellow-800 text-sm">
                  This report is generated by AI and should be used for informational purposes only.
                  It does not constitute medical advice, diagnosis, or treatment. Always consult with qualified healthcare
                  professionals for accurate diagnosis and personalized treatment plans.
                </p>
              </div>
            </div>

            <div className="text-center text-sm text-gray-500 pt-6 border-t border-gray-200">
              <p>© {new Date().getFullYear()} AI Healthcare Platform. All rights reserved.</p>
              <p className="mt-1">Report ID: AH-{Math.random().toString(36).substring(7).toUpperCase()}</p>
            </div>
          </div>
        </div>
      </motion.div>
    </DashboardLayout>
  );
};

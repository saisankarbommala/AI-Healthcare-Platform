import { TrendingUp, AlertCircle, Shield } from 'lucide-react';
import { FeaturePage } from '../../components/FeaturePage';

export function Prediction() {
  const riskFactors = [
    { factor: 'Cardiovascular Health', risk: 'Low', percentage: 15, color: 'green' },
    { factor: 'Diabetes', risk: 'Moderate', percentage: 45, color: 'yellow' },
    { factor: 'Respiratory Health', risk: 'Low', percentage: 20, color: 'green' },
  ];

  return (
    <FeaturePage
      icon={TrendingUp}
      title="AI Disease Prediction"
      description="Understand your health risk tendencies with AI-powered insights"
      gradient="from-blue-500 via-cyan-500 to-teal-500 dark:from-blue-900 dark:via-cyan-900 dark:to-teal-900"
    >
      <div className="max-w-4xl mx-auto">
        <div className="p-8 rounded-2xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 mb-8">
          <div className="flex items-start space-x-3">
            <AlertCircle className="w-6 h-6 text-amber-600 flex-shrink-0 mt-1" />
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Important Information</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                This tool identifies health risk tendencies based on your data. It does NOT diagnose diseases.
                Always consult healthcare professionals for medical decisions and diagnosis.
              </p>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          {riskFactors.map((item, index) => (
            <div key={index} className="p-6 rounded-2xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">{item.factor}</h3>
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                  item.color === 'green' ? 'bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400' :
                  item.color === 'yellow' ? 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-600 dark:text-yellow-400' :
                  'bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400'
                }`}>
                  {item.risk} Risk
                </span>
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-400">
                  <span>Risk Tendency</span>
                  <span>{item.percentage}%</span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                  <div
                    className={`h-2 rounded-full transition-all ${
                      item.color === 'green' ? 'bg-green-500' :
                      item.color === 'yellow' ? 'bg-yellow-500' :
                      'bg-red-500'
                    }`}
                    style={{ width: `${item.percentage}%` }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 p-8 rounded-2xl bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-950/30 dark:to-cyan-950/30 border border-blue-200 dark:border-blue-800">
          <div className="flex items-start space-x-3">
            <Shield className="w-6 h-6 text-blue-600 dark:text-cyan-400 flex-shrink-0 mt-1" />
            <div>
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                Prevention is Key
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Understanding risk tendencies helps you take preventive action. Regular checkups, healthy lifestyle,
                and professional medical guidance are essential for maintaining good health.
              </p>
            </div>
          </div>
        </div>
      </div>
    </FeaturePage>
  );
}

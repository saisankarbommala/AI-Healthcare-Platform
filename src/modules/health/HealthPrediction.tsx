import React from 'react';
import { motion } from 'framer-motion';
import { 
  HeartIcon, 
  TrendingUpIcon, 
  TrendingDownIcon,
  AlertTriangleIcon,
  CheckCircleIcon,
  DownloadIcon,
  Info
} from 'lucide-react';
import { jsPDF } from 'jspdf'; // *** Import jsPDF ***

// UPDATED: PhysicalPrediction interface (to match Vitals.tsx)
interface PhysicalPrediction {
    bmi: number;
    bmiCategory: string;
    generalHealthRisk: number; // New field
    likelyCondition: string; // New field
    overallStatus: string;
    recommendations: string[];
}

interface HealthData {
    age: number; gender: string; weight: number; height: number;
    heartRate: number; systolicBP: number; diastolicBP: number;
    physicalSymptoms: string[]; medicalHistory: string[];
}


interface HealthPredictionProps {
  prediction: PhysicalPrediction | null; 
  healthData: HealthData | null;
  theme: 'light' | 'dark';
}

const HealthPrediction: React.FC<HealthPredictionProps> = ({ prediction, healthData, theme }) => {
  if (!prediction || !healthData) {
    return (
      <div className={`text-center py-12 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
        <p>No prediction data available. Please complete the health form first.</p>
      </div>
    );
  }

  const getRiskLevel = (risk: number) => {
    if (risk < 30) return { level: 'Low', color: 'green', icon: CheckCircleIcon };
    if (risk < 70) return { level: 'Medium', color: 'yellow', icon: AlertTriangleIcon };
    return { level: 'High', color: 'red', icon: AlertTriangleIcon };
  };

  const RiskGauge: React.FC<{ value: number; label: string; color: string }> = ({ value, label, color }) => (
    <div className={`p-6 rounded-xl ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} shadow-lg`}>
      <h4 className={`font-semibold mb-4 ${theme === 'dark' ? 'text-white' : 'text-gray-800'}`}>
        {label}
      </h4>
      <div className="relative w-32 h-32 mx-auto">
        <svg className="w-32 h-32 transform -rotate-90" viewBox="0 0 100 100">
          <circle
            cx="50"
            cy="50"
            r="40"
            stroke={theme === 'dark' ? '#374151' : '#E5E7EB'}
            strokeWidth="8"
            fill="none"
          />
          <motion.circle
            cx="50"
            cy="50"
            r="40"
            stroke={color}
            strokeWidth="8"
            fill="none"
            strokeDasharray={`${(prediction.generalHealthRisk / 100) * 251.2} 251.2`}
            strokeLinecap="round"
            className="transition-all duration-1000 ease-out"
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className={`text-2xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-800'}`}>
            {Math.round(prediction.generalHealthRisk)}%
          </span>
        </div>
      </div>
      <div className="text-center mt-4">
        <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${
          value < 30 ? 'bg-green-100 text-green-800' :
          value < 70 ? 'bg-yellow-100 text-yellow-800' :
          'bg-red-100 text-red-800'
        }`}>
          {getRiskLevel(value).level} Risk
        </span>
      </div>
    </div>
  );

  /**
   * *** Implemented actual jsPDF logic for download ***
   */
  const downloadReport = () => {
    const doc = new jsPDF();
    let y = 20;

    // Header
    doc.setFontSize(18);
    doc.setTextColor(34, 34, 34); 
    doc.text('AI Health Assessment Report (General)', 105, y, { align: 'center' });
    y += 10;

    doc.setLineWidth(0.5);
    doc.line(10, y, 200, y); 
    y += 10;

    // Core Metrics (General Risk Focus)
    doc.setFontSize(14);
    doc.setTextColor(25, 25, 112); 
    doc.text('Core Health Metrics', 15, y);
    y += 8;

    doc.setFontSize(12);
    doc.setTextColor(50, 50, 50);
    doc.text(`BMI: ${prediction.bmi.toFixed(1)} (${prediction.bmiCategory})`, 15, y);
    y += 7;
    doc.text(`Overall Status: ${prediction.overallStatus}`, 15, y);
    y += 10;
    
    doc.setFontSize(14);
    doc.setTextColor(205, 92, 92); 
    doc.text('Prediction Result', 15, y);
    y += 8;
    
    doc.setFontSize(12);
    doc.setTextColor(50, 50, 50);
    // Only include General Health Risk and Predicted Condition
    doc.text(`General Health Risk Score: ${Math.round(prediction.generalHealthRisk)}%`, 15, y);
    y += 7;
    doc.text(`Likely Predicted Condition: ${prediction.likelyCondition}`, 15, y);
    y += 10;


    // Recommendations
    doc.setFontSize(14);
    doc.setTextColor(25, 25, 112);
    doc.text('AI Recommended Action Plan', 15, y);
    y += 8;

    doc.setFontSize(12);
    doc.setTextColor(50, 50, 50);
    prediction.recommendations.forEach((rec, index) => {
        if (y > 280) { 
            doc.addPage();
            y = 20;
        }
        doc.text(`${index + 1}. ${rec}`, 15, y, { maxWidth: 180 });
        y += 7;
    });
    y += 10;
    
    // Disclaimer (Required)
    if (y > 280) {
        doc.addPage();
        y = 20;
    }
    doc.setFontSize(10);
    doc.setTextColor(200, 0, 0); // Red
    doc.text('DISCLAIMER: This analysis is based on predictive modeling (AI Prediction) and is NOT real medical advice. Please consult a qualified healthcare professional for diagnosis or treatment. This is  based on prediction not real', 15, y, { maxWidth: 180 });
    
    doc.save('general_health_assessment.pdf');
  };

  // Simplified Voice Summary (Updated for General Risk)
  const playVoiceSummary = () => {
    const summary = `
      Physical Health Analysis Summary:
      BMI: ${prediction.bmi.toFixed(1)}, ${prediction.bmiCategory}.
      General Health Risk Score: ${Math.round(prediction.generalHealthRisk)}%.
      Likely Predicted Condition: ${prediction.likelyCondition}.
      Overall Status: ${prediction.overallStatus}.
    `;
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(summary);
      utterance.lang = 'en-US';
      window.speechSynthesis.speak(utterance);
    } else {
      console.log('Voice summary not supported in this browser. Text summary:', summary);
    }
  };

  return (
    <div className={`max-w-6xl mx-auto ${theme === 'dark' ? 'text-white' : 'text-gray-800'}`}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-3xl font-bold mb-2">Physical Health Analysis Results</h1>
        <p className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}>
          Comprehensive physical health predictions based on your assessment
        </p>
      </motion.div>

      {/* Overview Cards (Updated to show Likely Condition) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {/* BMI Card */}
        <motion.div
          className={`p-6 rounded-xl ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} shadow-lg`}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
        >
          <div className="flex items-center space-x-3 mb-4">
            <div className="p-2 bg-blue-100 rounded-lg">
              <HeartIcon className="w-6 h-6 text-blue-600" />
            </div>
            <h3 className="text-lg font-semibold">Body Mass Index (BMI)</h3>
          </div>
          <div className="space-y-2">
            <p className={`text-2xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-800'}`}>
              {prediction.bmi.toFixed(1)} ({prediction.bmiCategory})
            </p>
          </div>
        </motion.div>
        
        {/* Likely Condition Card */}
        <motion.div
            className={`p-6 rounded-xl ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} shadow-lg col-span-2`}
            initial={{ opacity: 0, x: 0 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
        >
            <div className="flex items-center space-x-3 mb-4">
                <div className="p-2 bg-purple-100 rounded-lg">
                    <Info className="w-6 h-6 text-purple-600" />
                </div>
                <h3 className="text-lg font-semibold">Likely Predicted Condition</h3>
            </div>
            <div className="space-y-2">
                <p className={`text-2xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-800'}`}>
                    {prediction.likelyCondition}
                </p>
                <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                    Overall Status: {prediction.overallStatus}
                </p>
            </div>
        </motion.div>
      </div>

      {/* Risk Gauges (Only General Risk) */}
      <motion.div
        className="mb-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <h2 className="text-2xl font-bold mb-6">General Risk Score</h2>
        <div className="grid place-items-center">
          <RiskGauge
            value={prediction.generalHealthRisk}
            label="General Health Risk Score"
            color={getRiskLevel(prediction.generalHealthRisk).color === 'red' ? '#EF4444' : getRiskLevel(prediction.generalHealthRisk).color === 'yellow' ? '#F97316' : '#06B6D4'}
          />
        </div>
      </motion.div>

      {/* Recommendations */}
      <motion.div
        className={`p-6 rounded-xl ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} shadow-lg mb-8`}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <h3 className="text-xl font-semibold mb-4">AI Recommendations</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {prediction.recommendations.map((recommendation, index) => (
            <div
              key={index}
              className={`flex items-start space-x-3 p-4 rounded-lg ${
                theme === 'dark' ? 'bg-gray-700' : 'bg-blue-50'
              }`}
            >
              <CheckCircleIcon className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
              <p className={theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}>
                {recommendation}
              </p>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Disclaimer and Actions */}
      <motion.div
        className="text-center mt-10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
      >
          <p className="text-sm text-red-600 font-semibold p-3 border border-red-200 bg-red-50 rounded-lg mx-auto max-w-lg">
            DISCLAIMER: This analysis is based on predictive modeling (AI Prediction) and is NOT real medical advice. Please consult a qualified healthcare professional for diagnosis or treatment. **This is  based on prediction not real**
          </p>
      </motion.div>

      <motion.div
        className="flex flex-wrap justify-center gap-4 mt-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
      >
        {/* DOWNLOAD BUTTON NOW EXECUTES jsPDF LOGIC */}
        <button
          className="flex items-center space-x-2 px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
          onClick={downloadReport}
        >
          <DownloadIcon className="w-5 h-5" />
          <span>Download Full Report (PDF)</span>
        </button>

        <button
          className={`flex items-center space-x-2 px-6 py-3 ${
            theme === 'dark' 
              ? 'bg-gray-700 hover:bg-gray-600 text-white' 
              : 'bg-gray-200 hover:bg-gray-300 text-gray-800'
          } font-semibold rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300`}
          onClick={playVoiceSummary}
        >
          <span>🔊</span>
          <span>Voice Summary</span>
        </button>
      </motion.div>
    </div>
  );
};

export default HealthPrediction;
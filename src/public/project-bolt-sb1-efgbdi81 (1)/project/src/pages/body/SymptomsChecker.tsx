import { useState } from 'react';
import { DashboardLayout } from '../../components/DashboardLayout';
import { Activity, FileText, TrendingUp, Heart, AlertCircle, Calendar, Download, Plus, X } from 'lucide-react';
import { motion } from 'framer-motion';

export const SymptomsChecker = () => {
  const [symptoms, setSymptoms] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState('');

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

  const commonSymptoms = [
    'Headache', 'Fever', 'Cough', 'Fatigue', 'Body Ache',
    'Sore Throat', 'Nausea', 'Dizziness', 'Shortness of Breath', 'Chest Pain'
  ];

  const addSymptom = (symptom: string) => {
    if (symptom && !symptoms.includes(symptom)) {
      setSymptoms([...symptoms, symptom]);
      setInputValue('');
    }
  };

  const removeSymptom = (symptom: string) => {
    setSymptoms(symptoms.filter(s => s !== symptom));
  };

  return (
    <DashboardLayout sidebarLinks={sidebarLinks}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-4xl font-bold text-gray-900 mb-2">Symptoms Checker</h1>
        <p className="text-gray-600 mb-8">Tell us about your symptoms for an initial assessment</p>

        <div className="bg-white rounded-2xl p-8 shadow-lg mb-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Add Your Symptoms</h2>

          <div className="flex gap-3 mb-6">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && addSymptom(inputValue)}
              placeholder="Type a symptom..."
              className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              onClick={() => addSymptom(inputValue)}
              className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:shadow-lg transition-all flex items-center space-x-2"
            >
              <Plus className="w-5 h-5" />
              <span>Add</span>
            </button>
          </div>

          {symptoms.length > 0 && (
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Your Symptoms:</h3>
              <div className="flex flex-wrap gap-2">
                {symptoms.map((symptom, index) => (
                  <motion.div
                    key={index}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="flex items-center space-x-2 bg-blue-50 text-blue-700 px-4 py-2 rounded-full border border-blue-200"
                  >
                    <span>{symptom}</span>
                    <button
                      onClick={() => removeSymptom(symptom)}
                      className="hover:bg-blue-100 rounded-full p-1 transition-colors"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </motion.div>
                ))}
              </div>
            </div>
          )}

          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Common Symptoms:</h3>
            <div className="flex flex-wrap gap-2">
              {commonSymptoms.map((symptom, index) => (
                <button
                  key={index}
                  onClick={() => addSymptom(symptom)}
                  disabled={symptoms.includes(symptom)}
                  className={`px-4 py-2 rounded-full border transition-all ${
                    symptoms.includes(symptom)
                      ? 'bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed'
                      : 'bg-white text-gray-700 border-gray-300 hover:border-blue-500 hover:bg-blue-50 hover:text-blue-600'
                  }`}
                >
                  {symptom}
                </button>
              ))}
            </div>
          </div>

          {symptoms.length > 0 && (
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="w-full py-4 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-lg font-semibold hover:shadow-xl hover:scale-105 transition-all duration-200"
            >
              Analyze Symptoms
            </motion.button>
          )}
        </div>

        {symptoms.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-yellow-50 border border-yellow-200 rounded-xl p-6"
          >
            <h3 className="text-lg font-semibold text-yellow-900 mb-2">Important Notice</h3>
            <p className="text-yellow-800 text-sm">
              This tool provides preliminary insights only. For proper diagnosis and treatment, please consult with a healthcare professional.
            </p>
          </motion.div>
        )}
      </motion.div>
    </DashboardLayout>
  );
};

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { HeartIcon, SendIcon } from 'lucide-react';
// Assuming the user has a types file, keeping the import structure clean
// import { HealthData } from '../../types'; 

// Define a minimal HealthData interface for this file based on Vitals.tsx changes
interface HealthData {
    age: number; gender: string; weight: number; height: number;
    heartRate: number; 
    bloodPressure: { systolic: number; diastolic: number; } | undefined;
    symptoms: string[];
    medicalHistory: string[];
}

interface HealthFormProps {
  onSubmit: (data: HealthData) => void;
  theme: 'light' | 'dark';
}

const HealthForm: React.FC<HealthFormProps> = ({ onSubmit, theme }) => {
  // Removed activeTab state, focusing only on physical health
  const [formData, setFormData] = useState<HealthData>({
    age: 25,
    gender: 'male',
    weight: 70,
    height: 170,
    // sleepHours and mood removed
    symptoms: [],
    heartRate: 72,
    bloodPressure: { systolic: 120, diastolic: 80 },
    medicalHistory: []
  });

  const physicalSymptoms = [
    'Fever', 'Headache', 'Cough', 'Shortness of breath', 'Chest pain',
    'Nausea', 'Vomiting', 'Diarrhea', 'Fatigue', 'Dizziness'
  ];

  // mentalSymptoms removed

  const medicalConditions = [
    'Diabetes', 'Hypertension', 'Heart disease', 'Asthma', 'Allergies',
    'Thyroid disorders', 'Kidney disease', 'Liver disease', 'Cancer', 'Arthritis'
  ];

  const handleSymptomToggle = (symptom: string) => {
    setFormData(prev => ({
      ...prev,
      symptoms: prev.symptoms.includes(symptom)
        ? prev.symptoms.filter(s => s !== symptom)
        : [...prev.symptoms, symptom]
    }));
  };

  const handleMedicalHistoryToggle = (condition: string) => {
    setFormData(prev => ({
      ...prev,
      medicalHistory: prev.medicalHistory.includes(condition)
        ? prev.medicalHistory.filter(c => c !== condition)
        : [...prev.medicalHistory, condition]
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className={`max-w-4xl mx-auto ${theme === 'dark' ? 'text-white' : 'text-gray-800'}`}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-3xl font-bold mb-2">Physical Health Screening Form</h1>
        <p className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}>
          Complete your physical health assessment for AI-powered insights
        </p>
      </motion.div>

      {/* Tab Navigation Removed - Only physical remains */}
      <div className="flex space-x-1 p-1 bg-blue-600 rounded-lg mb-8 shadow-lg">
        <div className="flex-1 flex items-center justify-center space-x-2 py-3 px-4 rounded-md bg-blue-500 text-white shadow-md">
            <HeartIcon className="w-5 h-5" />
            <span className="font-medium">Physical Health</span>
        </div>
        {/* Mental Health tab removed */}
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Basic Information */}
        <motion.div
          className={`p-6 rounded-xl ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} shadow-lg`}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <h3 className="text-xl font-semibold mb-4">Basic Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Age, Gender, Weight, Height inputs */}
            {/* ... (input implementation remains the same) */}
            <div><label className={`block text-sm font-medium mb-2 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>Age</label><input type="number" value={formData.age} onChange={(e) => setFormData({...formData, age: parseInt(e.target.value)})} className={`w-full px-3 py-2 rounded-lg border focus:ring-2 focus:ring-blue-500 ${theme === 'dark' ? 'bg-gray-700 border-gray-600 text-white' : 'bg-gray-50 border-gray-300'}`} min="1" max="120" required/></div>
            <div><label className={`block text-sm font-medium mb-2 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>Gender</label><select value={formData.gender} onChange={(e) => setFormData({...formData, gender: e.target.value as 'male' | 'female' | 'other'})} className={`w-full px-3 py-2 rounded-lg border focus:ring-2 focus:ring-blue-500 ${theme === 'dark' ? 'bg-gray-700 border-gray-600 text-white' : 'bg-gray-50 border-gray-300'}`} required><option value="male">Male</option><option value="female">Female</option><option value="other">Other</option></select></div>
            <div><label className={`block text-sm font-medium mb-2 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>Weight (kg)</label><input type="number" value={formData.weight} onChange={(e) => setFormData({...formData, weight: parseFloat(e.target.value)})} className={`w-full px-3 py-2 rounded-lg border focus:ring-2 focus:ring-blue-500 ${theme === 'dark' ? 'bg-gray-700 border-gray-600 text-white' : 'bg-gray-50 border-gray-300'}`} min="1" step="0.1" required/></div>
            <div><label className={`block text-sm font-medium mb-2 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>Height (cm)</label><input type="number" value={formData.height} onChange={(e) => setFormData({...formData, height: parseFloat(e.target.value)})} className={`w-full px-3 py-2 rounded-lg border focus:ring-2 focus:ring-blue-500 ${theme === 'dark' ? 'bg-gray-700 border-gray-600 text-white' : 'bg-gray-50 border-gray-300'}`} min="1" step="0.1" required/></div>
          </div>
        </motion.div>

        {/* Physical Health Details - No conditional rendering needed as Mental is removed */}
        <motion.div
          className={`p-6 rounded-xl ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} shadow-lg`}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <h3 className="text-xl font-semibold mb-4">Physical Health Details</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div><label className={`block text-sm font-medium mb-2 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>Heart Rate (bpm)</label><input type="number" value={formData.heartRate} onChange={(e) => setFormData({...formData, heartRate: parseInt(e.target.value)})} className={`w-full px-3 py-2 rounded-lg border focus:ring-2 focus:ring-blue-500 ${theme === 'dark' ? 'bg-gray-700 border-gray-600 text-white' : 'bg-gray-50 border-gray-300'}`} min="40" max="200"/></div>
            <div><label className={`block text-sm font-medium mb-2 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>Systolic BP</label><input type="number" value={formData.bloodPressure?.systolic} onChange={(e) => setFormData({...formData, bloodPressure: {...formData.bloodPressure!, systolic: parseInt(e.target.value)}})} className={`w-full px-3 py-2 rounded-lg border focus:ring-2 focus:ring-blue-500 ${theme === 'dark' ? 'bg-gray-700 border-gray-600 text-white' : 'bg-gray-50 border-gray-300'}`} min="70" max="250"/></div>
            <div><label className={`block text-sm font-medium mb-2 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>Diastolic BP</label><input type="number" value={formData.bloodPressure?.diastolic} onChange={(e) => setFormData({...formData, bloodPressure: {...formData.bloodPressure!, diastolic: parseInt(e.target.value)}})} className={`w-full px-3 py-2 rounded-lg border focus:ring-2 focus:ring-blue-500 ${theme === 'dark' ? 'bg-gray-700 border-gray-600 text-white' : 'bg-gray-50 border-gray-300'}`} min="40" max="150"/></div>
          </div>

          <div className="mb-6">
            <label className={`block text-sm font-medium mb-3 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>Physical Symptoms</label>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2">
              {physicalSymptoms.map((symptom) => (
                <label key={symptom} className={`flex items-center p-3 rounded-lg cursor-pointer transition-all ${
                  formData.symptoms.includes(symptom)
                    ? 'bg-blue-500 text-white'
                    : theme === 'dark'
                      ? 'bg-gray-700 hover:bg-gray-600 text-gray-300'
                      : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                }`}>
                  <input type="checkbox" checked={formData.symptoms.includes(symptom)} onChange={() => handleSymptomToggle(symptom)} className="sr-only"/>
                  <span className="text-sm font-medium">{symptom}</span>
                </label>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Mental Health Section Removed */}
        {/* {activeTab === 'mental' && (...) } */}

        {/* Medical History */}
        <motion.div
          className={`p-6 rounded-xl ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} shadow-lg`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h3 className="text-xl font-semibold mb-4">Medical History</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2">
            {medicalConditions.map((condition) => (
              <label
                key={condition}
                className={`flex items-center p-3 rounded-lg cursor-pointer transition-all ${
                  formData.medicalHistory.includes(condition)
                    ? 'bg-red-500 text-white'
                    : theme === 'dark'
                      ? 'bg-gray-700 hover:bg-gray-600 text-gray-300'
                      : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                }`}
              >
                <input type="checkbox" checked={formData.medicalHistory.includes(condition)} onChange={() => handleMedicalHistoryToggle(condition)} className="sr-only"/>
                <span className="text-sm font-medium">{condition}</span>
              </label>
            ))}
          </div>
        </motion.div>

        {/* Submit Button */}
        <motion.div
          className="flex justify-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <button
            type="submit"
            className="flex items-center space-x-2 px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
          >
            <SendIcon className="w-5 h-5" />
            <span>Run Health Analysis</span>
          </button>
        </motion.div>
      </form>
    </div>
  );
};

export default HealthForm;
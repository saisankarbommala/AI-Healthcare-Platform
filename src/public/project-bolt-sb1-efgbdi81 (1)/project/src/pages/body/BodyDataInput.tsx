import { useState } from 'react';
import { DashboardLayout } from '../../components/DashboardLayout';
import { Activity, FileText, TrendingUp, Heart, AlertCircle, Calendar, Download, Save } from 'lucide-react';
import { motion } from 'framer-motion';
import { supabase } from '../../lib/supabase';
import { useAuth } from '../../context/AuthContext';

export const BodyDataInput = () => {
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    height: '',
    weight: '',
    age: '',
    bloodPressure: '',
    heartRate: '',
    temperature: '',
  });
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

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

  const handleSave = async () => {
    setSaving(true);
    try {
      const { error } = await supabase.from('body_health_data').insert({
        user_id: user?.id,
        height: parseFloat(formData.height),
        weight: parseFloat(formData.weight),
        age: parseInt(formData.age),
        blood_pressure: formData.bloodPressure,
        heart_rate: parseInt(formData.heartRate),
        temperature: parseFloat(formData.temperature),
      });

      if (error) throw error;
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } catch (error) {
      console.error('Error saving data:', error);
    } finally {
      setSaving(false);
    }
  };

  const fields = [
    { label: 'Height (cm)', name: 'height', type: 'number', placeholder: '170', unit: 'cm' },
    { label: 'Weight (kg)', name: 'weight', type: 'number', placeholder: '70', unit: 'kg' },
    { label: 'Age (years)', name: 'age', type: 'number', placeholder: '30', unit: 'years' },
    { label: 'Blood Pressure', name: 'bloodPressure', type: 'text', placeholder: '120/80', unit: 'mmHg' },
    { label: 'Heart Rate (bpm)', name: 'heartRate', type: 'number', placeholder: '72', unit: 'bpm' },
    { label: 'Temperature (°C)', name: 'temperature', type: 'number', placeholder: '37', unit: '°C', step: '0.1' },
  ];

  return (
    <DashboardLayout sidebarLinks={sidebarLinks}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-4xl font-bold text-gray-900 mb-2">Body Data Input</h1>
        <p className="text-gray-600 mb-8">Enter your physical health measurements for analysis</p>

        <div className="bg-white rounded-2xl p-8 shadow-lg">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Your Body Metrics</h2>

          {saved && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-6 bg-green-50 border border-green-200 text-green-800 px-4 py-3 rounded-lg"
            >
              Data saved successfully!
            </motion.div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {fields.map((field, index) => (
              <motion.div
                key={field.name}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {field.label}
                </label>
                <div className="relative">
                  <input
                    type={field.type}
                    step={field.step}
                    value={formData[field.name as keyof typeof formData]}
                    onChange={(e) => setFormData({ ...formData, [field.name]: e.target.value })}
                    placeholder={field.placeholder}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 pr-16"
                  />
                  <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 text-sm">
                    {field.unit}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>

          <button
            onClick={handleSave}
            disabled={saving}
            className="w-full py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-semibold hover:shadow-xl hover:scale-105 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
          >
            <Save className="w-5 h-5" />
            <span>{saving ? 'Saving...' : 'Save Data'}</span>
          </button>
        </div>

        <div className="mt-6 bg-blue-50 border border-blue-200 rounded-xl p-6">
          <h3 className="text-lg font-semibold text-blue-900 mb-2">Tip</h3>
          <p className="text-blue-800 text-sm">
            For accurate results, measure your vitals at the same time each day, preferably in the morning before eating or exercising.
          </p>
        </div>
      </motion.div>
    </DashboardLayout>
  );
};

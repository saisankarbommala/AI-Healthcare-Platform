import React, { useState } from 'react';
import { 
    Activity, Heart, Thermometer, Check, User, Scale, Maximize, 
    TrendingUp, Zap, Loader2, ChevronLeft, Info, TrendingDown
} from 'lucide-react';
import { motion } from 'framer-motion';
import { jsPDF } from 'jspdf'; // *** NEW: Import jsPDF ***

// NOTE: Ee FeaturePage path correct ga undho chusukondi
import { FeaturePage } from '../../components/FeaturePage'; 

// --- INTERFACES & MOCK DATA (ONLY PHYSICAL HEALTH) ---
interface HealthData {
    age: number; gender: string; weight: number; height: number;
    heartRate: number; systolicBP: number; diastolicBP: number;
    physicalSymptoms: string[]; medicalHistory: string[];
}

// UPDATED: Replaced specific risks with general risk and likely condition
interface HealthPredictionType {
    bmi: string;
    overallStatus: string;
    generalHealthRisk: number; // New field for general risk
    likelyCondition: string; // New field for the predicted condition
    recommendations: string[];
}

const initialHealthData: HealthData = {
    age: 25, gender: 'Male', weight: 70, height: 170,
    heartRate: 72, systolicBP: 120, diastolicBP: 80,
    physicalSymptoms: [], medicalHistory: [],
};

// --- HELPER COMPONENTS ---

/**
 * Renders a circular progress bar with risk level text.
 */
const RiskGauge = ({ value, label }: { value: number, label: string }) => {
    let color, strokeColor, riskText, colorClass;
    
    // Logic for General Health Risk
    const isHighRisk = value >= 75;
    const isMediumRisk = value >= 40 && value < 75;
    
    color = isHighRisk ? 'text-red-600' : isMediumRisk ? 'text-orange-500' : 'text-cyan-500';
    strokeColor = isHighRisk ? 'stroke-red-600' : isMediumRisk ? 'stroke-orange-500' : 'stroke-cyan-500';
    colorClass = isHighRisk ? 'bg-red-100/50 text-red-700' : isMediumRisk ? 'bg-orange-100/50 text-orange-700' : 'bg-cyan-100/50 text-cyan-700';
    riskText = isHighRisk ? 'High Risk' : isMediumRisk ? 'Medium Risk' : 'Low Risk';
    
    const circumference = 2 * Math.PI * 45;
    const strokeDashoffset = circumference - (value / 100) * circumference;

    return (
        <motion.div 
            className="flex flex-col items-center p-4 bg-white border border-gray-200 rounded-xl shadow-lg transition-all duration-300 hover:shadow-xl"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: "spring", stiffness: 300, damping: 24 }}
        >
            <div className="text-lg font-semibold text-gray-800 mb-4 text-center">{label}</div>
            <div className="relative w-36 h-36">
                <svg className="w-full h-full transform -rotate-90">
                    <circle 
                        className="text-gray-200" 
                        strokeWidth="8" 
                        stroke="currentColor" 
                        fill="transparent" 
                        r="45" 
                        cx="72" 
                        cy="72"
                    />
                    <motion.circle 
                        className={`${strokeColor}`} 
                        strokeWidth="8" 
                        strokeDasharray={circumference} 
                        strokeLinecap="round" 
                        fill="transparent" 
                        r="45" 
                        cx="72" 
                        cy="72"
                        initial={{ strokeDashoffset: circumference }}
                        animate={{ strokeDashoffset: strokeDashoffset }}
                        transition={{ duration: 1.5, ease: "easeOut" }}
                    />
                </svg>
                <div className="absolute top-0 left-0 w-full h-full flex flex-col items-center justify-center">
                    <span className={`text-4xl font-bold ${color} transition-colors duration-500`}>{value}%</span>
                    <span className={`mt-1 px-3 py-1 text-xs font-semibold rounded-full ${colorClass}`}>
                        {riskText}
                    </span>
                </div>
            </div>
        </motion.div>
    );
};

const SymptomButton = ({ label, isSelected, onClick }: { label: string, isSelected: boolean, onClick: () => void }) => (
    <button
        type="button"
        onClick={onClick}
        className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 hover:scale-[1.03] shadow-md ${
            isSelected ? 'bg-indigo-600 text-white shadow-indigo-400/50' : 'bg-gray-100 text-gray-700 hover:bg-indigo-50 border border-gray-300'
        }`}
    >
        {label}
    </button>
);

const HealthInputForm = ({ data, setData, onAnalyze }: { data: HealthData, setData: React.Dispatch<React.SetStateAction<HealthData>>, onAnalyze: () => void }) => {
    
    const handleInputChange = (field: keyof HealthData, value: string) => {
        const numValue = ['age', 'weight', 'height', 'heartRate', 'systolicBP', 'diastolicBP'].includes(field) ? Number(value) : value;
        setData(prev => ({ ...prev, [field]: numValue } as HealthData));
    };

    const handleToggleArray = (field: 'physicalSymptoms' | 'medicalHistory', item: string) => {
        setData(prev => {
            const currentArray = prev[field];
            const newArray = currentArray.includes(item)
                ? currentArray.filter(i => i !== item)
                : [...currentArray, item];
            return { ...prev, [field]: newArray } as HealthData;
        });
    };

    const symptoms = ['Fever', 'Headache', 'Cough', 'Shortness of breath', 'Chest pain', 'Nausea', 'Vomiting', 'Diarrhea', 'Fatigue', 'Dizziness'];
    const medicalHistory = ['Diabetes', 'Hypertension', 'Heart disease', 'Asthma', 'Allergies', 'Thyroid disorders', 'Kidney disease', 'Liver disease', 'Cancer', 'Arthritis'];

    return (
        <motion.div 
            className="p-8 lg:p-10 bg-white shadow-2xl rounded-3xl border border-gray-100"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
        >
            <div className="flex justify-start space-x-4 mb-8 border-b pb-4">
                <div className="flex items-center space-x-2 px-6 py-3 bg-blue-600 text-white font-semibold rounded-xl shadow-lg">
                    <Heart className="w-5 h-5" />
                    <span>Physical Health Assessment</span>
                </div>
            </div>

            <h2 className="text-xl font-bold text-gray-800 mb-4 border-b pb-2 flex items-center"><User className="w-5 h-5 mr-2 text-indigo-500"/> Personal & BMI Data</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                {['age', 'gender', 'weight', 'height'].map((field) => (
                    <div key={field}>
                        <label className="block text-sm font-medium text-gray-700 capitalize">{field} ({field === 'weight' ? 'kg' : field === 'height' ? 'cm' : ''})</label>
                        {field === 'gender' ? (
                            <select value={data.gender} onChange={(e) => handleInputChange('gender', e.target.value)} className="mt-1 w-full p-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 shadow-sm"><option>Male</option><option>Female</option><option>Other</option></select>
                        ) : (
                            <input type="number" value={data[field as keyof HealthData] as number} onChange={(e) => handleInputChange(field as keyof HealthData, e.target.value)} className="mt-1 w-full p-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 shadow-sm" />
                        )}
                    </div>
                ))}
            </div>

            <h2 className="text-xl font-bold text-gray-800 mb-4 border-b pb-2 flex items-center"><Activity className="w-5 h-5 mr-2 text-indigo-500"/> Vital Measurements</h2>
            <div className="grid grid-cols-3 gap-4 mb-6">
                <div><label className="block text-sm font-medium text-gray-700">Heart Rate (bpm)</label><input type="number" value={data.heartRate} onChange={(e) => handleInputChange('heartRate', e.target.value)} className="mt-1 w-full p-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500" /></div>
                <div><label className="block text-sm font-medium text-gray-700">Systolic BP</label><input type="number" value={data.systolicBP} onChange={(e) => handleInputChange('systolicBP', e.target.value)} className="mt-1 w-full p-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500" /></div>
                <div><label className="block text-sm font-medium text-gray-700">Diastolic BP</label><input type="number" value={data.diastolicBP} onChange={(e) => handleInputChange('diastolicBP', e.target.value)} className="mt-1 w-full p-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500" /></div>
            </div>

            <h3 className="text-lg font-bold text-gray-800 mb-3 mt-8 border-b pb-2 flex items-center"><Info className="w-5 h-5 mr-2 text-indigo-500"/> Current Physical Symptoms</h3>
            <div className="flex flex-wrap gap-3 mb-8">
                {symptoms.map(s => (<SymptomButton key={s} label={s} isSelected={data.physicalSymptoms.includes(s)} onClick={() => handleToggleArray('physicalSymptoms', s)} />))}
            </div>

            <h2 className="text-xl font-bold text-gray-800 mb-4 border-b pb-2 flex items-center"><Heart className="w-5 h-5 mr-2 text-indigo-500"/> Past Medical History</h2>
            <div className="flex flex-wrap gap-3 mb-10">
                {medicalHistory.map(h => (<SymptomButton key={h} label={h} isSelected={data.medicalHistory.includes(h)} onClick={() => handleToggleArray('medicalHistory', h)} />))}
            </div>

            <div className="flex justify-center">
                <button
                    onClick={onAnalyze}
                    className="flex items-center space-x-2 px-10 py-4 bg-gradient-to-r from-blue-600 to-purple-700 text-white font-bold rounded-full shadow-2xl shadow-purple-400/50 hover:from-blue-700 hover:to-purple-800 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
                >
                    <Zap className="w-5 h-5" />
                    <span>Run Health Analysis</span>
                </button>
            </div>
        </motion.div>
    );
};

/**
 * Analysis Results Display (Updated for General Risk)
 */
const AnalysisResultsDisplay = ({ results, onClose }: { results: HealthPredictionType, onClose: () => void }) => {
    
    const playVoiceSummary = () => {
        const summary = `
            Physical Health Analysis Summary:
            BMI: ${results.bmi}.
            General Health Risk Score: ${Math.round(results.generalHealthRisk)}%.
            Likely Predicted Condition: ${results.likelyCondition}.
            Overall Status: ${results.overallStatus}. Please review recommendations.
        `;
        if ('speechSynthesis' in window) {
            const utterance = new SpeechSynthesisUtterance(summary);
            utterance.lang = 'en-US';
            window.speechSynthesis.speak(utterance);
        } else {
            alert('Voice summary not supported in this browser.');
        }
    };
    
    /**
     * *** UPDATED: Implemented actual jsPDF logic for download ***
     */
    const downloadReport = () => {
        const doc = new jsPDF();
        let y = 20;

        // Header
        doc.setFontSize(18);
        doc.setTextColor(34, 34, 34); // Dark Gray
        doc.text('AI Health Assessment Report (General)', 105, y, { align: 'center' });
        y += 10;

        doc.setLineWidth(0.5);
        doc.line(10, y, 200, y); // Separator line
        y += 10;

        // Core Metrics (General Risk Focus)
        doc.setFontSize(14);
        doc.setTextColor(25, 25, 112); // Medium Blue
        doc.text('Core Health Metrics', 15, y);
        y += 8;

        doc.setFontSize(12);
        doc.setTextColor(50, 50, 50);
        doc.text(`BMI: ${results.bmi}`, 15, y);
        y += 7;
        doc.text(`Overall Status: ${results.overallStatus}`, 15, y);
        y += 10;
        
        doc.setFontSize(14);
        doc.setTextColor(205, 92, 92); // Light Red for Risk
        doc.text('Prediction Result', 15, y);
        y += 8;
        
        doc.setFontSize(12);
        doc.setTextColor(50, 50, 50);
        // Only include General Health Risk and Predicted Condition
        doc.text(`General Health Risk Score: ${Math.round(results.generalHealthRisk)}%`, 15, y);
        y += 7;
        doc.text(`Likely Predicted Condition: ${results.likelyCondition}`, 15, y);
        y += 10;


        // Recommendations
        doc.setFontSize(14);
        doc.setTextColor(25, 25, 112);
        doc.text('AI Recommended Action Plan', 15, y);
        y += 8;

        doc.setFontSize(12);
        doc.setTextColor(50, 50, 50);
        results.recommendations.forEach((rec: string, index: number) => {
            if (y > 280) { // Page break check
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
        doc.text('DISCLAIMER: This analysis is based on predictive modeling (AI Prediction) and is NOT real medical advice. Please consult a qualified healthcare professional for diagnosis or treatment. This is based on prediction not real', 15, y, { maxWidth: 180 });
        
        doc.save('general_health_assessment.pdf');
    };
    
    const { bmi, overallStatus, generalHealthRisk, likelyCondition, recommendations } = results;
    
    const statusColor = overallStatus.includes('Critical') ? 'text-red-600' : overallStatus.includes('Needs') ? 'text-orange-500' : 'text-green-600';
    const trendIcon = overallStatus.includes('Critical') || overallStatus.includes('Needs') ? TrendingDown : TrendingUp;

    return (
        <motion.div 
            className="p-8 lg:p-10 bg-white shadow-2xl rounded-3xl border border-gray-100"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
        >
            <h1 className="text-3xl font-extrabold text-gray-800 mb-2 border-b pb-2">Physical Health Analysis Results</h1>
            <p className="text-gray-500 mb-8 font-medium">Comprehensive physical risk predictions based on your current assessment.</p>

            {/* Overview Cards (Updated to show Likely Predicted Condition) */}
            <div className="grid md:grid-cols-3 gap-6 mb-10">
                <motion.div className="p-6 bg-blue-50 border border-blue-200 rounded-xl hover:scale-[1.02] transition-all duration-300 shadow-md">
                    <div className="flex items-center text-blue-600 mb-3"><Activity className="w-6 h-6 mr-2" /><span className="font-bold text-lg">Body Mass Index (BMI)</span></div>
                    <p className="text-3xl font-extrabold text-gray-900 mb-1">{bmi}</p>
                    <p className="text-md text-gray-600">Category: <span className="font-bold">{bmi.split('(')[1].replace(')', '')}</span></p>
                </motion.div>
                
                <motion.div className="p-6 bg-purple-50 border border-purple-200 rounded-xl hover:scale-[1.02] transition-all duration-300 shadow-md col-span-2">
                    <div className="flex items-center text-purple-600 mb-3"><Info className="w-6 h-6 mr-2" /><span className="font-bold text-lg">Likely Predicted Condition</span></div>
                    <p className="text-3xl font-extrabold text-gray-900 mb-1">{likelyCondition}</p>
                    <p className="text-md text-gray-600">Based on Vitals, Symptoms, and History</p>
                </motion.div>
            </div>

            {/* Risk Assessment (Only General Risk) */}
            <h2 className="text-2xl font-bold text-gray-800 mb-6 border-b pb-2 flex items-center"><Thermometer className="w-5 h-5 mr-2 text-indigo-500"/> Core Physical Risk Assessment</h2>
            <div className="grid place-items-center mb-10"> 
                {/* Only one RiskGauge now */}
                <RiskGauge key="general" value={generalHealthRisk} label="General Health Risk Score" />
            </div>

            {/* AI Recommendations */}
            <h2 className="text-2xl font-bold text-gray-800 mb-6 border-b pb-2 flex items-center"><Check className="w-5 h-5 mr-2 text-indigo-500"/> Personalized AI Action Plan</h2>
            <div className="grid md:grid-cols-2 gap-4 mb-10">
                {recommendations.map((rec: string, index: number) => (
                    <motion.div 
                        key={index} 
                        className="flex items-start space-x-3 p-4 bg-green-50 rounded-xl hover:bg-green-100 border border-green-200 shadow-sm transition-colors duration-300"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                    >
                        <Check className="w-5 h-5 text-green-600 mt-1 flex-shrink-0" />
                        <span className="text-gray-700 font-medium text-md">{rec}</span>
                    </motion.div>
                ))}
            </div>

            {/* Actions */}
            <div className="flex justify-center space-x-6">
                <button
                    onClick={downloadReport} // *** CALLS NEW jsPDF FUNCTION ***
                    className="flex items-center space-x-3 px-8 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-xl shadow-blue-400/50 hover:bg-blue-700 transition-all duration-300 hover:scale-[1.03]"
                >
                    <Scale className="w-5 h-5" />
                    <span>Download Full Report (PDF)</span>
                </button>
                <button 
                    onClick={playVoiceSummary}
                    className="flex items-center space-x-3 px-8 py-3 border-2 border-indigo-300 text-indigo-700 font-semibold rounded-lg hover:bg-indigo-50 transition-all duration-200 hover:scale-[1.03]"
                >
                    <Maximize className="w-5 h-5" />
                    <span>Voice Summary</span>
                </button>
            </div>
            
            <div className="mt-10 text-center">
                {/* *** REQUIRED DISCLAIMER *** */}
                <p className="text-sm text-red-600 font-semibold p-3 border border-red-200 bg-red-50 rounded-lg">
                    DISCLAIMER: This analysis is based on predictive modeling (AI Prediction) and is NOT real medical advice. Please consult a qualified healthcare professional for diagnosis or treatment. **This is  based on prediction not real**
                </p>
                {/* ************************************** */}
                
                <button onClick={onClose} className="text-indigo-600 hover:text-indigo-800 font-bold text-lg flex items-center mx-auto transition-colors duration-200 hover:underline mt-4">
                    <ChevronLeft className="w-5 h-5 mr-1" />
                    Go Back to Assessment
                </button>
            </div>
        </motion.div>
    );
};


// --- MAIN VITALS COMPONENT (UPDATED LOGIC) ---

export function Vitals() {
    const [data, setData] = useState<HealthData>(initialHealthData);
    const [showResults, setShowResults] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [results, setResults] = useState<HealthPredictionType>({} as HealthPredictionType);

    const handleRunAnalysis = () => {
        setIsLoading(true);

        // --- ENHANCED PHYSICAL MOCK CALCULATION LOGIC (General Prediction) ---
        const { age, weight, height, systolicBP, diastolicBP, physicalSymptoms, medicalHistory } = data;
        
        const heightMeters = height / 100;
        const bmiValue = weight / (heightMeters * heightMeters);
        
        let bmiCategory = 'Normal';
        if (bmiValue >= 30) { bmiCategory = 'Obese'; }
        else if (bmiValue >= 25) { bmiCategory = 'Overweight'; }
        else if (bmiValue < 18.5) { bmiCategory = 'Underweight'; }

        // 1. General Health Risk Calculation (0-99%)
        let generalRiskFactor = 0;
        let likelyCondition = "No major immediate concerns found.";

        // --- Factor A: Vitals and BMI ---
        if (bmiValue >= 30) generalRiskFactor += 25;
        else if (bmiValue >= 25) generalRiskFactor += 10;

        // BP Factor 
        if (systolicBP >= 160 || diastolicBP >= 100) {
            generalRiskFactor += 40;
            likelyCondition = "Severe Hypertension Watch (Stage 3)";
        } else if (systolicBP >= 140 || diastolicBP >= 90) {
            generalRiskFactor += 25;
            if (likelyCondition === "No major immediate concerns found.") likelyCondition = "Elevated Blood Pressure Risk (Stage 2)";
        } else if (systolicBP > 120 || diastolicBP > 80) {
            generalRiskFactor += 10;
        }

        // Age Factor 
        if (age > 65) generalRiskFactor += 20;
        else if (age > 40) generalRiskFactor += 10;

        // --- Factor B: Symptoms & History ---
        if (physicalSymptoms.includes('Chest pain') || physicalSymptoms.includes('Shortness of breath')) {
            generalRiskFactor += 35; // Critical Symptom
            if (likelyCondition === "No major immediate concerns found." || likelyCondition.includes('Elevated Blood Pressure')) {
                 likelyCondition = "URGENT: Possible Cardiac or Respiratory Concern";
            }
        } else if (physicalSymptoms.includes('Fever') || physicalSymptoms.includes('Cough')) {
            generalRiskFactor += 15;
            if (likelyCondition === "No major immediate concerns found.") likelyCondition = "Possible Respiratory Infection (Flu/Cold)";
        } else if (physicalSymptoms.includes('Nausea') || physicalSymptoms.includes('Diarrhea')) {
            generalRiskFactor += 10;
            if (likelyCondition === "No major immediate concerns found.") likelyCondition = "Gastrointestinal Distress";
        } else if (physicalSymptoms.includes('Fatigue') || physicalSymptoms.includes('Dizziness')) {
            generalRiskFactor += 5;
            if (likelyCondition === "No major immediate concerns found.") likelyCondition = "General Fatigue/Lifestyle Review Needed";
        }

        if (medicalHistory.length > 0) generalRiskFactor += 10;

        const newGeneralHealthRisk = Math.min(99, Math.max(5, 5 + generalRiskFactor)); // Base risk 5

        // 3. Overall Status Determination
        let overallStatus = 'Healthy';
        if (newGeneralHealthRisk > 85) overallStatus = 'Critical Attention';
        else if (newGeneralHealthRisk > 65) overallStatus = 'Needs Attention';
        else if (newGeneralHealthRisk > 40) overallStatus = 'Monitor Closely';
        
        // 4. Recommendations
        let updatedRecommendations = [
            'Maintain regular exercise routine (at least 30 mins daily).',
            'Focus on a whole-food, low-sugar, high-fiber diet.',
            'Monitor Blood Pressure and Heart Rate regularly.',
            'Schedule a general physical check-up with your primary care physician.',
        ];
        
        if (newGeneralHealthRisk > 70) updatedRecommendations.unshift(`URGENT: Consult a specialist based on the prediction: "${likelyCondition}".`);
        if (likelyCondition.includes('Hypertension')) updatedRecommendations.unshift('Focus on low-sodium intake and stress reduction to manage blood pressure.');
        if (bmiValue >= 30) updatedRecommendations.unshift('Prioritize weight loss: Consult a nutritionist/dietitian for a managed plan.');
        
        updatedRecommendations = Array.from(new Set(updatedRecommendations));

        const updatedResults: HealthPredictionType = {
            bmi: `${parseFloat(bmiValue.toFixed(1))} (${bmiCategory})`,
            overallStatus: overallStatus,
            generalHealthRisk: newGeneralHealthRisk,
            likelyCondition: likelyCondition,
            recommendations: updatedRecommendations,
        };
        // --- END DYNAMIC MOCK CALCULATION ---


        // Simulate processing delay
        setTimeout(() => {
            setResults(updatedResults); 
            setIsLoading(false);
            setShowResults(true); 
        }, 2000); // 2 seconds delay for a more realistic feel
    };
    
    const handleCloseResults = () => {
        setShowResults(false);
    }
    
    // Conditionally render Loading, Form, or Results
    const renderContent = () => {
        if (isLoading) {
            return (
                <div className="h-96 flex flex-col items-center justify-center bg-white shadow-xl rounded-2xl animate-pulse bg-gradient-to-br from-indigo-50 to-blue-50">
                    <Loader2 className="w-16 h-16 text-indigo-600 animate-spin mb-6" />
                    <p className="text-2xl font-extrabold text-gray-800">Running AI Health Analysis...</p>
                    <p className="text-md text-gray-500 mt-2">Processing {data.age} years old physical data.</p>
                </div>
            );
        }
        
        if (showResults) {
            return <AnalysisResultsDisplay key={JSON.stringify(results)} results={results} onClose={handleCloseResults} />;
        }
        
        return <HealthInputForm data={data} setData={setData} onAnalyze={handleRunAnalysis} />;
    }

    return (
        <FeaturePage
            icon={Zap}
            title="Physical Health Assessment"
            description="Enter your vitals and history for an instant, AI-powered physical health risk analysis."
            gradient="from-blue-700 via-indigo-700 to-purple-600 dark:from-blue-900 dark:via-indigo-900 dark:to-purple-900"
        >
            <div className="max-w-4xl mx-auto mb-4"> 
                {renderContent()}
            </div>
            
            {/* The Device Connection section is kept as per the original file structure (if exists) */}
        </FeaturePage>
    );
}
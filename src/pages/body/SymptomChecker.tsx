import React, { useState } from 'react';
import { 
    Stethoscope, AlertCircle, Loader2, Zap, Check, Wind, AlertTriangle, 
    DownloadIcon, RefreshCw 
} from 'lucide-react';
import { motion } from 'framer-motion';
import { jsPDF } from 'jspdf';
import { FeaturePage } from '../../components/FeaturePage'; // Ensure this path is correct

// --- CONFIGURATION ---
const GEMINI_API_KEY=import.meta.env.VITE_GEMINI_API_KEY; // User provided key

// --- INTERFACES ---
interface AIDiagnosis {
    diagnosis: string;
    treatment: string[];
    precautions: string[];
    summarySymptoms: string;
    overallStatus: 'Critical Attention' | 'Needs Attention' | 'Monitor Closely' | 'Healthy';
}

const initialDiagnosis: AIDiagnosis = {
    diagnosis: '',
    treatment: [],
    precautions: [],
    summarySymptoms: '',
    overallStatus: 'Monitor Closely',
};

// --- API FUNCTION (LIVE CALL TO GEMINI 3.0 PRO) ---
const fetchDiagnosisFromAI = async (symptomText: string): Promise<AIDiagnosis> => {
    // 1. Construct the Prompt
    const prompt = `
        User Symptoms: "${symptomText}".
        
        Act as a medical AI assistant. Analyze the symptoms above, focusing ONLY on physical health.
        Provide a response in strict JSON format. Do not include markdown formatting (like \`\`\`json).
        
        The JSON structure must be:
        {
            "diagnosis": "Likely Medical Condition based on symptoms",
            "treatment": ["Action step 1", "Action step 2", "Action step 3"],
            "precautions": ["Precaution 1", "Precaution 2"],
            "summarySymptoms": "A concise summary of the reported symptoms",
            "overallStatus": "Select one exactly: 'Critical Attention', 'Needs Attention', 'Monitor Closely', or 'Healthy'"
        }
    `;

    // 2. Gemini 3.0 Pro API Endpoint (v1beta)
    const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${GEMINI_API_KEY}`;

    try {
        const response = await fetch(API_URL, { 
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                contents: [{ role: "user", parts: [{ text: prompt }] }],
                generationConfig: {
                    responseMimeType: "application/json", // Force JSON output
                    temperature: 0.7 
                }
            }),
        });
        
        const result = await response.json();

        // Safety check for valid response
        if (!result.candidates || result.candidates.length === 0 || !result.candidates[0].content) {
            console.error("AI API Error:", result);
            throw new Error("Invalid response from AI service.");
        }
        
        // Parse the JSON string
        const jsonString = result.candidates[0].content.parts[0].text.trim();
        return JSON.parse(jsonString) as AIDiagnosis; 

    } catch (error) {
        console.error("API Call Failed:", error);
        throw new Error("Failed to connect to AI service. Please check your internet connection.");
    }
};

// --- HELPER COMPONENTS ---

const StatusIndicator = ({ status }: { status: string }) => {
    let colorClass, icon: React.ElementType;
    
    if (status.includes('Critical')) {
        colorClass = 'bg-red-100 border-red-300 text-red-700';
        icon = AlertCircle;
    } else if (status.includes('Needs')) {
        colorClass = 'bg-orange-100 border-orange-300 text-orange-700';
        icon = AlertTriangle;
    } else {
        colorClass = 'bg-green-100 border-green-300 text-green-700';
        icon = Check;
    }

    const IconComponent = icon;

    return (
        <div className={`flex items-center space-x-2 p-3 rounded-xl shadow-sm border ${colorClass}`}>
            <IconComponent className="w-5 h-5 flex-shrink-0" />
            <span className="text-sm font-bold">{status}</span>
        </div>
    );
};

// --- RESULTS DISPLAY COMPONENT ---
const AnalysisResultsDisplay = ({ results, onReset }: { results: AIDiagnosis, onReset: () => void }) => {
    
    const downloadReport = () => {
        const doc = new jsPDF();
        let y = 20;

        doc.setFontSize(18);
        doc.text('AI Symptom Analysis Report', 105, y, { align: 'center' });
        y += 10;
        doc.line(10, y, 200, y);
        y += 10;

        // Diagnosis
        doc.setFontSize(14);
        doc.setTextColor(0, 0, 128);
        doc.text('1. Diagnosis & Status', 15, y);
        y += 8;
        doc.setFontSize(12);
        doc.setTextColor(0, 0, 0);
        doc.text(`Overall Status: ${results.overallStatus}`, 15, y);
        y += 7;
        doc.text(`Likely Condition: ${results.diagnosis}`, 15, y);
        y += 7;
        doc.text(`Symptoms Summary: ${results.summarySymptoms}`, 15, y, { maxWidth: 180 });
        y += 10;

        // Treatment
        doc.setFontSize(14);
        doc.setTextColor(0, 0, 128);
        doc.text('2. Treatment Recommendations', 15, y);
        y += 8;
        doc.setFontSize(12);
        doc.setTextColor(0, 0, 0);
        results.treatment.forEach((rec, index) => {
            if (y > 280) { doc.addPage(); y = 20; }
            doc.text(`• ${rec}`, 15, y, { maxWidth: 180 });
            y += 7;
        });
        y += 10;

        // Precautions
        doc.setFontSize(14);
        doc.setTextColor(0, 0, 128);
        doc.text('3. Precautions', 15, y);
        y += 8;
        doc.setFontSize(12);
        doc.setTextColor(0, 0, 0);
        results.precautions.forEach((rec, index) => {
            if (y > 280) { doc.addPage(); y = 20; }
            doc.text(`- ${rec}`, 15, y, { maxWidth: 180 });
            y += 7;
        });

        if (y > 280) { doc.addPage(); y = 20; }
        doc.setFontSize(10);
        doc.setTextColor(200, 0, 0);
        doc.text('DISCLAIMER: This analysis is based on predictive modeling (AI) and is NOT real medical advice. Please consult a qualified healthcare professional for diagnosis or treatment.', 15, y + 10, { maxWidth: 180 });
        
        doc.save('symptom_analysis_report.pdf');
    };

    return (
        <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-6 rounded-2xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-xl"
        >
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 border-b pb-2 flex items-center">
                <Zap className="w-5 h-5 mr-2 text-indigo-600" />
                AI Analysis Result
            </h3>

            {/* Overall Status & Diagnosis */}
            <div className="grid md:grid-cols-3 gap-4 mb-6">
                <div className="md:col-span-1">
                    <StatusIndicator status={results.overallStatus} />
                </div>
                <div className="md:col-span-2 p-3 bg-indigo-50 dark:bg-indigo-900/20 border border-indigo-200 dark:border-indigo-800 rounded-xl">
                    <p className="text-xs text-gray-500 dark:text-gray-400 font-bold uppercase mb-1">Predicted Condition</p>
                    <p className="text-lg font-bold text-gray-800 dark:text-gray-100">{results.diagnosis}</p>
                </div>
            </div>

            {/* Symptoms Summary */}
            <div className="p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg mb-6 border border-gray-100 dark:border-gray-600">
                <p className="text-xs font-bold text-gray-500 uppercase mb-1">Symptoms Analyzed</p>
                <p className="text-sm text-gray-700 dark:text-gray-300 italic">"{results.summarySymptoms}"</p>
            </div>

            <div className="grid md:grid-cols-2 gap-6 mb-8">
                {/* Treatment */}
                <div>
                    <h4 className="text-sm font-bold text-gray-900 dark:text-white mb-3 flex items-center">
                        <Check className="w-4 h-4 mr-2 text-green-600" /> Recommended Actions
                    </h4>
                    <div className="space-y-2">
                        {results.treatment.map((rec, index) => (
                            <div key={index} className="p-2.5 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-100 dark:border-green-800 text-sm text-gray-700 dark:text-gray-300">
                                {rec}
                            </div>
                        ))}
                    </div>
                </div>
                
                {/* Precautions */}
                <div>
                    <h4 className="text-sm font-bold text-gray-900 dark:text-white mb-3 flex items-center">
                        <Wind className="w-4 h-4 mr-2 text-orange-600" /> Precautions
                    </h4>
                    <div className="space-y-2">
                        {results.precautions.map((pre, index) => (
                            <div key={index} className="p-2.5 bg-orange-50 dark:bg-orange-900/20 rounded-lg border border-orange-100 dark:border-orange-800 text-sm text-gray-700 dark:text-gray-300">
                                {pre}
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Actions */}
            <div className="flex justify-center space-x-4">
                <button 
                    onClick={downloadReport}
                    className="flex items-center space-x-2 px-5 py-2.5 bg-blue-600 text-white font-semibold rounded-lg shadow-lg hover:bg-blue-700 transition-all duration-200 text-sm"
                >
                    <DownloadIcon className="w-4 h-4" />
                    <span>Download PDF</span>
                </button>
                <button 
                    onClick={onReset}
                    className="flex items-center space-x-2 px-5 py-2.5 bg-gray-100 text-gray-700 font-semibold rounded-lg hover:bg-gray-200 transition-all duration-200 text-sm border border-gray-300"
                >
                    <RefreshCw className="w-4 h-4" />
                    <span>Check Again</span>
                </button>
            </div>
        </motion.div>
    );
}

// --- MAIN SYMPTOM CHECKER COMPONENT ---

export function SymptomChecker() {
    const [symptoms, setSymptoms] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [showResults, setShowResults] = useState(false);
    const [results, setResults] = useState<AIDiagnosis>(initialDiagnosis);

    const handleAnalyze = async () => {
        const text = symptoms.trim();
        if (!text) {
            alert("Please enter your symptoms.");
            return;
        }

        // 1. Mental Health Check (Restriction Logic)
        const mentalKeywords = ['anxiety', 'depression', 'stress', 'mood', 'insomnia', 'lonely', 'sad', 'manic', 'panic', 'suicidal'];
        const isMentalHealth = mentalKeywords.some(keyword => text.toLowerCase().includes(keyword));

        if (isMentalHealth) {
            alert("⚠️ Notice: Mental health analysis is currently unavailable. Please enter physical symptoms only.");
            return;
        }

        setIsLoading(true);
        setShowResults(false);

        try {
            // 2. Live API Call
            const aiDiagnosis = await fetchDiagnosisFromAI(text);
            
            setResults(aiDiagnosis); 
            setShowResults(true); 

        } catch (error) {
            console.error("Analysis Failed:", error);
            alert("AI Analysis failed. Please try again later.");
        } finally {
            setIsLoading(false);
        }
    };
    
    const handleReset = () => {
        setSymptoms('');
        setShowResults(false);
        setResults(initialDiagnosis);
    }
    
    const renderContent = () => {
        if (isLoading) {
            return (
                <div className="h-64 flex flex-col items-center justify-center bg-white dark:bg-gray-800 shadow-xl rounded-2xl animate-pulse border border-gray-100 dark:border-gray-700">
                    <Loader2 className="w-12 h-12 text-blue-600 animate-spin mb-4" />
                    <p className="text-lg font-bold text-gray-800 dark:text-white">Analyzing Symptoms...</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Consulting Gemini 3.0 Pro AI Model</p>
                </div>
            );
        }
        
        if (showResults) {
            return <AnalysisResultsDisplay results={results} onReset={handleReset} />;
        }
        
        return (
            <div className="p-6 rounded-2xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-lg">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                    Describe Your Symptoms
                </h3>
                <textarea
                    value={symptoms}
                    onChange={(e) => setSymptoms(e.target.value)}
                    placeholder="e.g., I have a severe headache on the left side, sensitivity to light, and slight nausea..."
                    className="w-full h-32 px-4 py-3 rounded-lg bg-gray-50 dark:bg-gray-900 border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition resize-none text-gray-700 dark:text-gray-200"
                />
                <button 
                    onClick={handleAnalyze}
                    className="mt-4 w-full px-6 py-3 bg-gradient-to-r from-blue-600 to-teal-500 text-white rounded-lg font-bold shadow-lg hover:shadow-xl transition-all hover:scale-[1.01] active:scale-[0.99] flex items-center justify-center"
                >
                    <Zap className="w-5 h-5 mr-2" />
                    Analyze with AI
                </button>
            </div>
        );
    }

    return (
        <FeaturePage
            icon={Stethoscope}
            title="AI Symptom Checker"
            description="Advanced physical health analysis powered by Gemini 3.0 Pro."
            gradient="from-blue-600 via-cyan-500 to-teal-500 dark:from-blue-900 dark:via-cyan-900 dark:to-teal-900"
        >
            <div className="max-w-3xl mx-auto mb-8">
                {/* Important Notice */}
                <div className="p-4 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800 mb-6">
                    <div className="flex items-start space-x-3">
                        <AlertCircle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                        <div>
                            <h3 className="font-bold text-gray-900 dark:text-white text-sm mb-1">Medical Disclaimer</h3>
                            <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed">
                                This tool uses AI to provide information and guidance only. It is <strong>not</strong> a substitute for professional medical advice, diagnosis, or treatment. For medical emergencies, call emergency services immediately.
                            </p>
                        </div>
                    </div>
                </div>

                {renderContent()}

            </div>
        </FeaturePage>
    );
}
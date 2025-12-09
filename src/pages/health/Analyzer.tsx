import { FileBarChart, Upload, AlertCircle, Loader2, Zap, Heart, BookOpen, Clock } from 'lucide-react';
import React, { useState } from 'react';

// Assuming FeaturePage is a component you have defined elsewhere
const FeaturePage = ({ icon: Icon, title, description, children, gradient }) => (
  // Enhanced background gradient and styling
  <div className={`p-4 sm:p-8 min-h-screen bg-gray-900 ${gradient} font-sans`}>
    <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <header className="flex flex-col items-center text-center mb-12">
        <div className="p-3 mb-4 rounded-full bg-white/10 shadow-xl border border-teal-500/50">
          <Icon className="w-12 h-12 text-teal-400" />
        </div>
        <h1 className="text-5xl sm:text-6xl font-extrabold text-white tracking-tight leading-tight mb-4">
          {title}
        </h1>
        <p className="text-xl text-gray-300 max-w-3xl font-light">
          {description}
        </p>
      </header>
      {children}
    </div>
  </div>
);

// --- Actual Analyzer Component ---
export function Analyzer() {
  const [file, setFile] = useState(null);
  const [reportAnalysis, setReportAnalysis] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // NOTE: This key is a placeholder and should be replaced with a secure method.
 const GEMINI_API_KEY=import.meta.env.VITE_GEMINI_API_KEY;
  const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${GEMINI_API_KEY}`;

  const handleFileChange = (event) => {
    const uploadedFile = event.target.files[0];
    if (uploadedFile && uploadedFile.size > 10 * 1024 * 1024) { 
      setError("File size exceeds the 10MB limit.");
      setFile(null);
    } else {
      setFile(uploadedFile);
      setReportAnalysis(null);
      setError(null);
    }
  };

  const handleAnalyze = async () => {
    if (!file) {
      setError("Please select a file to upload.");
      return;
    }

    setIsLoading(true);
    setError(null);
    setReportAnalysis(null);

    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);
    fileReader.onload = async () => {
      const base64Data = fileReader.result.split(',')[1];
      const mimeType = file.type === 'application/pdf' ? 'image/png' : file.type; 
      
      const prompt = "Analyze this medical report image. Identify key values and their reference ranges, and provide a simple, easy-to-understand explanation for a layperson. Structure the output clearly with headings for 'Summary of Key Findings', 'Detailed Explanation', and 'Next Steps/Disclaimer'. IMPORTANT: State clearly in the 'Next Steps/Disclaimer' section that this analysis is purely for informational/educational purposes and is NOT a diagnosis. Strongly advise the user to consult a qualified healthcare professional (M.D.) for any medical interpretation or treatment decisions.";

      const payload = {
        contents: [
          {
            parts: [
              { text: prompt },
              { inlineData: { data: base64Data, mimeType: mimeType } },
            ],
          },
        ],
      };

      try {
        const response = await fetch(API_URL, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(payload),
        });

        if (!response.ok) {
          const errorText = await response.text();
          throw new Error(`API call failed with status: ${response.status}. Message: ${errorText.substring(0, 100)}...`);
        }

        const data = await response.json();
        setReportAnalysis(data.candidates?.[0]?.content?.parts?.[0]?.text || "Analysis failed to produce content.");

      } catch (err) {
        console.error("Analysis Error:", err);
        setError(`Analysis failed. Please try again or check the API key/network. (${err.message})`);
      } finally {
        setIsLoading(false);
      }
    };
    fileReader.onerror = () => {
      setError("Error reading the file.");
      setIsLoading(false);
    }
  };

  return (
    <FeaturePage
      icon={Heart}
      title="Intelligent Health Report Analyzer"
      description="Upload your medical reports and instantly get AI-powered, simplified explanations using Gemini."
      gradient="bg-gradient-to-br from-indigo-900 via-gray-900 to-teal-900"
    >
      <div className="max-w-4xl mx-auto">
        {/* Important Notice */}
        <div className="p-6 rounded-2xl bg-red-900/50 border border-red-700/50 mb-8 shadow-2xl">
          <div className="flex items-start space-x-4">
            <AlertCircle className="w-7 h-7 text-red-400 flex-shrink-0 mt-1" />
            <div>
              <h3 className="text-xl font-bold text-red-300 mb-2">Crucial Disclaimer: Not Medical Advice</h3>
              <p className="text-base text-gray-300">
                This tool is intended for **educational purposes only**. It does **NOT** provide a **diagnosis** or **medical advice**. 
                Always consult your **qualified healthcare provider (M.D.)** for professional interpretation and treatment decisions.
              </p>
            </div>
          </div>
        </div>
        
        {/* Upload Area & File Info */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div className="md:col-span-1">
            {/* File Info Card - Restored and Enhanced */}
            <div className="p-6 rounded-xl bg-gray-800 border border-gray-700 h-full flex flex-col justify-between shadow-lg">
              <h3 className="text-lg font-extrabold text-white mb-4 border-b border-gray-700 pb-2">Analysis Status</h3>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <BookOpen className="w-5 h-5 text-indigo-400" />
                  <p className="text-gray-300 text-sm truncate">
                    **File:** {file ? file.name : "N/A"}
                  </p>
                </div>
                <div className="flex items-center space-x-3">
                  <Zap className="w-5 h-5 text-teal-400" />
                  <p className="text-gray-300 text-sm">
                    **AI Model:** Gemini 2.5 Flash
                  </p>
                </div>
                <div className="flex items-center space-x-3">
                  <Clock className="w-5 h-5 text-yellow-400" />
                  <p className="text-gray-300 text-sm">
                    **Status:** {isLoading ? 'Processing...' : (reportAnalysis ? 'Complete' : (file ? 'Ready' : 'Waiting'))}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div
            className="md:col-span-2 p-10 rounded-2xl border-4 border-dashed border-indigo-600/50 text-center bg-gray-800/70 shadow-2xl hover:border-teal-400 transition-all duration-300 cursor-pointer flex flex-col items-center justify-center"
            onClick={() => document.getElementById('file-upload').click()}
          >
            <input
              id="file-upload"
              type="file"
              accept=".pdf, .jpg, .jpeg, .png"
              onChange={handleFileChange}
              className="hidden"
            />
            <Upload className="w-14 h-14 text-teal-400 mx-auto mb-4" />
            <h3 className="text-2xl font-extrabold text-white mb-2">
              {file ? file.name : "Click to Upload Medical Report"}
            </h3>
            <p className="text-gray-400 mb-6">
              Supported formats: PDF, JPG, PNG (Maximum 10MB)
            </p>
            <button
              className={`px-10 py-3 text-lg text-white rounded-full font-bold transition-all transform hover:scale-105 shadow-xl ${
                file && !isLoading
                  ? 'bg-gradient-to-r from-teal-500 to-green-500 hover:from-teal-400 hover:to-green-400'
                  : 'bg-gray-600 cursor-not-allowed opacity-70'
              }`}
              onClick={(e) => { e.stopPropagation(); handleAnalyze(); }}
              disabled={!file || isLoading}
            >
              {isLoading ? (
                <div className="flex items-center justify-center">
                  <Loader2 className="w-6 h-6 mr-2 animate-spin" />
                  Analyzing Report...
                </div>
              ) : (
                "Start Analysis"
              )}
            </button>
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="p-4 rounded-lg bg-red-700/50 border border-red-600 text-red-200 mb-8 font-semibold">
            <span className="font-bold">Error:</span> {error}
          </div>
        )}

        {/* Analysis Result - Prominently displayed */}
        {reportAnalysis && (
          <div className="p-8 rounded-3xl bg-white/10 border border-teal-500/50 backdrop-blur-md shadow-3xl mb-8">
            <h3 className="text-3xl font-extrabold text-teal-300 mb-6 border-b border-teal-500/50 pb-3">
              <Zap className="w-7 h-7 inline-block mr-3" />
              Comprehensive AI Explanation
            </h3>
            <div className="text-gray-200 whitespace-pre-line leading-relaxed">
              {reportAnalysis}
            </div>
          </div>
        )}

        {/* How It Works - Styled as a steps list */}
        <div className="p-8 rounded-2xl bg-gray-800 border border-gray-700 shadow-xl">
          <h3 className="text-2xl font-bold text-white mb-6">
            How It Works
          </h3>
          <div className="space-y-6">
            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-indigo-600 flex items-center justify-center text-white text-xl font-extrabold shadow-lg">
                1
              </div>
              <div>
                <div className="font-semibold text-white text-lg mb-1">Upload Report</div>
                <p className="text-gray-400">
                  Upload a clear image or PDF of your lab results, blood tests, or imaging reports.
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-indigo-600 flex items-center justify-center text-white text-xl font-extrabold shadow-lg">
                2
              </div>
              <div>
                <div className="font-semibold text-white text-lg mb-1">AI Analysis</div>
                <p className="text-gray-400">
                  Our Google Gemini AI uses multimodal capabilities to read and extract key health indicators and ranges from the document.
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-indigo-600 flex items-center justify-center text-white text-xl font-extrabold shadow-lg">
                3
              </div>
              <div>
                <div className="font-semibold text-white text-lg mb-1">Receive Simple Explanation</div>
                <p className="text-gray-400">
                  Get a comprehensive, easy-to-understand breakdown of your results, highlighting values that are outside the normal range.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </FeaturePage>
  );
}
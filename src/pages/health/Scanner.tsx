import React, { useState, useCallback, useRef } from 'react';
import { Scan, Camera, Apple, Loader2 } from 'lucide-react';
import { FeaturePage } from '../../components/FeaturePage';

// WARNING: In a real-world application, store your API key securely on a server 
const GEMINI_API_KEY =import.meta.env.VITE_GEMINI_API_KEY; // User provided key
const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${GEMINI_API_KEY}`;

// Helper function to convert a File object to a base64 string
function fileToBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const base64String = reader.result.split(',')[1];
      resolve(base64String);
    };
    reader.onerror = (error) => reject(error);
    reader.readAsDataURL(file);
  });
}

// Define the expected JSON structure for the nutritional data
const nutritionalSchema = {
  type: "object",
  properties: {
    food: {
      type: "string",
      description: "The name of the food item scanned (e.g., Boiled Egg, Omelette)."
    },
    calories: {
      type: "number",
      description: "Total estimated calories (integer)."
    },
    protein: {
      type: "string",
      description: "Protein content, including units (e.g., '6g')."
    },
    carbs: {
      type: "string",
      description: "Carbohydrate content, including units (e.g., '0.6g')."
    },
    date: {
        type: "string",
        description: "The date of the scan, set to 'Today'."
    }
  },
  required: ["food", "calories", "protein", "carbs", "date"]
};

export function Scanner() {
  const [recentScans, setRecentScans] = useState([
    {
      food: 'Banana',
      calories: 105,
      protein: '1.3g',
      carbs: '27g',
      date: 'Today',
    },
    {
      food: 'Chicken Breast',
      calories: 165,
      protein: '31g',
      carbs: '0g',
      date: 'Yesterday',
    },
  ]);
  const [isScanning, setIsScanning] = useState(false);
  const fileInputRef = useRef(null); 

  /**
   * Handles the file upload and calls the Gemini API to get nutritional data.
   * @param {File} file The image file to analyze.
   */
  const handleImageScan = useCallback(async (file) => {
    if (!file) return;

    setIsScanning(true);
    try {
      const base64Image = await fileToBase64(file);
      const mimeType = file.type;

      // Construct the request body for Gemini API with Vision and JSON Schema
      const requestBody = {
        contents: [
          {
            parts: [
              {
                inlineData: {
                  mimeType: mimeType,
                  data: base64Image
                }
              },
              {
                text: `Analyze the food item in the image. Estimate the calories, protein, and carbohydrates for a single serving of the visible food. Provide the output strictly in the requested JSON format.`
              }
            ]
          }
        ],
        // 🟢 FIX: Changing "config" to "generationConfig"
        generationConfig: { 
            responseMimeType: "application/json",
            responseSchema: nutritionalSchema,
        }
      };

      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      });

      if (!response.ok) {
        const errorDetails = await response.text();
        console.error('API Error Details (for debugging 400 issues):', errorDetails); 
        throw new Error(`API call failed with status: ${response.status}`);
      }

      const data = await response.json();
      
      const jsonString = data.candidates[0].content.parts[0].text.trim();
      const newScanData = JSON.parse(jsonString);
      
      newScanData.date = 'Today'; 
      setRecentScans(prevScans => [newScanData, ...prevScans]);

    } catch (error) {
      console.error('Scanning failed:', error);
      alert('Failed to scan food. Please check the browser console for details and API key status.');
    } finally {
      setIsScanning(false);
    }
  }, []);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      handleImageScan(file);
    }
    event.target.value = null;
  };

  const triggerUpload = () => {
    fileInputRef.current?.click();
  };


  return (
    <FeaturePage
      icon={Scan}
      title="Nutrition Scanner"
      description="Scan food items to get instant nutritional information using Gemini"
      gradient="from-yellow-500 via-orange-500 to-red-500 dark:from-yellow-900 dark:via-orange-900 dark:to-red-900"
    >
      <div className="max-w-4xl mx-auto">
        <div className="p-12 rounded-2xl bg-gradient-to-br from-yellow-50 to-orange-50 dark:from-yellow-950/30 dark:to-orange-950/30 border border-yellow-200 dark:border-yellow-800 text-center mb-8">
          {isScanning ? (
            <Loader2 className="w-16 h-16 text-orange-500 mx-auto mb-4 animate-spin" />
          ) : (
            <Camera className="w-16 h-16 text-orange-500 mx-auto mb-4" />
          )}
          
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            Scan Your Food
          </h3>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Take a photo or upload an image to get nutritional information
          </p>

          <input 
            type="file" 
            accept="image/*" 
            ref={fileInputRef} 
            onChange={handleFileChange} 
            style={{ display: 'none' }} 
            disabled={isScanning}
          />

          <div className="flex justify-center space-x-4">
            <button 
              className="px-6 py-3 bg-gradient-to-r from-yellow-600 to-orange-600 text-white rounded-lg font-semibold hover:shadow-lg transition-all disabled:opacity-50"
              onClick={triggerUpload}
              disabled={isScanning}
            >
              {isScanning ? 'Analyzing...' : 'Take Photo'}
            </button>
            <button 
              className="px-6 py-3 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 text-gray-900 dark:text-white rounded-lg font-semibold hover:shadow-lg transition-all disabled:opacity-50"
              onClick={triggerUpload}
              disabled={isScanning}
            >
              Upload Image
            </button>
          </div>
          {isScanning && <p className="mt-4 text-orange-500 font-semibold">Scanning and Analyzing...</p>}
        </div>

        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
          Recent Scans
        </h3>

        <div className="space-y-4">
          {recentScans.map((scan, index) => (
            <div key={index} className="p-6 rounded-2xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
              <div className="flex items-center space-x-4 mb-4">
                <div className="p-3 rounded-xl bg-gradient-to-br from-yellow-500 to-orange-500">
                  <Apple className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1">
                  <h4 className="text-lg font-bold text-gray-900 dark:text-white">{scan.food}</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{scan.date}</p>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div className="p-4 rounded-xl bg-gray-50 dark:bg-gray-900">
                  <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">Calories</div>
                  <div className="text-xl font-bold text-gray-900 dark:text-white">{scan.calories}</div>
                </div>
                <div className="p-4 rounded-xl bg-gray-50 dark:bg-gray-900">
                  <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">Protein</div>
                  <div className="text-xl font-bold text-gray-900 dark:text-white">{scan.protein}</div>
                </div>
                <div className="p-4 rounded-xl bg-gray-50 dark:bg-gray-900">
                  <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">Carbs</div>
                  <div className="text-xl font-bold text-gray-900 dark:text-white">{scan.carbs}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </FeaturePage>
  );
}
import { FileText, Upload, Download } from 'lucide-react';
import { FeaturePage } from '../../components/FeaturePage';

export function Records() {
  const records = [
    {
      title: 'Blood Test Results',
      date: 'Dec 1, 2024',
      type: 'Lab Report',
      size: '2.3 MB',
    },
    {
      title: 'X-Ray Chest',
      date: 'Nov 28, 2024',
      type: 'Imaging',
      size: '5.1 MB',
    },
    {
      title: 'Prescription',
      date: 'Nov 25, 2024',
      type: 'Document',
      size: '0.5 MB',
    },
  ];

  return (
    <FeaturePage
      icon={FileText}
      title="Health Records"
      description="Store, access, and share your medical records securely"
      gradient="from-indigo-500 via-blue-500 to-cyan-500 dark:from-indigo-900 dark:via-blue-900 dark:to-cyan-900"
    >
      <div className="max-w-4xl mx-auto">
        <div className="mb-8 p-8 rounded-2xl bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-950/30 dark:to-cyan-950/30 border border-blue-200 dark:border-blue-800">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                Upload New Record
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Add medical reports, prescriptions, or imaging results
              </p>
            </div>
            <button className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-lg font-semibold hover:shadow-lg transition-all">
              <Upload className="w-5 h-5" />
              <span>Upload</span>
            </button>
          </div>
        </div>

        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
          Your Records
        </h3>

        <div className="space-y-4">
          {records.map((record, index) => (
            <div key={index} className="p-6 rounded-2xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-all">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="p-3 rounded-xl bg-gradient-to-br from-indigo-500 to-blue-500">
                    <FileText className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-gray-900 dark:text-white">{record.title}</h4>
                    <div className="flex items-center space-x-3 text-sm text-gray-600 dark:text-gray-400">
                      <span>{record.date}</span>
                      <span>•</span>
                      <span>{record.type}</span>
                      <span>•</span>
                      <span>{record.size}</span>
                    </div>
                  </div>
                </div>
                <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition">
                  <Download className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </FeaturePage>
  );
}

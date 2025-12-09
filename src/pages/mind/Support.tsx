import { MessageCircle, AlertCircle, HeartHandshake } from 'lucide-react';
import { FeaturePage } from '../../components/FeaturePage';
import { useState } from 'react';

export function Support() {
  const [message, setMessage] = useState('');

  return (
    <FeaturePage
      icon={MessageCircle}
      title="AI Emotional Support"
      description="Safe guidance and emotional support when you need it"
      gradient="from-pink-500 via-rose-500 to-red-500 dark:from-pink-900 dark:via-rose-900 dark:to-red-900"
    >
      <div className="max-w-3xl mx-auto">
        <div className="p-8 rounded-2xl bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-800 mb-8">
          <div className="flex items-start space-x-3">
            <AlertCircle className="w-6 h-6 text-red-600 flex-shrink-0 mt-1" />
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Crisis Support</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                If you're in crisis or having thoughts of self-harm, please contact emergency services
                or a crisis helpline immediately. This AI provides general emotional support and guidance only.
              </p>
              <div className="space-y-2 text-sm">
                <div className="font-medium text-gray-900 dark:text-white">Emergency Resources:</div>
                <div className="text-gray-600 dark:text-gray-400">
                  • National Crisis Hotline: 988<br />
                  • Crisis Text Line: Text HOME to 741741<br />
                  • Emergency Services: 911
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="p-8 rounded-2xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 mb-8">
          <div className="flex items-center space-x-3 mb-6">
            <HeartHandshake className="w-6 h-6 text-pink-500" />
            <h3 className="text-xl font-bold text-gray-900 dark:text-white">
              How can I support you today?
            </h3>
          </div>

          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Share what's on your mind..."
            className="w-full h-40 px-4 py-3 rounded-lg bg-gray-50 dark:bg-gray-900 border border-gray-300 dark:border-gray-700 focus:ring-2 focus:ring-pink-500 outline-none transition resize-none mb-4"
          />

          <button className="w-full px-6 py-3 bg-gradient-to-r from-pink-600 to-rose-600 text-white rounded-lg font-semibold hover:shadow-lg transition-all">
            Get Support
          </button>
        </div>

        <div className="p-6 rounded-2xl bg-gradient-to-br from-pink-50 to-rose-50 dark:from-pink-950/30 dark:to-rose-950/30 border border-pink-200 dark:border-pink-800">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
            Remember
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            You're not alone. Professional help is available and effective. Consider reaching out to
            a licensed mental health professional for personalized support and treatment.
          </p>
        </div>
      </div>
    </FeaturePage>
  );
}

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send, Loader2, CheckCircle } from 'lucide-react';

export const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
      setFormData({ name: '', email: '', subject: '', message: '' });

      setTimeout(() => {
        setSubmitted(false);
      }, 5000);
    }, 2000);
  };

  const contactInfo = [
    {
      icon: <Mail className="w-6 h-6" />,
      title: 'Email',
      value: 'support@aihealthcare.com',
      gradient: 'from-blue-500 to-cyan-500',
    },
    {
      icon: <Phone className="w-6 h-6" />,
      title: 'Phone',
      value: '+1 (555) 123-4567',
      gradient: 'from-purple-500 to-pink-500',
    },
    {
      icon: <MapPin className="w-6 h-6" />,
      title: 'Office',
      value: 'San Francisco, CA 94102',
      gradient: 'from-green-500 to-emerald-500',
    },
  ];

  return (
    <div className="min-h-screen pt-16 bg-gradient-to-br from-gray-50 to-blue-50">
      <section className="py-20 bg-gradient-to-br from-blue-600 to-purple-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
              Get In Touch
            </h1>
            <p className="text-xl text-blue-100 max-w-2xl mx-auto">
              Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
            {contactInfo.map((info, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 text-center"
              >
                <div className={`inline-flex p-4 rounded-xl bg-gradient-to-br ${info.gradient} text-white mb-4`}>
                  {info.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  {info.title}
                </h3>
                <p className="text-gray-600">
                  {info.value}
                </p>
              </motion.div>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white rounded-2xl p-8 shadow-xl"
            >
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                Send us a Message
              </h2>

              {submitted && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="mb-6 bg-green-50 border border-green-200 rounded-lg p-4 flex items-center space-x-3"
                >
                  <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0" />
                  <p className="text-green-800">
                    Thank you! Your message has been sent successfully. We'll get back to you soon.
                  </p>
                </motion.div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Your Name
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                    placeholder="John Doe"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                    placeholder="your@email.com"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Subject
                  </label>
                  <input
                    type="text"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                    placeholder="How can we help?"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Message
                  </label>
                  <textarea
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    rows={6}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all resize-none"
                    placeholder="Tell us more about your inquiry..."
                    required
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-semibold hover:shadow-xl hover:scale-105 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      <span>Sending...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5" />
                      <span>Send Message</span>
                    </>
                  )}
                </button>
              </form>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-8"
            >
              <div className="bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl p-8 text-white shadow-xl">
                <h3 className="text-2xl font-bold mb-4">
                  Office Hours
                </h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span>Monday - Friday:</span>
                    <span className="font-semibold">9:00 AM - 6:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Saturday:</span>
                    <span className="font-semibold">10:00 AM - 4:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Sunday:</span>
                    <span className="font-semibold">Closed</span>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-2xl p-8 shadow-xl">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  Frequently Asked Questions
                </h3>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">
                      How secure is my health data?
                    </h4>
                    <p className="text-gray-600 text-sm">
                      We use industry-leading encryption and comply with all healthcare data protection regulations.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">
                      Is the AI diagnosis reliable?
                    </h4>
                    <p className="text-gray-600 text-sm">
                      Our AI provides insights to support healthcare decisions but should not replace professional medical advice.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">
                      Can I book real doctors?
                    </h4>
                    <p className="text-gray-600 text-sm">
                      Yes, our platform connects you with verified healthcare professionals for consultations.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-2xl p-8 shadow-xl">
                <div className="aspect-video bg-gradient-to-br from-blue-100 to-purple-100 rounded-lg flex items-center justify-center">
                  <MapPin className="w-16 h-16 text-blue-600" />
                </div>
                <p className="text-center text-gray-600 mt-4">
                  123 Healthcare Ave, San Francisco, CA 94102
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

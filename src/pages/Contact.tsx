import { useState } from 'react';
import { Mail, Phone, MapPin, Send, Clock, HelpCircle, Map } from 'lucide-react';

// --- Reusable Form Input Component ---
const FormInput = ({ name, type = 'text', placeholder, value, onChange, required = false, rows = 1 }) => {
  const commonClasses = "w-full px-5 py-3 rounded-lg border border-gray-600 bg-gray-700 text-white placeholder-gray-400 focus:ring-blue-500 focus:border-blue-500 outline-none transition resize-none";
  
  if (type === 'textarea' || rows > 1) {
    return (
      <textarea
        name={name}
        rows={rows}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className={commonClasses}
        required={required}
      />
    );
  }

  return (
    <input
      type={type}
      name={name}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className={commonClasses}
      required={required}
    />
  );
};
// --- END Form Input Component ---


// Mocking the language context for a standalone component example
const useLanguage = () => {
  const t = (key) => {
    const translations = {
      'contact.title': 'Get In Touch',
      'contact.subtitle': "Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible.",
      'contact.name': 'Your Name',
      'contact.email': 'Email Address',
      'contact.subject': 'Subject',
      'contact.message': 'Message',
      'contact.send': 'Send Message',
    };
    return translations[key] || key;
  };
  return { t };
};

// --- Reusable ContactCard Component ---
const ContactCard = ({ icon, title, content, address, iconClass, href }) => (
    // Added 'href' prop and made the card a link for better UX (e.g., mailto:, tel:)
    <a 
        href={href} 
        className="block p-6 rounded-2xl shadow-xl bg-gray-800 transition-all border border-gray-700 hover:border-blue-500/50 hover:scale-[1.01] flex items-start space-x-4 group"
    >
      <div className={`p-3 rounded-full ${iconClass} transition-colors group-hover:bg-blue-800/50`}>
        {icon}
      </div>
      <div>
        <div className="text-lg font-semibold text-white group-hover:text-blue-400 transition-colors">{title}</div>
        <div className="text-md text-gray-300 font-medium mt-1">{content}</div>
        {address && <div className="text-sm text-gray-400 mt-0.5">{address}</div>}
      </div>
    </a>
);

// --- Reusable GlassyCard Component ---
const GlassyCard = ({ children, className = '' }) => (
    // Dark Glass effect: semi-transparent gray, backdrop blur, dark border
    <div className={`p-8 rounded-2xl shadow-2xl bg-gray-800/80 backdrop-blur-md border border-gray-700 ${className}`}>
      {children}
    </div>
);

export function Contact() {
  const { t } = useLanguage();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate API call or form submission
    alert(`Message Sent!
Name: ${formData.name}
Email: ${formData.email}
Subject: ${formData.subject}
Message: ${formData.message}`);
    
    // Clear the form
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  return (
    <div className="min-h-screen bg-gray-950 text-gray-200">
      
      {/* --- Header Section (Dark Gradient) --- */}
      <section className="pt-20 pb-16 bg-gradient-to-r from-gray-900 to-gray-800 shadow-2xl shadow-black/50">
        <div className="max-w-4xl mx-auto text-center px-4">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white mb-3 drop-shadow-lg">
            {t('contact.title')} 📧
          </h1>
          <p className="text-lg text-gray-400">
            {t('contact.subtitle')}
          </p>
        </div>
      </section>

      {/* --- Main Content Section --- */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          
          {/* 1. Contact Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            <ContactCard 
              icon={<Mail className="w-5 h-5 text-blue-400" />}
              title="Email Support"
              content="support@aihealthcare.com"
              iconClass="bg-blue-900/50"
              href="mailto:support@aihealthcare.com" // Added mailto link
            />
            <ContactCard 
              icon={<Phone className="w-5 h-5 text-purple-400" />}
              title="Call Us"
              content="+1 (555) 123-4567"
              iconClass="bg-purple-900/50"
              href="tel:+15551234567" // Added tel link
            />
            <ContactCard 
              icon={<MapPin className="w-5 h-5 text-green-400" />}
              title="Headquarters"
              content="San Francisco, CA 94102"
              address="123 Healthcare Ave"
              iconClass="bg-green-900/50"
              href="#" // Placeholder for map link
            />
          </div>

          {/* 2. Form and Side Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">
            
            {/* Left Column: Contact Form (Now using FormInput component) */}
            <div className="lg:col-span-3">
              <GlassyCard className="p-10">
                <h2 className="text-3xl font-bold text-white mb-8 border-b border-gray-700 pb-3">
                  Send us a Message
                </h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                  
                  {/* Reusable Input Fields */}
                  <FormInput
                    name="name"
                    placeholder={t('contact.name')}
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />

                  <FormInput
                    name="email"
                    type="email"
                    placeholder="Your email@email.com"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />

                  <FormInput
                    name="subject"
                    placeholder="How can we help?"
                    value={formData.subject}
                    onChange={handleChange}
                  />

                  <FormInput
                    name="message"
                    placeholder="Tell us more about your inquiry..."
                    value={formData.message}
                    onChange={handleChange}
                    rows={5}
                    required
                  />

                  {/* Submit Button - Retained original vibrant styling */}
                  <button
                    type="submit"
                    className="w-full flex items-center justify-center space-x-2 px-8 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg font-bold text-lg shadow-xl shadow-blue-500/30 hover:shadow-2xl transition-all hover:from-blue-700 hover:to-indigo-700"
                  >
                    <span>{t('contact.send')}</span>
                    <Send className="w-5 h-5 ml-2" />
                  </button>
                </form>
              </GlassyCard>
            </div>

            {/* Right Column: Side Content (Retained original structure) */}
            <div className="lg:col-span-2 space-y-8">
              
              {/* Office Hours Card (Dark Gradient) */}
              <div className="p-8 rounded-2xl shadow-xl bg-gradient-to-r from-indigo-700 to-purple-800 text-white">
                <h3 className="text-2xl font-bold flex items-center space-x-3 mb-5">
                  <Clock className="w-6 h-6 text-yellow-300" />
                  <span>Office Hours</span>
                </h3>
                <div className="text-lg space-y-2">
                  <div className="flex justify-between border-b border-indigo-500/50 pb-2">
                    <span className="font-semibold">Monday - Friday:</span>
                    <span>9:00 AM – 6:00 PM (PST)</span>
                  </div>
                  <div className="flex justify-between border-b border-indigo-500/50 pb-2">
                    <span className="font-semibold">Saturday:</span>
                    <span>10:00 AM – 4:00 PM</span>
                  </div>
                  <div className="flex justify-between pt-2">
                    <span className="font-semibold">Sunday:</span>
                    <span className="text-red-300 font-bold">Closed</span>
                  </div>
                </div>
              </div>

              {/* Frequently Asked Questions Card (Dark Glassy) */}
              <GlassyCard>
                <h3 className="text-2xl font-bold text-white flex items-center space-x-3 mb-5 border-b border-gray-700 pb-2">
                  <HelpCircle className="w-6 h-6 text-teal-400" />
                  <span>Quick FAQs</span>
                </h3>
                <div className="space-y-4 text-gray-300">
                  <div className="border-b border-gray-700 pb-3">
                    <p className="font-semibold text-white mb-1">How secure is my health data?</p>
                    <p className="text-sm text-gray-400">We use industry-leading encryption and comply with all healthcare data protection regulations.</p>
                  </div>
                  <div className="border-b border-gray-700 pb-3">
                    <p className="font-semibold text-white mb-1">Is the AI diagnosis reliable?</p>
                    <p className="text-sm text-gray-400">Our AI is designed to support healthcare decisions but should not replace professional medical advice.</p>
                  </div>
                  <div>
                    <p className="font-semibold text-white mb-1">Can I book real doctors?</p>
                    <p className="text-sm text-gray-400">Yes, our platform connects you with verified healthcare professionals for consultations.</p>
                  </div>
                </div>
              </GlassyCard>

              
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
import { Link } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import { motion } from 'framer-motion';
// All required Lucide icons for a complete and professional layout
import { Target, Eye, Heart, Shield, Zap, Users, Award, TrendingUp, ArrowRight, Clock, Globe, Zap as Lightning, CheckCircle } from 'lucide-react';

export function About() {
  const { t } = useLanguage();

  // --- Data Definitions ---

  const values = [
    {
      icon: CheckCircle,
      title: 'Integrity & Trust',
      description: 'Upholding the highest ethical standards in data handling and clinical guidance.',
      iconColor: 'text-green-400', 
    },
    {
      icon: Clock,
      title: 'Accessibility 24/7',
      description: 'We ensure 99.9% platform uptime and immediate assistance for critical health needs.',
      iconColor: 'text-teal-400', 
    },
    {
      icon: Award,
      title: 'Clinical Excellence',
      description: 'Committed to providing the highest quality healthcare technology and services, validated by experts.',
      iconColor: 'text-pink-400', 
    },
    {
      icon: Globe,
      title: 'Global Impact',
      description: 'Focused on delivering equitable healthcare solutions across diverse populations and regions.',
      iconColor: 'text-yellow-400', 
    },
  ];

  const coreFeatures = [
    {
      icon: <Shield className="w-6 h-6" />,
      title: 'Zero Trust Security',
      description: 'Your health data is encrypted and protected with industry-leading, HIPAA-compliant security standards.',
    },
    {
      icon: <Lightning className="w-6 h-6" />,
      title: 'Hyper-Accurate AI',
      description: 'Utilizing proprietary, deep-learning models for superior diagnostic predictions and health insights.',
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: 'Global Expert Network',
      description: 'Built and continuously validated by a multidisciplinary team of world-class clinicians and AI researchers.',
    },
    {
      icon: <Award className="w-6 h-6" />,
      title: 'Regulatory Certified',
      description: 'Fully compliant with major international healthcare regulations and data protection laws (e.g., GDPR, HIPAA).',
    },
  ];

  const stats = [
    { number: '50K+', label: 'Active Users' },
    { number: '99.8%', label: 'Platform Uptime' },
    { number: '4M+', label: 'Assessments Done' },
    { number: '100+', label: 'Global Experts' },
  ];

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  // --- Component Render ---

  return (
    // Base background changed to dark
    <div className="min-h-screen bg-gray-950 text-gray-300 overflow-hidden">

      {/* 1. 🚀 HERO SECTION: Professional Header (SIZE REDUCED) */}
      {/* Vertical padding reduced from py-24 to py-16 */}
      <section className="relative py-16 bg-gradient-to-br from-blue-900 to-indigo-950 overflow-hidden shadow-2xl shadow-indigo-900/50">
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <p className="text-sm font-semibold uppercase tracking-widest text-blue-400 mb-3">
              {t('about.tagline') || 'The Future of Intelligent Wellness'}
            </p>
            {/* Title size reduced from 6xl to 5xl */}
            <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-5 leading-tight drop-shadow-xl">
              {t('about.title') || 'AI-Powered Healthcare Redefined'}
            </h1>
            {/* Subtitle size reduced from xl to lg */}
            <p className="text-lg text-blue-300 max-w-5xl mx-auto font-light">
              {t('about.subtitle') || 'Leading the world in secure, accurate, and perpetually accessible digital health solutions.'}
            </p>
          </motion.div>
        </div>
      </section>
      
      {/* 2. 📊 STATS GRID (Darker, Professional Look) */}
      <section className="py-16 bg-gray-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="grid grid-cols-2 md:grid-cols-4 gap-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
          >
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                {/* Stats Card - Dark background, bright border, and hover effect */}
                <div className="bg-gray-900 rounded-xl p-8 shadow-2xl shadow-gray-900/50 border-t-4 border-blue-600/60 hover:shadow-3xl transition-all duration-500 transform hover:scale-[1.03]">
                  {/* Gradient text remains the same for vibrancy */}
                  <div className="text-5xl font-extrabold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-2">
                    {stat.number}
                  </div>
                  <div className="text-gray-400 text-sm font-bold uppercase tracking-widest">{stat.label}</div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* 3. 🎯 MISSION, VISION, & VALUES (Dark, High-Contrast Layout) */}
      <section className="py-24 bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
                className="grid lg:grid-cols-3 gap-16"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                variants={containerVariants}
            >
                {/* Mission & Vision Column */}
                <motion.div variants={itemVariants} className="lg:col-span-2 space-y-16 pr-8 border-r border-gray-700">
                    <div className="space-y-6">
                        <div className="flex items-center space-x-4">
                            <Target className="w-10 h-10 text-blue-400" />
                            {/* Title color set to white */}
                            <h3 className="text-4xl font-extrabold text-white">Our Mission</h3>
                        </div>
                        {/* Body text color adjusted */}
                        <p className="text-xl text-gray-300 leading-relaxed">
                            To **democratize healthcare** globally through advanced artificial intelligence, ensuring that every individual, regardless of location or economic status, has access to quality, personalized health services.
                        </p>
                        <p className="text-lg text-gray-500 border-l-4 border-blue-900 pl-4 italic">
                            Our platform merges cutting-edge AI technology with seasoned medical expertise to deliver solutions that are accurate, affordable, and perpetually accessible 24/7.
                        </p>
                    </div>

                    <div className="space-y-6 pt-6 border-t border-gray-800">
                        <div className="flex items-center space-x-4">
                            <Eye className="w-10 h-10 text-purple-400" />
                            <h3 className="text-4xl font-extrabold text-white">Our Vision</h3>
                        </div>
                        <p className="text-xl text-gray-300 leading-relaxed">
                            To be recognized as the **world's most trusted AI healthcare ecosystem**, fundamentally transforming the patient journey by unifying technology and compassionate human oversight.
                        </p>
                        <p className="text-lg text-gray-500 border-l-4 border-purple-900 pl-4 italic">
                            We envision a future where proactive health management is the standard, where early detection saves countless lives, and personalized insights empower every individual's wellness.
                        </p>
                    </div>
                </motion.div>
                
                {/* Core Values Column (Vertical list - Dark Cards) */}
                <motion.div variants={itemVariants} className="space-y-8 lg:col-span-1 lg:pl-8 pt-4">
                    <h3 className="text-3xl font-extrabold text-white mb-6 border-b-2 border-gray-700 pb-3">Core Values</h3>
                    {values.map((value, index) => (
                        <div key={index} className="flex items-start space-x-4 p-5 bg-gray-800 rounded-xl shadow-xl shadow-gray-950/50 hover:shadow-2xl transition-all duration-300 border border-gray-700 transform hover:translate-y-[-2px] backdrop-blur-sm">
                            <value.icon className={`w-7 h-7 ${value.iconColor} flex-shrink-0 mt-1`} />
                            <div>
                                <h4 className="text-xl font-bold text-white">{value.title}</h4>
                                <p className="text-gray-400 text-sm mt-1">{value.description}</p>
                            </div>
                        </div>
                    ))}
                </motion.div>
            </motion.div>
        </div>
      </section>

      {/* 4. ❤️ WHY IT MATTERS (Impact Section - Central Dark Card) */}
      <section className="py-24 bg-gray-950">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="text-center mb-16">
              <h2 className="inline-flex items-center space-x-4 text-4xl font-extrabold text-white border-b-4 border-red-500/30 pb-2">
                <Heart className="w-8 h-8 text-red-400" />
                <span>Our Core Impact: Transforming Lives</span>
              </h2>
            </div>
            
            {/* Key benefits list - Dark card */}
            <div className="bg-gray-900 rounded-3xl p-12 shadow-2xl shadow-gray-950/70 border-2 border-gray-800 backdrop-blur-md">
              <div className="grid md:grid-cols-2 gap-10 text-lg text-gray-300">
                
                <p>
                  <strong className="text-white font-bold block mb-1 text-xl">Universal Access:</strong> 
                  We eliminate geographical barriers, ensuring millions worldwide can access vital assessments and clinical guidance instantly, 24/7.
                </p>
                <p>
                  <strong className="text-white font-bold block mb-1 text-xl">Preventative Power:</strong> 
                  Our predictive AI identifies health risks in their earliest stages, shifting the paradigm from reactive illness treatment to proactive, life-saving prevention.
                </p>
                <p>
                  <strong className="text-white font-bold block mb-1 text-xl">Clinical Efficiency:</strong> 
                  We augment human intelligence by automating administrative burdens, allowing healthcare providers to dedicate their focus entirely to quality patient care.
                </p>
                <p>
                  <strong className="text-white font-bold block mb-1 text-xl">Patient Empowerment:</strong> 
                  Patients receive comprehensive, personalized health data and clear, actionable recommendations, fostering a culture of informed self-advocacy and continuous wellness.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 5. ✨ PLATFORM DIFFERENTIATORS (Core Features - Dark Grids) */}
      <section className="py-24 bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-extrabold text-center mb-16 text-white">
            Platform Differentiators: Why Choose Us?
          </h2>
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.5 }}
          >
            {coreFeatures.map((feature, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                transition={{ delay: index * 0.1 }}
                // Feature Card - Dark, minimalist design with a highlighted icon
                className="bg-gray-800/80 rounded-xl p-8 text-center shadow-2xl shadow-gray-950/50 border border-blue-900 hover:shadow-3xl transition-all duration-500 transform hover:translate-y-[-6px] backdrop-blur-sm"
              >
                <div className="p-4 bg-gradient-to-br from-blue-500 to-purple-500 text-white rounded-xl inline-flex mb-4 shadow-xl">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-white mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-400 text-sm leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* 6. 🤝 FINAL CTA (Strong Call to Action Footer - Vibrant Dark) */}
      <section className="py-20 bg-gradient-to-r from-blue-900 to-indigo-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <TrendingUp className="w-14 h-14 text-white mx-auto mb-5" />
            {/* Title color set to white */}
            <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-4">
              Ready to Advance Your Health Journey?
            </h2>
            {/* Subtitle color adjusted */}
            <p className="text-xl text-blue-300 mb-8 max-w-3xl mx-auto font-light">
              Experience the power of intelligence and compassion. Partner with us today to lead the future of wellness.
            </p>
            <Link
              to="/auth/signup"
              // CTA button remains bright white for maximum contrast/visibility
              className="inline-flex items-center space-x-3 px-10 py-4 bg-white text-indigo-700 rounded-full font-extrabold text-lg shadow-2xl shadow-white/40 hover:bg-gray-100 transition-all duration-300 group transform hover:scale-[1.05]"
            >
              <span>Explore Our Platform Now</span>
              <ArrowRight className="w-6 h-6 transition-transform group-hover:translate-x-1" />
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
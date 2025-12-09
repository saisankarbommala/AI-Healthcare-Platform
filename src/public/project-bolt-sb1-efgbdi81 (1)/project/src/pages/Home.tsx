import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Activity, Brain, Users, Stethoscope, ArrowRight, CheckCircle, Shield, Zap, Heart } from 'lucide-react';

export const Home = () => {
  const features = [
    {
      icon: <Activity className="w-12 h-12" />,
      title: 'AI Body Health Analyzer',
      description: 'Advanced AI-powered analysis of your physical health with personalized recommendations.',
      gradient: 'from-blue-500 to-cyan-500',
    },
    {
      icon: <Brain className="w-12 h-12" />,
      title: 'AI Mind Analyzer',
      description: 'Mental wellness tracking and AI-driven insights for better emotional health.',
      gradient: 'from-purple-500 to-pink-500',
    },
    {
      icon: <Stethoscope className="w-12 h-12" />,
      title: 'AI Doctor System',
      description: 'Connect with healthcare professionals and manage appointments seamlessly.',
      gradient: 'from-green-500 to-emerald-500',
    },
    {
      icon: <Users className="w-12 h-12" />,
      title: 'AI Patient Management',
      description: 'Comprehensive patient care with digital prescriptions and health monitoring.',
      gradient: 'from-orange-500 to-red-500',
    },
  ];

  const benefits = [
    { icon: <Shield className="w-6 h-6" />, text: 'Secure & Private' },
    { icon: <Zap className="w-6 h-6" />, text: 'Fast & Accurate' },
    { icon: <Heart className="w-6 h-6" />, text: '24/7 Care' },
    { icon: <CheckCircle className="w-6 h-6" />, text: 'AI-Powered' },
  ];

  return (
    <div className="min-h-screen pt-16">
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-gradient-to-br from-blue-600 via-purple-600 to-blue-800">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
            backgroundSize: '40px 40px'
          }} />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: 'spring' }}
              className="inline-block mb-6 px-6 py-2 bg-white/10 backdrop-blur-md rounded-full border border-white/20"
            >
              <span className="text-white/90 text-sm font-medium">
                Welcome to the Future of Healthcare
              </span>
            </motion.div>

            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
              AI-Powered Healthcare
              <br />
              <span className="bg-gradient-to-r from-blue-200 to-purple-200 bg-clip-text text-transparent">
                Platform
              </span>
            </h1>

            <p className="text-xl md:text-2xl text-blue-100 mb-12 max-w-3xl mx-auto">
              Experience comprehensive health management with advanced AI technology.
              Your complete wellness solution in one platform.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
              <Link
                to="/services"
                className="group px-8 py-4 bg-white text-blue-600 rounded-xl font-semibold hover:shadow-2xl hover:scale-105 transition-all duration-300 flex items-center space-x-2"
              >
                <span>Start Diagnosis</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                to="/about"
                className="px-8 py-4 bg-white/10 backdrop-blur-md text-white rounded-xl font-semibold border border-white/20 hover:bg-white/20 transition-all duration-300"
              >
                Learn More
              </Link>
            </div>

            <div className="flex flex-wrap justify-center gap-6">
              {benefits.map((benefit, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 + index * 0.1 }}
                  className="flex items-center space-x-2 px-4 py-2 bg-white/10 backdrop-blur-md rounded-lg border border-white/20"
                >
                  <span className="text-blue-200">{benefit.icon}</span>
                  <span className="text-white text-sm font-medium">{benefit.text}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        <motion.div
          className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-white to-transparent"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
        />
      </section>

      <section className="py-20 bg-gradient-to-b from-white to-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Our Services
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Comprehensive AI-powered healthcare solutions designed for your wellbeing
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.03, y: -5 }}
                className="group relative bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 overflow-hidden"
              >
                <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${feature.gradient} opacity-10 rounded-full blur-3xl group-hover:opacity-20 transition-opacity`} />

                <div className={`inline-flex p-4 rounded-xl bg-gradient-to-br ${feature.gradient} text-white mb-6 group-hover:scale-110 transition-transform`}>
                  {feature.icon}
                </div>

                <h3 className="text-2xl font-bold mb-3 text-gray-900 group-hover:text-blue-600 transition-colors">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>

                <div className={`mt-6 h-1 w-0 group-hover:w-full bg-gradient-to-r ${feature.gradient} rounded-full transition-all duration-500`} />
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mt-12"
          >
            <Link
              to="/services"
              className="inline-flex items-center space-x-2 px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-semibold hover:shadow-xl hover:scale-105 transition-all duration-300"
            >
              <span>Explore All Services</span>
              <ArrowRight className="w-5 h-5" />
            </Link>
          </motion.div>
        </div>
      </section>

      <section className="py-20 bg-gradient-to-br from-blue-600 to-purple-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Ready to Start Your Health Journey?
            </h2>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              Join thousands of users who trust our AI-powered platform for their health needs
            </p>
            <Link
              to="/login"
              className="inline-flex items-center space-x-2 px-8 py-4 bg-white text-blue-600 rounded-xl font-semibold hover:shadow-2xl hover:scale-105 transition-all duration-300"
            >
              <span>Get Started Now</span>
              <ArrowRight className="w-5 h-5" />
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

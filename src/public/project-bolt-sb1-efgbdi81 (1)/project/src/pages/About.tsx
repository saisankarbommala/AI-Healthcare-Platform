import { motion } from 'framer-motion';
import { Target, Eye, Heart, Shield, Zap, Users, Award, TrendingUp } from 'lucide-react';

export const About = () => {
  const features = [
    {
      icon: <Shield className="w-8 h-8" />,
      title: 'Secure & Private',
      description: 'Your health data is encrypted and protected with industry-leading security standards.',
    },
    {
      icon: <Zap className="w-8 h-8" />,
      title: 'AI-Powered',
      description: 'Advanced artificial intelligence provides accurate health insights and predictions.',
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: 'Expert Team',
      description: 'Backed by healthcare professionals and AI researchers.',
    },
    {
      icon: <Award className="w-8 h-8" />,
      title: 'Certified Platform',
      description: 'Compliant with healthcare regulations and data protection laws.',
    },
  ];

  const stats = [
    { number: '50K+', label: 'Active Users' },
    { number: '98%', label: 'Satisfaction Rate' },
    { number: '24/7', label: 'Availability' },
    { number: '100+', label: 'Healthcare Experts' },
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
              About AI Healthcare Platform
            </h1>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto">
              Revolutionizing healthcare with artificial intelligence and compassionate care
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-20">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <div className="bg-white rounded-2xl p-6 shadow-lg">
                  <div className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
                    {stat.number}
                  </div>
                  <div className="text-gray-600 text-sm">{stat.label}</div>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <div className="flex items-center space-x-3 mb-4">
                <Target className="w-10 h-10 text-blue-600" />
                <h2 className="text-3xl font-bold text-gray-900">Our Mission</h2>
              </div>
              <p className="text-lg text-gray-600 leading-relaxed">
                To democratize healthcare through artificial intelligence, making quality health services accessible to everyone, everywhere. We believe that advanced healthcare should not be a privilege but a right.
              </p>
              <p className="text-lg text-gray-600 leading-relaxed">
                Our platform combines cutting-edge AI technology with medical expertise to provide comprehensive health solutions that are accurate, affordable, and accessible 24/7.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <div className="flex items-center space-x-3 mb-4">
                <Eye className="w-10 h-10 text-purple-600" />
                <h2 className="text-3xl font-bold text-gray-900">Our Vision</h2>
              </div>
              <p className="text-lg text-gray-600 leading-relaxed">
                To become the world's most trusted AI healthcare platform, where technology and humanity unite to create a healthier future for all.
              </p>
              <p className="text-lg text-gray-600 leading-relaxed">
                We envision a world where preventive healthcare is the norm, where early detection saves lives, and where personalized health insights empower individuals to take control of their wellbeing.
              </p>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-20"
          >
            <div className="flex items-center space-x-3 justify-center mb-8">
              <Heart className="w-10 h-10 text-red-500" />
              <h2 className="text-3xl font-bold text-gray-900">Why This Project Matters</h2>
            </div>
            <div className="bg-white rounded-2xl p-8 shadow-xl">
              <div className="space-y-4 text-lg text-gray-600">
                <p>
                  <strong className="text-gray-900">Healthcare Access:</strong> Millions lack access to quality healthcare. Our AI platform bridges this gap by providing instant health assessments and guidance.
                </p>
                <p>
                  <strong className="text-gray-900">Early Detection:</strong> Many diseases can be prevented or treated effectively when caught early. Our AI helps identify potential health issues before they become critical.
                </p>
                <p>
                  <strong className="text-gray-900">Mental Health:</strong> Mental wellness is often overlooked. Our Mind Module provides crucial support for emotional and psychological health.
                </p>
                <p>
                  <strong className="text-gray-900">Doctor Efficiency:</strong> Healthcare professionals are overworked. Our platform helps doctors manage patients more effectively and make data-driven decisions.
                </p>
                <p>
                  <strong className="text-gray-900">Patient Empowerment:</strong> Knowledge is power. We empower patients with comprehensive health data and personalized recommendations.
                </p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">
              What Makes Us Different
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  <div className="bg-gradient-to-br from-blue-500 to-purple-500 text-white p-3 rounded-lg inline-flex mb-4">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600">
                    {feature.description}
                  </p>
                </motion.div>
              ))}
            </div>
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
            <TrendingUp className="w-16 h-16 text-white mx-auto mb-6" />
            <h2 className="text-4xl font-bold text-white mb-4">
              Join the Healthcare Revolution
            </h2>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              Be part of a movement that's transforming healthcare through technology
            </p>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

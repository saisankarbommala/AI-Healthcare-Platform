import { Link } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import { Activity, Heart, Brain, TrendingUp, ArrowRight, Zap, Shield, Clock } from 'lucide-react';

export function Home() {
  const { t } = useLanguage();

  const hubs = [
    {
      icon: Activity,
      title: t('home.bodyTitle') || 'Body Hub',
      description: t('home.bodyDesc') || 'Monitor vitals, consult doctors, manage medications',
      link: '/body',
      gradient: 'from-blue-600 to-cyan-600',
      ringColor: 'ring-blue-500/50',
    },
    {
      icon: Brain,
      title: t('home.mindTitle') || 'Mind Hub',
      description: t('home.mindDesc') || 'Track mood, reduce stress, build positive habits',
      link: '/mind',
      gradient: 'from-purple-600 to-pink-600',
      ringColor: 'ring-purple-500/50',
    },
    {
      icon: TrendingUp,
      title: t('home.healthTitle') || 'Health Hub',
      description: t('home.healthDesc') || 'Predict risks, analyze reports, family health management',
      link: '/health',
      gradient: 'from-green-600 to-emerald-600',
      ringColor: 'ring-green-500/50',
    },
  ];

  const stats = [
    { value: '50K+', label: 'Active Users', gradient: 'from-purple-400 to-purple-400' },
    { value: '100K+', label: 'Consultations', gradient: 'from-pink-400 to-red-400' },
    { value: '98%', label: 'Satisfaction', gradient: 'from-green-400 to-teal-400' },
    { value: '24/7', label: 'Support', gradient: 'from-cyan-400 to-blue-400' },
  ];
  
  const heroFeatures = [
    { icon: Shield, label: 'Secure & Private' },
    { icon: Zap, label: 'Fast & Accurate' },
    { icon: Clock, label: '24/7 Care' },
    { icon: Brain, label: 'AI-Powered' },
  ];

  return (
    // Base background: Deep Indigo/Dark Purple
    <div className="min-h-screen bg-indigo-950 text-white">

      {/* 1. 🌟 HERO SECTION: GLOWING VIOLET/PURPLE BACKGROUND 🌟 */}
      <section className="relative pt-16 pb-40 px-4 sm:px-6 lg:px-8 overflow-hidden 
                          /* --- Dark Violet/Indigo Gradient Background --- */
                          bg-gradient-to-t from-purple-800 via-indigo-900 to-violet-900 text-white"> 
        
        {/* Background Blobs for Visual Depth (Vibrant and Blurry) */}
        <div className="absolute inset-0 opacity-70">
          <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-indigo-400 rounded-full mix-blend-lighten filter blur-[150px] animate-blob" />
          <div className="absolute top-1/3 right-1/4 w-[700px] h-[700px] bg-purple-400 rounded-full mix-blend-lighten filter blur-[180px] animate-blob animation-delay-2000" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto text-center">
          
          {/* Tagline */}
          <div className="mb-6 inline-flex items-center space-x-2 bg-white/10 backdrop-blur-sm rounded-full px-6 py-2 shadow-xl ring-1 ring-pink-400/50 animate-fade-in-up">
            <Heart className="w-4 h-4 text-pink-400" />
            <span className="text-sm font-medium text-white/90">
              Welcome to the Future of Healthcare
            </span>
          </div>

          {/* Heading with Gradient Text for "Platform" */}
          <h1 className="text-5xl md:text-7xl font-extrabold text-white mb-6 animate-fade-in-up animation-delay-100 drop-shadow-2xl">
            AI-Powered Healthcare <br className='hidden md:block'/>
            <span className='bg-gradient-to-r from-purple-300 to-pink-300 bg-clip-text text-transparent'>Platform</span>
          </h1>
          
          {/* Subtitle */}
          <p className="text-xl md:text-2xl text-white/80 mb-10 max-w-4xl mx-auto animate-fade-in-up animation-delay-200">
            Experience comprehensive health management with advanced AI technology. Your complete wellness solution in one platform.
          </p>

          {/* CTA Buttons (Start Diagnosis / Learn More) */}
          <div className='flex justify-center space-x-4 mb-16 animate-fade-in-up animation-delay-300'>
            <Link
              to="/body"
              className="inline-flex items-center space-x-3 px-8 py-4 bg-white text-indigo-700 rounded-full font-bold text-lg shadow-xl hover:scale-[1.03] transition-all duration-300 group"
            >
              <span>Start Diagnosis</span>
              <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
            </Link>
            <Link
              to="/about"
              className="inline-flex items-center space-x-3 px-8 py-4 border border-white/50 text-white rounded-full font-semibold text-lg hover:bg-white/10 transition-colors duration-300"
            >
              <span>Learn More</span>
            </Link>
          </div>
          
          {/* Feature Icons at the bottom */}
          <div className="flex justify-center space-x-8 max-w-4xl mx-auto pt-4 border-t border-white/20">
            {heroFeatures.map((feature, index) => (
              <div key={index} className="flex items-center space-x-2 text-white/80 animate-fade-in-up animation-delay-400">
                <feature.icon className="w-5 h-5 text-purple-300" />
                <span className="text-sm font-medium">{feature.label}</span>
              </div>
            ))}
          </div>

        </div>
      </section>
      
      {/* 2. 🌌 STATS AND HUB CARDS SECTION (Dark Indigo BG, Light Cards) */}
      <section className="relative py-24 px-4 sm:px-6 lg:px-8 bg-indigo-950 text-white z-20">
        
        <div className="relative z-10 max-w-7xl mx-auto">
          
          {/* --- STATS GRID --- */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-20">
            {stats.map((stat, index) => (
              <div
                key={index}
                // Dark tiles with colored text on deep indigo background
                className="text-center p-6 rounded-2xl bg-indigo-900 shadow-2xl border border-indigo-700 
                           hover:scale-[1.02] transition-transform duration-300 relative overflow-hidden"
              >
                <div className="relative z-10">
                    {/* Stats Value Gradient */}
                    <div className={`text-4xl font-extrabold bg-gradient-to-r ${stat.gradient} bg-clip-text text-transparent mb-2`}>
                      {stat.value}
                    </div>
                    <div className="text-sm text-gray-400">{stat.label}</div>
                </div>
              </div>
            ))}
          </div>

          {/* --- HUB CARDS (White Cards for contrast) --- */}
          <div className="grid md:grid-cols-3 gap-8">
            {hubs.map((hub, index) => (
              <Link
                key={index}
                to={hub.link}
                // Clean white cards with subtle glow/shadow, contrasting with dark BG
                className={`group relative overflow-hidden rounded-3xl p-8 shadow-2xl shadow-indigo-500/10
                            bg-white text-gray-900 border border-gray-100
                            ring-2 ring-transparent transition-all duration-500 
                            hover:shadow-indigo-300/50 hover:ring-4 ${hub.ringColor} transform perspective-1000 
                            hover:rotate-x-1 hover:rotate-y-1`}
                style={{ transformStyle: 'preserve-3d' }}
              >
                
                {/* Icon with colored, circular background */}
                <div className={`inline-flex p-4 rounded-full bg-gradient-to-br ${hub.gradient} mb-4 shadow-lg`}>
                  <hub.icon className="w-7 h-7 text-white" />
                </div>

                <h3 className="text-2xl font-bold text-indigo-900 mb-2">
                  {hub.title}
                </h3>
                <p className="text-gray-600 mb-4 text-sm">
                  {hub.description}
                </p>

                {/* 'Explore' Link with movement */}
                <div className="flex items-center text-indigo-600 font-semibold text-sm group-hover:translate-x-1 transition-transform">
                  <span>Explore Module</span>
                  <ArrowRight className="w-4 h-4 ml-2" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 3. 🚀 FINAL CTA SECTION: VIBRANT INDIGO/PURPLE 🚀 */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-indigo-700 to-purple-700">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-6 drop-shadow-lg">
            Ready to Transform Your Health Today?
          </h2>
          <p className="text-xl text-white/90 mb-8">
            Join thousands of users who trust our platform for their comprehensive wellness journey
          </p>
          <Link
            to="/auth/signup"
            className="inline-flex items-center space-x-3 px-12 py-5 bg-white text-indigo-700 rounded-full font-bold text-xl shadow-2xl shadow-white/40 hover:scale-105 transition-all duration-300 ease-out"
          >
            <span>Start Your Journey</span>
            <ArrowRight className="w-6 h-6" />
          </Link>
        </div>
      </section>
    </div>
  );
}
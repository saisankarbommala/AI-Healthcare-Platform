import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import { Heart, Brain, Users, LineChart, Star } from 'lucide-react';

export function Preloader() {
  const [progress, setProgress] = useState(0);
  const navigate = useNavigate();
  const { t } = useLanguage(); 

  useEffect(() => {
    // Progress calculation logic
    const duration = 3000; 
    const interval = 30; 
    const steps = duration / interval;
    const increment = 100 / steps;

    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(() => navigate('/home'), 300); 
          return 100;
        }
        return Math.min(prev + increment, 100);
      });
    }, interval);

    return () => clearInterval(timer);
  }, [navigate]);

  return (
    // DEEP THEME: Purple/Blue Gradient (Matching Image)
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden 
      bg-gradient-to-br from-indigo-800 via-purple-900 to-fuchsia-900">
      
      {/* 🌟 Mesmerizing Background Blobs & Particles 🌟 */}
      <div className="absolute inset-0 opacity-40">
        {/* Soft, glowing blobs for the main movement */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-400 rounded-full mix-blend-screen filter blur-3xl opacity-30 animate-blob" />
        <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-purple-400 rounded-full mix-blend-screen filter blur-3xl opacity-30 animate-blob animation-delay-2000" />
        <div className="absolute bottom-1/4 left-1/3 w-96 h-96 bg-fuchsia-400 rounded-full mix-blend-screen filter blur-3xl opacity-30 animate-blob animation-delay-4000" />
        
        {/* ✨ Floating Particle Effect ✨ */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="w-full h-full animate-float-particles">
                {[...Array(10)].map((_, i) => (
                    <Star 
                        key={i}
                        className={`absolute text-white/50 w-2 h-2 animate-twinkle opacity-0`} 
                        style={{
                            top: `${Math.random() * 100}%`,
                            left: `${Math.random() * 100}%`,
                            animationDelay: `${Math.random() * 5}s`,
                        }}
                        fill="currentColor"
                        strokeWidth={0}
                    />
                ))}
            </div>
        </div>
      </div>

      <div className="relative z-10 text-center px-4">
        
        {/* 2. ICONS: Animated and Glowing */}
        <div className="mb-8 flex justify-center space-x-4 text-white">
          <LineChart 
              className="w-8 h-8 md:w-10 md:h-10 transform -rotate-90 animate-pulse drop-shadow-glow" 
              strokeWidth={1.5} 
          />
          <Heart 
              className="w-8 h-8 md:w-10 md:h-10 animate-beat drop-shadow-glow" 
              strokeWidth={1.5} 
          />
          <Brain 
              className="w-8 h-8 md:w-10 md:h-10 animate-bounce-slow drop-shadow-glow" 
              strokeWidth={1.5} 
          />
          <Users 
              className="w-8 h-8 md:w-10 md:h-10 animate-fade-in-up animation-delay-500 drop-shadow-glow" 
              strokeWidth={1.5} 
          />
        </div>

        {/* 3. TEXT: White Text matching the image */}
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-2 animate-fade-in-up drop-shadow-glow-text">
          {t('preloader.title') || 'AI Healthcare Platform'}
        </h1>
        <p className="text-lg md:text-xl text-white/80 mb-12 animate-fade-in-up animation-delay-300 drop-shadow-glow-text-sub">
          {t('preloader.subtitle') || 'Your Health, Our Priority'}
        </p>

        {/* 4. PROGRESS BAR */}
        <div className="w-64 max-w-full mx-auto">
          <div className="h-1 bg-white/20 rounded-full overflow-hidden shadow-inner">
            <div
              className="h-full bg-gradient-to-r from-cyan-400 to-purple-400 
                         transition-all duration-500 ease-out relative shadow-lg"
              style={{ width: `${progress}%` }}
            >
              <div className="absolute inset-0 bg-white/50 animate-shimmer" />
            </div>
          </div>
          <p className="text-white text-xs mt-3 font-medium drop-shadow-glow-text-sub">
            Loading... {Math.round(progress)}%
          </p>
        </div>
      </div>
    </div>
  );
}
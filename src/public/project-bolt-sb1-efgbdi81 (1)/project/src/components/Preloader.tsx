import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Activity, Heart, Brain, Users } from 'lucide-react';

interface PreloaderProps {
  onComplete: () => void;
}

export const Preloader = ({ onComplete }: PreloaderProps) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(onComplete, 500);
          return 100;
        }
        return prev + 2;
      });
    }, 30);

    return () => clearInterval(timer);
  }, [onComplete]);

  const icons = [
    { Icon: Activity, delay: 0 },
    { Icon: Heart, delay: 0.2 },
    { Icon: Brain, delay: 0.4 },
    { Icon: Users, delay: 0.6 },
  ];

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-gradient-to-br from-blue-600 via-purple-600 to-blue-800 overflow-hidden"
    >
      <div className="absolute inset-0 opacity-20">
        {[...Array(50)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full"
            initial={{
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
              opacity: Math.random(),
            }}
            animate={{
              y: [null, Math.random() * window.innerHeight],
              opacity: [null, Math.random(), 0],
            }}
            transition={{
              duration: Math.random() * 3 + 2,
              repeat: Infinity,
              ease: 'linear',
            }}
          />
        ))}
      </div>

      <motion.div
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="relative mb-8"
      >
        <div className="flex space-x-4">
          {icons.map(({ Icon, delay }, index) => (
            <motion.div
              key={index}
              initial={{ y: 0 }}
              animate={{ y: [-10, 10, -10] }}
              transition={{
                duration: 2,
                delay,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
              className="relative"
            >
              <Icon className="w-12 h-12 text-white" />
              <motion.div
                className="absolute inset-0 bg-white rounded-full blur-xl"
                animate={{
                  opacity: [0.3, 0.6, 0.3],
                  scale: [1, 1.2, 1],
                }}
                transition={{
                  duration: 2,
                  delay,
                  repeat: Infinity,
                }}
              />
            </motion.div>
          ))}
        </div>
      </motion.div>

      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="text-4xl md:text-5xl font-bold text-white mb-2 text-center"
      >
        AI Healthcare Platform
      </motion.h1>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="text-blue-100 text-lg mb-12 text-center"
      >
        Your Health, Our Priority
      </motion.p>

      <div className="w-64 h-2 bg-white/20 rounded-full overflow-hidden backdrop-blur-sm">
        <motion.div
          className="h-full bg-gradient-to-r from-blue-300 to-purple-300 rounded-full"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.3 }}
        />
      </div>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7 }}
        className="text-white/80 mt-4 text-sm"
      >
        Loading... {progress}%
      </motion.p>

      <motion.div
        className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-400 via-purple-400 to-blue-400"
        animate={{
          x: ['-100%', '100%'],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: 'linear',
        }}
      />
    </motion.div>
  );
};

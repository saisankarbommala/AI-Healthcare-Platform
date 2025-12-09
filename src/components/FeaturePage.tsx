import { ReactNode } from 'react';
import { LucideIcon } from 'lucide-react';

interface FeaturePageProps {
  icon: LucideIcon;
  title: string;
  description: string;
  gradient: string;
  children: ReactNode;
}

export function FeaturePage({ icon: Icon, title, description, gradient, children }: FeaturePageProps) {
  return (
    <div className="min-h-screen">
      <section className={`relative pt-20 pb-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-br ${gradient}`}>
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex p-4 rounded-2xl bg-white/10 backdrop-blur-sm mb-6 animate-fade-in-up">
            <Icon className="w-12 h-12 text-white" />
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-4 animate-fade-in-up animation-delay-100">
            {title}
          </h1>
          <p className="text-xl text-white/90 max-w-3xl mx-auto animate-fade-in-up animation-delay-200">
            {description}
          </p>
        </div>
      </section>

      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto">
          {children}
        </div>
      </section>
    </div>
  );
}

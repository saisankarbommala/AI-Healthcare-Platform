import { Apple, TrendingUp, Target } from 'lucide-react';
import { FeaturePage } from '../../components/FeaturePage';
import { useEffect, useState } from 'react';

export function Diet() {
  const stats = [
    { label: 'Calories', value: 1850, target: 2000, color: 'bg-blue-500', unit: 'cal' },
    { label: 'Protein', value: 75, target: 80, color: 'bg-green-500', unit: 'g' },
    { label: 'Water', value: 6, target: 8, color: 'bg-cyan-500', unit: 'glasses' },
  ];

  const [progress, setProgress] = useState({});

  useEffect(() => {
    const newProgress = {};
    stats.forEach(stat => {
      newProgress[stat.label] = Math.min((stat.value / stat.target) * 100, 100);
    });
    setProgress(newProgress);
  }, []);

  const meals = [
    {
      time: 'Breakfast',
      description: 'Oatmeal with berries and nuts',
      calories: 450,
      img: 'https://via.placeholder.com/400x250?text=Breakfast', // Placeholder URL
    },
    {
      time: 'Lunch',
      description: 'Grilled chicken salad with quinoa',
      calories: 550,
      img: 'https://via.placeholder.com/400x250?text=Lunch', // Placeholder URL
    },
    {
      time: 'Dinner',
      description: 'Baked salmon with vegetables',
      calories: 600,
      img: 'https://via.placeholder.com/400x250?text=Dinner', // Placeholder URL
    },
  ];

  return (
    <FeaturePage
      icon={Apple}
      title="Diet & Nutrition"
      description="Personalized meal plans and nutrition tracking for optimal health"
      gradient="from-lime-500 via-green-500 to-emerald-500 dark:from-lime-900 dark:via-green-900 dark:to-emerald-900"
    >
      <div className="max-w-6xl mx-auto px-4">
        {/* Nutrition Stats */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="p-6 rounded-2xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-lg hover:shadow-xl transition-all"
            >
              <div className="flex items-center justify-between mb-3">
                <span className="text-gray-600 dark:text-gray-400 font-medium">{stat.label}</span>
                <Target className="w-5 h-5 text-gray-400" />
              </div>
              <div className="text-3xl font-bold text-gray-900 dark:text-white mb-3">
                {stat.value}{stat.unit}
              </div>
              <div className="relative h-3 bg-gray-200 dark:bg-gray-700 rounded-full mb-2">
                <div
                  className={`${stat.color} absolute h-3 rounded-full transition-all`}
                  style={{ width: `${progress[stat.label] || 0}%` }}
                />
              </div>
              <div className="text-sm text-gray-500 dark:text-gray-400">
                Target: {stat.target}{stat.unit}
              </div>
            </div>
          ))}
        </div>

        {/* Meal Plan Section */}
        <div className="mb-12">
          <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">Today's Meal Plan</h3>
          <div className="grid md:grid-cols-3 gap-6">
            {meals.map((meal, index) => (
              <div
                key={index}
                className="rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all bg-white dark:bg-gray-800"
              >
                <img src={meal.img} alt={meal.time} className="w-full h-40 object-cover" />
                <div className="p-6">
                  <h4 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">{meal.time}</h4>
                  <p className="text-gray-600 dark:text-gray-400 mb-3">{meal.description}</p>
                  <div className="text-sm text-gray-500 dark:text-gray-400">Calories: {meal.calories} cal</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Call to Action Button */}
        <div className="text-center">
          <button className="inline-flex items-center space-x-3 px-8 py-4 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-xl font-semibold text-lg hover:shadow-2xl transition-all">
            <TrendingUp className="w-5 h-5" />
            <span>Get Custom Meal Plan</span>
          </button>
        </div>
      </div>
    </FeaturePage>
  );
}

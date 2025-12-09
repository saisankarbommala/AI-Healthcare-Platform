import { BookOpen, Search } from 'lucide-react';
import { FeaturePage } from '../../components/FeaturePage'; // Assuming this component exists
import { useState, useMemo } from 'react';

// --- Comprehensive A-Z List of Medical Topics ---
const allMedicalTopics = [
  { letter: 'A', items: ['Anemia', 'Arthritis', 'Asthma', 'Anxiety', 'Allergies', 'Acne', 'Alzheimer\'s Disease', 'Aneurysm'] },
  { letter: 'B', items: ['Blood Pressure (High)', 'Bronchitis', 'Bipolar Disorder', 'Back Pain', 'Bursitis', 'Botulism', 'Bulimia'] },
  { letter: 'C', items: ['Cholesterol (High)', 'COVID-19', 'Common Cold', 'Cancer', 'Cataracts', 'Cerebral Palsy', 'Cirrhosis', 'Croup'] },
  { letter: 'D', items: ['Diabetes', 'Depression', 'Dermatitis', 'Dehydration', 'Dementia', 'Dyslexia', 'Dengue Fever', 'Diverticulitis'] },
  { letter: 'E', items: ['Eczema', 'Epilepsy', 'Edema', 'Emphysema', 'Encephalitis', 'Ebola'] },
  { letter: 'F', items: ['Fever', 'Flu (Influenza)', 'Fibromyalgia', 'Food Poisoning', 'Fungal Infection'] },
  { letter: 'G', items: ['Gout', 'Glaucoma', 'Gingivitis', 'Gallstones', 'GERD'] },
  { letter: 'H', items: ['Headache', 'Heart Attack', 'Hepatitis', 'Hernia', 'HIV/AIDS', 'Hypothyroidism', 'Hypertension'] },
  { letter: 'I', items: ['Insomnia', 'Irritable Bowel Syndrome (IBS)', 'Infertility', 'Impetigo', 'Iron Deficiency'] },
  { letter: 'J', items: ['Jaundice', 'Juvenile Arthritis'] },
  { letter: 'K', items: ['Kidney Stones', 'Kawasaki Disease', 'Ketoacidosis'] },
  { letter: 'L', items: ['Lupus', 'Leukemia', 'Lyme Disease', 'Laryngitis', 'Legionnaires\' Disease'] },
  { letter: 'M', items: ['Migraine', 'Measles', 'Malaria', 'Multiple Sclerosis (MS)', 'Mumps', 'Meningitis'] },
  { letter: 'N', items: ['Narcolepsy', 'Nephritis', 'Neuralgia', 'Nausea'] },
  { letter: 'O', items: ['Osteoporosis', 'Obesity', 'Otitis Media', 'Ovarian Cysts'] },
  { letter: 'P', items: ['Pneumonia', 'Psoriasis', 'Parkinson\'s Disease', 'Polio', 'Panic Disorder'] },
  { letter: 'Q', items: ['Q Fever'] }, // Less common, but included for completeness
  { letter: 'R', items: ['Rheumatoid Arthritis', 'Rabies', 'Rickets', 'Rosacea', 'Ringworm'] },
  { letter: 'S', items: ['Stroke', 'Sleep Apnea', 'Sciatica', 'Scoliosis', 'Shingles', 'Sinusitis'] },
  { letter: 'T', items: ['Tuberculosis (TB)', 'Thyroid Disease', 'Tetanus', 'Tonsillitis', 'Tinnitus'] },
  { letter: 'U', items: ['Ulcers', 'Urinary Tract Infection (UTI)', 'Urticaria (Hives)'] },
  { letter: 'V', items: ['Varicose Veins', 'Vertigo', 'Viral Infection'] },
  { letter: 'W', items: ['Whooping Cough', 'Warts', 'West Nile Virus'] },
  { letter: 'X', items: ['Xeroderma'] }, // Less common, but included for completeness
  { letter: 'Y', items: ['Yellow Fever', 'Yeast Infection'] },
  { letter: 'Z', items: ['Zika Virus', 'Zoster (Shingles)'] }
];

/**
 * Renders the Medical Encyclopedia feature page.
 * It includes a search bar and displays medical terms grouped by letter,
 * filtering the results based on the search term.
 */
export function Encyclopedia() {
  const [searchTerm, setSearchTerm] = useState('');

  // Memoized function to filter topics based on the search term
  const filteredTopics = useMemo(() => {
    const term = searchTerm.toLowerCase().trim();

    if (!term) {
      // If the search term is empty, return all topics
      return allMedicalTopics;
    }

    return allMedicalTopics
      .map(topic => {
        // Filter the items within each letter group
        const filteredItems = topic.items.filter(item =>
          item.toLowerCase().includes(term)
        );

        // Return a new topic object with only the matching items
        return {
          ...topic,
          items: filteredItems,
        };
      })
      // Filter out topic groups that have no matching items
      .filter(topic => topic.items.length > 0);
  }, [searchTerm]);

  const hasResults = filteredTopics.length > 0;

  return (
    <FeaturePage
      icon={BookOpen}
      title="Medical Encyclopedia"
      description="Simple explanations of medical terms and conditions"
      gradient="from-teal-500 via-cyan-500 to-blue-500 dark:from-teal-900 dark:via-cyan-900 dark:to-blue-900"
    >
      <div className="max-w-4xl mx-auto">
        {/* --- Search Input Section --- */}
        <div className="mb-8">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search medical terms (e.g., 'blood' or 'asthma')..."
              className="w-full pl-12 pr-4 py-4 rounded-lg bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 focus:ring-2 focus:ring-teal-500 outline-none transition text-lg shadow-sm"
            />
          </div>
        </div>

        {/* --- Topic Display Section --- */}
        <div className="space-y-6">
          {hasResults ? (
            filteredTopics.map((topic, index) => (
              <div
                key={index}
                className="p-6 rounded-2xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-lg"
              >
                {/* Letter Header */}
                <div className="flex items-center space-x-4 mb-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-teal-500 to-cyan-500 flex items-center justify-center shadow-md">
                    <span className="text-2xl font-bold text-white">{topic.letter}</span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                    Terms starting with {topic.letter}
                  </h3>
                </div>
                {/* List of Terms */}
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                  {topic.items.map((item, i) => (
                    // In a real app, this button would link to the term's detail page
                    <button
                      key={i}
                      className="px-4 py-3 rounded-xl bg-gray-50 dark:bg-gray-900 hover:bg-teal-50 dark:hover:bg-teal-950/30 text-gray-900 dark:text-white text-left font-medium transition duration-200 border border-transparent hover:border-teal-300 dark:hover:border-teal-700 shadow-sm"
                      onClick={() => console.log(`Navigating to: ${item}`)}
                    >
                      {item}
                    </button>
                  ))}
                </div>
              </div>
            ))
          ) : (
            // No Results State
            <div className="p-10 text-center rounded-2xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-lg">
              <p className="text-xl font-semibold text-gray-900 dark:text-white">
                No results found for "{searchTerm}"
              </p>
              <p className="mt-2 text-gray-600 dark:text-gray-400">
                Try searching for a different medical term or condition.
              </p>
            </div>
          )}
        </div>

        {/* --- Educational Resource Footer --- */}
        <div className="mt-8 p-8 rounded-2xl bg-gradient-to-br from-teal-50 to-cyan-50 dark:from-teal-950/30 dark:to-cyan-950/30 border border-teal-200 dark:border-teal-800 shadow-xl">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
            Educational Resource
          </h3>
          <p className="text-gray-600 dark:text-gray-400">
            This encyclopedia provides simple, easy-to-understand explanations of medical terms and conditions.
            It's designed for educational purposes and should not replace professional medical advice.
          </p>
        </div>
      </div>
    </FeaturePage>
  );
}
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Mail, Lock, User, ArrowRight, Eye, EyeOff } from 'lucide-react';

// --- 1. Image Carousel Component (Left Sidebar Slideshow Logic) ---

// సైడ్‌బార్‌లో ప్రదర్శించడానికి డమ్మీ స్లైడ్‌ల శ్రేణి
const SLIDES = [
    {
        id: 1,
        // The doctor/patient image as the primary image for context matching
        image: '/images/Gemini_Generated_Image_o93tn9o93tn9o93t.png', 
        caption: 'AI Healthcare Platform',
    },
    {
        id: 2,
        image: '/images/Gemini_Generated_Image_qsg3shqsg3shqsg3.png', 
        caption: 'Visualize your progress',
    },
    {
        id: 3,
        image: '/images/Gemini_Generated_Image_zba5mdzba5mdzba5.png', 
        caption: 'Seamless experience',
    },
];

const ImageCarousel = () => {
    const [currentSlide, setCurrentSlide] = useState(0);

    useEffect(() => {
        // 5 సెకన్లకు ఒకసారి ఆటోమేటిక్ స్లైడ్ మారుతుంది
        const interval = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % SLIDES.length);
        }, 5000); 

        // కాంపోనెంట్ అన్‌మౌంట్ అయినప్పుడు ఇంటర్వెల్‌ను క్లియర్ చేస్తుంది
        return () => clearInterval(interval);
    }, []);

    const currentImage = SLIDES[currentSlide];

    return (
        <div 
            className="hidden lg:block w-5/12 p-8 relative transition-all duration-1000 ease-in-out bg-cover bg-center"
            style={{ backgroundImage: `url(${currentImage.image})` }}
        >
            
            {/* Overlay: ఇమేజ్ పై డార్క్ గ్రేడియంట్ ఓవర్‌లే (విజువల్ మ్యాచ్ కోసం) */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>

            {/* Content: స్లైడర్ డాట్స్ */}
            <div className="relative z-10 h-full flex flex-col justify-end text-white">
                
                {/* Pagination Dots (Matching the style from your Login.tsx example) */}
                <div className="pb-4 transition-opacity duration-700">
                    <div className="flex space-x-2">
                        {SLIDES.map((_, index) => (
                            <div 
                                key={index}
                                className={`w-8 h-2 transition-all duration-300 cursor-pointer ${
                                    currentSlide === index
                                        ? 'bg-purple-400/95 rounded-lg w-10 shadow-lg shadow-purple-400/30'
                                        : 'bg-gray-300/60 rounded-lg w-8 hover:bg-gray-400/80'
                                }`}
                                onClick={() => setCurrentSlide(index)}
                            ></div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};


// --- 2. Signup Component (Main Form) ---

export function Signup() {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        agreedToTerms: false,
    });
    const [showPassword, setShowPassword] = useState(false);

    // Localization Placeholder
    const t = (key: string) => {
        const translations: { [key: string]: string } = {
            'auth.createAccount': 'Create Your Account',
            'auth.login': 'Log in',
            'auth.firstName': 'First Name',
            'auth.lastName': 'Last Name',
            'auth.email': 'Email',
            'auth.passwordPlaceholder': 'Create a password',
            'auth.agreeTerms': 'I agree to the ',
            'auth.termsAndConditions': 'Terms & Conditions',
            'auth.createBtn': 'Create account',
            'auth.orRegisterWith': 'Or register with',
            'auth.alreadyHaveAccount': 'Already have an account?',
        };
        return translations[key] || key;
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!formData.agreedToTerms) {
            alert('Please agree to the Terms & Conditions to proceed.');
            return;
        }
        console.log('Attempting sign up:', formData);
        alert('Professional Signup Logic Executed.');
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === 'checkbox' ? checked : value,
        });
    };

    // ఇన్పుట్ ఫీల్డ్ స్టైల్స్ ను సెట్ చేసే క్లాసెస్
    // ఇవి ఇమేజ్ లోని రౌండెడ్, డార్క్ ఫీల్డ్స్ లాగా ఉంటాయి
    const InputStyle = "w-full pl-12 pr-4 py-3 rounded-xl bg-black/40 text-white placeholder-gray-400 border border-transparent focus:border-purple-500 outline-none transition duration-200 text-base shadow-inner shadow-black/30";
    const IconStyle = "absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400";
    const ButtonGradient = "bg-gradient-to-r from-purple-700 to-indigo-500 hover:from-purple-800 hover:to-indigo-600";
    
    return (
        // Outer Container: Deep Purple Gradient Background (Matching your image colors)
        <div className="min-h-screen flex items-center justify-center p-4 sm:p-8 
                        bg-gradient-to-br from-indigo-800 via-purple-700 to-fuchsia-700">
            
            {/* Main Card: Split Layout Card with Glassy Effect */}
            <div className="flex w-full max-w-5xl rounded-[30px] overflow-hidden shadow-2xl shadow-black/80 
                            bg-white/10 backdrop-blur-md border border-white/20">
                
                {/* Left Side: Dynamic Image Carousel Component (5/12 width) */}
                <ImageCarousel />

                {/* Right Side: Professional Form Column (7/12 width) */}
                <div className="w-full lg:w-7/12 p-8 sm:p-12 text-white">
                    <div className="max-w-md mx-auto">
                        
                        {/* Title & Login Link */}
                        <h1 className="text-4xl font-extrabold mb-2 text-white">
                            {t('auth.createAccount')}
                        </h1>
                        <p className="text-sm text-gray-300 mb-8">
                            {t('auth.alreadyHaveAccount')}{' '}
                            <Link to="/auth/login" className="text-purple-300 hover:text-purple-200 ml-1 font-semibold underline">
                                {t('auth.login')}
                            </Link>
                        </p>

                        <form onSubmit={handleSubmit} className="space-y-6">
                            
                            {/* Name Fields (Two Columns) */}
                            <div className="flex space-x-4">
                                {/* First Name */}
                                <div className="w-1/2 relative">
                                    <User className={IconStyle} />
                                    <input
                                        type="text"
                                        name="firstName"
                                        value={formData.firstName}
                                        onChange={handleChange}
                                        className={InputStyle}
                                        placeholder={t('auth.firstName')}
                                        required
                                    />
                                </div>
                                {/* Last Name */}
                                <div className="w-1/2 relative">
                                    <User className={IconStyle} />
                                    <input
                                        type="text"
                                        name="lastName"
                                        value={formData.lastName}
                                        onChange={handleChange}
                                        className={InputStyle}
                                        placeholder={t('auth.lastName')}
                                    />
                                </div>
                            </div>

                            {/* Email Input (Full Width) */}
                            <div className="relative">
                                <Mail className={IconStyle} />
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    className={InputStyle}
                                    placeholder={t('auth.email')}
                                    required
                                />
                            </div>

                            {/* Password Input (with Toggle) */}
                            <div className="relative">
                                <Lock className={IconStyle} />
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    name="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    // Increased right padding for the toggle button
                                    className={`w-full pl-12 pr-12 py-3 rounded-xl bg-black/40 text-white placeholder-gray-400 border border-transparent focus:border-purple-500 outline-none transition duration-200 text-base shadow-inner shadow-black/30`}
                                    placeholder={t('auth.passwordPlaceholder')}
                                    required
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-purple-400 p-1 rounded-full transition"
                                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                                >
                                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />} 
                                </button>
                            </div>
                            
                            {/* Terms and Conditions Checkbox */}
                            <div className="flex items-center pt-2">
                                <input
                                    type="checkbox"
                                    name="agreedToTerms"
                                    checked={formData.agreedToTerms}
                                    onChange={handleChange}
                                    id="terms-checkbox"
                                    className="w-4 h-4 text-purple-500 bg-black/30 border-gray-600 rounded focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-black transition duration-200"
                                />
                                <label htmlFor="terms-checkbox" className="ml-3 text-sm text-gray-400">
                                    {t('auth.agreeTerms')}
                                    <a href="#" className="text-purple-300 hover:underline transition">
                                        {t('auth.termsAndConditions')}
                                    </a>
                                </label>
                            </div>

                            {/* Create Account Button */}
                            <button
                                type="submit"
                                // Button Style: Wide gradient button matching the image
                                className={`w-full py-4 ${ButtonGradient} text-white rounded-xl font-bold text-lg transition duration-300 shadow-xl shadow-purple-600/40 mt-8 flex items-center justify-center space-x-2`}
                            >
                                <span>{t('auth.createBtn')}</span>
                                <ArrowRight className="w-5 h-5" />
                            </button>
                        </form>

                        {/* Separator and Social Login */}
                        <div className="my-8 flex items-center">
                            <hr className="flex-grow border-gray-600" />
                            <span className="px-3 text-sm text-gray-400 font-medium">{t('auth.orRegisterWith')}</span>
                            <hr className="flex-grow border-gray-600" />
                        </div>

                        {/* Social Login Buttons (Matching the minimal style in the login image) */}
                        <div className="flex space-x-4">
                            {/* Google Button */}
                            <button className="flex items-center justify-center w-1/2 py-3 border border-purple-400/30 rounded-xl text-sm font-medium hover:bg-black/40 transition duration-200 text-gray-300">
                                <img src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg" alt="Google" className="w-4 h-4 mr-2" />
                                Google
                            </button>
                            {/* Apple Button */}
                            <button className="flex items-center justify-center w-1/2 py-3 border border-purple-400/30 rounded-xl text-sm font-medium hover:bg-black/40 transition duration-200 text-gray-300">
                                <img src="https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg" alt="Apple" className="w-4 h-4 mr-2 invert" />
                                Apple
                            </button>
                        </div>
                        
                    </div>
                </div>
            </div>
        </div>
    );
}
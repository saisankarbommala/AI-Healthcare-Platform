import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Mail, Lock, Eye, EyeOff, ArrowRight } from 'lucide-react';

// --- 1. Image Carousel Component ---
// సైడ్‌బార్ ఇమేజెస్ కోసం లిస్టింగ్
const SLIDES = [
    {
        id: 1,
        // Using a placeholder image that matches the uploaded professional image context
        image: '/images/Gemini_Generated_Image_9sylaa9sylaa9syl.png', },
    {
        id: 2,
        image: '/images/Gemini_Generated_Image_dyznu8dyznu8dyzn.png',
    },
    {
        id: 3,
        image: '/images/Gemini_Generated_Image_nia6dcnia6dcnia6.png',
    },
];

const ImageCarousel = () => {
    const [currentSlide, setCurrentSlide] = useState(0);

    useEffect(() => {
        // Auto-advance the slide every 5 seconds
        const interval = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % SLIDES.length);
        }, 5000);

        return () => clearInterval(interval);
    }, []);

    const currentImage = SLIDES[currentSlide];

    return (
        <div
            className="hidden lg:block w-5/12 p-8 relative transition-all duration-1000 ease-in-out bg-cover bg-center"
            style={{ backgroundImage: `url(${currentImage.image})` }}
        >
            {/* Overlay: Darker gradient overlay for image style consistency */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>

            {/* Content: Slider dots (dots styled for better visibility on a dark background) */}
            <div className="relative z-10 h-full flex flex-col justify-end text-white">
                <div className="pb-4 transition-opacity duration-700">
                    <div className="flex space-x-2">
                        {SLIDES.map((_, index) => (
                            <div
                                key={index}
                                className={`w-8 h-2 transition-all duration-300 cursor-pointer ${
                                    currentSlide === index
                                        ? 'bg-fuchsia-400/95 rounded-lg w-10 shadow-lg shadow-fuchsia-400/30' // Brighter focus color
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


// --- 2. Login Component (Main Form) ---

export function Login() {

    const t = (key: string) => {
        const translations: { [key: string]: string } = {
            'auth.loginTitle': 'Welcome back!',
            'auth.loginBtn': 'Log in',
            'auth.email': 'Email',
            'auth.passwordPlaceholder': 'Enter your password',
            'auth.forgotPassword': 'Forgot password?',
            'auth.noAccount': "Don't have an account?",
            'nav.signup': 'Sign up',
            'auth.orLoginWith': 'Or login with',
        };
        return translations[key] || key;
    };

    const [formData, setFormData] = useState({
        email: 'maha@gmail.com', // Added pre-filled data as shown in image
        password: 'password123', // Added pre-filled data as shown in image
    });
    const [showPassword, setShowPassword] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log('Login attempt with:', formData);
        alert('Professional Login Logic Executed.');
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };
    
    // Customized input style classes for a deeper, more premium look
    const inputClasses = "w-full pl-12 pr-12 py-3 rounded-xl bg-black/30 border border-purple-500/20 text-white text-base placeholder-gray-400 outline-none transition duration-300 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/50 shadow-inner shadow-black/40";


    return (
        // Outer Container: Deep Purple Gradient Background (More dramatic stops)
        <div className="min-h-screen flex items-center justify-center p-4 sm:p-8 
                        bg-gradient-to-br from-indigo-900 via-purple-800 to-fuchsia-700">

            {/* Main Card: Glassy Effect (Retained and slightly enhanced border) */}
            <div className="flex w-full max-w-5xl rounded-[30px] overflow-hidden shadow-2xl shadow-black/80 
                            bg-white/10 backdrop-blur-xl border border-white/30">

                {/* Left Side: Dynamic Image Carousel Component */}
                <ImageCarousel />

                {/* Right Side: Professional Form Column (adapted for the glassy dark card) */}
                <div className="w-full lg:w-7/12 p-8 sm:p-12 text-white">
                    <div className="max-w-md mx-auto">

                        {/* Title & Signup Link (Title is now white and bolder) */}
                        <h1 className="text-4xl sm:text-5xl font-extrabold mb-2 text-white">
                            {t('auth.loginTitle')}
                        </h1>
                        <p className="text-sm text-gray-300 mb-10">
                            {t('auth.noAccount')}{' '}
                            <Link to="/auth/signup" className="text-fuchsia-300 hover:text-fuchsia-200 ml-1 font-semibold underline underline-offset-4 transition">
                                {t('nav.signup')}
                            </Link>
                        </p>

                        <form onSubmit={handleSubmit} className="space-y-6">

                            {/* Email Input */}
                            <div>
                                <div className="relative flex items-center">
                                    <Mail className="absolute left-4 w-5 h-5 text-gray-400" />
                                    <input
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        className={inputClasses.replace('pr-12', 'pr-4')}
                                        placeholder={t('auth.email')}
                                        required
                                    />
                                </div>
                            </div>

                            {/* Password Input (with Toggle) */}
                            <div className="relative flex items-center">
                                <Lock className="absolute left-4 w-5 h-5 text-gray-400" />
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    name="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    className={inputClasses}
                                    placeholder={t('auth.passwordPlaceholder')}
                                    required
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-fuchsia-400 p-1 rounded-full transition"
                                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                                >
                                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                </button>
                            </div>

                            {/* Forgot Password Link */}
                            <div className="text-right">
                                <Link to="/auth/forgot-password" className="text-sm text-fuchsia-400 hover:text-fuchsia-300 font-medium transition">
                                    {t('auth.forgotPassword')}
                                </Link>
                            </div>

                            {/* Login Button (Bolder Gradient and Larger Size) */}
                            <button
                                type="submit"
                                className="w-full py-4 bg-gradient-to-r from-fuchsia-600 to-violet-600 text-white rounded-xl font-bold text-xl hover:from-fuchsia-700 hover:to-violet-700 transition duration-300 shadow-2xl shadow-fuchsia-500/40 mt-10 flex items-center justify-center space-x-3"
                            >
                                <span>{t('auth.loginBtn')}</span>
                                <ArrowRight className="w-6 h-6" />
                            </button>
                        </form>

                        {/* Separator and Social Login */}
                        <div className="my-8 flex items-center">
                            <hr className="flex-grow border-gray-600/50" />
                            <span className="px-3 text-sm text-gray-400 font-medium">{t('auth.orLoginWith')}</span>
                            <hr className="flex-grow border-gray-600/50" />
                        </div>

                        {/* Social Login Buttons (Glassy Border) */}
                        <div className="flex space-x-4">
                            <button className="flex items-center justify-center w-1/2 py-3 border border-white/30 rounded-xl text-base font-medium hover:bg-white/10 transition duration-200 text-gray-200 shadow-lg shadow-black/20">
                                <img src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg" alt="Google" className="w-4 h-4 mr-2" />
                                Google
                            </button>
                            <button className="flex items-center justify-center w-1/2 py-3 border border-white/30 rounded-xl text-base font-medium hover:bg-white/10 transition duration-200 text-gray-200 shadow-lg shadow-black/20">
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
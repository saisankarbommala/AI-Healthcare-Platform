import { Link, useLocation } from 'react-router-dom';
import { 
    Activity, 
    Droplet, Brain, Heart, // Main Dropdown Icons
    CheckCircle, Video, Calendar, Pill, FileText, Utensils, // Body Icons
    Smile, Scale, Sun, ListChecks, Target, Zap, Shield, // Mind Icons
    Search, TrendingUp, Users, Clock, Upload, Scan, BookOpen, // Health Icons
    Menu, X, ChevronDown, ChevronUp, // Mobile/Utility Icons
    Dumbbell
} from 'lucide-react'; 
import { useState } from 'react';

// Mock 't' function for demonstration (as the LanguageContext was removed)
const mockT = (key) => {
    const translations = {
        'nav.home': 'Home',
        'nav.body': 'Body',
        'nav.mind': 'Mind',
        'nav.health': 'Health',
        'nav.about': 'About',
        'nav.contact': 'Contact',
        'nav.getStarted': 'Get Started',
        
        // Body Sub-links
        'sub.vitals': 'Vitals Monitoring',
        'sub.symptom_checker': 'AI Health Support',
        'sub.telemedicine': 'Telemedicine',
        'sub.appointment': 'Appointment Booking',
       
        'sub.medicine': 'Women Empowerment',
        'sub.diet': 'Diet & Nutrition Assistant',
        'sub.fitness': 'Ftness & Exercise Plans',


        // Mind Sub-links
        'sub.mood_tracking': 'Mental-Health Prediction',
        'sub.stress_assessment': 'Stress Assessment',
        'sub.guided_meditation': 'Guided Meditation',
        'sub.daily_tasks': 'Daily Wellness Tasks',
        'sub.habit_builder': 'Habit Builder',
        'sub.ai_support': 'AI Emotional Support',
        'sub.sleep_wellness': 'Sleep Wellness',
        
        // Health Sub-links
        'sub.risk_tendency': 'AI Disease Risk Tendency',
        'sub.risk_score': 'Health Risk Score',
        'sub.family_system': 'Family Health System',
        'sub.smart_calendar': 'Smart Calendar',
        'sub.report_analyzer': 'Report Analyzer (upload)',
        'sub.nutrition_scanner': 'Nutrition Scanner',
        'sub.encyclopedia': 'Medical Encyclopedia A–Z',
    };
    return translations[key] || key;
};

export function Navbar() {
    const location = useLocation();
    const t = mockT;

    // State for desktop dropdown (hover)
    const [activeDropdown, setActiveDropdown] = useState(null);
    // State for mobile menu open/closed
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    // State for mobile dropdown (click to expand)
    const [activeMobileDropdown, setActiveMobileDropdown] = useState(null);

    // Helper function to handle desktop mouse events
    const handleMouseEnter = (path) => setActiveDropdown(path);
    const handleMouseLeave = () => setActiveDropdown(null);
    
    // Toggle mobile menu open/closed
    const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);
    
    // Toggle mobile submenu/dropdown
    const toggleMobileDropdown = (path) => {
        setActiveMobileDropdown(activeMobileDropdown === path ? null : path);
    };

    const dropdownMenus = {
        '/body': [
            { path: '/body/Vitals', label: t('sub.vitals'), icon: Droplet },
            { path: '/body/SymptomChecker', label: t('sub.symptom_checker'), icon: Search },
            { path: '/body/Telemedicine', label: t('sub.telemedicine'), icon: Video },
            { path: '/body/Appointments', label: t('sub.appointment'), icon: Calendar },
            { path: '/body/Medicine', label: t('sub.women-empowerment'), icon: Calendar },
            
           { path: '/body/Fitness', label: t('sub.fitness'), icon: Dumbbell },
            { path: '/body/Diet', label: t('sub.diet'), icon: Utensils },
        ],
        '/mind': [
            { path: '/mind/MoodTracking', label: t('sub.mood_tracking'), icon: Smile },
            { path: '/mind/StressAssessment', label: t('sub.stress_assessment'), icon: Scale },
            { path: '/mind/Meditation', label: t('sub.guided_meditation'), icon: Sun },
            { path: '/mind/DailyTasks', label: t('sub.daily_tasks'), icon: ListChecks },
            { path: '/mind/Habits', label: t('sub.habit_builder'), icon: Target },
            { path: '/mind/Support', label: t('sub.ai_support'), icon: Zap },
            { path: '/mind/Sleep', label: t('sub.sleep_wellness'), icon: Shield },
        ],
        '/health': [
            { path: '/health/Prediction', label: t('sub.risk_tendency'), icon: TrendingUp },
            { path: '/health/RiskScore', label: t('sub.risk_score'), icon: CheckCircle },
            { path: '/health/Family', label: t('sub.family_system'), icon: Users },
            { path: '/health/Calendar', label: t('sub.smart_calendar'), icon: Clock },
            { path: '/health/Analyzer', label: t('sub.report_analyzer'), icon: Upload },
            { path: '/health/Scanner', label: t('sub.nutrition_scanner'), icon: Scan },
            { path: '/health/Encyclopedia', label: t('sub.encyclopedia'), icon: BookOpen },
        ],
    };

    const navLinks = [
        { path: '/home', label: t('nav.home'), dropdown: null, icon: null },
        { path: '/body', label: t('nav.body'), dropdown: dropdownMenus['/body'], icon: Droplet },
        { path: '/mind', label: t('nav.mind'), dropdown: dropdownMenus['/mind'], icon: Brain },
        { path: '/health', label: t('nav.health'), dropdown: dropdownMenus['/health'], icon: Heart },
        { path: '/about', label: t('nav.about'), dropdown: null, icon: null },
        { path: '/contact', label: t('nav.contact'), dropdown: null, icon: null },
    ];

    // New Dropdown Menu Component with Icons and enhanced style (Desktop)
    const DropdownMenu = ({ links }) => (
        <div className="absolute left-1/2 -translate-x-1/2 top-full mt-2 w-64 bg-white dark:bg-gray-800 rounded-xl shadow-2xl border border-gray-200 dark:border-gray-700 py-2 overflow-hidden transform origin-top transition-all duration-300 ease-out scale-100 opacity-100">
            {links.map((link) => {
                const Icon = link.icon;
                return (
                    <Link
                        key={link.path}
                        to={link.path}
                        onClick={() => setActiveDropdown(null)} 
                        className="group flex items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-gray-700 transition-all duration-200"
                    >
                        <Icon className="w-4 h-4 mr-3 text-blue-500 dark:text-cyan-400 group-hover:text-blue-600 transition-colors group-hover:scale-110" />
                        <span className="group-hover:text-blue-600 dark:group-hover:text-cyan-300 transition-colors group-hover:translate-x-1 transform duration-150">
                            {link.label}
                        </span>
                    </Link>
                )
            })}
        </div>
    );
    
    // Mobile Submenu Component
    const MobileSubMenu = ({ links }) => (
        <div className="pl-4 border-l-2 border-blue-200 dark:border-blue-700/50 mt-2 space-y-1">
            {links.map((link) => {
                const Icon = link.icon;
                const isActive = location.pathname === link.path;
                return (
                    <Link
                        key={link.path}
                        to={link.path}
                        onClick={() => setIsMobileMenuOpen(false)} // Close menu on sub-link click
                        className={`flex items-center px-3 py-2 text-sm rounded-lg transition-colors ${
                            isActive 
                                ? 'bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-cyan-400 font-semibold'
                                : 'text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
                        }`}
                    >
                        <Icon className="w-4 h-4 mr-3" />
                        {link.label}
                    </Link>
                )
            })}
        </div>
    );

    // Mobile Navigation Content
    const MobileNavContent = () => (
        <div className="md:hidden bg-white dark:bg-gray-900 pb-4 pt-2 transition-all duration-300 ease-in-out border-b border-gray-100 dark:border-gray-800">
            <div className="px-4 space-y-2">
                {navLinks.map((link) => {
                    const LinkIcon = link.icon;
                    const isDropdown = !!link.dropdown;
                    const isSectionOpen = activeMobileDropdown === link.path;
                    const isActive = location.pathname.startsWith(link.path) && !isDropdown; // Don't highlight dropdown parents unless on the exact path
                    
                    return (
                        <div key={link.path}>
                            {isDropdown ? (
                                // Dropdown Link (e.g., /body)
                                <button
                                    onClick={() => toggleMobileDropdown(link.path)}
                                    className={`w-full flex items-center justify-between px-3 py-3 text-base font-semibold rounded-lg transition-colors ${
                                        isSectionOpen
                                            ? 'bg-blue-50 dark:bg-blue-900/50 text-blue-600 dark:text-cyan-400'
                                            : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                                    }`}
                                >
                                    <div className='flex items-center'>
                                        {LinkIcon && <LinkIcon className="w-5 h-5 mr-3" />}
                                        <span>{link.label}</span>
                                    </div>
                                    {isSectionOpen ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                                </button>
                            ) : (
                                // Standard Link (e.g., /home, /about)
                                <Link
                                    to={link.path}
                                    onClick={() => setIsMobileMenuOpen(false)} // Close menu on click
                                    className={`flex items-center px-3 py-3 text-base font-semibold rounded-lg transition-colors ${
                                        isActive
                                            ? 'bg-blue-50 dark:bg-blue-900/50 text-blue-600 dark:text-cyan-400'
                                            : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                                    }`}
                                >
                                    <span>{link.label}</span>
                                </Link>
                            )}

                            {/* Render Submenu if open */}
                            {isDropdown && isSectionOpen && (
                                <MobileSubMenu links={link.dropdown} />
                            )}
                        </div>
                    );
                })}
            </div>
            
            {/* Get Started Button for Mobile */}
            <div className='px-4 mt-4'>
                <Link
                    to="/auth/login" 
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="block w-full text-center px-5 py-2.5 text-base font-semibold text-white bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 rounded-lg transition-all shadow-md"
                >
                    {t('nav.getStarted')} 
                </Link>
            </div>
        </div>
    );


    return (
        <nav className="fixed top-0 left-0 right-0 z-40 bg-white/90 dark:bg-gray-900/90 backdrop-blur-xl border-b border-gray-100 dark:border-gray-800 shadow-lg transition-colors">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    {/* Logo/Brand */}
                    <Link to="/home" className="flex items-center space-x-2 group">
                        <div className="relative">
                            <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg blur-sm opacity-50 group-hover:opacity-75 transition-opacity" />
                            <Activity className="w-8 h-8 text-blue-600 dark:text-cyan-400 relative z-10 group-hover:scale-110 transition-transform duration-300" />
                        </div>
                        <span className="text-xl font-extrabold bg-gradient-to-r from-blue-600 to-cyan-600 dark:from-cyan-400 dark:to-blue-400 bg-clip-text text-transparent">
                            HealthAI
                        </span>
                    </Link>

                    {/* Desktop Navigation Links */}
                    <div className="hidden md:flex items-center space-x-1">
                        {navLinks.map((link) => {
                            const LinkIcon = link.icon;
                            const isActive = location.pathname.startsWith(link.path) || activeDropdown === link.path;
                            return (
                                <div 
                                    key={link.path}
                                    className="relative h-full flex items-center group/navitem"
                                    onMouseEnter={() => handleMouseEnter(link.path)}
                                    onMouseLeave={handleMouseLeave}
                                >
                                    <Link
                                        to={link.path}
                                        className={`px-4 py-2 rounded-full text-sm font-medium transition-all flex items-center space-x-1 ${
                                            isActive
                                            ? 'bg-blue-50 dark:bg-blue-900/50 text-blue-600 dark:text-cyan-400 shadow-inner'
                                            : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                                        }`}
                                    >
                                        {LinkIcon && <LinkIcon className="w-4 h-4" />}
                                        <span>{link.label}</span>
                                    </Link>
                                    {/* Desktop Dropdown */}
                                    {link.dropdown && activeDropdown === link.path && (
                                        <DropdownMenu links={link.dropdown} />
                                    )}
                                </div>
                            )})}
                    </div>

                    {/* Desktop Get Started Button and Mobile Menu Button Container */}
                    <div className="flex items-center space-x-2">
                        {/* Desktop "Get Started" button */}
                        <Link
                            to="/auth/login" 
                            className="hidden md:block px-5 py-2 text-sm font-semibold text-white bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 rounded-full transition-all shadow-lg hover:shadow-xl transform hover:scale-[1.02]"
                        >
                            {t('nav.getStarted')} 
                        </Link>

                        {/* Mobile Menu Button (Hamburger) */}
                        <button
                            onClick={toggleMobileMenu}
                            className="md:hidden p-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
                        >
                            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                        </button>
                    </div>
                </div>
            </div>
            
            {/* Mobile Menu Content (Conditionally Rendered) */}
            {isMobileMenuOpen && <MobileNavContent />}
        </nav>
    );
}
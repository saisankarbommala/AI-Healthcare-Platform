import { Link, useLocation } from 'react-router-dom';
import { Activity, Menu, X, LogOut } from 'lucide-react';
import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { motion, AnimatePresence } from 'framer-motion';

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const { user, profile, signOut } = useAuth();

  const isActive = (path: string) => location.pathname === path;

  const navLinks = [
    { path: '/', label: 'Home' },
    { path: '/services', label: 'Services' },
    { path: '/about', label: 'About' },
    { path: '/contact', label: 'Contact' },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center space-x-2 group">
            <div className="relative">
              <Activity className="w-8 h-8 text-blue-600 group-hover:text-blue-700 transition-colors" />
              <div className="absolute inset-0 bg-blue-400 blur-lg opacity-0 group-hover:opacity-30 transition-opacity"></div>
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              AI Healthcare
            </span>
          </Link>

          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`text-sm font-medium transition-colors relative group ${
                  isActive(link.path)
                    ? 'text-blue-600'
                    : 'text-gray-600 hover:text-blue-600'
                }`}
              >
                {link.label}
                {isActive(link.path) && (
                  <motion.div
                    layoutId="navbar-indicator"
                    className="absolute -bottom-[21px] left-0 right-0 h-0.5 bg-blue-600"
                  />
                )}
              </Link>
            ))}
            {user && profile ? (
              <div className="flex items-center space-x-4">
                <Link
                  to={
                    profile.role === 'doctor'
                      ? '/doctor/dashboard'
                      : profile.role === 'patient'
                      ? '/patient/dashboard'
                      : '/services'
                  }
                  className="text-sm font-medium text-gray-600 hover:text-blue-600 transition-colors"
                >
                  Dashboard
                </Link>
                <button
                  onClick={signOut}
                  className="flex items-center space-x-1 px-4 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors"
                >
                  <LogOut className="w-4 h-4" />
                  <span className="text-sm font-medium">Logout</span>
                </button>
              </div>
            ) : (
              <Link
                to="/login"
                className="px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:shadow-lg hover:scale-105 transition-all duration-200"
              >
                Login / Signup
              </Link>
            )}
          </div>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-t border-gray-200 bg-white"
          >
            <div className="px-4 py-4 space-y-3">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setIsOpen(false)}
                  className={`block px-4 py-2 rounded-lg transition-colors ${
                    isActive(link.path)
                      ? 'bg-blue-50 text-blue-600'
                      : 'text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              {user && profile ? (
                <>
                  <Link
                    to={
                      profile.role === 'doctor'
                        ? '/doctor/dashboard'
                        : profile.role === 'patient'
                        ? '/patient/dashboard'
                        : '/services'
                    }
                    onClick={() => setIsOpen(false)}
                    className="block px-4 py-2 rounded-lg text-gray-600 hover:bg-gray-50"
                  >
                    Dashboard
                  </Link>
                  <button
                    onClick={() => {
                      signOut();
                      setIsOpen(false);
                    }}
                    className="w-full flex items-center justify-center space-x-1 px-4 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors"
                  >
                    <LogOut className="w-4 h-4" />
                    <span>Logout</span>
                  </button>
                </>
              ) : (
                <Link
                  to="/login"
                  onClick={() => setIsOpen(false)}
                  className="block px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg text-center hover:shadow-lg transition-all"
                >
                  Login / Signup
                </Link>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

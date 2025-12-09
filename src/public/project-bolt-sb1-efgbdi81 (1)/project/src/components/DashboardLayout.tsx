import { ReactNode } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Activity, LogOut } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { motion } from 'framer-motion';

interface DashboardLayoutProps {
  children: ReactNode;
  sidebarLinks: Array<{
    path: string;
    label: string;
    icon: ReactNode;
  }>;
}

export const DashboardLayout = ({ children, sidebarLinks }: DashboardLayoutProps) => {
  const location = useLocation();
  const { profile, signOut } = useAuth();

  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-200">
        <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-8">
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

            <div className="flex items-center space-x-4">
              <div className="text-right">
                <p className="text-sm font-medium text-gray-900">{profile?.full_name}</p>
                <p className="text-xs text-gray-500 capitalize">{profile?.role}</p>
              </div>
              <button
                onClick={signOut}
                className="flex items-center space-x-1 px-4 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors"
              >
                <LogOut className="w-4 h-4" />
                <span className="text-sm font-medium">Logout</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="flex pt-16">
        <aside className="fixed left-0 top-16 h-[calc(100vh-4rem)] w-64 bg-white border-r border-gray-200 overflow-y-auto">
          <div className="p-4 space-y-2">
            {sidebarLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                  isActive(link.path)
                    ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                }`}
              >
                <span className="flex-shrink-0">{link.icon}</span>
                <span className="text-sm font-medium">{link.label}</span>
                {isActive(link.path) && (
                  <motion.div
                    layoutId="sidebar-indicator"
                    className="ml-auto w-2 h-2 bg-white rounded-full"
                  />
                )}
              </Link>
            ))}
          </div>
        </aside>

        <main className="flex-1 ml-64 p-8">
          <div className="max-w-7xl mx-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

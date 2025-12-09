import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { AuthProvider, useAuth } from './context/AuthContext';
import { Preloader } from './components/Preloader';
import { Navbar } from './components/Navbar';
import { Home } from './pages/Home';
import { Services } from './pages/Services';
import { About } from './pages/About';
import { Contact } from './pages/Contact';
import { Login } from './pages/Login';
import { Signup } from './pages/Signup';
import { BodyDashboard } from './pages/body/BodyDashboard';
import { SymptomsChecker } from './pages/body/SymptomsChecker';
import { BodyDataInput } from './pages/body/BodyDataInput';
import { AIAnalyzer } from './pages/body/AIAnalyzer';
import { BodyScore } from './pages/body/BodyScore';
import { RiskLevels } from './pages/body/RiskLevels';
import { HealthPlan } from './pages/body/HealthPlan';
import { HealthReport } from './pages/body/HealthReport';
import { MindDashboard } from './pages/mind/MindDashboard';
import { MoodTracker } from './pages/mind/MoodTracker';
import { DoctorDashboard } from './pages/doctor/DoctorDashboard';
import { PatientDashboard } from './pages/patient/PatientDashboard';

function AppContent() {
  const [showPreloader, setShowPreloader] = useState(true);
  const { loading } = useAuth();

  useEffect(() => {
    const hasSeenPreloader = sessionStorage.getItem('hasSeenPreloader');
    if (hasSeenPreloader) {
      setShowPreloader(false);
    }
  }, []);

  const handlePreloaderComplete = () => {
    sessionStorage.setItem('hasSeenPreloader', 'true');
    setShowPreloader(false);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center">
        <div className="text-white text-xl">Loading...</div>
      </div>
    );
  }

  return (
    <Router>
      <AnimatePresence mode="wait">
        {showPreloader ? (
          <Preloader key="preloader" onComplete={handlePreloaderComplete} />
        ) : (
          <div key="app">
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route
                path="/*"
                element={
                  <>
                    <Navbar />
                    <Routes>
                      <Route path="/" element={<Home />} />
                      <Route path="/services" element={<Services />} />
                      <Route path="/about" element={<About />} />
                      <Route path="/contact" element={<Contact />} />
                      <Route path="/body/dashboard" element={<ProtectedRoute><BodyDashboard /></ProtectedRoute>} />
                      <Route path="/body/symptoms" element={<ProtectedRoute><SymptomsChecker /></ProtectedRoute>} />
                      <Route path="/body/data-input" element={<ProtectedRoute><BodyDataInput /></ProtectedRoute>} />
                      <Route path="/body/analyzer" element={<ProtectedRoute><AIAnalyzer /></ProtectedRoute>} />
                      <Route path="/body/score" element={<ProtectedRoute><BodyScore /></ProtectedRoute>} />
                      <Route path="/body/risk" element={<ProtectedRoute><RiskLevels /></ProtectedRoute>} />
                      <Route path="/body/plan" element={<ProtectedRoute><HealthPlan /></ProtectedRoute>} />
                      <Route path="/body/report" element={<ProtectedRoute><HealthReport /></ProtectedRoute>} />
                      <Route path="/mind/dashboard" element={<ProtectedRoute><MindDashboard /></ProtectedRoute>} />
                      <Route path="/mind/mood" element={<ProtectedRoute><MoodTracker /></ProtectedRoute>} />
                      <Route path="/doctor/dashboard" element={<ProtectedRoute><DoctorDashboard /></ProtectedRoute>} />
                      <Route path="/patient/dashboard" element={<ProtectedRoute><PatientDashboard /></ProtectedRoute>} />
                      <Route path="*" element={<Navigate to="/" replace />} />
                    </Routes>
                  </>
                }
              />
            </Routes>
          </div>
        )}
      </AnimatePresence>
    </Router>
  );
}

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { user } = useAuth();
  return user ? <>{children}</> : <Navigate to="/login" replace />;
}

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;

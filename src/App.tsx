import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from './contexts/ThemeContext';
import { LanguageProvider } from './contexts/LanguageContext';
import { Layout } from './components/Layout';
import { Preloader } from './components/Preloader';
import { Home } from './pages/Home';
import { BodyHub } from './pages/BodyHub';
import { MindHub } from './pages/MindHub';
import { HealthHub } from './pages/HealthHub';
import { About } from './pages/About';
import { Contact } from './pages/Contact';
import { Login } from './pages/Login';
import { Signup } from './pages/Signup';

import { Vitals } from './pages/body/Vitals';
import { SymptomChecker } from './pages/body/SymptomChecker';
import { Telemedicine } from './pages/body/Telemedicine';
import { Appointments } from './pages/body/Appointments';
import { Medicine } from './pages/body/Medicine';
import { Records } from './pages/body/Records';
import { Diet } from './pages/body/Diet';
import { Fitness } from './pages/body/Fitness';

import { MoodTracking } from './pages/mind/MoodTracking';
import { StressAssessment } from './pages/mind/StressAssessment';
import { Meditation } from './pages/mind/Meditation';
import { DailyTasks } from './pages/mind/DailyTasks';
import { Habits } from './pages/mind/Habits';
import { Support } from './pages/mind/Support';
import { Sleep } from './pages/mind/Sleep';

import { Prediction } from './pages/health/Prediction';
import { RiskScore } from './pages/health/RiskScore';
import { Family } from './pages/health/Family';
import { Calendar } from './pages/health/Calendar';
import { Analyzer } from './pages/health/Analyzer';
import { Scanner } from './pages/health/Scanner';
import { Encyclopedia } from './pages/health/Encyclopedia';

function App() {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Preloader />} />

            <Route path="/home" element={<Layout><Home /></Layout>} />
            <Route path="/body" element={<Layout><BodyHub /></Layout>} />
            <Route path="/mind" element={<Layout><MindHub /></Layout>} />
            <Route path="/health" element={<Layout><HealthHub /></Layout>} />
            <Route path="/about" element={<Layout><About /></Layout>} />
            <Route path="/contact" element={<Layout><Contact /></Layout>} />

            <Route path="/body/vitals" element={<Layout><Vitals /></Layout>} />
            <Route path="/body/symptom-checker" element={<Layout><SymptomChecker /></Layout>} />
            <Route path="/body/telemedicine" element={<Layout><Telemedicine /></Layout>} />
            <Route path="/body/appointments" element={<Layout><Appointments /></Layout>} />
            <Route path="/body/medicine" element={<Layout><Medicine /></Layout>} />
            <Route path="/body/records" element={<Layout><Records /></Layout>} />
            <Route path="/body/diet" element={<Layout><Diet /></Layout>} />
            <Route path="/body/fitness" element={<Layout><Fitness /></Layout>} />

            <Route path="/mind/mood-tracking" element={<Layout><MoodTracking /></Layout>} />
            <Route path="/mind/stress-assessment" element={<Layout><StressAssessment /></Layout>} />
            <Route path="/mind/meditation" element={<Layout><Meditation /></Layout>} />
            <Route path="/mind/daily-tasks" element={<Layout><DailyTasks /></Layout>} />
            <Route path="/mind/habits" element={<Layout><Habits /></Layout>} />
            <Route path="/mind/support" element={<Layout><Support /></Layout>} />
            <Route path="/mind/sleep" element={<Layout><Sleep /></Layout>} />

            <Route path="/health/prediction" element={<Layout><Prediction /></Layout>} />
            <Route path="/health/risk-score" element={<Layout><RiskScore /></Layout>} />
            <Route path="/health/family" element={<Layout><Family /></Layout>} />
            <Route path="/health/calendar" element={<Layout><Calendar /></Layout>} />
            <Route path="/health/analyzer" element={<Layout><Analyzer /></Layout>} />
            <Route path="/health/scanner" element={<Layout><Scanner /></Layout>} />
            <Route path="/health/encyclopedia" element={<Layout><Encyclopedia /></Layout>} />

            <Route path="/auth/login" element={<Login />} />
            <Route path="/auth/signup" element={<Signup />} />

            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </BrowserRouter>
      </LanguageProvider>
    </ThemeProvider>
  );
}

export default App;

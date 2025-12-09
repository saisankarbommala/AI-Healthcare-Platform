import { DashboardLayout } from '../../components/DashboardLayout';
import { Stethoscope, Calendar, Users, FileText, Clock, MessageSquare, BarChart3 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

export const DoctorDashboard = () => {
  const sidebarLinks = [
    { path: '/doctor/dashboard', label: 'Dashboard', icon: <Stethoscope className="w-5 h-5" /> },
    { path: '/doctor/appointments', label: 'Appointments', icon: <Calendar className="w-5 h-5" /> },
    { path: '/doctor/patients', label: 'Patients', icon: <Users className="w-5 h-5" /> },
    { path: '/doctor/prescriptions', label: 'Prescriptions', icon: <FileText className="w-5 h-5" /> },
    { path: '/doctor/schedule', label: 'Schedule', icon: <Clock className="w-5 h-5" /> },
    { path: '/doctor/messages', label: 'Messages', icon: <MessageSquare className="w-5 h-5" /> },
    { path: '/doctor/reports', label: 'Reports', icon: <BarChart3 className="w-5 h-5" /> },
  ];

  const stats = [
    { label: 'Today\'s Appointments', value: '12', icon: <Calendar className="w-6 h-6" />, color: 'from-blue-500 to-cyan-500' },
    { label: 'Total Patients', value: '248', icon: <Users className="w-6 h-6" />, color: 'from-green-500 to-emerald-500' },
    { label: 'Pending Prescriptions', value: '5', icon: <FileText className="w-6 h-6" />, color: 'from-orange-500 to-red-500' },
    { label: 'New Messages', value: '18', icon: <MessageSquare className="w-6 h-6" />, color: 'from-purple-500 to-pink-500' },
  ];

  return (
    <DashboardLayout sidebarLinks={sidebarLinks}>
      <div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Doctor Dashboard</h1>
          <p className="text-gray-600">Welcome back, Dr. Smith</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-xl p-6 shadow-lg border border-gray-100"
            >
              <div className={`inline-flex p-3 rounded-lg bg-gradient-to-br ${stat.color} text-white mb-4`}>
                {stat.icon}
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-1">{stat.value}</div>
              <div className="text-sm text-gray-600">{stat.label}</div>
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white rounded-xl p-6 shadow-lg border border-gray-100"
          >
            <h2 className="text-xl font-bold text-gray-900 mb-4">Today's Schedule</h2>
            <div className="space-y-3">
              {[
                { time: '09:00 AM', patient: 'John Doe', type: 'Check-up' },
                { time: '10:30 AM', patient: 'Jane Smith', type: 'Follow-up' },
                { time: '02:00 PM', patient: 'Mike Johnson', type: 'Consultation' },
              ].map((apt, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <div className="font-semibold text-gray-900">{apt.patient}</div>
                    <div className="text-sm text-gray-600">{apt.type}</div>
                  </div>
                  <div className="text-sm font-medium text-blue-600">{apt.time}</div>
                </div>
              ))}
            </div>
            <Link to="/doctor/appointments" className="mt-4 block text-center text-blue-600 hover:text-blue-700 font-medium">
              View All Appointments →
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white rounded-xl p-6 shadow-lg border border-gray-100"
          >
            <h2 className="text-xl font-bold text-gray-900 mb-4">Recent Patients</h2>
            <div className="space-y-3">
              {[
                { name: 'Sarah Wilson', condition: 'Hypertension', lastVisit: '2 days ago' },
                { name: 'Tom Brown', condition: 'Diabetes', lastVisit: '1 week ago' },
                { name: 'Lisa Anderson', condition: 'Asthma', lastVisit: '2 weeks ago' },
              ].map((patient, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <div className="font-semibold text-gray-900">{patient.name}</div>
                    <div className="text-sm text-gray-600">{patient.condition}</div>
                  </div>
                  <div className="text-xs text-gray-500">{patient.lastVisit}</div>
                </div>
              ))}
            </div>
            <Link to="/doctor/patients" className="mt-4 block text-center text-blue-600 hover:text-blue-700 font-medium">
              View All Patients →
            </Link>
          </motion.div>
        </div>
      </div>
    </DashboardLayout>
  );
};

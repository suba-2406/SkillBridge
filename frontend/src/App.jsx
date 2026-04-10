import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import Dashboard from './pages/Dashboard';
import Overview from './pages/Overview';
import LearningPage from './pages/LearningPage';
import ProjectsPage from './pages/ProjectsPage';
import JobsPage from './pages/JobsPage';
import ProfilePage from './pages/ProfilePage';
import CompanyDashboard from './pages/CompanyDashboard';
import CompanyDashboardLayout from './pages/CompanyDashboardLayout';
import ProtectedRoute from './components/ProtectedRoute';
import { UserProvider } from './context/UserContext';

function App() {
  return (
    <UserProvider>
      <BrowserRouter>
        <div className="antialiased selection:bg-mint/30">
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            
            {/* Student Dashboard Routes */}
            <Route 
              path="/dashboard" 
              element={
                <ProtectedRoute allowedRole="student">
                  <Dashboard />
                </ProtectedRoute>
              }
            >
              <Route index element={<Overview />} />
              <Route path="learning" element={<LearningPage />} />
              <Route path="projects" element={<ProjectsPage />} />
              <Route path="jobs" element={<JobsPage />} />
              <Route path="profile" element={<ProfilePage />} />
            </Route>

            {/* Company Dashboard Routes */}
            <Route 
              path="/company-dashboard" 
              element={
                <ProtectedRoute allowedRole="company">
                  <CompanyDashboardLayout />
                </ProtectedRoute>
              }
            >
              <Route index element={<CompanyDashboard />} />
            </Route>

            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </div>
      </BrowserRouter>
    </UserProvider>
  );
}

export default App;



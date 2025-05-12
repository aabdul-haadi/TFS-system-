import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { DataProvider } from './contexts/DataContext';
import { Toaster } from 'sonner';

// Components
import Layout from './components/Layout';

// Landing Page Components
import Header from './landingpage/components/Header';
import Hero from './landingpage/components/Hero';
import About from './landingpage/components/About';
import Classes from './landingpage/components/Classes';
import Facilities from './landingpage/components/Facilities';
import Achievements from './landingpage/components/Achievements';
import Contact from './landingpage/components/Contact';
import Footer from './landingpage/components/Footer';

// CRM Pages
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import StudentList from './pages/student/StudentList';
import StudentForm from './pages/student/StudentForm';
import StudentDetail from './pages/student/StudentDetail';
import TeacherList from './pages/teacher/TeacherList';
import TeacherForm from './pages/teacher/TeacherForm';
import TeacherDetail from './pages/teacher/TeacherDetail';
import FeeList from './pages/fee/FeeList';
import StudentFees from './pages/fee/StudentFees';
import ClassSchedule from './pages/schedule/ClassSchedule';

// Protected Route component
const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAuthenticated } = useAuth();
  
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  
  return <>{children}</>;
};

// Main AppContent with combined routing
const AppContent: React.FC = () => {
  const { isAuthenticated } = useAuth();
  
  return (
    <Routes>
      {/* 🌐 Landing Page Route - Default for all visitors */}
      <Route path="/" element={
  <div className="landing-page-container font-sans bg-gray-900 text-white">
          <Header />
          <Hero />
          <About />
          <Classes />
          <Facilities />
          <Achievements />
          <Contact />
          <Footer />
        </div>
      } />

      {/* 🚪 Login Route - Redirect to Dashboard if authenticated */}
      <Route path="/login" element={isAuthenticated ? <Navigate to="/dashboard" replace /> : <Login />} />
      
      {/* 🔒 Protected Routes - CRM Section */}
      <Route path="/dashboard" element={
        <ProtectedRoute>
          <Layout>
            <Dashboard />
          </Layout>
        </ProtectedRoute>
      } />
      
      {/* 📚 Student Routes */}
      <Route path="/students" element={
        <ProtectedRoute>
          <Layout>
            <StudentList />
          </Layout>
        </ProtectedRoute>
      } />
      <Route path="/students/add" element={
        <ProtectedRoute>
          <Layout>
            <StudentForm />
          </Layout>
        </ProtectedRoute>
      } />
      <Route path="/students/:studentId" element={
        <ProtectedRoute>
          <Layout>
            <StudentDetail />
          </Layout>
        </ProtectedRoute>
      } />
      <Route path="/students/:studentId/edit" element={
        <ProtectedRoute>
          <Layout>
            <StudentForm />
          </Layout>
        </ProtectedRoute>
      } />

      {/* 👨‍🏫 Teacher Routes */}
      <Route path="/teachers" element={
        <ProtectedRoute>
          <Layout>
            <TeacherList />
          </Layout>
        </ProtectedRoute>
      } />
      <Route path="/teachers/add" element={
        <ProtectedRoute>
          <Layout>
            <TeacherForm />
          </Layout>
        </ProtectedRoute>
      } />
      <Route path="/teachers/:teacherId" element={
        <ProtectedRoute>
          <Layout>
            <TeacherDetail />
          </Layout>
        </ProtectedRoute>
      } />
      <Route path="/teachers/:teacherId/edit" element={
        <ProtectedRoute>
          <Layout>
            <TeacherForm />
          </Layout>
        </ProtectedRoute>
      } />

      {/* 💰 Fee Routes */}
      <Route path="/fees" element={
        <ProtectedRoute>
          <Layout>
            <FeeList />
          </Layout>
        </ProtectedRoute>
      } />
      <Route path="/fees/student/:studentId" element={
        <ProtectedRoute>
          <Layout>
            <StudentFees />
          </Layout>
        </ProtectedRoute>
      } />
      
      {/* 📅 Schedule Routes */}
      <Route path="/schedule" element={
        <ProtectedRoute>
          <Layout>
            <ClassSchedule />
          </Layout>
        </ProtectedRoute>
      } />
      
      {/* 🚦 Catch-All Route - Redirect to Landing Page */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

// Main App Component with Providers
function App() {
  return (
    <Router>
      <AuthProvider>
        <DataProvider>
          <AppContent />
        </DataProvider>
      </AuthProvider>
      <Toaster position="top-right" expand={true} richColors />
    </Router>
  );
}

export default App;

import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { DataProvider } from './contexts/DataContext';
import { Toaster } from 'sonner';

// Components
import Layout from './components/Layout';

// Pages
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

const AppContent: React.FC = () => {
  const { isAuthenticated } = useAuth();
  
  return (
    <>
      <Routes>
        <Route path="/login" element={isAuthenticated ? <Navigate to="/dashboard" replace /> : <Login />} />
        
        <Route path="/dashboard" element={
          <ProtectedRoute>
            <Layout>
              <Dashboard />
            </Layout>
          </ProtectedRoute>
        } />
        
        {/* Student Routes */}
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
        
        {/* Teacher Routes */}
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
        
        {/* Fee Routes */}
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
        
        {/* Schedule Routes */}
        <Route path="/schedule" element={
          <ProtectedRoute>
            <Layout>
              <ClassSchedule />
            </Layout>
          </ProtectedRoute>
        } />
        
        {/* Default route */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
      <Toaster position="top-right" expand={true} richColors />
    </>
  );
};

function App() {
  return (
    <Router>
      <AuthProvider>
        <DataProvider>
          <AppContent />
        </DataProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
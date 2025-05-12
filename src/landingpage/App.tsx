import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Classes from './components/Classes';
import Facilities from './components/Facilities';
import Achievements from './components/Achievements';
import Contact from './components/Contact';
import Footer from './components/Footer';
import Login from './components/Login';
import AdminDashboard from './components/AdminDashboard';

function App() {
  useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `
      @keyframes fade-in {
        from {
          opacity: 0;
          transform: translateY(20px);
        }
        to {
          opacity: 1;
          transform: translateY(0);
        }
      }

      @keyframes scale-in {
        from {
          opacity: 0;
          transform: scale(0.9);
        }
        to {
          opacity: 1;
          transform: scale(1);
        }
      }

      .animate-fade-in {
        opacity: 1 !important;
        transform: translateY(0) !important;
      }

      .animate-scale-in {
        animation: scale-in 0.3s ease-out forwards;
      }
    `;
    document.head.appendChild(style);
    document.title = 'The Florence School';

    return () => {
      document.head.removeChild(style);
    };
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route
          path="/"
          element={
            <div className="font-sans bg-gray-900 text-white">
              <Header />
              <Hero />
              <About />
              <Classes />
              <Facilities />
              <Achievements />
              <Contact />
              <Footer />
            </div>
          }
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
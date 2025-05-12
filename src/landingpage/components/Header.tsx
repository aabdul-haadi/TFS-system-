import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Menu, X, LogIn } from 'lucide-react';
import { motion } from 'framer-motion';
import { NavItem } from '../types';


const navItems: NavItem[] = [
  { name: 'Home', href: '#home' },
  { name: 'About', href: '#about' },
  { name: 'Classes', href: '#classes' },
  { name: 'Facilities', href: '#facilities' },
  { name: 'Contact', href: '#contact' },
];

const Header: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [showDialog, setShowDialog] = useState(false); // Show the dialog for verification code
  const [verificationCode, setVerificationCode] = useState(''); // Store the verification code
  const [errorMessage, setErrorMessage] = useState(''); // Store error message
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsOpen(false);
    }
  };

  // Handle the click for the Admin Login
  const handleAdminLoginClick = () => {
    setShowDialog(true); // Show the verification dialog
  };

  // Handle the verification code submission
  const handleVerificationSubmit = () => {
    const defaultCode = '1001'; // Default verification code
    if (verificationCode === defaultCode) {
      setShowDialog(false); // Close the dialog
      navigate('/login'); // Redirect to the login page
    } else {
      setErrorMessage('Invalid code. Please try again.');
    }
  };

  // Handle closing the verification dialog
  const handleVerificationClose = () => {
    setShowDialog(false); // Close the dialog
    setErrorMessage(''); // Clear error message
  };

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed w-full z-50 transition-all duration-300 ${
        scrolled ? 'bg-gray-900/95 backdrop-blur-sm shadow-lg py-2' : 'bg-transparent py-4'
      }`}
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex justify-between items-center">
          <motion.a
            href="#home"
            className="flex items-center space-x-2"
            whileHover={{ scale: 1.05 }}
          >
            <img src="src/logo.png" alt="School Logo" className="h-12 w-12" />
            <span className={`text-2xl font-serif font-bold ${scrolled ? 'text-white' : 'text-white'}`}>
              The Florence School
            </span>
          </motion.a>

          <nav className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <motion.a
                key={item.name}
                href={item.href}
                onClick={(e) => scrollToSection(e, item.href)}
                className={`${
                  scrolled ? 'text-gray-300 hover:text-white' : 'text-white hover:text-blue-400'
                } transition-colors duration-300 font-medium`}
                whileHover={{ scale: 1.1 }}
              >
                {item.name}
              </motion.a>
            ))}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={handleAdminLoginClick} // Open verification dialog on click
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-full flex items-center space-x-2 transition-colors duration-300"
            >
              <LogIn className="h-5 w-5" />
              <span>Admin</span>
            </motion.button>
          </nav>

          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            type="button"
            className="md:hidden"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="h-6 w-6 text-white" /> : <Menu className="h-6 w-6 text-white" />}
          </motion.button>
        </div>

        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="md:hidden mt-4 bg-gray-800 rounded-lg shadow-lg overflow-hidden"
          >
            <nav className="flex flex-col">
              {navItems.map((item) => (
                <motion.a
                  key={item.name}
                  href={item.href}
                  onClick={(e) => scrollToSection(e, item.href)}
                  className="px-4 py-3 text-gray-300 hover:bg-gray-700 hover:text-white transition-colors duration-300"
                  whileHover={{ x: 10 }}
                >
                  {item.name}
                </motion.a>
              ))}
              <motion.button
                whileHover={{ x: 10 }}
                onClick={handleAdminLoginClick} // Open verification dialog on click
                className="px-4 py-3 text-left text-gray-300 hover:bg-gray-700 hover:text-white transition-colors duration-300 flex items-center space-x-2"
              >
                <LogIn className="h-5 w-5" />
                <span>Admin Login</span>
              </motion.button>
            </nav>
          </motion.div>
        )}
      </div>

      {/* Verification Dialog */}
      {showDialog && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-xl font-bold mb-4">Admin Verification</h2>
            <input
              type="text"
              className="border border-gray-300 p-2 mb-4 w-full"
              placeholder="Enter verification code"
              value={verificationCode}
              onChange={(e) => setVerificationCode(e.target.value)}
            />
            {errorMessage && <p className="text-red-500 text-sm mb-4">{errorMessage}</p>}
            <div className="flex justify-between">
              <button
                onClick={handleVerificationSubmit}
                className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
              >
                Verify
              </button>
              <button
                onClick={handleVerificationClose}
                className="bg-gray-300 text-black py-2 px-4 rounded hover:bg-gray-400"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </motion.header>
  );
};

export default Header;

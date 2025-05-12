import React from 'react';
import { Facebook, Twitter, Instagram, Youtube} from 'lucide-react';
import { motion } from 'framer-motion';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex items-center space-x-2 mb-4">
              <img src="/src/logo.png" alt="School Logo" className="h-12 w-12 object-contain" />
              <span className="text-2xl font-serif font-bold">The Florence School</span>
            </div>
            <p className="text-gray-400 mb-6">
              Nurturing minds, inspiring futures. A prestigious educational institution where excellence meets innovation.
            </p>
            <div className="flex space-x-4">
              <motion.a 
                whileHover={{ scale: 1.1, color: "#1DA1F2" }}
                href="#" 
                className="text-gray-400 transition-colors duration-300"
              >
                <Facebook className="h-6 w-6" />
              </motion.a>
              <motion.a 
                whileHover={{ scale: 1.1, color: "#1DA1F2" }}
                href="#" 
                className="text-gray-400 transition-colors duration-300"
              >
                <Twitter className="h-6 w-6" />
              </motion.a>
              <motion.a 
                whileHover={{ scale: 1.1, color: "#E1306C" }}
                href="#" 
                className="text-gray-400 transition-colors duration-300"
              >
                <Instagram className="h-6 w-6" />
              </motion.a>
              <motion.a 
                whileHover={{ scale: 1.1, color: "#FF0000" }}
                href="#" 
                className="text-gray-400 transition-colors duration-300"
              >
                <Youtube className="h-6 w-6" />
              </motion.a>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h3 className="text-xl font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {['Home', 'About', 'Classes', 'Facilities', 'Contact'].map((item) => (
                <motion.li key={item} whileHover={{ x: 5 }}>
                  <a href={`#${item.toLowerCase()}`} className="text-gray-400 hover:text-blue-400 transition-colors duration-300">
                    {item}
                  </a>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <h3 className="text-xl font-bold mb-4">Programs</h3>
            <ul className="space-y-2">
              {['Nursery', 'Kindergarten', 'Primary School', 'High School'].map((item) => (
                <motion.li key={item} whileHover={{ x: 5 }}>
                  <a href="#classes" className="text-gray-400 hover:text-blue-400 transition-colors duration-300">
                    {item}
                  </a>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <h3 className="text-xl font-bold mb-4">Contact Info</h3>
            <address className="not-italic text-gray-400 space-y-2">
              <p>123 Education Avenue</p>
              <p>Florence City, FC 54321</p>
              <p>Phone: +1 (555) 123-4567</p>
              <p>Email: <a href="mailto:info@florenceschool.edu" className="hover:text-blue-400 transition-colors duration-300">info@florenceschool.edu</a></p>
            </address>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.8 }}
          className="border-t border-gray-800 mt-12 pt-6 text-center text-gray-500"
        >
          <p>&copy; {new Date().getFullYear()} The Florence School. All rights reserved.</p>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
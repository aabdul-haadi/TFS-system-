import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, CheckCircle, ExternalLink, MessageCircle } from 'lucide-react';
import { ClassItem } from '../types';

interface ClassDetailsProps {
  classItem: ClassItem;
  onClose: () => void;
  isOpen: boolean;
}

const ClassDetails: React.FC<ClassDetailsProps> = ({ classItem, onClose, isOpen }) => {
  const handleEnrollClick = () => {
    window.open(`https://wa.me/+1234567890?text=Hi, I'm interested in enrolling in the ${classItem.name} class.`, '_blank');
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="bg-gray-900 rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto border border-gray-800"
            onClick={e => e.stopPropagation()}
          >
            <div className="relative">
              <motion.img
                initial={{ scale: 1.1 }}
                animate={{ scale: 1 }}
                src={classItem.image}
                alt={classItem.name}
                className="w-full h-72 object-cover object-center rounded-t-2xl"
              />
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={onClose}
                className="absolute top-4 right-4 bg-gray-900/80 rounded-full p-2 hover:bg-gray-800 transition-colors duration-200"
                aria-label="Close details"
              >
                <X className="h-6 w-6 text-white" />
              </motion.button>
            </div>

            <div className="p-8">
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                <h3 className="text-4xl font-serif font-bold text-white mb-2">{classItem.name}</h3>
                <p className="text-amber-500 font-medium text-lg mb-6">{classItem.ageGroup}</p>
                <p className="text-gray-300 text-lg leading-relaxed mb-8">{classItem.description}</p>
              </motion.div>

              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                <h4 className="text-2xl font-bold text-white mb-6">Program Highlights</h4>
                <div className="grid md:grid-cols-2 gap-4">
                  {classItem.highlights.map((highlight, index) => (
                    <motion.div
                      key={index}
                      initial={{ x: -20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: 0.4 + index * 0.1 }}
                      className="flex items-center space-x-3 bg-gray-800/50 p-4 rounded-lg"
                    >
                      <CheckCircle className="h-5 w-5 text-amber-500 flex-shrink-0" />
                      <span className="text-gray-300">{highlight}</span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="mt-10 flex flex-col sm:flex-row justify-center gap-4"
              >
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleEnrollClick}
                  className="bg-green-600 hover:bg-green-700 text-white font-bold px-8 py-4 rounded-full shadow-lg transition-colors duration-300 flex items-center justify-center gap-2"
                >
                  <MessageCircle className="h-5 w-5" />
                  <span>Enroll Now</span>
                </motion.button>
                
                <motion.a
                  href={classItem.image}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-8 py-4 rounded-full shadow-lg transition-colors duration-300 flex items-center justify-center gap-2"
                >
                  <ExternalLink className="h-5 w-5" />
                  <span>View Course</span>
                </motion.a>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ClassDetails;
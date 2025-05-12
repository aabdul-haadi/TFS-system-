import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { classesData } from '../data/classes';
import { ClassItem } from '../types';
import ClassDetails from './ClassDetails';

const Classes: React.FC = () => {
  const [selectedClass, setSelectedClass] = useState<ClassItem | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.43, 0.13, 0.23, 0.96]
      }
    }
  };

  const openClassDetails = (classItem: ClassItem) => {
    setSelectedClass(classItem);
    setIsModalOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const closeClassDetails = () => {
    setIsModalOpen(false);
    document.body.style.overflow = 'auto';
  };

  return (
    <section id="classes" className="py-20 bg-gradient-to-b from-gray-800 to-gray-900">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600 mb-4">
            Our Classes
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-amber-400 to-amber-600 mx-auto mb-8"></div>
          <p className="max-w-3xl mx-auto text-gray-300">
            From nursery to matriculation, our educational programs are designed to meet the unique needs of students at every stage of their development.
          </p>
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {classesData.map((classItem) => (
            <motion.div
              key={classItem.id}
              variants={item}
              whileHover={{ scale: 1.03 }}
              className="group relative bg-gray-800 rounded-xl shadow-xl overflow-hidden cursor-pointer transform transition-all duration-300"
              onClick={() => openClassDetails(classItem)}
            >
              <div className="relative h-64 overflow-hidden">
                <motion.img
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.6 }}
                  src={classItem.image}
                  alt={classItem.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileHover={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className="absolute bottom-0 left-0 right-0 p-6 text-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-300"
                >
                  <h3 className="text-2xl font-bold mb-2">{classItem.name}</h3>
                  <p className="text-amber-400">{classItem.ageGroup}</p>
                  <ul className="mt-4 space-y-2">
                    {classItem.highlights.slice(0, 3).map((highlight, index) => (
                      <li key={index} className="flex items-center text-sm">
                        <span className="w-1.5 h-1.5 bg-amber-400 rounded-full mr-2"></span>
                        {highlight}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-white mb-2">{classItem.name}</h3>
                <p className="text-amber-400 text-sm font-medium mb-4">{classItem.ageGroup}</p>
                <p className="text-gray-300 line-clamp-3">{classItem.description}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {selectedClass && (
        <ClassDetails
          classItem={selectedClass}
          onClose={closeClassDetails}
          isOpen={isModalOpen}
        />
      )}
    </section>
  );
};

export default Classes;
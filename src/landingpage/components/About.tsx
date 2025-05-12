import React, { useEffect, useRef } from 'react';
import { CheckCircle, Award, BookOpen } from 'lucide-react';
import { motion } from 'framer-motion';

const About: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  
  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  return (
    <section 
      id="about" 
      ref={sectionRef}
      className="py-20 bg-gradient-to-b from-gray-900 to-gray-800"
    >
      <div className="container mx-auto px-4">
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600 mb-4">
            About Our School
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-amber-400 to-amber-600 mx-auto mb-8"></div>
          <p className="max-w-3xl mx-auto text-gray-300">
            Founded on principles of academic excellence and character development, The Florence School has been nurturing young minds since 1985, creating a legacy of success and innovation in education.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="relative"
          >
            <motion.div
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <img 
                src="https://images.pexels.com/photos/2982449/pexels-photo-2982449.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" 
                alt="School building" 
                className="rounded-2xl shadow-2xl w-full h-auto object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent rounded-2xl"></div>
            </motion.div>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="space-y-8"
          >
            {[
              {
                icon: <CheckCircle className="h-8 w-8 text-blue-400" />,
                title: "Excellence in Education",
                description: "Our curriculum is designed to challenge students academically while fostering creativity and critical thinking skills essential for success in today's world."
              },
              {
                icon: <Award className="h-8 w-8 text-purple-400" />,
                title: "Holistic Development",
                description: "We believe in nurturing well-rounded individuals through a balance of academics, sports, arts, and character development activities."
              },
              {
                icon: <BookOpen className="h-8 w-8 text-amber-400" />,
                title: "Innovative Teaching",
                description: "Our experienced faculty employs innovative teaching methodologies that engage students and make learning an enjoyable and meaningful experience."
              }
            ].map((item, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                className="flex items-start space-x-4 bg-gray-800/50 p-6 rounded-xl hover:bg-gray-800 transition-colors duration-300"
              >
                <div className="mt-1 flex-shrink-0">
                  {item.icon}
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white mb-2">{item.title}</h3>
                  <p className="text-gray-300">{item.description}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
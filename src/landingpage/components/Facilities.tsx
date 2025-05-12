import React from 'react';
import { FlaskRound as Flask, Computer } from 'lucide-react';
import { motion } from 'framer-motion';
import img from './facilities.jpg'; // Import the background image
import compImg from './comp.jpeg'; // Import the Computer Labs image
import labImg from './lab.jpeg';  // Import the Science Laboratories image

interface FacilityProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  image: string;
}

const facilities: FacilityProps[] = [
  {
    icon: <Computer className="h-12 w-12" />,
    title: "Computer Labs",
    description: "State-of-the-art computer labs equipped with the latest technology to develop essential digital literacy skills.",
    image: compImg, // Using the imported image for Computer Labs
  },
  {
    icon: <Flask className="h-12 w-12" />,
    title: "Science Laboratories",
    description: "Fully equipped science labs that provide hands-on learning experiences in physics, chemistry, and biology.",
    image: labImg, // Using the imported image for Science Laboratories
  },
];

const Facilities: React.FC = () => {
  return (
    <section id="facilities" className="py-20 bg-gradient-to-b from-gray-800 to-gray-900 relative">
      {/* Preload background image */}
      <link rel="preload" href={img} as="image" type="image/jpeg" />

      <div className="absolute inset-0 bg-cover bg-fixed opacity-5" style={{ backgroundImage: `url(${img})` }}></div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600 mb-4">
            Our Facilities
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-amber-400 to-amber-600 mx-auto mb-8"></div>
          <p className="max-w-3xl mx-auto text-gray-300">
            We provide state-of-the-art facilities designed to enhance learning experiences and support the holistic development of our students.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8">
          {facilities.map((facility, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.02 }}
              className="group relative overflow-hidden rounded-xl bg-transparent backdrop-blur-sm border border-gray-700"
            >
              <div className="absolute inset-0">
                {/* Preload image for each facility */}
                <link rel="preload" href={facility.image} as="image" type="image/jpeg" />
                <img
                  src={facility.image}
                  alt={facility.title}
                  className="w-full h-full object-cover opacity-60 group-hover:opacity-80 transition-opacity duration-300"
                  loading="lazy" // Lazy load the image
                />
                <div className="absolute inset-0 bg-gradient-to-b from-gray-900/60 to-transparent"></div>
              </div>
              
              <div className="relative p-8">
                <div className="flex items-center space-x-4 mb-4">
                  <div className="p-3 rounded-xl bg-gradient-to-br from-blue-600 to-purple-600 text-white">
                    {facility.icon}
                  </div>
                  <h3 className="text-2xl font-bold text-white">{facility.title}</h3>
                </div>
                <p className="text-gray-300 text-lg">{facility.description}</p>
                
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="mt-6"
                >
                  {/* <button className="px-6 py-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-lg transition-all duration-300">
                    Learn More
                  </button> */}
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Facilities;

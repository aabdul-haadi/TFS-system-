import React from 'react';
import { Library, FlaskRound as Flask, Computer, Book } from 'lucide-react';
import { motion } from 'framer-motion';

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
    image: "https://images.pexels.com/photos/1181244/pexels-photo-1181244.jpeg"
  },
  {
    icon: <Flask className="h-12 w-12" />,
    title: "Science Laboratories",
    description: "Fully equipped science labs that provide hands-on learning experiences in physics, chemistry, and biology.",
    image: "https://images.pexels.com/photos/2280571/pexels-photo-2280571.jpeg"
  },
  {
    icon: <Library className="h-12 w-12" />,
    title: "Modern Library",
    description: "A vast collection of books, digital resources, and quiet study spaces for research and learning.",
    image: "https://images.pexels.com/photos/1290141/pexels-photo-1290141.jpeg"
  },
  {
    icon: <Book className="h-12 w-12" />,
    title: "Activity Rooms",
    description: "Specially designed spaces for extracurricular activities, clubs, and collaborative learning projects.",
    image: "https://images.pexels.com/photos/8471799/pexels-photo-8471799.jpeg"
  }
];

const Facilities: React.FC = () => {
  return (
    <section id="facilities" className="py-20 bg-gradient-to-b from-gray-800 to-gray-900 relative">
      <div className="absolute inset-0 bg-[url('https://images.pexels.com/photos/2982449/pexels-photo-2982449.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1')] bg-cover bg-fixed opacity-5"></div>
      
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
              className="group relative overflow-hidden rounded-xl bg-gray-800/50 backdrop-blur-sm border border-gray-700"
            >
              <div className="absolute inset-0">
                <img
                  src={facility.image}
                  alt={facility.title}
                  className="w-full h-full object-cover opacity-20 group-hover:opacity-30 transition-opacity duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-gray-900/80 to-gray-900/90"></div>
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
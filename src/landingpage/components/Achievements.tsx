import React from 'react';
import { Trophy, Users, Star, Award } from 'lucide-react';
import CountUp from 'react-countup';
import { motion } from 'framer-motion';

const achievements = [
  {
    icon: <Trophy className="w-12 h-12 text-yellow-400" />,
    number: 95,
    suffix: "%",
    title: "Success Rate",
    description: "Of our students achieve their academic goals"
  },
  {
    icon: <Users className="w-12 h-12 text-blue-400" />,
    number: 200,
    suffix: "+",
    title: "Students",
    description: "Have graduated from our institution"
  },
  {
    icon: <Star className="w-12 h-12 text-purple-400" />,
    number: 10,
    suffix: "+",
    title: "Awards",
    description: "For academic and extracurricular excellence"
  },
  {
    icon: <Award className="w-12 h-12 text-green-400" />,
    number: 100,
    suffix: "%",
    title: "Qualified Teachers",
    description: "Dedicated to student success"
  }
];

const Achievements = () => {
  return (
    <section id="achievements" className="py-20 bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-white mb-4">Our Achievements</h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            We take pride in our accomplishments and the success of our students. Here are some of our notable achievements.
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {achievements.map((achievement, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ scale: 1.05 }}
              className="bg-gray-800 rounded-lg p-8 text-center transform transition-all duration-300 ease-in-out hover:shadow-xl"
            >
              <motion.div 
                className="flex justify-center mb-4"
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                {achievement.icon}
              </motion.div>
              <h3 className="text-3xl font-bold text-white mb-2">
                <CountUp
                  end={achievement.number}
                  duration={2.5}
                  suffix={achievement.suffix}
                  enableScrollSpy
                  scrollSpyOnce
                />
              </h3>
              <h4 className="text-xl font-semibold text-gray-200 mb-2">
                {achievement.title}
              </h4>
              <p className="text-gray-400">
                {achievement.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Achievements;
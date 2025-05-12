import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { LogOut } from 'lucide-react';

const AdminDashboard: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-7xl mx-auto"
      >
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center space-x-4">
            <img src="/src/logo.png" alt="School Logo" className="w-12 h-12" />
            <h1 className="text-2xl font-bold">Admin Dashboard</h1>
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate('/')}
            className="flex items-center space-x-2 bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg transition-colors duration-200"
          >
            <LogOut className="h-5 w-5" />
            <span>Logout</span>
          </motion.button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="bg-gray-800 p-6 rounded-xl"
          >
            <h2 className="text-xl font-bold mb-4">Quick Stats</h2>
            <div className="space-y-2">
              <p>Total Students: 1,200</p>
              <p>Total Classes: 24</p>
              <p>Faculty Members: 85</p>
            </div>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.02 }}
            className="bg-gray-800 p-6 rounded-xl"
          >
            <h2 className="text-xl font-bold mb-4">Recent Updates</h2>
            <div className="space-y-2">
              <p>New admission requests: 15</p>
              <p>Pending inquiries: 8</p>
              <p>Events this week: 3</p>
            </div>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.02 }}
            className="bg-gray-800 p-6 rounded-xl"
          >
            <h2 className="text-xl font-bold mb-4">System Status</h2>
            <div className="space-y-2">
              <p>Website: Online</p>
              <p>Database: Connected</p>
              <p>Last backup: 2 hours ago</p>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default AdminDashboard;
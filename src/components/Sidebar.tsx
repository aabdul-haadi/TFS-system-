import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { School, Users, BookOpen, DollarSign, LayoutDashboard, LogOut, Calendar, ArrowUpRight, Undo2 } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useData } from '../contexts/DataContext';

const Sidebar: React.FC = () => {
  const { logout } = useAuth();
  const { promoteAllClasses, undoPromotion } = useData();
  const [showPromoteDialog, setShowPromoteDialog] = useState(false);
  const [promotionCode, setPromotionCode] = useState('');

  const handlePromote = () => {
    if (promotionCode === '001') {
      if (window.confirm('Are you sure you want to promote all students? This action will move students to their next respective classes.')) {
        promoteAllClasses();
        setShowPromoteDialog(false);
        setPromotionCode('');
        alert('All students have been promoted successfully!');
      }
    } else {
      alert('Invalid promotion code!');
    }
  };

  const handleUndo = () => {
    if (window.confirm('Are you sure you want to undo the last promotion?')) {
      undoPromotion();
      alert('Last promotion has been undone successfully!');
    }
  };

  return (
    <div className="h-screen w-64 bg-gradient-to-b from-primary-800 to-primary-900 text-white flex flex-col fixed">
      <div className="p-6 flex items-center space-x-3">
        <School className="h-8 w-8" />
        <div>
          <h1 className="font-bold text-xl">The Florence</h1>
          <p className="text-xs text-primary-200">School Management</p>
        </div>
      </div>
      
      <div className="flex-1 px-4 py-4">
        <p className="text-xs text-primary-300 mb-4 pl-4">MENU</p>
        <nav className="space-y-1">
          <NavLink 
            to="/dashboard" 
            className={({isActive}) => 
              `flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                isActive 
                  ? 'bg-primary-700/50 text-white' 
                  : 'text-primary-200 hover:bg-primary-700/30 hover:text-white'
              }`
            }
          >
            <LayoutDashboard className="h-5 w-5" />
            <span>Dashboard</span>
          </NavLink>
          
          <NavLink 
            to="/students" 
            className={({isActive}) => 
              `flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                isActive 
                  ? 'bg-primary-700/50 text-white' 
                  : 'text-primary-200 hover:bg-primary-700/30 hover:text-white'
              }`
            }
          >
            <Users className="h-5 w-5" />
            <span>Students</span>
          </NavLink>
          
          <NavLink 
            to="/teachers" 
            className={({isActive}) => 
              `flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                isActive 
                  ? 'bg-primary-700/50 text-white' 
                  : 'text-primary-200 hover:bg-primary-700/30 hover:text-white'
              }`
            }
          >
            <BookOpen className="h-5 w-5" />
            <span>Teachers</span>
          </NavLink>
          
          <NavLink 
            to="/fees" 
            className={({isActive}) => 
              `flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                isActive 
                  ? 'bg-primary-700/50 text-white' 
                  : 'text-primary-200 hover:bg-primary-700/30 hover:text-white'
              }`
            }
          >
            <DollarSign className="h-5 w-5" />
            <span>Fees</span>
          </NavLink>

          <NavLink 
            to="/schedule" 
            className={({isActive}) => 
              `flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                isActive 
                  ? 'bg-primary-700/50 text-white' 
                  : 'text-primary-200 hover:bg-primary-700/30 hover:text-white'
              }`
            }
          >
            <Calendar className="h-5 w-5" />
            <span>Schedule</span>
          </NavLink>
        </nav>

        <div className="mt-8 space-y-2">
          <button
            onClick={() => setShowPromoteDialog(true)}
            className="flex items-center space-x-3 w-full px-4 py-3 rounded-lg bg-green-600 hover:bg-green-700 text-white transition-colors"
          >
            <ArrowUpRight className="h-5 w-5" />
            <span>Promote Classes</span>
          </button>

          <button
            onClick={handleUndo}
            className="flex items-center space-x-3 w-full px-4 py-3 rounded-lg bg-yellow-600 hover:bg-yellow-700 text-white transition-colors"
          >
            <Undo2 className="h-5 w-5" />
            <span>Undo Promotion</span>
          </button>
        </div>
      </div>
      
      <div className="p-4 border-t border-primary-700">
        <button 
          onClick={logout}
          className="flex items-center space-x-3 w-full px-4 py-3 rounded-lg text-primary-200 hover:bg-primary-700/30 hover:text-white transition-colors"
        >
          <LogOut className="h-5 w-5" />
          <span>Logout</span>
        </button>
      </div>

      {showPromoteDialog && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
          <div className="bg-white rounded-lg p-6 w-96">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Promote All Classes</h2>
            <p className="text-gray-600 mb-4">Please enter the promotion code to continue:</p>
            <input
              type="text"
              value={promotionCode}
              onChange={(e) => setPromotionCode(e.target.value)}
              placeholder="Enter code (001)"
              className="w-full px-3 py-2 border border-gray-300 rounded-md mb-4 text-gray-800"
            />
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => {
                  setShowPromoteDialog(false);
                  setPromotionCode('');
                }}
                className="px-4 py-2 text-gray-600 hover:text-gray-800"
              >
                Cancel
              </button>
              <button
                onClick={handlePromote}
                className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
              >
                Promote
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Sidebar;
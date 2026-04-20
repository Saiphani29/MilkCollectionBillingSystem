import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Milk, Lock, User, UserCheck } from 'lucide-react';
import { motion } from 'framer-motion';

const Login = () => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate login for now - store in localStorage for persistence
    const user = {
      username: userId,
      role: isAdmin ? 'admin' : 'seller',
      name: isAdmin ? 'System Admin' : 'Dairy Farmer'
    };

    if (isAdmin) {
      if (userId === 'admin' && password === 'admin') {
        localStorage.setItem('user', JSON.stringify(user));
        navigate('/admin/dashboard');
      } else {
        alert('Invalid admin credentials');
      }
    } else {
      // For sellers, we'll allow any code for this demo, or check seeded data
      localStorage.setItem('user', JSON.stringify(user));
      navigate('/seller/dashboard');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-950 p-4">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass p-8 w-full max-w-md shadow-2xl"
      >
        <div className="flex flex-col items-center mb-8">
          <div className="bg-blue-600 p-4 rounded-2xl shadow-xl shadow-blue-500/20 mb-4">
            <Milk className="text-white" size={32} />
          </div>
          <h1 className="text-3xl font-bold gradient-text">DairySoft Pro</h1>
          <p className="text-slate-500 text-sm mt-2">Sign in to manage your dairy business</p>
        </div>

        <div className="flex gap-2 mb-8 bg-slate-200 dark:bg-slate-900 p-1 rounded-xl">
          <button 
            onClick={() => setIsAdmin(false)}
            className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-lg transition-all ${!isAdmin ? 'bg-white dark:bg-slate-800 shadow-sm' : 'text-slate-500'}`}
          >
            <User size={18} />
            <span>Seller</span>
          </button>
          <button 
            onClick={() => setIsAdmin(true)}
            className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-lg transition-all ${isAdmin ? 'bg-white dark:bg-slate-800 shadow-sm' : 'text-slate-500'}`}
          >
            <UserCheck size={18} />
            <span>Admin</span>
          </button>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
              {isAdmin ? 'Username' : 'Seller Code'}
            </label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
              <input 
                type="text" 
                value={userId}
                onChange={(e) => setUserId(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border-slate-200 dark:border-slate-800 focus:ring-2 focus:ring-blue-500 outline-none"
                placeholder={isAdmin ? 'Enter admin username' : 'Enter your user code'}
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
              Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border-slate-200 dark:border-slate-800 focus:ring-2 focus:ring-blue-500 outline-none"
                placeholder="••••••••"
                required
              />
            </div>
          </div>

          <button 
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-xl shadow-lg shadow-blue-500/30 transition-all transform active:scale-95"
          >
            Sign In
          </button>
        </form>

        <p className="mt-8 text-center text-sm text-slate-500">
          Developed with ❤️ for Dairy Farmers
        </p>
      </motion.div>
    </div>
  );
};

export default Login;

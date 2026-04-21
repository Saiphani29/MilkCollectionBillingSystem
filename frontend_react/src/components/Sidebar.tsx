import { NavLink } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Home, 
  Users, 
  Milk, 
  BarChart3, 
  CreditCard, 
  Settings, 
  LogOut,
  FileText,
  ChevronRight
} from 'lucide-react';

const Sidebar = ({ isAdmin }: { isAdmin: boolean }) => {
  const menuItems = isAdmin ? [
    { name: 'Dashboard', icon: Home, path: '/admin/dashboard' },
    { name: 'Collection', icon: Milk, path: '/admin/collection' },
    { name: 'Billing', icon: FileText, path: '/admin/bill' },
    { name: 'Sellers', icon: Users, path: '/admin/sellers' },
    { name: 'Rate Chart', icon: BarChart3, path: '/admin/rates' },
    { name: 'Enquiries', icon: Settings, path: '/admin/enquiries' },
    { name: 'Profile', icon: Users, path: '/admin/profile' },
  ] : [
    { name: 'Dashboard', icon: Home, path: '/seller/dashboard' },
    { name: 'Milk Records', icon: Milk, path: '/seller/records' },
    { name: 'Payments', icon: CreditCard, path: '/seller/payments' },
    { name: 'Profile', icon: Users, path: '/seller/profile' },
  ];

  return (
    <div className="sidebar w-64 h-screen text-slate-100 flex flex-col p-4 fixed left-0 top-0 z-50">
      <div className="mb-8 p-2">
        <h1 className="text-2xl font-bold gradient-text tracking-tight">DairySoft Pro</h1>
        <p className="text-xs text-slate-400 mt-1 uppercase tracking-widest font-semibold">Management System</p>
      </div>

      <nav className="flex-1 space-y-2">
        {menuItems.map((item, i) => (
          <motion.div
            key={item.path}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.05 }}
          >
            <NavLink
              to={item.path}
              className={({ isActive }) => 
                `flex items-center justify-between p-3 rounded-xl transition-all duration-300 ${
                  isActive 
                    ? 'bg-blue-600/90 text-white shadow-lg shadow-blue-600/20' 
                    : 'hover:bg-white/10 text-slate-400 hover:text-white'
                }`
              }
            >
              <div className="flex items-center gap-3">
                <item.icon size={20} />
                <span className="font-medium">{item.name}</span>
              </div>
              <ChevronRight size={16} className="opacity-50" />
            </NavLink>
          </motion.div>
        ))}
      </nav>

      <div className="mt-auto p-2 border-t border-slate-800 pt-4">
        <button 
          onClick={() => {
            localStorage.removeItem('user');
            window.location.href = '/login';
          }}
          className="flex items-center gap-3 text-slate-400 hover:text-red-400 w-full transition-colors p-2"
        >
          <LogOut size={20} />
          <span className="font-medium">Logout</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;

import React from 'react';
import { NavLink } from 'react-router-dom';
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
    <div className="sidebar w-64 h-screen bg-slate-900 text-slate-100 flex flex-col p-4 fixed left-0 top-0">
      <div className="mb-8 p-2">
        <h1 className="text-2xl font-bold gradient-text">DairySoft Pro</h1>
        <p className="text-xs text-slate-400 mt-1">Milk Management System</p>
      </div>

      <nav className="flex-1 space-y-2">
        {menuItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) => 
              `flex items-center justify-between p-3 rounded-lg transition-all ${
                isActive ? 'bg-blue-600 text-white shadow-lg shadow-blue-900/20' : 'hover:bg-slate-800 text-slate-400'
              }`
            }
          >
            <div className="flex items-center gap-3">
              <item.icon size={20} />
              <span className="font-medium">{item.name}</span>
            </div>
            <ChevronRight size={16} />
          </NavLink>
        ))}
      </nav>

      <div className="mt-auto p-2 border-t border-slate-800 pt-4">
        <button className="flex items-center gap-3 text-slate-400 hover:text-red-400 w-full transition-colors">
          <LogOut size={20} />
          <span className="font-medium">Logout</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;

import React, { useState, useEffect } from 'react';
import { 
  Users, 
  Milk, 
  TrendingUp, 
  ArrowUpRight, 
  ArrowDownRight,
  Plus
} from 'lucide-react';
import { motion } from 'framer-motion';
import api from '../utils/api';

const StatCard = ({ title, value, icon: Icon, trend, color }: any) => (
  <motion.div 
    whileHover={{ y: -5 }}
    className="premium-card flex flex-col gap-4"
  >
    <div className="flex justify-between items-start">
      <div className={`p-3 rounded-2xl ${color} bg-opacity-10 shadow-inner`}>
        <Icon size={24} className={color.replace('bg-', 'text-')} />
      </div>
      {trend !== undefined && (
        <span className={`flex items-center text-sm font-medium ${trend > 0 ? 'text-emerald-500' : 'text-rose-500'}`}>
          {trend > 0 ? <ArrowUpRight size={16} /> : <ArrowDownRight size={16} />}
          {Math.abs(trend)}%
        </span>
      )}
    </div>
    <div>
      <p className="text-slate-500 text-sm font-medium">{title}</p>
      <h3 className="text-2xl font-bold mt-1">{value}</h3>
    </div>
  </motion.div>
);

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    totalSellers: 0,
    totalLiters: 0,
    todayRevenue: 0,
    pendingPayments: 0
  });
  const [recentCollections, setRecentCollections] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        console.log('Fetching dashboard data...');
        const [sellersRes, milkRes] = await Promise.all([
          api.get('sellers/list'),
          api.get('milk/list')
        ]);

        console.log('Sellers count:', sellersRes.data.length);
        console.log('Milk records:', milkRes.data.length);

        const sellersCount = sellersRes.data.length;
        const totalLiters = milkRes.data.reduce((acc: number, curr: any) => acc + curr.quantity, 0);
        const revenue = milkRes.data.reduce((acc: number, curr: any) => acc + (curr.Amount || 0), 0);

        setStats({
          totalSellers: sellersCount,
          totalLiters: totalLiters,
          todayRevenue: revenue,
          pendingPayments: 0 // Backend doesn't support this yet
        });

        // Get last 5 collections
        setRecentCollections(milkRes.data.slice(-5).reverse());
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-bold text-slate-800 dark:text-white">Admin Dashboard</h1>
          <p className="text-slate-500 mt-1">Monitor your collection stats and manage sellers.</p>
        </div>
        <button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl shadow-lg shadow-blue-500/20 font-semibold transition-all transition-transform active:scale-95">
          <Plus size={20} />
          New Collection
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { title: "Total Sellers", value: stats.totalSellers.toString(), icon: Users, color: "bg-blue-500" },
          { title: "Total Milk (Liters)", value: stats.totalLiters.toFixed(1), icon: Milk, color: "bg-emerald-500" },
          { title: "Total Revenue", value: `₹ ${stats.todayRevenue.toLocaleString()}`, icon: TrendingUp, color: "bg-amber-500" },
          { title: "Pending Payments", value: "₹ 0", icon: TrendingUp, color: "bg-rose-500" }
        ].map((item, i) => (
          <motion.div
            key={item.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
          >
            <StatCard {...item} />
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 premium-card">
          <h2 className="text-xl font-bold mb-6">Recent Collections</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-slate-100 dark:border-slate-800">
                  <th className="pb-4 font-semibold text-slate-500">Seller Code</th>
                  <th className="pb-4 font-semibold text-slate-500">Liters</th>
                  <th className="pb-4 font-semibold text-slate-500">Fat %</th>
                  <th className="pb-4 font-semibold text-slate-500">Amount</th>
                  <th className="pb-4 font-semibold text-slate-500">Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {recentCollections.length > 0 ? recentCollections.map((col, i) => (
                  <tr key={col.id || i} className="group">
                    <td className="py-4 font-medium">{col.usercode}</td>
                    <td className="py-4">{col.quantity.toFixed(1)} L</td>
                    <td className="py-4">{col.fat.toFixed(1)}%</td>
                    <td className="py-4">₹ {col.Amount.toLocaleString()}</td>
                    <td className="py-4 text-sm text-slate-500">{col.date}</td>
                  </tr>
                )) : (
                  <tr>
                    <td colSpan={5} className="py-8 text-center text-slate-500">No collections recorded yet.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        <div className="premium-card">
          <h2 className="text-xl font-bold mb-6">Quick Actions</h2>
          <div className="space-y-4">
             <p className="text-slate-500 text-sm">Shortcut links for management</p>
             <div className="grid grid-cols-1 gap-3">
                <button className="p-3 text-left border border-slate-100 dark:border-slate-800 rounded-lg hover:bg-slate-50 transition-colors font-medium">Generate Bills</button>
                <button className="p-3 text-left border border-slate-100 dark:border-slate-800 rounded-lg hover:bg-slate-50 transition-colors font-medium">Update Rates</button>
                <button className="p-3 text-left border border-slate-100 dark:border-slate-800 rounded-lg hover:bg-slate-50 transition-colors font-medium">Export Records</button>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;

import { useState, useEffect } from 'react';
import { 
  Milk, 
  Wallet, 
  History, 
  Calendar,
  ChevronRight,
  TrendingUp,
  Download
} from 'lucide-react';
import { motion } from 'framer-motion';
import api from '../utils/api';

const SellerDashboard = () => {
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  const [stats, setStats] = useState({
    balance: 0,
    lastLiters: 0,
    totalPaid: 0,
    recent: [] as any[]
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSellerData = async () => {
      try {
        const [milkRes, payRes] = await Promise.all([
          api.get('/milk/list'),
          api.get(`/payments/user/${user.username}`)
        ]);

        const myMilk = milkRes.data.filter((r: any) => r.usercode === user.username);
        const myPayments = payRes.data.submit ? payRes.data.paydetails : [];

        const totalEarned = myMilk.reduce((acc: number, curr: any) => acc + curr.Amount, 0);
        const totalPaid = myPayments.reduce((acc: number, curr: any) => acc + curr.amount, 0);
        
        setStats({
          balance: totalEarned - totalPaid,
          lastLiters: myMilk.length > 0 ? myMilk[myMilk.length - 1].quantity : 0,
          totalPaid: totalPaid,
          recent: myMilk.slice(-4).reverse()
        });
      } catch (error) {
        console.error('Error fetching seller dashboard:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchSellerData();
  }, [user.username]);

  if (loading) {
    return <div className="flex justify-center p-12"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div></div>;
  }

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold dark:text-white">Welcome back, {user.name}!</h1>
          <p className="text-slate-500 mt-1">Check your milk records or download your weekly statement.</p>
        </div>
        <button className="flex items-center gap-2 border border-slate-200 dark:border-slate-800 px-4 py-2 rounded-xl hover:bg-slate-100 transition-colors">
          <Calendar size={18} />
          <span>April 2026</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-blue-600 rounded-3xl p-8 text-white relative overflow-hidden group shadow-2xl shadow-blue-500/20"
        >
          <div className="relative z-10">
            <p className="text-blue-100 font-medium">Pending Balance</p>
            <h2 className="text-4xl font-bold mt-2">₹ {stats.balance.toLocaleString()}</h2>
            <div className="flex items-center gap-2 mt-4 text-sm bg-blue-500/30 w-fit px-3 py-1 rounded-full border border-blue-400/30">
              <TrendingUp size={16} />
              <span>Accrued Earnings</span>
            </div>
          </div>
          <div className="absolute top-[-20px] right-[-20px] bg-blue-500 rounded-full w-40 h-40 opacity-20 group-hover:scale-110 transition-transform"></div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="premium-card flex flex-col justify-center"
        >
          <div className="flex items-center gap-4 mb-4">
            <div className="bg-emerald-100 p-3 rounded-2xl">
              <Milk className="text-emerald-600" size={24} />
            </div>
            <div>
              <p className="text-slate-500 text-sm">Last Submission</p>
              <h3 className="text-xl font-bold">{stats.lastLiters.toFixed(1)} Liters</h3>
            </div>
          </div>
          <div className="w-full bg-slate-100 dark:bg-slate-800 h-2 rounded-full overflow-hidden">
            <div className="bg-emerald-500 h-full w-[65%]"></div>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="premium-card flex flex-col justify-center"
        >
          <div className="flex items-center gap-4 mb-4">
            <div className="bg-amber-100 p-3 rounded-2xl">
              <Wallet className="text-amber-600" size={24} />
            </div>
            <div>
              <p className="text-slate-500 text-sm">Total Paid</p>
              <h3 className="text-xl font-bold">₹ {stats.totalPaid.toLocaleString()}</h3>
            </div>
          </div>
          <div className="w-full bg-slate-100 dark:bg-slate-800 h-2 rounded-full overflow-hidden">
            <div className="bg-amber-500 h-full w-[85%]"></div>
          </div>
        </motion.div>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        <div className="flex-1 premium-card">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold">Recent Submissions</h2>
            <button className="text-blue-600 font-semibold text-sm hover:underline flex items-center gap-1">
              View History <ChevronRight size={16} />
            </button>
          </div>
          <div className="space-y-4">
            {stats.recent.length > 0 ? stats.recent.map((item, i) => (
              <div key={item.id || i} className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-900 rounded-2xl hover:translate-x-2 transition-transform cursor-pointer">
                <div className="flex items-center gap-4">
                  <div className="bg-white dark:bg-slate-800 p-3 rounded-xl shadow-sm">
                    <History size={20} className="text-slate-500" />
                  </div>
                  <div>
                    <h4 className="font-bold">{item.date}</h4>
                    <p className="text-xs text-slate-500">{item.timings} Session • {item.quantity}L @ ₹{item.price}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-bold text-emerald-600">+₹ {item.Amount.toLocaleString()}</p>
                  <p className="text-[10px] uppercase font-bold text-slate-400">Confirmed</p>
                </div>
              </div>
            )) : (
              <p className="py-8 text-center text-slate-500 font-medium">No recent submissions found.</p>
            )}
          </div>
        </div>

        <div className="w-full lg:w-80 space-y-6">
          <div className="premium-card">
            <h3 className="font-bold mb-4">Quick Actions</h3>
            <button className="w-full py-3 bg-slate-900 text-white rounded-xl font-semibold flex items-center justify-center gap-2 mb-3 shadow-lg shadow-slate-900/20">
              <Download size={18} />
              Download Receipt
            </button>
            <button className="w-full py-3 border border-slate-200 dark:border-slate-800 rounded-xl font-semibold text-slate-600 dark:text-slate-400 hover:bg-slate-50">
              Contact Support
            </button>
          </div>
          
          <div className="premium-card bg-gradient-to-br from-blue-600 to-indigo-700 text-white border-0 shadow-2xl shadow-blue-500/20">
            <h3 className="font-bold">Milk Quality Analysis</h3>
            <p className="text-sm text-blue-100 mt-2">Your average fat content is steady at <span className="font-bold">4.2%</span>. Great job!</p>
            <div className="flex items-center gap-2 mt-4 text-xs font-bold uppercase tracking-wider">
              <span>View Report</span>
              <ChevronRight size={14} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SellerDashboard;

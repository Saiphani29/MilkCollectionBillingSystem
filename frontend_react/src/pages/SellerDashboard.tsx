import React from 'react';
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

const SellerDashboard = () => {
  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold dark:text-white">Welcome back, Phanindra!</h1>
          <p className="text-slate-500 mt-1">Check your milk records or download your weekly statement.</p>
        </div>
        <button className="flex items-center gap-2 border border-slate-200 dark:border-slate-800 px-4 py-2 rounded-xl hover:bg-slate-100 transition-colors">
          <Calendar size={18} />
          <span>April 2026</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-blue-600 rounded-3xl p-8 text-white relative overflow-hidden group shadow-2xl shadow-blue-500/20">
          <div className="relative z-10">
            <p className="text-blue-100 font-medium">Account Balance</p>
            <h2 className="text-4xl font-bold mt-2">₹ 14,250.00</h2>
            <div className="flex items-center gap-2 mt-4 text-sm bg-blue-500/30 w-fit px-3 py-1 rounded-full border border-blue-400/30">
              <TrendingUp size={16} />
              <span>Next payment on 25th Apr</span>
            </div>
          </div>
          <div className="absolute top-[-20px] right-[-20px] bg-blue-500 rounded-full w-40 h-40 opacity-20 group-hover:scale-110 transition-transform"></div>
        </div>

        <div className="premium-card flex flex-col justify-center">
          <div className="flex items-center gap-4 mb-4">
            <div className="bg-emerald-100 p-3 rounded-2xl">
              <Milk className="text-emerald-600" size={24} />
            </div>
            <div>
              <p className="text-slate-500 text-sm">Last Literage</p>
              <h3 className="text-xl font-bold">12.5 Liters</h3>
            </div>
          </div>
          <div className="w-full bg-slate-100 dark:bg-slate-800 h-2 rounded-full overflow-hidden">
            <div className="bg-emerald-500 h-full w-[65%]"></div>
          </div>
          <p className="text-xs text-slate-400 mt-2">Avg. Fat: <span className="font-bold">4.2%</span></p>
        </div>

        <div className="premium-card flex flex-col justify-center">
          <div className="flex items-center gap-4 mb-4">
            <div className="bg-amber-100 p-3 rounded-2xl">
              <Wallet className="text-amber-600" size={24} />
            </div>
            <div>
              <p className="text-slate-500 text-sm">Total Paid</p>
              <h3 className="text-xl font-bold">₹ 54,000</h3>
            </div>
          </div>
          <div className="w-full bg-slate-100 dark:bg-slate-800 h-2 rounded-full overflow-hidden">
            <div className="bg-amber-500 h-full w-[85%]"></div>
          </div>
          <p className="text-xs text-slate-400 mt-2">FY 2026-27</p>
        </div>
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
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-900 rounded-2xl hover:translate-x-2 transition-transform cursor-pointer">
                <div className="flex items-center gap-4">
                  <div className="bg-white dark:bg-slate-800 p-3 rounded-xl shadow-sm">
                    <History size={20} className="text-slate-500" />
                  </div>
                  <div>
                    <h4 className="font-bold">April {20 - i}, 2026</h4>
                    <p className="text-xs text-slate-500">Morning Session • 14.5L @ ₹42.50</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-bold text-emerald-600">+₹ 616.25</p>
                  <p className="text-[10px] uppercase font-bold text-slate-400">Confirmed</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="w-full lg:w-80 space-y-6">
          <div className="premium-card">
            <h3 className="font-bold mb-4">Quick Actions</h3>
            <button className="w-full py-3 bg-slate-900 text-white rounded-xl font-semibold flex items-center justify-center gap-2 mb-3">
              <Download size={18} />
              Download Receipt
            </button>
            <button className="w-full py-3 border border-slate-200 dark:border-slate-800 rounded-xl font-semibold text-slate-600 dark:text-slate-400">
              Contact Support
            </button>
          </div>
          
          <div className="premium-card bg-gradient-to-br from-blue-600 to-indigo-700 text-white border-0 shadow-blue-500/20">
            <h3 className="font-bold">Milk Prediction</h3>
            <p className="text-sm text-blue-100 mt-2">Based on your history, you might hit <span className="font-bold">18L/day</span> next week.</p>
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

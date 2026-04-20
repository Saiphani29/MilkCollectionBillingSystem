import React, { useState, useEffect } from 'react';
import { Milk, Search, Filter, Calendar } from 'lucide-react';
import { motion } from 'framer-motion';
import api from '../utils/api';

const SellerRecords = () => {
  const [records, setRecords] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const user = JSON.parse(localStorage.getItem('user') || '{}');

  useEffect(() => {
    const fetchRecords = async () => {
      try {
        const response = await api.get('/milk/list');
        // Filter records for this seller
        const userRecords = response.data.filter((r: any) => r.usercode === user.username);
        setRecords(userRecords.reverse());
      } catch (error) {
        console.error('Error fetching records:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchRecords();
  }, [user.username]);

  if (loading) {
    return <div className="flex justify-center p-12"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div></div>;
  }

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-bold dark:text-white">Milk Collection History</h1>
          <p className="text-slate-500 mt-1">Detailed log of all your milk submissions.</p>
        </div>
      </div>

      <div className="premium-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-slate-100 dark:border-slate-800">
                <th className="pb-4 font-semibold text-slate-500">Date</th>
                <th className="pb-4 font-semibold text-slate-500">Session</th>
                <th className="pb-4 font-semibold text-slate-500">Type</th>
                <th className="pb-4 font-semibold text-slate-500">Liters</th>
                <th className="pb-4 font-semibold text-slate-500">Fat%</th>
                <th className="pb-4 font-semibold text-slate-500">SNF</th>
                <th className="pb-4 font-semibold text-slate-500 text-right">Amount</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {records.length > 0 ? records.map((record, i) => (
                <motion.tr 
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                  key={record.id} 
                  className="hover:bg-slate-50 dark:hover:bg-slate-900/50 transition-colors"
                >
                  <td className="py-4 font-medium">{record.date}</td>
                  <td className="py-4">
                    <span className={`px-2 py-1 rounded-md text-xs font-bold ${record.timings === 'Morning' ? 'bg-amber-100 text-amber-700' : 'bg-indigo-100 text-indigo-700'}`}>
                      {record.timings}
                    </span>
                  </td>
                  <td className="py-4 text-slate-500">{record.milktype}</td>
                  <td className="py-4 font-bold">{record.quantity.toFixed(1)} L</td>
                  <td className="py-4 text-blue-600 font-medium">{record.fat}%</td>
                  <td className="py-4 text-slate-500">{record.snf}</td>
                  <td className="py-4 text-right font-bold text-emerald-600">₹ {record.Amount.toLocaleString()}</td>
                </motion.tr>
              )) : (
                <tr>
                  <td colSpan={7} className="py-12 text-center text-slate-500 font-medium">No collection records found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default SellerRecords;

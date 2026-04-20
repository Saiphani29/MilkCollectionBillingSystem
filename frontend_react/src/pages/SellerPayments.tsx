import React, { useState, useEffect } from 'react';
import { CreditCard, CheckCircle2, Calendar, TrendingUp } from 'lucide-react';
import { motion } from 'framer-motion';
import api from '../utils/api';

const SellerPayments = () => {
  const [payments, setPayments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const user = JSON.parse(localStorage.getItem('user') || '{}');

  useEffect(() => {
    const fetchPayments = async () => {
      try {
        const response = await api.get(`/payments/user/${user.username}`);
        if (response.data.submit) {
          setPayments(response.data.paydetails.reverse());
        }
      } catch (error) {
        console.error('Error fetching payments:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchPayments();
  }, [user.username]);

  if (loading) {
    return <div className="flex justify-center p-12"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div></div>;
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold dark:text-white">Payment History</h1>
        <p className="text-slate-500 mt-1">Review all payments received from the dairy management.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {payments.length > 0 ? payments.map((pay, i) => (
          <motion.div
            key={pay.id}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.1 }}
            className="premium-card relative overflow-hidden group"
          >
            <div className="flex justify-between items-start mb-6">
              <div className="bg-emerald-100 dark:bg-emerald-900/30 p-3 rounded-2xl text-emerald-600">
                <CreditCard size={24} />
              </div>
              <span className="flex items-center gap-1 text-xs font-bold uppercase text-emerald-600 bg-emerald-50 dark:bg-emerald-900/20 px-3 py-1 rounded-full">
                <CheckCircle2 size={12} />
                Received
              </span>
            </div>

            <div>
              <p className="text-slate-500 text-sm font-medium">Payment Amount</p>
              <h3 className="text-3xl font-bold mt-1 tracking-tight text-slate-800 dark:text-white">₹ {pay.amount.toLocaleString()}</h3>
            </div>

            <div className="mt-8 pt-6 border-t border-slate-100 dark:border-slate-800 flex justify-between items-center text-sm">
              <div className="flex items-center gap-2 text-slate-500">
                <Calendar size={16} />
                <span>{pay.date}</span>
              </div>
              <div className="text-slate-400">ID: #{pay.id}</div>
            </div>
            
            <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/5 rounded-full -translate-y-1/2 translate-x-1/2 group-hover:scale-110 transition-transform"></div>
          </motion.div>
        )) : (
          <div className="col-span-full py-20 text-center glass rounded-3xl">
            <TrendingUp size={48} className="mx-auto text-slate-300 mb-4" />
            <h3 className="text-xl font-bold text-slate-400">No payment history found yet.</h3>
            <p className="text-slate-400 mt-1">Payments will appear here once they are processed by the admin.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SellerPayments;

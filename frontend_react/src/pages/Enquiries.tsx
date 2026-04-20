import React from 'react';
import { Mail, User, Clock, MessageSquare, Reply, Trash2, CheckCircle } from 'lucide-react';
import { motion } from 'framer-motion';

const Enquiries = () => {
  const enquiries = [
    { id: 1, name: 'Suresh Raina', email: 'suresh@example.com', subject: 'Milk Collection Timing', message: 'Can I submit milk at 7:00 AM instead of 6:00 AM?', date: 'Apr 19, 2:30 PM', status: 'Unread' },
    { id: 2, name: 'Mithali Raj', email: 'mithali@example.com', subject: 'Payment Delay', message: 'My payment for last week is still pending. Please check.', date: 'Apr 18, 10:15 AM', status: 'In Progress' },
    { id: 3, name: 'MS Dhoni', email: 'msd@example.com', subject: 'New Seller Registration', message: 'I want to register 5 more cows for milk collection.', date: 'Apr 17, 4:50 PM', status: 'Resolved' },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold dark:text-white">Customer Enquiries</h1>
        <p className="text-slate-500 mt-1">Manage and respond to feedback from your sellers and visitors.</p>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {enquiries.map((enq, i) => (
          <motion.div 
            key={enq.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.1 }}
            className={`premium-card border-l-4 ${
              enq.status === 'Unread' ? 'border-l-blue-600' : 
              enq.status === 'In Progress' ? 'border-l-amber-500' : 'border-l-emerald-500'
            }`}
          >
            <div className="flex flex-col md:flex-row justify-between gap-6">
              <div className="flex-1 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="bg-slate-100 dark:bg-slate-800 p-2 rounded-lg">
                      <User size={18} className="text-slate-500" />
                    </div>
                    <div>
                      <h3 className="font-bold">{enq.name}</h3>
                      <p className="text-xs text-slate-500">{enq.email}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-400">
                    <Clock size={14} />
                    <span>{enq.date}</span>
                  </div>
                </div>

                <div>
                  <h4 className="font-bold text-blue-600 mb-1">{enq.subject}</h4>
                  <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">{enq.message}</p>
                </div>
              </div>

              <div className="flex md:flex-col gap-2 justify-end">
                <button className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-xl text-sm font-bold shadow-lg shadow-blue-500/20">
                  <Reply size={16} />
                  Reply
                </button>
                <div className="flex gap-2">
                  <button className="flex-1 md:flex-none p-2 border border-slate-100 dark:border-slate-800 rounded-xl hover:bg-emerald-50 dark:hover:bg-emerald-900/10 text-emerald-600">
                    <CheckCircle size={18} />
                  </button>
                  <button className="flex-1 md:flex-none p-2 border border-slate-100 dark:border-slate-800 rounded-xl hover:bg-rose-50 dark:hover:bg-rose-900/10 text-rose-500">
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Enquiries;

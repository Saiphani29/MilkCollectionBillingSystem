import React, { useState } from 'react';
import { Milk, User, Droplets, Thermometer, Layers, CheckCircle2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const MilkCollection = () => {
  const [formData, setFormData] = useState({
    usercode: '',
    date: new Date().toISOString().split('T')[0],
    timings: 'Morning',
    milktype: 'Buffalo',
    fat: '',
    snf: '',
    quantity: ''
  });

  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate API call
    console.log("Submitting:", formData);
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({ ...formData, usercode: '', fat: '', snf: '', quantity: '' });
    }, 3000);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="text-center">
        <h1 className="text-3xl font-bold dark:text-white">New Milk Collection</h1>
        <p className="text-slate-500 mt-1">Select a seller and record the milk quality and quantity.</p>
      </div>

      <div className="premium-card relative overflow-hidden">
        <AnimatePresence>
          {submitted && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 z-20 bg-emerald-500/95 flex flex-col items-center justify-center text-white"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', damping: 10 }}
              >
                <CheckCircle2 size={80} />
              </motion.div>
              <h2 className="text-2xl font-bold mt-4">Collection Recorded!</h2>
              <p className="mt-2">The record has been updated in the database.</p>
            </motion.div>
          )}
        </AnimatePresence>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6 p-4">
          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-600">Seller Identifier</label>
            <div className="relative">
              <User className="absolute left-3 top-3 text-slate-400" size={20} />
              <input 
                type="text" 
                value={formData.usercode}
                onChange={(e) => setFormData({...formData, usercode: e.target.value})}
                className="w-full pl-10 pr-4 py-3 border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 rounded-xl"
                placeholder="Enter User Code"
                required
              />
            </div>
          </div>

          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-600 focus-within:text-blue-500">Session</label>
                <select 
                  value={formData.timings}
                  onChange={(e) => setFormData({...formData, timings: e.target.value})}
                  className="w-full px-4 py-3 border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 rounded-xl outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option>Morning</option>
                  <option>Evening</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-600">Milk Type</label>
                <select 
                  value={formData.milktype}
                  onChange={(e) => setFormData({...formData, milktype: e.target.value})}
                  className="w-full px-4 py-3 border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 rounded-xl outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option>Buffalo</option>
                  <option>Cow</option>
                </select>
              </div>
            </div>
          </div>

          <div className="md:col-span-2 grid grid-cols-1 md:grid-cols-3 gap-6 pt-4 border-t border-slate-100 dark:border-slate-800">
            <div className="space-y-2">
              <div className="flex items-center gap-2 mb-2">
                <Thermometer size={16} className="text-blue-500" />
                <label className="text-sm font-semibold text-slate-600">Fat Percentage (%)</label>
              </div>
              <input 
                type="number" 
                step="0.1"
                value={formData.fat}
                onChange={(e) => setFormData({...formData, fat: e.target.value})}
                className="w-full px-4 py-3 border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 rounded-xl text-xl font-bold"
                placeholder="0.0"
                required
              />
            </div>
            <div className="space-y-2">
              <div className="flex items-center gap-2 mb-2">
                <Layers size={16} className="text-emerald-500" />
                <label className="text-sm font-semibold text-slate-600">SNF Value</label>
              </div>
              <input 
                type="number" 
                step="0.1"
                value={formData.snf}
                onChange={(e) => setFormData({...formData, snf: e.target.value})}
                className="w-full px-4 py-3 border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 rounded-xl text-xl font-bold"
                placeholder="0.0"
                required
              />
            </div>
            <div className="space-y-2">
              <div className="flex items-center gap-2 mb-2">
                <Droplets size={16} className="text-indigo-500" />
                <label className="text-sm font-semibold text-slate-600">Quantity (Liters)</label>
              </div>
              <input 
                type="number" 
                step="0.01"
                value={formData.quantity}
                onChange={(e) => setFormData({...formData, quantity: e.target.value})}
                className="w-full px-4 py-3 border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 rounded-xl text-xl font-bold"
                placeholder="0.00"
                required
              />
            </div>
          </div>

          <div className="md:col-span-2 pt-6">
            <button 
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-2xl shadow-xl shadow-blue-500/20 transform transition-all active:scale-[0.98] flex items-center justify-center gap-3 text-lg"
            >
              <Milk size={24} />
              Confirm Collection
            </button>
          </div>
        </form>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="premium-card bg-slate-900 text-white border-0">
          <h3 className="font-bold mb-4">Live Rate Estimator</h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center text-slate-400">
              <span>Estimated Price</span>
              <span className="text-white font-bold text-2xl">₹ {((parseFloat(formData.fat) || 0) * 8.5 + (parseFloat(formData.snf) || 0) * 2.1).toFixed(2)} / L</span>
            </div>
            <div className="flex justify-between items-center text-slate-400">
              <span>Total Amount</span>
              <span className="text-emerald-400 font-bold text-3xl">₹ {(((parseFloat(formData.fat) || 0) * 8.5 + (parseFloat(formData.snf) || 0) * 2.1) * (parseFloat(formData.quantity) || 0)).toFixed(2)}</span>
            </div>
          </div>
        </div>

        <div className="premium-card">
          <h3 className="font-bold mb-4">Quick Tips</h3>
          <ul className="text-sm text-slate-500 space-y-2">
            <li className="flex items-start gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-1.5 shrink-0"></div>
              <span>Ensure the milk temperature is between 4°C and 8°C for accurate testing.</span>
            </li>
            <li className="flex items-start gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-1.5 shrink-0"></div>
              <span>Clean the SNF analyzer after every 10 collections for consistent results.</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default MilkCollection;

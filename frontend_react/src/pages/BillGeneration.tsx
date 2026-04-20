import React, { useState } from 'react';
import { Search, FileText, Download, Printer, User } from 'lucide-react';
import { motion } from 'framer-motion';

const BillGeneration = () => {
  const [usercode, setUsercode] = useState('');
  const [dateFrom, setDateFrom] = useState('');
  const [dateTo, setDateTo] = useState('');
  const [billData, setBillData] = useState<any>(null);

  const handleGenerate = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate API call
    setBillData({
      seller: "Phanindra Sai",
      code: usercode,
      period: `${dateFrom} to ${dateTo}`,
      liters: 145.5,
      avgFat: 4.2,
      avgSnf: 8.8,
      amount: 6250.00,
      paid: 5000.00,
      balance: 1250.00
    });
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold dark:text-white">Bill Generation</h1>
        <p className="text-slate-500 mt-1">Generate and print settlement bills for sellers.</p>
      </div>

      <div className="premium-card">
        <form onSubmit={handleGenerate} className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-500">Seller Code</label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
              <input 
                type="text" 
                value={usercode}
                onChange={(e) => setUsercode(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border-slate-200 dark:border-slate-800"
                placeholder="Ex: SL-001"
                required
              />
            </div>
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-500">From Date</label>
            <input 
              type="date" 
              value={dateFrom}
              onChange={(e) => setDateFrom(e.target.value)}
              className="w-full px-4 py-2 border-slate-200 dark:border-slate-800"
              required
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-500">To Date</label>
            <input 
              type="date" 
              value={dateTo}
              onChange={(e) => setDateTo(e.target.value)}
              className="w-full px-4 py-2 border-slate-200 dark:border-slate-800"
              required
            />
          </div>
          <button 
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-xl flex items-center justify-center gap-2 shadow-lg shadow-blue-500/20"
          >
            <Search size={18} />
            Search Records
          </button>
        </form>
      </div>

      {billData && (
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="grid grid-cols-1 lg:grid-cols-3 gap-8"
        >
          <div className="lg:col-span-2 premium-card bg-white dark:bg-slate-900 border-2 border-blue-100 dark:border-blue-900 shadow-2xl">
            <div className="flex justify-between items-start border-b border-slate-100 dark:border-slate-800 pb-6 mb-6">
              <div className="flex gap-4">
                <div className="bg-blue-600 p-3 rounded-xl text-white">
                  <FileText size={24} />
                </div>
                <div>
                  <h2 className="text-xl font-bold">Statement of Account</h2>
                  <p className="text-sm text-slate-500">Generated for {billData.seller}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm text-slate-500">Statement Period</p>
                <p className="font-bold">{billData.period}</p>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-8 mb-8">
              <div className="p-4 bg-slate-50 dark:bg-slate-800 rounded-2xl">
                <p className="text-xs text-slate-500 font-bold uppercase tracking-wider">Total Quantity</p>
                <p className="text-2xl font-bold mt-1 text-blue-600">{billData.liters} L</p>
              </div>
              <div className="p-4 bg-slate-50 dark:bg-slate-800 rounded-2xl">
                <p className="text-xs text-slate-500 font-bold uppercase tracking-wider">Avg. Quality</p>
                <p className="text-2xl font-bold mt-1">{billData.avgFat}% Fat</p>
              </div>
              <div className="p-4 bg-slate-50 dark:bg-slate-800 rounded-2xl">
                <p className="text-xs text-slate-500 font-bold uppercase tracking-wider">Total Value</p>
                <p className="text-2xl font-bold mt-1">₹ {billData.amount}</p>
              </div>
            </div>

            <div className="space-y-4 border-t border-slate-100 dark:border-slate-800 pt-6">
              <div className="flex justify-between">
                <span className="text-slate-500">Gross Amount</span>
                <span className="font-medium">₹ {billData.amount.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Advance / Paid</span>
                <span className="font-medium text-rose-500">- ₹ {billData.paid.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-xl font-bold border-t border-slate-100 dark:border-slate-800 pt-4">
                <span>Net Payable</span>
                <span className="text-emerald-600">₹ {billData.balance.toFixed(2)}</span>
              </div>
            </div>

            <div className="flex gap-4 mt-8">
              <button className="flex-1 bg-slate-900 text-white py-3 rounded-xl font-semibold flex items-center justify-center gap-2">
                <Download size={18} />
                Save PDF
              </button>
              <button className="flex-1 border border-slate-200 dark:border-slate-800 py-3 rounded-xl font-semibold flex items-center justify-center gap-2">
                <Printer size={18} />
                Print Bill
              </button>
            </div>
          </div>

          <div className="space-y-6">
            <div className="premium-card">
              <h3 className="font-bold mb-4">Seller Info</h3>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-slate-500">User Code</span>
                  <span className="font-bold">{billData.code}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Contact</span>
                  <span>+91 98765 43210</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Village</span>
                  <span>Milkpur Cross</span>
                </div>
              </div>
            </div>

            <div className="premium-card bg-emerald-50 dark:bg-emerald-900/20 border-emerald-100 dark:border-emerald-800">
              <h3 className="font-bold text-emerald-800 dark:text-emerald-400 mb-2">Ready for Payout</h3>
              <p className="text-sm text-emerald-700 dark:text-emerald-500">All collection records are verified. You can proceed with the settlement.</p>
              <button className="w-full mt-4 bg-emerald-600 text-white py-3 rounded-xl font-bold shadow-lg shadow-emerald-500/20">
                Mark as Paid
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default BillGeneration;

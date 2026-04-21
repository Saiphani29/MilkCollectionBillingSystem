import { useState } from 'react';
import { Save, RotateCcw, AlertCircle, Plus, Trash2 } from 'lucide-react';
import { motion } from 'framer-motion';

const RateChart = () => {
  const [rates] = useState([
    { id: 1, fat: 4.0, snf87: 32.5, snf88: 33.2, snf89: 34.0, snf90: 35.5 },
    { id: 2, fat: 4.2, snf87: 34.1, snf88: 34.8, snf89: 35.6, snf90: 37.1 },
    { id: 3, fat: 4.4, snf87: 35.7, snf88: 36.4, snf89: 37.2, snf90: 38.7 },
  ]);

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-bold dark:text-white">Rate Chart Settings</h1>
          <p className="text-slate-500 mt-1">Configure milk prices based on Fat and SNF content.</p>
        </div>
        <div className="flex gap-4">
          <button className="flex items-center gap-2 border border-slate-200 dark:border-slate-800 px-6 py-3 rounded-xl font-semibold hover:bg-slate-100 transition-colors">
            <RotateCcw size={20} />
            Reset Defaults
          </button>
          <button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl shadow-lg shadow-blue-500/20 font-semibold transition-all active:scale-95">
            <Save size={20} />
            Save Changes
          </button>
        </div>
      </div>

      <div className="bg-amber-50 dark:bg-amber-900/10 border border-amber-100 dark:border-amber-900/30 p-4 rounded-xl flex gap-4 items-start text-amber-800 dark:text-amber-400">
        <AlertCircle className="shrink-0" size={24} />
        <div>
          <p className="font-bold">Important Notice</p>
          <p className="text-sm">Changes to the rate chart will affect all new collections immediately. Historical records will remain unchanged.</p>
        </div>
      </div>

      <div className="premium-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50">
                <th className="p-4 font-bold text-slate-500">Fat %</th>
                <th className="p-4 font-bold text-slate-500">SNF 8.70</th>
                <th className="p-4 font-bold text-slate-500">SNF 8.80</th>
                <th className="p-4 font-bold text-slate-500">SNF 8.90</th>
                <th className="p-4 font-bold text-slate-500">SNF 9.00+</th>
                <th className="p-4 font-bold text-slate-500 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {rates.map((rate) => (
                <tr key={rate.id} className="hover:bg-slate-50 dark:hover:bg-slate-900/30 transition-colors">
                  <td className="p-4">
                    <input type="number" defaultValue={rate.fat} className="w-20 bg-transparent font-bold text-blue-600" />
                  </td>
                  <td className="p-4">
                    <input type="number" defaultValue={rate.snf87} className="w-24 bg-transparent" />
                  </td>
                  <td className="p-4">
                    <input type="number" defaultValue={rate.snf88} className="w-24 bg-transparent" />
                  </td>
                  <td className="p-4">
                    <input type="number" defaultValue={rate.snf89} className="w-24 bg-transparent" />
                  </td>
                  <td className="p-4">
                    <input type="number" defaultValue={rate.snf90} className="w-24 bg-transparent" />
                  </td>
                  <td className="p-4 text-right">
                    <button className="text-rose-500 hover:bg-rose-50 p-2 rounded-lg"><Trash2 size={18} /></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <button className="w-full p-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-center gap-2 text-blue-600 font-bold hover:bg-blue-50 dark:hover:bg-blue-900/10 transition-colors">
          <Plus size={20} />
          Add New Fat Range
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="premium-card">
          <h3 className="text-xl font-bold mb-6">Price Trend Preview</h3>
          <div className="h-64 flex items-end justify-between gap-4 px-4">
            {[45, 52, 58, 65, 72, 80].map((h, i) => (
              <div key={i} className="flex-1 bg-blue-100 dark:bg-blue-900/30 rounded-t-lg relative group">
                <motion.div 
                  initial={{ height: 0 }}
                  animate={{ height: `${h}%` }}
                  className="bg-blue-600 rounded-t-lg w-full"
                ></motion.div>
                <div className="absolute top-[-30px] left-1/2 -translate-x-1/2 bg-slate-900 text-white text-[10px] px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                  ₹{30 + i * 5}
                </div>
              </div>
            ))}
          </div>
          <div className="flex justify-between mt-4 text-xs text-slate-500 px-4">
            <span>3.5% Fat</span>
            <span>4.0% Fat</span>
            <span>4.5% Fat</span>
            <span>5.0% Fat</span>
          </div>
        </div>

        <div className="premium-card">
          <h3 className="text-xl font-bold mb-4">Calculation Logic</h3>
          <p className="text-sm text-slate-500 mb-6">Our system uses a linear interpolation model for intermediate SNF values. Ensure your base rates are calibrated with market standards.</p>
          <div className="p-4 bg-slate-50 dark:bg-slate-900 rounded-xl space-y-3">
            <div className="flex justify-between text-sm">
              <span className="text-slate-400">Base Multiplier</span>
              <span className="font-bold">x 1.25</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-slate-400">Quality Bonus</span>
              <span className="font-bold text-emerald-500">+ ₹ 2.50</span>
            </div>
            <div className="flex justify-between text-sm pt-3 border-t border-slate-200 dark:border-slate-800">
              <span className="font-bold">Total Power Rate</span>
              <span className="font-bold text-blue-600">Dynamic</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RateChart;

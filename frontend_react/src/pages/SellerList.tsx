import { useState, useEffect } from 'react';
import { Search, Plus, Filter, Edit2, Trash2, Phone, MapPin } from 'lucide-react';
import { motion } from 'framer-motion';
import api from '../utils/api';

interface Seller {
  usercode: string;
  name: string;
  email: string;
  phoneno: string;
  village: string;
  gender: string;
}

const SellerList = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sellers, setSellers] = useState<Seller[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSellers = async () => {
      try {
        const response = await api.get('/sellers/list');
        setSellers(response.data);
      } catch (error) {
        console.error('Error fetching sellers:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchSellers();
  }, []);

  const filteredSellers = sellers.filter(s => 
    s.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    s.usercode.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
          <h1 className="text-3xl font-bold dark:text-white">Sellers Directory</h1>
          <p className="text-slate-500 mt-1">Manage and monitor all registered milk producers.</p>
        </div>
        <button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl shadow-lg shadow-blue-500/20 font-semibold transition-all active:scale-95">
          <Plus size={20} />
          Register New Seller
        </button>
      </div>

      <div className="premium-card flex flex-col md:flex-row gap-4 items-center">
        <div className="relative flex-1 w-full">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <input 
            type="text" 
            placeholder="Search by name or seller code..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-3 border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 rounded-xl outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="flex gap-2 w-full md:w-auto">
          <button className="flex-1 md:flex-none flex items-center justify-center gap-2 border border-slate-200 dark:border-slate-800 px-4 py-3 rounded-xl hover:bg-slate-100 transition-colors">
            <Filter size={18} />
            <span>Filter</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredSellers.length > 0 ? filteredSellers.map((seller, i) => (
          <motion.div 
            key={seller.usercode}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="premium-card group relative overflow-hidden"
          >
            <div className="flex justify-between items-start mb-4">
              <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center text-blue-600 font-bold text-lg">
                {seller.name.charAt(0)}
              </div>
              <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <button className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg text-slate-500"><Edit2 size={16} /></button>
                <button className="p-2 hover:bg-rose-100 dark:hover:bg-rose-900/30 rounded-lg text-rose-500"><Trash2 size={16} /></button>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-bold">{seller.name}</h3>
              <p className="text-sm font-bold text-blue-600">{seller.usercode}</p>
            </div>

            <div className="mt-6 space-y-3">
              <div className="flex items-center gap-3 text-sm text-slate-500">
                <MapPin size={16} />
                <span>{seller.village}</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-slate-500">
                <Phone size={16} />
                <span>{seller.phoneno}</span>
              </div>
            </div>

            <div className="mt-6 pt-6 border-t border-slate-100 dark:border-slate-800 flex justify-between items-center">
              <span className={`px-3 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-700`}>
                Active
              </span>
              <button className="text-sm font-bold text-blue-600 hover:underline">View History</button>
            </div>
          </motion.div>
        )) : (
          <div className="col-span-full text-center py-12 text-slate-500">
            No sellers found.
          </div>
        )}
      </div>
    </div>
  );
};

export default SellerList;

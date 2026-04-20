import React, { useState } from 'react';
import { User, Mail, Phone, MapPin, Shield, Camera, Save, Key } from 'lucide-react';
import { motion } from 'framer-motion';

const UserProfile = ({ isAdmin }: { isAdmin: boolean }) => {
  const [activeTab, setActiveTab] = useState('profile');

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-bold dark:text-white">{isAdmin ? 'Admin Profile' : 'Seller Profile'}</h1>
          <p className="text-slate-500 mt-1">Manage your account settings and personal information.</p>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        <div className="w-full lg:w-80 space-y-6">
          <div className="premium-card text-center">
            <div className="relative inline-block mx-auto mb-4 group">
              <div className="w-32 h-32 bg-blue-600 rounded-full flex items-center justify-center text-white text-5xl font-bold">
                {isAdmin ? 'A' : 'P'}
              </div>
              <button className="absolute bottom-1 right-1 bg-white dark:bg-slate-800 p-2 rounded-full shadow-lg text-slate-500 hover:text-blue-600 transition-colors border border-slate-100 dark:border-slate-800">
                <Camera size={18} />
              </button>
            </div>
            <h2 className="text-xl font-bold">{isAdmin ? 'Super Admin' : 'Phanindra Sai'}</h2>
            <p className="text-sm text-slate-500">{isAdmin ? 'System Administrator' : 'Premium Seller • SL-320'}</p>
          </div>

          <div className="premium-card bg-slate-900 border-0 p-2">
            <button 
              onClick={() => setActiveTab('profile')}
              className={`w-full flex items-center gap-3 p-3 rounded-xl transition-all ${activeTab === 'profile' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white'}`}
            >
              <User size={18} />
              <span className="font-medium">Personal Info</span>
            </button>
            <button 
              onClick={() => setActiveTab('security')}
              className={`w-full flex items-center gap-3 p-3 rounded-xl transition-all ${activeTab === 'security' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white'}`}
            >
              <Shield size={18} />
              <span className="font-medium">Security</span>
            </button>
          </div>
        </div>

        <div className="flex-1">
          {activeTab === 'profile' ? (
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="premium-card"
            >
              <h3 className="text-xl font-bold mb-8">Personal Information</h3>
              <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-500">Full Name</label>
                  <input type="text" defaultValue="Phanindra Sai" className="w-full px-4 py-3 border-slate-200 dark:border-slate-800" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-500">Email Address</label>
                  <input type="email" defaultValue="phanindra@example.com" className="w-full px-4 py-3 border-slate-200 dark:border-slate-800" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-500">Phone Number</label>
                  <input type="text" defaultValue="+91 98765 43210" className="w-full px-4 py-3 border-slate-200 dark:border-slate-800" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-500">Village / Street</label>
                  <input type="text" defaultValue="Milkpur Cross" className="w-full px-4 py-3 border-slate-200 dark:border-slate-800" />
                </div>
                {!isAdmin && (
                  <>
                    <div className="space-y-2">
                      <label className="text-sm font-semibold text-slate-500">Seller ID</label>
                      <input type="text" value="SL-320" disabled className="w-full px-4 py-3 bg-slate-100 dark:bg-slate-800 text-slate-500 border-slate-200 dark:border-slate-800 cursor-not-allowed" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-semibold text-slate-500">Bank Account</label>
                      <input type="text" defaultValue="**** **** 4291" className="w-full px-4 py-3 border-slate-200 dark:border-slate-800" />
                    </div>
                  </>
                )}
                <div className="md:col-span-2 pt-6">
                  <button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-xl font-bold shadow-lg shadow-blue-500/20 transition-all active:scale-95">
                    <Save size={20} />
                    Update Profile
                  </button>
                </div>
              </form>
            </motion.div>
          ) : (
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="premium-card"
            >
              <h3 className="text-xl font-bold mb-8">Security Settings</h3>
              <div className="space-y-8">
                <div className="space-y-6">
                  <h4 className="font-bold text-slate-500 uppercase tracking-widest text-xs">Change Password</h4>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Current Password</label>
                      <input type="password" placeholder="••••••••" className="w-full px-4 py-3 border-slate-200 dark:border-slate-800" />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className="text-sm font-medium">New Password</label>
                        <input type="password" placeholder="••••••••" className="w-full px-4 py-3 border-slate-200 dark:border-slate-800" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Confirm New Password</label>
                        <input type="password" placeholder="••••••••" className="w-full px-4 py-3 border-slate-200 dark:border-slate-800" />
                      </div>
                    </div>
                  </div>
                  <button className="flex items-center gap-2 border border-slate-200 dark:border-slate-800 px-6 py-3 rounded-xl font-bold hover:bg-slate-100 transition-colors">
                    <Key size={20} />
                    Update Password
                  </button>
                </div>

                <div className="pt-8 border-t border-slate-100 dark:border-slate-800">
                  <h4 className="font-bold text-slate-500 uppercase tracking-widest text-xs mb-4">Two-Factor Authentication</h4>
                  <div className="flex items-center justify-between p-4 bg-emerald-50 dark:bg-emerald-900/10 rounded-2xl border border-emerald-100 dark:border-emerald-800">
                    <div>
                      <p className="font-bold text-emerald-800 dark:text-emerald-400">Keep your account secure</p>
                      <p className="text-sm text-emerald-600 dark:text-emerald-500">2FA is currently active for your mobile number.</p>
                    </div>
                    <div className="w-12 h-6 bg-emerald-500 rounded-full relative">
                      <div className="w-4 h-4 bg-white rounded-full absolute top-1 right-1"></div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserProfile;

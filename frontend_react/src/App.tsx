import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Layout from './components/Layout';
import AdminDashboard from './pages/AdminDashboard';
import SellerDashboard from './pages/SellerDashboard';
import SellerRecords from './pages/SellerRecords';
import SellerPayments from './pages/SellerPayments';
import MilkCollection from './pages/MilkCollection';
import BillGeneration from './pages/BillGeneration';
import SellerList from './pages/SellerList';
import RateChart from './pages/RateChart';
import Enquiries from './pages/Enquiries';
import UserProfile from './pages/UserProfile';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        
        {/* Admin Routes */}
        <Route path="/admin" element={<Layout isAdmin={true} />}>
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="collection" element={<MilkCollection />} />
          <Route path="bill" element={<BillGeneration />} />
          <Route path="sellers" element={<SellerList />} />
          <Route path="rates" element={<RateChart />} />
          <Route path="enquiries" element={<Enquiries />} />
          <Route path="profile" element={<UserProfile isAdmin={true} />} />
        </Route>

        {/* Seller Routes */}
        <Route path="/seller" element={<Layout isAdmin={false} />}>
          <Route path="dashboard" element={<SellerDashboard />} />
          <Route path="records" element={<SellerRecords />} />
          <Route path="payments" element={<SellerPayments />} />
          <Route path="profile" element={<UserProfile isAdmin={false} />} />
        </Route>

        <Route path="/" element={<Navigate to="/login" replace />} />
      </Routes>
    </Router>
  );
}

export default App;

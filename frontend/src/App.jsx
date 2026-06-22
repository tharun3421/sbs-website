import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import PublicLayout from './components/PublicLayout'
import AdminLayout from './components/admin/AdminLayout'
import AdminRoute from './components/admin/AdminRoute'

import Home from './pages/public/Home'
import Jobs from './pages/public/Jobs'
import OnlineDegrees from './pages/public/OnlineDegrees'
import BusinessOffers from './pages/public/BusinessOffers'
import Contact from './pages/public/Contact'

import AdminLogin from './pages/admin/AdminLogin'
import AdminDashboard from './pages/admin/AdminDashboard'
import AdminJobs from './pages/admin/AdminJobs'
import AdminDegrees from './pages/admin/AdminDegrees'
import AdminOffers from './pages/admin/AdminOffers'
import AdminApplications from './pages/admin/AdminApplications'
import AdminQRCode from './pages/admin/AdminQRCode'
import AdminSettings from './pages/admin/AdminSettings'

export default function App() {
  return (
    <Routes>
      {/* Public */}
      <Route element={<PublicLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/jobs" element={<Jobs />} />
        <Route path="/online-degrees" element={<OnlineDegrees />} />
        <Route path="/business-offers" element={<BusinessOffers />} />
        <Route path="/contact" element={<Contact />} />
      </Route>

      {/* Admin auth */}
      <Route path="/admin/login" element={<AdminLogin />} />

      {/* Admin protected */}
      <Route path="/admin" element={<AdminRoute><AdminLayout /></AdminRoute>}>
        <Route index element={<AdminDashboard />} />
        <Route path="jobs" element={<AdminJobs />} />
        <Route path="degrees" element={<AdminDegrees />} />
        <Route path="offers" element={<AdminOffers />} />
        <Route path="applications" element={<AdminApplications />} />
        <Route path="qr" element={<AdminQRCode />} />
        <Route path="settings" element={<AdminSettings />} />
      </Route>

      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  )
}

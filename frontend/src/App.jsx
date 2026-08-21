import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import PublicLayout from './components/PublicLayout'
import AdminLayout from './components/admin/AdminLayout'
import AdminRoute from './components/admin/AdminRoute'
import AssociateLayout from './components/associate/AssociateLayout'
import AssociateRoute from './components/associate/AssociateRoute'

import Home from './pages/public/Home'
import JobsLanding from './pages/public/JobsLanding'
import Jobs from './pages/public/Jobs'
import OnlineDegrees from './pages/public/OnlineDegrees'
import BusinessOffers from './pages/public/BusinessOffers'
import Loans from './pages/public/Loans'
import OtherServices from './pages/public/OtherServices'
import MoreServices from './pages/public/MoreServices'
import Contact from './pages/public/Contact'
import AssociateResources from './pages/public/AssociateResources'

import AdminLogin from './pages/admin/AdminLogin'
import AdminDashboard from './pages/admin/AdminDashboard'
import AdminResources from './pages/admin/AdminResources'
import AdminQRCode from './pages/admin/AdminQRCode'
import AdminSettings from './pages/admin/AdminSettings'
import StudyAbroad from './pages/public/StudyAbroad'
import HotelManagementIndia from './pages/public/HotelManagementIndia'
import HotelManagementMauritius from './pages/public/HotelManagementMauritius'
import AdminContacts from './pages/admin/AdminContacts'
import AdminAssociates from './pages/admin/AdminAssociates'

import AssociateLogin from './pages/associate/AssociateLogin'
import AssociateRegister from './pages/associate/AssociateRegister'
import AssociateChangePassword from './pages/associate/AssociateChangePassword'
import AssociateLeads from './pages/associate/AssociateLeads'


export default function App() {
  return (
    <Routes>
      {/* Public */}
      <Route element={<PublicLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/jobs" element={<JobsLanding />} />
        <Route path="/jobs/:type" element={<Jobs />} />
        <Route path="/online-degrees" element={<OnlineDegrees />} />
        <Route path="/business-offers" element={<BusinessOffers />} />
        <Route path="/loans" element={<Loans />} />
        <Route path="/other-services" element={<OtherServices />} />
        <Route path="/more-services" element={<MoreServices />} />
        <Route path="/study-abroad" element={<StudyAbroad />} />
        <Route path="/hotel-management/india" element={<HotelManagementIndia />} />
        <Route path="/hotel-management/mauritius" element={<HotelManagementMauritius />} />
        <Route path="/associate-resources" element={<AssociateResources />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/associate/login" element={<AssociateLogin />} />
      <Route path="/associate/register" element={<AssociateRegister />} />
      </Route>

      {/* Admin auth */}
      <Route path="/admin/login" element={<AdminLogin />} />

      {/* Admin protected */}
      <Route path="/admin" element={<AdminRoute><AdminLayout /></AdminRoute>}>
        <Route index element={<AdminDashboard />} />
        <Route path="resources" element={<AdminResources />} />
        <Route path="contacts" element={<AdminContacts />} />
        <Route path="associates" element={<AdminAssociates />} />
        <Route path="qr" element={<AdminQRCode />} />
        <Route path="settings" element={<AdminSettings />} />
      </Route>
      

      {/* Associate protected */}
      <Route path="/associate" element={<AssociateRoute><AssociateLayout /></AssociateRoute>}>
        <Route path="leads" element={<AssociateLeads />} />
        <Route path="change-password" element={<AssociateChangePassword />} />
      </Route>

      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  )
}
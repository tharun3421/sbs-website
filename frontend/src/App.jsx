import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import PublicLayout from './components/PublicLayout'
import AdminLayout from './components/admin/AdminLayout'
import AdminRoute from './components/admin/AdminRoute'

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
import AdminJobs from './pages/admin/AdminJobs'
import AdminDegrees from './pages/admin/AdminDegrees'
import AdminOffers from './pages/admin/AdminOffers'
import AdminLoans from './pages/admin/AdminLoans'
import AdminOtherServices from './pages/admin/AdminOtherServices'
import AdminResources from './pages/admin/AdminResources'
import AdminApplications from './pages/admin/AdminApplications'
import AdminQRCode from './pages/admin/AdminQRCode'
import AdminSettings from './pages/admin/AdminSettings'
import StudyAbroad from './pages/public/StudyAbroad'
import AdminStudyAbroad from './pages/admin/AdminStudyAbroad'
import AdminContacts from './pages/admin/AdminContacts'


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
        <Route path="/associate-resources" element={<AssociateResources />} />
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
        <Route path="loans" element={<AdminLoans />} />
        <Route path="other-services" element={<AdminOtherServices />} />
        <Route path="resources" element={<AdminResources />} />
        <Route path="study-abroad" element={<AdminStudyAbroad />} />
        <Route path="contacts" element={<AdminContacts />} />
        <Route path="applications" element={<AdminApplications />} />
        <Route path="qr" element={<AdminQRCode />} />
        <Route path="settings" element={<AdminSettings />} />
      </Route>

      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  )
}
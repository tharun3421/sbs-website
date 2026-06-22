import React, { useState, useEffect } from 'react'
import { Briefcase, GraduationCap, Tag, FileText, TrendingUp, Clock } from 'lucide-react'
import api from '../../api'

export default function AdminDashboard() {
  const [stats, setStats] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    api.get('/admin/dashboard/stats').then(r => setStats(r.data)).finally(() => setLoading(false))
  }, [])

  const STAT_CARDS = stats ? [
    { label: 'Active Jobs', value: stats.totalJobs, icon: Briefcase, color: '#44DD88' },
    { label: 'Degree Programs', value: stats.totalDegrees, icon: GraduationCap, color: '#4488FF' },
    { label: 'Business Offers', value: stats.totalOffers, icon: Tag, color: '#FFD700' },
    { label: 'Total Applications', value: stats.totalApplications, icon: FileText, color: '#FF4444' },
    { label: "Today's Applications", value: stats.todayApplications, icon: TrendingUp, color: '#FF8800' },
  ] : []

  const TYPE_COLORS = { job: '#44DD88', degree: '#4488FF', offer: '#FFD700' }
  const STATUS_COLORS = { pending: '#FF8800', reviewed: '#4488FF', shortlisted: '#44DD88', rejected: '#FF4444' }

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-theme-primary font-black text-2xl">Dashboard</h1>
        <p className="text-theme-secondary text-sm mt-0.5">Welcome back, Admin</p>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 mb-8">
        {loading ? (
          [...Array(5)].map((_, i) => <div key={i} className="bg-[#111] rounded-2xl h-24 animate-pulse" />)
        ) : (
          STAT_CARDS.map(({ label, value, icon: Icon, color }) => (
            <div key={label} className="bg-theme-card border border-theme rounded-2xl p-4">
              <div className="flex items-center justify-between mb-3">
                <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: `${color}15` }}>
                  <Icon size={15} style={{ color }} />
                </div>
              </div>
              <p className="text-2xl font-black text-theme-primary">{value}</p>
              <p className="text-theme-muted text-xs mt-0.5">{label}</p>
            </div>
          ))
        )}
      </div>

      {/* Recent Applications */}
      <div className="bg-theme-card border border-theme rounded-2xl overflow-hidden">
        <div className="p-5 border-b border-theme flex items-center justify-between">
          <h2 className="text-theme-primary font-bold flex items-center gap-2">
            <Clock size={16} className="text-[#FFD700]" /> Recent Applications
          </h2>
          <a href="/admin/applications" className="text-[#FFD700] text-xs hover:underline">View all</a>
        </div>

        {loading ? (
          <div className="p-5 space-y-3">
            {[...Array(5)].map((_, i) => <div key={i} className="h-10 bg-theme-tertiary rounded animate-pulse" />)}
          </div>
        ) : !stats?.recentApps?.length ? (
          <div className="p-10 text-center text-theme-muted">No applications yet</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-theme">
                  <th className="text-left px-5 py-3 text-theme-secondary font-medium text-xs">Name</th>
                  <th className="text-left px-5 py-3 text-theme-secondary font-medium text-xs">Mobile</th>
                  <th className="text-left px-5 py-3 text-theme-secondary font-medium text-xs">Type</th>
                  <th className="text-left px-5 py-3 text-theme-secondary font-medium text-xs">Applied For</th>
                  <th className="text-left px-5 py-3 text-theme-secondary font-medium text-xs">Status</th>
                  <th className="text-left px-5 py-3 text-theme-secondary font-medium text-xs">Date</th>
                </tr>
              </thead>
              <tbody>
                {stats.recentApps.map(app => (
                  <tr key={app._id} className="border-b border-theme hover:bg-theme-tertiary transition">
                    <td className="px-5 py-3 text-theme-primary font-medium">{app.name}</td>
                    <td className="px-5 py-3 text-theme-secondary">{app.mobile}</td>
                    <td className="px-5 py-3">
                      <span className="px-2.5 py-1 rounded-full text-xs font-semibold capitalize"
                        style={{ background: `${TYPE_COLORS[app.type]}15`, color: TYPE_COLORS[app.type] }}>
                        {app.type}
                      </span>
                    </td>
                    <td className="px-5 py-3 text-theme-secondary max-w-[180px] truncate">{app.refTitle}</td>
                    <td className="px-5 py-3">
                      <span className="px-2.5 py-1 rounded-full text-xs font-semibold capitalize"
                        style={{ background: `${STATUS_COLORS[app.status]}15`, color: STATUS_COLORS[app.status] }}>
                        {app.status}
                      </span>
                    </td>
                    <td className="px-5 py-3 text-theme-muted text-xs">{new Date(app.createdAt).toLocaleDateString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}

import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Users2, Sparkles, Clock3, CheckCircle2, XCircle, Clock, Plus, List } from 'lucide-react'
import { associateApi } from '../../api'

const STATUS_LABEL = { new: 'New', in_progress: 'In Progress', converted: 'Converted', rejected: 'Rejected' }
const STATUS_COLORS = { new: '#4488FF', in_progress: '#FF8800', converted: '#44DD88', rejected: '#FF4444' }

export default function AssociateDashboard() {
  const [stats, setStats] = useState(null)
  const [loading, setLoading] = useState(true)

  let associate = null
  try { associate = JSON.parse(localStorage.getItem('sbs_associate') || 'null') } catch {}

  useEffect(() => {
    associateApi.get('/associate/dashboard/stats').then(r => setStats(r.data)).finally(() => setLoading(false))
  }, [])

  const STAT_CARDS = stats ? [
    { label: 'Total Leads', value: stats.total, icon: Users2, color: '#FFD700' },
    { label: 'New Leads', value: stats.new, icon: Sparkles, color: '#4488FF' },
    { label: 'In Progress', value: stats.inProgress, icon: Clock3, color: '#FF8800' },
    { label: 'Converted', value: stats.converted, icon: CheckCircle2, color: '#44DD88' },
    { label: 'Rejected', value: stats.rejected, icon: XCircle, color: '#FF4444' },
  ] : []

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-theme-primary font-black text-2xl">Dashboard</h1>
        <p className="text-theme-secondary text-sm mt-0.5">Welcome back, {associate?.name || 'Associate'}</p>
      </div>

      {/* Quick actions */}
      <div className="flex flex-wrap gap-3 mb-6">
        <Link to="/associate/leads?new=1"
          className="flex items-center gap-2 bg-[#FFD700] text-[#0A0A0A] font-bold px-4 py-2.5 rounded-xl hover:bg-[#E6C200] transition text-sm">
          <Plus size={16} /> Add Lead
        </Link>
        <Link to="/associate/leads"
          className="flex items-center gap-2 border border-theme text-theme-secondary font-semibold px-4 py-2.5 rounded-xl hover:text-theme-primary hover:border-theme-gold transition text-sm">
          <List size={16} /> View Leads
        </Link>
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

      {/* Recent Activity */}
      <div className="bg-theme-card border border-theme rounded-2xl overflow-hidden">
        <div className="p-5 border-b border-theme flex items-center justify-between">
          <h2 className="text-theme-primary font-bold flex items-center gap-2">
            <Clock size={16} className="text-[#FFD700]" /> Recent Activity
          </h2>
          <Link to="/associate/leads" className="text-[#FFD700] text-xs hover:underline">View all</Link>
        </div>

        {loading ? (
          <div className="p-5 space-y-3">
            {[...Array(5)].map((_, i) => <div key={i} className="h-10 bg-theme-tertiary rounded animate-pulse" />)}
          </div>
        ) : !stats?.recentLeads?.length ? (
          <div className="p-10 text-center text-theme-muted">No leads yet. Add your first lead to get started.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-theme">
                  <th className="text-left px-5 py-3 text-theme-secondary font-medium text-xs">Client</th>
                  <th className="text-left px-5 py-3 text-theme-secondary font-medium text-xs">Lead For</th>
                  <th className="text-left px-5 py-3 text-theme-secondary font-medium text-xs">Mobile</th>
                  <th className="text-left px-5 py-3 text-theme-secondary font-medium text-xs">Status</th>
                  <th className="text-left px-5 py-3 text-theme-secondary font-medium text-xs">Date</th>
                </tr>
              </thead>
              <tbody>
                {stats.recentLeads.map(lead => (
                  <tr key={lead._id} className="border-b border-theme hover:bg-theme-tertiary transition">
                    <td className="px-5 py-3 text-theme-primary font-medium">{lead.clientName}</td>
                    <td className="px-5 py-3 text-theme-secondary max-w-[160px] truncate">{lead.leadFor || '—'}</td>
                    <td className="px-5 py-3 text-theme-secondary">{lead.mobile}</td>
                    <td className="px-5 py-3">
                      <span className="px-2.5 py-1 rounded-full text-xs font-semibold"
                        style={{ background: `${STATUS_COLORS[lead.status]}15`, color: STATUS_COLORS[lead.status] }}>
                        {STATUS_LABEL[lead.status]}
                      </span>
                    </td>
                    <td className="px-5 py-3 text-theme-muted text-xs">{new Date(lead.createdAt).toLocaleDateString()}</td>
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
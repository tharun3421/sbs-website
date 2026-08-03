import React, { useState, useEffect } from 'react'
import { Download, Filter, FileText, ExternalLink } from 'lucide-react'
import api from '../../api'
import toast from 'react-hot-toast'

const TABS = [
  { key: '', label: 'All' },
  { key: 'job', label: 'Job Applications' },
  { key: 'degree', label: 'Degree Enquiries' },
  { key: 'offer', label: 'Offer Enquiries' },
  { key: 'loan', label: 'Loan Enquiries' },
  { key: 'other_service', label: 'Other Services' },
  { key: 'hotel_management', label: 'Hotel Management' },
]

const STATUSES = ['pending', 'reviewed', 'shortlisted', 'rejected']
const STATUS_COLORS = { pending: '#FF8800', reviewed: '#4488FF', shortlisted: '#44DD88', rejected: '#FF4444' }
const TYPE_COLORS = { job: '#44DD88', degree: '#4488FF', offer: '#FFD700', loan: '#44DD88', other_service: '#AA88FF', hotel_management: '#4FC3F7' }

export default function AdminApplications() {
  const [apps, setApps] = useState([])
  const [loading, setLoading] = useState(true)
  const [tab, setTab] = useState('')
  const [from, setFrom] = useState('')
  const [to, setTo] = useState('')

  const load = () => {
    setLoading(true)
    api.get('/applications', { params: { type: tab, from, to } })
      .then(r => setApps(r.data))
      .catch(() => setApps([]))
      .finally(() => setLoading(false))
  }
  useEffect(load, [tab, from, to])

  const updateStatus = async (id, status) => {
    try {
      await api.put(`/applications/${id}/status`, { status })
      setApps(prev => prev.map(a => a._id === id ? { ...a, status } : a))
      toast.success('Status updated')
    } catch { toast.error('Failed to update') }
  }

  const exportCSV = async () => {
  try {
    const res = await api.get('/applications/export-csv', {
      responseType: 'blob',
      params: { type: tab, from, to }
    })
    const url = window.URL.createObjectURL(new Blob([res.data]))
    const link = document.createElement('a')
    link.href = url
    link.download = `applications-${new Date().toISOString().slice(0, 10)}.csv`
    link.click()
    window.URL.revokeObjectURL(url)
    toast.success('CSV downloaded!')
  } catch {
    toast.error('Export failed')
  }
}

  return (
    <div>
      <div className="flex items-center justify-between flex-wrap gap-3 mb-6">
        <div>
          <h1 className="text-theme-primary font-black text-2xl">Applications & Enquiries</h1>
          <p className="text-theme-secondary text-sm">{apps.length} records</p>
        </div>
        <button onClick={exportCSV}
          className="flex items-center gap-2 border border-[#FFD700]/40 text-[#FFD700] font-semibold px-4 py-2.5 rounded-xl hover:bg-[#FFD700]/10 transition text-sm">
          <Download size={15} /> Export CSV
        </button>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 mb-5 bg-theme-tertiary p-1 rounded-xl w-fit flex-wrap">
        {TABS.map(({ key, label }) => (
          <button key={key} onClick={() => setTab(key)}
            className={`px-4 py-2 rounded-lg text-sm font-semibold transition ${tab === key ? 'bg-[#FFD700] text-[#0A0A0A]' : 'text-theme-secondary hover:text-theme-primary'}`}>
            {label}
          </button>
        ))}
      </div>

      {/* Date filters */}
      <div className="flex gap-3 mb-6 flex-wrap items-center">
        <div className="flex items-center gap-2">
          <Filter size={14} className="text-theme-muted" />
          <span className="text-theme-muted text-xs">Date range:</span>
        </div>
        <input type="date" value={from} onChange={e => setFrom(e.target.value)}
          className="input-bg border border-theme rounded-xl px-3 py-2 text-theme-primary text-xs focus:border-[#FFD700]/60" />
        <span className="text-theme-muted text-xs">to</span>
        <input type="date" value={to} onChange={e => setTo(e.target.value)}
          className="input-bg border border-theme rounded-xl px-3 py-2 text-theme-primary text-xs focus:border-[#FFD700]/60" />
        {(from || to) && (
          <button onClick={() => { setFrom(''); setTo('') }} className="text-theme-muted hover:text-theme-primary text-xs underline">Clear</button>
        )}
      </div>

      {/* Table */}
      <div className="bg-theme-card border border-theme rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-theme">
                {['Name', 'Mobile', 'Type', 'Applied For', 'Resume', 'Status', 'Date'].map(h => (
                  <th key={h} className="text-left px-5 py-3 text-theme-muted font-medium text-xs whitespace-nowrap">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {loading ? (
                [...Array(6)].map((_, i) => (
                  <tr key={i} className="border-b border-theme">
                    {[...Array(7)].map((_, j) => <td key={j} className="px-5 py-4"><div className="h-3 bg-theme-tertiary rounded animate-pulse" /></td>)}
                  </tr>
                ))
              ) : apps.map(app => (
                <tr key={app._id} className="border-b border-theme hover:bg-theme-tertiary transition">
                  <td className="px-5 py-3 text-theme-primary font-medium whitespace-nowrap">{app.name}</td>
                  <td className="px-5 py-3 text-theme-secondary whitespace-nowrap">
                    <a href={`tel:${app.mobile}`} className="hover:text-[#FFD700] transition">{app.mobile}</a>
                  </td>
                  <td className="px-5 py-3">
                    <span className="px-2.5 py-1 rounded-full text-xs font-semibold capitalize"
                      style={{ background: `${TYPE_COLORS[app.type]}15`, color: TYPE_COLORS[app.type] }}>
                      {app.type}
                    </span>
                  </td>
                  <td className="px-5 py-3 text-theme-secondary max-w-[180px] truncate">{app.refTitle}</td>
                  <td className="px-5 py-3">
                    {app.resumeUrl
                      ? <a href={app.resumeUrl} target="_blank" rel="noreferrer"
                          className="flex items-center gap-1 text-[#4488FF] hover:underline text-xs">
                          <FileText size={12} /> View <ExternalLink size={10} />
                        </a>
                      : <span className="text-theme-muted text-xs">—</span>
                    }
                  </td>
                  <td className="px-5 py-3">
                    <select
                      value={app.status}
                      onChange={e => updateStatus(app._id, e.target.value)}
                      className="text-xs rounded-lg px-2.5 py-1.5 border border-theme input-bg font-semibold focus:border-[#FFD700]/60 capitalize"
                      style={{ color: STATUS_COLORS[app.status] }}
                    >
                      {STATUSES.map(s => <option key={s} value={s} className="text-theme-primary">{s}</option>)}
                    </select>
                  </td>
                  <td className="px-5 py-3 text-theme-muted text-xs whitespace-nowrap">
                    {new Date(app.createdAt).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {!loading && !apps.length && (
            <div className="p-12 text-center">
              <FileText size={32} className="text-theme-muted mx-auto mb-3" />
              <p className="text-theme-muted">No applications found.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
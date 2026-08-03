import React, { useEffect, useState } from 'react'
import { Plus, Edit, Trash2, X, Hotel } from 'lucide-react'
import api from '../../api'
import toast from 'react-hot-toast'

const inputClass = "w-full input-bg border border-theme rounded-xl px-4 py-3 text-theme-primary text-sm placeholder-[var(--text-muted)] focus:border-[#4FC3F7]/60"
const labelClass = "text-theme-muted text-xs font-semibold uppercase tracking-wide mb-1.5 block"

const EMPTY = {
  country: 'India', title: '', subtitle: '', duration: '', internship: '',
  fee: '', certifiedBy: '', eligibility: '', highlights: '', curriculum: '', jobRoles: '',
  isActive: true,
}

// Convert a textarea (one item per line) <-> array
const toLines = (arr) => (arr || []).join('\n')
const toArray = (text) => (text || '').split('\n').map(s => s.trim()).filter(Boolean)

const COUNTRIES = ['India', 'Mauritius']
const COUNTRY_COLOR = { India: '#4FC3F7', Mauritius: '#44DD88' }

export default function AdminHotelManagement() {
  const [tab, setTab]           = useState('India')
  const [listings, setListings] = useState([])
  const [loading, setLoading]   = useState(true)
  const [modal, setModal]       = useState({ open: false, item: null })
  const [form, setForm]         = useState(EMPTY)
  const [saving, setSaving]     = useState(false)

  const load = () => {
    setLoading(true)
    api.get('/hotel-management/all', { params: { country: tab } })
      .then(r => setListings(r.data))
      .finally(() => setLoading(false))
  }
  useEffect(load, [tab])

  const openAdd = () => { setForm({ ...EMPTY, country: tab }); setModal({ open: true, item: null }) }
  const openEdit = (item) => {
    setForm({
      country: item.country, title: item.title, subtitle: item.subtitle || '',
      duration: item.duration || '', internship: item.internship || '', fee: item.fee || '',
      certifiedBy: item.certifiedBy || '',
      eligibility: toLines(item.eligibility), highlights: toLines(item.highlights),
      curriculum: toLines(item.curriculum), jobRoles: toLines(item.jobRoles),
      isActive: item.isActive,
    })
    setModal({ open: true, item })
  }

  const handleSave = async (e) => {
    e.preventDefault()
    if (!form.title.trim()) return toast.error('Title is required')
    setSaving(true)
    try {
      const payload = {
        country: form.country, title: form.title, subtitle: form.subtitle,
        duration: form.duration, internship: form.internship, fee: form.fee,
        certifiedBy: form.certifiedBy,
        eligibility: toArray(form.eligibility), highlights: toArray(form.highlights),
        curriculum: toArray(form.curriculum), jobRoles: toArray(form.jobRoles),
        isActive: form.isActive,
      }
      if (modal.item) await api.put(`/hotel-management/${modal.item._id}`, payload)
      else await api.post('/hotel-management', payload)
      toast.success(modal.item ? 'Updated' : 'Added')
      setModal({ open: false, item: null })
      load()
    } catch (err) { toast.error(err?.response?.data?.message || 'Failed to save') }
    finally { setSaving(false) }
  }

  const handleToggle = async (item) => {
    await api.put(`/hotel-management/${item._id}`, { ...item, isActive: !item.isActive })
    load()
  }

  const handleDelete = async (id) => {
    if (!confirm('Delete this listing?')) return
    await api.delete(`/hotel-management/${id}`)
    toast.success('Deleted')
    load()
  }

  const accent = COUNTRY_COLOR[tab]

  return (
    <div>
      <div className="flex items-center justify-between flex-wrap gap-3 mb-6">
        <div>
          <h1 className="text-theme-primary font-black text-2xl flex items-center gap-2">
            <Hotel size={22} style={{ color: accent }} /> Hotel Management
          </h1>
          <p className="text-theme-secondary text-sm">{listings.length} program{listings.length !== 1 ? 's' : ''} in {tab}</p>
        </div>
        <button onClick={openAdd}
          className="flex items-center gap-2 bg-[#FFD700] text-[#0A0A0A] font-bold px-4 py-2.5 rounded-xl hover:bg-[#E6C200] transition text-sm">
          <Plus size={16} /> Add Program
        </button>
      </div>

      {/* Country tabs */}
      <div className="flex gap-2 mb-5">
        {COUNTRIES.map(c => (
          <button key={c} onClick={() => setTab(c)}
            className={`px-4 py-2 rounded-xl text-sm font-semibold transition ${tab === c ? 'text-[#0A0A0A]' : 'text-theme-secondary bg-theme-tertiary hover:text-theme-primary'}`}
            style={tab === c ? { background: COUNTRY_COLOR[c] } : {}}>
            {c}
          </button>
        ))}
      </div>

      <div className="bg-theme-card border border-theme rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-theme">
                {['#', 'Title', 'Duration', 'Fee', 'Status', 'Actions'].map(h => (
                  <th key={h} className="text-left px-5 py-3 text-theme-muted font-medium text-xs">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {loading ? (
                [...Array(3)].map((_, i) => (
                  <tr key={i} className="border-b border-theme">
                    {[...Array(6)].map((_, j) => (
                      <td key={j} className="px-5 py-4"><div className="h-3 bg-theme-tertiary rounded animate-pulse" /></td>
                    ))}
                  </tr>
                ))
              ) : listings.map((item, i) => (
                <tr key={item._id} className="border-b border-theme last:border-0 hover:bg-theme-tertiary transition">
                  <td className="px-5 py-3 text-theme-muted">{i + 1}</td>
                  <td className="px-5 py-3 text-theme-primary font-medium max-w-[220px] truncate">{item.title}</td>
                  <td className="px-5 py-3 text-theme-secondary">{item.duration || '—'}</td>
                  <td className="px-5 py-3 text-theme-secondary max-w-[160px] truncate">{item.fee || '—'}</td>
                  <td className="px-5 py-3">
                    <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${item.isActive ? 'bg-[#44DD88]/10 text-[#44DD88]' : 'bg-red-500/10 text-red-400'}`}>
                      {item.isActive ? 'Active' : 'Hidden'}
                    </span>
                  </td>
                  <td className="px-5 py-3">
                    <div className="flex gap-2">
                      <button onClick={() => openEdit(item)}
                        className="p-1.5 rounded-lg bg-theme-tertiary hover:bg-[#FFD700]/10 hover:text-[#FFD700] text-theme-muted transition">
                        <Edit size={13} />
                      </button>
                      <button onClick={() => handleToggle(item)}
                        className="p-1.5 rounded-lg bg-theme-tertiary hover:bg-[#4488FF]/10 hover:text-[#4488FF] text-theme-muted transition text-xs px-2 font-semibold">
                        {item.isActive ? 'Hide' : 'Show'}
                      </button>
                      <button onClick={() => handleDelete(item._id)}
                        className="p-1.5 rounded-lg bg-theme-tertiary hover:bg-red-500/10 hover:text-red-400 text-theme-muted transition">
                        <Trash2 size={13} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {!loading && !listings.length && (
            <div className="p-10 text-center text-theme-muted">No programs yet for {tab}. Click "Add Program" to start.</div>
          )}
        </div>
      </div>

      {modal.open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm overflow-y-auto">
          <div className="bg-theme-secondary border border-theme rounded-2xl w-full max-w-lg my-8">
            <div className="flex items-center justify-between p-5 border-b border-theme sticky top-0 bg-theme-secondary rounded-t-2xl">
              <h3 className="text-theme-primary font-bold">{modal.item ? 'Edit Program' : 'Add Program'}</h3>
              <button onClick={() => setModal({ open: false, item: null })} className="text-theme-muted hover:text-theme-primary p-1">
                <X size={18} />
              </button>
            </div>
            <form onSubmit={handleSave} className="p-5 space-y-4 max-h-[70vh] overflow-y-auto">
              <div>
                <label className={labelClass}>Country</label>
                <select value={form.country} onChange={e => setForm(f => ({ ...f, country: e.target.value }))} className={inputClass}>
                  {COUNTRIES.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
              <div>
                <label className={labelClass}>Title</label>
                <input type="text" placeholder="e.g. Free Hotel Management Diploma" value={form.title}
                  onChange={e => setForm(f => ({ ...f, title: e.target.value }))} className={inputClass} required />
              </div>
              <div>
                <label className={labelClass}>Subtitle / Badge</label>
                <input type="text" placeholder="e.g. 100% Job Guaranteed Program" value={form.subtitle}
                  onChange={e => setForm(f => ({ ...f, subtitle: e.target.value }))} className={inputClass} />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className={labelClass}>Duration</label>
                  <input type="text" placeholder="e.g. 12 Months" value={form.duration}
                    onChange={e => setForm(f => ({ ...f, duration: e.target.value }))} className={inputClass} />
                </div>
                <div>
                  <label className={labelClass}>Fee</label>
                  <input type="text" placeholder="e.g. ₹15,000 (Uniform + Exam Fee)" value={form.fee}
                    onChange={e => setForm(f => ({ ...f, fee: e.target.value }))} className={inputClass} />
                </div>
              </div>
              <div>
                <label className={labelClass}>Internship / Perks</label>
                <input type="text" placeholder="e.g. 6 Months Paid Internship with Free Food & Accommodation" value={form.internship}
                  onChange={e => setForm(f => ({ ...f, internship: e.target.value }))} className={inputClass} />
              </div>
              <div>
                <label className={labelClass}>Certified By</label>
                <input type="text" placeholder="e.g. JNCTE – Globally Valid" value={form.certifiedBy}
                  onChange={e => setForm(f => ({ ...f, certifiedBy: e.target.value }))} className={inputClass} />
              </div>
              <div>
                <label className={labelClass}>Who Can Apply (one per line)</label>
                <textarea placeholder={"10th Pass or Above\nFreshers or Career Changers\nPassionate about Hospitality & Travel"}
                  value={form.eligibility} onChange={e => setForm(f => ({ ...f, eligibility: e.target.value }))}
                  className={inputClass} rows={3} />
              </div>
              <div>
                <label className={labelClass}>Why Choose This Program (one per line)</label>
                <textarea placeholder={"JNCTE Certified Diploma – Recognized across India\nAll-Inclusive Fee – FREE for first 25 Admissions"}
                  value={form.highlights} onChange={e => setForm(f => ({ ...f, highlights: e.target.value }))}
                  className={inputClass} rows={3} />
              </div>
              <div>
                <label className={labelClass}>What You'll Learn (one per line)</label>
                <textarea placeholder={"Core Hospitality Management Skills\nFront Office Management\nHousekeeping Operations"}
                  value={form.curriculum} onChange={e => setForm(f => ({ ...f, curriculum: e.target.value }))}
                  className={inputClass} rows={3} />
              </div>
              <div>
                <label className={labelClass}>Job Opportunities (one per line)</label>
                <textarea placeholder={"Hotel & Restaurant Management\nCruise Ship Hospitality\nAirline Catering & Cabin Services"}
                  value={form.jobRoles} onChange={e => setForm(f => ({ ...f, jobRoles: e.target.value }))}
                  className={inputClass} rows={3} />
              </div>

              <div className="flex gap-3 pt-2 sticky bottom-0 bg-theme-secondary pb-1">
                <button type="button" onClick={() => setModal({ open: false, item: null })}
                  className="flex-1 py-3 rounded-xl border border-theme text-theme-secondary hover:text-theme-primary transition text-sm font-semibold">
                  Cancel
                </button>
                <button type="submit" disabled={saving}
                  className="flex-1 py-3 rounded-xl bg-[#FFD700] text-[#0A0A0A] font-bold hover:bg-[#E6C200] transition text-sm disabled:opacity-70">
                  {saving ? 'Saving...' : modal.item ? 'Update' : 'Add Program'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
import React, { useEffect, useState } from 'react'
import { Plus, Edit, Trash2, X, Plane } from 'lucide-react'
import api from '../../api'
import toast from 'react-hot-toast'

const inputClass = "w-full input-bg border border-theme rounded-xl px-4 py-3 text-theme-primary text-sm placeholder-[var(--text-muted)] focus:border-[#22C5FF]/60"
const EMPTY = { country: '', program: '', matter: '', isActive: true }

export default function AdminStudyAbroad() {
  const [listings, setListings] = useState([])
  const [loading, setLoading]   = useState(true)
  const [modal, setModal]       = useState({ open: false, item: null })
  const [form, setForm]         = useState(EMPTY)
  const [saving, setSaving]     = useState(false)

  const load = () => {
    setLoading(true)
    api.get('/study-abroad/all').then(r => setListings(r.data)).finally(() => setLoading(false))
  }
  useEffect(load, [])

  const openAdd  = () => { setForm(EMPTY); setModal({ open: true, item: null }) }
  const openEdit = (item) => {
    setForm({ country: item.country, program: item.program, matter: item.matter, isActive: item.isActive })
    setModal({ open: true, item })
  }

  const handleSave = async (e) => {
    e.preventDefault()
    if (!form.country.trim() || !form.program.trim() || !form.matter.trim())
      return toast.error('All fields are required')
    setSaving(true)
    try {
      if (modal.item) await api.put(`/study-abroad/${modal.item._id}`, form)
      else await api.post('/study-abroad', form)
      toast.success(modal.item ? 'Updated' : 'Added')
      setModal({ open: false, item: null })
      load()
    } catch { toast.error('Failed to save') }
    finally { setSaving(false) }
  }

  const handleToggle = async (item) => {
    await api.put(`/study-abroad/${item._id}`, { isActive: !item.isActive })
    load()
  }

  const handleDelete = async (id) => {
    if (!confirm('Delete this listing?')) return
    await api.delete(`/study-abroad/${id}`)
    toast.success('Deleted')
    load()
  }

  return (
    <div>
      <div className="flex items-center justify-between flex-wrap gap-3 mb-6">
        <div>
          <h1 className="text-theme-primary font-black text-2xl flex items-center gap-2">
            <Plane size={22} style={{ color: '#22C5FF' }} /> Study + Work Abroad
          </h1>
          <p className="text-theme-secondary text-sm">{listings.length} program{listings.length !== 1 ? 's' : ''}</p>
        </div>
        <button onClick={openAdd}
          className="flex items-center gap-2 bg-[#FFD700] text-[#0A0A0A] font-bold px-4 py-2.5 rounded-xl hover:bg-[#E6C200] transition text-sm">
          <Plus size={16} /> Add Program
        </button>
      </div>

      <div className="bg-theme-card border border-theme rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-theme">
                {['#', 'Country', 'Program', 'Matter', 'Status', 'Actions'].map(h => (
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
                  <td className="px-5 py-3">
                    <span className="text-xs font-bold px-2 py-0.5 rounded-full"
                      style={{ background: 'rgba(34,197,255,0.12)', color: '#22C5FF' }}>
                      {item.country}
                    </span>
                  </td>
                  <td className="px-5 py-3 text-theme-primary font-medium max-w-[160px] truncate">{item.program}</td>
                  <td className="px-5 py-3 text-theme-secondary max-w-[200px] truncate">{item.matter}</td>
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
            <div className="p-10 text-center text-theme-muted">No programs yet. Click "Add Program" to start.</div>
          )}
        </div>
      </div>

      {modal.open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
          <div className="bg-theme-secondary border border-theme rounded-2xl w-full max-w-md">
            <div className="flex items-center justify-between p-5 border-b border-theme">
              <h3 className="text-theme-primary font-bold">{modal.item ? 'Edit Program' : 'Add Program'}</h3>
              <button onClick={() => setModal({ open: false, item: null })} className="text-theme-muted hover:text-theme-primary p-1">
                <X size={18} />
              </button>
            </div>
            <form onSubmit={handleSave} className="p-5 space-y-4">
              <div>
                <label className="text-theme-muted text-xs font-semibold uppercase tracking-wide mb-1.5 block">Country</label>
                <input type="text" placeholder="e.g. Singapore" value={form.country}
                  onChange={e => setForm(f => ({ ...f, country: e.target.value }))}
                  className={inputClass} required />
              </div>
              <div>
                <label className="text-theme-muted text-xs font-semibold uppercase tracking-wide mb-1.5 block">Program</label>
                <input type="text" placeholder="e.g. Hotel Management" value={form.program}
                  onChange={e => setForm(f => ({ ...f, program: e.target.value }))}
                  className={inputClass} required />
              </div>
              <div>
                <label className="text-theme-muted text-xs font-semibold uppercase tracking-wide mb-1.5 block">Details / Matter</label>
                <textarea placeholder="e.g. Study in Singapore with paid internships upto 50,000 INR monthly"
                  value={form.matter}
                  onChange={e => setForm(f => ({ ...f, matter: e.target.value }))}
                  className={inputClass} rows={3} required />
              </div>
              <div className="flex gap-3 pt-2">
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
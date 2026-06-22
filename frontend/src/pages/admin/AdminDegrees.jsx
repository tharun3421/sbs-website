import React, { useState, useEffect } from 'react'
import { Plus, Edit, Trash2, X, Upload } from 'lucide-react'
import api from '../../api'
import toast from 'react-hot-toast'

const EMPTY = { university: '', course: '', duration: '3 Year Program', type: 'UGC Recognized', description: '' }

const inputClass = "w-full input-bg border border-theme rounded-xl px-4 py-3 text-theme-primary text-sm placeholder-[var(--text-muted)] focus:border-[#FFD700]/60"

export default function AdminDegrees() {
  const [degrees, setDegrees] = useState([])
  const [loading, setLoading] = useState(true)
  const [modal, setModal] = useState({ open: false, degree: null })
  const [form, setForm] = useState(EMPTY)
  const [logo, setLogo] = useState(null)
  const [saving, setSaving] = useState(false)

  const load = () => {
    setLoading(true)
    api.get('/degrees/all').then(r => setDegrees(r.data)).finally(() => setLoading(false))
  }
  useEffect(load, [])

  const openAdd = () => { setForm(EMPTY); setLogo(null); setModal({ open: true, degree: null }) }
  const openEdit = (deg) => { setForm({ ...deg }); setLogo(null); setModal({ open: true, degree: deg }) }

  const handleSave = async (e) => {
    e.preventDefault()
    setSaving(true)
    try {
      const fd = new FormData()
      Object.entries(form).forEach(([k, v]) => fd.append(k, v))
      if (logo) fd.append('logo', logo)
      if (modal.degree) await api.put(`/degrees/${modal.degree._id}`, fd)
      else await api.post('/degrees', fd)
      toast.success(modal.degree ? 'Degree updated' : 'Degree added')
      setModal({ open: false, degree: null })
      load()
    } catch { toast.error('Failed to save') }
    finally { setSaving(false) }
  }

  const handleDelete = async (id) => {
    if (!confirm('Remove this degree?')) return
    await api.delete(`/degrees/${id}`)
    toast.success('Degree removed')
    load()
  }

  return (
    <div>
      <div className="flex items-center justify-between flex-wrap gap-3 mb-6">
        <div>
          <h1 className="text-theme-primary font-black text-2xl">Online Degrees</h1>
          <p className="text-theme-secondary text-sm">{degrees.length} programs listed</p>
        </div>
        <button onClick={openAdd}
          className="flex items-center gap-2 bg-[#FFD700] text-[#0A0A0A] font-bold px-4 py-2.5 rounded-xl hover:bg-[#E6C200] transition text-sm">
          <Plus size={16} /> Add Degree
        </button>
      </div>

      <div className="bg-theme-card border border-theme rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-theme">
                {['University', 'Course', 'Duration', 'Type', 'Status', 'Actions'].map(h => (
                  <th key={h} className="text-left px-5 py-3 text-theme-muted font-medium text-xs whitespace-nowrap">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {loading ? (
                [...Array(4)].map((_, i) => (
                  <tr key={i} className="border-b border-theme">
                    {[...Array(6)].map((_, j) => <td key={j} className="px-5 py-4"><div className="h-3 bg-theme-tertiary rounded animate-pulse" /></td>)}
                  </tr>
                ))
              ) : degrees.map(deg => (
                <tr key={deg._id} className="border-b border-theme hover:bg-theme-tertiary transition">
                  <td className="px-5 py-3">
                    <div className="flex items-center gap-2">
                      {deg.logo
                        ? <img src={deg.logo} alt="" className="h-7 w-14 object-contain bg-white rounded px-1" />
                        : <div className="w-7 h-7 rounded bg-[#4488FF]/10 flex items-center justify-center text-[#4488FF] text-xs font-bold">{deg.university[0]}</div>}
                      <span className="text-theme-primary font-medium whitespace-nowrap">{deg.university}</span>
                    </div>
                  </td>
                  <td className="px-5 py-3 text-theme-secondary max-w-[180px] truncate">{deg.course}</td>
                  <td className="px-5 py-3 text-theme-secondary whitespace-nowrap">{deg.duration}</td>
                  <td className="px-5 py-3">
                    <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-[#4488FF]/10 text-[#4488FF]">{deg.type}</span>
                  </td>
                  <td className="px-5 py-3">
                    <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${deg.isActive ? 'bg-[#44DD88]/10 text-[#44DD88]' : 'bg-red-500/10 text-red-400'}`}>
                      {deg.isActive ? 'Active' : 'Hidden'}
                    </span>
                  </td>
                  <td className="px-5 py-3">
                    <div className="flex gap-2">
                      <button onClick={() => openEdit(deg)} className="p-1.5 rounded-lg bg-theme-tertiary hover:bg-[#FFD700]/10 hover:text-[#FFD700] text-theme-muted transition"><Edit size={13} /></button>
                      <button onClick={() => handleDelete(deg._id)} className="p-1.5 rounded-lg bg-theme-tertiary hover:bg-red-500/10 hover:text-red-400 text-theme-muted transition"><Trash2 size={13} /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {!loading && !degrees.length && <div className="p-10 text-center text-theme-muted">No degrees listed yet.</div>}
        </div>
      </div>

      {modal.open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
          <div className="bg-theme-secondary border border-theme rounded-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-5 border-b border-theme">
              <h3 className="text-theme-primary font-bold">{modal.degree ? 'Edit Degree' : 'Add Degree Program'}</h3>
              <button onClick={() => setModal({ open: false, degree: null })} className="text-theme-muted hover:text-theme-primary p-1"><X size={18} /></button>
            </div>
            <form onSubmit={handleSave} className="p-5 space-y-4">
              {[
                { key: 'university', label: 'University Name', placeholder: 'e.g. Andhra University' },
                { key: 'course', label: 'Course / Degree', placeholder: 'e.g. Bachelor of Commerce (B.Com)' },
                { key: 'duration', label: 'Duration', placeholder: 'e.g. 3 Year Program' },
                { key: 'type', label: 'Recognition', placeholder: 'e.g. UGC Recognized' },
              ].map(({ key, label, placeholder }) => (
                <div key={key}>
                  <label className="text-theme-muted text-xs font-semibold uppercase tracking-wide mb-1.5 block">{label}</label>
                  <input type="text" placeholder={placeholder} value={form[key]}
                    onChange={e => setForm(f => ({ ...f, [key]: e.target.value }))}
                    className={inputClass}
                    required={['university', 'course'].includes(key)} />
                </div>
              ))}
              <div>
                <label className="text-theme-muted text-xs font-semibold uppercase tracking-wide mb-1.5 block">Description</label>
                <textarea rows={3} placeholder="Brief description..." value={form.description}
                  onChange={e => setForm(f => ({ ...f, description: e.target.value }))}
                  className={`${inputClass} resize-none`} />
              </div>
              <div>
                <label className="text-theme-muted text-xs font-semibold uppercase tracking-wide mb-1.5 block">University Logo</label>
                <label className="flex items-center gap-3 p-3 border border-dashed border-theme rounded-xl cursor-pointer hover:border-[#FFD700]/40 transition input-bg">
                  <Upload size={16} className="text-theme-muted" />
                  <span className="text-theme-secondary text-sm">{logo ? logo.name : 'Upload logo image'}</span>
                  <input type="file" accept="image/*" onChange={e => setLogo(e.target.files[0])} className="hidden" />
                </label>
              </div>
              <div className="flex gap-3 pt-2">
                <button type="button" onClick={() => setModal({ open: false, degree: null })}
                  className="flex-1 py-3 rounded-xl border border-theme text-theme-secondary hover:text-theme-primary hover:border-theme-gold transition text-sm font-semibold">Cancel</button>
                <button type="submit" disabled={saving}
                  className="flex-1 py-3 rounded-xl bg-[#FFD700] text-[#0A0A0A] font-bold hover:bg-[#E6C200] transition text-sm disabled:opacity-70">
                  {saving ? 'Saving...' : modal.degree ? 'Update' : 'Add Degree'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
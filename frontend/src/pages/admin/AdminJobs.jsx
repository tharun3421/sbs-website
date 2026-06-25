import React, { useState, useEffect } from 'react'
import { Plus, Edit, Trash2, X, Upload } from 'lucide-react'
import api from '../../api'
import toast from 'react-hot-toast'

const EMPTY = { title: '', company: '', location: '', salary: '', type: 'free', category: 'General', experience: 'Fresher', description: '' }

export default function AdminJobs() {
  const [jobs, setJobs] = useState([])
  const [loading, setLoading] = useState(true)  
  const [modal, setModal] = useState({ open: false, job: null })
  const [form, setForm] = useState(EMPTY)
  const [logo, setLogo] = useState(null)
  const [saving, setSaving] = useState(false)

  const load = () => {
    setLoading(true)
    api.get('/jobs/all').then(r => setJobs(r.data)).finally(() => setLoading(false))
  }
  useEffect(load, [])

  const openAdd = () => { setForm(EMPTY); setLogo(null); setModal({ open: true, job: null }) }
  const openEdit = (job) => { setForm({ ...job }); setLogo(null); setModal({ open: true, job }) }

  const handleSave = async (e) => {
    e.preventDefault()
    setSaving(true)
    try {
      const fd = new FormData()
      Object.entries(form).forEach(([k, v]) => fd.append(k, v))
      if (logo) fd.append('logo', logo)
      if (modal.job) await api.put(`/jobs/${modal.job._id}`, fd)
      else await api.post('/jobs', fd)
      toast.success(modal.job ? 'Job updated' : 'Job added')
      setModal({ open: false, job: null })
      load()
    } catch { toast.error('Failed to save') }
    finally { setSaving(false) }
  }

  const handleDelete = async (id) => {
    if (!confirm('Remove this job?')) return
    await api.delete(`/jobs/${id}`)
    toast.success('Job removed')
    load()
  }

  const inputClass = "w-full input-bg border border-theme rounded-xl px-4 py-3 text-theme-primary text-sm placeholder-[var(--text-muted)] focus:border-[#FFD700]/60"

  return (
    <div>
      <div className="flex items-center justify-between flex-wrap gap-3 mb-6">
        <div>
          <h1 className="text-theme-primary font-black text-2xl">Jobs</h1>
          <p className="text-theme-secondary text-sm">{jobs.length} total listings</p>
        </div>
        <button onClick={openAdd}
          className="flex items-center gap-2 bg-[#FFD700] text-[#0A0A0A] font-bold px-4 py-2.5 rounded-xl hover:bg-[#E6C200] transition text-sm">
          <Plus size={16} /> Add Job
        </button>
      </div>

      {/* Table */}
      <div className="bg-theme-card border border-theme rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-theme">
                {['Company', 'Title', 'Location', 'Salary', 'Type', 'Status', 'Actions'].map(h => (
                  <th key={h} className="text-left px-5 py-3 text-theme-muted font-medium text-xs whitespace-nowrap">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {loading ? (
                [...Array(5)].map((_, i) => (
                  <tr key={i} className="border-b border-theme">
                    {[...Array(7)].map((_, j) => <td key={j} className="px-5 py-4"><div className="h-3 bg-theme-tertiary rounded animate-pulse" /></td>)}
                  </tr>
                ))
              ) : jobs.map(job => (
                <tr key={job._id} className="border-b border-theme hover:bg-theme-tertiary transition">
                  <td className="px-5 py-3">
                    <div className="flex items-center gap-2">
                      {/* {job.logo
                        ? <img src={job.logo} alt="" className="w-7 h-7 rounded bg-white object-contain p-0.5" />
                        : <div className="w-7 h-7 rounded bg-[#FFD700]/10 flex items-center justify-center text-[#FFD700] text-xs font-bold">{job.company[0]}</div>} */}
                      <span className="text-theme-primary font-medium whitespace-nowrap">{job.company}</span>
                    </div>
                  </td>
                  <td className="px-5 py-3 text-theme-secondary max-w-[160px] truncate">{job.title}</td>
                  <td className="px-5 py-3 text-theme-secondary whitespace-nowrap">{job.location}</td>
                  <td className="px-5 py-3 text-theme-secondary whitespace-nowrap">{job.salary}</td>
                  <td className="px-5 py-3">
                    <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${job.type === 'free' ? 'bg-[#44DD88]/10 text-[#44DD88]' : 'bg-[#FFD700]/10 text-[#FFD700]'}`}>
                      {job.type}
                    </span>
                  </td>
                  <td className="px-5 py-3">
                    <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${job.isActive ? 'bg-[#44DD88]/10 text-[#44DD88]' : 'bg-red-500/10 text-red-400'}`}>
                      {job.isActive ? 'Active' : 'Hidden'}
                    </span>
                  </td>
                  <td className="px-5 py-3">
                    <div className="flex gap-2">
                      <button onClick={() => openEdit(job)} className="p-1.5 rounded-lg bg-theme-tertiary hover:bg-[#FFD700]/10 hover:text-[#FFD700] text-theme-muted transition">
                        <Edit size={13} />
                      </button>
                      <button onClick={() => handleDelete(job._id)} className="p-1.5 rounded-lg bg-theme-tertiary hover:bg-red-500/10 hover:text-red-400 text-theme-muted transition">
                        <Trash2 size={13} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {!loading && !jobs.length && <div className="p-10 text-center text-theme-muted">No jobs. Click "Add Job" to start.</div>}
        </div>
      </div>

      {/* Modal */}
      {modal.open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
          <div className="bg-theme-secondary border border-theme rounded-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-5 border-b border-theme">
              <h3 className="text-theme-primary font-bold">{modal.job ? 'Edit Job' : 'Add New Job'}</h3>
              <button onClick={() => setModal({ open: false, job: null })} className="text-theme-muted hover:text-theme-primary p-1"><X size={18} /></button>
            </div>
            <form onSubmit={handleSave} className="p-5 space-y-4">
              {[
                { key: 'title', label: 'Job Title', type: 'text', placeholder: 'e.g. Sales Executive' },
                { key: 'company', label: 'Company', type: 'text', placeholder: 'e.g. Paytm' },
                { key: 'location', label: 'Location', type: 'text', placeholder: 'e.g. Hyderabad' },
                { key: 'salary', label: 'Salary Range', type: 'text', placeholder: 'e.g. ₹20,000 - ₹30,000' },
                { key: 'experience', label: 'Experience', type: 'text', placeholder: 'e.g. Fresher / 2-4 Years' },
                { key: 'description', label: 'Description', type: 'textarea', placeholder: 'Job description...' },
              ].map(({ key, label, type, placeholder }) => (
                <div key={key}>
                  <label className="text-theme-muted text-xs font-semibold uppercase tracking-wide mb-1.5 block">{label}</label>
                  {type === 'textarea' ? (
                    <textarea rows={3} placeholder={placeholder} value={form[key]}
                      onChange={e => setForm(f => ({ ...f, [key]: e.target.value }))}
                      className={`${inputClass} resize-none`} />
                  ) : (
                    <input type={type} placeholder={placeholder} value={form[key]}
                      onChange={e => setForm(f => ({ ...f, [key]: e.target.value }))}
                      className={inputClass}
                      required={['title', 'company', 'location'].includes(key)} />
                  )}
                </div>
              ))}

              <div className="grid grid-cols-1 gap-4">
                <div>
                  <label className="text-theme-muted text-xs font-semibold uppercase tracking-wide mb-1.5 block">Type</label>
                  <select value={form.type} onChange={e => setForm(f => ({ ...f, type: e.target.value }))}
                    className={inputClass}>
                    <option value="free">Free</option>
                    <option value="paid">Paid/Training</option>
                  </select>
                </div>
                {/* <div>
                  <label className="text-theme-muted text-xs font-semibold uppercase tracking-wide mb-1.5 block">Category</label>
                  <input type="text" value={form.category} placeholder="e.g. IT, Finance"
                    onChange={e => setForm(f => ({ ...f, category: e.target.value }))}
                    className={inputClass} />
                </div> */}
              </div>
{/* 
              <div>
                <label className="text-theme-muted text-xs font-semibold uppercase tracking-wide mb-1.5 block">Company Logo</label>
                <label className="flex items-center gap-3 p-3 border border-dashed border-theme rounded-xl cursor-pointer hover:border-[#FFD700]/40 transition input-bg">
                  <Upload size={16} className="text-theme-muted" />
                  <span className="text-theme-secondary text-sm">{logo ? logo.name : 'Upload logo image'}</span>
                  <input type="file" accept="image/*" onChange={e => setLogo(e.target.files[0])} className="hidden" />
                </label>
              </div> */}

              <div className="flex gap-3 pt-2">
                <button type="button" onClick={() => setModal({ open: false, job: null })}
                  className="flex-1 py-3 rounded-xl border border-theme text-theme-secondary hover:text-theme-primary hover:border-theme-gold transition text-sm font-semibold">
                  Cancel
                </button>
                <button type="submit" disabled={saving}
                  className="flex-1 py-3 rounded-xl bg-[#FFD700] text-[#0A0A0A] font-bold hover:bg-[#E6C200] transition text-sm disabled:opacity-70">
                  {saving ? 'Saving...' : modal.job ? 'Update Job' : 'Add Job'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
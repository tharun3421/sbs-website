import React, { useEffect, useState } from 'react'
import { Plus, Edit, Trash2, X } from 'lucide-react'
import api from '../../api'
import toast from 'react-hot-toast'

const inputClass = "w-full input-bg border border-theme rounded-xl px-4 py-3 text-theme-primary text-sm placeholder-[var(--text-muted)] focus:border-[#FFD700]/60"

export default function AdminLoans() {
  const [loans, setLoans]     = useState([])
  const [loading, setLoading] = useState(true)
  const [modal, setModal]     = useState({ open: false, loan: null })
  const [form, setForm]       = useState({ name: '' })
  const [saving, setSaving]   = useState(false)

  const load = () => {
    setLoading(true)
    api.get('/loans/all').then(r => setLoans(r.data)).finally(() => setLoading(false))
  }
  useEffect(load, [])

  const openAdd  = () => { setForm({ name: '' }); setModal({ open: true, loan: null }) }
  const openEdit = (loan) => { setForm({ name: loan.name, isActive: loan.isActive }); setModal({ open: true, loan }) }

  const handleSave = async (e) => {
    e.preventDefault()
    if (!form.name.trim()) return toast.error('Name is required')
    setSaving(true)
    try {
      if (modal.loan) await api.put(`/loans/${modal.loan._id}`, form)
      else await api.post('/loans', form)
      toast.success(modal.loan ? 'Loan updated' : 'Loan added')
      setModal({ open: false, loan: null })
      load()
    } catch { toast.error('Failed to save') }
    finally { setSaving(false) }
  }

  const handleToggle = async (loan) => {
    await api.put(`/loans/${loan._id}`, { isActive: !loan.isActive })
    load()
  }

  const handleDelete = async (id) => {
    if (!confirm('Delete this loan category?')) return
    await api.delete(`/loans/${id}`)
    toast.success('Deleted')
    load()
  }

  return (
    <div>
      <div className="flex items-center justify-between flex-wrap gap-3 mb-6">
        <div>
          <h1 className="text-theme-primary font-black text-2xl">Loan Categories</h1>
          <p className="text-theme-secondary text-sm">{loans.length} categories</p>
        </div>
        <button onClick={openAdd}
          className="flex items-center gap-2 bg-[#FFD700] text-[#0A0A0A] font-bold px-4 py-2.5 rounded-xl hover:bg-[#E6C200] transition text-sm">
          <Plus size={16} /> Add Loan
        </button>
      </div>

      <div className="bg-theme-card border border-theme rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-theme">
                {['#', 'Name', 'Status', 'Actions'].map(h => (
                  <th key={h} className="text-left px-5 py-3 text-theme-muted font-medium text-xs">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {loading ? (
                [...Array(5)].map((_, i) => (
                  <tr key={i} className="border-b border-theme">
                    {[...Array(4)].map((_, j) => (
                      <td key={j} className="px-5 py-4"><div className="h-3 bg-theme-tertiary rounded animate-pulse" /></td>
                    ))}
                  </tr>
                ))
              ) : loans.map((loan, i) => (
                <tr key={loan._id} className="border-b border-theme last:border-0 hover:bg-theme-tertiary transition">
                  <td className="px-5 py-3 text-theme-muted">{i + 1}</td>
                  <td className="px-5 py-3 text-theme-primary font-medium">{loan.name}</td>
                  <td className="px-5 py-3">
                    <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${loan.isActive ? 'bg-[#44DD88]/10 text-[#44DD88]' : 'bg-red-500/10 text-red-400'}`}>
                      {loan.isActive ? 'Active' : 'Hidden'}
                    </span>
                  </td>
                  <td className="px-5 py-3">
                    <div className="flex gap-2">
                      <button onClick={() => openEdit(loan)}
                        className="p-1.5 rounded-lg bg-theme-tertiary hover:bg-[#FFD700]/10 hover:text-[#FFD700] text-theme-muted transition">
                        <Edit size={13} />
                      </button>
                      <button onClick={() => handleToggle(loan)}
                        className="p-1.5 rounded-lg bg-theme-tertiary hover:bg-[#4488FF]/10 hover:text-[#4488FF] text-theme-muted transition text-xs px-2 font-semibold">
                        {loan.isActive ? 'Hide' : 'Show'}
                      </button>
                      <button onClick={() => handleDelete(loan._id)}
                        className="p-1.5 rounded-lg bg-theme-tertiary hover:bg-red-500/10 hover:text-red-400 text-theme-muted transition">
                        <Trash2 size={13} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {!loading && !loans.length && (
            <div className="p-10 text-center text-theme-muted">No loans yet. Click "Add Loan" to start.</div>
          )}
        </div>
      </div>

      {/* Modal */}
      {modal.open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
          <div className="bg-theme-secondary border border-theme rounded-2xl w-full max-w-md">
            <div className="flex items-center justify-between p-5 border-b border-theme">
              <h3 className="text-theme-primary font-bold">{modal.loan ? 'Edit Loan' : 'Add Loan Category'}</h3>
              <button onClick={() => setModal({ open: false, loan: null })} className="text-theme-muted hover:text-theme-primary p-1">
                <X size={18} />
              </button>
            </div>
            <form onSubmit={handleSave} className="p-5 space-y-4">
              <div>
                <label className="text-theme-muted text-xs font-semibold uppercase tracking-wide mb-1.5 block">Category Name</label>
                <input type="text" placeholder="e.g. Personal Loan" value={form.name}
                  onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                  className={inputClass} required />
              </div>
              <div className="flex gap-3 pt-2">
                <button type="button" onClick={() => setModal({ open: false, loan: null })}
                  className="flex-1 py-3 rounded-xl border border-theme text-theme-secondary hover:text-theme-primary transition text-sm font-semibold">
                  Cancel
                </button>
                <button type="submit" disabled={saving}
                  className="flex-1 py-3 rounded-xl bg-[#FFD700] text-[#0A0A0A] font-bold hover:bg-[#E6C200] transition text-sm disabled:opacity-70">
                  {saving ? 'Saving...' : modal.loan ? 'Update' : 'Add Loan'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
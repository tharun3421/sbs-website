import React, { useState, useEffect } from 'react'
import { Plus, Edit, Trash2, X } from 'lucide-react'
import api from '../../api'
import toast from 'react-hot-toast'

const EMPTY = { company: '', title: '', description: '', category: 'General' }

const inputClass = "w-full input-bg border border-theme rounded-xl px-4 py-3 text-theme-primary text-sm placeholder-[var(--text-muted)] focus:border-[#FFD700]/60"

export default function AdminOffers() {
  const [offers, setOffers] = useState([])
  const [loading, setLoading] = useState(true)
  const [modal, setModal] = useState({ open: false, offer: null })
  const [form, setForm] = useState(EMPTY)
  const [saving, setSaving] = useState(false)

  const load = () => {
    setLoading(true)
    api.get('/offers/all').then(r => setOffers(r.data)).finally(() => setLoading(false))
  }
  useEffect(load, [])

  const openAdd = () => { setForm(EMPTY); setModal({ open: true, offer: null }) }
  const openEdit = (o) => { setForm({ ...o }); setModal({ open: true, offer: o }) }

  const handleSave = async (e) => {
    e.preventDefault()
    setSaving(true)
    try {
      if (modal.offer) await api.put(`/offers/${modal.offer._id}`, form)
      else await api.post('/offers', form)
      toast.success(modal.offer ? 'Offer updated' : 'Offer added')
      setModal({ open: false, offer: null })
      load()
    } catch { toast.error('Failed to save') }
    finally { setSaving(false) }
  }

  const handleDelete = async (id) => {
    if (!confirm('Remove this offer?')) return
    await api.delete(`/offers/${id}`)
    toast.success('Offer deleted')
    load()
  }

  return (
    <div>
      <div className="flex items-center justify-between flex-wrap gap-3 mb-6">
        <div>
          <h1 className="text-theme-primary font-black text-2xl">Business Offers</h1>
          <p className="text-theme-secondary text-sm">{offers.length} offers listed</p>
        </div>
        <button onClick={openAdd}
          className="flex items-center gap-2 bg-[#FFD700] text-[#0A0A0A] font-bold px-4 py-2.5 rounded-xl hover:bg-[#E6C200] transition text-sm">
          <Plus size={16} /> Add Offer
        </button>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {loading ? (
          [...Array(3)].map((_, i) => (
            <div key={i} className="bg-theme-secondary rounded-2xl h-40 animate-pulse" />
          ))
        ) : offers.map(offer => (
          <div key={offer._id} className="bg-theme-card border border-theme rounded-2xl p-4 flex flex-col gap-3">
            <div>
              <span className="text-xs text-[#FFD700] font-semibold">{offer.category}</span>
              <h3 className="text-theme-primary font-bold text-sm mt-0.5 mb-0.5 line-clamp-1">{offer.title}</h3>
              <p className="text-theme-muted text-xs line-clamp-2">{offer.description}</p>
            </div>
            <div className="flex gap-2 mt-auto">
              <button onClick={() => openEdit(offer)}
                className="flex-1 py-2 rounded-lg bg-theme-tertiary hover:bg-[#FFD700]/10 hover:text-[#FFD700] text-theme-secondary transition text-xs font-semibold flex items-center justify-center gap-1.5">
                <Edit size={12} /> Edit
              </button>
              <button onClick={() => handleDelete(offer._id)}
                className="flex-1 py-2 rounded-lg bg-theme-tertiary hover:bg-red-500/10 hover:text-red-400 text-theme-secondary transition text-xs font-semibold flex items-center justify-center gap-1.5">
                <Trash2 size={12} /> Delete
              </button>
            </div>
          </div>
        ))}
        {!loading && !offers.length && (
          <div className="col-span-3 py-20 text-center text-theme-muted">No offers yet.</div>
        )}
      </div>

      {modal.open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
          <div className="bg-theme-secondary border border-theme rounded-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-5 border-b border-theme">
              <h3 className="text-theme-primary font-bold">{modal.offer ? 'Edit Offer' : 'Add Business Offer'}</h3>
              <button onClick={() => setModal({ open: false, offer: null })} className="text-theme-muted hover:text-theme-primary p-1">
                <X size={18} />
              </button>
            </div>
            <form onSubmit={handleSave} className="p-5 space-y-4">
              {[
                { key: 'company', label: 'Company / Brand', placeholder: 'e.g. Kobra Alkaline Water' },
                { key: 'title', label: 'Offer Title', placeholder: 'e.g. Dealership Opportunity' },
                { key: 'category', label: 'Category', placeholder: 'e.g. Franchise, Energy, FMCG' },
              ].map(({ key, label, placeholder }) => (
                <div key={key}>
                  <label className="text-theme-muted text-xs font-semibold uppercase tracking-wide mb-1.5 block">{label}</label>
                  <input type="text" placeholder={placeholder} value={form[key]}
                    onChange={e => setForm(f => ({ ...f, [key]: e.target.value }))}
                    className={inputClass}
                    required={['company', 'title'].includes(key)} />
                </div>
              ))}
              <div>
                <label className="text-theme-muted text-xs font-semibold uppercase tracking-wide mb-1.5 block">Description</label>
                <textarea rows={4} placeholder="Describe the offer..." value={form.description}
                  onChange={e => setForm(f => ({ ...f, description: e.target.value }))}
                  className={`${inputClass} resize-none`} />
              </div>
              <div className="flex gap-3 pt-2">
                <button type="button" onClick={() => setModal({ open: false, offer: null })}
                  className="flex-1 py-3 rounded-xl border border-theme text-theme-secondary hover:text-theme-primary transition text-sm font-semibold">
                  Cancel
                </button>
                <button type="submit" disabled={saving}
                  className="flex-1 py-3 rounded-xl bg-[#FFD700] text-[#0A0A0A] font-bold hover:bg-[#E6C200] transition text-sm disabled:opacity-70">
                  {saving ? 'Saving...' : modal.offer ? 'Update' : 'Add Offer'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
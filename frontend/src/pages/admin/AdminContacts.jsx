import React, { useEffect, useState } from 'react'
import { Plus, Edit, Trash2, X, MapPin, User, Phone, ChevronDown, ChevronUp } from 'lucide-react'
import api from '../../api'
import toast from 'react-hot-toast'

const inputClass = "w-full input-bg border border-theme rounded-xl px-4 py-3 text-theme-primary text-sm placeholder-[var(--text-muted)] focus:border-[#FFD700]/60"
const smallInputClass = "w-full input-bg border border-theme rounded-lg px-3 py-2 text-theme-primary text-sm placeholder-[var(--text-muted)] focus:border-[#FFD700]/60"

const emptyPerson   = () => ({ name: '', phone: '' })
const emptyDistrict = () => ({ district: '', persons: [emptyPerson()] })
const emptyForm     = () => ({ state: '', order: 0, districts: [emptyDistrict()] })

export default function AdminContacts() {
  const [contacts, setContacts] = useState([])
  const [loading, setLoading]   = useState(true)
  const [modal, setModal]       = useState({ open: false, contact: null })
  const [form, setForm]         = useState(emptyForm())
  const [saving, setSaving]     = useState(false)
  const [expanded, setExpanded] = useState({})

  const load = () => {
    setLoading(true)
    api.get('/contacts').then(r => setContacts(r.data)).finally(() => setLoading(false))
  }
  useEffect(load, [])

  const openAdd = () => { setForm(emptyForm()); setModal({ open: true, contact: null }) }
  const openEdit = (c) => {
    setForm({
      state: c.state,
      order: c.order || 0,
      districts: c.districts.length
        ? c.districts.map(d => ({ district: d.district, persons: d.persons.length ? d.persons.map(p => ({ name: p.name, phone: p.phone })) : [emptyPerson()] }))
        : [emptyDistrict()],
    })
    setModal({ open: true, contact: c })
  }
  const closeModal = () => setModal({ open: false, contact: null })

  const toggleExpand = (id) => setExpanded(e => ({ ...e, [id]: !e[id] }))

  // --- district helpers ---
  const addDistrict = () => setForm(f => ({ ...f, districts: [...f.districts, emptyDistrict()] }))
  const removeDistrict = (di) => setForm(f => ({ ...f, districts: f.districts.filter((_, i) => i !== di) }))
  const updateDistrict = (di, value) => setForm(f => ({
    ...f, districts: f.districts.map((d, i) => i === di ? { ...d, district: value } : d)
  }))

  // --- person helpers ---
  const addPerson = (di) => setForm(f => ({
    ...f, districts: f.districts.map((d, i) => i === di ? { ...d, persons: [...d.persons, emptyPerson()] } : d)
  }))
  const removePerson = (di, pi) => setForm(f => ({
    ...f, districts: f.districts.map((d, i) => i === di ? { ...d, persons: d.persons.filter((_, j) => j !== pi) } : d)
  }))
  const updatePerson = (di, pi, field, value) => setForm(f => ({
    ...f,
    districts: f.districts.map((d, i) => i === di
      ? { ...d, persons: d.persons.map((p, j) => j === pi ? { ...p, [field]: value } : p) }
      : d)
  }))

  const validate = () => {
    if (!form.state.trim()) { toast.error('State name is required'); return false }
    if (!form.districts.length) { toast.error('Add at least one district'); return false }
    for (const d of form.districts) {
      if (!d.district.trim()) { toast.error('Every district needs a name'); return false }
      if (!d.persons.length) { toast.error(`Add at least one person for ${d.district || 'a district'}`); return false }
      for (const p of d.persons) {
        if (!p.name.trim() || !p.phone.trim()) { toast.error(`Fill name & phone for all contacts in ${d.district}`); return false }
      }
    }
    return true
  }

  const handleSave = async (e) => {
    e.preventDefault()
    if (!validate()) return
    setSaving(true)
    const payload = {
      state: form.state.trim(),
      order: Number(form.order) || 0,
      districts: form.districts.map(d => ({
        district: d.district.trim(),
        persons: d.persons.map(p => ({ name: p.name.trim(), phone: p.phone.trim() })),
      })),
    }
    try {
      if (modal.contact) await api.put(`/contacts/${modal.contact._id}`, payload)
      else await api.post('/contacts', payload)
      toast.success(modal.contact ? 'Contact card updated' : 'Contact card added')
      closeModal()
      load()
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to save')
    } finally {
      setSaving(false)
    }
  }

  const handleDelete = async (id) => {
    if (!confirm('Delete this entire state card? This removes all its districts and contacts.')) return
    try {
      await api.delete(`/contacts/${id}`)
      toast.success('Deleted')
      load()
    } catch {
      toast.error('Failed to delete')
    }
  }

  return (
    <div>
      <div className="flex items-center justify-between flex-wrap gap-3 mb-6">
        <div>
          <h1 className="text-theme-primary font-black text-2xl">Contact Directory</h1>
          <p className="text-theme-secondary text-sm">{contacts.length} state{contacts.length === 1 ? '' : 's'}</p>
        </div>
        <button onClick={openAdd}
          className="flex items-center gap-2 bg-[#FFD700] text-[#0A0A0A] font-bold px-4 py-2.5 rounded-xl hover:bg-[#E6C200] transition text-sm">
          <Plus size={16} /> Add State
        </button>
      </div>

      {loading ? (
        <div className="space-y-3">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="bg-theme-card border border-theme rounded-2xl h-20 animate-pulse" />
          ))}
        </div>
      ) : !contacts.length ? (
        <div className="bg-theme-card border border-theme rounded-2xl p-10 text-center text-theme-muted">
          No contact cards yet. Click "Add State" to start.
        </div>
      ) : (
        <div className="space-y-4">
          {contacts.map((c) => {
            const isOpen = !!expanded[c._id]
            const personCount = c.districts.reduce((sum, d) => sum + d.persons.length, 0)
            return (
              <div key={c._id} className="bg-theme-card border border-theme rounded-2xl overflow-hidden">
                <div className="flex items-center gap-3 px-5 py-4 cursor-pointer" onClick={() => toggleExpand(c._id)}>
                  <div className="w-9 h-9 rounded-lg flex items-center justify-center bg-[#FF4444]/10 shrink-0">
                    <MapPin size={16} className="text-[#FF4444]" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-theme-primary font-bold">{c.state}</p>
                    <p className="text-theme-muted text-xs">
                      {c.districts.length} district{c.districts.length === 1 ? '' : 's'} · {personCount} contact{personCount === 1 ? '' : 's'} · order {c.order}
                    </p>
                  </div>
                  <button onClick={(e) => { e.stopPropagation(); openEdit(c) }}
                    className="p-1.5 rounded-lg bg-theme-tertiary hover:bg-[#FFD700]/10 hover:text-[#FFD700] text-theme-muted transition">
                    <Edit size={13} />
                  </button>
                  <button onClick={(e) => { e.stopPropagation(); handleDelete(c._id) }}
                    className="p-1.5 rounded-lg bg-theme-tertiary hover:bg-red-500/10 hover:text-red-400 text-theme-muted transition">
                    <Trash2 size={13} />
                  </button>
                  {isOpen ? <ChevronUp size={16} className="text-theme-muted" /> : <ChevronDown size={16} className="text-theme-muted" />}
                </div>

                {isOpen && (
                  <div className="border-t border-theme divide-y divide-theme">
                    {c.districts.map((d, di) => (
                      <div key={di} className="px-5 py-3">
                        <p className="text-xs font-semibold uppercase tracking-widest text-[#FF4444] mb-2">{d.district}</p>
                        <div className="space-y-1.5">
                          {d.persons.map((p, pi) => (
                            <div key={pi} className="flex items-center justify-between text-sm">
                              <span className="text-theme-primary flex items-center gap-1.5"><User size={12} className="text-theme-muted" />{p.name}</span>
                              <span className="text-theme-secondary font-mono flex items-center gap-1.5"><Phone size={12} />{p.phone}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )
          })}
        </div>
      )}

      {/* Modal */}
      {modal.open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
          <div className="bg-theme-secondary border border-theme rounded-2xl w-full max-w-2xl max-h-[90vh] flex flex-col">
            <div className="flex items-center justify-between p-5 border-b border-theme shrink-0">
              <h3 className="text-theme-primary font-bold">{modal.contact ? 'Edit State Card' : 'Add State Card'}</h3>
              <button onClick={closeModal} className="text-theme-muted hover:text-theme-primary p-1">
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleSave} className="p-5 space-y-5 overflow-y-auto">
              <div className="grid grid-cols-3 gap-3">
                <div className="col-span-2">
                  <label className="text-theme-muted text-xs font-semibold uppercase tracking-wide mb-1.5 block">State Name</label>
                  <input type="text" placeholder="e.g. Andhra Pradesh" value={form.state}
                    onChange={e => setForm(f => ({ ...f, state: e.target.value }))}
                    className={inputClass} required />
                </div>
                <div>
                  <label className="text-theme-muted text-xs font-semibold uppercase tracking-wide mb-1.5 block">Order</label>
                  <input type="number" value={form.order}
                    onChange={e => setForm(f => ({ ...f, order: e.target.value }))}
                    className={inputClass} />
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <label className="text-theme-muted text-xs font-semibold uppercase tracking-wide">Districts & Contacts</label>
                  <button type="button" onClick={addDistrict}
                    className="flex items-center gap-1 text-xs font-semibold text-[#FFD700] hover:text-[#E6C200] transition">
                    <Plus size={13} /> Add District
                  </button>
                </div>

                {form.districts.map((d, di) => (
                  <div key={di} className="bg-theme-tertiary/40 border border-theme rounded-xl p-4 space-y-3">
                    <div className="flex items-center gap-2">
                      <input type="text" placeholder="District name" value={d.district}
                        onChange={e => updateDistrict(di, e.target.value)}
                        className={smallInputClass} required />
                      {form.districts.length > 1 && (
                        <button type="button" onClick={() => removeDistrict(di)}
                          className="p-2 rounded-lg text-theme-muted hover:text-red-400 hover:bg-red-500/10 transition shrink-0">
                          <Trash2 size={14} />
                        </button>
                      )}
                    </div>

                    <div className="space-y-2 pl-1">
                      {d.persons.map((p, pi) => (
                        <div key={pi} className="flex items-center gap-2">
                          <input type="text" placeholder="Name" value={p.name}
                            onChange={e => updatePerson(di, pi, 'name', e.target.value)}
                            className={smallInputClass} required />
                          <input type="tel" placeholder="Phone" value={p.phone}
                            onChange={e => updatePerson(di, pi, 'phone', e.target.value)}
                            className={smallInputClass} required />
                          {d.persons.length > 1 && (
                            <button type="button" onClick={() => removePerson(di, pi)}
                              className="p-2 rounded-lg text-theme-muted hover:text-red-400 hover:bg-red-500/10 transition shrink-0">
                              <X size={14} />
                            </button>
                          )}
                        </div>
                      ))}
                      <button type="button" onClick={() => addPerson(di)}
                        className="flex items-center gap-1 text-xs font-semibold text-theme-secondary hover:text-[#FFD700] transition pt-1">
                        <Plus size={12} /> Add Contact Person
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex gap-3 pt-2 sticky bottom-0 bg-theme-secondary">
                <button type="button" onClick={closeModal}
                  className="flex-1 py-3 rounded-xl border border-theme text-theme-secondary hover:text-theme-primary transition text-sm font-semibold">
                  Cancel
                </button>
                <button type="submit" disabled={saving}
                  className="flex-1 py-3 rounded-xl bg-[#FFD700] text-[#0A0A0A] font-bold hover:bg-[#E6C200] transition text-sm disabled:opacity-70">
                  {saving ? 'Saving...' : modal.contact ? 'Update' : 'Add State Card'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
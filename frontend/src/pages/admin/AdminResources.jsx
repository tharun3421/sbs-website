import React, { useState, useEffect } from 'react'
import { Plus, Edit, Trash2, X, Upload, Image as ImageIcon, Video as VideoIcon } from 'lucide-react'
import api from '../../api'
import toast from 'react-hot-toast'

const EMPTY = { title: '', isActive: true }

export default function AdminResources() {
  const [resources, setResources] = useState([])
  const [loading, setLoading] = useState(true)
  const [modal, setModal] = useState({ open: false, resource: null })
  const [form, setForm] = useState(EMPTY)
  const [file, setFile] = useState(null)
  const [saving, setSaving] = useState(false)

  const load = () => {
    setLoading(true)
    api.get('/resources/all').then(r => setResources(r.data)).finally(() => setLoading(false))
  }
  useEffect(load, [])

  const openAdd = () => { setForm(EMPTY); setFile(null); setModal({ open: true, resource: null }) }
  const openEdit = (resource) => { setForm({ title: resource.title, isActive: resource.isActive }); setFile(null); setModal({ open: true, resource }) }

  const handleSave = async (e) => {
    e.preventDefault()
    if (!modal.resource && !file) {
      toast.error('Please choose an image or video file')
      return
    }
    setSaving(true)
    try {
      const fd = new FormData()
      fd.append('title', form.title)
      fd.append('isActive', form.isActive)
      if (file) fd.append('file', file)
      if (modal.resource) await api.put(`/resources/${modal.resource._id}`, fd)
      else await api.post('/resources', fd)
      toast.success(modal.resource ? 'Resource updated' : 'Resource added')
      setModal({ open: false, resource: null })
      load()
    } catch {
      toast.error('Failed to save')
    } finally {
      setSaving(false)
    }
  }

  const handleDelete = async (id) => {
    if (!confirm('Remove this resource?')) return
    await api.delete(`/resources/${id}`)
    toast.success('Resource removed')
    load()
  }

  const inputClass = "w-full input-bg border border-theme rounded-xl px-4 py-3 text-theme-primary text-sm placeholder-[var(--text-muted)] focus:border-[#FFD700]/60"

  return (
    <div>
      <div className="flex items-center justify-between flex-wrap gap-3 mb-6">
        <div>
          <h1 className="text-theme-primary font-black text-2xl">Associate Resources</h1>
          <p className="text-theme-secondary text-sm">{resources.length} total resources</p>
        </div>
        <button onClick={openAdd}
          className="flex items-center gap-2 bg-[#FFD700] text-[#0A0A0A] font-bold px-4 py-2.5 rounded-xl hover:bg-[#E6C200] transition text-sm">
          <Plus size={16} /> Add Resource
        </button>
      </div>

      {/* Grid */}
      {loading ? (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="bg-theme-card border border-theme rounded-2xl h-56 animate-pulse" />
          ))}
        </div>
      ) : resources.length === 0 ? (
        <div className="bg-theme-card border border-theme rounded-2xl p-10 text-center text-theme-muted">
          No resources yet. Click "Add Resource" to start.
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {resources.map(r => (
            <div key={r._id} className="bg-theme-card border border-theme rounded-2xl overflow-hidden flex flex-col">
              <div className="relative aspect-video bg-black/20">
                {r.type === 'video' ? (
                  <video src={r.url} className="w-full h-full object-cover" muted />
                ) : (
                  <img src={r.url} alt={r.title} className="w-full h-full object-cover" />
                )}
                <span className="absolute top-2 right-2 bg-black/60 text-white text-[10px] font-semibold px-2 py-0.5 rounded-full flex items-center gap-1">
                  {r.type === 'video' ? <VideoIcon size={10} /> : <ImageIcon size={10} />}
                  {r.type}
                </span>
                <span className={`absolute top-2 left-2 px-2 py-0.5 rounded-full text-[10px] font-semibold ${r.isActive ? 'bg-[#44DD88]/90 text-[#0A0A0A]' : 'bg-red-500/90 text-white'}`}>
                  {r.isActive ? 'Active' : 'Hidden'}
                </span>
              </div>
              <div className="p-4 flex items-center justify-between gap-2">
                <p className="text-theme-primary font-semibold text-sm line-clamp-1">{r.title}</p>
                <div className="flex gap-2 shrink-0">
                  <button onClick={() => openEdit(r)} className="p-1.5 rounded-lg bg-theme-tertiary hover:bg-[#FFD700]/10 hover:text-[#FFD700] text-theme-muted transition">
                    <Edit size={13} />
                  </button>
                  <button onClick={() => handleDelete(r._id)} className="p-1.5 rounded-lg bg-theme-tertiary hover:bg-red-500/10 hover:text-red-400 text-theme-muted transition">
                    <Trash2 size={13} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal */}
      {modal.open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
          <div className="bg-theme-secondary border border-theme rounded-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-5 border-b border-theme">
              <h3 className="text-theme-primary font-bold">{modal.resource ? 'Edit Resource' : 'Add New Resource'}</h3>
              <button onClick={() => setModal({ open: false, resource: null })} className="text-theme-muted hover:text-theme-primary p-1"><X size={18} /></button>
            </div>
            <form onSubmit={handleSave} className="p-5 space-y-4">
              <div>
                <label className="text-theme-muted text-xs font-semibold uppercase tracking-wide mb-1.5 block">Title</label>
                <input type="text" placeholder="e.g. Diwali Offer Poster" value={form.title}
                  onChange={e => setForm(f => ({ ...f, title: e.target.value }))}
                  className={inputClass} required />
              </div>

              <div>
                <label className="text-theme-muted text-xs font-semibold uppercase tracking-wide mb-1.5 block">File (image or video)</label>
                <label className="flex items-center gap-3 p-3 border border-dashed border-theme rounded-xl cursor-pointer hover:border-[#FFD700]/40 transition input-bg">
                  <Upload size={16} className="text-theme-muted shrink-0" />
                  <span className="text-theme-secondary text-sm truncate">
                    {file ? file.name : (modal.resource ? 'Replace existing file' : 'Upload an image or video')}
                  </span>
                  <input type="file" accept="image/*,video/*" onChange={e => setFile(e.target.files[0])} className="hidden" />
                </label>
                {modal.resource?.url && !file && (
                  <a href={modal.resource.url} target="_blank" rel="noreferrer"
                    className="inline-block mt-1.5 text-xs text-[#FFD700] hover:underline">
                    View current file
                  </a>
                )}
              </div>

              <div className="flex items-center gap-2">
                <input type="checkbox" id="isActive" checked={form.isActive}
                  onChange={e => setForm(f => ({ ...f, isActive: e.target.checked }))}
                  className="w-4 h-4 accent-[#FFD700]" />
                <label htmlFor="isActive" className="text-theme-secondary text-sm">Visible to associates</label>
              </div>

              <div className="flex gap-3 pt-2">
                <button type="button" onClick={() => setModal({ open: false, resource: null })}
                  className="flex-1 py-3 rounded-xl border border-theme text-theme-secondary hover:text-theme-primary hover:border-theme-gold transition text-sm font-semibold">
                  Cancel
                </button>
                <button type="submit" disabled={saving}
                  className="flex-1 py-3 rounded-xl bg-[#FFD700] text-[#0A0A0A] font-bold hover:bg-[#E6C200] transition text-sm disabled:opacity-70">
                  {saving ? 'Saving...' : modal.resource ? 'Update Resource' : 'Add Resource'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
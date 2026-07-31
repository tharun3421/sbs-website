import React, { useState, useEffect, useMemo } from 'react'
import { Plus, Edit, Trash2, X, Upload, Image as ImageIcon, Video as VideoIcon, Link2, Youtube, Instagram, Facebook, MessageCircle, ExternalLink } from 'lucide-react'
import api from '../../api'
import toast from 'react-hot-toast'

const PRESET_CATEGORIES = ['Free Jobs', 'Loans', 'Abroad Study', 'Study Materials', 'General']
const PLATFORMS = ['YouTube', 'Instagram', 'Facebook', 'WhatsApp', 'Other']

const EMPTY = { title: '', category: '', type: 'image', url: '', platform: 'YouTube', isActive: true }

const platformIcon = (platform, size = 10) => {
  switch (platform) {
    case 'YouTube': return <Youtube size={size} />
    case 'Instagram': return <Instagram size={size} />
    case 'Facebook': return <Facebook size={size} />
    case 'WhatsApp': return <MessageCircle size={size} />
    default: return <Link2 size={size} />
  }
}

export default function AdminResources() {
  const [resources, setResources] = useState([])
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(true)
  const [modal, setModal] = useState({ open: false, resource: null })
  const [form, setForm] = useState(EMPTY)
  const [file, setFile] = useState(null)
  const [saving, setSaving] = useState(false)

  const load = () => {
    setLoading(true)
    Promise.all([
      api.get('/resources/all'),
      api.get('/resources/categories'),
    ])
      .then(([resR, catR]) => {
        setResources(resR.data)
        setCategories(catR.data)
      })
      .finally(() => setLoading(false))
  }
  useEffect(load, [])

  const categoryOptions = useMemo(() => {
    const merged = new Set([...PRESET_CATEGORIES, ...categories])
    return Array.from(merged)
  }, [categories])

  const grouped = useMemo(() => {
    const map = new Map()
    resources.forEach(r => {
      const key = r.category || 'General'
      if (!map.has(key)) map.set(key, [])
      map.get(key).push(r)
    })
    return Array.from(map.entries())
  }, [resources])

  const openAdd = () => { setForm(EMPTY); setFile(null); setModal({ open: true, resource: null }) }
  const openEdit = (resource) => {
    setForm({
      title: resource.title,
      category: resource.category || '',
      type: resource.type,
      url: resource.type === 'link' ? resource.url : '',
      platform: resource.platform || 'YouTube',
      isActive: resource.isActive,
    })
    setFile(null)
    setModal({ open: true, resource })
  }

  const handleSave = async (e) => {
    e.preventDefault()
    if (!form.category.trim()) {
      toast.error('Please choose or enter a category')
      return
    }
    if (form.type === 'link') {
      if (!form.url.trim()) {
        toast.error('Please enter the social media link URL')
        return
      }
    } else if (!modal.resource && !file) {
      toast.error('Please choose an image or video file')
      return
    }

    setSaving(true)
    try {
      const fd = new FormData()
      fd.append('title', form.title)
      fd.append('category', form.category.trim())
      fd.append('type', form.type)
      fd.append('isActive', form.isActive)
      if (form.type === 'link') {
        fd.append('url', form.url.trim())
        fd.append('platform', form.platform)
      } else if (file) {
        fd.append('file', file)
      }
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
          <p className="text-theme-secondary text-sm">{resources.length} total resources across {grouped.length} categories</p>
        </div>
        <button onClick={openAdd}
          className="flex items-center gap-2 bg-[#FFD700] text-[#0A0A0A] font-bold px-4 py-2.5 rounded-xl hover:bg-[#E6C200] transition text-sm">
          <Plus size={16} /> Add Resource
        </button>
      </div>

      {loading ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3">
          {[...Array(10)].map((_, i) => (
            <div key={i} className="bg-theme-card border border-theme rounded-2xl h-44 animate-pulse" />
          ))}
        </div>
      ) : resources.length === 0 ? (
        <div className="bg-theme-card border border-theme rounded-2xl p-10 text-center text-theme-muted">
          No resources yet. Click "Add Resource" to start.
        </div>
      ) : (
        <div className="space-y-8">
          {grouped.map(([category, items]) => (
            <div key={category}>
              <h2 className="text-theme-primary font-bold text-sm mb-3 flex items-center gap-2">
                {category}
                <span className="text-theme-muted font-normal text-xs">({items.length})</span>
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3">
                {items.map(r => (
                  <div key={r._id} className="bg-theme-card border border-theme rounded-2xl overflow-hidden flex flex-col">
                    <div className="relative h-32 sm:h-36 bg-black/20 overflow-hidden">
                      {r.type === 'video' ? (
                        <video src={r.url} className="w-full h-full object-cover" muted />
                      ) : r.type === 'image' ? (
                        <img src={r.url} alt={r.title} className="w-full h-full object-cover" />
                      ) : (
                        <a href={r.url} target="_blank" rel="noreferrer"
                          className="w-full h-full flex flex-col items-center justify-center gap-1.5 text-theme-secondary hover:text-[#FFD700] transition">
                          {platformIcon(r.platform, 22)}
                          <span className="text-[11px] font-semibold flex items-center gap-1">Open link <ExternalLink size={10} /></span>
                        </a>
                      )}
                      <span className="absolute top-1.5 right-1.5 bg-black/60 text-white text-[9px] font-semibold px-1.5 py-0.5 rounded-full flex items-center gap-1">
                        {r.type === 'video' ? <VideoIcon size={9} /> : r.type === 'image' ? <ImageIcon size={9} /> : platformIcon(r.platform, 9)}
                        {r.type === 'link' ? (r.platform || 'link') : r.type}
                      </span>
                      <span className={`absolute top-1.5 left-1.5 px-1.5 py-0.5 rounded-full text-[9px] font-semibold ${r.isActive ? 'bg-[#44DD88]/90 text-[#0A0A0A]' : 'bg-red-500/90 text-white'}`}>
                        {r.isActive ? 'Active' : 'Hidden'}
                      </span>
                    </div>
                    <div className="p-2.5 flex items-center justify-between gap-2">
                      <p className="text-theme-primary font-semibold text-xs line-clamp-1">{r.title}</p>
                      <div className="flex gap-1 shrink-0">
                        <button onClick={() => openEdit(r)} className="p-1.5 rounded-lg bg-theme-tertiary hover:bg-[#FFD700]/10 hover:text-[#FFD700] text-theme-muted transition">
                          <Edit size={12} />
                        </button>
                        <button onClick={() => handleDelete(r._id)} className="p-1.5 rounded-lg bg-theme-tertiary hover:bg-red-500/10 hover:text-red-400 text-theme-muted transition">
                          <Trash2 size={12} />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

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
                <label className="text-theme-muted text-xs font-semibold uppercase tracking-wide mb-1.5 block">Category</label>
                <input type="text" list="category-options" placeholder="e.g. Free Jobs, Loans, Abroad Study"
                  value={form.category}
                  onChange={e => setForm(f => ({ ...f, category: e.target.value }))}
                  className={inputClass} required />
                <datalist id="category-options">
                  {categoryOptions.map(c => <option key={c} value={c} />)}
                </datalist>
                <div className="flex flex-wrap gap-1.5 mt-2">
                  {PRESET_CATEGORIES.map(c => (
                    <button type="button" key={c} onClick={() => setForm(f => ({ ...f, category: c }))}
                      className="text-[11px] px-2.5 py-1 rounded-full border border-theme text-theme-secondary hover:border-[#FFD700]/60 hover:text-[#FFD700] transition">
                      {c}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-theme-muted text-xs font-semibold uppercase tracking-wide mb-1.5 block">Resource Type</label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { key: 'image', label: 'Image', icon: <ImageIcon size={14} /> },
                    { key: 'video', label: 'Video', icon: <VideoIcon size={14} /> },
                    { key: 'link', label: 'Social Link', icon: <Link2 size={14} /> },
                  ].map(opt => (
                    <button type="button" key={opt.key}
                      onClick={() => setForm(f => ({ ...f, type: opt.key }))}
                      className={`flex items-center justify-center gap-1.5 py-2.5 rounded-xl border text-xs font-semibold transition ${form.type === opt.key ? 'border-[#FFD700] text-[#FFD700] bg-[#FFD700]/10' : 'border-theme text-theme-secondary hover:border-theme-gold'}`}>
                      {opt.icon} {opt.label}
                    </button>
                  ))}
                </div>
              </div>

              {form.type === 'link' ? (
                <>
                  <div>
                    <label className="text-theme-muted text-xs font-semibold uppercase tracking-wide mb-1.5 block">Platform</label>
                    <select value={form.platform}
                      onChange={e => setForm(f => ({ ...f, platform: e.target.value }))}
                      className={inputClass}>
                      {PLATFORMS.map(p => <option key={p} value={p}>{p}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="text-theme-muted text-xs font-semibold uppercase tracking-wide mb-1.5 block">Link URL</label>
                    <input type="url" placeholder="https://youtube.com/..." value={form.url}
                      onChange={e => setForm(f => ({ ...f, url: e.target.value }))}
                      className={inputClass} required />
                  </div>
                </>
              ) : (
                <div>
                  <label className="text-theme-muted text-xs font-semibold uppercase tracking-wide mb-1.5 block">File ({form.type})</label>
                  <label className="flex items-center gap-3 p-3 border border-dashed border-theme rounded-xl cursor-pointer hover:border-[#FFD700]/40 transition input-bg">
                    <Upload size={16} className="text-theme-muted shrink-0" />
                    <span className="text-theme-secondary text-sm truncate">
                      {file ? file.name : (modal.resource && modal.resource.type !== 'link' ? 'Replace existing file' : `Upload an ${form.type}`)}
                    </span>
                    <input type="file" accept={form.type === 'video' ? 'video/*' : 'image/*'} onChange={e => setFile(e.target.files[0])} className="hidden" />
                  </label>
                  {modal.resource?.url && modal.resource.type !== 'link' && !file && (
                    <a href={modal.resource.url} target="_blank" rel="noreferrer"
                      className="inline-block mt-1.5 text-xs text-[#FFD700] hover:underline">
                      View current file
                    </a>
                  )}
                </div>
              )}

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
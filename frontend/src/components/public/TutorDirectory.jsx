import React, { useState, useEffect, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { ArrowLeft, Search, GraduationCap, Phone, Mail, X, MessageCircle } from 'lucide-react'
import api from '../../api'

// Public "Find your Online Tutor / Trainer / Teacher / Coach / Mentor /
// Advisor / Counsellor" directory. Unlike the static poster galleries, this
// section is fully dynamic: listings, and the filter dropdown options
// themselves, come from whatever the admin has published.
export default function TutorDirectory() {
  const [tutors, setTutors] = useState([])
  const [filterOptions, setFilterOptions] = useState({ subjects: [], levels: [], languages: [] })
  const [loading, setLoading] = useState(true)
  const [query, setQuery] = useState('')
  const [subject, setSubject] = useState('')
  const [level, setLevel] = useState('')
  const [language, setLanguage] = useState('')
  const [contactTutor, setContactTutor] = useState(null)

  useEffect(() => {
    api.get('/tutors/filters').then(r => setFilterOptions(r.data)).catch(() => {})
  }, [])

  useEffect(() => {
    setLoading(true)
    const params = {}
    if (query.trim()) params.q = query.trim()
    if (subject) params.subject = subject
    if (level) params.level = level
    if (language) params.language = language

    const handle = setTimeout(() => {
      api.get('/tutors', { params })
        .then(r => setTutors(r.data))
        .catch(() => setTutors([]))
        .finally(() => setLoading(false))
    }, 300) // debounce so typing in the search box doesn't fire a request per keystroke

    return () => clearTimeout(handle)
  }, [query, subject, level, language])

  useEffect(() => {
    if (!contactTutor) return
    const onKey = (e) => { if (e.key === 'Escape') setContactTutor(null) }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [contactTutor])

  const hasActiveFilters = query || subject || level || language
  const selectClass = "w-full px-3 py-2.5 rounded-lg bg-transparent border border-theme text-theme-primary text-sm focus:outline-none focus:border-[#FFD700] transition-colors"

  const waLink = useMemo(() => {
    if (!contactTutor?.contactPhone) return null
    const digits = contactTutor.contactPhone.replace(/[^\d+]/g, '')
    return `https://wa.me/${digits.replace(/^\+/, '')}`
  }, [contactTutor])

  return (
    <div className="page-enter bg-theme-primary min-h-screen">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <h1 className="text-theme-primary font-black text-2xl mb-1">Find your Online Tutor</h1>
        <p className="text-theme-secondary text-sm mb-6">Trainer / Teacher / Coach / Mentor / Advisor / Counsellor — browse listings published by SBS</p>

        {/* Search + filters */}
        <div className="bg-theme-card border border-theme rounded-2xl p-4 mb-6 space-y-3">
          <div className="relative">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-theme-muted" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search by name or keyword..."
              className="w-full pl-9 pr-3 py-2.5 rounded-lg bg-transparent border border-theme text-theme-primary text-sm placeholder:text-theme-muted focus:outline-none focus:border-[#FFD700] transition-colors"
            />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <select value={subject} onChange={e => setSubject(e.target.value)} className={selectClass}>
              <option value="">All Subject/s</option>
              {filterOptions.subjects.map(s => <option key={s} value={s}>{s}</option>)}
            </select>
            <select value={level} onChange={e => setLevel(e.target.value)} className={selectClass}>
              <option value="">All Level/s</option>
              {filterOptions.levels.map(l => <option key={l} value={l}>{l}</option>)}
            </select>
            <select value={language} onChange={e => setLanguage(e.target.value)} className={selectClass}>
              <option value="">All Language/s</option>
              {filterOptions.languages.map(l => <option key={l} value={l}>{l}</option>)}
            </select>
          </div>
          {hasActiveFilters && (
            <button
              onClick={() => { setQuery(''); setSubject(''); setLevel(''); setLanguage('') }}
              className="text-xs text-[#FFD700] hover:underline"
            >
              Clear filters
            </button>
          )}
        </div>

        {/* Results */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="bg-theme-card border border-theme rounded-2xl h-64 animate-pulse" />
            ))}
          </div>
        ) : tutors.length === 0 ? (
          <div className="text-center py-20">
            <GraduationCap size={40} className="text-gray-400 mx-auto mb-4" />
            <p className="text-theme-secondary">
              {hasActiveFilters ? 'No listings match your search.' : 'No listings available yet. Check back soon.'}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {tutors.map(t => (
              <div key={t._id} className="bg-theme-card border border-theme rounded-2xl overflow-hidden flex flex-col card-hover">
                <div className="flex gap-3 p-3">
                  <div className="w-20 h-20 rounded-xl overflow-hidden bg-black/20 shrink-0">
                    <img src={t.imageUrl} alt={t.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-theme-primary font-bold text-sm truncate">{t.name}</p>
                    {t.subjects?.length > 0 && (
                      <p className="text-theme-muted text-xs mt-1 line-clamp-2"><span className="font-semibold">Subject/s:</span> {t.subjects.join(', ')}</p>
                    )}
                  </div>
                </div>
                <div className="px-3 pb-3 flex-1 flex flex-col gap-1.5">
                  {t.levels?.length > 0 && (
                    <p className="text-theme-secondary text-xs"><span className="font-semibold text-theme-primary">Level/s:</span> {t.levels.join(', ')}</p>
                  )}
                  {t.languages?.length > 0 && (
                    <p className="text-theme-secondary text-xs"><span className="font-semibold text-theme-primary">Language/s:</span> {t.languages.join(', ')}</p>
                  )}
                  {t.profileInfo && (
                    <p className="text-theme-secondary text-xs line-clamp-3"><span className="font-semibold text-theme-primary">Profile/More Info:</span> {t.profileInfo}</p>
                  )}
                  <button
                    onClick={() => setContactTutor(t)}
                    className="mt-auto pt-2 w-full py-2 rounded-lg bg-[#FFD700] text-[#0A0A0A] text-xs font-bold hover:bg-[#E6C200] transition"
                  >
                    CONTACT
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Contact popup */}
      {contactTutor && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
          onClick={() => setContactTutor(null)}
        >
          <div
            className="bg-theme-secondary border border-theme rounded-2xl w-full max-w-sm"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between p-5 border-b border-theme">
              <h3 className="text-theme-primary font-bold">Contact {contactTutor.name}</h3>
              <button onClick={() => setContactTutor(null)} className="text-theme-muted hover:text-theme-primary p-1"><X size={18} /></button>
            </div>
            <div className="p-5 space-y-2.5">
              {contactTutor.contactPhone && (
                <a href={`tel:${contactTutor.contactPhone.replace(/\s+/g, '')}`}
                  className="flex items-center gap-3 p-3 rounded-xl border border-theme hover:border-[#FFD700]/50 transition text-theme-primary text-sm">
                  <Phone size={16} className="text-[#FFD700]" /> {contactTutor.contactPhone}
                </a>
              )}
              {contactTutor.contactPhone && waLink && (
                <a href={waLink} target="_blank" rel="noreferrer"
                  className="flex items-center gap-3 p-3 rounded-xl border border-theme hover:border-[#FFD700]/50 transition text-theme-primary text-sm">
                  <MessageCircle size={16} className="text-[#FFD700]" /> Message on WhatsApp
                </a>
              )}
              {contactTutor.contactEmail && (
                <a href={`mailto:${contactTutor.contactEmail}`}
                  className="flex items-center gap-3 p-3 rounded-xl border border-theme hover:border-[#FFD700]/50 transition text-theme-primary text-sm">
                  <Mail size={16} className="text-[#FFD700]" /> {contactTutor.contactEmail}
                </a>
              )}
              {!contactTutor.contactPhone && !contactTutor.contactEmail && (
                <p className="text-theme-muted text-sm">No contact details available for this listing.</p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
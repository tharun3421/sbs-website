import React, { useState, useEffect, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { ArrowLeft, Search, GraduationCap, Phone, Mail, X, MessageCircle } from 'lucide-react'
import api from '../../api'

// Shown in place of a tutor's photo when the admin hasn't uploaded one.
// Inline SVG data URI so no extra asset/build step is needed.
const NO_PHOTO_PLACEHOLDER =
  "data:image/svg+xml;utf8," + encodeURIComponent(`
    <svg xmlns="http://www.w3.org/2000/svg" width="200" height="200" viewBox="0 0 200 200">
      <rect width="200" height="200" fill="#2A2A2A"/>
      <circle cx="100" cy="78" r="34" fill="#5A5A5A"/>
      <path d="M100 122c-40 0-68 22-68 50v6h136v-6c0-28-28-50-68-50z" fill="#5A5A5A"/>
    </svg>
  `)

// Public "Find your Online Tutor / Trainer / Teacher / Coach / Mentor /
// Advisor / Counsellor" directory. Unlike the static poster galleries, this
// section is fully dynamic: listings, and the filter dropdown options
// themselves, come from whatever the admin has published.
export default function TutorDirectory() {
  const [tutors, setTutors] = useState([])
  const [filterOptions, setFilterOptions] = useState({ subjects: [], levels: [], languages: [] })
  const [loading, setLoading] = useState(true)
  // Draft values bound to the inputs — changing these does NOT trigger a
  // search. They only take effect once the visitor clicks "Search".
  const [query, setQuery] = useState('')
  const [subject, setSubject] = useState('')
  const [level, setLevel] = useState('')
  const [language, setLanguage] = useState('')
  // The filters actually applied to the last fetch. Starts empty so the
  // page loads showing every published listing by default.
  const [appliedFilters, setAppliedFilters] = useState({ q: '', subject: '', level: '', language: '' })
  const [contactTutor, setContactTutor] = useState(null)

  useEffect(() => {
    api.get('/tutors/filters').then(r => setFilterOptions(r.data)).catch(() => {})
  }, [])

  useEffect(() => {
    setLoading(true)
    const params = {}
    if (appliedFilters.q.trim()) params.q = appliedFilters.q.trim()
    if (appliedFilters.subject) params.subject = appliedFilters.subject
    if (appliedFilters.level) params.level = appliedFilters.level
    if (appliedFilters.language) params.language = appliedFilters.language

    api.get('/tutors', { params })
      .then(r => setTutors(r.data))
      .catch(() => setTutors([]))
      .finally(() => setLoading(false))
  }, [appliedFilters])

  const handleSearch = () => {
    setAppliedFilters({ q: query, subject, level, language })
  }

  const handleClearFilters = () => {
    setQuery(''); setSubject(''); setLevel(''); setLanguage('')
    setAppliedFilters({ q: '', subject: '', level: '', language: '' })
  }

  useEffect(() => {
    if (!contactTutor) return
    const onKey = (e) => { if (e.key === 'Escape') setContactTutor(null) }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [contactTutor])

  const hasActiveFilters = appliedFilters.q || appliedFilters.subject || appliedFilters.level || appliedFilters.language
  const selectClass = "w-full px-3 py-2.5 rounded-lg bg-transparent border border-theme text-theme-primary text-sm focus:outline-none focus:border-[#FFD700] transition-colors"
  // Native <option> lists always render on a plain white/system background
  // regardless of our dark theme, so force dark text here — otherwise the
  // theme's light "text-theme-primary" color makes options unreadable.
  const optionStyle = { color: '#111111', backgroundColor: '#FFFFFF' }

  const waLink = useMemo(() => {
    if (!contactTutor?.contactPhone) return null
    const digits = contactTutor.contactPhone.replace(/[^\d+]/g, '')
    return `https://wa.me/${digits.replace(/^\+/, '')}`
  }, [contactTutor])

  return (
    <div className="page-enter bg-theme-primary min-h-screen">
      <div className="max-w-6xl mx-auto px-4 py-8">
       {/* Header with Unsplash background image */}
<div
  className="relative rounded-2xl overflow-hidden mb-6 px-4 py-10 sm:py-14"
  style={{
    backgroundImage: `url('https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1600&q=80')`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  }}
>
  {/* Dark overlay so text stays readable over the photo */}
  <div className="absolute inset-0 bg-black/60" />

  <div className="relative z-10">
    <h1 className="text-white font-black text-2xl mb-1">Find your </h1>
    <p className="text-white text-[14px] uppercase">
      Online Tutor / Trainer / Teacher / Coach / Mentor / Advisor / Counsellor
    </p>
  </div>
</div>

        {/* Search + filters */}
        <div className="bg-theme-card border border-theme rounded-2xl p-4 mb-6 space-y-3">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <select value={subject} onChange={e => setSubject(e.target.value)} className={selectClass}>
              <option value="" style={optionStyle}>All Subject/s</option>
              {filterOptions.subjects.map(s => <option key={s} value={s} style={optionStyle}>{s}</option>)}
            </select>
            <select value={level} onChange={e => setLevel(e.target.value)} className={selectClass}>
              <option value="" style={optionStyle}>All Level/s</option>
              {filterOptions.levels.map(l => <option key={l} value={l} style={optionStyle}>{l}</option>)}
            </select>
            <select value={language} onChange={e => setLanguage(e.target.value)} className={selectClass}>
              <option value="" style={optionStyle}>All Language/s</option>
              {filterOptions.languages.map(l => <option key={l} value={l} style={optionStyle}>{l}</option>)}
            </select>
          </div>
          <div className="flex items-center gap-4">
            <button
              onClick={handleSearch}
              className="px-5 py-2.5 rounded-lg bg-[#FFD700] text-[#0A0A0A] text-sm font-bold hover:bg-[#E6C200] transition"
            >
              Search
            </button>
            {hasActiveFilters && (
              <button
                onClick={handleClearFilters}
                className="text-xs text-[#FFD700] hover:underline"
              >
                Clear filters
              </button>
            )}
          </div>
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
                    <img
                      src={t.imageUrl || NO_PHOTO_PLACEHOLDER}
                      alt={t.name}
                      className="w-full h-full object-cover"
                      onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = NO_PHOTO_PLACEHOLDER }}
                    />
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
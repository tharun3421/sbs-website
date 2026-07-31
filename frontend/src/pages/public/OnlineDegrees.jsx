import React, { useState, useEffect } from 'react'
import { Search, GraduationCap, Clock, Award, ChevronLeft, ChevronRight } from 'lucide-react'
import api from '../../api'
import PopupForm from '../../components/PopupForm'
import LogoScroller from '../../components/LogoScroller'

const COURSES = [ 'BA', 'BCOM', 'BBA', 'BCA', 'MA', 'MCOM', 'MBA', 'MCA']

export default function OnlineDegrees() {
  const [allDegrees, setAllDegrees] = useState([])
  const [degrees, setDegrees] = useState([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [course, setCourse] = useState('All')
  const [page, setPage] = useState(1)
  const [panel, setPanel] = useState({ open: false, degree: null })
  const PER_PAGE = 4

  useEffect(() => {
    setLoading(true)
    api.get('/degrees')
      .then(r => setAllDegrees(r.data))
      .catch(() => setAllDegrees([]))
      .finally(() => setLoading(false))
  }, [])

  useEffect(() => {
    let data = [...allDegrees]

    if (search.trim()) {
      const s = search.toLowerCase()
      data = data.filter(d =>
        d.course.toLowerCase().includes(s) ||
        d.university.toLowerCase().includes(s)
      )
    }

    if (course !== 'All') {
      const regex = new RegExp(`\\b${course}\\b`, 'i')
      data = data.filter(d => regex.test(d.course))
    }

    setDegrees(data)
    setPage(1)
  }, [search, course, allDegrees])

  const paginated = degrees.slice((page - 1) * PER_PAGE, page * PER_PAGE)
  const totalPages = Math.ceil(degrees.length / PER_PAGE)

  const handleCourseSelect = (c) => {
    setCourse(prev => prev === c && c !== 'All' ? 'All' : c)
  }

  return (
    <div className="page-enter bg-theme-primary min-h-screen">
      <div className="max-w-6xl mx-auto px-4 py-8">

        {/* Heading */}
        {/* <div className="flex items-center gap-4 mb-8">
          <div
            className="w-11 h-11 shrink-0 rounded-xl flex items-center justify-center"
            style={{ background: 'rgba(68,136,255,0.08)' }}
          >
            <GraduationCap size={22} strokeWidth={1.5} style={{ color: '#4488FF' }} />
          </div>
          <h1 className="text-theme-primary font-semibold text-xl leading-tight">
            Online Degrees
          </h1>
        </div> */}

        {/* Search & Filters */}
        <div className="flex flex-col gap-4 mb-8">
          <div className="relative">
            <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-theme-muted" />
            <input
              type="text"
              placeholder="Search university or course..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full input-bg border border-theme rounded-xl pl-10 pr-4 py-3 text-theme-primary text-sm focus:border-[#4488FF]/60"
            />
          </div>
          <div className="flex flex-wrap gap-2">
            {COURSES.map(c => (
              <button
                key={c}
                onClick={() => handleCourseSelect(c)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition ${
                  course === c
                    ? 'bg-[#4488FF] text-white'
                    : 'bg-theme-card border border-theme text-theme-secondary hover:border-[#4488FF]/50'
                }`}
              >
                {c}
              </button>
            ))}
          </div>
        </div>

        {/* Grid */}
        {loading ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="bg-theme-card border border-theme rounded-2xl h-52 animate-pulse" />
            ))}
          </div>
        ) : paginated.length === 0 ? (
          <div className="text-center py-20">
            <GraduationCap size={40} className="text-theme-muted mx-auto mb-4" />
            <p className="text-theme-secondary">No programs found.</p>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {paginated.map(deg => (
              <div key={deg._id} className="card-hover bg-theme-card border border-theme rounded-2xl p-5 flex flex-col gap-4">
                <div>
                  <h3 className="text-theme-primary font-bold text-base mb-1 line-clamp-2">{deg.course}</h3>
                  <p className="text-theme-secondary text-sm mb-3">{deg.university}</p>
                  <div className="flex flex-wrap gap-2">
                    <span className="flex items-center gap-1 text-xs text-theme-secondary bg-theme-tertiary px-2.5 py-1 rounded-full">
                      <Clock size={10} /> {deg.duration}
                    </span>
                    <span className="flex items-center gap-1 text-xs text-[#4488FF] bg-[#4488FF]/10 px-2.5 py-1 rounded-full">
                      <Award size={10} /> {deg.type}
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => setPanel({ open: true, degree: deg })}
                  className="mt-auto w-full py-2.5 rounded-xl font-bold text-sm bg-[#4488FF] text-white hover:bg-[#2266DD] transition"
                >
                  Apply Now
                </button>
              </div>
            ))}
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-3 mt-10">
            <button
              onClick={() => setPage(p => Math.max(1, p - 1))}
              disabled={page === 1}
              className="p-2 rounded-xl border border-theme text-theme-secondary hover:text-[#FFD700] hover:border-[#FFD700]/50 disabled:opacity-30 transition"
            >
              <ChevronLeft size={18} />
            </button>
            <span className="text-theme-secondary text-sm">{page} / {totalPages}</span>
            <button
              onClick={() => setPage(p => Math.min(totalPages, p + 1))}
              disabled={page === totalPages}
              className="p-2 rounded-xl border border-theme text-theme-secondary hover:text-[#FFD700] hover:border-[#FFD700]/50 disabled:opacity-30 transition"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        )}

      </div>

      <LogoScroller label="University Partners" accent="#4488FF" logoKey="degreeLogos" />

      <PopupForm
        open={panel.open}
        onClose={() => setPanel({ open: false, degree: null })}
        type="degree"
        refId={panel.degree?._id}
        refTitle={panel.degree ? `${panel.degree.course} – ${panel.degree.university}` : ''}
      />
    </div>
  )
}
import React, { useState, useEffect } from 'react'
import { Search, GraduationCap, Clock, Award, ChevronLeft, ChevronRight } from 'lucide-react'
import api from '../../api'
import SlidePanel from '../../components/SlidePanel'
import LogoScroller from '../../components/LogoScroller'

const COURSES = ['All','B.Com','BBA','MBA','BA','B.Sc','M.Sc','MCA','BCA']

export default function OnlineDegrees() {
  const [degrees, setDegrees] = useState([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch]   = useState('')
  const [course, setCourse]   = useState('All')
  const [page, setPage]       = useState(1)
  const [panel, setPanel]     = useState({ open: false, degree: null })
  const PER_PAGE = 6

  useEffect(() => {
    setLoading(true)
    api.get('/degrees', { params: { search, course: course === 'All' ? '' : course } })
      .then(r => setDegrees(r.data)).catch(() => setDegrees([]))
      .finally(() => setLoading(false))
    setPage(1)
  }, [search, course])

  const paginated  = degrees.slice((page - 1) * PER_PAGE, page * PER_PAGE)
  const totalPages = Math.ceil(degrees.length / PER_PAGE)

  return (
    <div className="page-enter bg-theme-primary min-h-screen">
      <div className="max-w-6xl mx-auto px-4 py-8">

        <div className="mb-8">
          <p className="text-[#4488FF] text-xs font-semibold uppercase tracking-widest mb-2">UGC & AICTE Recognized</p>
          <h1 className="text-3xl font-black text-theme-primary mb-1">Online Degrees</h1>
          <p className="text-theme-secondary text-sm">{degrees.length} programs available</p>
        </div>

        <div className="flex flex-col gap-4 mb-8">
          <div className="relative">
            <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-theme-muted" />
            <input type="text" placeholder="Search university or course..."
              value={search} onChange={e => setSearch(e.target.value)}
              className="w-full input-bg border border-theme rounded-xl pl-10 pr-4 py-3 text-theme-primary text-sm focus:border-[#4488FF]/60" />
          </div>
          <div className="flex flex-wrap gap-2">
            {COURSES.map(c => (
              <button key={c} onClick={() => setCourse(c)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition ${
                  course === c ? 'bg-[#4488FF] text-white' : 'bg-theme-card border border-theme text-theme-secondary hover:border-[#4488FF]/50'
                }`}>
                {c}
              </button>
            ))}
          </div>
        </div>

        {loading ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[...Array(6)].map((_, i) => <div key={i} className="bg-theme-card border border-theme rounded-2xl h-52 animate-pulse" />)}
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
                <div className="flex items-center gap-3">
                  {deg.logo
                    ? <img src={deg.logo} alt={deg.university} className="h-10 object-contain bg-white rounded-xl px-2 py-1 max-w-[100px]" />
                    : <div className="w-12 h-10 rounded-xl bg-[#4488FF]/10 flex items-center justify-center text-[#4488FF] font-black">{deg.university[0]}</div>
                  }
                </div>
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
                <button onClick={() => setPanel({ open: true, degree: deg })}
                  className="mt-auto w-full py-2.5 rounded-xl font-bold text-sm bg-[#4488FF] text-white hover:bg-[#2266DD] transition">
                  Apply Now
                </button>
              </div>
            ))}
          </div>
        )}

        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-3 mt-10">
            <button onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page === 1}
              className="p-2 rounded-xl border border-theme text-theme-secondary hover:text-[#FFD700] hover:border-[#FFD700]/50 disabled:opacity-30 transition">
              <ChevronLeft size={18} />
            </button>
            <span className="text-theme-secondary text-sm">{page} / {totalPages}</span>
            <button onClick={() => setPage(p => Math.min(totalPages, p + 1))} disabled={page === totalPages}
              className="p-2 rounded-xl border border-theme text-theme-secondary hover:text-[#FFD700] hover:border-[#FFD700]/50 disabled:opacity-30 transition">
              <ChevronRight size={18} />
            </button>
          </div>
        )}

      </div>

      <LogoScroller label="University Partners" accent="#4488FF" logoKey="degreeLogos" />

      <SlidePanel
        open={panel.open} onClose={() => setPanel({ open: false, degree: null })}
        type="degree" refId={panel.degree?._id}
        refTitle={panel.degree ? `${panel.degree.course} – ${panel.degree.university}` : ''} />
    </div>
  )
}
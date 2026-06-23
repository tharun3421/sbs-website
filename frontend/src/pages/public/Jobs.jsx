import React, { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { Search, MapPin, Briefcase, IndianRupee, ChevronLeft, ChevronRight, ArrowLeft } from 'lucide-react'
import api from '../../api'
import PopupForm from '../../components/PopupForm'
import LogoScroller from '../../components/LogoScroller'

const TYPE_CONFIG = {
  free: { label: 'Free Jobs',          color: '#44DD88', applyLabel: 'Apply Now',   hoverColor: '#33BB77' },
  paid: { label: 'Jobs with Training', color: '#FFD700', applyLabel: 'Enquire Now', hoverColor: '#E6C200' },
}

export default function Jobs() {
  const { type = 'free' } = useParams()
  const config = TYPE_CONFIG[type] || TYPE_CONFIG.free

  const [jobs, setJobs]         = useState([])
  const [loading, setLoading]   = useState(true)
  const [search, setSearch]     = useState('')
  const [location, setLocation] = useState('')
  const [page, setPage]         = useState(1)
  const [panel, setPanel]       = useState({ open: false, job: null })
  const PER_PAGE = 6

  useEffect(() => {
    setLoading(true)
    api.get('/jobs', { params: { type, search, location } })
      .then(r => setJobs(r.data))
      .catch(() => setJobs([]))
      .finally(() => setLoading(false))
    setPage(1)
  }, [type, search, location])

  const paginated  = jobs.slice((page - 1) * PER_PAGE, page * PER_PAGE)
  const totalPages = Math.ceil(jobs.length / PER_PAGE)

  return (
    <div className="page-enter bg-theme-primary min-h-screen">
      <div className="max-w-6xl mx-auto px-4 py-8">

        {/* Back link + heading */}
        <div className="mb-8">
          <Link
            to="/jobs"
            className="inline-flex items-center gap-1.5 text-xs text-theme-secondary hover:text-theme-primary transition mb-4"
          >
            <ArrowLeft size={14} />
            Back to Job Types
          </Link>
          <p className="text-[#FFD700] text-xs font-semibold uppercase tracking-widest mb-2">
            Recruitments / Manpower Supply
          </p>
          <h1 className="text-3xl font-black mb-1 text-theme-primary">{config.label}</h1>
          <p className="text-sm text-theme-secondary">
            For Top Companies · All Verticals · {jobs.length} positions available
          </p>
        </div>

        {/* Search */}
        <div className="flex flex-col sm:flex-row gap-3 mb-8">
          <div className="relative flex-1">
            <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-theme-secondary" />
            <input type="text" placeholder="Search job title or company..."
              value={search} onChange={e => setSearch(e.target.value)}
              className="w-full input-bg border border-theme text-theme-primary placeholder-theme-muted rounded-xl pl-10 pr-4 py-3 text-sm focus:border-[#FFD700]/60" />
          </div>
          <div className="relative sm:w-52">
            <MapPin size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-theme-secondary" />
            <input type="text" placeholder="Location..."
              value={location} onChange={e => setLocation(e.target.value)}
              className="w-full input-bg border border-theme text-theme-primary placeholder-theme-muted rounded-xl pl-10 pr-4 py-3 text-sm focus:border-[#FFD700]/60" />
          </div>
        </div>

        {loading ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="bg-theme-card border border-theme rounded-2xl p-5 h-48 animate-pulse" />
            ))}
          </div>
        ) : paginated.length === 0 ? (
          <div className="text-center py-20">
            <Briefcase size={40} className="text-gray-400 mx-auto mb-4" />
            <p className="text-theme-secondary">No jobs found. Try different filters.</p>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {paginated.map(job => (
              <div key={job._id} className="card-hover bg-theme-card border border-theme rounded-2xl p-5 flex flex-col gap-4">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    {job.logo
                      ? <img src={job.logo} alt={job.company} className="w-10 h-10 rounded-xl object-contain bg-white p-1" />
                      : <div className="w-10 h-10 rounded-xl bg-[#FFD700]/10 flex items-center justify-center text-[#FFD700] font-black text-lg">{job.company[0]}</div>
                    }
                    <div>
                      <p className="font-bold text-sm leading-tight text-theme-primary">{job.company}</p>
                      <p className="text-xs text-theme-secondary">{job.category}</p>
                    </div>
                  </div>
                  <span className={`text-xs px-2.5 py-1 rounded-full font-semibold shrink-0 ${
                    job.type === 'free' ? 'bg-[#44DD88]/10 text-[#44DD88]' : 'bg-[#FFD700]/10 text-[#B8860B]'
                  }`}>
                    {job.type === 'free' ? 'Free' : 'Paid'}
                  </span>
                </div>

                <div>
                  <h3 className="font-bold text-base mb-2 line-clamp-2 text-theme-primary">{job.title}</h3>
                  <div className="flex flex-wrap gap-3 text-xs text-theme-secondary">
                    <span className="flex items-center gap-1"><MapPin size={11} />{job.location}</span>
                    <span className="flex items-center gap-1"><IndianRupee size={11} />{job.salary}</span>
                    <span className="flex items-center gap-1"><Briefcase size={11} />{job.experience}</span>
                  </div>
                </div>

                <button onClick={() => setPanel({ open: true, job })}
                  className="mt-auto w-full py-2.5 rounded-xl font-bold text-sm transition"
                  style={{ background: config.color, color: '#0A0A0A' }}
                  onMouseEnter={e => e.currentTarget.style.background = config.hoverColor}
                  onMouseLeave={e => e.currentTarget.style.background = config.color}
                >
                  {config.applyLabel}
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
            <span className="text-sm text-theme-secondary">{page} / {totalPages}</span>
            <button onClick={() => setPage(p => Math.min(totalPages, p + 1))} disabled={page === totalPages}
              className="p-2 rounded-xl border border-theme text-theme-secondary hover:text-[#FFD700] hover:border-[#FFD700]/50 disabled:opacity-30 transition">
              <ChevronRight size={18} />
            </button>
          </div>
        )}

      </div>

      <LogoScroller label="Hiring Partners" accent="#44DD88" logoKey="jobLogos" />

      <PopupForm
        open={panel.open}
        onClose={() => setPanel({ open: false, job: null })}
        type="job"
        refId={panel.job?._id}
        refTitle={panel.job ? `${panel.job.title} @ ${panel.job.company}` : ''}
      />
    </div>
  )
}
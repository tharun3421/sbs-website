import React, { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { Search, MapPin, Briefcase, IndianRupee, ChevronLeft, ChevronRight, ArrowLeft, GraduationCap, Play, X } from 'lucide-react'
import api from '../../api'
import PopupForm from '../../components/PopupForm'
import LogoScroller from '../../components/LogoScroller'
import ReelPopup from '../../components/ReelPopup'

const TYPE_CONFIG = {
  free: {
    label: 'Free Jobs',
    color: '#44DD88',
    accentBg: 'rgba(68,221,136,0.08)',
    icon: Briefcase,
    applyLabel: 'Apply Now',
    hoverColor: '#33BB77',
  },
  paid: {
    label: 'Jobs with Training',
    subtitle: 'Paid Programs',
    color: '#FFD700',
    accentBg: 'rgba(255,215,0,0.08)',
    icon: GraduationCap,
    applyLabel: 'Enquire Now',
    hoverColor: '#E6C200',
  },
}

export default function Jobs() {
  const { type = 'free' } = useParams()
  const config = TYPE_CONFIG[type] || TYPE_CONFIG.free
  const Icon = config.icon

  const [jobs, setJobs]         = useState([])
  const [loading, setLoading]   = useState(true)
  const [search, setSearch]     = useState('')
  const [location, setLocation] = useState('')
  const [page, setPage]         = useState(1)
  const [panel, setPanel]       = useState({ open: false, job: null })
  const [reelJob, setReelJob]   = useState(null)
  const PER_PAGE = 6

  useEffect(() => {
    if (reelJob) {
      const prevOverflow = document.body.style.overflow
      document.body.style.overflow = 'hidden'
      return () => { document.body.style.overflow = prevOverflow }
    }
  }, [reelJob])

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

        {/* Heading */}
        {/* <div className="flex items-center gap-4 mb-8">
          <div
            className="w-11 h-11 shrink-0 rounded-xl flex items-center justify-center"
            style={{ background: config.accentBg }}
          >
            <Icon size={22} strokeWidth={1.5} style={{ color: config.color }} />
          </div>
          <div className="flex flex-col">
            <h1 className="text-theme-primary font-semibold text-base leading-tight">
              {config.label}
            </h1>
            {config.subtitle && (
              <p className="text-theme-primary text-base mt-0.5">{config.subtitle}</p>
            )}
          </div>
        </div> */}

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
                    <div>
                      <p className="font-bold text-sm leading-tight text-theme-primary">{job.company}</p>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="font-bold text-base mb-2 line-clamp-2 text-theme-primary">{job.title}</h3>
                  <div className="flex flex-wrap gap-3 text-xs text-theme-secondary">
                    <span className="flex items-center gap-1"><MapPin size={11} />{job.location}</span>
                    <span className="flex items-center gap-1"><IndianRupee size={11} />{job.salary}</span>
                    <span className="flex items-center gap-1"><Briefcase size={11} />{job.experience}</span>
                  </div>
                </div>

                <div className="mt-auto flex gap-2">
                  {job.reelUrl && (
                    <button onClick={() => setReelJob(job)}
                      title="Watch Reel"
                      className="shrink-0 flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-xl font-bold text-sm border border-theme text-theme-primary hover:border-[#FFD700]/60 hover:text-[#FFD700] transition"
                    >
                      <Play size={14} />
                      <span className="hidden sm:inline">Reel</span>
                    </button>
                  )}
                  <button onClick={() => setPanel({ open: true, job })}
                    className="flex-1 py-2.5 rounded-xl font-bold text-sm transition"
                    style={{ background: config.color, color: '#0A0A0A' }}
                    onMouseEnter={e => e.currentTarget.style.background = config.hoverColor}
                    onMouseLeave={e => e.currentTarget.style.background = config.color}
                  >
                    {config.applyLabel}
                  </button>
                </div>
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
        jobType={panel.job?.type}
        refId={panel.job?._id}
        refTitle={panel.job ? `${panel.job.title} @ ${panel.job.company}` : ''}
      />

      {/* Reel video modal */}
     {/* Reel video modal */}
{/* {reelJob && (
  <div className="fixed inset-0 z-100 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm" onClick={() => setReelJob(null)}>
    <div className="flex flex-col items-center gap-3 w-full max-w-md" onClick={e => e.stopPropagation()}>
      <div className="flex items-center justify-between w-full">
        <p className="text-white font-semibold text-sm truncate">{reelJob.title} @ {reelJob.company}</p>
        <button onClick={() => setReelJob(null)} className="text-white/70 hover:text-white p-1 shrink-0">
          <X size={20} />
        </button> 
      </div>
      <video
        src={reelJob.reelUrl}
        controls
        autoPlay
        playsInline
        style={{ maxHeight: 'calc(100dvh - 7rem)', maxWidth: '100%' }}
        className="w-auto h-auto rounded-xl bg-black object-contain"
      />
    </div>
  </div>
)} */}

<ReelPopup job={reelJob} onClose={() => setReelJob(null)} />
    </div>
  )
}
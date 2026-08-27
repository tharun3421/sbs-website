import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import {
  Search, MapPin, Briefcase, IndianRupee, ChevronLeft, ChevronRight,
  GraduationCap, Play, Calculator,
} from 'lucide-react'
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
  tally: {
    label: 'Tally Jobs',
    subtitle: 'Accounts & Finance',
    color: '#2DD4BF',
    accentBg: 'rgba(45,212,191,0.08)',
    icon: Calculator,
    applyLabel: 'Apply Now',
    hoverColor: '#20B8A6',
  },
}

/* ------------------------------- IMAGES -------------------------------
   Free-to-use stock images (StockCake, no attribution required)
------------------------------------------------------------------------ */
const PLACEMENT_IMG = 'https://images.stockcake.com/public/3/1/4/31456344-3c38-485b-abae-42d33005fba2_large/colleagues-casual-meeting-stockcake.jpg'
const OPENINGS_IMG = 'https://images.stockcake.com/public/1/7/3/173b981f-165c-4779-8ba5-95a330a1689b_large/creative-team-meeting-stockcake.jpg'
const DEVELOPER_IMG = 'https://images.stockcake.com/public/7/e/d/7ed265a6-b6a4-47b3-8b0c-1679741c0901_large/coding-creative-professional-stockcake.jpg'

/* -------------------------------- PALETTE --------------------------------
   Fixed navy / yellow / red brand palette from the reference PDF. These are
   literal fills (photo overlays, solid panels) so they read correctly,
   unchanged, on both a light and a dark page — there's no plain "page
   background" text sitting directly on bg-theme-primary in this design.
--------------------------------------------------------------------------- */
const NAVY_DEEP = '#0F1030'
const NAVY = '#1B1E52'
const BLUE = '#2B3FA8'
const BLUE_LIGHT = '#3D6FE0'
const YELLOW = '#F6C90E'
const YELLOW_DEEP = '#E8B800'
const RED = '#E3241C'

const trainingTags = ['CORE JAVA', 'ADV. JAVA', 'DBMS', 'DEV', 'AWS']
const locations = ['Hyderabad', 'Bangalore', 'Pune', 'Vizag']
const openings = [
  'Associate System Engineer',
  'Software Engineer',
  'Operations Associate',
  'Senior S/W Engineer',
  'Analyst',
  'Dev Engineer',
]
const stagesTop = [
  { n: 1, title: 'Resume Forwarding' },
  { n: 2, title: 'Assessment/ Tests' },
  { n: 3, title: 'Interview/ Tech Profile' },
  { n: 4, title: 'One to One AI Rounds' },
  { n: 5, title: 'Documentation' },
  { n: 6, title: 'Back Ground verification' },
]
const stagesBottom = [
  { n: 7, title: 'Offer Letter' },
  { n: 8, title: 'Joining' },
]
const weProvide = [
  { title: 'Career Solutions', desc: 'Fresher to experienced with gaps or shifts and those who are looking for career growth.' },
  { title: 'Projects', desc: 'Real Time Projects, Academic projects and simulation projects and also we develop projects for your business or research.' },
  { title: 'Internships', desc: 'Both paid & non-paid internships with start-up & MNCs.' },
  { title: 'OJTs', desc: 'On The Job opportunities for students with paid & experienced purpose.' },
]

/* ---------------------------------------------------------
   FREE JOBS = static "Software – IT" deck UI
--------------------------------------------------------- */
function FreeJobsPdfView({ openEnquiry }) {
  return (
    <div className="bg-theme-primary">

      {/* ---------------- HERO ---------------- */}
      <section
        className="relative overflow-hidden px-6 py-16 sm:py-20 lg:py-28"
        style={{
          background: `linear-gradient(135deg, ${NAVY_DEEP} 0%, ${NAVY} 100%)`,
        }}
      >
        {/* faint decorative "code" texture */}
        <div
          className="absolute inset-0 opacity-[0.07] pointer-events-none select-none"
          style={{
            backgroundImage: `repeating-linear-gradient(0deg, ${BLUE_LIGHT} 0px, ${BLUE_LIGHT} 1px, transparent 1px, transparent 26px)`,
          }}
        />
        <div className="relative max-w-6xl mx-auto grid lg:grid-cols-[1.2fr_1fr] gap-12 items-center">
          <div>
            <h1 className="text-white font-extrabold text-4xl sm:text-6xl lg:text-7xl leading-tight mb-4">
              Software – IT
            </h1>
            <p className="text-white/90 font-semibold text-lg sm:text-2xl lg:text-3xl">
              Career | Projects | Internships | OJTs
            </p>
          </div>
          {/* decorative terminal card — fills the extra width on large screens */}
          <div
            className="hidden lg:block rounded-2xl p-6 font-mono text-sm leading-relaxed shadow-2xl border"
            style={{ backgroundColor: `${NAVY_DEEP}cc`, borderColor: `${BLUE_LIGHT}44` }}
          >
            <div className="flex gap-1.5 mb-4">
              <span className="w-3 h-3 rounded-full" style={{ backgroundColor: '#FF5F56' }} />
              <span className="w-3 h-3 rounded-full" style={{ backgroundColor: '#FFBD2E' }} />
              <span className="w-3 h-3 rounded-full" style={{ backgroundColor: '#27C93F' }} />
            </div>
            <p style={{ color: BLUE_LIGHT }}>const <span style={{ color: YELLOW }}>career</span> = {'{'}</p>
            <p className="pl-4 text-white/70">domains: <span style={{ color: YELLOW }}>'software, cloud, devops'</span>,</p>
            <p className="pl-4 text-white/70">training: <span style={{ color: YELLOW }}>'online + offline'</span>,</p>
            <p className="pl-4 text-white/70">support: <span style={{ color: YELLOW }}>'freshers + experienced'</span>,</p>
            <p style={{ color: BLUE_LIGHT }}>{'}'}</p>
          </div>
        </div>
      </section>

      {/* ---------------- SOFTWARE PLACEMENT SERVICE ---------------- */}
      <section
        className="relative bg-cover bg-no-repeat min-h-[320px] lg:min-h-[420px] flex items-center"
        style={{ backgroundImage: `url(${PLACEMENT_IMG})`, backgroundPosition: 'center 20%' }}
      >
        <div
          className="absolute inset-0"
          style={{ background: `linear-gradient(100deg, ${NAVY_DEEP}e6 40%, ${BLUE}66 100%)` }}
        />
        <div className="relative max-w-6xl mx-auto px-6 py-16 w-full">
          <div className="max-w-xl lg:max-w-2xl">
            <span
              className="inline-block rounded-full px-5 py-2 text-white font-bold text-sm lg:text-base mb-4"
              style={{ backgroundColor: NAVY }}
            >
              SOFTWARE PLACEMENT SERVICE
            </span>
            <p className="text-white/90 leading-relaxed lg:text-lg">
              We offer software placement service to freshers &amp; experienced in all domains and
              technologies. Our placement services are both start-up companies &amp; MNCs.
            </p>
          </div>
        </div>
      </section>

      {/* ---------------- ONLINE & OFFLINE TRAINING ---------------- */}
      <section className="px-6 py-14 lg:py-20" style={{ backgroundColor: NAVY }}>
        <div className="max-w-6xl mx-auto grid sm:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr] gap-6 lg:gap-12 items-center">
          <div className="rounded-2xl p-6 lg:p-8 text-center font-extrabold text-2xl lg:text-3xl leading-snug" style={{ backgroundColor: BLUE, color: YELLOW }}>
            ONLINE<br />&amp;<br />OFFLINE<br />TRAINING
          </div>
          <div>
            <div className="flex flex-wrap gap-3 lg:gap-4 mb-4">
              {trainingTags.map((tag, i) => (
                <span
                  key={i}
                  className="px-5 py-2.5 lg:px-7 lg:py-3.5 rounded-lg font-bold text-white text-sm lg:text-base"
                  style={{ backgroundColor: BLUE_LIGHT }}
                >
                  {tag}
                </span>
              ))}
            </div>
            <p className="text-white/80 text-sm lg:text-base">
              SAP, .NET, ORACLE, TESTING<br />
              <span className="font-semibold text-white/95">Trending Courses Offered..</span>
            </p>
          </div>
        </div>
      </section>

      {/* ---------------- PLACEMENT SERVICE LOCATIONS ---------------- */}
      <section className="px-6 py-12 lg:py-16" style={{ backgroundColor: YELLOW }}>
        <div className="max-w-6xl mx-auto">
          <h2 className="font-extrabold text-2xl sm:text-3xl lg:text-4xl mb-6 lg:mb-8" style={{ color: NAVY_DEEP }}>
            PLACEMENT SERVICE LOCATIONS
          </h2>
          <div className="flex flex-wrap items-center gap-3 lg:gap-4">
            {locations.map(loc => (
              <span
                key={loc}
                className="flex items-center gap-2 rounded-full px-5 py-2.5 lg:px-7 lg:py-3.5 font-bold text-white text-sm lg:text-base"
                style={{ backgroundColor: BLUE }}
              >
                <MapPin size={14} style={{ color: YELLOW }} />
                {loc}
              </span>
            ))}
            <span className="font-semibold text-sm lg:text-base" style={{ color: NAVY_DEEP }}>&amp; all major cities</span>
          </div>
        </div>
      </section>

      {/* ---------------- TOP OPENINGS WE DEAL WITH ---------------- */}
      <section
        className="relative bg-cover bg-no-repeat min-h-[320px] lg:min-h-[440px] flex items-center"
        style={{ backgroundImage: `url(${OPENINGS_IMG})`, backgroundPosition: 'center 35%' }}
      >
        <div
          className="absolute inset-0"
          style={{ background: `linear-gradient(100deg, ${NAVY_DEEP}f0 45%, ${NAVY_DEEP}55 100%)` }}
        />
        <div className="relative max-w-6xl mx-auto px-6 py-14 w-full">
          <span
            className="inline-block rounded-full px-5 py-2 text-white font-bold text-sm lg:text-base mb-6"
            style={{ backgroundColor: NAVY }}
          >
            Top Openings We Deal with
          </span>
          <ul className="grid sm:grid-cols-1 lg:grid-cols-2 gap-x-10 gap-y-3 max-w-xs lg:max-w-2xl">
            {openings.map(o => (
              <li key={o} className="text-white/90 text-sm lg:text-base flex items-center gap-2">
                <span className="w-1 h-1 rounded-full bg-white/70 shrink-0" />
                {o}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ---------------- PLACEMENT SERVICE STAGES ---------------- */}
      <section className="px-6 py-14 lg:py-20" style={{ backgroundColor: YELLOW }}>
        <div className="max-w-6xl mx-auto">
          <h2 className="font-extrabold text-2xl sm:text-3xl lg:text-4xl mb-10 lg:mb-16" style={{ color: NAVY_DEEP }}>
            PLACEMENT SERVICE STAGES
          </h2>

          {/* mobile / tablet: two-row zigzag layout */}
          <div className="lg:hidden">
            <div className="flex flex-wrap items-start gap-x-2 gap-y-8 mb-8">
              {stagesTop.map((s, i) => (
                <React.Fragment key={s.n}>
                  <div className="flex flex-col items-center w-20 sm:w-24 text-center">
                    <div
                      className="w-14 h-14 rounded-full flex items-center justify-center font-extrabold text-lg text-white border-2 mb-2"
                      style={{ borderColor: BLUE, backgroundColor: i % 2 === 0 ? BLUE : YELLOW_DEEP, color: i % 2 === 0 ? YELLOW : NAVY_DEEP }}
                    >
                      {s.n}
                    </div>
                    <p className="text-xs font-semibold" style={{ color: NAVY_DEEP }}>{s.title}</p>
                  </div>
                  {i < stagesTop.length - 1 && (
                    <div className="flex-1 min-w-[16px] border-t-2 border-dashed self-center mt-[-28px]" style={{ borderColor: NAVY }} />
                  )}
                </React.Fragment>
              ))}
            </div>
            <div className="flex justify-end">
              <div className="flex items-start gap-2">
                {stagesBottom.slice().reverse().map((s, i) => (
                  <React.Fragment key={s.n}>
                    {i > 0 && (
                      <div className="w-8 sm:w-12 border-t-2 border-dashed self-center mt-[-28px]" style={{ borderColor: NAVY }} />
                    )}
                    <div className="flex flex-col items-center w-20 sm:w-24 text-center">
                      <div
                        className="w-14 h-14 rounded-full flex items-center justify-center font-extrabold text-lg mb-2"
                        style={{ backgroundColor: BLUE, color: YELLOW }}
                      >
                        {s.n}
                      </div>
                      <p className="text-xs font-semibold" style={{ color: NAVY_DEEP }}>{s.title}</p>
                    </div>
                  </React.Fragment>
                ))}
              </div>
            </div>
          </div>

          {/* large screens: single straight row, 1 through 8 */}
          <div className="hidden lg:flex items-start gap-x-1">
            {[...stagesTop, ...stagesBottom].map((s, i, all) => (
              <React.Fragment key={s.n}>
                <div className="flex flex-col items-center flex-1 text-center px-1">
                  <div
                    className="w-16 h-16 xl:w-20 xl:h-20 rounded-full flex items-center justify-center font-extrabold text-xl border-2 mb-3"
                    style={{ borderColor: NAVY, backgroundColor: i % 2 === 0 ? BLUE : YELLOW_DEEP, color: i % 2 === 0 ? YELLOW : NAVY_DEEP }}
                  >
                    {s.n}
                  </div>
                  <p className="text-sm font-semibold leading-snug" style={{ color: NAVY_DEEP }}>{s.title}</p>
                </div>
                {i < all.length - 1 && (
                  <div className="flex-1 max-w-[48px] border-t-2 border-dashed self-start mt-8" style={{ borderColor: NAVY }} />
                )}
              </React.Fragment>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------- CTA STRIP ---------------- */}
      <section className="py-6 lg:py-10 px-6 text-center" style={{ backgroundColor: NAVY }}>
        <button
          onClick={() => openEnquiry('Software – IT Career Guidance')}
          className="font-bold text-white text-base sm:text-lg lg:text-2xl hover:underline"
        >
          Talk To Our Experts For Career Guidance
        </button>
      </section>

      {/* ---------------- DEVELOPER PHOTO ---------------- */}
      <section
        className="relative h-64 sm:h-80 lg:h-[420px] bg-cover bg-no-repeat"
        style={{ backgroundImage: `url(${DEVELOPER_IMG})`, backgroundPosition: 'center 15%' }}
      >
        <div
          className="absolute inset-0 hidden lg:block"
          style={{ background: `linear-gradient(90deg, ${NAVY_DEEP}cc 0%, transparent 45%)` }}
        />
        <div className="hidden lg:flex relative max-w-6xl mx-auto h-full items-center px-6">
          <p className="text-white font-extrabold text-3xl xl:text-4xl max-w-md leading-tight">
            Skilled talent, ready to build.
          </p>
        </div>
      </section>

      {/* ---------------- WE PROVIDE ---------------- */}
      <section style={{ backgroundColor: NAVY_DEEP }}>
        <div className="max-w-6xl mx-auto px-6 py-12 lg:py-20">
          <h2 className="text-white font-extrabold text-3xl sm:text-4xl lg:text-5xl mb-8 lg:mb-12">WE PROVIDE</h2>

          <div className="flex flex-col lg:hidden mb-10 rounded-2xl overflow-hidden">
            {weProvide.map((item, i) => (
              <div key={item.title}>
                <div className="px-5 py-3 font-bold text-white" style={{ backgroundColor: i % 2 === 0 ? BLUE : BLUE_LIGHT }}>
                  {item.title}
                </div>
                <div className="px-5 py-4 text-white/80 text-sm leading-relaxed" style={{ backgroundColor: NAVY_DEEP }}>
                  {item.desc}
                </div>
              </div>
            ))}
          </div>

          {/* large screens: balanced card grid instead of full-bleed stripes */}
          <div className="hidden lg:grid grid-cols-2 gap-6 mb-12">
            {weProvide.map((item, i) => (
              <div key={item.title} className="rounded-2xl overflow-hidden">
                <div className="px-6 py-4 font-bold text-white text-lg" style={{ backgroundColor: i % 2 === 0 ? BLUE : BLUE_LIGHT }}>
                  {item.title}
                </div>
                <div className="px-6 py-5 text-white/80 leading-relaxed" style={{ backgroundColor: `${BLUE}22` }}>
                  {item.desc}
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-center">
            <button
              onClick={() => openEnquiry('Software – IT — We Provide')}
              className="px-8 py-3 lg:px-10 lg:py-4 rounded-xl font-extrabold text-white text-base lg:text-lg shadow-md hover:opacity-90 transition"
              style={{ backgroundColor: RED }}
            >
              Enquiry Now
            </button>
          </div>
        </div>
      </section>
    </div>
  )
}

/* ---------------------------------------------------------
   PAID / TALLY = original job-card listing UI (unchanged)
--------------------------------------------------------- */
function JobListingView({ type, config }) {
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

      <ReelPopup job={reelJob} onClose={() => setReelJob(null)} />
    </div>
  )
}

/* ---------------------------------------------------------
   MAIN EXPORT — routes free vs paid/tally
--------------------------------------------------------- */
export default function Jobs() {
  const { type = 'free' } = useParams()
  const config = TYPE_CONFIG[type] || TYPE_CONFIG.free
  const [panel, setPanel] = useState({ open: false, degree: null })

  const openEnquiry = (title) =>
    setPanel({ open: false, degree: { _id: title, title, university: 'SBS – Sai Business Services' } })

  if (type === 'free') {
    return (
      <div className="page-enter">
        <FreeJobsPdfView openEnquiry={openEnquiry} />
        <PopupForm
          open={panel.open}
          onClose={() => setPanel({ open: false, degree: null })}
          type="degree"
          refId={panel.degree?._id}
          refTitle={panel.degree ? panel.degree.title : ''}
        />
      </div>
    )
  }

  return <JobListingView type={type} config={config} />
}
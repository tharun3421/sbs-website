import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import {
  Search, MapPin, Briefcase, IndianRupee, ChevronLeft, ChevronRight,
  GraduationCap, Play, Calculator, Code, BarChart3, Cloud, Network,
  Bug, Server, ChevronRight as ChevronRightIcon
} from 'lucide-react'
import api from '../../api'
import PopupForm from '../../components/PopupForm'
import LogoScroller from '../../components/LogoScroller'
import ReelPopup from '../../components/ReelPopup'
import {
  ServerRoomIllustration,
  DeskCharacterIllustration,
  EngineerBoardIllustration,
  DevOpsDashboardIllustration,
  QATestingIllustration,
  ITSupportIllustration,
} from './JobsIllustrations'

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

/* ---------------------------------------------------------
   FREE JOBS = static "IT Jobs & Career Opportunities" deck UI
--------------------------------------------------------- */
function FreeJobsPdfView() {
  return (
    <div className="bg-white text-[#1a1a1a]">

      {/* SLIDE 1 — Hero */}
      <section className="max-w-6xl mx-auto px-6 py-20 grid md:grid-cols-2 gap-10 items-center">
        <div>
          <h1 className="text-5xl font-light leading-tight mb-6">
            IT Jobs & Career<br />Opportunities
          </h1>
          <p className="text-gray-500 text-lg mb-8">Build Your Skills. Build Your Career.</p>
          <div className="flex flex-wrap gap-3">
            {['Software', 'Data', 'Cloud', 'DevOps', 'IT Operations'].map((tag, i) => (
              <span
                key={tag}
                className={`px-4 py-2 rounded-full border text-sm ${
                  i === 0 ? 'bg-gray-100 border-gray-300' : 'border-gray-300 text-gray-600'
                }`}
              >
                {tag.toUpperCase()}
              </span>
            ))}
          </div>
        </div>
        <div className="bg-[#e9eaf0] rounded-2xl h-72 flex items-center justify-center overflow-hidden">
          <ServerRoomIllustration className="w-full h-full" />
        </div>
      </section>

      {/* SLIDE 2 — Today's IT Job Opportunities */}
      <section className="max-w-6xl mx-auto px-6 py-16">
        <h2 className="text-3xl font-light mb-3">Today's IT Job Opportunities</h2>
        <p className="text-gray-500 mb-1">
          The IT industry offers diverse opportunities across software development, data, cloud,
          DevOps, testing, systems, and operations.
        </p>
        <p className="font-semibold mb-8">Multiple Roles. Multiple Career Paths.</p>

        <div className="grid sm:grid-cols-2 gap-x-12 gap-y-8">
          {[
            { icon: Code, title: 'Software Development', desc: 'Build applications and digital products using modern programming languages and frameworks.' },
            { icon: BarChart3, title: 'Data & Analytics', desc: 'Analyze, interpret, and visualize data to drive business decisions and strategy.' },
            { icon: Cloud, title: 'Cloud & DevOps', desc: 'Deploy and manage scalable infrastructure across AWS, Azure, and GCP platforms.' },
            { icon: Network, title: 'IT Operations', desc: 'Keep systems, networks, and infrastructure running reliably around the clock.' },
            { icon: Bug, title: 'Software Testing', desc: 'Ensure application quality, reliability, and performance through rigorous testing.' },
            { icon: Server, title: 'Systems & Infrastructure', desc: 'Design and maintain the foundational technology backbone of organizations.' },
          ].map(({ icon: I, title, desc }) => (
            <div key={title} className="flex gap-4">
              <div className="w-9 h-9 shrink-0 rounded-full border border-gray-300 flex items-center justify-center">
                <I size={16} strokeWidth={1.5} />
              </div>
              <div>
                <h3 className="font-medium text-[#3a4a8a] mb-1">{title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* SLIDE 3 — Software Career Hierarchy */}
      <section className="max-w-6xl mx-auto px-6 py-16 grid md:grid-cols-2 gap-10">
        <div>
          <h2 className="text-3xl font-light mb-2">Software Career Hierarchy</h2>
          <p className="text-gray-500 mb-8">A clear path from entry-level roles to senior leadership positions</p>
          <div className="bg-[#f3f4f7] rounded-2xl h-64 flex items-center justify-center overflow-hidden">
            <DeskCharacterIllustration className="w-full h-full" />
          </div>
        </div>
        <div>
          <span className="inline-block bg-gray-100 text-xs font-medium px-3 py-1 rounded-md mb-4">SOFTWARE JOBS</span>
          <div className="divide-y divide-gray-200">
            {[
              { n: 1, title: 'Software Programmer', desc: 'Write and maintain code for applications and systems.' },
              { n: 2, title: 'Software Engineer', desc: 'Design scalable solutions and lead technical development.' },
              { n: 3, title: 'Software Developer', desc: 'Build and ship full-featured digital products end-to-end.' },
              { n: 4, title: 'Software Architect', desc: 'Define system structure, standards, and technical vision.' },
            ].map(({ n, title, desc }) => (
              <div key={n} className="flex gap-5 py-5">
                <div className="w-14 h-14 shrink-0 rounded-lg bg-[#e5e6ec] flex items-center justify-center text-xl text-gray-600">
                  {n}
                </div>
                <div>
                  <h3 className="font-medium mb-1">{title}</h3>
                  <p className="text-sm text-gray-500">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SLIDE 4 — From Entry Level to Leadership */}
      <section className="max-w-6xl mx-auto px-6 py-16">
        <h2 className="text-3xl font-light mb-2">From Entry Level to Leadership</h2>
        <p className="text-gray-500 mb-10">Your IT career progression path — from trainee to technical leader</p>

        <div className="relative w-full max-w-3xl" style={{ paddingBottom: '50%' }}>
          <svg
            viewBox="0 0 1200 600"
            className="absolute inset-0 w-full h-full"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* concentric rings */}
            <circle cx="320" cy="300" r="220" fill="#5b5f9c" />
            <circle cx="320" cy="300" r="165" fill="#6f74ad" />
            <circle cx="320" cy="300" r="70" fill="#14152b" />

            {/* leader lines */}
            <line x1="461" y1="131" x2="780" y2="120" stroke="#c7c9e0" strokeWidth="2" />
            <line x1="485" y1="300" x2="780" y2="300" stroke="#c7c9e0" strokeWidth="2" />
            <line x1="344" y1="366" x2="780" y2="480" stroke="#c7c9e0" strokeWidth="2" />

            {/* dots */}
            <circle cx="780" cy="120" r="6" fill="#5b5f9c" />
            <circle cx="780" cy="300" r="6" fill="#6f74ad" />
            <circle cx="780" cy="480" r="6" fill="#14152b" />
          </svg>

          {/* labels, aligned to the SVG coordinate system above */}
          <div className="absolute" style={{ left: '67%', top: '20%', transform: 'translateY(-50%)' }}>
            <h3 className="font-medium text-lg whitespace-nowrap">High Level</h3>
            <p className="text-gray-500 text-sm whitespace-nowrap">Project Manager &amp; Technical Leadership</p>
          </div>
          <div className="absolute" style={{ left: '67%', top: '50%', transform: 'translateY(-50%)' }}>
            <h3 className="font-medium text-lg whitespace-nowrap">Mid Level</h3>
            <p className="text-gray-500 text-sm whitespace-nowrap">Software Analyst to Senior Engineers</p>
          </div>
          <div className="absolute" style={{ left: '67%', top: '80%', transform: 'translateY(-50%)' }}>
            <h3 className="font-medium text-lg whitespace-nowrap">Entry Level</h3>
            <p className="text-gray-500 text-sm whitespace-nowrap">Trainee &amp; Junior Engineer roles</p>
          </div>
        </div>

        <p className="text-gray-500 mt-10 max-w-3xl">
          Every IT career starts with foundational roles and grows through continuous learning,
          hands-on experience, and demonstrated technical leadership.
        </p>
      </section>

      {/* SLIDE 5 — Software Developer */}
      <section className="max-w-6xl mx-auto px-6 py-16">
        <h2 className="text-3xl font-light mb-2">Software Developer</h2>
        <p className="text-gray-600 mb-8">
          <span className="font-semibold">Build. Code. Test. Deliver.</span> — Software Developers
          design, build, test, maintain, and improve software applications and digital solutions.
        </p>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { title: 'Programming Languages', desc: 'Python, Java, JavaScript, C++' },
            { title: 'Data Structures', desc: 'Arrays, trees, graphs, queues' },
            { title: 'Databases', desc: 'SQL, NoSQL, query design' },
            { title: 'APIs & Version Control', desc: 'REST, Git, GitHub workflows' },
            { title: 'Problem Solving', desc: 'Algorithms, debugging, logic' },
            { title: 'SDLC', desc: 'Agile, Scrum, release cycles' },
          ].map(({ title, desc }) => (
            <div key={title} className="bg-[#e9eaf0] rounded-xl p-5">
              <h3 className="font-medium mb-2">{title}</h3>
              <p className="text-sm text-gray-500">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* SLIDE 6 — Software Engineer */}
      <section className="max-w-6xl mx-auto px-6 py-16">
        <h2 className="text-3xl font-light mb-2">Software Engineer</h2>
        <p className="text-gray-600 mb-8">
          <span className="font-semibold">Engineering Solutions That Scale</span> — Software Engineers
          focus on building scalable, maintainable solutions across application development, system
          design, and architecture.
        </p>

        <div className="grid md:grid-cols-2 gap-10">
          <div>
            <span className="text-xs font-semibold text-red-400 tracking-wide">ROLE FOCUS</span>
            <div className="grid grid-cols-2 gap-4 mt-4 mb-8">
              {['Application Development', 'System Design', 'Performance Optimization', 'Code Quality', 'Architecture Planning'].map(t => (
                <div key={t} className="border-l-2 border-gray-800 pl-3 py-1 text-sm">{t}</div>
              ))}
            </div>
            <div className="grid grid-cols-2 gap-4">
              {['Programming Languages', 'Algorithms', 'Databases', 'Cloud Technologies'].map((t, i) => (
                <div key={t} className="bg-[#e5e6ec] rounded-full text-center py-3 text-sm">
                  {i + 1}<br /><span className="text-xs">{t}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="bg-[#f3f4f7] rounded-2xl h-64 flex items-center justify-center overflow-hidden">
            <EngineerBoardIllustration className="w-full h-full" />
          </div>
        </div>
      </section>

      {/* SLIDE 7 — Analyst Career Path */}
      <section className="max-w-6xl mx-auto px-6 py-16">
        <h2 className="text-3xl font-light mb-2">Analyst Career Path</h2>
        <p className="text-gray-500 mb-10">
          Three connected roles in the analyst career progression — from data foundations to senior technical coordination
        </p>
        <div className="grid md:grid-cols-3 gap-1">
          {[
            { n: '01', title: 'Analyst', desc: 'Data analysis, SQL, debugging, reporting, and problem solving.' },
            { n: '02', title: 'Software Analyst', desc: 'Application analysis, requirements, testing, and business/technical coordination.' },
            { n: '03', title: 'Senior Software Analyst', desc: 'Advanced analysis, solution planning, technical coordination, and team support.' },
          ].map(({ n, title, desc }, i) => (
            <div key={n} className="relative">
              <div className="bg-[#e5e6ec] h-16 flex items-center justify-center text-gray-500 mb-4"
                style={{ clipPath: i < 2 ? 'polygon(0 0, 90% 0, 100% 50%, 90% 100%, 0 100%)' : 'none' }}>
                {i + 1}
              </div>
              <span className="text-xs bg-gray-100 px-2 py-1 rounded">{n}</span>
              <h3 className="font-medium mt-2 mb-1">{title}</h3>
              <p className="text-sm text-gray-500">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* SLIDE 8 — DevOps Engineer */}
      <section className="max-w-6xl mx-auto px-6 py-16 grid md:grid-cols-2 gap-10 items-start">
        <div>
          <h2 className="text-3xl font-light mb-4">DevOps Engineer</h2>
          <span className="inline-block bg-gray-100 text-xs font-medium px-3 py-1 rounded-md mb-4">DEVELOPMENT + OPERATIONS</span>
          <p className="text-gray-500 mb-8">
            DevOps Engineers bridge development and operations teams to enable faster, more reliable
            software delivery through automation, deployment pipelines, and infrastructure management.
          </p>
          <div className="grid grid-cols-2 gap-6 text-sm">
            <div><h4 className="font-medium mb-1">Kubernetes & Docker</h4><p className="text-gray-500">Container orchestration and deployment at scale.</p></div>
            <div><h4 className="font-medium mb-1">CI/CD Pipelines</h4><p className="text-gray-500">Automate build, test, and release workflows.</p></div>
            <div><h4 className="font-medium mb-1">Infrastructure Automation</h4><p className="text-gray-500">Terraform for provisioning and managing cloud resources.</p></div>
            <div><h4 className="font-medium mb-1">Monitoring & Logging</h4><p className="text-gray-500">Ensure system reliability and rapid incident response.</p></div>
          </div>
        </div>
        <div className="bg-[#14152b] rounded-2xl h-72 flex items-center justify-center overflow-hidden">
          <DevOpsDashboardIllustration className="w-full h-full" />
        </div>
      </section>

      {/* SLIDE 9 — Cloud & Systems Careers */}
      <section className="max-w-6xl mx-auto px-6 py-16">
        <h2 className="text-3xl font-light mb-2">Cloud & Systems Careers</h2>
        <p className="text-gray-500 mb-10">Related roles in cloud and infrastructure — the backbone of modern enterprise technology</p>

        <div className="grid md:grid-cols-2 gap-10">
          <div>
            <span className="text-xs font-semibold text-red-400 tracking-wide">CAREER ROLES</span>
            <div className="grid grid-cols-2 gap-3 mt-4">
              {['Cloud Engineer', 'DevOps Engineer', 'Systems Engineer', 'Infrastructure Engineer', 'Associate Systems Engineer'].map(t => (
                <div key={t} className="bg-[#e5e6ec] rounded-full text-center py-3 text-sm">{t}</div>
              ))}
            </div>
          </div>
          <div>
            <span className="text-xs font-semibold text-red-400 tracking-wide">KEY SKILLS</span>
            <div className="grid grid-cols-2 gap-3 mt-4">
              {[
                { t: 'Cloud Platforms', d: 'AWS, Azure, GCP' },
                { t: 'Linux & Networking', d: 'Core system administration fundamentals' },
                { t: 'Infrastructure Automation', d: 'IaC tools and configuration management' },
                { t: 'Security & Compliance', d: 'Identity, access, and regulatory standards' },
              ].map(({ t, d }) => (
                <div key={t} className="border border-gray-200 rounded-lg p-3">
                  <h4 className="font-medium text-sm mb-1">{t}</h4>
                  <p className="text-xs text-gray-500">{d}</p>
                </div>
              ))}
              <div className="col-span-2 border border-gray-200 rounded-lg p-3">
                <h4 className="font-medium text-sm mb-1">Monitoring & Troubleshooting</h4>
                <p className="text-xs text-gray-500">Observability, alerting, incident resolution</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SLIDE 10 — Software Testing & Quality */}
      <section className="max-w-6xl mx-auto px-6 py-16 grid md:grid-cols-2 gap-10 items-start">
        <div>
          <h2 className="text-3xl font-light mb-4">Software Testing & Quality</h2>
          <p className="text-gray-600 mb-8">
            <span className="font-semibold">BUILD IT. TEST IT. IMPROVE IT.</span> — Testing professionals
            ensure applications are reliable, functional, secure, and ready for users. Quality assurance
            is critical to software success.
          </p>
          <div className="grid grid-cols-2 gap-8">
            <div>
              <span className="text-xs font-semibold text-red-400 tracking-wide">CAREER ROLES</span>
              <ul className="mt-3 space-y-2 text-sm text-gray-600">
                {['QA Engineer', 'Software Tester', 'Automation Tester', 'Test Engineer', 'Quality Analyst'].map(t => (
                  <li key={t} className="flex items-center gap-2"><span className="w-1 h-1 rounded-full bg-gray-400" />{t}</li>
                ))}
              </ul>
            </div>
            <div>
              <span className="text-xs font-semibold text-red-400 tracking-wide">KEY SKILLS</span>
              <ul className="mt-3 space-y-2 text-sm text-gray-600">
                {['Manual & Automation Testing', 'Test Case Design', 'Debugging & Root Cause Analysis', 'API Testing', 'SDLC Knowledge'].map(t => (
                  <li key={t} className="flex items-center gap-2"><span className="w-1 h-1 rounded-full bg-gray-400" />{t}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
        <div className="bg-[#f3f4f7] rounded-2xl h-72 flex items-center justify-center overflow-hidden">
          <QATestingIllustration className="w-full h-full" />
        </div>
      </section>

      {/* SLIDE 11 — IT Operations & Support */}
      <section className="max-w-6xl mx-auto px-6 py-16">
        <h2 className="text-3xl font-light mb-4">IT Operations & Support</h2>
        <p className="text-gray-600 mb-8">
          <span className="font-semibold">KEEPING TECHNOLOGY RUNNING</span> — IT Operations professionals
          ensure systems, networks, and infrastructure run smoothly. They provide critical support and
          maintain technology reliability.
        </p>

        <div className="grid md:grid-cols-2 gap-10 mb-10">
          <div className="bg-[#e9eaf0] rounded-2xl h-48 flex items-center justify-center overflow-hidden">
            <ITSupportIllustration className="w-full h-full" />
          </div>
          <div>
            <span className="text-xs font-semibold text-red-400 tracking-wide">CAREER ROLES / KEY SKILLS</span>
            <ul className="mt-3 space-y-2 text-sm text-gray-600">
              {['Communication & Troubleshooting', 'System Administration', 'Networking & Technical Support', 'Problem Solving'].map(t => (
                <li key={t} className="flex items-center gap-2"><span className="w-1 h-1 rounded-full bg-gray-400" />{t}</li>
              ))}
            </ul>
          </div>
        </div>

        <div className="grid sm:grid-cols-3 lg:grid-cols-5 gap-6 border-t border-gray-200 pt-6">
          {[
            { n: '01', t: 'Operations Associate' },
            { n: '02', t: 'IT Support Engineer' },
            { n: '03', t: 'Systems Administrator' },
            { n: '04', t: 'Technical Support Specialist' },
            { n: '05', t: 'Infrastructure Support' },
          ].map(({ n, t }) => (
            <div key={n}>
              <span className="text-xs text-gray-400">{n}</span>
              <p className="font-medium text-sm mt-1 border-b border-gray-200 pb-3">{t}</p>
            </div>
          ))}
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

  if (type === 'free') {
    return <FreeJobsPdfView />
  }

  return <JobListingView type={type} config={config} />
}
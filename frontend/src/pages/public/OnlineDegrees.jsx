import React, { useState } from 'react'
import {
  CalendarClock, Briefcase, GraduationCap, Laptop, TrendingUp,
  Compass, RefreshCw, LineChart, Landmark,
} from 'lucide-react'
import PopupForm from '../../components/PopupForm'
import LogoScroller from '../../components/LogoScroller'

/* ---------------------------------- DATA ---------------------------------- */

const courseCodes = ['BA', 'BCOM', 'BBA', 'BCA', 'MA', 'MCOM', 'MBA', 'MCA']

const undergraduate = [
  { code: 'BA', name: 'Bachelor of Arts' },
  { code: 'BCOM', name: 'Bachelor of Commerce' },
  { code: 'BBA', name: 'Bachelor of Business Administration' },
  { code: 'BCA', name: 'Bachelor of Computer Applications' },
]

const postgraduate = [
  { code: 'MA', name: 'Master of Arts' },
  { code: 'MCOM', name: 'Master of Commerce' },
  { code: 'MBA', name: 'Master of Business Administration' },
  { code: 'MCA', name: 'Master of Computer Applications' },
]

const featuredPrograms = [
  {
    tag: 'MCA',
    title: 'Master of Computer Applications',
    university: 'JGI Jain University',
    facts: ['2 Year Program', 'UGC Recognized'],
    desc: 'Build knowledge in computer applications, technology, software, and related areas.',
  },
  {
    tag: 'MBA',
    title: 'Master of Business Administration',
    university: 'JGI Jain University',
    facts: ['2 Year Program', 'UGC Recognized'],
    desc: 'Develop business, management, leadership, and strategic skills.',
  },
]

const whyOnline = [
  { icon: CalendarClock, title: 'Flexible Learning', desc: 'Study according to your schedule and location.' },
  { icon: Briefcase, title: 'Career-Friendly', desc: 'Continue working while pursuing higher education.' },
  { icon: GraduationCap, title: 'Multiple Programs', desc: 'Choose from undergraduate and postgraduate courses.' },
  { icon: Laptop, title: 'Digital Learning', desc: 'Access course content and learning resources online.' },
  { icon: TrendingUp, title: 'Professional Development', desc: 'Build qualifications and knowledge to support your career goals.' },
]

const whoCanChoose = [
  { icon: GraduationCap, title: 'Students', desc: 'Pursue higher education through flexible online learning.' },
  { icon: Briefcase, title: 'Working Professionals', desc: 'Upgrade your qualifications while continuing your career.' },
  { icon: RefreshCw, title: 'Career Changers', desc: 'Develop knowledge and qualifications in a new field.' },
  { icon: LineChart, title: 'Professionals', desc: 'Strengthen your academic profile and career opportunities.' },
]

const howItWorks = [
  { title: 'Explore', desc: 'Browse courses and universities' },
  { title: 'Select', desc: 'Choose the right program' },
  { title: 'Enquire', desc: 'Speak with the education team' },
  { title: 'Check Eligibility', desc: 'Confirm admission requirements' },
  { title: 'Apply', desc: 'Submit your documents' },
]

const howSbsHelps = [
  { num: '01', title: 'Course Selection', desc: 'Find programs aligned with your education and career goals.' },
  { num: '02', title: 'University Guidance', desc: 'Explore available university and institution options.' },
  { num: '03', title: 'Eligibility Guidance', desc: 'Understand admission requirements for your selected course.' },
  { num: '04', title: 'Application Assistance', desc: 'Get support with applications and required documentation.' },
  { num: '05', title: 'Admission Support', desc: 'Receive guidance throughout the admission process.' },
]

/* ------------------------------- SUBCOMPONENTS ----------------------------- */

function SectionHeading({ children }) {
  return <h2 className="text-3xl sm:text-4xl font-semibold text-theme-primary mb-2">{children}</h2>
}

function SectionSubheading({ children }) {
  return <p className="text-theme-secondary uppercase text-sm font-semibold tracking-wide mb-10">{children}</p>
}

function DarkButton({ children, onClick, className = '' }) {
  return (
    <button
      onClick={onClick}
      className={`px-5 py-2.5 rounded-xl font-bold text-xs uppercase tracking-wide bg-[#0A0A0A] text-white hover:bg-[#222] transition ${className}`}
    >
      {children}
    </button>
  )
}

function OutlineButton({ children, onClick, className = '' }) {
  return (
    <button
      onClick={onClick}
      className={`px-5 py-2.5 rounded-xl font-bold text-xs uppercase tracking-wide border border-theme text-theme-primary hover:border-theme-secondary transition ${className}`}
    >
      {children}
    </button>
  )
}

/* ---------------------------------- PAGE ----------------------------------- */

export default function OnlineDegrees() {
  const [panel, setPanel] = useState({ open: false, degree: null })

  const openEnquiry = (title) => setPanel({ open: false, degree: { _id: title, title, university: 'SBS – Sai Business Services' } })

  return (
    <div className="page-enter bg-theme-primary min-h-screen">

      {/* ---------------- HERO ---------------- */}
      <section className="max-w-4xl mx-auto px-4 pt-16 pb-14">
        <p className="text-xs font-bold tracking-wide uppercase text-theme-secondary bg-theme-secondary/10 inline-block px-3 py-1 rounded-full mb-4">
          Online Courses
        </p>
        <h1 className="text-4xl sm:text-5xl font-semibold text-theme-primary mb-2">SBS – Sai Business Services</h1>
        <p className="italic text-theme-secondary mb-6">Learn. Upskill. Advance Your Career.</p>
        <p className="text-theme-secondary mb-6 max-w-2xl leading-relaxed">
          Explore flexible online degree programs designed for students, working professionals,
          and individuals looking to upgrade their qualifications.
        </p>
        <p className="font-bold text-theme-primary mb-8">{courseCodes.join(' | ')}</p>
        <DarkButton onClick={() => openEnquiry('Online Courses — Explore')}>Explore Courses</DarkButton>
      </section>

      {/* ---------------- EXPLORE COURSE CATEGORIES ---------------- */}
      <section className="max-w-6xl mx-auto px-4 py-14">
        <SectionHeading>Explore Course Categories</SectionHeading>
        <SectionSubheading>Find The Right Course For Your Goals</SectionSubheading>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-[#0A0A0A] rounded-2xl p-6">
            <p className="text-white font-bold uppercase tracking-wide mb-4">Undergraduate</p>
            <div className="grid grid-cols-2 gap-3 mb-4">
              {undergraduate.map(c => (
                <div key={c.code} className="border border-white/20 rounded-xl p-4">
                  <p className="text-white font-bold mb-1">{c.code}</p>
                  <p className="text-white/60 text-xs">{c.name}</p>
                </div>
              ))}
            </div>
            <OutlineButton
              onClick={() => openEnquiry('Online Courses — Undergraduate')}
              className="!border-white/30 !text-white hover:!border-white/60"
            >
              View All Courses
            </OutlineButton>
          </div>

          <div>
            <p className="text-theme-primary font-bold uppercase tracking-wide mb-4">Postgraduate</p>
            <div className="grid grid-cols-2 gap-3">
              {postgraduate.map(c => (
                <div key={c.code} className="border-l-2 border-theme pl-4 py-2">
                  <p className="text-theme-primary font-bold mb-1">{c.code}</p>
                  <p className="text-theme-secondary text-xs">{c.name}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ---------------- FEATURED PROGRAMS ---------------- */}
      <section className="max-w-6xl mx-auto px-4 py-14">
        <SectionHeading>Featured Programs</SectionHeading>
        <SectionSubheading>Popular Online Programs</SectionSubheading>

        <div className="grid sm:grid-cols-2 gap-6">
          {featuredPrograms.map((p, i) => (
            <div key={i} className="bg-theme-card border border-theme rounded-2xl p-6">
              <span className="text-xs font-bold uppercase text-theme-secondary bg-theme-secondary/10 px-2.5 py-1 rounded-full inline-block mb-3">
                {p.tag}
              </span>
              <p className="font-semibold text-theme-primary text-lg mb-1">{p.title}</p>
              <p className="font-bold text-theme-primary text-sm mb-2">{p.university}</p>
              <ul className="flex flex-col gap-1 mb-3">
                {p.facts.map((f, j) => (
                  <li key={j} className="flex items-center gap-2 text-theme-secondary text-sm">
                    <span className="w-1.5 h-1.5 rounded-full bg-theme-secondary shrink-0" /> {f}
                  </li>
                ))}
              </ul>
              <p className="text-theme-secondary text-sm mb-5 leading-relaxed">{p.desc}</p>
              <DarkButton onClick={() => openEnquiry(`${p.tag} – ${p.university}`)}>Apply Now</DarkButton>
            </div>
          ))}
        </div>
      </section>

      {/* ---------------- WHY CHOOSE ONLINE EDUCATION ---------------- */}
      <section className="max-w-6xl mx-auto px-4 py-14">
        <SectionHeading>Why Choose Online Education?</SectionHeading>
        <SectionSubheading>Learn Without Putting Your Career On Hold</SectionSubheading>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {whyOnline.map((w, i) => (
            <div key={i} className="bg-theme-secondary/10 rounded-xl p-5">
              <div className="w-11 h-11 rounded-full bg-[#0A0A0A] flex items-center justify-center mb-4">
                <w.icon size={18} className="text-white" />
              </div>
              <p className="font-semibold text-theme-primary mb-1">{w.title}</p>
              <p className="text-theme-secondary text-sm leading-relaxed">{w.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ---------------- WHO CAN CHOOSE ONLINE COURSES ---------------- */}
      <section className="max-w-6xl mx-auto px-4 py-14">
        <SectionHeading>Who Can Choose Online Courses?</SectionHeading>
        <SectionSubheading>Online Education For Different Career Goals</SectionSubheading>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {whoCanChoose.map((w, i) => (
            <div key={i}>
              <w.icon size={26} className="text-theme-secondary mb-3" strokeWidth={1.5} />
              <p className="font-semibold text-theme-primary mb-1">{w.title}</p>
              <p className="text-theme-secondary text-sm leading-relaxed">{w.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ---------------- HOW IT WORKS ---------------- */}
      <section className="max-w-6xl mx-auto px-4 py-14">
        <SectionHeading>How It Works</SectionHeading>
        <SectionSubheading>Your Online Education Journey</SectionSubheading>

        <div className="flex flex-wrap gap-4">
          {howItWorks.map((step, i) => (
            <div
              key={i}
              className={`bg-theme-secondary/10 rounded-2xl p-5 flex-1 min-w-[150px] ${i % 2 === 1 ? 'md:mt-10' : ''}`}
            >
              <p className="font-semibold text-theme-primary mb-1">{step.title}</p>
              <p className="text-theme-secondary text-sm">{step.desc}</p>
            </div>
          ))}
        </div>
        <p className="text-theme-secondary text-sm mt-8 max-w-2xl">
          From browsing programs to beginning your studies, SBS guides you through every step of
          the process — making your path to higher education clear and straightforward.
        </p>
      </section>

      {/* ---------------- HOW SBS HELPS YOU ---------------- */}
      <section className="max-w-6xl mx-auto px-4 py-14">
        <SectionHeading>How SBS Helps You</SectionHeading>
        <SectionSubheading>Complete Guidance From Course To Admission</SectionSubheading>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {howSbsHelps.map(step => (
            <div key={step.num} className="border-t-2 border-theme pt-3">
              <p className="text-xs font-bold text-theme-secondary mb-1">{step.num}</p>
              <p className="font-semibold text-theme-primary mb-1">{step.title}</p>
              <p className="text-theme-secondary text-sm leading-relaxed">{step.desc}</p>
            </div>
          ))}
        </div>

        <p className="border-l-2 border-theme pl-4 font-bold text-theme-primary">
          Your Education. Our Guidance.
        </p>
      </section>

      {/* ---------------- START YOUR ONLINE EDUCATION JOURNEY ---------------- */}
      <section className="max-w-4xl mx-auto px-4 py-16">
        <h2 className="text-3xl sm:text-4xl font-semibold text-theme-primary mb-2 leading-tight">
          Start Your Online Education Journey
        </h2>
        <p className="text-xl text-theme-secondary mb-6">Your Next Qualification Is Just A Step Away.</p>
        <p className="text-theme-secondary mb-8 leading-relaxed">
          Explore online programs that match your{' '}
          <strong className="text-theme-primary">career goals, educational background, and schedule</strong>.
        </p>

        <p className="text-xs font-bold uppercase tracking-wide text-theme-secondary mb-2">Popular Programs</p>
        <p className="font-bold text-theme-primary mb-6">{courseCodes.join(' | ')}</p>

        <div className="flex flex-wrap gap-3 mb-10">
          <DarkButton onClick={() => openEnquiry('Online Courses — Explore')}>Explore Courses</DarkButton>
          <OutlineButton onClick={() => openEnquiry('Online Courses — Apply')}>Apply Now</OutlineButton>
        </div>

        <div className="border-t border-theme pt-6 mb-6">
          <p className="text-theme-primary font-semibold mb-1">SBS – Sai Business Services</p>
          <p className="text-theme-secondary text-sm">
            Website: <span className="underline">www.sbs.ind.in</span> &nbsp;|&nbsp; Phone: +91 63717 97847
          </p>
        </div>

        <div className="bg-theme-secondary/10 rounded-xl p-5">
          <p className="text-theme-secondary text-sm leading-relaxed">
            <strong className="text-theme-primary">Note:</strong> Course availability, fees,
            duration, eligibility, recognition, and admission requirements vary by university and
            program. Verify current details with the respective institution before applying.
          </p>
        </div>
      </section>

      <LogoScroller label="University Partners" accent="#4488FF" logoKey="degreeLogos" />

      <PopupForm
        open={panel.open}
        onClose={() => setPanel({ open: false, degree: null })}
        type="degree"
        refId={panel.degree?._id}
        refTitle={panel.degree ? `${panel.degree.title} – ${panel.degree.university}` : ''}
      />
    </div>
  )
}
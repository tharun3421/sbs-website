import React, { useState } from 'react'
import {
  GraduationCap, Building2, ClipboardCheck, Award, Wallet, Globe2, Plane,
  User, FileText, Landmark, CreditCard, Sparkles,
} from 'lucide-react'
import PopupForm from '../../components/PopupForm'

/* ---------------------------------- DATA ---------------------------------- */

const heroServices = [
  'Course Selection', 'University Selection',
  'Applications', 'Scholarships',
  'Education Loans', 'Visa Guidance',
]

const finlandPrograms = [
  {
    flag: '🇫🇮',
    country: 'FINLAND',
    title: 'Masters in Computer Science',
    dark: true,
    desc: 'Technology-focused postgraduate programs at leading Finnish universities, designed for ambitious graduates ready to lead in the digital world.',
    points: [
      'Technology-focused programs',
      'Scholarship opportunities',
      'Application guidance',
      'Education loan assistance',
      'Visa guidance',
    ],
  },
  {
    flag: '🇫🇮',
    country: 'FINLAND',
    title: 'Masters in Business',
    dark: false,
    desc: 'Business & Management programs at internationally recognised Finnish institutions, combining academic rigour with global career prospects.',
    points: [
      'Business & Management programs',
      'International education',
      'Scholarship opportunities',
      'Application assistance',
      'Education loan assistance',
      'Visa guidance',
    ],
  },
]

const australiaIncludes = [
  'Hospitality education',
  'Career-focused programs',
  'Practical learning opportunities',
  'Application support',
  'Education loan assistance',
  'Visa guidance',
]

const australiaHighlights = [
  { title: 'Hospitality Education', desc: 'Industry-aligned curriculum at leading Australian institutions.' },
  { title: 'Career-Focused Programs', desc: 'Practical learning with real-world hospitality exposure.' },
  { title: 'Full Application Support', desc: 'Application, loan, and visa guidance — end to end.' },
]

const services = [
  { icon: GraduationCap, title: 'Course Selection', desc: 'Explore courses based on your education and career goals.' },
  { icon: Building2, title: 'University Selection', desc: 'Identify suitable institutions based on your profile.' },
  { icon: ClipboardCheck, title: 'Application Assistance', desc: 'Guidance with application preparation and submission.' },
  { icon: Award, title: 'Scholarship Guidance', desc: 'Explore applicable scholarship opportunities.' },
  { icon: Wallet, title: 'Education Loan Assistance', desc: 'Explore available education financing options.' },
  { icon: CreditCard, title: 'Visa Guidance', desc: 'Understand applicable visa documentation and processes.' },
  { icon: Plane, title: 'Pre-Departure Support', desc: 'Guidance for preparing for your international education journey.' },
]

const processSteps = [
  { title: 'Counselling', desc: 'Clarify goals and destinations' },
  { title: 'Profile Review', desc: 'Assess strengths and gaps' },
  { title: 'Shortlisting', desc: 'Choose courses and universities' },
  { title: 'Applications', desc: 'Prepare and submit documents' },
  { title: 'Funding Help', desc: 'Explore loans and scholarships' },
]

const whyStudyAbroad = [
  { title: 'Global Exposure', desc: 'Experience diverse cultures and international environments that broaden your worldview.' },
  { title: 'Quality Education', desc: 'Access world-class universities and cutting-edge curricula recognised globally.' },
  { title: 'Career Opportunities', desc: 'Unlock global job markets and open doors with multinational employers.' },
  { title: 'International Network', desc: 'Build lifelong connections with peers, professors, and professionals worldwide.' },
  { title: 'Personal Development', desc: 'Grow in independence, resilience, and adaptability — skills that last a lifetime.' },
]

const whyChooseSBS = [
  { icon: User, title: 'Personalized Counselling', desc: 'One-on-one guidance tailored to your unique profile and ambitions.' },
  { icon: Globe2, title: 'Multiple Study Destinations', desc: 'Access programs across Finland, Australia, and more international destinations.' },
  { icon: FileText, title: 'Application Guidance', desc: 'Expert support at every stage of your application journey.' },
  { icon: Award, title: 'Scholarship Assistance', desc: 'Identify and apply for scholarships that match your profile.' },
  { icon: Landmark, title: 'Education Loan Support', desc: 'Navigate financing options with confidence and clarity.' },
  { icon: CreditCard, title: 'Visa Process Guidance', desc: 'Clear, accurate guidance on documentation and visa requirements.' },
]

const profileFields = [
  { label: 'Qualification', desc: 'Your current or most recent academic qualification' },
  { label: 'Preferred Course', desc: 'The field or subject you wish to study' },
  { label: 'Preferred Country', desc: 'Your destination of choice' },
  { label: 'Budget', desc: 'Your approximate education budget' },
  { label: 'IELTS / TOEFL / PTE Status', desc: 'Whether you have taken or plan to take a language test' },
  { label: 'Preferred Intake', desc: 'Your target start date or intake period' },
]

const findProgramSteps = [
  { num: '01', title: 'Share Your Profile', desc: 'Fill in your qualification, course preference, and destination.' },
  { num: '02', title: 'Speak to a Counsellor', desc: 'Our expert team reviews your profile and contacts you.' },
  { num: '03', title: 'Get Your Shortlist', desc: 'Receive a curated list of courses and universities suited to you.' },
  { num: '04', title: 'Begin Your Journey', desc: 'Start your application with full SBS support from day one.' },
]

const faqs = [
  {
    q: 'Can I study abroad without IELTS?',
    a: 'Some universities and programs accept alternative English proficiency tests such as TOEFL or PTE, or may waive requirements in certain cases. Our counsellors will advise you on your specific options.',
  },
  {
    q: 'Are scholarships available?',
    a: 'Yes. Scholarship opportunities vary by country, university, and program. SBS helps you identify and explore scholarships applicable to your profile.',
  },
  {
    q: 'Can SBS help with an education loan?',
    a: 'Yes. SBS provides guidance on available education financing options to help you plan and fund your international education journey.',
  },
  {
    q: 'Does SBS help with university applications?',
    a: 'Absolutely. SBS provides end-to-end application assistance — from document preparation to submission — ensuring your application is complete and compelling.',
  },
  {
    q: 'Can SBS help with the student visa process?',
    a: 'Yes. Our team provides clear guidance on visa documentation and processes applicable to your chosen study destination.',
  },
  {
    q: 'Which countries can I apply for?',
    a: 'SBS currently supports study destinations including Finland and Australia, with multiple programs available. Speak to a counsellor to explore all available options.',
  },
]

/* ------------------------------- SUBCOMPONENTS ----------------------------- */

function SectionHeading({ children }) {
  return <h2 className="text-3xl sm:text-4xl font-semibold text-theme-primary mb-4">{children}</h2>
}

function EnquireButton({ onClick, dark = true, className = '' }) {
  return (
    <button
      onClick={onClick}
      className={`px-5 py-2.5 rounded-xl font-bold text-xs uppercase tracking-wide transition ${
        dark
          ? 'bg-[#0A0A0A] text-white hover:bg-[#222]'
          : 'border border-theme text-theme-primary hover:border-theme-secondary'
      } ${className}`}
    >
      Enquire Now
    </button>
  )
}

/* ---------------------------------- PAGE ----------------------------------- */

export default function StudyAbroad() {
  const [enquiry, setEnquiry] = useState({ open: false, program: null })

  const openEnquiry = (title) => setEnquiry({ open: true, program: title })

  return (
    <div className="page-enter bg-theme-primary min-h-screen">

      {/* ---------------- HERO ---------------- */}
      <section className="max-w-4xl mx-auto px-4 pt-16 pb-14 text-center">
        <p className="text-theme-secondary font-semibold mb-2">SBS – Sai Business Services</p>
        <h1 className="text-4xl sm:text-5xl font-semibold text-theme-primary mb-4">Study Abroad</h1>
        <p className="italic text-theme-secondary mb-8">Your Global Education Journey Starts Here</p>
        <div className="border-t border-theme pt-8">
          <p className="text-theme-secondary mb-8">
            Explore international education opportunities with professional guidance across every step of your journey.
          </p>
          <div className="grid sm:grid-cols-2 gap-px bg-theme border border-theme rounded-2xl overflow-hidden mb-8 max-w-xl mx-auto">
            {heroServices.map((s, i) => (
              <div key={i} className="bg-theme-secondary/10 p-4 text-left">
                <p className="text-theme-primary text-sm font-medium">{s}</p>
              </div>
            ))}
          </div>
          <EnquireButton onClick={() => openEnquiry('Study Abroad — General Enquiry')} />
        </div>
      </section>

      {/* ---------------- STUDY ABROAD PROGRAMS: FINLAND ---------------- */}
      <section className="max-w-6xl mx-auto px-4 py-14">
        <p className="text-xs font-bold tracking-wide uppercase text-theme-secondary bg-theme-secondary/10 inline-block px-3 py-1 rounded-full mb-4">
          Study Abroad Programs
        </p>
        <SectionHeading>Study Abroad Programs</SectionHeading>

        <div className="grid md:grid-cols-2 gap-6 mt-8">
          {finlandPrograms.map((p, i) => (
            <div
              key={i}
              className={`rounded-2xl p-8 flex flex-col ${
                p.dark ? 'bg-[#0A1E3F] text-white' : 'bg-theme-card border border-theme'
              }`}
            >
              <p className={`text-sm font-semibold mb-2 ${p.dark ? 'text-blue-200' : 'text-theme-secondary'}`}>
                {p.flag} {p.country} — {p.title}
              </p>
              <p className={`text-sm leading-relaxed mb-4 ${p.dark ? 'text-blue-100' : 'text-theme-secondary'}`}>
                {p.desc}
              </p>
              <ul className="flex flex-col gap-1.5 mb-6">
                {p.points.map((pt, j) => (
                  <li
                    key={j}
                    className={`flex items-center gap-2 text-sm ${p.dark ? 'text-blue-100' : 'text-theme-secondary'}`}
                  >
                    <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${p.dark ? 'bg-blue-300' : 'bg-theme-secondary'}`} />
                    {pt}
                  </li>
                ))}
              </ul>
              <EnquireButton
                dark={!p.dark}
                onClick={() => openEnquiry(`${p.country} — ${p.title}`)}
                className={p.dark ? '!bg-transparent !border !border-white/40 !text-white hover:!bg-white/10' : ''}
              />
            </div>
          ))}
        </div>
      </section>

      {/* ---------------- AUSTRALIA HOTEL MANAGEMENT ---------------- */}
      <section className="max-w-6xl mx-auto px-4 py-14">
        <p className="text-xs font-bold tracking-wide uppercase text-theme-secondary bg-theme-secondary/10 inline-block px-3 py-1 rounded-full mb-4">
          Study Abroad Programs
        </p>
        <SectionHeading>Australia — Hotel Management</SectionHeading>

        <div className="grid md:grid-cols-2 gap-8 items-start mb-8">
          <p className="text-theme-secondary leading-relaxed">
            Pursue a world-class hospitality education in Australia — one of the most
            sought-after destinations for Hotel Management graduates. Gain practical,
            career-focused skills that open doors across the global hospitality industry.
          </p>

          <div className="bg-[#0A1E3F] rounded-2xl p-6">
            <p className="text-white font-bold mb-3">What's Included</p>
            <ul className="flex flex-col gap-1.5 mb-5">
              {australiaIncludes.map((inc, i) => (
                <li key={i} className="flex items-center gap-2 text-blue-100 text-sm">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-300 shrink-0" /> {inc}
                </li>
              ))}
            </ul>
            <EnquireButton
              onClick={() => openEnquiry('Australia — Hotel Management')}
              className="!bg-transparent !border !border-white/40 !text-white hover:!bg-white/10"
            />
          </div>
        </div>

        <div className="grid sm:grid-cols-3 gap-4">
          {australiaHighlights.map((h, i) => (
            <div key={i} className="border-l-2 border-[#0A1E3F] pl-4 py-1">
              <p className="font-semibold text-theme-primary mb-1">{h.title}</p>
              <p className="text-theme-secondary text-sm leading-relaxed">{h.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ---------------- OUR STUDY ABROAD SERVICES ---------------- */}
      <section className="max-w-6xl mx-auto px-4 py-14">
        <SectionHeading>Our Study Abroad Services</SectionHeading>
        <p className="text-theme-secondary max-w-3xl mb-10 leading-relaxed">
          From your first question to your departure gate — SBS guides you through every step.
        </p>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((s, i) => (
            <div key={i}>
              <s.icon size={26} className="text-theme-secondary mb-3" strokeWidth={1.5} />
              <p className="font-semibold text-theme-primary mb-1">{s.title}</p>
              <p className="text-theme-secondary text-sm leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ---------------- HOW IT WORKS ---------------- */}
      <section className="max-w-6xl mx-auto px-4 py-14">
        <SectionHeading>How It Works</SectionHeading>
        <p className="text-theme-secondary max-w-3xl mb-10 leading-relaxed">
          A clear, structured process designed to take you from aspiration to arrival.
        </p>

        <div className="flex flex-wrap gap-4">
          {processSteps.map((step, i) => (
            <div
              key={i}
              className={`bg-theme-secondary/10 rounded-2xl p-5 flex-1 min-w-[160px] ${i % 2 === 1 ? 'md:mt-10' : ''}`}
            >
              <p className="font-semibold text-theme-primary mb-1">{step.title}</p>
              <p className="text-theme-secondary text-sm">{step.desc}</p>
            </div>
          ))}
        </div>
        <p className="text-theme-secondary text-sm mt-8 max-w-2xl">
          Our step-by-step process ensures nothing is left to chance — from your first
          counselling session to the moment you board your flight.
        </p>
      </section>

      {/* ---------------- WHY STUDY ABROAD ---------------- */}
      <section className="max-w-6xl mx-auto px-4 py-14">
        <SectionHeading>Why Study Abroad?</SectionHeading>
        <p className="text-theme-secondary max-w-3xl mb-10 leading-relaxed">
          An international education is more than a degree — it's a transformation.
        </p>

        <div className="grid md:grid-cols-2 gap-10 items-center">
          <div className="hidden md:flex justify-center">
            <Sparkles size={140} strokeWidth={1} className="text-theme-secondary" />
          </div>
          <div className="flex flex-col gap-6">
            {whyStudyAbroad.map((w, i) => (
              <div key={i}>
                <p className="font-semibold text-theme-primary mb-1 uppercase text-sm tracking-wide">{w.title}</p>
                <p className="text-theme-secondary text-sm leading-relaxed">{w.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------- WHY CHOOSE SBS ---------------- */}
      <section className="max-w-6xl mx-auto px-4 py-14">
        <SectionHeading>Why Choose SBS?</SectionHeading>
        <p className="text-theme-secondary max-w-3xl mb-10 leading-relaxed">
          We don't just process applications — we build your future, step by step.
        </p>

        <div className="grid sm:grid-cols-2 gap-4">
          {whyChooseSBS.map((w, i) => (
            <div key={i} className="bg-theme-secondary/10 rounded-xl p-5 flex gap-4">
              <div className="w-11 h-11 shrink-0 rounded-full bg-[#0A0A0A] flex items-center justify-center">
                <w.icon size={18} className="text-white" />
              </div>
              <div>
                <p className="font-semibold text-theme-primary mb-1">{w.title}</p>
                <p className="text-theme-secondary text-sm leading-relaxed">{w.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ---------------- FIND YOUR RIGHT PROGRAM ---------------- */}
      <section className="max-w-6xl mx-auto px-4 py-14">
        <SectionHeading>Find Your Right Program</SectionHeading>
        <p className="text-theme-secondary max-w-3xl mb-10 leading-relaxed">
          Tell us about yourself and we'll help you find the perfect study abroad opportunity.
        </p>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-[#0A1E3F] rounded-2xl p-8">
            <p className="text-white font-bold text-lg mb-3">Your Profile</p>
            <p className="text-blue-100 text-sm mb-5 leading-relaxed">
              Share a few details so our counsellors can match you with the right course,
              university, and destination.
            </p>
            <ul className="flex flex-col gap-2.5 mb-6">
              {profileFields.map((f, i) => (
                <li key={i} className="text-blue-100 text-sm leading-relaxed">
                  <strong className="text-white">{f.label}</strong> — {f.desc}
                </li>
              ))}
            </ul>
            <button
              onClick={() => openEnquiry('Study Abroad — Get Counselling')}
              className="px-5 py-2.5 rounded-xl font-bold text-xs uppercase tracking-wide border border-white/40 text-white hover:bg-white/10 transition"
            >
              Get Counselling
            </button>
          </div>

          <div className="flex flex-col">
            {findProgramSteps.map((step, i) => (
              <div key={step.num} className={`py-4 ${i !== findProgramSteps.length - 1 ? 'border-b border-theme' : ''}`}>
                <p className="text-xs font-bold text-theme-secondary mb-1">{step.num}</p>
                <p className="font-semibold text-theme-primary mb-1">{step.title}</p>
                <p className="text-theme-secondary text-sm">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------- FAQ ---------------- */}
      <section className="max-w-6xl mx-auto px-4 py-14">
        <SectionHeading>FAQ Section</SectionHeading>
        <p className="text-theme-secondary max-w-3xl mb-10 leading-relaxed">
          Common questions answered — so you can move forward with confidence.
        </p>

        <div className="flex flex-col gap-4">
          {faqs.map((f, i) => (
            <div key={i} className="flex gap-4 border border-theme rounded-xl p-5">
              <span className="text-xl font-bold text-theme-secondary shrink-0">{i + 1}</span>
              <div>
                <p className="font-semibold text-theme-primary mb-1">{f.q}</p>
                <p className="text-theme-secondary text-sm leading-relaxed">{f.a}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ---------------- FINAL CTA ---------------- */}
      <section className="max-w-4xl mx-auto px-4 py-16 text-center">
        <h2 className="text-3xl sm:text-4xl font-semibold text-theme-primary mb-4 leading-tight">
          Ready To Start Your Study Abroad Journey?
        </h2>
        <p className="italic text-theme-secondary mb-8">Your Education. Your Career. Your Global Journey.</p>
        <div className="border-t border-theme pt-8">
          <div className="grid sm:grid-cols-2 gap-px bg-theme border border-theme rounded-2xl overflow-hidden mb-8 max-w-xl mx-auto">
            {heroServices.map((s, i) => (
              <div key={i} className="bg-theme-secondary/10 p-4 text-left">
                <p className="text-theme-primary text-sm font-medium">{s}</p>
              </div>
            ))}
          </div>
          <div className="flex flex-wrap gap-3 justify-center">
            <EnquireButton onClick={() => openEnquiry('Study Abroad — General Enquiry')} />
            <button
              onClick={() => openEnquiry('Study Abroad — Talk to Team')}
              className="px-5 py-2.5 rounded-xl font-bold text-xs uppercase tracking-wide border border-theme text-theme-primary hover:border-theme-secondary transition"
            >
              Talk to Our Study Abroad Team
            </button>
          </div>
        </div>
      </section>

      <PopupForm
        open={enquiry.open}
        onClose={() => setEnquiry({ open: false, program: null })}
        type="study_abroad"
        jobType={null}
        refId={enquiry.program}
        refTitle={enquiry.program || ''}
      />
    </div>
  )
}
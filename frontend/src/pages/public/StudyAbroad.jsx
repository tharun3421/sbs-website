import React, { useState } from 'react'
import {
  CheckCircle2, BookOpen, Briefcase, Atom, Building2,
} from 'lucide-react'
import PopupForm from '../../components/PopupForm'
import heroBanner from '../../assets/studyabroad/hero-banner.png'

/* ---------------------------------- DATA ---------------------------------- */

const services = [
  'Course Selection',
  'Application Assistance',
  'University Selection',
  'Education loans',
  'Scholarships',
  'Visa Guidance',
]

const courses = [
  { icon: BookOpen, label: 'Arts', tone: 'blue' },
  { icon: Briefcase, label: 'Management', tone: 'yellow' },
  { icon: Atom, label: 'Science', tone: 'blue' },
  { icon: Building2, label: 'Engineering', tone: 'yellow' },
]

const steps = [
  { num: 1, title: 'Share Your Profile', desc: 'your qualification, course preference, and destination.' },
  { num: 2, title: 'Speak to a Counsellor', desc: 'Our team reviews your profile and contacts you.' },
  { num: 3, title: 'Get Shortlisted', desc: 'Receive a list of courses and universities suited to you.' },
  { num: 4, title: 'Begin Your Journey', desc: 'Start your application with full SBS support from day one.' },
]

// flagcdn.com serves flat, uniformly-cropped flag PNGs by ISO country code — free, no attribution.
// To swap any of these for an Unsplash photo instead, just replace the `img` value with the
// Unsplash CDN URL (e.g. 'https://images.unsplash.com/photo-XXXXXXX?auto=format&fit=crop&w=400&q=80').
const countries = [
  { name: 'Australia', img: 'https://flagcdn.com/w320/au.png' },
  { name: 'Mauritius', img: 'https://flagcdn.com/w320/mu.png' },
  { name: 'Singapore', img: 'https://flagcdn.com/w320/sg.png' },
  { name: 'Malaysia', img: 'https://flagcdn.com/w320/my.png' },
  { name: 'Malaysia', img: 'https://flagcdn.com/w320/my.png' },
  { name: 'Singapore', img: 'https://flagcdn.com/w320/sg.png' },
  { name: 'Mauritius', img: 'https://flagcdn.com/w320/mu.png' },
  { name: 'Australia', img: 'https://flagcdn.com/w320/au.png' },
]

/* ------------------------------- SUBCOMPONENTS ----------------------------- */

function CoursePill({ icon: Icon, label, tone }) {
  const toneClasses =
    tone === 'yellow'
      ? 'bg-[#F5C518] text-[#1a1a1a]'
      : 'bg-[#3B82F6] text-white'
  return (
    <div className={`flex items-center gap-3 rounded-xl px-5 py-3.5 font-bold ${toneClasses}`}>
      <Icon size={20} strokeWidth={2} />
      <span>{label}</span>
    </div>
  )
}

/* ---------------------------------- PAGE ----------------------------------- */

export default function StudyAbroad() {
  const [enquiry, setEnquiry] = useState({ open: false, program: null })

  const openEnquiry = (title) => setEnquiry({ open: false, program: title })

  return (
    <div className="page-enter bg-theme-primary min-h-screen">

      {/* ---------------- HERO ---------------- */}
      {/* Swap the backgroundImage url below for your own photo. */}
      <section
        className="relative w-full h-[280px] sm:h-[340px] bg-cover bg-center flex items-end"
        style={{
          backgroundImage:
            `linear-gradient(to top, rgba(0,0,0,0.55), rgba(0,0,0,0.05)), url(${heroBanner})`,
        }}
      >
        <div className="max-w-6xl mx-auto w-full px-6 pb-8">
          <h1 className="text-white text-3xl sm:text-4xl font-bold leading-tight max-w-md">
            Your Global Education Journey Starts Here
          </h1>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-4 py-10 flex flex-col gap-8">

        {/* ---------------- OUR SERVICES ---------------- */}
        <div className="bg-[#1C5FE0] rounded-3xl p-6 sm:p-8">
          <div className="flex flex-col sm:flex-row gap-6 sm:gap-8">
            <p className="text-[#F5C518] font-extrabold text-lg shrink-0 sm:w-40">
              OUR SERVICES
            </p>
            <div className="grid sm:grid-cols-2 gap-x-10 gap-y-3 flex-1">
              {services.map((s, i) => (
                <div key={i} className="flex items-center gap-2 text-white">
                  <CheckCircle2 size={18} className="text-blue-200 shrink-0" />
                  <span className="text-sm sm:text-base">{s}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ---------------- COURSES ---------------- */}
        <div className="bg-[#0A1E3F] rounded-3xl p-6 sm:p-8">
          <p className="text-[#F5C518] font-extrabold text-2xl text-center mb-6">
            COURSES
          </p>
          <div className="flex flex-col gap-3 max-w-md mx-auto">
            {courses.map((c, i) => (
              <CoursePill key={i} {...c} />
            ))}
          </div>
        </div>

        {/* ---------------- STEPS ---------------- */}
        <div className="bg-[#3B82F6] rounded-3xl p-6 sm:p-8">
          <p className="text-[#F5C518] font-extrabold text-xl mb-5">
            STEPS TO FIND YOUR RIGHT PROGRAM
          </p>
          <div className="flex flex-col gap-4 mb-6">
            {steps.map((s) => (
              <div key={s.num}>
                <p className="text-white font-bold">
                  {s.num}. {s.title}
                </p>
                <p className="text-blue-50 text-sm ml-4">{s.desc}</p>
              </div>
            ))}
          </div>
          <p className="text-blue-50 text-sm mb-6 max-w-lg">
            Explore international education opportunities with professional guidance
            across every step of your journey.
          </p>
          <div className="flex justify-end">
            <button
              onClick={() => openEnquiry('Study Abroad — General Enquiry')}
              className="bg-[#F5C518] text-[#B91C1C] font-extrabold px-6 py-3 rounded-xl hover:brightness-95 transition"
            >
              Enquire Now!
            </button>
          </div>
        </div>

        {/* ---------------- COUNTRIES ---------------- */}
        <div>
          <p className="text-[#1C5FE0] font-extrabold text-2xl text-center mb-6">
            COUNTRIES
          </p>
          <div className="grid grid-cols-4 gap-3 sm:gap-4">
            {countries.map((c, i) => (
              <div
                key={i}
                className="aspect-[4/3] rounded-lg overflow-hidden border border-theme bg-theme-secondary/10"
                title={c.name}
              >
                <img
                  src={c.img}
                  alt={`${c.name} flag`}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
            ))}
          </div>
        </div>
      </div>

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
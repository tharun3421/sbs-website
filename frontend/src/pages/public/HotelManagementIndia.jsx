import React, { useState } from 'react'
import {
  Clock, UtensilsCrossed, CheckCircle2,
  Building2, Ship, Plane, Hospital, TreePalm, Globe2, Home,
  ChevronRight
} from 'lucide-react'
import PopupForm from '../../components/PopupForm'
import bannerImg from '../../assets/hotel-management/diploma-banner.jpg'
import r1Logo from '../../assets/hotel-management/r1-global-logo.png'

const NAVY = '#0B2256'
const NAVY_DEEP = '#082050'
const RED = '#E30613'
const GOLD = '#FFC700'

const jobRoles = [
  { icon: Building2, text: 'Hotel & Restaurant Management' },
  { icon: Ship, text: 'Cruise Ship Hospitality' },
  { icon: Plane, text: 'Airline Catering & Cabin Services' },
  { icon: Hospital, text: 'Hospital Administration & Catering' },
  { icon: TreePalm, text: 'Resort, Club & Lodge Management' },
  { icon: Globe2, text: 'Travel & Tourism Organizations' },
  { icon: Home, text: 'Guest Houses & Heritage Hospitality' },
]

const whyChoose = [
  'JNCTE Certified Diploma – Recognized across India',
  'All-Inclusive Fee – FREE for first 25 Admissions',
  'Specialized Training in Hotel Operations, Front Office, F&B, Housekeeping, and More',
  'Guest Lectures, Assignments, Live Projects & Industry Visits',
  '100% Job-Ready Program',
]

const whatYoullLearn = [
  'Core Hospitality Management Skills',
  'Customer Service & Communication',
  'Food & Beverage Production & Service',
  'Front Office Management',
  'Housekeeping Operations',
  'Soft Skills & Personality Development',
  'Hospitality Software Training',
]

const whoShouldPursue = [
  'Strong communication and reasoning skills',
  'A pleasing personality',
  'Good numerical aptitude',
  'A passion for customer service and global culture',
]

const whoCanApply = [
  '10th Pass or Above',
  'Freshers or Career Changers',
  'Passionate about Hospitality & Travel',
]

function SectionCard({ title, children }) {
  return (
    <div className="rounded-2xl p-6 md:p-7" style={{ background: NAVY }}>
      <p className="font-bold text-base md:text-lg mb-4" style={{ color: GOLD }}>{title}</p>
      {children}
    </div>
  )
}

function BulletList({ items }) {
  return (
    <ul className="space-y-2.5">
      {items.map((item, i) => (
        <li key={i} className="flex items-start gap-2.5 text-white/90 text-sm leading-relaxed">
          <span className="w-1.5 h-1.5 rounded-full shrink-0 mt-2" style={{ background: GOLD }} />
          {item}
        </li>
      ))}
    </ul>
  )
}

export default function HotelManagementIndia() {
  const [applyOpen, setApplyOpen] = useState(false)

  return (
    <div className="page-enter min-h-screen" style={{ background: '#F7F8FB' }}>
      <div className="max-w-2xl mx-auto px-4 py-8 md:py-10">

        {/* ── Top bar: badges + association logo ── */}
        <div className="flex items-start justify-between gap-3 mb-6">
          <div className="flex gap-2.5">
            <button
              onClick={() => setApplyOpen(true)}
              className="px-4 py-2.5 rounded-xl font-extrabold text-xs md:text-sm text-white shadow-sm"
              style={{ background: NAVY }}
            >
              APPLY NOW
            </button>
            <div
              className="px-4 py-2.5 rounded-xl font-extrabold text-xs md:text-sm text-white shadow-sm"
              style={{ background: RED }}
            >
              ADMISSIONS OPEN
            </div>
          </div>
          <div className="text-right shrink-0">
            <p className="text-[10px] text-gray-500 mb-1">In Association with</p>
            <img src={r1Logo} alt="R1 Global" className="h-9 md:h-10 ml-auto object-contain" />
          </div>
        </div>

        {/* ── Headline ── */}
        <h1 className="text-2xl md:text-3xl font-extrabold mb-4 leading-tight" style={{ color: RED }}>
          FREE HOTEL MANAGEMENT DIPLOMA
        </h1>

        <p className="text-gray-800 text-base md:text-lg font-semibold mb-5 leading-relaxed">
          Thank you for your interest in Hotel Management Diploma in India
        </p>

        {/* ── Job guaranteed banner ── */}
        <div className="rounded-xl py-3.5 px-4 text-center font-extrabold text-white text-sm md:text-base mb-5"
          style={{ background: NAVY }}>
          100% JOB GUARANTEED* PROGRAM
        </div>

        <p className="text-center text-gray-700 text-sm md:text-base mb-1 leading-relaxed">
          with Paid Internship of 6 months<br />
          Free Food &amp; Free Accommodation
        </p>
        <p className="text-center text-gray-700 text-sm md:text-base mb-4 leading-relaxed">
          10<sup>th</sup> / Inter Pass or Fail<br />
          all are eligible for hotel Management Diploma.
        </p>

        <p className="text-center font-semibold text-sm md:text-base mb-8 leading-relaxed" style={{ color: RED }}>
          Start your success story in Hotel management career today!<br />
          your skills makes your career go global..
        </p>

        {/* ── Hero graphic (matches reference design exactly) ── */}
        <div className="rounded-2xl overflow-hidden shadow-md mb-8 border border-gray-200">
          <img src={bannerImg} alt="Free Diploma in Hotel Management — 12 months duration, 100% job guaranteed" className="w-full h-auto block" />
        </div>

        {/* ── Checklist ── */}
        <h2 className="text-xl md:text-2xl font-extrabold mb-4" style={{ color: RED }}>
          FREE HOTEL MANAGEMENT DIPLOMA
        </h2>
        <div className="space-y-3 mb-8">
          {[
            { text: '100% Job Guaranteed' },
            { text: '6 Months Internship' },
            { text: 'Free Food & Accommodation' },
          ].map(({ text }, i) => (
            <div key={i} className="flex items-center gap-3 bg-white rounded-xl px-4 py-3 border border-gray-200 shadow-sm">
              <CheckCircle2 size={20} className="text-green-500 shrink-0" />
              <span className="text-gray-800 font-medium text-sm md:text-base">{text}</span>
            </div>
          ))}
        </div>

        {/* ── Certificate banners ── */}
        <div className="rounded-t-xl py-3.5 px-4 text-center font-bold text-white text-sm md:text-base"
          style={{ background: NAVY_DEEP }}>
          Diploma Certificate issued<br />from JNCTE
        </div>
        <div className="rounded-b-xl py-3 px-4 text-center text-white mb-1" style={{ background: RED }}>
          <p className="font-bold text-sm md:text-base">Globally Valid</p>
          <p className="text-xs opacity-90 mt-0.5">*Free Spoken English Classes Given. No English Fear.</p>
        </div>

        {/* ── Fee callout ── */}
        <div className="flex items-center gap-3 my-7">
          <span className="text-2xl">👉</span>
          <p className="font-extrabold text-base md:text-lg" style={{ color: NAVY }}>
            Just Pay Uniform Fee + Exam Fee 15,000/- only.
          </p>
        </div>

        {/* ── Job opportunities ── */}
        <h3 className="font-bold text-base md:text-lg mb-3" style={{ color: RED }}>
          Job Opportunities with Hotel Management Diploma
        </h3>
        <div className="space-y-2.5 mb-8">
          {jobRoles.map(({ icon: Icon, text }, i) => (
            <div key={i} className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0" style={{ background: `${NAVY}14` }}>
                <Icon size={16} style={{ color: NAVY }} />
              </div>
              <span className="text-gray-800 text-sm md:text-base">{text}</span>
            </div>
          ))}
        </div>

        {/* ── Info cards ── */}
        <div className="space-y-5 mb-8">
          <SectionCard title="Why Choose This Program?">
            <BulletList items={whyChoose} />
          </SectionCard>

          <SectionCard title="What You'll Learn">
            <BulletList items={whatYoullLearn} />
          </SectionCard>

          <SectionCard title="Who Should Pursue This Course?">
            <p className="text-white/90 text-sm mb-3">If you have or are ready to develop:</p>
            <ol className="space-y-2.5 mb-3">
              {whoShouldPursue.map((item, i) => (
                <li key={i} className="flex items-start gap-2.5 text-white/90 text-sm leading-relaxed">
                  <span className="font-bold shrink-0" style={{ color: GOLD }}>{i + 1}.</span>
                  {item}
                </li>
              ))}
            </ol>
            <p className="text-sm font-semibold" style={{ color: GOLD }}>then Hotel Management is for you!</p>
          </SectionCard>

          <SectionCard title="Who Can Apply?">
            <BulletList items={whoCanApply} />
          </SectionCard>

          <SectionCard title="How to Apply?">
            <p className="text-white/90 text-sm">Admissions are now open!</p>
          </SectionCard>
        </div>

        {/* ── Apply button ── */}
        <button
          onClick={() => setApplyOpen(true)}
          className="w-full py-4 rounded-xl font-extrabold text-white text-base md:text-lg shadow-md flex items-center justify-center gap-2 mb-8 transition hover:opacity-90"
          style={{ background: NAVY }}
        >
          APPLY NOW <ChevronRight size={20} />
        </button>

        {/* ── Closing CTA ── */}
        <div className="text-center">
          <h3 className="font-extrabold text-lg md:text-xl mb-2" style={{ color: RED }}>
            Start Your Journey in Hospitality Today!
          </h3>
          <p className="text-gray-700 text-sm md:text-base leading-relaxed">
            Get certified, get skilled, and get placed in top hotels across India and abroad.
          </p>
          <p className="text-gray-700 text-sm md:text-base font-medium">
            Limited FREE Seats Available. Apply Now!
          </p>
        </div>
      </div>

      <PopupForm
        open={applyOpen}
        onClose={() => setApplyOpen(false)}
        type="hotel_management"
        jobType={null}
        refTitle="Hotel Management Diploma (India) – JNCTE Certified Program"
      />
    </div>
  )
}
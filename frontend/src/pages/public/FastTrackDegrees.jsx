import React, { useState } from 'react'
import { GraduationCap, ShieldCheck, Clock3, BadgeCheck, Briefcase } from 'lucide-react'
import PopupForm from '../../components/PopupForm'

/* ---------------------------------- DATA ---------------------------------- */

const faqs = [
  {
    icon: BadgeCheck,
    q: 'Are they valid?',
    a: 'Yes, they are 100% valid.',
  },
  {
    icon: Clock3,
    q: 'How can I finish in less time?',
    a: 'Through Credit Transfer — prior academic credits are carried forward to fast-track your completion.',
  },
  {
    icon: ShieldCheck,
    q: 'Are they UGC, AICTE Approved?',
    a: 'Yes, all Fast Track Degrees are UGC & AICTE Approved.',
  },
  {
    icon: Briefcase,
    q: 'Can I apply for Government Jobs?',
    a: 'Yes — you can apply for both Government & Private sector jobs.',
  },
]

const degreeCodes = ['BA', 'BCOM', 'BBA', 'BCA', 'MA', 'MCOM', 'MBA', 'MCA']

const degreeNames = {
  BA: 'Bachelor of Arts',
  BCOM: 'Bachelor of Commerce',
  BBA: 'Bachelor of Business Administration',
  BCA: 'Bachelor of Computer Applications',
  MA: 'Master of Arts',
  MCOM: 'Master of Commerce',
  MBA: 'Master of Business Administration',
  MCA: 'Master of Computer Applications',
}

/* ------------------------------- IMAGES ------------------------------- */
const HERO_IMG = 'https://images.stockcake.com/public/e/7/4/e74c3df6-8b5e-46cd-a1cb-f3f455efcc8e_large/graduation-cap-toss-stockcake.jpg'

/* -------------------------------- PALETTE -------------------------------- */
const NAVY = '#0b1f4d'
const BLUE = '#1e3a8a'
const YELLOW = '#f4c542'
const RED = '#dc2626'

/* ---------------------------------- PAGE ----------------------------------- */

export default function FastTrackDegrees() {
  const [panel, setPanel] = useState({ open: false, title: '' })

  const openEnquiry = (title) => setPanel({ open: false, title })

  return (
    <div className="page-enter min-h-screen" style={{ backgroundColor: NAVY }}>
      <div className="max-w-xl mx-auto">

        {/* Hero */}
        <div className="relative overflow-hidden">
          <img src={HERO_IMG} alt="" className="absolute inset-0 w-full h-full object-cover" />
          <div
            className="absolute inset-0"
            style={{ background: `linear-gradient(180deg, ${NAVY}99 0%, ${NAVY}cc 55%, ${NAVY} 100%)` }}
          />
          <div className="relative px-6 pt-14 pb-10">
            <div
              className="inline-flex items-center gap-2 rounded-full px-3 py-1 mb-4"
              style={{ backgroundColor: 'rgba(244,197,66,0.12)', border: `1px solid ${YELLOW}55` }}
            >
              <GraduationCap size={14} style={{ color: YELLOW }} />
              <span className="text-[11px] font-bold tracking-wide" style={{ color: YELLOW }}>
                UGC &amp; AICTE APPROVED
              </span>
            </div>
            <h1 className="font-extrabold text-4xl leading-[1.05] mb-3">
              <span style={{ color: YELLOW }}>Fast Track</span>
              <br />
              <span className="text-white">Degree Programs</span>
            </h1>
            <p className="text-white/85 text-sm leading-relaxed max-w-md">
              A great opportunity for degree-discontinued candidates to complete their
              graduation or post-graduation in less time, with full recognition.
            </p>
          </div>
        </div>

        <div className="px-5 pb-10">

          {/* FAQs */}
          <div className="mt-2 mb-8">
            <div className="inline-block rounded-r-full pl-4 pr-8 py-2.5 mb-5 -ml-5" style={{ backgroundColor: BLUE }}>
              <h2 className="text-white font-bold text-lg tracking-wide">FAQs</h2>
            </div>
            <div className="space-y-3">
              {faqs.map(({ icon: Icon, q, a }) => (
                <div
                  key={q}
                  className="rounded-2xl p-4"
                  style={{ border: '1.5px solid rgba(255,255,255,0.12)', backgroundColor: 'rgba(255,255,255,0.05)' }}
                >
                  <div className="flex items-start gap-3">
                    <div
                      className="w-8 h-8 rounded-full flex items-center justify-center shrink-0 mt-0.5"
                      style={{ backgroundColor: 'rgba(244,197,66,0.15)' }}
                    >
                      <Icon size={16} style={{ color: YELLOW }} />
                    </div>
                    <div>
                      <p className="text-white font-bold text-sm mb-1">{q}</p>
                      <p className="text-white/75 text-sm leading-relaxed">{a}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Degree codes */}
          <div className="mb-8">
            <div
              className="rounded-full px-6 py-4 text-center mb-5"
              style={{ backgroundColor: YELLOW }}
            >
              <h2 className="font-extrabold text-lg tracking-wide" style={{ color: NAVY }}>
                FAST TRACK DEGREES
              </h2>
            </div>
            <div className="grid grid-cols-4 gap-3">
              {degreeCodes.map(code => (
                <button
                  key={code}
                  onClick={() => openEnquiry(`Fast Track Degree — ${degreeNames[code]} (${code})`)}
                  className="rounded-xl py-4 px-1 text-center hover:scale-[1.04] transition"
                  style={{ backgroundColor: BLUE }}
                >
                  <span className="text-white text-sm font-extrabold">{code}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Note */}
          <div
            className="rounded-2xl px-5 py-4 text-center mb-8"
            style={{ border: '1.5px solid rgba(255,255,255,0.15)', backgroundColor: 'rgba(255,255,255,0.04)' }}
          >
            <p className="text-white/80 text-xs leading-relaxed">
              Course duration, credit-transfer eligibility &amp; fees vary by university.
              Our team will guide you through the exact requirements for your case.
            </p>
          </div>

          {/* Enquiry button */}
          <button
            onClick={() => openEnquiry('Fast Track Degree — General Enquiry')}
            className="w-full py-4 rounded-xl font-bold text-base text-white transition hover:opacity-90"
            style={{ backgroundColor: RED }}
          >
            Enquire Now!
          </button>
        </div>
      </div>

      <PopupForm
        open={panel.open}
        onClose={() => setPanel({ open: false, title: '' })}
        type="fast_track_degree"
        jobType={null}
        refId={null}
        refTitle={panel.title}
      />
    </div>
  )
}
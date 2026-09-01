import React, { useState } from 'react'
import {
  Wallet, Globe2, BookOpenCheck, Sparkles, Home as HomeIcon,
} from 'lucide-react'
import PopupForm from '../../components/PopupForm'

/* ---------------------------------- DATA ---------------------------------- */

const roles = [
  'Online Tutor', 'Trainer', 'Teacher', 'Coach',
  'Advisor', 'Mentor', 'Counsellor',
]

const canDeliver = [
  'Classes & trainings',
  'Coaching & mentoring',
  'Counselling & guidance',
  'Arts & professional courses',
  'Advice & anything you can deliver online',
]

const whoCanList = [
  'Anyone who wants to earn online',
  'Anyone interested in delivering online classes or trainings',
  'Anyone offering counselling, mentoring or guidance',
  'Anyone with something useful to teach others online',
]

/* ------------------------------- IMAGES ------------------------------- */
const HERO_IMG = 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1200&q=80'

/* -------------------------------- PALETTE -------------------------------- */
const NAVY = '#0b1f4d'
const BLUE = '#1e3a8a'
const YELLOW = '#f4c542'
const RED = '#dc2626'

/* ---------------------------------- PAGE ----------------------------------- */

export default function ExtraIncome() {
  const [panel, setPanel] = useState(false)

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
              <Wallet size={14} style={{ color: YELLOW }} />
              <span className="text-[11px] font-bold tracking-wide" style={{ color: YELLOW }}>
                EARN FROM HOME
              </span>
            </div>
            <h1 className="font-extrabold text-4xl leading-[1.05] mb-3">
              <span className="text-white">Need</span>{' '}
              <span style={{ color: YELLOW }}>Extra Income?</span>
            </h1>
            <p className="text-white/85 text-sm leading-relaxed max-w-md">
              Become an Online Tutor, Trainer, Teacher, Coach, Advisor, Mentor or
              Counsellor — and offer your skills to learners, prospects &amp;
              professionals, from anywhere.
            </p>
          </div>
        </div>

        <div className="px-5 pb-10">

          {/* Roles */}
          <div className="mt-2 mb-8">
            <div
              className="rounded-full px-6 py-4 text-center mb-5"
              style={{ backgroundColor: YELLOW }}
            >
              <h2 className="font-extrabold text-lg tracking-wide" style={{ color: NAVY }}>
                BECOME A LISTED EXPERT
              </h2>
            </div>
            <div className="grid grid-cols-3 gap-3">
              {roles.map(role => (
                <div
                  key={role}
                  className="rounded-full flex items-center justify-center text-center px-2 py-4"
                  style={{ backgroundColor: BLUE }}
                >
                  <span className="text-white text-[11px] font-bold leading-tight">{role}</span>
                </div>
              ))}
            </div>
          </div>

          {/* From your home / Reach global */}
          <div
            className="rounded-2xl px-6 py-6 text-center mb-8"
            style={{ border: '1.5px solid rgba(244,197,66,0.5)', backgroundColor: 'rgba(244,197,66,0.06)' }}
          >
            <div className="flex items-center justify-center gap-6 mb-2">
              <div className="flex flex-col items-center gap-1.5">
                <HomeIcon size={20} style={{ color: YELLOW }} />
                <span className="text-white text-xs font-bold">FROM YOUR HOME</span>
              </div>
              <div className="flex flex-col items-center gap-1.5">
                <Globe2 size={20} style={{ color: YELLOW }} />
                <span className="text-white text-xs font-bold">REACH GLOBAL</span>
              </div>
            </div>
            <p className="text-sm font-semibold mt-3" style={{ color: YELLOW }}>
              List your profile with us — earn extra income
            </p>
          </div>

          {/* What you can deliver */}
          <div className="mb-8">
            <div className="inline-block rounded-r-full pl-4 pr-8 py-2.5 mb-5 -ml-5" style={{ backgroundColor: BLUE }}>
              <h2 className="text-white font-bold text-lg tracking-wide">WHAT YOU CAN OFFER</h2>
            </div>
            <ul className="space-y-3">
              {canDeliver.map(item => (
                <li key={item} className="flex items-baseline gap-2">
                  <Sparkles size={12} className="shrink-0 translate-y-1" style={{ color: YELLOW }} />
                  <span className="text-white text-sm">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Who can be listed */}
          <div className="mb-8">
            <div className="flex items-center gap-2 mb-4">
              <BookOpenCheck size={18} style={{ color: YELLOW }} />
              <h2 className="text-white font-bold text-lg tracking-wide">WHO CAN BE LISTED WITH US?</h2>
            </div>
            <div
              className="rounded-2xl p-5"
              style={{ border: '1.5px solid rgba(255,255,255,0.12)', backgroundColor: 'rgba(255,255,255,0.05)' }}
            >
              <ul className="space-y-2.5">
                {whoCanList.map(item => (
                  <li key={item} className="flex items-baseline gap-2">
                    <span className="text-white text-sm">&middot;</span>
                    <span className="text-white/85 text-sm leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Enquiry button */}
          <button
            onClick={() => setPanel(false)}
            className="w-full py-4 rounded-xl font-bold text-base text-white transition hover:opacity-90"
            style={{ backgroundColor: RED }}
          >
            Want To Become One Of The Listed With Us
          </button>
        </div>
      </div>

      <PopupForm
        open={panel}
        onClose={() => setPanel(false)}
        type="extra_income"
        jobType={null}
        refId={null}
        refTitle="Need Extra Income — Listing Enquiry"
      />
    </div>
  )
}
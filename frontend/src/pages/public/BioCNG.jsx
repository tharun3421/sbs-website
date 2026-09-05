import React, { useState } from 'react'
import { Flame, TrendingUp, Banknote, ShieldCheck } from 'lucide-react'
import PopupForm from '../../components/PopupForm'

/* ---------------------------------- DATA ---------------------------------- */

const projectFacts = [
  'Total Project Cost 100 Cr.',
  'Already having LOI from PSUs.',
  'Revenue Estimated 50 Cr+ in one year',
]

const infoCards = [
  { icon: TrendingUp, title: 'Rapid Capital Recovery', subtitle: 'ROI 68%' },
  { icon: ShieldCheck, title: 'Govt. Schemes', subtitle: 'Subsidies' },
  { icon: Banknote, title: 'Tax Benefits', subtitle: '' },
]

/* ------------------------------- IMAGES ------------------------------- */
const HERO_IMG = 'https://images.unsplash.com/photo-1466611653911-95081537e5b7?auto=format&fit=crop&w=1200&q=80'

/* -------------------------------- PALETTE -------------------------------- */
const NAVY = '#0b1f4d'
const BLUE = '#1e3a8a'
const YELLOW = '#f4c542'
const RED = '#dc2626'

/* ---------------------------------- PAGE ----------------------------------- */

export default function BioCNG() {
  const [panel, setPanel] = useState(false)

  return (
    <div className="page-enter min-h-screen" style={{ backgroundColor: NAVY }}>
      <div className="max-w-xl mx-auto">

        {/* Hero */}
        <div className="relative overflow-hidden">
          <img src={HERO_IMG} alt="Bio-CNG plant" className="absolute inset-0 w-full h-full object-cover" />
          <div
            className="absolute inset-0"
            style={{ background: `linear-gradient(180deg, ${NAVY}99 0%, ${NAVY}cc 55%, ${NAVY} 100%)` }}
          />
          <div className="relative px-6 pt-14 pb-10">
            <div
              className="inline-flex items-center gap-2 rounded-full px-3 py-1 mb-4"
              style={{ backgroundColor: 'rgba(244,197,66,0.12)', border: `1px solid ${YELLOW}55` }}
            >
              <Flame size={14} style={{ color: YELLOW }} />
              <span className="text-[11px] font-bold tracking-wide" style={{ color: YELLOW }}>
                FUELLING THE FUTURE
              </span>
            </div>
            <h1 className="font-extrabold text-3xl sm:text-4xl leading-[1.1] mb-3">
              <span className="text-white block">Bio waste To</span>
              <span style={{ color: YELLOW }}>CNG / CBG</span>
            </h1>
            <p className="text-white/85 text-sm leading-relaxed max-w-md">
              Become one of the investors for this high-profitable Bio-CNG Plant —
              turning agro waste into clean energy.
            </p>
          </div>
        </div>

        <div className="px-5 pb-10">

          {/* Plant tag */}
          <div className="rounded-2xl px-6 py-4 text-center mt-2 mb-3" style={{ backgroundColor: YELLOW }}>
            <p className="font-extrabold text-lg" style={{ color: NAVY }}>Bio-CNG Plant</p>
            <p className="text-xs font-semibold" style={{ color: NAVY }}>High Profitable Segment</p>
          </div>

          {/* Project facts */}
          <div className="rounded-2xl p-5 mb-8" style={{ backgroundColor: BLUE }}>
            <ul className="space-y-2.5">
              {projectFacts.map(item => (
                <li key={item} className="flex items-baseline gap-2">
                  <span className="text-white text-sm">&middot;</span>
                  <span className="text-white text-sm font-semibold leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* More info cards */}
          <p className="text-white/60 text-xs font-semibold tracking-wide uppercase mb-3">More Info</p>
          <div className="space-y-3 mb-10">
            {infoCards.map(({ icon: Icon, title, subtitle }, i) => (
              <div
                key={i}
                className="rounded-2xl px-5 py-4 flex items-center gap-3"
                style={{ border: '1.5px solid rgba(244,197,66,0.5)', backgroundColor: 'rgba(244,197,66,0.06)' }}
              >
                <Icon size={18} style={{ color: YELLOW }} className="shrink-0" />
                <div>
                  <p className="text-white font-bold text-sm">{title}</p>
                  {subtitle && <p className="text-white/70 text-xs">{subtitle}</p>}
                </div>
              </div>
            ))}
          </div>

          {/* Enquiry button */}
          <button
            onClick={() => setPanel(false)}
            className="w-full py-4 rounded-xl font-bold text-base text-white transition hover:opacity-90"
            style={{ backgroundColor: RED }}
          >
            Enquiry Now!
          </button>
        </div>
      </div>

      <PopupForm
        open={panel}
        onClose={() => setPanel(false)}
        type="offer"
        refId={null}
        refTitle="Bio waste To CNG / CBG — Investor Enquiry"
      />
    </div>
  )
}
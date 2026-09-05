import React, { useState } from 'react'
import { IceCream2, Percent, Handshake, Users } from 'lucide-react'
import PopupForm from '../../components/PopupForm'

/* ---------------------------------- DATA ---------------------------------- */

const highlights = [
  { icon: Percent, text: 'Earn margins upto 40%' },
  { icon: Handshake, text: 'Company provides outlet set-up, branding & marketing support.' },
  { icon: Users, text: 'Good business opportunity for Rtd people, women entrepreneurs.' },
]

const investmentTiers = [
  { amount: '5 Lakhs', label: 'Mini' },
  { amount: '10 Lakhs', label: 'Medium' },
]

/* ------------------------------- IMAGES ------------------------------- */
const HERO_IMG = 'https://images.unsplash.com/photo-1497034825429-c343d7c6a68f?auto=format&fit=crop&w=1200&q=80'

/* -------------------------------- PALETTE -------------------------------- */
const NAVY = '#0b1f4d'
const BLUE = '#1e3a8a'
const YELLOW = '#f4c542'
const RED = '#dc2626'

/* ---------------------------------- PAGE ----------------------------------- */

export default function IceCreamParlour() {
  const [panel, setPanel] = useState(false)

  return (
    <div className="page-enter min-h-screen" style={{ backgroundColor: NAVY }}>
      <div className="max-w-xl mx-auto">

        {/* Hero */}
        <div className="relative overflow-hidden">
          <img src={HERO_IMG} alt="Ice cream parlour" className="absolute inset-0 w-full h-full object-cover" />
          <div
            className="absolute inset-0"
            style={{ background: `linear-gradient(180deg, ${NAVY}99 0%, ${NAVY}cc 55%, ${NAVY} 100%)` }}
          />
          <div className="relative px-6 pt-14 pb-10">
            <div
              className="inline-flex items-center gap-2 rounded-full px-3 py-1 mb-4"
              style={{ backgroundColor: 'rgba(244,197,66,0.12)', border: `1px solid ${YELLOW}55` }}
            >
              <IceCream2 size={14} style={{ color: YELLOW }} />
              <span className="text-[11px] font-bold tracking-wide" style={{ color: YELLOW }}>
                FRANCHISE OPPORTUNITY
              </span>
            </div>
            <h1 className="font-extrabold text-4xl leading-[1.05] mb-2">
              <span className="text-white">Ice Cream</span>{' '}
              <span style={{ color: YELLOW }}>Parlour</span>
            </h1>
            <p className="text-white/70 text-sm font-semibold tracking-wide mb-3">
              Franchise | Outlet | Bulk Orders
            </p>
            <p className="text-white/85 text-sm leading-relaxed max-w-md">
              Start an Ice Cream Parlour in your location with one of the leading
              Hyderabad based local brands.
            </p>
          </div>
        </div>

        <div className="px-5 pb-10">

          {/* Investment tiers */}
          <div className="grid grid-cols-2 gap-3 mt-2 mb-3">
            {investmentTiers.map(tier => (
              <div key={tier.label} className="rounded-2xl py-4 text-center" style={{ backgroundColor: YELLOW }}>
                <p className="font-extrabold text-xl" style={{ color: NAVY }}>{tier.amount}</p>
                <p className="text-xs font-semibold" style={{ color: NAVY }}>{tier.label}</p>
              </div>
            ))}
          </div>

          {/* Banner */}
          <div className="rounded-2xl py-3 text-center mb-8" style={{ backgroundColor: BLUE }}>
            <p className="text-white font-bold text-sm tracking-wide">LOW INVESTMENT — HIGH RETURNS</p>
          </div>

          {/* Highlights */}
          <ul className="space-y-4 mb-10">
            {highlights.map(({ icon: Icon, text }, i) => (
              <li key={i} className="flex items-start gap-3">
                <span
                  className="w-8 h-8 rounded-full flex items-center justify-center shrink-0"
                  style={{ backgroundColor: 'rgba(244,197,66,0.12)', border: `1px solid ${YELLOW}55` }}
                >
                  <Icon size={15} style={{ color: YELLOW }} />
                </span>
                <span className="text-white/90 text-sm leading-relaxed pt-1">{text}</span>
              </li>
            ))}
          </ul>

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
        refTitle="Ice Cream Parlour — Franchise Enquiry"
      />
    </div>
  )
}
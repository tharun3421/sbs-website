import React, { useState } from 'react'
import { Ship, Globe2, Building2 } from 'lucide-react'
import PopupForm from '../../components/PopupForm'

/* ---------------------------------- DATA ---------------------------------- */

const highDemandProducts = [
  'Rice', 'Cotton', 'Ground Nuts', 'Cashew',
  'Pulses', 'Spices', 'Tobacco', 'Banana',
]

const exportCountries = ['Kenya', 'UAE', 'USA', 'Middle East']

const targetMarket = [
  'International Buyers',
  'Importers & Distributors',
  'Retail Chains',
  'Processing Units',
]

/* ------------------------------- IMAGES ------------------------------- */
const HERO_IMG = 'https://images.unsplash.com/photo-1553413077-190dd305871c?auto=format&fit=crop&w=1200&q=80'

/* -------------------------------- PALETTE -------------------------------- */
const NAVY = '#0b1f4d'
const BLUE = '#1e3a8a'
const YELLOW = '#f4c542'
const RED = '#dc2626'

/* ---------------------------------- PAGE ----------------------------------- */

export default function ImportsExports() {
  const [panel, setPanel] = useState(false)

  return (
    <div className="page-enter min-h-screen" style={{ backgroundColor: NAVY }}>
      <div className="max-w-xl mx-auto">

        {/* Hero */}
        <div className="relative overflow-hidden">
          <img src={HERO_IMG} alt="Imports and exports warehouse" className="absolute inset-0 w-full h-full object-cover" />
          <div
            className="absolute inset-0"
            style={{ background: `linear-gradient(180deg, ${NAVY}99 0%, ${NAVY}cc 55%, ${NAVY} 100%)` }}
          />
          <div className="relative px-6 pt-14 pb-10">
            <div
              className="inline-flex items-center gap-2 rounded-full px-3 py-1 mb-4"
              style={{ backgroundColor: 'rgba(244,197,66,0.12)', border: `1px solid ${YELLOW}55` }}
            >
              <Ship size={14} style={{ color: YELLOW }} />
              <span className="text-[11px] font-bold tracking-wide" style={{ color: YELLOW }}>
                READY INTERNATIONAL ORDERS
              </span>
            </div>
            <h1 className="font-extrabold text-3xl sm:text-4xl leading-[1.05] mb-2">
              <span className="text-white">Imports &amp;</span>{' '}
              <span style={{ color: YELLOW }}>Exports Business</span>
            </h1>
            <p className="text-white/85 text-sm leading-relaxed max-w-md">
              Investment Opportunity / Partner / Finance — join a business with
              ready international orders already in hand.
            </p>
          </div>
        </div>

        <div className="px-5 pb-10">

          {/* High demand products */}
          <div className="mt-2 mb-3">
            <div className="rounded-full px-6 py-3 text-center mb-4" style={{ backgroundColor: YELLOW }}>
              <h2 className="font-extrabold text-sm tracking-wide" style={{ color: NAVY }}>
                HIGH DEMAND PRODUCTS
              </h2>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
              {highDemandProducts.map(p => (
                <div
                  key={p}
                  className="rounded-xl text-center px-2 py-3"
                  style={{ border: '1.5px solid rgba(244,197,66,0.5)', backgroundColor: 'rgba(244,197,66,0.06)' }}
                >
                  <span className="text-sm font-semibold" style={{ color: YELLOW }}>{p}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Banner */}
          <div className="rounded-2xl py-3 text-center mb-8" style={{ backgroundColor: BLUE }}>
            <p className="text-white font-bold text-sm tracking-wide">DIRECT SOURCING · BULK EXPORT</p>
          </div>

          {/* Export countries */}
          <div className="mb-8">
            <div className="flex items-center gap-2 mb-3">
              <Globe2 size={18} style={{ color: YELLOW }} />
              <h2 className="text-white font-bold text-base tracking-wide">EXPORT COUNTRIES</h2>
            </div>
            <p className="text-white/85 text-sm leading-relaxed pl-7">
              {exportCountries.join(', ')}
            </p>
          </div>

          {/* Target market */}
          <div className="mb-8">
            <div className="flex items-center gap-2 mb-4">
              <Building2 size={18} style={{ color: YELLOW }} />
              <h2 className="text-white font-bold text-base tracking-wide">TARGET MARKET</h2>
            </div>
            <div
              className="rounded-2xl p-5"
              style={{ border: '1.5px solid rgba(255,255,255,0.12)', backgroundColor: 'rgba(255,255,255,0.05)' }}
            >
              <ul className="space-y-2.5">
                {targetMarket.map(item => (
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
            Enquiry Now!
          </button>
        </div>
      </div>

      <PopupForm
        open={panel}
        onClose={() => setPanel(false)}
        type="offer"
        refId={null}
        refTitle="Imports & Exports Business — Enquiry"
      />
    </div>
  )
}
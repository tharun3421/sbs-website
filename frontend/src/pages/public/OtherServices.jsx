import React, { useState } from 'react'
import PopupForm from '../../components/PopupForm'

const coreServices = [
  'DPR',
  'TRAININGS',
  'FUNDING',
  'BUSINESS DEVELOPMENT',
  'MEDIA & PR',
  'NETWORKING',
  'CRISIS MANAGEMENT',
]

const howWeHelp = [
  'Discuss Current Issue',
  'Explore & Dig Data',
  'Framework Formation',
  'Networking',
  'Strategic Alliances',
  'Marketing',
  'Feedback',
  'Meeting The Desired Results',
]

// Overhead desk / laptop / charts photo used behind the hero heading
const HERO_IMAGE =
  'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1200&q=80'

export default function OtherServices() {
  const [panel, setPanel] = useState(false)

  return (
    <div className="page-enter min-h-screen" style={{ backgroundColor: '#0b1f4d' }}>
      <div className="max-w-xl mx-auto">

        {/* Hero */}
        <div className="relative overflow-hidden">
          <img
            src={HERO_IMAGE}
            alt=""
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                'linear-gradient(180deg, rgba(11,31,77,0.55) 0%, rgba(11,31,77,0.75) 55%, #0b1f4d 100%)',
            }}
          />
          <div className="relative px-6 pt-14 pb-10">
            <h1 className="text-white font-bold text-3xl leading-tight mb-3">
              Organisations Need<br />Change &amp; Strategies Driven Growth&hellip;
            </h1>
            <p className="text-sm leading-relaxed" style={{ color: '#f4c542' }}>
              we offer wide range of services o business units, organisations
              &amp; individuals to make them successful in their chosen field.
            </p>
          </div>
        </div>

        <div className="px-5">

          {/* Seven Core Services badge */}
          <div className="mt-2 mb-6">
            <div
              className="rounded-full px-6 py-4 text-center"
              style={{ backgroundColor: '#f4c542' }}
            >
              <h2 className="font-extrabold text-lg tracking-wide" style={{ color: '#0b1f4d' }}>
                SEVEN CORE SERVICES
              </h2>
            </div>
          </div>

          {/* Service pills */}
          <div className="grid grid-cols-3 gap-3 mb-6">
            {coreServices.slice(0, 6).map(label => (
              <div
                key={label}
                className="rounded-full flex items-center justify-center text-center px-2 py-4"
                style={{ backgroundColor: '#1e3a8a' }}
              >
                <span className="text-white text-[11px] font-bold leading-tight">{label}</span>
              </div>
            ))}
          </div>
          <div className="flex justify-center mb-8">
            <div
              className="rounded-full flex items-center justify-center text-center px-8 py-4"
              style={{ backgroundColor: '#1e3a8a', width: 'calc((100% - 1.5rem) / 3)' }}
            >
              <span className="text-white text-[11px] font-bold leading-tight">
                {coreServices[6]}
              </span>
            </div>
          </div>

          {/* UAE - PE MODE */}
          <div
            className="rounded-2xl px-6 py-6 text-center mb-8"
            style={{ border: '1.5px solid rgba(244,197,66,0.5)', backgroundColor: 'rgba(244,197,66,0.06)' }}
          >
            <p className="font-bold text-base mb-2 tracking-wide" style={{ color: '#f4c542' }}>
              WE FOLLOW UAE - PE MODE
            </p>
            <p className="text-white text-sm leading-relaxed">
              Understand - Analyse - Explore<br />Plan &amp; Execute
            </p>
          </div>

          {/* How We Help */}
          <div className="mb-6">
            <div
              className="inline-block rounded-r-full pl-4 pr-8 py-2.5 mb-5 -ml-5"
              style={{ backgroundColor: '#2563eb' }}
            >
              <h2 className="text-white font-bold text-lg tracking-wide">HOW WE HELP</h2>
            </div>
            <ol className="space-y-3">
              {howWeHelp.map((item, i) => (
                <li key={item} className="flex items-baseline gap-2">
                  <span className="text-white text-sm font-semibold">{i + 1}.</span>
                  <span className="text-white text-sm">{item}</span>
                </li>
              ))}
            </ol>
          </div>

          {/* Enquiry button */}
          <button
            onClick={() => setPanel(false)}
            className="w-full py-4 rounded-xl font-bold text-base text-white mb-10 transition hover:opacity-90"
            style={{ backgroundColor: '#dc2626' }}
          >
            Enquiry Now!
          </button>
        </div>
      </div>

      <PopupForm
        open={panel}
        onClose={() => setPanel(false)}
        type="other_service"
        jobType={null}
        refId={null}
        refTitle="Other Services"
      />
    </div>
  )
}
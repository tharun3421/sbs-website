import React, { useState } from 'react'
import PopupForm from './PopupForm'

export default function HotelManagement({ country, icon: Icon, accent, highlights, refTitle }) {
  const [panel, setPanel] = useState(false)

  return (
    <div className="page-enter bg-theme-primary min-h-screen">
      <div className="max-w-xl mx-auto px-4 py-8">

        {/* Heading */}
        <div className="flex items-center gap-4 mb-6">
          <div className="w-11 h-11 shrink-0 rounded-xl flex items-center justify-center"
            style={{ background: `${accent}14` }}>
            <Icon size={22} strokeWidth={1.5} style={{ color: accent }} />
          </div>
          <div>
            <h1 className="text-theme-primary font-semibold text-xl">Hotel Management</h1>
            <p className="text-theme-secondary text-sm">{country}</p>
          </div>
        </div>

        {/* Highlights */}
        <div className="bg-theme-card border border-theme rounded-2xl px-6 py-5 mb-5">
          <ul className="space-y-3">
            {highlights.map((point, i) => (
              <li key={i} className="flex items-start gap-3 text-theme-primary text-sm">
                <span className="w-1.5 h-1.5 rounded-full shrink-0 mt-1.5" style={{ background: accent }} />
                {point}
              </li>
            ))}
          </ul>
        </div>

        {/* Enquire button */}
        <button
          onClick={() => setPanel(true)}
          className="w-full py-3.5 rounded-xl font-bold text-sm transition"
          style={{ background: accent, color: '#0A0A0A' }}
        >
          Enquire Now
        </button>
      </div>

      <PopupForm
        open={panel}
        onClose={() => setPanel(false)}
        type="other_service"
        jobType={null}
        refId={null}
        refTitle={refTitle}
      />
    </div>
  )
}
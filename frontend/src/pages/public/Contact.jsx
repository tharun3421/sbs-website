import React, { useState, useEffect } from 'react'
import { Phone, MapPin } from 'lucide-react'
import api from '../../api'

const STATE_COLORS = ['#4488FF', '#FF4444', '#44DD88', '#FFD700', '#FF88AA', '#AA88FF']

export default function Contact() {
  const [contacts, setContacts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    api.get('/contacts')
      .then(r => setContacts(r.data))
      .catch(() => setContacts([]))
      .finally(() => setLoading(false))
  }, [])

  return (
    <div
      className="page-enter bg-theme-primary overflow-y-hidden"
      style={{ height: 'calc(100vh - 64px - 40px)' }}
    >
      <div className="max-w-4xl mx-auto px-4 py-8 h-full overflow-y-auto scrollbar-hide">

        {/* Page heading */}
        <div className="flex items-center gap-4 mb-8">
          <div
            className="w-11 h-11 shrink-0 rounded-xl flex items-center justify-center"
            style={{ background: 'rgba(255,68,68,0.08)' }}
          >
            <Phone size={22} strokeWidth={1.5} style={{ color: '#FF4444' }} />
          </div>
          <h1 className="text-theme-primary font-semibold text-xl leading-tight">
            Contact Us
          </h1>
        </div>

        {loading ? (
          <div className="space-y-4">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="bg-theme-card border border-theme rounded-2xl h-48 animate-pulse" />
            ))}
          </div>
        ) : (
          <div className="space-y-6">
            {contacts.map((stateCard, si) => {
              const color = STATE_COLORS[si % STATE_COLORS.length]
              return (
                <div
                  key={stateCard._id}
                  className="bg-theme-card border border-theme rounded-2xl overflow-hidden"
                  style={{ borderTop: `3px solid ${color}` }}
                >
                  {/* State heading */}
                  <div
                    className="flex items-center gap-3 px-5 py-4"
                    style={{ background: `${color}10` }}
                  >
                    <div
                      className="w-8 h-8 rounded-lg flex items-center justify-center"
                      style={{ background: `${color}20` }}
                    >
                      <MapPin size={16} style={{ color }} />
                    </div>
                    <h2 className="text-theme-primary font-bold text-lg tracking-wide">
                      {stateCard.state}
                    </h2>
                  </div>

                  {/* Districts */}
                  <div className="divide-y divide-theme">
                    {stateCard.districts.map((d, di) => (
                      <div key={di} className="px-5 py-4">
                        {/* District name */}
                        <p
                          className="text-xs font-semibold uppercase tracking-widest mb-3"
                          style={{ color }}
                        >
                          {d.district}
                        </p>

                        {/* Persons */}
                        <div className="space-y-2">
                          {d.persons.map((p, pi) => (
                            <div key={pi} className="flex items-center justify-between gap-4">
                              <span className="text-sm text-theme-primary font-medium">
                                {p.name}
                              </span>
                              <a
                                href={`tel:${p.phone}`}
                                className="flex items-center gap-1.5 text-sm font-mono transition-opacity hover:opacity-70"
                                style={{ color }}
                              >
                                <Phone size={12} strokeWidth={2} />
                                {p.phone}
                              </a>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}
import React, { useEffect, useState } from 'react'
import { Clock, BadgeCheck, Wallet, ChevronDown, ChevronUp, GraduationCap, Briefcase, ListChecks } from 'lucide-react'
import api from '../api'
import PopupForm from './PopupForm'

export default function HotelManagement({ country, icon: Icon, accent }) {
  const [listings, setListings] = useState([])
  const [loading, setLoading]   = useState(true)
  const [expanded, setExpanded] = useState(null)
  const [selected, setSelected] = useState(null)

  useEffect(() => {
    setLoading(true)
    api.get('/hotel-management', { params: { country } })
      .then(r => setListings(r.data))
      .catch(() => setListings([]))
      .finally(() => setLoading(false))
  }, [country])

  const toggleExpand = (id) => setExpanded(prev => (prev === id ? null : id))

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

        {/* Listings */}
        {loading ? (
          <div className="space-y-4">
            {[...Array(2)].map((_, i) => (
              <div key={i} className="bg-theme-card border border-theme rounded-2xl p-6 h-40 animate-pulse" />
            ))}
          </div>
        ) : listings.length === 0 ? (
          <div className="bg-theme-card border border-theme rounded-2xl p-10 text-center text-theme-muted text-sm">
            No programs available in {country} at the moment. Check back soon!
          </div>
        ) : (
          <div className="space-y-4">
            {listings.map(item => {
              const isOpen = expanded === item._id
              return (
                <div key={item._id} className="bg-theme-card border border-theme rounded-2xl p-6 relative overflow-hidden">
                  <div className="absolute top-0 left-0 right-0 h-0.5" style={{ background: accent }} />

                  {/* Title + subtitle */}
                  <h2 className="text-theme-primary font-bold text-lg leading-snug mb-1">{item.title}</h2>
                  {item.subtitle && (
                    <span className="inline-block text-xs font-bold px-2.5 py-1 rounded-full mb-3"
                      style={{ background: `${accent}1F`, color: accent }}>
                      {item.subtitle}
                    </span>
                  )}

                  {/* Key info badges */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {item.duration && (
                      <span className="flex items-center gap-1.5 text-xs font-medium text-theme-secondary bg-theme-tertiary px-3 py-1.5 rounded-lg">
                        <Clock size={13} /> {item.duration}
                      </span>
                    )}
                    {item.fee && (
                      <span className="flex items-center gap-1.5 text-xs font-medium text-theme-secondary bg-theme-tertiary px-3 py-1.5 rounded-lg">
                        <Wallet size={13} /> {item.fee}
                      </span>
                    )}
                    {item.certifiedBy && (
                      <span className="flex items-center gap-1.5 text-xs font-medium text-theme-secondary bg-theme-tertiary px-3 py-1.5 rounded-lg">
                        <BadgeCheck size={13} /> {item.certifiedBy}
                      </span>
                    )}
                  </div>

                  {item.internship && (
                    <p className="text-theme-secondary text-sm leading-relaxed mb-4">{item.internship}</p>
                  )}

                  {/* Expandable details */}
                  {isOpen && (
                    <div className="space-y-4 mb-4 pt-1">
                      {item.eligibility?.length > 0 && (
                        <div>
                          <p className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wide text-theme-muted mb-2">
                            <ListChecks size={13} /> Who Can Apply
                          </p>
                          <ul className="space-y-1.5">
                            {item.eligibility.map((e, i) => (
                              <li key={i} className="flex items-start gap-2 text-theme-secondary text-sm">
                                <span className="w-1.5 h-1.5 rounded-full shrink-0 mt-1.5" style={{ background: accent }} />
                                {e}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                      {item.curriculum?.length > 0 && (
                        <div>
                          <p className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wide text-theme-muted mb-2">
                            <GraduationCap size={13} /> What You'll Learn
                          </p>
                          <ul className="space-y-1.5">
                            {item.curriculum.map((e, i) => (
                              <li key={i} className="flex items-start gap-2 text-theme-secondary text-sm">
                                <span className="w-1.5 h-1.5 rounded-full shrink-0 mt-1.5" style={{ background: accent }} />
                                {e}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                      {item.jobRoles?.length > 0 && (
                        <div>
                          <p className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wide text-theme-muted mb-2">
                            <Briefcase size={13} /> Job Opportunities
                          </p>
                          <ul className="space-y-1.5">
                            {item.jobRoles.map((e, i) => (
                              <li key={i} className="flex items-start gap-2 text-theme-secondary text-sm">
                                <span className="w-1.5 h-1.5 rounded-full shrink-0 mt-1.5" style={{ background: accent }} />
                                {e}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                      {item.highlights?.length > 0 && (
                        <div>
                          <p className="text-xs font-bold uppercase tracking-wide text-theme-muted mb-2">Why Choose This Program</p>
                          <ul className="space-y-1.5">
                            {item.highlights.map((e, i) => (
                              <li key={i} className="flex items-start gap-2 text-theme-secondary text-sm">
                                <span className="w-1.5 h-1.5 rounded-full shrink-0 mt-1.5" style={{ background: accent }} />
                                {e}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Actions */}
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => toggleExpand(item._id)}
                      className="flex items-center gap-1 text-xs font-semibold text-theme-secondary hover:text-theme-primary transition"
                    >
                      {isOpen ? <>Less Details <ChevronUp size={14} /></> : <>More Details <ChevronDown size={14} /></>}
                    </button>
                    <button
                      onClick={() => setSelected(item)}
                      className="ml-auto px-6 py-2.5 rounded-xl font-bold text-sm transition"
                      style={{ background: accent, color: '#0A0A0A' }}
                    >
                      Apply Now
                    </button>
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </div>

      <PopupForm
        open={!!selected}
        onClose={() => setSelected(null)}
        type="hotel_management"
        jobType={null}
        refId={selected?._id}
        refTitle={selected ? `Hotel Management (${country}) – ${selected.title}` : ''}
      />
    </div>
  )
}
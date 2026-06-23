import React, { useState, useEffect } from 'react'
import { Phone, Mail, MapPin, ArrowLeft } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import api from '../../api'

const COLORS = ['#FFD700','#4488FF','#FF4444','#44DD88']

export default function Contact() {
  const navigate = useNavigate()
  const [contacts, setContacts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    api.get('/contacts').then(r => setContacts(r.data)).catch(() => setContacts([])).finally(() => setLoading(false))
  }, [])

  return (
    <div
      className="page-enter bg-theme-primary overflow-y-hidden"
      style={{ height: 'calc(100vh - 64px - 40px)' }}
    >
      <div className="max-w-4xl mx-auto px-4 py-8 h-full overflow-y-auto scrollbar-hide">
        {/* Heading — matches card style */}
        <div className="flex items-center gap-4 mb-8">
          <div
            className="w-11 h-11 shrink-0 rounded-xl flex items-center justify-center"
            style={{ background: 'rgba(255,68,68,0.08)' }}
          >
            <Phone size={22} strokeWidth={1.5} style={{ color: '#FF4444' }} />
          </div>
          <div className="flex flex-col">
            <h1 className="text-theme-primary font-semibold text-xl leading-tight">
              Contact Us
            </h1>
          </div>
        </div>

        {loading ? (
          <div className="space-y-4">
            {[...Array(3)].map((_,i) => <div key={i} className="bg-theme-card border border-theme rounded-2xl h-40 animate-pulse" />)}
          </div>
        ) : (
          <div className="space-y-5">
            {contacts.map((c, i) => (
              <div key={c._id} className="bg-theme-card border border-theme rounded-2xl p-6"
                style={{ borderLeft: `3px solid ${COLORS[i % COLORS.length]}` }}>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: `${COLORS[i%COLORS.length]}15` }}>
                    <MapPin size={16} style={{ color: COLORS[i%COLORS.length] }} />
                  </div>
                  <h3 className="text-theme-primary font-bold text-lg">{c.region}</h3>
                </div>
                <div className="space-y-2.5 pl-2">
                  {c.address && (
                    <div className="flex items-start gap-3 text-sm text-theme-secondary">
                      <MapPin size={14} className="text-theme-muted mt-0.5 flex-shrink-0" />
                      <span>{c.address}</span>
                    </div>
                  )}
                  {c.phone?.map((p,j) => (
                    <div key={j} className="flex items-center gap-3">
                      <Phone size={14} className="text-theme-muted flex-shrink-0" />
                      <a href={`tel:${p}`} className="text-sm hover:text-[#FFD700] transition" style={{ color: COLORS[i%COLORS.length] }}>{p}</a>
                    </div>
                  ))}
                  {c.email && (
                    <div className="flex items-center gap-3">
                      <Mail size={14} className="text-theme-muted flex-shrink-0" />
                      <a href={`mailto:${c.email}`} className="text-sm text-theme-secondary hover:text-[#FFD700] transition">{c.email}</a>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  )
}
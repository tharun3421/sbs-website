import React, { useState, useEffect } from 'react'
import { Phone, Mail, MapPin, Building2, Clock } from 'lucide-react'
import api from '../../api'

const COLORS = ['#FFD700','#4488FF','#FF4444','#44DD88']

export default function Contact() {
  const [contacts, setContacts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    api.get('/contacts').then(r => setContacts(r.data)).catch(() => setContacts([])).finally(() => setLoading(false))
  }, [])

  return (
    <div className="page-enter bg-theme-primary min-h-screen">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="mb-10">
          <p className="text-[#FFD700] text-xs font-semibold uppercase tracking-widest mb-2">Get In Touch</p>
          <h1 className="text-3xl font-black text-theme-primary mb-1">Contact Us</h1>
          <p className="text-theme-secondary text-sm">Reach our regional offices · We respond within 24 hours</p>
        </div>

        <div className="bg-[#FFD700]/10 border border-[#FFD700]/20 rounded-2xl p-6 mb-8 flex flex-col sm:flex-row items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-[#FFD700] flex items-center justify-center flex-shrink-0">
            <Building2 size={26} className="text-[#0A0A0A]" />
          </div>
          <div>
            <h2 className="text-theme-primary font-bold text-lg">SBS — Sai Business Solutions</h2>
            <p className="text-theme-secondary text-sm mt-1">Operating across Andhra Pradesh, Telangana, and Odisha since 2010.</p>
          </div>
        </div>

        {loading ? (
          <div className="space-y-4">{[...Array(3)].map((_,i) => <div key={i} className="bg-theme-card border border-theme rounded-2xl h-40 animate-pulse" />)}</div>
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

        <div className="mt-8 bg-theme-card border border-theme rounded-2xl p-6">
          <h3 className="text-theme-primary font-bold mb-4 flex items-center gap-2">
            <Clock size={15} className="text-[#FFD700]" /> Office Hours
          </h3>
          <div className="grid sm:grid-cols-2 gap-3 text-sm">
            {[
              { day:'Monday – Friday', hours:'9:00 AM – 6:00 PM' },
              { day:'Saturday',        hours:'9:00 AM – 2:00 PM' },
              { day:'Sunday',          hours:'Closed' },
            ].map(({ day, hours }) => (
              <div key={day} className="flex justify-between text-theme-secondary">
                <span>{day}</span>
                <span className={hours === 'Closed' ? 'text-theme-muted' : 'text-theme-primary font-medium'}>{hours}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

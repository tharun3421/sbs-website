import React, { useEffect, useState } from 'react'
import { LayoutGrid, ChevronRight, FileText, DollarSign, BookOpen, Youtube, TrendingUp, Shield, Users } from 'lucide-react'
import api from '../../api'
import PopupForm from '../../components/PopupForm'

const SERVICE_ICONS = {
  'DPR':                   FileText,
  'Funding':               DollarSign,
  'Trainings':             BookOpen,
  'YouTube / Movie / OTT': Youtube,
  'Business Development':  TrendingUp,
  'Crisis Management':     Shield,
  'PR & Networking':       Users,
}

export default function OtherServices() {
  const [services, setServices] = useState([])
  const [loading, setLoading]   = useState(true)
  const [panel, setPanel]       = useState({ open: false, title: '' })

  useEffect(() => {
    api.get('/other-services')
      .then(r => setServices(r.data))
      .catch(() => setServices([]))
      .finally(() => setLoading(false))
  }, [])

  return (
    <div className="page-enter bg-theme-primary min-h-screen">
      <div className="max-w-3xl mx-auto px-4 py-8">

        {/* Heading */}
        <div className="flex items-center gap-4 mb-8">
          <div
            className="w-11 h-11 shrink-0 rounded-xl flex items-center justify-center"
            style={{ background: 'rgba(170,136,255,0.08)' }}
          >
            <LayoutGrid size={22} strokeWidth={1.5} style={{ color: '#AA88FF' }} />
          </div>
          <h1 className="text-theme-primary font-semibold text-xl leading-tight">Other Services</h1>
        </div>

        {/* List */}
        {loading ? (
          <div className="space-y-3">
            {[...Array(7)].map((_, i) => (
              <div key={i} className="bg-theme-card border border-theme rounded-2xl h-16 animate-pulse" />
            ))}
          </div>
        ) : services.length === 0 ? (
          <div className="text-center py-20">
            <LayoutGrid size={40} className="text-theme-muted mx-auto mb-4" />
            <p className="text-theme-secondary">No services available.</p>
          </div>
        ) : (
          <>
            <div className="bg-theme-card border border-theme rounded-2xl overflow-hidden">
              {services.map((service, i) => {
                const Icon = SERVICE_ICONS[service.name] || LayoutGrid
                return (
                  <div
                    key={service._id}
                    className={`flex items-center gap-4 px-5 py-4 transition-all hover:bg-theme-tertiary
                      ${i !== services.length - 1 ? 'border-b border-theme' : ''}`}
                  >
                    {/* Index */}
                    <span className="text-theme-muted text-xs font-bold w-5 shrink-0 text-right">
                      {String(i + 1).padStart(2, '0')}
                    </span>

                    {/* Icon */}
                    <div
                      className="w-8 h-8 shrink-0 rounded-lg flex items-center justify-center"
                      style={{ background: 'rgba(170,136,255,0.10)' }}
                    >
                      <Icon size={15} strokeWidth={1.8} style={{ color: '#AA88FF' }} />
                    </div>

                    {/* Name */}
                    <h3 className="text-theme-primary font-medium text-sm flex-1 leading-snug">
                      {service.name}
                    </h3>
                  </div>
                )
              })}
            </div>

            {/* Single Enquire Button */}
            <button
              onClick={() => setPanel({ open: true, title: 'Other Services' })}
              className="mt-6 w-full flex items-center justify-center gap-2 py-3.5 rounded-2xl font-bold text-sm transition"
              style={{ background: '#AA88FF', color: '#0A0A0A' }}
              onMouseEnter={e => e.currentTarget.style.background = '#9966EE'}
              onMouseLeave={e => e.currentTarget.style.background = '#AA88FF'}
            >
              Enquire Now
              <ChevronRight size={16} />
            </button>
          </>
        )}
      </div>

      <PopupForm
        open={panel.open}
        onClose={() => setPanel({ open: false, title: '' })}
        type="other_service"
        jobType={null}
        refId={null}
        refTitle={panel.title}
      />
    </div>
  )
}
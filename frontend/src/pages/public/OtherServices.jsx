import React, { useEffect, useState } from 'react'
import { LayoutGrid } from 'lucide-react'
import api from '../../api'
import PopupForm from '../../components/PopupForm'

export default function OtherServices() {
  const [services, setServices] = useState([])
  const [loading, setLoading]   = useState(true)
  const [panel, setPanel]       = useState(false)

  useEffect(() => {
    api.get('/other-services')
      .then(r => setServices(r.data))
      .catch(() => setServices([]))
      .finally(() => setLoading(false))
  }, [])

  return (
    <div className="page-enter bg-theme-primary min-h-screen">
      <div className="max-w-xl mx-auto px-4 py-8">

        {/* Heading */}
        <div className="flex items-center gap-4 mb-6">
          <div className="w-11 h-11 shrink-0 rounded-xl flex items-center justify-center"
            style={{ background: 'rgba(170,136,255,0.08)' }}>
            <LayoutGrid size={22} strokeWidth={1.5} style={{ color: '#AA88FF' }} />
          </div>
          <h1 className="text-theme-primary font-semibold text-xl">Other Services</h1>
        </div>

        {/* List */}
        <div className="bg-theme-card border border-theme rounded-2xl px-6 py-5 mb-5">
          {loading ? (
            <div className="space-y-3">
              {[...Array(7)].map((_, i) => (
                <div key={i} className="h-4 bg-theme-tertiary rounded animate-pulse" />
              ))}
            </div>
          ) : (
            <ul className="space-y-3">
              {services.map(service => (
                <li key={service._id} className="flex items-center gap-3 text-theme-primary text-sm">
                  <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ background: '#AA88FF' }} />
                  {service.name}
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Single enquire button */}
        <button
          onClick={() => setPanel(true)}
          className="w-full py-3.5 rounded-xl font-bold text-sm transition"
          style={{ background: '#AA88FF', color: '#0A0A0A' }}
          onMouseEnter={e => e.currentTarget.style.background = '#9966EE'}
          onMouseLeave={e => e.currentTarget.style.background = '#AA88FF'}
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
        refTitle="Other Services"
      />
    </div>
  )
}
import React, { useEffect, useState } from 'react'
import { Landmark } from 'lucide-react'
import api from '../../api'
import PopupForm from '../../components/PopupForm'

export default function Loans() {
  const [loans, setLoans]     = useState([])
  const [loading, setLoading] = useState(true)
  const [panel, setPanel]     = useState(false)

  useEffect(() => {
    api.get('/loans')
      .then(r => setLoans(r.data))
      .catch(() => setLoans([]))
      .finally(() => setLoading(false))
  }, [])

  return (
    <div className="page-enter bg-theme-primary min-h-screen">
      <div className="max-w-xl mx-auto px-4 py-8">

        {/* Heading */}
        <div className="flex items-center gap-4 mb-6">
          <div className="w-11 h-11 shrink-0 rounded-xl flex items-center justify-center"
            style={{ background: 'rgba(68,221,136,0.08)' }}>
            <Landmark size={22} strokeWidth={1.5} style={{ color: '#44DD88' }} />
          </div>
          <h1 className="text-theme-primary font-semibold text-xl">Loans</h1>
        </div>

        {/* List */}
        <div className="bg-theme-card border border-theme rounded-2xl px-6 py-5 mb-5">
          {loading ? (
            <div className="space-y-3">
              {[...Array(9)].map((_, i) => (
                <div key={i} className="h-4 bg-theme-tertiary rounded animate-pulse" />
              ))}
            </div>
          ) : (
            <ul className="space-y-3">
              {loans.map(loan => (
                <li key={loan._id} className="flex items-center gap-3 text-theme-primary text-sm">
                  <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ background: '#44DD88' }} />
                  {loan.name}
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Single enquire button */}
        <button
          onClick={() => setPanel(true)}
          className="w-full py-3.5 rounded-xl font-bold text-sm transition"
          style={{ background: '#44DD88', color: '#0A0A0A' }}
          onMouseEnter={e => e.currentTarget.style.background = '#33BB77'}
          onMouseLeave={e => e.currentTarget.style.background = '#44DD88'}
        >
          Enquire Now
        </button>
      </div>

      <PopupForm
        open={panel}
        onClose={() => setPanel(false)}
        type="loan"
        jobType={null}
        refId={null}
        refTitle="Loans"
      />
    </div>
  )
}
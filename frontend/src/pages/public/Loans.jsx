import React, { useEffect, useState } from 'react'
import { Landmark, ChevronRight, User, Building2, GraduationCap, Briefcase, Banknote, ClipboardList, CreditCard, Home, Rocket } from 'lucide-react'
import api from '../../api'
import PopupForm from '../../components/PopupForm'
import LogoScroller from '../../components/LogoScroller'

const LOAN_ICONS = {
  'Personal Loan':   User,
  'Business Loan':   Building2,
  'Education Loan':  GraduationCap,
  'Private Finance': Briefcase,
  'BG':              Banknote,
  'LoC':             ClipboardList,
  'OD/CC':           CreditCard,
  'LAP':             Home,
  'VC':              Rocket,
}

export default function Loans() {
  const [loans, setLoans]     = useState([])
  const [loading, setLoading] = useState(true)
  const [panel, setPanel]     = useState({ open: false, title: '' })

  useEffect(() => {
    api.get('/loans')
      .then(r => setLoans(r.data))
      .catch(() => setLoans([]))
      .finally(() => setLoading(false))
  }, [])

  return (
    <div className="page-enter bg-theme-primary min-h-screen">
      <div className="max-w-3xl mx-auto px-4 py-8">

        {/* Heading */}
        <div className="flex items-center gap-4 mb-8">
          <div
            className="w-11 h-11 shrink-0 rounded-xl flex items-center justify-center"
            style={{ background: 'rgba(68,221,136,0.08)' }}
          >
            <Landmark size={22} strokeWidth={1.5} style={{ color: '#44DD88' }} />
          </div>
          <h1 className="text-theme-primary font-semibold text-xl leading-tight">Loans</h1>
        </div>

        {/* List */}
        {loading ? (
          <div className="space-y-3">
            {[...Array(9)].map((_, i) => (
              <div key={i} className="bg-theme-card border border-theme rounded-2xl h-16 animate-pulse" />
            ))}
          </div>
        ) : loans.length === 0 ? (
          <div className="text-center py-20">
            <Landmark size={40} className="text-theme-muted mx-auto mb-4" />
            <p className="text-theme-secondary">No loan categories available.</p>
          </div>
        ) : (
          <>
            <div className="bg-theme-card border border-theme rounded-2xl overflow-hidden">
              {loans.map((loan, i) => {
                const Icon = LOAN_ICONS[loan.name] || Landmark
                return (
                  <div
                    key={loan._id}
                    className={`flex items-center gap-4 px-5 py-4 transition-all hover:bg-theme-tertiary
                      ${i !== loans.length - 1 ? 'border-b border-theme' : ''}`}
                  >
                    {/* Index */}
                    <span className="text-theme-muted text-xs font-bold w-5 shrink-0 text-right">
                      {String(i + 1).padStart(2, '0')}
                    </span>

                    {/* Icon */}
                    <div
                      className="w-8 h-8 shrink-0 rounded-lg flex items-center justify-center"
                      style={{ background: 'rgba(68,221,136,0.10)' }}
                    >
                      <Icon size={15} strokeWidth={1.8} style={{ color: '#44DD88' }} />
                    </div>

                    {/* Name */}
                    <h3 className="text-theme-primary font-medium text-sm flex-1 leading-snug">
                      {loan.name}
                    </h3>
                  </div>
                )
              })}
            </div>

            {/* Single Enquire Button */}
            <button
              onClick={() => setPanel({ open: true, title: 'Loans' })}
              className="mt-6 w-full flex items-center justify-center gap-2 py-3.5 rounded-2xl font-bold text-sm transition"
              style={{ background: '#44DD88', color: '#0A0A0A' }}
              onMouseEnter={e => e.currentTarget.style.background = '#33BB77'}
              onMouseLeave={e => e.currentTarget.style.background = '#44DD88'}
            >
              Enquire Now
              <ChevronRight size={16} />
            </button>
          </>
        )}
      </div>

      <LogoScroller label="Lending Partners" accent="#44DD88" logoKey="jobLogos" />

      <PopupForm
        open={panel.open}
        onClose={() => setPanel({ open: false, title: '' })}
        type="loan"
        jobType={null}
        refId={null}
        refTitle={panel.title}
      />
    </div>
  )
}
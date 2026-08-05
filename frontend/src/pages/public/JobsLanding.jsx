import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Briefcase, GraduationCap, Calculator, ArrowLeft } from 'lucide-react'

const OPTIONS = [
  {
    to: '/jobs/free',
    label: 'Free Jobs',
    icon: Briefcase,
    accent: '#44DD88',
    accentBg: 'rgba(68,221,136,0.08)',
  },
  {
    to: '/jobs/paid',
    label: 'Jobs with Training',
    subtitle: 'Paid Programs',
    icon: GraduationCap,
    accent: '#FFD700',
    accentBg: 'rgba(255,215,0,0.08)',
  },
  {
    to: '/jobs/tally',
    label: 'Tally Jobs',
    subtitle: 'Accounts & Finance',
    icon: Calculator,
    accent: '#2DD4BF',
    accentBg: 'rgba(45,212,191,0.08)',
  },
]

export default function JobsLanding() {
  const navigate = useNavigate()

  return (
    <div
      className="page-enter bg-theme-primary flex items-center justify-center"
      style={{ height: 'calc(100vh - 64px - 40px)' }}
    >
      <section className="w-full max-w-3xl px-4">

        <div className="flex flex-col gap-4">
          {OPTIONS.map(({ to, label, subtitle, icon: Icon, accent, accentBg }) => (
            <Link
              key={to}
              to={to}
              className="card-hover group relative rounded-2xl border border-theme bg-theme-card px-5 py-4 flex flex-row items-center gap-4 overflow-hidden"
            >
              <div className="absolute top-0 left-0 right-0 h-0.5" style={{ background: accent }} />
              <div
                className="w-11 h-11 shrink-0 rounded-xl flex items-center justify-center"
                style={{ background: accentBg }}
              >
                <Icon size={22} strokeWidth={1.5} style={{ color: accent }} />
              </div>
              <div className="flex flex-col">
                <p className="text-theme-primary font-semibold text-base leading-tight">
                  {label}
                </p>
                {subtitle && (
                  <p className="text-theme-primary text-sm mt-0.5">{subtitle}</p>
                )}
              </div>
            </Link>
          ))}
        </div>

      </section>
    </div>
  )
}
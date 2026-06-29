import React from 'react'
import { Link } from 'react-router-dom'
import { Briefcase, GraduationCap, Tag, Landmark, LayoutGrid, Plane } from 'lucide-react'

const SERVICES = [
  { to: '/study-abroad', label: 'Study + Work Abroad', icon: Plane, accent: '#22C5FF', accentBg: 'rgba(34,197,255,0.08)' },
  { to: '/jobs',            label: 'Jobs',           icon: Briefcase,     accent: '#FF4444', accentBg: 'rgba(255,68,68,0.08)'   },
  { to: '/online-degrees',  label: 'Online Degrees', icon: GraduationCap, accent: '#4488FF', accentBg: 'rgba(68,136,255,0.08)'  },
  { to: '/business-offers', label: 'Business Offers',icon: Tag,           accent: '#FFD700', accentBg: 'rgba(255,215,0,0.08)'   },
  { to: '/loans',           label: 'Loans',          icon: Landmark,      accent: '#44DD88', accentBg: 'rgba(68,221,136,0.08)'  },
  { to: '/other-services',  label: 'Other Services', icon: LayoutGrid,    accent: '#AA88FF', accentBg: 'rgba(170,136,255,0.08)' },
]

export default function Home() {
  return (
    <div
      className="page-enter bg-theme-primary flex items-center justify-center"
      style={{ height: 'calc(100vh - 64px - 40px)' }}
    >
      <section className="w-full max-w-3xl px-4">
        <div className="grid sm:grid-cols-3 gap-4">
          {SERVICES.map(({ to, label, icon: Icon, accent, accentBg }) => (
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
              <p className="text-theme-primary font-semibold text-base leading-tight">
                {label}
              </p>
            </Link>
          ))}
        </div>
      </section>
    </div>
  )
}
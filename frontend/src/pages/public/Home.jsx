import React from 'react'
import { Link } from 'react-router-dom'
import { ChevronRight, Users, ShieldCheck } from 'lucide-react'

const CORE_SERVICES = [
  { to: '/study-abroad',   label: 'Study + Work Abroad' },
  { to: '/jobs/free',      label: 'Free Jobs' },
  { to: '/online-degrees', label: 'Online Degrees' },
  { to: '/business-offers', label: 'Business Offers' },
]

export default function Home() {
  return (
    <div className="page-enter bg-theme-primary min-h-full flex flex-col items-center px-4 py-10">
      <section className="w-full max-w-xl">

        {/* Top actions */}
        <div className="flex items-center justify-between mb-10">
          <button
            type="button"
            className="flex items-center gap-2 px-4 py-2 rounded-lg border border-theme text-theme-secondary text-sm font-medium hover:text-theme-primary hover:border-theme-gold transition-all"
          >
            <Users size={16} />
            Associate Resources
          </button>

          <Link
            to='/admin/login'
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-[#FFD700] text-[#0A0A0A] text-sm font-semibold hover:bg-[#FFE44D] transition-all"
          >
            <ShieldCheck size={16} />
            Admin Login
          </Link>
        </div>

        {/* Services list */}
        <h1 className="text-theme-primary text-lg font-semibold mb-4">Our Services</h1>

        <ul className="border-t border-theme">
          {CORE_SERVICES.map(({ to, label }) => (
            <li key={to} className="border-b border-theme">
              <Link
                to={to}
                className="flex items-center justify-between py-4 px-1 text-theme-primary text-base group"
              >
                <span className="flex items-center gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#FFD700] shrink-0" />
                  {label}
                </span>
                <ChevronRight size={16} className="text-theme-muted group-hover:text-[#FFD700] transition-colors" />
              </Link>
            </li>
          ))}
        </ul>

        {/* More -> separate page */}
        <Link
          to="/more-services"
          className="w-full flex items-center justify-center gap-1.5 mt-4 py-3 rounded-lg text-theme-secondary text-sm font-medium hover:text-[#FFD700] transition-colors"
        >
          More
          <ChevronRight size={15} />
        </Link>
      </section>
    </div>
  )
}
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { ChevronRight, Users, ShieldCheck, Search } from 'lucide-react'

const CORE_SERVICES = [
  { to: '/study-abroad',   label: 'Study + Work Abroad' },
  { to: '/jobs/free',      label: 'Free Jobs' },
  { to: '/online-degrees', label: 'Online Degrees' },
  { to: '/business-offers', label: 'Business Offers' },
]

export default function Home() {
  const [query, setQuery] = useState('')

  const filteredServices = CORE_SERVICES.filter(({ label }) =>
    label.toLowerCase().includes(query.trim().toLowerCase())
  )

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

        {/* Search */}
        <div className="relative mb-6">
          <Search
            size={16}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-theme-muted"
          />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search services..."
            className="w-full pl-9 pr-3 py-2.5 rounded-lg bg-transparent border border-theme text-theme-primary text-sm placeholder:text-theme-muted focus:outline-none focus:border-[#FFD700] transition-colors"
          />
        </div>

        {/* Services list - two columns, bulleted */}
        {filteredServices.length > 0 ? (
          <ul className="grid grid-cols-2 gap-x-6 gap-y-1">
            {filteredServices.map(({ to, label }) => (
              <li key={to}>
                <Link
                  to={to}
                  className="flex items-center gap-2 py-2 px-1 text-theme-primary text-sm group"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-[#FFD700] shrink-0" />
                  <span className="group-hover:text-[#FFD700] transition-colors">{label}</span>
                </Link>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-theme-muted text-sm text-center py-4">No services found.</p>
        )}

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
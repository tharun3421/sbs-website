import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { ChevronRight, Users, ShieldCheck, Search, UserPlus, LogIn } from 'lucide-react'
import { CORE_SERVICES, HOME_EXTRA_SERVICES } from '../../constants/coreServices'


const ALL_HOME_SERVICES = [...CORE_SERVICES, ...HOME_EXTRA_SERVICES]


export default function Home() {
  const [query, setQuery] = useState('')

  const filteredServices = ALL_HOME_SERVICES.filter(({ label }) =>
    label.toLowerCase().includes(query.trim().toLowerCase())
  )

  return (
    <div className="page-enter bg-theme-primary min-h-full flex flex-col items-center px-4 py-10">
      <section className="w-full max-w-xl">

        {/* Top actions */}
        <div className="flex items-center justify-between mb-10">
          <Link
            to="/associate-resources"
            className="flex items-center gap-2 px-4 py-2 rounded-lg border bg-[#FFD700] text-[#0A0A0A]  text-sm font-medium hover:text-theme-primary hover:border-theme-gold transition-all"
          >
            <Users size={16} />
            Associate Resources
          </Link>

          <Link
            to='/admin/login'
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-[#FFD700] text-[#0A0A0A] text-sm font-semibold hover:bg-[#FFE44D] transition-all"
          >
            <ShieldCheck size={16} />
            Admin Login
          </Link>
        </div>

        {/* Associate Portal */}
        <div className="bg-theme-card border border-theme rounded-2xl p-5 mb-6">
          <p className="text-[#FFD700]  font-bold text-sm mb-1">Associate Portal</p>
          <p className="text-theme-secondary text-xs mb-4">
            Register as associate to manage your own leads, track their progress, and grow your business with us.
          </p>
          <div className="flex flex-col sm:flex-row gap-2.5">
            <Link
              to="/associate/register"
              className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-[#FFD700] text-[#0A0A0A] text-sm font-semibold hover:bg-[#FFE44D] transition-all"
            >
              <UserPlus size={16} />
              Associate Registration
            </Link>
            <Link
              to="/associate/login"
              className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg border bg-[#FFD700] text-[#0A0A0A]  text-sm font-medium hover:text-theme-primary hover:border-theme-gold transition-all"
            >
              <LogIn size={16} />
              Associate Login
            </Link>
          </div>
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
              <li key={to} className="min-w-0">
                <Link
                  to={to}
                  className="whitespace-pre-line flex items-start gap-2 py-2 px-1 text-theme-primary text-sm group min-w-0"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-[#FFD700] shrink-0 mt-1.5" />
                  <span className="group-hover:text-[#FFD700] transition-colors break-words">{label}</span>
                </Link>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-theme-muted text-sm text-center py-4">No services found.</p>
        )}
      </section>
    </div>
  )
}
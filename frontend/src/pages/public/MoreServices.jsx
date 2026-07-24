import React from 'react'
import { Link } from 'react-router-dom'
import { ChevronRight, ChevronLeft } from 'lucide-react'

const MORE_SERVICES = [
  { to: '/loans',          label: 'Loans' },
  { to: '/other-services', label: 'Other Services' },
]

export default function MoreServices() {
  return (
    <div className="page-enter bg-theme-primary min-h-full flex flex-col items-center px-4 py-10">
      <section className="w-full max-w-xl">

        <Link
          to="/"
          className="flex items-center gap-1.5 text-theme-secondary text-sm font-medium mb-6 hover:text-[#FFD700] transition-colors w-fit"
        >
          <ChevronLeft size={16} />
          Back
        </Link>

        <h1 className="text-theme-primary text-lg font-semibold mb-4">More Services</h1>

        <ul className="border-t border-theme">
          {MORE_SERVICES.map(({ to, label }) => (
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
      </section>
    </div>
  )
}
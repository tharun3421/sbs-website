import React, { useState, useEffect, useRef, useLayoutEffect } from 'react'
import { Link } from 'react-router-dom'
import { ChevronRight, Users, ShieldCheck, Search, UserPlus, LogIn } from 'lucide-react'
import { CORE_SERVICES, HOME_EXTRA_SERVICES } from '../../constants/coreServices'


const ALL_HOME_SERVICES = [...CORE_SERVICES, ...HOME_EXTRA_SERVICES]

// How long the pointer rests on each service before moving to the next one.
const POINTER_INTERVAL_MS = 2200

export default function Home() {
  const [query, setQuery] = useState('')
  const [activeIndex, setActiveIndex] = useState(0)
  const [pointerPos, setPointerPos] = useState(null) // { top, left, height }
  const listRef = useRef(null)
  const itemRefs = useRef([])

  const filteredServices = ALL_HOME_SERVICES.filter(({ label }) =>
    label.toLowerCase().includes(query.trim().toLowerCase())
  )

  // Whenever the visible list changes (e.g. the visitor types a search
  // query), snap the pointer back to the first result so it never points
  // at a service that's no longer shown.
  useEffect(() => {
    setActiveIndex(0)
  }, [query])

  // Continuously cycle the pointer through the visible services.
  useEffect(() => {
    if (filteredServices.length < 2) return
    const id = setInterval(() => {
      setActiveIndex(i => (i + 1) % filteredServices.length)
    }, POINTER_INTERVAL_MS)
    return () => clearInterval(id)
  }, [filteredServices.length])

  // Measure the highlighted item's position so the pointer can smoothly
  // glide to it. Re-measures on resize too, since the grid can reflow.
  useLayoutEffect(() => {
    const measure = () => {
      const el = itemRefs.current[activeIndex]
      if (!el) { setPointerPos(null); return }
      setPointerPos({ top: el.offsetTop, left: el.offsetLeft, height: el.offsetHeight })
    }
    measure()
    window.addEventListener('resize', measure)
    return () => window.removeEventListener('resize', measure)
  }, [activeIndex, filteredServices.length])

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
            Register as associate to manage your leads, track their progress, and grow your business with us.
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
          <ul ref={listRef} className="relative grid grid-cols-2 gap-x-6 gap-y-1">
            {pointerPos && (
              <span
                aria-hidden="true"
                className="services-pointer absolute text-base leading-none select-none pointer-events-none transition-all duration-700 ease-in-out"
                style={{
                  top: pointerPos.top + pointerPos.height / 2 - 9,
                  left: Math.max(pointerPos.left - 20, 2),
                }}
              >
                👆
              </span>
            )}
            {filteredServices.map(({ to, label }, i) => (
              <li key={to} ref={el => (itemRefs.current[i] = el)} className="min-w-0">
                <Link
                  to={to}
                  className={`whitespace-pre-line flex items-start gap-2 py-2 px-1 rounded-lg text-sm group min-w-0 transition-colors duration-500 ${
                    i === activeIndex ? 'bg-[#FFD700]/10 text-[#FFD700]' : 'text-theme-primary'
                  }`}
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
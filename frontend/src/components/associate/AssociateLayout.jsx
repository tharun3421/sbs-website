import React, { useState } from 'react'
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom'
import { LayoutDashboard, Users2, KeyRound, LogOut, Menu, X, ChevronRight, Sun, Moon, ExternalLink } from 'lucide-react'
import { associateApi } from '../../api'

const NAV = [
  // { to: '/associate', label: 'Dashboard', icon: LayoutDashboard, exact: true },
  { to: '/associate/leads', label: 'My Leads', icon: Users2 },
  { to: '/associate/change-password', label: 'Change Password', icon: KeyRound },
]

function useTheme() {
  const [dark, setDark] = useState(() => !document.documentElement.classList.contains('light'))
  const toggle = () => {
    const next = !dark
    if (next) document.documentElement.classList.remove('light')
    else document.documentElement.classList.add('light')
    localStorage.setItem('sbs_theme', next ? 'dark' : 'light')
    setDark(next)
  }
  return [dark, toggle]
}

export default function AssociateLayout() {
  const location = useLocation()
  const navigate = useNavigate()
  const [mobileOpen, setMobileOpen] = useState(false)
  const [dark, toggleDark] = useTheme()

  let associate = null
  try { associate = JSON.parse(localStorage.getItem('sbs_associate') || 'null') } catch {}

  const isActive = (to, exact) => exact ? location.pathname === to : location.pathname.startsWith(to)

  const handleLogout = async () => {
    try { await associateApi.post('/associate/logout') } catch {}
    localStorage.removeItem('sbs_associate_token')
    localStorage.removeItem('sbs_associate')
    navigate('/associate/login')
  }

  const SidebarContent = ({ mobile = false }) => (
    <div className="flex flex-col h-full bg-theme-secondary border-r border-theme">
      <div className="p-5 border-b border-theme flex items-center justify-between">
        <Link to="/" onClick={() => mobile && setMobileOpen(false)} className="hover:opacity-80 transition">
          <div className="bg-[#FFD700] text-[#0A0A0A] font-black text-base px-3 py-1 rounded-lg inline-block">SBS</div>
          <p className="text-theme-muted text-xs mt-1">Associate Portal</p>
        </Link>
        {mobile && (
          <button onClick={() => setMobileOpen(false)} className="text-theme-muted hover:text-theme-primary p-1"><X size={18} /></button>
        )}
      </div>

      <nav className="flex-1 p-3 space-y-0.5 overflow-y-auto">
        {NAV.map(({ to, label, icon: Icon, exact }) => {
          const active = isActive(to, exact)
          return (
            <Link key={to} to={to}
              onClick={() => mobile && setMobileOpen(false)}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all group
                ${active ? 'bg-[#FFD700] text-[#0A0A0A]' : 'text-theme-secondary hover:bg-theme-tertiary hover:text-theme-primary'}`}>
              <Icon size={16} />
              <span className="flex-1">{label}</span>
              {active && <ChevronRight size={14} />}
            </Link>
          )
        })}
      </nav>

      <div className="p-3 border-t border-theme space-y-1">
        <Link to="/" onClick={() => mobile && setMobileOpen(false)}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-theme-secondary hover:bg-theme-tertiary hover:text-theme-primary transition">
          <ExternalLink size={15} /> View Site
        </Link>
        <button onClick={toggleDark}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-theme-secondary hover:bg-theme-tertiary hover:text-theme-primary transition">
          {dark ? <Sun size={15} className="text-[#FFD700]" /> : <Moon size={15} className="text-[#4488FF]" />}
          {dark ? 'Light Mode' : 'Dark Mode'}
        </button>
        <div className="px-3 py-2">
          <p className="text-theme-primary text-xs font-medium">{associate?.name || 'Associate'}</p>
          <p className="text-theme-muted text-xs">ID: {associate?.associateId || '—'}</p>
        </div>
        <button onClick={handleLogout}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-theme-secondary hover:bg-red-500/10 hover:text-red-400 transition">
          <LogOut size={16} /> Sign Out
        </button>
      </div>
    </div>
  )

  return (
    <div className="min-h-screen bg-theme-primary flex">
      <div className="hidden md:flex flex-col w-56 flex-shrink-0 sticky top-0 h-screen">
        <SidebarContent />
      </div>

      {mobileOpen && (
        <div className="fixed inset-0 z-50 flex md:hidden">
          <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={() => setMobileOpen(false)} />
          <div className="relative w-64 h-full"><SidebarContent mobile /></div>
        </div>
      )}

      <div className="flex-1 flex flex-col min-w-0">
        <div className="md:hidden flex items-center gap-3 p-4 border-b border-theme bg-theme-secondary">
          <button onClick={() => setMobileOpen(true)} className="text-theme-secondary hover:text-theme-primary p-1"><Menu size={20} /></button>
          <div className="ml-auto">
            <button onClick={toggleDark} className="text-theme-secondary hover:text-[#FFD700] p-1.5 rounded-lg hover:bg-theme-tertiary transition">
              {dark ? <Sun size={17} /> : <Moon size={17} />}
            </button>
          </div>
        </div>

        <main className="flex-1 overflow-auto p-4 md:p-6 bg-theme-primary">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
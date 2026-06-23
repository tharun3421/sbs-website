import React, { useState, useEffect } from 'react'
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom'
import { Menu, X, Phone, MapPin, Briefcase, GraduationCap, Tag, Home, Sun, Moon, ShieldCheck } from 'lucide-react'
import api from '../api'
import logo from '../assets/logo-sbs.jpeg'

const NAV_LINKS = [
  { to: '/',                label: 'Home',            icon: Home },
  { to: '/jobs',            label: 'Jobs',            icon: Briefcase },
  { to: '/online-degrees',  label: 'Online Degrees',  icon: GraduationCap },
  { to: '/business-offers', label: 'Business Offers', icon: Tag },
  { to: '/contact',         label: 'Contact Us',      icon: Phone },
]

function useTheme() {
  const [dark, setDark] = useState(() => {
    const saved = localStorage.getItem('sbs_theme')
    if (saved) return saved === 'dark'
    return true
  })

  useEffect(() => {
    if (dark) {
      document.documentElement.classList.remove('light')
    } else {
      document.documentElement.classList.add('light')
    }
    localStorage.setItem('sbs_theme', dark ? 'dark' : 'light')
  }, [dark])

  return [dark, setDark]
}

export default function PublicLayout() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [cities, setCities] = useState(['Vizag','Eluru','Khammam','Hyderabad','Vijayawada','Guntur','Warangal'])
  const [dark, setDark] = useTheme()
  const location = useLocation()
  const navigate = useNavigate()

  useEffect(() => {
    api.get('/settings').then(r => {
      if (r.data.cities) setCities(r.data.cities)
    }).catch(() => {})
  }, [])

  useEffect(() => { setMenuOpen(false) }, [location.pathname])

  const ticker = [...cities, ...cities]

  const navBg       = dark ? 'bg-[#0A0A0A]/95'  : 'bg-[#F8F7F2]/96'
  const navBorder   = dark ? 'border-[#FFD700]/20' : 'border-[#E6C200]/30'
  const logoText    = dark ? 'text-white'        : 'text-[#111]'
  const logoSub     = dark ? 'text-[#FFD700]'    : 'text-[#B8860B]'
  const linkActive  = 'bg-[#FFD700] text-[#0A0A0A]'
  const linkIdle    = dark
    ? 'text-gray-300 hover:text-[#FFD700] hover:bg-white/5'
    : 'text-gray-600 hover:text-[#B8860B] hover:bg-black/5'
  const hamburgerColor = dark ? 'text-[#FFD700]' : 'text-[#B8860B]'
  const hamburgerHover = dark ? 'hover:bg-white/10' : 'hover:bg-black/8'
  const sidebarBg   = dark ? 'bg-[#111]'         : 'bg-white'
  const sidebarBorder = dark ? 'border-[#FFD700]/20' : 'border-[#E6C200]/30'
  const sidebarLink = dark
    ? 'text-gray-300 hover:bg-white/10 hover:text-white'
    : 'text-gray-600 hover:bg-black/5 hover:text-[#111]'
  const mainBg      = dark ? 'bg-[#0A0A0A]'      : 'bg-[#F8F7F2]'
  const adminBtn    = dark ? 'text-gray-600 hover:text-gray-400' : 'text-gray-400 hover:text-gray-600'

  return (
    <div className={`min-h-screen flex flex-col transition-colors duration-300 ${mainBg}`}
      style={{ paddingTop: 0, paddingBottom: 0 }}>

      {/* ── NAVBAR ── */}
      <nav className={`fixed top-0 left-0 right-0 z-50 ${navBg} backdrop-blur border-b ${navBorder} transition-colors duration-300`}>
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between gap-3">

          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 flex-shrink-0">
            <div >
              <img className='w-22 h-full' src={logo} alt="" />
            </div>
            <div className="hidden sm:block">
              <p className={`font-semibold text-sm leading-none ${logoText}`}>Sai Business Services</p>
              <p className={`text-xs mt-0.5 ${logoSub}`}>We Find Your Way</p>
            </div>
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-1 flex-1 justify-center">
            {NAV_LINKS.map(({ to, label }) => (
              <Link key={to} to={to}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200
                  ${location.pathname === to ? linkActive : linkIdle}`}>
                {label}
              </Link>
            ))}
          </div>

          {/* Right side */}
          <div className="flex items-center gap-2 flex-shrink-0">
            <button
              onClick={() => navigate('/admin/login')}
              title="Admin Portal"
              className={`hidden md:flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold transition-all duration-200 ${
                dark
                  ? 'text-gray-400 hover:text-[#FFD700] hover:bg-white/5'
                  : 'text-gray-500 hover:text-[#B8860B] hover:bg-black/5'
              }`}
            >
              <ShieldCheck size={15} />
              <span className="hidden lg:inline">Admin</span>
            </button>

            <button
              onClick={() => setDark(d => !d)}
              title={dark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
              className={`p-2 rounded-lg transition-all duration-200 ${
                dark ? 'text-[#FFD700] hover:bg-white/10' : 'text-[#B8860B] hover:bg-black/8'
              }`}
            >
              {dark ? <Sun size={18} /> : <Moon size={18} />}
            </button>

            <button
              className={`md:hidden ${hamburgerColor} p-2 rounded-lg ${hamburgerHover} transition`}
              onClick={() => setMenuOpen(true)}
              aria-label="Open menu"
            >
              <Menu size={22} />
            </button>
          </div>
        </div>
      </nav>

      {/* ── MOBILE SIDEBAR ── */}
      {menuOpen && (
        <div className="fixed inset-0 z-[60] flex md:hidden">
          <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={() => setMenuOpen(false)} />
          <div className={`relative ml-auto w-72 ${sidebarBg} h-full shadow-2xl flex flex-col`}>
            <div className={`flex items-center justify-between p-5 border-b ${sidebarBorder}`}>
              <div className="flex items-center gap-2">
                <div className="bg-[#FFD700] text-[#0A0A0A] font-black text-lg px-3 py-1 rounded-lg">SBS</div>
              </div>
              <button
                onClick={() => setMenuOpen(false)}
                className={`${dark ? 'text-gray-400 hover:text-white' : 'text-gray-500 hover:text-black'} p-1 rounded-lg transition`}
              >
                <X size={20} />
              </button>
            </div>

            <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
              {NAV_LINKS.map(({ to, label, icon: Icon }) => (
                <Link key={to} to={to}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all
                    ${location.pathname === to ? linkActive : sidebarLink}`}
                >
                  <Icon size={18} />
                  {label}
                </Link>
              ))}
            </nav>

            <div className={`p-4 border-t ${sidebarBorder} space-y-2`}>
              <button
                onClick={() => setDark(d => !d)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all
                  ${dark ? 'text-gray-300 hover:bg-white/10 hover:text-white' : 'text-gray-600 hover:bg-black/5 hover:text-black'}`}
              >
                {dark ? <Sun size={17} /> : <Moon size={17} />}
                {dark ? 'Light Mode' : 'Dark Mode'}
              </button>
              <button
                onClick={() => navigate('/admin/login')}
                className={`w-full py-2 text-xs transition rounded-xl ${adminBtn}`}
              >
                Admin Portal
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── PAGE CONTENT ── */}
      {/* pt-16 = navbar height, pb-10 = ticker height */}
      <main className="flex-1 pt-16" style={{ paddingBottom: '40px' }}>
  <Outlet />
</main>

      {/* ── STICKY FOOTER TICKER ── */}
      <div className="fixed bottom-0 left-0 right-0 z-40 bg-[#FFD700] flex items-center overflow-hidden border-t-2 border-[#E6C200]" style={{ height: '40px' }}>
        <Link to="/contact"
          className="shrink-0 bg-[#013383] text-[#FFD700] font-bold text-xs px-4 h-full flex items-center gap-1.5 hover:bg-[#1A1A1A] transition z-10 "
        >
          <Phone size={12} />
          Contact Us
        </Link>
        <div className="overflow-hidden flex-1 flex items-center">
          <div className="marquee-track ">
            {ticker.map((city, i) => (
              <span key={i} className="flex items-center gap-1.5 text-[#0A0A0A] text-xs font-semibold px-4">
                <MapPin size={10} />
                {city}
                <span className="text-[#0A0A0A]/40 ml-2">•</span>
              </span>
            ))}
          </div>
        </div>
      </div>

    </div>
  )
} 
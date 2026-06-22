import React from 'react'
import { Link } from 'react-router-dom'
import { Briefcase, GraduationCap, Tag, ArrowRight, Star, Users, Award, TrendingUp } from 'lucide-react'

const STATS = [
  { label: 'Jobs Posted',       value: '2,400+', icon: Briefcase },
  { label: 'Students Enrolled', value: '8,500+', icon: GraduationCap },
  { label: 'Business Offers',   value: '320+',   icon: Tag },
  { label: 'Success Rate',      value: '94%',    icon: Star },
]

const SERVICES = [
  { to: '/jobs',            label: 'JOBS',       subtitle: 'Recruitments / Manpower Supply', desc: 'For Top Companies · All Verticals', icon: Briefcase,     accent: '#FF4444', accentBg: 'rgba(255,68,68,0.08)',    badge: 'Free & Paid' },
  { to: '/online-degrees',  label: 'ADMISSIONS', subtitle: 'College / Online Degrees',       desc: 'UGC & AICTE Recognized',           icon: GraduationCap, accent: '#4488FF', accentBg: 'rgba(68,136,255,0.08)',   badge: 'Top Universities' },
  { to: '/business-offers', label: 'OFFERS',     subtitle: 'Business Promotions',            desc: 'Latest & Trending Deals',          icon: Tag,           accent: '#FFD700', accentBg: 'rgba(255,215,0,0.08)',    badge: 'New Opportunities' },
]

const WHY = [
  { icon: Award,     text: 'UGC & AICTE recognized degree programs' },
  { icon: Users,     text: '500+ corporate hiring partners' },
  { icon: TrendingUp,text: 'Free job placement — no charges for candidates' },
  { icon: Star,      text: '94% placement success rate' },
]

const NUMBERS = [
  { label: 'Years Experience', value: '14+',  color: '#FFD700' },
  { label: 'Cities Covered',   value: '25+',  color: '#4488FF' },
  { label: 'Companies Hiring', value: '500+', color: '#FF4444' },
  { label: 'Happy Clients',    value: '10K+', color: '#44DD88' },
]

export default function Home() {
  return (
    <div className="page-enter bg-theme-primary min-h-screen">

      {/* ── HERO ── */}
      {/* <section className="relative overflow-hidden min-h-[55vh] flex items-center">
        <div className="absolute inset-0 opacity-5 pointer-events-none"
          style={{ backgroundImage: 'radial-gradient(circle at 25% 25%, #FFD700 0%, transparent 50%), radial-gradient(circle at 75% 75%, #FFD700 0%, transparent 50%)' }} />
        <div className="absolute inset-0 pointer-events-none"
          style={{ backgroundImage: 'linear-gradient(rgba(255,215,0,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,215,0,0.03) 1px, transparent 1px)', backgroundSize: '60px 60px' }} />
        <div className="relative max-w-6xl mx-auto px-4 py-16 w-full">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 bg-[#FFD700]/10 border border-[#FFD700]/20 rounded-full px-4 py-2 mb-6">
              <div className="w-2 h-2 rounded-full bg-[#FFD700] pulse-gold" />
              <span className="text-[#FFD700] text-xs font-semibold tracking-widest uppercase">Trusted Across AP · Telangana · Odisha</span>
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-theme-primary leading-tight mb-4">
              Your Gateway to <span className="gold-text">Success</span>
            </h1>
            <p className="text-theme-secondary text-lg leading-relaxed max-w-2xl mb-8">
              SBS has connected thousands of job seekers, students, and entrepreneurs with the right opportunities across South India — and we're just getting started.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link to="/jobs" className="inline-flex items-center gap-2 bg-[#FFD700] text-[#0A0A0A] font-bold px-6 py-3 rounded-xl hover:bg-[#E6C200] transition text-sm">
                Find Jobs <ArrowRight size={16} />
              </Link>
              <Link to="/contact" className="inline-flex items-center gap-2 border border-theme text-theme-primary font-semibold px-6 py-3 rounded-xl hover:border-[#FFD700]/50 hover:text-[#FFD700] transition text-sm">
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </section> */}

      {/* ── STATS ── */}
      {/* <section className="border-y border-theme bg-theme-secondary">
        <div className="max-w-6xl mx-auto px-4 py-8 grid grid-cols-2 md:grid-cols-4 gap-6">
          {STATS.map(({ label, value, icon: Icon }) => (
            <div key={label} className="text-center">
              <div className="flex justify-center mb-2"><Icon size={18} className="text-[#FFD700]" /></div>
              <p className="text-2xl font-black text-theme-primary">{value}</p>
              <p className="text-theme-muted text-xs mt-0.5">{label}</p>
            </div>
          ))}
        </div>
      </section> */}

      {/* ── SERVICE CARDS ── */}
      <section className="max-w-6xl mx-auto px-4 py-14">
        <div className="text-center mb-10">
          <p className="text-[#FFD700] text-xs font-semibold uppercase tracking-widest mb-2">What We Offer</p>
          <h2 className="text-3xl font-black text-theme-primary">Everything You Need</h2>
        </div>
        <div className="grid sm:grid-cols-3 gap-5">
          {SERVICES.map(({ to, label, subtitle, desc, icon: Icon, accent, accentBg, badge }) => (
            <Link key={to} to={to}
              className="card-hover group relative rounded-2xl border border-theme overflow-hidden bg-theme-card p-6 flex flex-col gap-5">
              <div className="absolute top-0 left-0 right-0 h-0.5" style={{ background: accent }} />
              <div className="flex items-start justify-between">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ background: accentBg }}>
                  <Icon size={22} style={{ color: accent }} />
                </div>
                <span className="text-xs px-2.5 py-1 rounded-full font-medium" style={{ background: accentBg, color: accent }}>{badge}</span>
              </div>
              <div>
                <p className="text-xs text-theme-muted mb-1">{subtitle}</p>
                <h3 className="text-theme-primary font-black text-2xl mb-1">{label}</h3>
                <p className="text-theme-secondary text-sm">{desc}</p>
              </div>
              <div className="mt-auto flex items-center gap-2 font-semibold text-sm transition-all" style={{ color: accent }}>
                Explore <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ── WHY SBS ── */}
      {/* <section className="border-t border-theme bg-theme-secondary">
        <div className="max-w-6xl mx-auto px-4 py-14">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-[#FFD700] text-xs font-semibold uppercase tracking-widest mb-3">Why Choose SBS</p>
              <h2 className="text-3xl font-black text-theme-primary mb-4 leading-tight">South India's Most Trusted Placement Network</h2>
              <p className="text-theme-secondary text-sm leading-relaxed mb-6">With offices across AP, Telangana, and Odisha, SBS has been bridging talent and opportunity since 2010.</p>
              <div className="space-y-3">
                {WHY.map(({ icon: Icon, text }) => (
                  <div key={text} className="flex items-center gap-3 text-sm text-theme-secondary">
                    <div className="w-7 h-7 rounded-lg bg-[#FFD700]/10 flex items-center justify-center flex-shrink-0">
                      <Icon size={13} className="text-[#FFD700]" />
                    </div>
                    {text}
                  </div>
                ))}
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {NUMBERS.map(({ label, value, color }) => (
                <div key={label} className="bg-theme-card border border-theme rounded-2xl p-5 text-center">
                  <p className="text-3xl font-black mb-1" style={{ color }}>{value}</p>
                  <p className="text-theme-muted text-xs">{label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section> */}

      {/* ── CTA ── */}
      {/* <section className="max-w-6xl mx-auto px-4 py-10">
        <div className="relative rounded-2xl overflow-hidden bg-[#FFD700] p-8 md:p-12">
          <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle at 80% 50%, #000 0%, transparent 60%)' }} />
          <div className="relative flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h2 className="text-[#0A0A0A] font-black text-2xl md:text-3xl mb-2">Ready to Get Started?</h2>
              <p className="text-[#0A0A0A]/70 text-sm">Contact our team today.</p>
            </div>
            <Link to="/contact" className="flex-shrink-0 bg-[#0A0A0A] text-[#FFD700] font-bold px-8 py-4 rounded-xl hover:bg-[#1A1A1A] transition text-sm inline-flex items-center gap-2">
              Talk to Us <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section> */}
    </div>
  )
}

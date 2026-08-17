import React, { useState } from 'react'
import {
  FileText, GraduationCap, Coins, Handshake, Clapperboard, Megaphone,
  ShieldAlert, Layers, Share2, Repeat, Phone, Globe, Quote,
  Eye, Search, Compass, Flag, Settings
} from 'lucide-react'
import PopupForm from '../../components/PopupForm'

const opportunity = [
  { title: 'A Fragmented Landscape', desc: 'Entrepreneurs are forced to navigate multiple disconnected service providers — losing time, money, and momentum without a unified partner.' },
  { title: 'One Integrated Platform', desc: 'SBS consolidates DPR, funding, training, development, and crisis management under a single roof — purpose-built for end-to-end business guidance.' },
  { title: 'Capturing Growing Demand', desc: 'As businesses seek structured, accountable support partners, SBS is positioned to meet surging demand with a differentiated, integrated model.' },
]

const coreServices = [
  { icon: FileText, title: 'DPR', desc: 'Structured project reports for funding and planning' },
  { icon: GraduationCap, title: 'Trainings', desc: 'Business development and professional skill-building' },
  { icon: Coins, title: 'Funding', desc: 'Access to capital across startup, growth, and working capital needs' },
  { icon: Handshake, title: 'Business Development', desc: 'Strategy, partnerships, and market expansion' },
  { icon: Clapperboard, title: 'Media & Entertainment', desc: 'YouTube, OTT, and production opportunities' },
  { icon: Megaphone, title: 'PR & Networking', desc: 'Strategic connections and brand visibility' },
  { icon: ShieldAlert, title: 'Crisis Management', desc: 'Risk assessment and business continuity planning' },
]

const revenueModel = [
  { title: 'Service-Based Fees', desc: 'Direct revenue from DPR preparation, professional training programs, and consulting engagements — predictable and scalable.' },
  { title: 'Commission Revenue', desc: 'Performance-linked earnings from funding placements and strategic partnership facilitation — aligning SBS incentives with client success.' },
  { title: 'Recurring Contracts', desc: 'Ongoing business development and support retainers generate stable, long-term revenue streams with high client retention value.' },
]

const journey = [
  { icon: Eye, label: 'Understand' },
  { icon: Search, label: 'Analyse' },
  { icon: Compass, label: 'Explore' },
  { icon: Flag, label: 'Plan' },
  { icon: Settings, label: 'Execute' },
]

const competitiveAdvantages = [
  { title: 'Integrated Ecosystem', desc: 'Services are designed to work in concert — reducing client friction and delivering measurably better outcomes than siloed alternatives.' },
  { title: 'Long-Term Relationships', desc: 'End-to-end support transforms transactional engagements into deep, trust-based partnerships — driving retention and referrals.' },
  { title: 'Revenue Resilience', desc: 'A diverse service mix across sectors and client types creates multiple parallel revenue streams — reducing concentration risk.' },
]

const growthVectors = [
  { title: '1. Geographic Scale', desc: 'expand service delivery across new regions' },
  { title: '2. Cross-Sell Depth', desc: 'upsell existing clients across all 7 services' },
  { title: '3. Strategic Alliances', desc: 'partner with financial institutions, media platforms, industry networks' },
]

const growthBullets = [
  { label: 'Scalable model', desc: 'services are deliverable across geographies and business segments without proportional cost increases' },
  { label: 'Cross-selling engine', desc: 'existing clients present immediate upsell and bundling opportunities across the full service portfolio' },
  { label: 'Strategic alliances', desc: 'partnerships with financial institutions, media platforms, and industry networks accelerate reach and credibility' },
]

const whyPartner = [
  { icon: Layers, title: 'Proven Framework', desc: 'A battle-tested methodology for business assessment and solution matching — delivering structured, accountable outcomes for every engagement.' },
  { icon: Share2, title: 'Network Access', desc: 'Tap into an established network of funding sources, certified trainers, and industry connections built to accelerate client and partner success.' },
  { icon: Repeat, title: 'Recurring Revenue', desc: 'Long-term client relationships and retainer contracts translate directly into sustained, predictable revenue potential for partners.' },
]

function H2({ children }) {
  return <h2 className="text-theme-primary font-semibold text-xl mb-4">{children}</h2>
}

function AccentCard({ title, desc }) {
  return (
    <div className="bg-theme-card border border-theme border-l-4 border-l-sbs-yellow rounded-r-xl rounded-l-sm px-5 py-4">
      <h3 className="text-theme-primary font-semibold text-sm mb-1.5">{title}</h3>
      <p className="text-theme-secondary text-sm leading-relaxed">{desc}</p>
    </div>
  )
}

function MutedCard({ title, desc }) {
  return (
    <div className="bg-theme-tertiary border border-theme rounded-xl px-5 py-4">
      <h3 className="text-theme-primary font-semibold text-sm mb-1.5">{title}</h3>
      <p className="text-theme-secondary text-sm leading-relaxed">{desc}</p>
    </div>
  )
}

export default function OtherServices() {
  const [panel, setPanel] = useState(false)

  return (
    <div className="page-enter bg-theme-primary min-h-screen">
      <div className="max-w-xl mx-auto px-5 py-10">

        {/* Cover */}
        <div className="mb-10">
          <h1 className="text-theme-primary font-light text-3xl mb-2">SBS – Sai Business Services</h1>
          <p className="text-theme-secondary text-base mb-4">Strategic business support for growth-focused companies</p>
          <p className="text-sbs-yellow text-sm font-semibold mb-2">Your Requirement. Our Guidance. Your Growth.</p>
          <p className="text-theme-secondary text-sm leading-relaxed">
            We help businesses turn complex needs into clear action with practical guidance, reliable execution,
            and a partnership mindset that drives long-term growth.
          </p>
        </div>

        {/* The Opportunity */}
        <div className="mb-10">
          <H2>The Opportunity</H2>
          <div className="grid grid-cols-1 gap-3">
            {opportunity.map(item => <AccentCard key={item.title} {...item} />)}
          </div>
        </div>

        {/* Seven Core Services */}
        <div className="mb-10">
          <H2>Seven Core Services</H2>
          <div className="bg-theme-card border border-theme rounded-2xl divide-y divide-theme">
            {coreServices.map(({ icon: Icon, title, desc }) => (
              <div key={title} className="flex items-start gap-4 px-5 py-4">
                <div className="w-9 h-9 shrink-0 rounded-lg flex items-center justify-center bg-sbs-yellow/10">
                  <Icon size={18} strokeWidth={1.5} className="text-sbs-yellow" />
                </div>
                <div>
                  <h3 className="text-theme-primary font-semibold text-sm mb-0.5">{title}</h3>
                  <p className="text-theme-secondary text-sm leading-relaxed">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Revenue Model */}
        <div className="mb-10">
          <H2>Revenue Model</H2>
          <div className="grid grid-cols-1 gap-3">
            {revenueModel.map(item => <MutedCard key={item.title} {...item} />)}
          </div>
        </div>

        {/* Customer Journey */}
        <div className="mb-10">
          <H2>Customer Journey</H2>
          <div className="bg-theme-card border border-theme rounded-2xl px-5 py-5">
            <div className="flex items-center justify-between mb-4 overflow-x-auto">
              {journey.map((step, i) => (
                <React.Fragment key={step.label}>
                  <div className="w-11 h-11 shrink-0 rounded-full border-2 border-sbs-yellow bg-theme-card flex items-center justify-center">
                    <step.icon size={17} strokeWidth={1.5} className="text-sbs-yellow" />
                  </div>
                  {i < journey.length - 1 && (
                    <div
                      className="shrink-0"
                      style={{
                        width: 0, height: 0,
                        borderTop: '8px solid transparent',
                        borderBottom: '8px solid transparent',
                        borderLeft: '9px solid var(--color-sbs-yellow)',
                        margin: '0 2px',
                      }}
                    />
                  )}
                </React.Fragment>
              ))}
            </div>
            <div className="flex items-center justify-between mb-4">
              {journey.map(step => (
                <span key={step.label} className="text-theme-primary text-[11px] font-medium flex-1 text-center">
                  {step.label}
                </span>
              ))}
            </div>
            <p className="text-theme-secondary text-sm leading-relaxed">
              Every client engagement follows a structured, repeatable framework — ensuring consistent outcomes,
              measurable progress, and long-term relationship value from first contact to full implementation.
            </p>
          </div>
        </div>

        {/* Competitive Advantages */}
        <div className="mb-10">
          <H2>Competitive Advantages</H2>
          <div className="grid grid-cols-1 gap-3">
            {competitiveAdvantages.map(item => <MutedCard key={item.title} {...item} />)}
          </div>
        </div>

        {/* Growth Potential */}
        <div className="mb-10">
          <H2>Growth Potential</H2>
          <p className="text-theme-secondary text-sm leading-relaxed mb-5">
            SBS is architected for scale — not just as a local service provider, but as a replicable platform
            capable of expanding across geographies, industries, and client segments.
          </p>
          <ul className="space-y-3 mb-7">
            {growthBullets.map(b => (
              <li key={b.label} className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full mt-1.5 shrink-0 bg-sbs-yellow" />
                <p className="text-theme-secondary text-sm leading-relaxed">
                  <span className="text-theme-primary font-semibold">{b.label}</span> — {b.desc}
                </p>
              </li>
            ))}
          </ul>

          {/* Pyramid */}
          <div className="bg-theme-card border border-theme rounded-xl px-4 py-6 flex flex-col items-center">
            <div
              className="flex items-end justify-center pb-1 mb-2 border-sbs-yellow"
              style={{ clipPath: 'polygon(50% 0, 100% 100%, 0 100%)', borderWidth: 1.5, borderStyle: 'solid', width: 90, height: 60 }}
            >
              <span className="text-theme-primary text-[9px] font-semibold text-center leading-tight px-1">
                Three growth vectors
              </span>
            </div>
            {growthVectors.map((v, i) => (
              <div
                key={v.title}
                className="px-4 py-3 text-center -mt-px border-sbs-yellow"
                style={{
                  clipPath: 'polygon(12% 0, 88% 0, 100% 100%, 0 100%)',
                  borderWidth: 1.5, borderTopWidth: 0, borderStyle: 'solid',
                  width: `${65 + i * 18}%`,
                }}
              >
                <p className="text-theme-primary text-xs font-bold">{v.title}</p>
                <p className="text-theme-secondary text-[11px]">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Why Partner With SBS */}
        <div className="mb-10">
          <H2>Why Partner With SBS</H2>
          <div className="grid grid-cols-1 gap-4">
            {whyPartner.map(({ icon: Icon, title, desc }) => (
              <div key={title} className="bg-theme-card border border-theme border-t-4 border-t-sbs-yellow rounded-xl px-5 py-4">
                <div className="w-9 h-9 rounded-full flex items-center justify-center mb-3 bg-sbs-yellow">
                  <Icon size={16} strokeWidth={1.5} className="text-sbs-black" />
                </div>
                <h3 className="text-theme-primary font-semibold text-sm mb-1">{title}</h3>
                <p className="text-theme-secondary text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Next Steps */}
        <div className="mb-10">
          <H2>Next Steps</H2>
          <p className="text-theme-secondary text-sm mb-5">
            We invite serious investors and partners to begin the conversation. The path forward is straightforward:
          </p>
          <div className="space-y-4 mb-5">
            {[
              { step: '01', title: 'Explore Opportunities', desc: 'Engage with SBS leadership to review partnership structures and investment pathways aligned with your objectives.' },
              { step: '02', title: 'Discuss Integration', desc: 'Collaborate on service integration models, revenue-sharing arrangements, and strategic fit across your existing portfolio or network.' },
            ].map(s => (
              <div key={s.step} className="bg-theme-card border border-theme rounded-xl px-5 py-4">
                <p className="text-sbs-yellow text-xs font-bold mb-1">{s.step}</p>
                <h3 className="text-theme-primary font-semibold text-sm mb-1">{s.title}</h3>
                <p className="text-theme-secondary text-sm leading-relaxed">{s.desc}</p>
              </div>
            ))}
            <div className="bg-theme-card border border-theme rounded-xl px-5 py-4">
              <p className="text-sbs-yellow text-xs font-bold mb-1">03</p>
              <h3 className="text-theme-primary font-semibold text-sm mb-2">Connect With Us</h3>
              <a href="tel:+916371797847" className="flex items-center gap-2 text-sm text-theme-primary mb-1">
                <Phone size={14} strokeWidth={1.5} className="text-sbs-yellow" />+91 63717 97847
              </a>
              <a href="https://www.sbs.ind.in" target="_blank" rel="noreferrer" className="flex items-center gap-2 text-sm text-theme-primary">
                <Globe size={14} strokeWidth={1.5} className="text-sbs-yellow" />www.sbs.ind.in
              </a>
            </div>
          </div>
          <div className="bg-sbs-yellow/10 border border-theme-gold flex items-start gap-3 rounded-xl px-5 py-4">
            <Quote size={16} strokeWidth={1.5} className="text-sbs-yellow shrink-0 mt-0.5" />
            <p className="text-theme-primary text-sm font-medium leading-relaxed">
              Your Requirement. Our Guidance. Your Growth. — Let's build something exceptional together.
            </p>
          </div>
        </div>

        {/* Enquire */}
        <button
          onClick={() => setPanel(true)}
          className="w-full py-3.5 rounded-xl font-bold text-sm bg-sbs-yellow text-sbs-black transition hover:bg-sbs-yellow-dark"
        >
          Enquire Now
        </button>
      </div>

      <PopupForm
        open={panel}
        onClose={() => setPanel(false)}
        type="other_service"
        jobType={null}
        refId={null}
        refTitle="Other Services"
      />
    </div>
  )
}
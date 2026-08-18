import React, { useState } from 'react'
import {
  Briefcase, Users, Settings, LayoutGrid, UserCheck, ArrowRight,
  AlertTriangle, MapPin, Phone
} from 'lucide-react'
import PopupForm from '../../components/PopupForm'
import LogoScroller from '../../components/LogoScroller'

/* ---------------------------------- DATA ---------------------------------- */

const missionPoints = [
  {
    title: 'Multi-Sector Opportunities',
    desc: 'Business participation across three distinct and growing sectors.',
  },
  {
    title: 'Project-Based Ventures',
    desc: 'Structured investment participation with clear project definitions and terms.',
  },
  {
    title: 'Professional Guidance',
    desc: 'End-to-end support through enquiry, evaluation, and documentation.',
  },
  {
    title: 'Transparent Communication',
    desc: 'Full disclosure of project structure, requirements, and applicable conditions.',
  },
  {
    title: 'Growth-Oriented Approach',
    desc: 'Ventures selected with scalability and business development in mind.',
  },
]

const overviewStats = [
  { label: 'Minimum Investment', value: '₹10 LAKHS' },
  { label: 'Maximum Investment', value: '₹50 LAKHS' },
  { label: 'Investment Type', value: 'Project-Based Participation' },
  { label: 'Sectors Available', value: '3 Active Sectors' },
]

const projects = [
  {
    number: '01',
    title: 'Clothes Recycling',
    tagline: 'Turning Used Textiles Into Business Opportunity',
    summary:
      'Sustainability-focused business opportunity involving the collection, processing, and recycling of used clothing and textile materials. Addresses a rapidly growing market for responsible resource utilisation.',
    intro:
      'The global textile recycling market is expanding as businesses and consumers shift toward circular economy principles. This opportunity positions investors at the centre of that transition.',
    components: [
      {
        title: 'Textile Collection & Aggregation',
        desc: 'Systematic sourcing and collection of used clothing and textile materials from targeted supply channels.',
      },
      {
        title: 'Recycling & Processing Operations',
        desc: 'Structured processing of collected materials through established recycling workflows.',
      },
      {
        title: 'Sustainable Business Model',
        desc: 'Built around responsible resource utilisation with long-term operational viability.',
      },
      {
        title: 'Circular Economy Approach',
        desc: 'Aligns with global sustainability priorities and increasing regulatory and consumer demand for responsible practices.',
      },
      {
        title: 'Resource Utilisation Focus',
        desc: 'Emphasis on maximising value extraction from textile waste streams.',
      },
    ],
  },
  {
    number: '02',
    title: 'Poly House Farming',
    tagline: 'Modern Agriculture. Controlled Environment. Business Opportunity.',
    summary:
      'Controlled-environment agricultural opportunity designed for efficient and protected crop cultivation using modern poly house farming techniques. Reduces weather dependency and optimises resource usage.',
    intro:
      'Poly house farming represents a significant advancement in Indian agricultural practice — offering climate-controlled production, higher yield consistency, and efficient resource use compared to traditional open-field cultivation.',
    components: [
      {
        title: 'Controlled Cultivation Environment',
        desc: 'Protected growing conditions that reduce exposure to weather, pests, and seasonal constraints.',
      },
      {
        title: 'Efficient Resource & Water Use',
        desc: 'Precision irrigation and input management to maximise yield per unit of resource consumed.',
      },
      {
        title: 'Protected Crop Production',
        desc: 'Structural protection of crops against external variables, supporting consistency of output.',
      },
      {
        title: 'Modern Agricultural Practices',
        desc: "Integration of contemporary techniques aligned with India's push for agricultural modernisation.",
      },
      {
        title: 'Scalable Farming Opportunity',
        desc: 'Business model designed to expand production capacity in line with market demand.',
      },
    ],
  },
  {
    number: '03',
    title: 'Tank Fish Farming',
    tagline: 'Smart Aquaculture. Structured Production. Growth Potential.',
    summary:
      'Aquaculture-focused opportunity involving managed, tank-based fish cultivation. Combines controlled production environments with growing domestic and export demand for farmed fish.',
    intro:
      "India's domestic demand for farmed fish continues to grow, creating a strong business rationale for structured, tank-based aquaculture operations. This opportunity offers a controlled, scalable model of fish production.",
    components: [
      {
        title: 'Managed Fish Cultivation Systems',
        desc: 'Structured, tank-based systems designed for consistent and reliable fish production cycles.',
      },
      {
        title: 'Controlled Farming Environment',
        desc: 'Monitored water quality, feeding schedules, and production parameters for operational efficiency.',
      },
      {
        title: 'Efficient Space Utilisation',
        desc: 'Tank-based design enables high-density production within a compact, manageable footprint.',
      },
      {
        title: 'Aquaculture-Focused Business Model',
        desc: 'Purpose-built operational structure aligned with aquaculture best practices and market requirements.',
      },
      {
        title: 'Food Production Opportunity',
        desc: 'Participation in a sector with stable and growing domestic demand for quality farmed produce.',
      },
    ],
  },
]

const advantages = [
  {
    icon: Briefcase,
    title: 'Professional Management',
    desc: 'Business-focused approach supported by structured planning, clearly defined project scopes, and disciplined execution across all ventures.',
  },
  {
    icon: Users,
    title: 'Business Partnership',
    desc: 'Participation in selected business ventures on defined terms — with roles, responsibilities, and conditions clearly documented and communicated upfront.',
  },
  {
    icon: Settings,
    title: 'Structured Process',
    desc: 'Clear presentation of all project details, investment requirements, eligibility criteria, risks, and applicable conditions — before any commitment is made.',
  },
  {
    icon: LayoutGrid,
    title: 'Diverse Projects',
    desc: 'Opportunities spanning recycling, agriculture, and aquaculture — allowing investors to align participation with their own interests and risk profile.',
  },
  {
    icon: UserCheck,
    title: 'Investor Support',
    desc: 'Dedicated assistance through every stage — from initial enquiry and consultation through to project selection, documentation, and onboarding.',
  },
]

const whatYouGet = [
  {
    title: 'Business Opportunity',
    desc: 'Access to selected, vetted project opportunities across multiple sectors with clearly defined participation structures.',
  },
  {
    title: 'Professional Support',
    desc: 'Dedicated assistance throughout every stage of your investment journey — from first contact to full onboarding.',
  },
  {
    title: 'Transparent Information',
    desc: 'Full visibility into the project structure, investment requirements, associated risks, and applicable terms before any commitment.',
  },
  {
    title: 'Diversification',
    desc: 'The ability to explore participation across different business sectors — recycling, agriculture, and aquaculture — within a single structured framework.',
  },
  {
    title: 'Growth Potential',
    desc: 'Participation in ventures designed with scalability and business development in mind, operating in sectors with growing domestic relevance.',
  },
]

const processSteps = [
  {
    number: '01',
    title: 'Enquiry',
    desc: 'Submit your investment interest via our contact channels. A member of our team will acknowledge your enquiry promptly.',
  },
  {
    number: '02',
    title: 'Consultation',
    desc: 'Speak directly with our investment team. Discuss your goals, preferences, and available investment range.',
  },
  {
    number: '03',
    title: 'Select a Project',
    desc: 'Explore the full range of available business opportunities and identify the venture that best aligns with your interests.',
  },
  {
    number: '04',
    title: 'Review Details',
    desc: 'Thoroughly review all investment requirements, associated risks, applicable terms, and required documentation.',
  },
  {
    number: '05',
    title: 'Start Your Journey',
    desc: 'Proceed with your chosen investment only after fully reviewing and accepting all applicable terms and conditions.',
  },
]

const disclaimerPoints = [
  {
    title: 'Not Financial Advice',
    desc: 'This document has been prepared by SBS – Sai Business Services for general informational purposes only. It does not constitute, and should not be construed as, financial advice, an investment recommendation, or a solicitation to invest. Prospective investors are strongly encouraged to seek independent financial and legal advice before making any investment decision.',
  },
  {
    title: 'No Guaranteed Returns',
    desc: 'SBS does not guarantee any specific financial returns, profits, or outcomes from participation in any of its business projects. Past performance of any sector or business model referenced in this presentation is not indicative of future results. All projections, if any, are illustrative only.',
  },
  {
    title: 'Investment Risk',
    desc: 'All investments carry inherent risk, including the risk of partial or total loss of invested capital. The nature, extent, and likelihood of such risks will vary by project. Prospective investors must carefully review all project-specific documentation, terms, and risk disclosures prior to committing any funds.',
  },
  {
    title: 'Subject to Terms & Conditions',
    desc: 'Participation in any SBS investment opportunity is subject to the specific terms, conditions, eligibility requirements, and documentation applicable to the chosen project. SBS reserves the right to modify, withdraw, or suspend any opportunity at any time without prior notice.',
  },
]

/* ------------------------------- SUBCOMPONENTS ----------------------------- */

function SectionKicker({ children }) {
  return (
    <p className="text-xs font-bold tracking-[0.15em] uppercase text-[#B91C1C] mb-3">
      {children}
    </p>
  )
}

function SectionHeading({ children }) {
  return (
    <h2 className="font-serif text-3xl sm:text-4xl font-bold text-theme-primary mb-4">
      {children}
    </h2>
  )
}

/* ---------------------------------- PAGE ----------------------------------- */

export default function BusinessOffers() {
  const [panel, setPanel] = useState({ open: false, offer: null })

  const openEnquiry = (project) => {
    setPanel({
      open: false,
      offer: {
        _id: project.number,
        title: project.title,
        company: 'SBS – Sai Business Services',
      },
    })
  }

  return (
    <div className="page-enter bg-theme-primary min-h-screen">

      {/* ---------------- HERO ---------------- */}
      <section className="max-w-6xl mx-auto px-4 pt-16 pb-14 grid md:grid-cols-2 gap-10 items-center">
        <div className="flex justify-center">
          <div className="w-full max-w-sm aspect-[4/5] rounded-3xl bg-gradient-to-br from-[#0A1E3F] to-[#132C5C] flex items-end justify-center overflow-hidden">
            <div className="w-3/4 h-2/3 bg-gradient-to-t from-[#1c3a6e] to-[#3a6bb5]/60 rounded-t-2xl" />
          </div>
        </div>
        <div>
          <p className="text-xs font-bold tracking-[0.15em] uppercase text-theme-secondary mb-4">
            Investment Opportunity
          </p>
          <p className="text-sm font-semibold text-theme-secondary mb-3">
            Invest Today. Build a Better Tomorrow.
          </p>
          <h1 className="font-serif text-3xl sm:text-5xl font-bold text-theme-primary mb-4 leading-tight">
            SBS – Sai Business Services
          </h1>
          <p className="text-theme-secondary mb-8">
            Structured Business Investment Across High-Potential Sectors
          </p>
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-theme-card border border-theme rounded-xl p-4">
              <p className="text-xs font-bold text-theme-secondary uppercase tracking-wide mb-1">Investment Range</p>
              <p className="font-bold text-theme-primary">₹10 LAKHS – ₹50 LAKHS</p>
            </div>
            <div className="bg-theme-card border border-theme rounded-xl p-4">
              <p className="text-xs font-bold text-theme-secondary uppercase tracking-wide mb-1">Sectors</p>
              <p className="font-bold text-theme-primary">3 Curated Opportunities</p>
            </div>
            <div className="bg-theme-card border border-theme rounded-xl p-4 col-span-2">
              <p className="text-xs font-bold text-theme-secondary uppercase tracking-wide mb-1">Approach</p>
              <p className="font-bold text-theme-primary">Professional. Transparent. Structured.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ---------------- ABOUT SBS ---------------- */}
      <section className="max-w-6xl mx-auto px-4 py-14">
        <SectionKicker>About SBS</SectionKicker>
        <SectionHeading>Building Opportunities. Supporting Growth.</SectionHeading>
        <p className="text-theme-secondary max-w-3xl mb-10 leading-relaxed">
          SBS – Sai Business Services is a business-focused organisation providing structured
          investment opportunities across carefully selected business sectors. Our mandate is to
          connect serious investors with viable, professionally managed ventures — with
          transparency and clarity at every step.
        </p>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-[#0A1E3F] rounded-2xl p-8 flex flex-col justify-start">
            <h3 className="text-white font-bold text-lg mb-3">Our Mission</h3>
            <p className="text-blue-100 text-sm leading-relaxed">
              To identify, structure, and present high-potential business opportunities that
              enable investors to participate meaningfully in growing sectors of the Indian
              economy.
            </p>
          </div>

          <div className="flex flex-col gap-5">
            {missionPoints.map((point, i) => (
              <div key={i} className="flex gap-3">
                <ArrowRight size={18} className="text-[#2563EB] mt-1 shrink-0" />
                <div>
                  <p className="font-bold text-theme-primary text-sm">{point.title}</p>
                  <p className="text-theme-secondary text-sm">{point.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------- INVESTMENT OVERVIEW ---------------- */}
      <section className="max-w-6xl mx-auto px-4 py-14">
        <SectionKicker>Investment Overview</SectionKicker>
        <SectionHeading>Explore Business. Evaluate Potential. Invest With Confidence.</SectionHeading>
        <p className="text-theme-secondary max-w-3xl mb-10 leading-relaxed">
          SBS provides structured opportunities for individuals interested in participating in
          selected business projects. Each opportunity is presented with the clarity and detail
          required for informed decision-making.
        </p>

        <div className="grid sm:grid-cols-2 gap-px bg-theme border border-theme rounded-2xl overflow-hidden mb-6">
          {overviewStats.map((stat, i) => (
            <div key={i} className="bg-theme-card p-6">
              <p className="text-sm font-semibold text-theme-primary mb-1">{stat.label}</p>
              <p className="font-bold text-theme-primary">{stat.value}</p>
            </div>
          ))}
        </div>

        <div className="flex gap-3 bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-900 rounded-xl p-5">
          <AlertTriangle size={18} className="text-blue-500 shrink-0 mt-0.5" />
          <p className="text-sm text-theme-secondary leading-relaxed">
            Investment requirements, eligibility criteria, and applicable terms may vary
            depending on the selected project and its specific structure. Prospective investors
            are encouraged to review all documentation carefully before proceeding.
          </p>
        </div>
      </section>

      {/* ---------------- OUR PROJECTS ---------------- */}
      <section className="max-w-6xl mx-auto px-4 py-14">
        <SectionKicker>Our Projects</SectionKicker>
        <SectionHeading>Diverse Opportunities Across Growing Sectors</SectionHeading>
        <p className="text-theme-secondary max-w-3xl mb-10 leading-relaxed">
          SBS currently offers investment participation across three carefully selected sectors —
          each representing a distinct opportunity in sustainability, agriculture, and
          aquaculture. These sectors have been chosen for their business viability, scalability,
          and alignment with contemporary economic and environmental priorities.
        </p>

        <div className="grid sm:grid-cols-3 gap-4 mb-16">
          {projects.map((p) => (
            <div key={p.number} className="bg-theme-card border border-theme rounded-2xl overflow-hidden">
              <div className="bg-theme-secondary/10 text-center py-3 font-bold text-theme-primary border-b border-theme">
                {p.number}
              </div>
              <div className="p-5">
                <h3 className="font-bold text-theme-primary mb-2">{p.title}</h3>
                <p className="text-theme-secondary text-sm leading-relaxed">{p.summary}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Detailed project breakdowns */}
        <div className="flex flex-col gap-8">
          {projects.map((p) => (
            <div key={p.number} className="grid md:grid-cols-5 gap-0 rounded-2xl overflow-hidden border border-theme">
              <div className="md:col-span-2 bg-[#0A1E3F] p-8 flex flex-col justify-between">
                <div>
                  <p className="text-xs font-bold tracking-wide uppercase text-blue-300 mb-2">
                    Project {p.number}
                  </p>
                  <h3 className="text-white font-serif text-2xl font-bold mb-2">{p.title}</h3>
                  <p className="text-blue-200 text-sm mb-4">{p.tagline}</p>
                  <p className="text-blue-100 text-sm leading-relaxed">{p.intro}</p>
                </div>
                <button
                  onClick={() => openEnquiry(p)}
                  className="mt-6 w-full py-2.5 rounded-xl font-bold text-sm bg-[#FFD700] text-[#0A0A0A] hover:bg-[#E6C200] transition"
                >
                  Enquire Now
                </button>
              </div>

              <div className="md:col-span-3 bg-theme-card p-6">
                <p className="text-xs font-bold tracking-wide uppercase text-[#B91C1C] mb-4">
                  Key Business Components
                </p>
                <div className="grid sm:grid-cols-2 gap-4">
                  {p.components.map((c, i) => (
                    <div key={i} className="border-l-2 border-[#2563EB] pl-3">
                      <p className="font-bold text-theme-primary text-sm mb-1">{c.title}</p>
                      <p className="text-theme-secondary text-xs leading-relaxed">{c.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ---------------- THE SBS ADVANTAGE ---------------- */}
      <section className="max-w-6xl mx-auto px-4 py-14">
        <SectionKicker>The SBS Advantage</SectionKicker>
        <SectionHeading>Why Consider SBS?</SectionHeading>
        <p className="text-theme-secondary max-w-3xl mb-10 leading-relaxed">
          SBS is built on a foundation of professional discipline, transparent communication, and
          structured business execution. We do not position ourselves as financial advisors — we
          position ourselves as business partners who provide clarity, support, and structured
          access to vetted opportunities.
        </p>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {advantages.map((a, i) => (
            <div key={i}>
              <a.icon size={26} className="text-[#2563EB] mb-3" />
              <p className="font-bold text-theme-primary mb-1">{a.title}</p>
              <p className="text-theme-secondary text-sm leading-relaxed">{a.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ---------------- WHAT YOU GET ---------------- */}
      <section className="max-w-6xl mx-auto px-4 py-14">
        <SectionKicker>What You Get</SectionKicker>
        <SectionHeading>Your Investment. Your Journey. Your Terms.</SectionHeading>
        <p className="text-theme-secondary max-w-3xl mb-10 leading-relaxed">
          As an SBS investment participant, you gain access to a structured, professionally
          managed process — with clear information, dedicated support, and opportunities across
          sectors aligned with long-term business growth themes.
        </p>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {whatYouGet.map((item, i) => (
            <div key={i} className="bg-theme-card border border-theme rounded-2xl p-5">
              <p className="font-bold text-theme-primary mb-2">{item.title}</p>
              <p className="text-theme-secondary text-sm leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ---------------- INVESTMENT PROCESS ---------------- */}
      <section className="max-w-6xl mx-auto px-4 py-14">
        <SectionKicker>Investment Process</SectionKicker>
        <SectionHeading>How Does It Work?</SectionHeading>
        <p className="text-theme-secondary max-w-3xl mb-10 leading-relaxed">
          SBS has designed a straightforward, five-step process to take prospective investors
          from initial interest to informed participation. Each step is designed to ensure
          clarity, comfort, and full informed consent before any commitment is made.
        </p>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-10">
          {processSteps.map((step) => (
            <div key={step.number} className="bg-theme-secondary/10 rounded-xl p-5">
              <p className="text-xs font-bold text-theme-secondary mb-1">
                {step.number} — {step.title}
              </p>
              <p className="text-theme-secondary text-sm leading-relaxed">{step.desc}</p>
            </div>
          ))}
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <div className="bg-[#0A1E3F] rounded-2xl p-6">
            <p className="text-white font-bold mb-3">Get In Touch</p>
            <div className="flex items-center gap-2 text-blue-100 text-sm mb-1">
              <MapPin size={14} /> www.sbs.ind.in
            </div>
            <div className="flex items-center gap-2 text-blue-100 text-sm">
              <Phone size={14} /> +91 63717 97847
            </div>
          </div>
          <div className="bg-theme-card border border-theme rounded-2xl p-6">
            <p className="font-bold text-theme-primary mb-2">Who Is This Opportunity For?</p>
            <p className="text-theme-secondary text-sm leading-relaxed">
              SBS investment opportunities are open to <strong className="text-theme-primary">entrepreneurs</strong>,{' '}
              <strong className="text-theme-primary">business professionals</strong>,{' '}
              <strong className="text-theme-primary">individual investors</strong>, those
              exploring <strong className="text-theme-primary">new sectors</strong>, and investors
              with a focus on{' '}
              <strong className="text-theme-primary">agriculture, aquaculture, or sustainability</strong>.
              Eligibility, investment requirements, and applicable conditions may vary by project.
            </p>
          </div>
        </div>
      </section>

      {/* ---------------- DISCLAIMER ---------------- */}
      <section className="max-w-6xl mx-auto px-4 py-14">
        <SectionKicker>Important Notice</SectionKicker>
        <SectionHeading>Disclaimer</SectionHeading>

        <div className="flex gap-3 bg-yellow-50 dark:bg-yellow-950/30 border border-yellow-300 dark:border-yellow-900 rounded-xl p-5 mb-8">
          <AlertTriangle size={18} className="text-yellow-600 shrink-0 mt-0.5" />
          <p className="text-sm text-theme-secondary leading-relaxed">
            This presentation is for informational purposes only and does not constitute
            financial, legal, or investment advice. Investment in business ventures involves
            risk, including the possible loss of capital. Returns are not guaranteed.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 gap-4 mb-8">
          {disclaimerPoints.map((d, i) => (
            <div key={i} className="bg-theme-card border border-theme rounded-xl p-5">
              <p className="font-bold text-theme-primary mb-2">{d.title}</p>
              <p className="text-theme-secondary text-sm leading-relaxed">{d.desc}</p>
            </div>
          ))}
        </div>

        <p className="text-center text-theme-secondary text-sm">
          SBS – Sai Business Services &nbsp;|&nbsp; www.sbs.ind.in &nbsp;|&nbsp; +91 63717 97847
        </p>
      </section>

      <LogoScroller label="Business Partners" accent="#FFD700" logoKey="businessLogos" />

      <PopupForm
        open={panel.open}
        onClose={() => setPanel({ open: false, offer: null })}
        type="offer"
        refId={panel.offer?._id}
        refTitle={panel.offer ? `${panel.offer.title} by ${panel.offer.company}` : ''}
      />
    </div>
  )
}
import React, { useState } from 'react'
import {
  CheckCircle2, ChevronRight, Globe2, Wallet, Sun, Plane, ShieldCheck,
  Home, Car, Laptop, FileText, DollarSign, Clock, Briefcase, UserCheck,
  Users, MapPin, GraduationCap, BadgeCheck
} from 'lucide-react'
import PopupForm from '../../components/PopupForm'

// Free-to-use photos (Unsplash License — free for commercial use)
const heroPhoto = 'https://images.unsplash.com/photo-1537640685236-a9df2496e232?fm=jpg&q=80&w=1600&auto=format&fit=crop'
const campusPhoto = 'https://images.unsplash.com/photo-1771775605448-4b2db8aa7fd9?fm=jpg&q=80&w=1600&auto=format&fit=crop'
const graduatesPhoto = 'https://images.unsplash.com/photo-1633734973050-d6499a977c17?fm=jpg&q=80&w=1600&auto=format&fit=crop'
const accommodationPhoto = 'https://images.unsplash.com/photo-1721901947661-fb39d738c394?fm=jpg&q=80&w=1600&auto=format&fit=crop'

const TEAL_DEEP = '#0A2E38'
const TEAL = '#0F4C4C'
const OLIVE = '#767142'
const GOLD = '#D4AF37'

const highlights = [
  '6 Week Intensive Training',
  'Swiss Certification',
  'Guaranteed Paid Internship',
  'Global Opportunities',
]

const whyStudy = [
  {
    icon: Globe2,
    title: 'Diverse Cultures in Mauritius',
    desc: "Located in the Indian Ocean and served by flights across Europe, Africa, Asia and Australia, Mauritius offers a harmonious blend of cultures.",
  },
  {
    icon: Wallet,
    title: 'Affordable, Full-Fledged Academic Courses',
    desc: 'High quality education at a very reasonable cost, with comprehensive course options based on your qualification.',
  },
]

const infoStrip = [
  { icon: Sun, title: 'Weather in Mauritius', desc: "Never too cold — it's humid year-round with temperatures mostly between 25°C and 30°C." },
  { icon: Plane, title: 'Easily Accessible', desc: 'Conveniently connected to all continents with daily direct flights around the world.' },
  { icon: ShieldCheck, title: 'Safety in Mauritius', desc: 'A stable, peaceful country — socially, economically and politically — welcoming to all nationalities.' },
]

const whyBPG = [
  { n: 1, title: 'MQA Approved', desc: 'Course approved by the Mauritius Qualification Authority' },
  { n: 2, title: 'Industry Driven', desc: 'Increasing student employability through practical training' },
  { n: 3, title: 'Global Pathways', desc: 'Opportunity for pathway to UK & Europe' },
  { n: 4, title: 'World-Class Certifications', desc: 'Partnership with ABE for globally recognised diplomas' },
  { n: 5, title: 'Job Assistance', desc: 'Part-time job support provided by BPG' },
  { n: 6, title: 'Industry Collaboration', desc: 'Close partnerships with industry leaders' },
  { n: 7, title: 'Flexible Schedules', desc: 'Weekday & weekend classes to suit your life' },
]

const passportStats = [
  ['Mobility Score', '139'],
  ['Visa-Free', '96'],
  ['Visa on Arrival', '37'],
  ['ETA', '6'],
  ['Visa Required', '59'],
  ['Passport Power Rank', '30'],
  ['World Reach', '70%'],
  ['Population', '1,308,222'],
]

const programs = [
  {
    title: 'Business Management Diploma',
    subtitle: "1 year program equivalent to first year of Bachelor's degree",
    points: ['MQA approved', 'ABE Level 4 & 5', 'British qualifications'],
  },
  {
    title: 'Hospitality Management Diploma',
    subtitle: '1 year program with industry-focused curriculum',
    points: ['Practical, global training', 'Flexible schedule recognition'],
  },
]

const campusFacts = [
  'Known for its colourful markets and local culture, on the west side of Mauritius',
  "Neighbours some of the island's best beach resorts — a 20-minute drive to capital Port Louis",
  'A fast-growing, mainly middle-class urban centre with a town council and a large government hospital',
]

const benefits = [
  { icon: Home, title: 'Free Accommodation', desc: 'Complimentary 15-day accommodation' },
  { icon: Plane, title: 'Free Air Ticket*', desc: 'Complimentary air tickets available' },
  { icon: Car, title: 'Airport Pickup', desc: 'Complimentary airport pickup available' },
  { icon: Laptop, title: 'Free Laptop', desc: 'Complimentary laptop provided' },
  { icon: FileText, title: 'Zero Documentation & Courier Expenses', desc: 'No paperwork and courier cost' },
  { icon: Globe2, title: 'Global Recognition', desc: 'Worldwide recognized qualifications' },
  { icon: DollarSign, title: 'Affordable Fees', desc: 'Competitive tuition fee' },
  { icon: CheckCircle2, title: '100% Visa Assured', desc: 'No embassy interview and 100% assured visa' },
  { icon: Wallet, title: 'Low Cost of Living', desc: 'Affordable expenses starting at $250/month' },
  { icon: GraduationCap, title: 'No IELTS Required', desc: 'IELTS certification NOT required' },
  { icon: Clock, title: 'Pay After Visa', desc: 'Fee to be paid AFTER visa approval' },
  { icon: Briefcase, title: 'Part-Time Work', desc: 'Part-time work allowed for international students' },
  { icon: ShieldCheck, title: 'Safe Country', desc: 'One of the safest countries for international students' },
  { icon: UserCheck, title: 'Eligibility', desc: 'Age up to 40 and all gaps are acceptable' },
  { icon: Users, title: 'Refusals Can Apply', desc: 'Candidates refused for other countries can also apply' },
]

const visaDocs = [
  'PCC (Police Clearance Certificate) in English with a proper stamp',
  'Medical report of the student: Chest X-ray, Hepatitis B, HIV I & II, Lymphatic Filariasis, Leprosy — signed and stamped by the doctor on every page, along with the passport number',
  "Last 6 months' bank statement showing around ₹4 Lakhs, in the student's or parents' account",
  'Two original passport-size photographs',
]

const offerLetterDocs = [
  'All educational documents (10th, 12th, Graduation)',
  'Passport copy (front & back page)',
  'Passport-size photograph',
]

const supportServices = [
  'Admission Process',
  'Courier and Visa Filing',
  'Airport Pickup',
  'Accommodation Arrangements',
  'Help in Part-time Jobs',
]

function SectionCard({ title, children, bg = TEAL }) {
  return (
    <div className="rounded-2xl p-6 md:p-7" style={{ background: bg }}>
      <p className="font-bold text-base md:text-lg mb-4" style={{ color: GOLD }}>{title}</p>
      {children}
    </div>
  )
}

function BulletList({ items, dark = true }) {
  return (
    <ul className="space-y-2.5">
      {items.map((item, i) => (
        <li
          key={i}
          className={`flex items-start gap-2.5 text-sm leading-relaxed ${dark ? 'text-white/90' : 'text-gray-700'}`}
        >
          <span className="w-1.5 h-1.5 rounded-full shrink-0 mt-2" style={{ background: dark ? GOLD : TEAL }} />
          {item}
        </li>
      ))}
    </ul>
  )
}

function IconRow({ icon: Icon, title, desc, tint = TEAL }) {
  return (
    <div className="flex items-start gap-3">
      <div className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0" style={{ background: `${tint}14` }}>
        <Icon size={17} style={{ color: tint }} />
      </div>
      <div>
        <p className="font-semibold text-sm text-gray-900">{title}</p>
        {desc && <p className="text-gray-600 text-xs leading-relaxed mt-0.5">{desc}</p>}
      </div>
    </div>
  )
}

export default function HotelManagementMauritius() {
  const [applyOpen, setApplyOpen] = useState(false)

  return (
    <div className="page-enter min-h-screen" style={{ background: '#F7F8FB' }}>
      <div className="max-w-2xl mx-auto px-4 py-8 md:py-10">

        {/* ── Top bar: badges + association label ── */}
        <div className="flex items-start justify-between gap-3 mb-6">
          <div className="flex gap-2.5">
            <button
              onClick={() => setApplyOpen(true)}
              className="px-4 py-2.5 rounded-xl font-extrabold text-xs md:text-sm text-white shadow-sm"
              style={{ background: TEAL_DEEP }}
            >
              APPLY NOW
            </button>
            <div
              className="px-4 py-2.5 rounded-xl font-extrabold text-xs md:text-sm text-white shadow-sm"
              style={{ background: OLIVE }}
            >
              ADMISSIONS OPEN
            </div>
          </div>
          <div className="text-right shrink-0">
            <p className="text-[10px] text-gray-500 mb-1">In Association with</p>
            <p className="font-extrabold text-xs md:text-sm leading-tight" style={{ color: TEAL_DEEP }}>
              Business &amp; Professional<br />Growth Ltd, Mauritius
            </p>
          </div>
        </div>

        {/* ── Headline ── */}
        <h1 className="text-2xl md:text-3xl font-extrabold mb-2 leading-tight" style={{ color: TEAL_DEEP }}>
          HOTEL MANAGEMENT DIPLOMA IN MAURITIUS
        </h1>
        <p className="text-gray-600 text-sm md:text-base font-medium mb-5">
          Global Hospitality Program
        </p>

        {/* ── Highlight checklist ── */}
        <div className="space-y-3 mb-6">
          {highlights.map((text, i) => (
            <div key={i} className="flex items-center gap-3 bg-white rounded-xl px-4 py-3 border border-gray-200 shadow-sm">
              <CheckCircle2 size={20} className="text-green-500 shrink-0" />
              <span className="text-gray-800 font-medium text-sm md:text-base">{text}</span>
            </div>
          ))}
        </div>

        {/* ── Career banner ── */}
        <div className="rounded-xl py-4 px-5 text-center font-extrabold text-white text-sm md:text-base mb-6 leading-relaxed"
          style={{ background: OLIVE }}>
          START YOUR INTERNATIONAL CAREER IN<br />HOTEL MANAGEMENT - F&amp;B
        </div>

        <p className="text-center text-gray-600 text-sm md:text-base mb-1">
          Equip yourself with a globally recognised qualification
        </p>
        <h2 className="text-center font-extrabold text-xl md:text-2xl mb-8" style={{ color: TEAL_DEEP }}>
          BPG MAURITIUS <span className="font-medium text-gray-500 text-sm md:text-base align-middle">qualifications</span>
        </h2>

        {/* ── Hero photo ── */}
        <div className="rounded-2xl overflow-hidden shadow-md mb-8 border border-gray-200">
          <img src={heroPhoto} alt="Mauritius coastline" className="w-full h-56 md:h-72 object-cover block" />
        </div>

        {/* ── Why Study in Mauritius ── */}
        <h3 className="font-bold text-base md:text-lg mb-3" style={{ color: TEAL_DEEP }}>
          Why Study in Mauritius?
        </h3>
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-5 md:p-6 space-y-5 mb-6">
          {whyStudy.map((item, i) => (
            <IconRow key={i} {...item} tint={TEAL} />
          ))}
        </div>

        {/* ── Weather / Access / Safety strip ── */}
        <div className="rounded-2xl p-6 space-y-5 mb-8" style={{ background: TEAL_DEEP }}>
          {infoStrip.map(({ icon: Icon, title, desc }, i) => (
            <div key={i} className="flex items-start gap-3">
              <div className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0 bg-white/10">
                <Icon size={17} style={{ color: GOLD }} />
              </div>
              <div>
                <p className="font-semibold text-sm text-white">{title}</p>
                <p className="text-white/70 text-xs leading-relaxed mt-0.5">{desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* ── Why BPG College ── */}
        <h3 className="font-bold text-base md:text-lg mb-3" style={{ color: TEAL_DEEP }}>
          Why BPG College, Mauritius?
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-8">
          {whyBPG.map(({ n, title, desc }) => (
            <div key={n} className="rounded-xl p-4 text-white" style={{ background: TEAL }}>
              <p className="font-bold text-xs mb-1" style={{ color: GOLD }}>{n}. {title}</p>
              <p className="text-white/80 text-xs leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>

        {/* ── Passport Ranking ── */}
        <h3 className="font-bold text-base md:text-lg mb-2" style={{ color: TEAL_DEEP }}>
          🇲🇺 Mauritius Passport Ranking
        </h3>
        <p className="text-gray-600 text-sm mb-4 leading-relaxed">
          Ranked #24 in the world — as a Mauritius citizen you can travel visa-free to 153 countries.
        </p>
        <div className="rounded-xl overflow-hidden border border-gray-200 mb-8 shadow-sm">
          {passportStats.map(([label, value], i) => (
            <div
              key={label}
              className="flex items-center justify-between px-4 py-2.5 text-sm"
              style={{
                background: i % 2 === 0 ? TEAL : '#E8F4F5',
                color: i % 2 === 0 ? '#fff' : TEAL_DEEP,
              }}
            >
              <span className="font-semibold uppercase tracking-wide text-xs md:text-sm">{label}</span>
              <span className="font-bold">{value}</span>
            </div>
          ))}
        </div>

        {/* ── About BPG College ── */}
        <div className="rounded-2xl overflow-hidden shadow-md mb-4 border border-gray-200">
          <img src={campusPhoto} alt="BPG College campus" className="w-full h-48 md:h-64 object-cover block" />
        </div>
        <SectionCard title="About BPG College, Mauritius" bg={OLIVE}>
          <p className="text-white/90 text-sm leading-relaxed mb-2.5">
            Business &amp; Professional Growth Ltd (BPG), based in Port Louis, is a forward-thinking
            education provider dedicated to practical, industry-aligned training.
          </p>
          <p className="text-white/90 text-sm leading-relaxed mb-2.5">
            From ABE Level 4 &amp; 5 Diplomas to soft-skill masterclasses and corporate workshops,
            BPG bridges the gap between academic theory and workplace excellence.
          </p>
          <p className="text-white/90 text-sm leading-relaxed">
            BPG is expanding into undergraduate degree programs through collaborations with leading
            international universities, further enhancing its global reach.
          </p>
        </SectionCard>

        {/* ── Diploma Programs & Fees ── */}
        <h3 className="font-bold text-base md:text-lg mt-8 mb-3" style={{ color: TEAL_DEEP }}>
          Diploma Programs &amp; Fees
        </h3>
        <div className="rounded-2xl overflow-hidden shadow-md mb-4 border border-gray-200">
          <img src={graduatesPhoto} alt="BPG graduates celebrating" className="w-full h-48 md:h-64 object-cover block" />
        </div>
        <div className="space-y-4 mb-4">
          {programs.map((p, i) => (
            <div key={i} className="rounded-xl p-5" style={{ background: TEAL }}>
              <p className="font-bold text-sm md:text-base text-white mb-1">{p.title}</p>
              <p className="text-white/70 text-xs mb-3">{p.subtitle}</p>
              <BulletList items={p.points} />
            </div>
          ))}
        </div>
        <div className="grid grid-cols-3 gap-3 mb-8">
          {[
            { label: 'Tuition Fee', value: '$4,200', sub: 'Payable after visa approval' },
            { label: 'Program Duration', value: '1 Year', sub: 'Full-time & part-time' },
            { label: 'Min. Requirement', value: 'SC', sub: 'Secondary certificate' },
          ].map((s, i) => (
            <div key={i} className="rounded-xl border border-gray-200 bg-white p-3 text-center shadow-sm">
              <p className="font-extrabold text-sm md:text-base" style={{ color: TEAL_DEEP }}>{s.value}</p>
              <p className="text-[11px] font-semibold text-gray-700 mt-1">{s.label}</p>
              <p className="text-[10px] text-gray-500 mt-0.5">{s.sub}</p>
            </div>
          ))}
        </div>

        {/* ── Campus Location ── */}
        <h3 className="flex items-center gap-2 font-bold text-base md:text-lg mb-3" style={{ color: TEAL_DEEP }}>
          <MapPin size={18} /> Campus Location
        </h3>
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-5 md:p-6 mb-8">
          <p className="font-semibold text-sm text-gray-900 mb-3">
            Broad Avenue, Belle Rose, Quatre-Bornes, Mauritius
          </p>
          <BulletList items={campusFacts} dark={false} />
        </div>

        {/* ── 14 Benefits ── */}
        <h3 className="font-bold text-base md:text-lg mb-3" style={{ color: TEAL_DEEP }}>
          14 Benefits of Studying in BPG College, Mauritius
        </h3>
        <div className="rounded-2xl overflow-hidden shadow-md mb-4 border border-gray-200">
          <img src={accommodationPhoto} alt="Student accommodation" className="w-full h-48 md:h-64 object-cover block" />
        </div>
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-5 md:p-6 grid grid-cols-1 md:grid-cols-2 gap-5 mb-8">
          {benefits.map((b, i) => (
            <IconRow key={i} {...b} />
          ))}
        </div>

        {/* ── Eligibility & Visa Documents ── */}
        <div className="space-y-5 mb-8">
          <SectionCard title="Eligibility">
            <BulletList items={['10th, 10+2 or Any Graduates can apply', 'IELTS Not Required']} />
          </SectionCard>

          <SectionCard title="Documents Required for Visa">
            <BulletList items={visaDocs} />
          </SectionCard>

          <SectionCard title="Documents Required for Offer Letter" bg={OLIVE}>
            <BulletList items={offerLetterDocs} />
            <p className="text-white/80 text-xs mt-3 italic">*The offer letter takes 48 hours to process.</p>
          </SectionCard>

          <SectionCard title="Support Services">
            <BulletList items={supportServices} />
          </SectionCard>
        </div>

        {/* ── Apply button ── */}
        <button
          onClick={() => setApplyOpen(true)}
          className="w-full py-4 rounded-xl font-extrabold text-white text-base md:text-lg shadow-md flex items-center justify-center gap-2 mb-8 transition hover:opacity-90"
          style={{ background: TEAL_DEEP }}
        >
          APPLY NOW <ChevronRight size={20} />
        </button>

        {/* ── Closing CTA ── */}
        <div className="text-center">
          <h3 className="flex items-center justify-center gap-2 font-extrabold text-lg md:text-xl mb-2" style={{ color: TEAL_DEEP }}>
            <BadgeCheck size={20} style={{ color: GOLD }} /> Start Your Global Hospitality Career!
          </h3>
          <p className="text-gray-700 text-sm md:text-base leading-relaxed">
            Get certified in Mauritius, gain global exposure, and open doors across the UK, Europe and beyond.
          </p>
          <p className="text-gray-700 text-sm md:text-base font-medium">
            Admissions are open — apply now!
          </p>
        </div>
      </div>

      <PopupForm
        open={applyOpen}
        onClose={() => setApplyOpen(false)}
        type="hotel_management"
        jobType={null}
        refTitle="Hotel Management Diploma (Mauritius) – BPG College Program"
      />
    </div>
  )
}
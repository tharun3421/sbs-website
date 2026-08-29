import React, { useState } from 'react'
import { Coins } from 'lucide-react'
import PopupForm from '../../components/PopupForm'

/* ---------------------------------- DATA ---------------------------------- */
/* Content and order match the SBS "Get Your Financial Needs Sorted Here" poster exactly. */

const forIndividuals = [
  'Personal Loan',
  'Education Loan',
  'Gold Loan',
  'Home Loan',
  'Abroad Study – Funds',
]

const forBusiness = [
  'Business Start-Up loan',
  'Working Capital',
  'Equipment & Investment Loan',
  'Funds for Expansion',
  'Private Finance',
  'Short-Term Loan',
]

const forOthers = [
  'OD | CC | LOC',
  'LAP & VC',
  'PRIVATE FUNDS',
]

const whyChooseUs = [
  'Multiple Solutions',
  'Professional Guidance',
  'Documentation Support',
  'Transparent Communication',
]

/* ------------------------------- SUBCOMPONENTS ----------------------------- */

function SectionTab({ children }) {
  return (
    <div className="inline-flex items-center gap-2 bg-gradient-to-r from-[#4FA8E8] to-[#2E7DD1] text-white font-bold text-lg sm:text-xl lg:text-2xl px-6 lg:px-8 py-3.5 lg:py-4 rounded-r-2xl rounded-tl-none shadow-lg mb-0 -ml-4 sm:-ml-6 lg:-ml-8">
      {children}
      <CoinBadge />
    </div>
  )
}

function CoinBadge() {
  return (
    <span className="w-6 h-6 lg:w-7 lg:h-7 rounded-full bg-[#F4B400] flex items-center justify-center shrink-0">
      <Coins size={14} strokeWidth={2} className="text-white" />
    </span>
  )
}

function Bullet({ children }) {
  return (
    <li className="flex items-start gap-2.5">
      <span className="mt-2 lg:mt-2.5 w-1.5 h-1.5 lg:w-2 lg:h-2 bg-[#C7E86C] shrink-0" />
      <span className="text-[#C7E86C] font-bold text-base sm:text-lg lg:text-xl leading-snug">{children}</span>
    </li>
  )
}

function PillButton({ children }) {
  return (
    <div className="inline-flex items-center gap-3 bg-gradient-to-r from-[#4FA8E8] to-[#2E7DD1] text-white font-bold text-base sm:text-lg lg:text-xl px-8 lg:px-10 py-4 lg:py-5 rounded-full shadow-lg whitespace-nowrap">
      <CoinBadge />
      {children}
      <CoinBadge />
    </div>
  )
}

function Wrap({ children, className = '' }) {
  return (
    <div className={`max-w-6xl mx-auto ${className}`}>
      {children}
    </div>
  )
}

/* ---------------------------------- PAGE ----------------------------------- */

export default function Loans() {
  const [enquiryOpen, setEnquiryOpen] = useState(false)

  return (
    <div className="page-enter min-h-screen">

      {/* ---------------- HERO PHOTO ---------------- */}
      <div className="relative w-full h-64 sm:h-80 md:h-96 lg:h-[32rem] overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1729077537326-91749c1c9197?fm=jpg&q=80&w=1920&auto=format&fit=crop"
          alt="Hand holding Indian rupee notes"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/10" />
        <div className="absolute inset-0 flex flex-col justify-end px-6 sm:px-10 md:px-14 lg:px-24 pb-8 lg:pb-14">
          <Wrap>
            <h1 className="font-extrabold text-2xl sm:text-4xl lg:text-6xl leading-tight">
              <span className="text-[#8BC53F] block">GET YOUR FINANCIAL NEEDS</span>
              <span className="text-white block">SORTED HERE !</span>
            </h1>
            <p className="text-gray-200 text-sm sm:text-base lg:text-xl mt-2 lg:mt-4">with credit assistance</p>
          </Wrap>
        </div>
      </div>

      {/* ---------------- INTRO BAND ---------------- */}
      <div className="bg-[#1E63B8] px-6 sm:px-10 md:px-14 lg:px-24 py-5 lg:py-7">
        <Wrap>
          <p className="text-white text-sm sm:text-base lg:text-lg max-w-2xl">
            we provide best financial advice and solutions for your business, education, personal & other needs.
          </p>
        </Wrap>
      </div>

      {/* ---------------- PILL BUTTONS ---------------- */}
      <div className="bg-[#43521E] px-6 sm:px-10 md:px-14 lg:px-24 py-10 lg:py-16">
        <Wrap className="flex flex-col lg:flex-row items-center justify-center gap-5 lg:gap-8">
          <PillButton>YOUR NEED – OUR SERVICE</PillButton>
          <PillButton>GET EXPERT GUIDANCE</PillButton>
        </Wrap>
      </div>

      {/* ---------------- FOR INDIVIDUALS ---------------- */}
      <div>
        <div className="px-6 sm:px-10 md:px-14 lg:px-24 pt-8 lg:pt-12">
          <Wrap>
            <SectionTab>FOR INDIVIDUALS</SectionTab>
          </Wrap>
        </div>
        <div className="bg-[#1E63B8] px-6 sm:px-10 md:px-14 lg:px-24 py-8 lg:py-14">
          <Wrap>
            <div className="grid grid-cols-1 sm:grid-cols-[minmax(0,220px)_1fr] lg:grid-cols-[280px_1fr] gap-6 lg:gap-14 items-center">
              <div className="w-full aspect-square max-w-[220px] lg:max-w-[280px] mx-auto rounded-xl overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1631511258193-252ab3da6b8b?fm=jpg&q=80&w=800&auto=format&fit=crop"
                  alt="Calculator, pen, and money for personal loan planning"
                  className="w-full h-full object-cover"
                />
              </div>
              <ul className="space-y-3.5 lg:space-y-5">
                {forIndividuals.map((item, i) => <Bullet key={i}>{item}</Bullet>)}
              </ul>
            </div>
            <p className="text-white text-sm lg:text-base text-center mt-6 lg:mt-10">
              Best Suited for Employee, Student, Parent & Business Professionals.
            </p>
          </Wrap>
        </div>
      </div>

      {/* ---------------- FOR BUSINESS ---------------- */}
      <div className="bg-[#43521E]">
        <div className="px-6 sm:px-10 md:px-14 lg:px-24 pt-8 lg:pt-12">
          <Wrap>
            <SectionTab>FOR BUSINESS</SectionTab>
          </Wrap>
        </div>
        <div className="bg-[#1E63B8] px-6 sm:px-10 md:px-14 lg:px-24 py-8 lg:py-14">
          <Wrap>
            <div className="grid grid-cols-1 sm:grid-cols-[1fr_minmax(0,260px)] lg:grid-cols-[1fr_360px] gap-6 lg:gap-14 items-center">
              <ul className="space-y-3.5 lg:space-y-5">
                {forBusiness.map((item, i) => <Bullet key={i}>{item}</Bullet>)}
              </ul>
              <div className="w-full rounded-xl overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1638262052640-82e94d64664a?fm=jpg&q=80&w=1200&auto=format&fit=crop"
                  alt="Business partners shaking hands"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            <p className="text-white text-sm lg:text-base text-center mt-6 lg:mt-10">
              Best Suited for Business Owners, Entrepreneurs, MSME, Traders, Companies, Agencies, Consultancy Offices.
            </p>
          </Wrap>
        </div>
      </div>

      {/* ---------------- FOR OTHERS ---------------- */}
      <div>
        <div className="px-6 sm:px-10 md:px-14 lg:px-24 pt-8 lg:pt-12">
          <Wrap>
            <SectionTab>FOR OTHERS</SectionTab>
          </Wrap>
        </div>
        <div className="bg-[#1E63B8] px-6 sm:px-10 md:px-14 lg:px-24 py-8 lg:py-14">
          <Wrap>
            <div className="grid grid-cols-1 sm:grid-cols-[minmax(0,200px)_1fr] lg:grid-cols-[260px_1fr] gap-6 lg:gap-14 items-center">
              <div className="w-full rounded-xl overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1751273907192-f28ee0cbfeda?fm=jpg&q=80&w=1200&auto=format&fit=crop"
                  alt="Stack of Indian rupee notes"
                  className="w-full h-full object-cover"
                />
              </div>
              <ul className="space-y-3.5 lg:space-y-5">
                {forOthers.map((item, i) => <Bullet key={i}>{item}</Bullet>)}
              </ul>
            </div>
            <p className="text-white text-sm lg:text-base text-center mt-6 lg:mt-10">
              Best Suited for Managing Cash Flow for Importers, exporters, realtors & traders.
            </p>
          </Wrap>
        </div>
      </div>

      {/* ---------------- WHY CHOOSE US ---------------- */}
      <div className="bg-[#43521E] px-6 sm:px-10 md:px-14 lg:px-24 pt-10 lg:pt-16 pb-12 lg:pb-20">
        <Wrap className="flex flex-col items-center lg:items-stretch">
          <h2 className="text-white font-bold text-2xl lg:text-4xl mb-5 lg:mb-8 self-start lg:self-center">WHY CHOOSE US</h2>
          <ul className="space-y-3 lg:space-y-4 mb-10 lg:mb-14 self-start lg:self-center lg:grid lg:grid-cols-2 lg:gap-x-16 lg:space-y-0">
            {whyChooseUs.map((item, i) => (
              <li key={i} className="flex items-center gap-3 lg:py-2">
                <CoinBadge />
                <span className="text-white text-base lg:text-lg">{item}</span>
              </li>
            ))}
          </ul>
          <button
            onClick={() => setEnquiryOpen(false)}
            className="mx-auto block px-10 lg:px-16 py-3.5 lg:py-4 rounded-2xl bg-[#B91C1C] text-white font-bold text-lg lg:text-xl hover:bg-[#9B1717] transition shadow-lg"
          >
            Enquiry Now!
          </button>
        </Wrap>
      </div>

      <PopupForm
        open={enquiryOpen}
        onClose={() => setEnquiryOpen(false)}
        type="loan"
        jobType={null}
        refId={null}
        refTitle="Loans"
      />
    </div>
  )
}
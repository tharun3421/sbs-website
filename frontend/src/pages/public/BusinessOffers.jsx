import React, { useState } from 'react'
import PopupForm from '../../components/PopupForm'

/* ---------------------------------- DATA ---------------------------------- */
/* Content and order match the SBS "Building Opportunities" poster exactly. */

const whatWeOffer = [
  'Multi Sector Opportunities',
  'Project Based Ventures',
  'Professional Guidance',
  'Transparent Communication',
]

const whatYouGet = [
  'Professional Management',
  'Business Partnership',
  'Structured Process',
  'Diverse Projects',
  'Investor Support',
]

const howWeProceed = [
  'Enquiry',
  'Consultation',
  'Select Project',
  'Review Details',
  'Start Your Journey',
]

const whoCanConnect = [
  'Entrepreneurs',
  'Business Professionals',
]

const selectFromMultiple = [
  'Start Your Own Business',
  'Invest In Other Leading Businesses',
  'Become a Working Partner',
  'As a Freelancer',
  'Refer Others & Earn',
  'Get Second Income',
  'Provide Your Services',
  'Give Your Business Opportunity',
]

/* ------------------------------- SUBCOMPONENTS ----------------------------- */

function PanelTab({ children }) {
  return (
    <div className="inline-block bg-gradient-to-r from-[#4FA8E8] to-[#2E7DD1] text-white font-bold text-lg sm:text-xl lg:text-2xl px-6 lg:px-8 py-3.5 lg:py-4 rounded-r-2xl rounded-tl-none shadow-lg mb-6 lg:mb-8 -ml-4 sm:-ml-6 lg:-ml-8 leading-snug">
      {children}
    </div>
  )
}

function Bullet({ children }) {
  return (
    <li className="flex items-start gap-2.5">
      <span className="mt-2 lg:mt-2.5 w-1.5 h-1.5 lg:w-2 lg:h-2 bg-[#FFD700] shrink-0" />
      <span className="text-[#FFD700] font-bold text-base sm:text-lg lg:text-xl leading-snug">{children}</span>
    </li>
  )
}

function Panel({ from, via, to, children, twoCol = false }) {
  return (
    <section
      className="px-6 sm:px-10 md:px-14 lg:px-24 pt-10 lg:pt-16 pb-12 lg:pb-20"
      style={{ background: `linear-gradient(135deg, ${from}, ${via}, ${to})` }}
    >
      <div className={`max-w-3xl mx-auto lg:max-w-6xl ${twoCol ? 'lg:grid lg:grid-cols-2 lg:gap-x-16 lg:items-start' : ''}`}>
        {children}
      </div>
    </section>
  )
}

/* ---------------------------------- PAGE ----------------------------------- */

export default function BusinessOffers() {
  const [enquiryOpen, setEnquiryOpen] = useState(false)

  return (
    <div className="page-enter min-h-screen">

      {/* ---------------- HERO PHOTO ---------------- */}
      <div className="w-full h-56 sm:h-72 md:h-80 lg:h-[28rem] overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1681505531034-8d67054e07f6?fm=jpg&q=80&w=1920&auto=format&fit=crop"
          alt="Business partnership handshake"
          className="w-full h-full object-cover"
        />
      </div>

      {/* ---------------- HEADLINE BAND ---------------- */}
      <div className="bg-gradient-to-br from-[#0A1E3F] to-[#132C5C] px-6 sm:px-10 md:px-14 lg:px-24 pt-8 lg:pt-14 pb-10 lg:pb-14">
        <div className="max-w-3xl mx-auto lg:max-w-6xl lg:mx-auto">
          <h1 className="font-extrabold text-2xl sm:text-4xl lg:text-6xl leading-tight">
            <span className="text-white block">BUILDING OPPORTUNITIES</span>
            <span className="text-[#FFD700] block">SUPPORTING GROWTH</span>
          </h1>
          <p className="text-[#D9B968] text-sm sm:text-base lg:text-xl mt-4 lg:mt-6 max-w-xl lg:max-w-2xl">
            we identify, structure and present high-potential business opportunities that enable growth
          </p>
        </div>
      </div>

      {/* ---------------- WHAT WE OFFER ---------------- */}
      <Panel from="#4FA8E8" via="#1E63B8" to="#0A1E3F">
        <PanelTab>WHAT WE OFFER</PanelTab>
        <ul className="space-y-3.5 lg:space-y-5 lg:columns-2 lg:gap-x-16">
          {whatWeOffer.map((item, i) => <Bullet key={i}>{item}</Bullet>)}
        </ul>
      </Panel>

      {/* ---------------- WHAT YOU GET ---------------- */}
      <Panel from="#2E7DD1" via="#153E7A" to="#081A38">
        <PanelTab>WHAT YOU GET</PanelTab>
        <ul className="space-y-3.5 lg:space-y-5 lg:columns-2 lg:gap-x-16">
          {whatYouGet.map((item, i) => <Bullet key={i}>{item}</Bullet>)}
        </ul>
      </Panel>

      {/* ---------------- HOW WE PROCEED ---------------- */}
      <Panel from="#4FA8E8" via="#1E63B8" to="#0A1E3F">
        <PanelTab>HOW WE PROCEED</PanelTab>
        <ul className="space-y-3.5 lg:space-y-5 lg:columns-2 lg:gap-x-16">
          {howWeProceed.map((item, i) => <Bullet key={i}>{item}</Bullet>)}
        </ul>
      </Panel>

      {/* ---------------- WHO CAN CONNECT WITH US ---------------- */}
      <Panel from="#2E7DD1" via="#153E7A" to="#081A38">
        <PanelTab>WHO CAN CONNECT WITH US</PanelTab>
        <ul className="space-y-3.5 lg:space-y-5 lg:columns-2 lg:gap-x-16">
          {whoCanConnect.map((item, i) => <Bullet key={i}>{item}</Bullet>)}
          <li className="flex items-start gap-2.5 break-inside-avoid">
            <span className="mt-2 lg:mt-2.5 w-1.5 h-1.5 lg:w-2 lg:h-2 bg-[#FFD700] shrink-0" />
            <span className="leading-snug">
              <span className="text-[#FFD700] font-bold text-base sm:text-lg lg:text-xl">Individual Investors</span>
              <span className="block text-blue-100 text-sm sm:text-base lg:text-lg font-normal mt-0.5">
                and those who are exploring business opportunities
              </span>
            </span>
          </li>
        </ul>
      </Panel>

      {/* ---------------- SELECT FROM MULTIPLE OPPORTUNITIES ---------------- */}
      <Panel from="#4FA8E8" via="#1E63B8" to="#0A1E3F">
        <PanelTab>
          SELECT FROM MULTIPLE<br />OPPORTUNITIES
        </PanelTab>
        <ul className="space-y-3.5 lg:space-y-5 mb-10 lg:mb-14 lg:columns-2 lg:gap-x-16">
          {selectFromMultiple.map((item, i) => <Bullet key={i}>{item}</Bullet>)}
        </ul>
        <button
          onClick={() => setEnquiryOpen(false)}
          className="mx-auto block px-10 lg:px-16 py-3.5 lg:py-4 rounded-2xl bg-[#B91C1C] text-white font-bold text-lg lg:text-xl hover:bg-[#9B1717] transition shadow-lg"
        >
          Enquiry Now!
        </button>
      </Panel>

      <PopupForm
        open={enquiryOpen}
        onClose={() => setEnquiryOpen(false)}
        type="offer"
        refId="business-offers"
        refTitle="SBS Business Offers"
      />
    </div>
  )
}
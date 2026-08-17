import React, { useState } from 'react'
import {
  Landmark, Building2, Boxes, Home, Rocket, Lock, ShieldCheck, Layers,
  UserCheck, Share2, FileStack, MessagesSquare
} from 'lucide-react'
import PopupForm from '../../components/PopupForm'

function H2({ children }) {
  return <h2 className="text-theme-primary font-semibold text-xl mb-4">{children}</h2>
}

function Pill({ children, outline }) {
  return (
    <span
      className={
        outline
          ? 'inline-block text-[11px] font-semibold uppercase tracking-wide px-3 py-1 rounded border border-theme-gold text-sbs-yellow mb-3'
          : 'inline-block text-[11px] font-semibold uppercase tracking-wide px-3 py-1 rounded bg-theme-tertiary text-theme-primary mb-3'
      }
    >
      {children}
    </span>
  )
}

function BestSuited({ boxed = true, children }) {
  if (!boxed) {
    return (
      <p className="text-theme-primary text-sm mt-3">
        <span className="font-bold">Best suited for:</span> {children}
      </p>
    )
  }
  return (
    <div className="bg-sbs-yellow/10 border border-theme-gold rounded-xl px-4 py-3 mt-4">
      <p className="text-theme-primary text-sm">
        <span className="font-bold">Best suited for:</span> {children}
      </p>
    </div>
  )
}

function Bullets({ items }) {
  return (
    <ul className="space-y-1.5 mt-3">
      {items.map(item => (
        <li key={item} className="flex items-start gap-2 text-theme-secondary text-sm">
          <span className="w-1.5 h-1.5 rounded-full mt-1.5 shrink-0 bg-sbs-yellow" />
          {item}
        </li>
      ))}
    </ul>
  )
}

function IconCircle({ icon: Icon }) {
  return (
    <div className="w-9 h-9 rounded-full flex items-center justify-center shrink-0 bg-sbs-yellow">
      <Icon size={16} strokeWidth={1.5} className="text-sbs-black" />
    </div>
  )
}

const findSolution = [
  { icon: Layers, title: 'Your Needs, Our Solutions', desc: 'Personal needs, education, business growth, working capital, property, or specialized financial requirements' },
  { icon: UserCheck, title: 'Expert Guidance', desc: 'Professional guidance from requirement assessment to lender processing — every step of the way' },
]

const businessLoanItems = [
  { icon: Building2, title: 'Business Expansion', desc: 'Infrastructure, new locations, and scaling operations' },
  { icon: Boxes, title: 'Equipment & Inventory', desc: 'Machinery, stock, and essential business assets' },
  { icon: Landmark, title: 'Working Capital', desc: 'Day-to-day operations and eligible business requirements' },
]

const lapVc = [
  { icon: Home, title: 'Loan Against Property', desc: 'Access financing by leveraging residential, commercial, or qualifying property as security' },
  { icon: Rocket, title: 'Venture Capital', desc: 'Funding opportunities for eligible businesses and startups with growth potential' },
]

const privateBank = [
  { icon: Lock, title: 'Private Finance Solutions', desc: 'Financing options through private channels where conventional lending may not be suitable — tailored alternatives for unique requirements.' },
  { icon: ShieldCheck, title: 'Bank Guarantee', desc: 'Assurance from a bank for business, tender, contract, and commercial requirements — enabling trust and credibility in transactions.' },
]

const whyChoose = [
  { icon: Layers, title: 'Multiple Financial Solutions', desc: 'Options matched to your specific requirement' },
  { icon: UserCheck, title: 'Professional Guidance', desc: 'Expert support through the entire process' },
  { icon: Share2, title: 'Lender Options', desc: 'Matched to your profile and eligibility' },
  { icon: FileStack, title: 'Documentation Support', desc: 'End-to-end assistance from start to disbursal' },
  { icon: MessagesSquare, title: 'Transparent Communication', desc: 'Clear information on rates, charges, and terms' },
]

const simpleProcess = ['Share Requirement', 'Profile Assessment', 'Explore Options', 'Submit Docs']

export default function Loans() {
  const [panel, setPanel] = useState(false)

  return (
    <div className="page-enter bg-theme-primary min-h-screen">
      <div className="max-w-xl mx-auto px-5 py-10">

        {/* Cover */}
        <div className="mb-10">
          <Pill outline>🏛 Financial Services</Pill>
          <h1 className="text-theme-primary font-light text-3xl mb-2">SBS – Sai Business Services</h1>
          <p className="text-theme-secondary text-base">Complete Loan & Financial Solutions Under One Roof</p>
        </div>

        {/* Find the Right Financial Solution */}
        <div className="mb-10">
          <H2>Find the Right Financial Solution for Your Need</H2>
          <div className="grid grid-cols-1 gap-3">
            {findSolution.map(({ icon: Icon, title, desc }) => (
              <div key={title} className="bg-theme-tertiary border border-theme rounded-xl px-5 py-4 flex items-start gap-3">
                <IconCircle icon={Icon} />
                <div>
                  <h3 className="text-theme-primary font-semibold text-sm mb-1">{title}</h3>
                  <p className="text-theme-secondary text-sm leading-relaxed">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Personal Loan */}
        <div className="bg-theme-card border border-theme rounded-2xl px-6 py-6 mb-6">
          <Pill>For Individuals</Pill>
          <h3 className="text-theme-primary font-semibold text-xl mb-2">Personal Loan</h3>
          <p className="text-theme-secondary text-sm">Flexible financing for a wide range of personal needs:</p>
          <Bullets items={['Medical expenses & emergencies', 'Education & weddings', 'Home improvement & travel', 'Other permitted needs']} />
          <BestSuited>Salaried & eligible self-employed individuals</BestSuited>
        </div>

        {/* Education Loan */}
        <div className="bg-theme-card border border-theme rounded-2xl px-6 py-6 mb-6">
          <Pill>For Students & Families</Pill>
          <h3 className="text-theme-primary font-semibold text-xl mb-2">Education Loan</h3>
          <p className="text-theme-secondary text-sm">Financial assistance for higher education programs covering approved education-related expenses:</p>
          <Bullets items={['Higher education programs in India', 'International education abroad', 'Approved education-related expenses']} />
          <BestSuited>Students & parents</BestSuited>
        </div>

        {/* Business Loan */}
        <div className="bg-theme-card border border-theme rounded-2xl px-6 py-6 mb-10">
          <Pill>For Business Owners</Pill>
          <h3 className="text-theme-primary font-semibold text-xl mb-4">Business Loan</h3>
          <div className="space-y-4">
            {businessLoanItems.map(({ icon: Icon, title, desc }) => (
              <div key={title} className="flex items-start gap-3">
                <Icon size={18} strokeWidth={1.3} className="text-sbs-yellow shrink-0 mt-0.5" />
                <div>
                  <p className="text-theme-primary text-sm font-medium">{title}</p>
                  <p className="text-theme-secondary text-sm leading-relaxed">{desc}</p>
                </div>
              </div>
            ))}
          </div>
          <BestSuited boxed={false}>Business owners, entrepreneurs & eligible MSMEs</BestSuited>
        </div>

        {/* OD / CC & LoC */}
        <div className="mb-10">
          <H2>OD / CC & LoC</H2>
          <div className="grid grid-cols-1 gap-3 mb-6">
            <div className="bg-theme-card border border-theme border-l-4 border-l-sbs-yellow rounded-r-xl rounded-l-sm px-5 py-4">
              <h3 className="text-theme-primary font-semibold text-sm mb-1.5">Overdraft & Cash Credit</h3>
              <p className="text-theme-secondary text-sm leading-relaxed">Flexible working capital facilities up to an approved limit. Interest is charged only on the amount utilized — giving you control over your costs.</p>
            </div>
            <div className="bg-theme-card border border-theme border-l-4 border-l-sbs-yellow rounded-r-xl rounded-l-sm px-5 py-4">
              <h3 className="text-theme-primary font-semibold text-sm mb-1.5">Letter of Credit</h3>
              <p className="text-theme-secondary text-sm leading-relaxed">Payment assurance mechanism for domestic or international trade requirements — building trust between buyers and sellers.</p>
            </div>
          </div>

          {/* Simple flow diagram */}
          <div className="flex justify-center gap-10 mb-6">
            {['OD/CC', 'LoC'].map(label => (
              <div key={label} className="flex flex-col items-center">
                <div className="w-16 h-16 flex items-center justify-center border-2 border-sbs-yellow" style={{ transform: 'rotate(45deg)' }}>
                  <span className="text-theme-primary text-xs font-bold" style={{ transform: 'rotate(-45deg)' }}>{label}</span>
                </div>
                <div className="border-l border-dashed border-theme-gold" style={{ height: 24 }} />
                <div className="bg-theme-tertiary border border-theme rounded px-3 py-2 w-28 text-center">
                  <span className="text-theme-secondary text-[10px] leading-tight">
                    {label === 'OD/CC' ? 'flexible credit up to limit, pay interest only on used amount' : 'payment assurance for trade, domestic or international'}
                  </span>
                </div>
              </div>
            ))}
          </div>

          <p className="text-theme-primary text-sm font-semibold mb-2">Who Is This For?</p>
          <Bullets items={[
            'Businesses managing irregular cash flows',
            'Importers & exporters requiring trade finance',
            'Companies seeking flexible credit lines',
          ]} />
        </div>

        {/* LAP & VC */}
        <div className="mb-10">
          <H2>LAP & VC</H2>
          <div className="grid grid-cols-1 gap-3">
            {lapVc.map(({ icon: Icon, title, desc }) => (
              <div key={title} className="bg-theme-tertiary border border-theme rounded-xl px-5 py-4 flex items-start gap-3">
                <IconCircle icon={Icon} />
                <div>
                  <h3 className="text-theme-primary font-semibold text-sm mb-1">{title}</h3>
                  <p className="text-theme-secondary text-sm leading-relaxed">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Private Finance & Bank Guarantee */}
        <div className="mb-10">
          <H2>Private Finance & Bank Guarantee</H2>
          <div className="grid grid-cols-1 gap-4">
            {privateBank.map(({ icon: Icon, title, desc }) => (
              <div key={title} className="bg-theme-card border border-theme rounded-xl overflow-hidden">
                <div className="bg-theme-tertiary flex justify-center py-4">
                  <IconCircle icon={Icon} />
                </div>
                <div className="px-5 py-4">
                  <h3 className="text-theme-primary font-semibold text-sm mb-1">{title}</h3>
                  <p className="text-theme-secondary text-sm leading-relaxed">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Why Choose SBS */}
        <div className="mb-10">
          <H2>Why Choose SBS?</H2>
          <div className="bg-theme-card border border-theme rounded-2xl divide-y divide-theme">
            {whyChoose.map(({ icon: Icon, title, desc }) => (
              <div key={title} className="flex items-start gap-4 px-5 py-4">
                <div className="w-10 h-10 shrink-0 rounded-lg flex items-center justify-center bg-sbs-yellow/10">
                  <Icon size={18} strokeWidth={1.3} className="text-sbs-yellow" />
                </div>
                <div>
                  <h3 className="text-theme-primary font-medium text-sm mb-0.5">{title}</h3>
                  <p className="text-theme-secondary text-sm">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Our Simple Process */}
        <div className="mb-10">
          <H2>Our Simple Process</H2>
          <div className="space-y-2 mb-4">
            {simpleProcess.map((stage, i) => (
              <div
                key={stage}
                className="px-6 py-4 bg-sbs-yellow"
                style={{
                  opacity: 1 - i * 0.18,
                  clipPath: 'polygon(0 0, 92% 0, 100% 50%, 92% 100%, 0 100%)',
                }}
              >
                <span className="text-sbs-black font-semibold text-sm">{stage}</span>
              </div>
            ))}
          </div>
          <p className="text-theme-secondary text-sm leading-relaxed">
            From your first conversation with us to final disbursal — we guide you through every step
            with clarity and professional support.
          </p>
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
        type="loan"
        jobType={null}
        refId={null}
        refTitle="Loans"
      />
    </div>
  )
}
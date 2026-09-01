import React, { useState } from 'react'
import { BarChart3, Sparkles, Bitcoin, TrendingUp, IndianRupee } from 'lucide-react'
import PopupForm from '../../components/PopupForm'

/* Unsplash photos — free to use under the Unsplash License */
const stocksImg = 'https://images.unsplash.com/photo-1689732888407-310424e3a372?auto=format&fit=crop&w=900&q=80'   // Austin Hervias — candlestick chart on dark screen
const forexImg  = 'https://images.unsplash.com/photo-1634704784915-aacf363b021f?auto=format&fit=crop&w=900&q=80'   // Art Rachen — coin in front of a computer
const cryptoImg = 'https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?auto=format&fit=crop&w=900&q=80'   // Nick Chong — screen showing bitcoin trading chart
const niftyImg  = 'https://images.unsplash.com/photo-1689582236730-fa3076847f45?auto=format&fit=crop&w=900&q=80'   // Harri P — Wall Street charging bull statue
const sensexImg = 'https://images.unsplash.com/photo-1560221328-12fe60f83ab8?auto=format&fit=crop&w=900&q=80'      // Nicholas Cappello — monitor displaying graph

/* ── Palette lifted straight from the reference flyer ── */
const NAVY_DARK = '#081A45'
const NAVY      = '#0B2166'
const BLUE      = '#123B8F'
const BLUE_BOX  = '#1E4FA8'
const GOLD      = '#F5C518'
const GOLD_SOFT = '#E9C46A'
const OLIVE     = '#B08D3E'
const RED       = '#E11B22'

function Pill({ children }) {
  return (
    <span
      className="inline-block px-5 py-2.5 rounded-r-full rounded-l-sm font-extrabold text-sm md:text-base text-white -ml-4"
      style={{ background: BLUE }}
    >
      {children}
    </span>
  )
}

function MarketCard({ label, image, alt }) {
  return (
    <div className="relative h-40 md:h-44 rounded-2xl overflow-hidden shadow-lg">
      <img src={image} alt={alt} className="absolute inset-0 w-full h-full object-cover" loading="lazy" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/10" />
      <span
        className="absolute left-4 bottom-4 px-5 py-2 rounded-lg font-extrabold text-sm md:text-base shadow-md"
        style={{ background: GOLD, color: NAVY_DARK }}
      >
        {label}
      </span>
    </div>
  )
}

export default function TradingCourse() {
  const [enquireOpen, setEnquireOpen] = useState(false)

  const topics = ['Technical Analysis', 'Price Action', 'Entry – Exit', 'Stop Loss', '& other concepts']
  const whoCanJoin = ['Beginners', 'Aspiring Traders']

  return (
    <div className="page-enter min-h-screen" style={{ background: `linear-gradient(180deg, ${NAVY_DARK} 0%, ${NAVY} 45%, ${BLUE} 100%)` }}>
      <div className="max-w-xl mx-auto px-5 py-8 md:py-10">

        {/* ── Hero ── */}
        <div className="relative rounded-2xl overflow-hidden mb-7 px-5 py-8" style={{ background: NAVY_DARK }}>
          <img src={stocksImg} alt="" className="absolute inset-0 w-full h-full object-cover opacity-25" />
          <div className="relative">
            <h1 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight leading-none">
              TRADE SMARTER
            </h1>
            <p className="italic font-semibold text-lg md:text-xl mt-1" style={{ color: RED }}>
              Markets Go Down to Up
            </p>
          </div>
        </div>

        {/* ── Learn how & why ── */}
        <h2 className="text-white font-extrabold text-xl md:text-2xl mb-3">
          Learn &ldquo;HOW &amp; WHY&rdquo;
        </h2>
        <div className="rounded-2xl px-5 py-4 mb-7" style={{ background: BLUE_BOX }}>
          <p className="text-white/95 text-sm md:text-base leading-relaxed">
            Trading course provides practical knowledge on stock market &amp; other financial markets.
            In this trading course one can learn more about how markets functions.
          </p>
        </div>

        {/* ── Market cards ── */}
        <div className="space-y-5 mb-8">
          <MarketCard label="Stocks" image={stocksImg} alt="Stock market candlestick chart" />
          <MarketCard label="Forex" image={forexImg} alt="Forex currency trading" />
          <MarketCard label="Crypto" image={cryptoImg} alt="Cryptocurrency trading" />
          <MarketCard label="NIFTY" image={niftyImg} alt="Nifty index trading" />
          <MarketCard label="SENSEX" image={sensexImg} alt="Sensex index trading" />
        </div>

        <p className="text-center text-white/85 text-sm md:text-base mb-8 leading-relaxed">
          and all about trading in personal &amp; self-experienced manner
        </p>

        {/* ── Course offered by ── */}
        <div className="mb-8">
          <Pill>COURSE OFFERED BY</Pill>
        </div>

        <div className="flex flex-col items-center mb-8">
          <div className="flex items-center gap-2 mb-1">
            <BarChart3 size={30} style={{ color: GOLD }} />
            <span className="text-3xl md:text-4xl font-extrabold tracking-wide" style={{ color: GOLD }}>BNB</span>
          </div>
          <p className="font-bold tracking-[0.3em] text-sm md:text-base" style={{ color: GOLD_SOFT }}>TRADING</p>
          <p className="font-bold tracking-[0.4em] text-xs" style={{ color: GOLD_SOFT }}>ACADEMY</p>
          <div className="flex items-center gap-4 mt-3 opacity-90">
            <Sparkles size={18} style={{ color: GOLD }} />
            <Bitcoin size={18} style={{ color: GOLD }} />
            <TrendingUp size={18} style={{ color: GOLD }} />
            <IndianRupee size={18} style={{ color: GOLD }} />
          </div>
        </div>

        {/* ── Duration banner ── */}
        <div className="rounded-xl py-4 px-5 text-center mb-8 shadow-md" style={{ background: OLIVE }}>
          <p className="text-white font-bold text-sm md:text-base leading-relaxed">
            Duration&mdash; 2 months / weekly 5 days<br />
            Class 1.5hr to 2hrs
          </p>
        </div>

        {/* ── Topics covered ── */}
        <div className="mb-8">
          <Pill>TOPICS COVERED</Pill>
          <ul className="mt-4 space-y-2.5 pl-1">
            {topics.map((t, i) => (
              <li key={i} className="flex items-start gap-2.5 text-sm md:text-base font-medium" style={{ color: GOLD_SOFT }}>
                <span className="w-1.5 h-1.5 rounded-full mt-2 shrink-0" style={{ background: GOLD_SOFT }} />
                {t}
              </li>
            ))}
          </ul>
        </div>

        {/* ── Who can join ── */}
        <div className="mb-9">
          <Pill>WHO CAN JOIN</Pill>
          <ul className="mt-4 space-y-2.5 pl-1">
            {whoCanJoin.map((t, i) => (
              <li key={i} className="flex items-start gap-2.5 text-sm md:text-base font-medium" style={{ color: GOLD_SOFT }}>
                <span className="w-1.5 h-1.5 rounded-full mt-2 shrink-0" style={{ background: GOLD_SOFT }} />
                {t}
              </li>
            ))}
          </ul>
        </div>

        {/* ── Enquiry button ── */}
        <button
          onClick={() => setEnquireOpen(false)}
          className="w-full py-4 rounded-full font-extrabold text-white text-base md:text-lg shadow-lg transition hover:opacity-90"
          style={{ background: RED }}
        >
          Enquiry Now!
        </button>
      </div>

      <PopupForm
        open={enquireOpen}
        onClose={() => setEnquireOpen(false)}
        type="trading_course"
        jobType={null}
        refTitle="BNB Trading Academy — Trading Course"
      />
    </div>
  )
}
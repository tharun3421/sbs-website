import React, { useState, useEffect } from 'react'
import { Search, Tag, ChevronLeft, ChevronRight, TrendingUp } from 'lucide-react'
import api from '../../api'
import SlidePanel from '../../components/SlidePanel'
import LogoScroller from '../../components/LogoScroller'

export default function BusinessOffers() {
  const [offers, setOffers]   = useState([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch]   = useState('')
  const [page, setPage]       = useState(1)
  const [panel, setPanel]     = useState({ open: false, offer: null })
  const PER_PAGE = 6

  useEffect(() => {
    setLoading(true)
    api.get('/offers', { params: { search } })
      .then(r => setOffers(r.data)).catch(() => setOffers([]))
      .finally(() => setLoading(false))
    setPage(1)
  }, [search])

  const paginated  = offers.slice((page - 1) * PER_PAGE, page * PER_PAGE)
  const totalPages = Math.ceil(offers.length / PER_PAGE)

  return (
    <div className="page-enter bg-theme-primary min-h-screen">
      <div className="max-w-6xl mx-auto px-4 py-8">

        <div className="mb-8">
          <p className="text-[#FFD700] text-xs font-semibold uppercase tracking-widest mb-2">Business Promotions</p>
          <h1 className="text-3xl font-black text-theme-primary mb-1">Business Offers</h1>
          <p className="text-theme-secondary text-sm">{offers.length} offers available</p>
        </div>

        <div className="relative mb-8">
          <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-theme-muted" />
          <input type="text" placeholder="Search offers..."
            value={search} onChange={e => setSearch(e.target.value)}
            className="w-full max-w-md input-bg border border-theme rounded-xl pl-10 pr-4 py-3 text-theme-primary text-sm focus:border-[#FFD700]/60" />
        </div>

        {loading ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[...Array(6)].map((_, i) => <div key={i} className="bg-theme-card border border-theme rounded-2xl h-64 animate-pulse" />)}
          </div>
        ) : paginated.length === 0 ? (
          <div className="text-center py-20">
            <Tag size={40} className="text-theme-muted mx-auto mb-4" />
            <p className="text-theme-secondary">No offers found.</p>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {paginated.map(offer => (
              <div key={offer._id} className="card-hover bg-theme-card border border-theme rounded-2xl overflow-hidden flex flex-col">
                {offer.image
                  ? <div className="h-44 bg-theme-tertiary overflow-hidden"><img src={offer.image} alt={offer.title} className="w-full h-full object-contain p-4" /></div>
                  : <div className="h-44 bg-[#FFD700]/5 flex items-center justify-center"><Tag size={40} className="text-[#FFD700]/30" /></div>
                }
                <div className="p-5 flex flex-col gap-3 flex-1">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <TrendingUp size={12} className="text-[#FFD700]" />
                      <span className="text-[#FFD700] text-xs font-semibold">{offer.category}</span>
                    </div>
                    <h3 className="text-theme-primary font-bold text-base">{offer.title}</h3>
                    <p className="text-theme-muted text-xs mt-0.5">{offer.company}</p>
                  </div>
                  <p className="text-theme-secondary text-sm line-clamp-3 leading-relaxed">{offer.description}</p>
                  <button onClick={() => setPanel({ open: true, offer })}
                    className="mt-auto w-full py-2.5 rounded-xl font-bold text-sm bg-[#FFD700] text-[#0A0A0A] hover:bg-[#E6C200] transition">
                    Enquire Now
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-3 mt-10">
            <button onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page === 1}
              className="p-2 rounded-xl border border-theme text-theme-secondary hover:text-[#FFD700] disabled:opacity-30 transition">
              <ChevronLeft size={18} />
            </button>
            <span className="text-theme-secondary text-sm">{page} / {totalPages}</span>
            <button onClick={() => setPage(p => Math.min(totalPages, p + 1))} disabled={page === totalPages}
              className="p-2 rounded-xl border border-theme text-theme-secondary hover:text-[#FFD700] disabled:opacity-30 transition">
              <ChevronRight size={18} />
            </button>
          </div>
        )}

      </div>

      <LogoScroller label="Business Partners" accent="#FFD700" logoKey="businessLogos" />

      <SlidePanel
        open={panel.open} onClose={() => setPanel({ open: false, offer: null })}
        type="offer" refId={panel.offer?._id}
        refTitle={panel.offer ? `${panel.offer.title} by ${panel.offer.company}` : ''} />
    </div>
  )
}
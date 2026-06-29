import React, { useEffect, useState } from 'react'
import { Plane, ChevronLeft, ChevronRight } from 'lucide-react'
import api from '../../api'
import PopupForm from '../../components/PopupForm'

const PER_PAGE = 4

export default function StudyAbroad() {
  const [listings, setListings] = useState([])
  const [loading, setLoading]   = useState(true)
  const [page, setPage]         = useState(1)
  const [selected, setSelected] = useState(null)

  useEffect(() => {
    api.get('/study-abroad')
      .then(r => setListings(r.data))
      .catch(() => setListings([]))
      .finally(() => setLoading(false))
  }, [])

  const paginated  = listings.slice((page - 1) * PER_PAGE, page * PER_PAGE)
  const totalPages = Math.ceil(listings.length / PER_PAGE)

  return (
    <div className="page-enter bg-theme-primary min-h-screen">
      <div className="max-w-xl mx-auto px-4 py-8">

        {/* Heading */}
        <div className="flex items-center gap-4 mb-6">
          <div
            className="w-11 h-11 shrink-0 rounded-xl flex items-center justify-center"
            style={{ background: 'rgba(34,197,255,0.08)' }}
          >
            <Plane size={22} strokeWidth={1.5} style={{ color: '#22C5FF' }} />
          </div>
          <div>
            <h1 className="text-theme-primary font-semibold text-xl">Study + Work Abroad</h1>
          </div>
        </div>

        {/* Listings */}
        {loading ? (
          <div className="space-y-3">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="bg-theme-card border border-theme rounded-2xl p-5 h-28 animate-pulse" />
            ))}
          </div>
        ) : listings.length === 0 ? (
          <div className="bg-theme-card border border-theme rounded-2xl p-10 text-center text-theme-muted text-sm">
            No programs available at the moment. Check back soon!
          </div>
        ) : (
          <div className="space-y-3">
            {paginated.map(item => (
              <div
                key={item._id}
                className="bg-theme-card border border-theme rounded-2xl p-5 relative overflow-hidden"
              >
                <div className="absolute top-0 left-0 right-0 h-0.5" style={{ background: '#22C5FF' }} />

                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-start gap-3 flex-1 min-w-0">
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap mb-3">
                        <span
                          className="text-xs font-bold px-2 py-0.5 rounded-full"
                          style={{ background: 'rgba(34,197,255,0.12)', color: '#22C5FF' }}
                        >
                          {item.country}
                        </span>
                        <span className="text-theme-primary font-semibold text-sm">{item.program}</span>
                      </div>
                      <p className="text-theme-secondary text-sm leading-relaxed">{item.matter}</p>
                    </div>
                  </div>

                  <button
                    onClick={() => setSelected(item)}
                    className="shrink-0 px-4 py-2 rounded-xl font-bold text-xs transition"
                    style={{ background: '#22C5FF', color: '#0A0A0A' }}
                    onMouseEnter={e => e.currentTarget.style.background = '#00AAEE'}
                    onMouseLeave={e => e.currentTarget.style.background = '#22C5FF'}
                  >
                    Enquire
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-3 mt-8">
            <button
              onClick={() => setPage(p => Math.max(1, p - 1))}
              disabled={page === 1}
              className="p-2 rounded-xl border border-theme text-theme-secondary hover:text-[#22C5FF] hover:border-[#22C5FF]/50 disabled:opacity-30 transition"
            >
              <ChevronLeft size={18} />
            </button>
            <span className="text-sm text-theme-secondary">{page} / {totalPages}</span>
            <button
              onClick={() => setPage(p => Math.min(totalPages, p + 1))}
              disabled={page === totalPages}
              className="p-2 rounded-xl border border-theme text-theme-secondary hover:text-[#22C5FF] hover:border-[#22C5FF]/50 disabled:opacity-30 transition"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        )}

      </div>

      <PopupForm
        open={!!selected}
        onClose={() => setSelected(null)}
        type="study_abroad"
        jobType={null}
        refId={selected?._id}
        refTitle={selected ? `${selected.program} – ${selected.country}` : ''}
      />
    </div>
  )
}
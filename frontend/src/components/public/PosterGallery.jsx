import React, { useState, useEffect } from 'react'
import { createPortal } from 'react-dom'
import { Link } from 'react-router-dom'
import { ArrowLeft, Image as ImageIcon, X } from 'lucide-react'
import api from '../../api'

// Shared public gallery for the Visas and Freelance pages. Fetches only the
// active posters admin has published for the given category, shows them as
// a grid, and opens a larger preview popup on click. Read-only — no upload,
// edit, or delete affordances for public users.
export default function PosterGallery({ category, title, subtitle }) {
  const [posters, setPosters] = useState([])
  const [loading, setLoading] = useState(true)
  const [preview, setPreview] = useState(null)

  useEffect(() => {
    setLoading(true)
    api.get(`/posters/${category}`)
      .then(r => setPosters(r.data))
      .catch(() => setPosters([]))
      .finally(() => setLoading(false))
  }, [category])

  useEffect(() => {
    if (!preview) return
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const onKey = (e) => { if (e.key === 'Escape') setPreview(null) }
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = prevOverflow
      window.removeEventListener('keydown', onKey)
    }
  }, [preview])

  return (
    <div className="page-enter bg-theme-primary min-h-screen">
      <div className="max-w-6xl mx-auto px-4 py-8">
        {loading ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
            {[...Array(10)].map((_, i) => (
              <div key={i} className="bg-theme-card border border-theme rounded-2xl h-44 animate-pulse" />
            ))}
          </div>
        ) : posters.length === 0 ? (
          <div className="text-center py-20">
            <ImageIcon size={40} className="text-gray-400 mx-auto mb-4" />
            <p className="text-theme-secondary">No posters available yet. Check back soon.</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
            {posters.map(p => (
              <button
                key={p._id}
                onClick={() => setPreview(p)}
                className="bg-theme-card border border-theme rounded-2xl overflow-hidden card-hover text-left"
              >
                <div className="relative h-40 sm:h-48 bg-black/20 w-full overflow-hidden">
                  <img src={p.imageUrl} alt={p.title || title} className="w-full h-full object-cover" />
                </div>
                {/* {p.title && (
                  <p className="text-theme-primary font-semibold text-xs p-2.5 line-clamp-2">{p.title}</p>
                )} */}
              </button>
            ))}
          </div>
        )}
      </div>

      {preview && createPortal(
        <div
          className="fixed inset-0 z-[999] bg-black/90 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto"
          onClick={() => setPreview(null)}
        >
          <button
            className="fixed top-4 right-4 sm:top-5 sm:right-5 w-10 h-10 flex items-center justify-center rounded-full bg-black/60 border border-white/20 text-white hover:bg-black/80 hover:border-white/40 transition z-[1000]"
            onClick={() => setPreview(null)}
            aria-label="Close preview"
          >
            <X size={20} />
          </button>
          <div
            className="flex flex-col items-center w-full my-auto"
            style={{ maxWidth: 'min(92vw, 700px)' }}
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={preview.imageUrl}
              alt={preview.title || title}
              style={{ width: '100%', maxHeight: '80dvh', objectFit: 'contain' }}
              className="rounded-xl"
            />
            {preview.title && (
              <p className="text-white text-sm font-medium text-center mt-3 line-clamp-2 px-2">{preview.title}</p>
            )}
          </div>
        </div>,
        document.body
      )}
    </div>
  )
}
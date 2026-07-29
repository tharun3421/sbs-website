import React, { useEffect } from 'react'
import { X, Download, Share2 } from 'lucide-react'

export default function MediaPopup({ resource, onClose, onDownload, onShare }) {
  useEffect(() => {
    if (!resource) return
    const prevHtml = document.documentElement.style.overflow
    const prevBody = document.body.style.overflow
    document.documentElement.style.overflow = 'hidden'
    document.body.style.overflow = 'hidden'

    const onKey = (e) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', onKey)

    return () => {
      document.documentElement.style.overflow = prevHtml
      document.body.style.overflow = prevBody
      window.removeEventListener('keydown', onKey)
    }
  }, [resource, onClose])

  if (!resource) return null

  return (
    <div
      className="fixed inset-0 z-[999] bg-black/90 backdrop-blur-sm flex items-center justify-center"
      style={{ width: '100vw', height: '90dvh' }}
      onClick={onClose}
    >
      <button className="absolute top-5 right-5 text-white/80 hover:text-white p-2 z-10" onClick={onClose} aria-label="Close preview">
        <X size={22} />
      </button>

      <div
        className="flex flex-col items-center"
        style={{ width: 'min(82vw, 620px)', maxHeight: '80dvh' }}
        onClick={(e) => e.stopPropagation()}
      >
        {resource.type === 'video' ? (
          <video
            src={resource.url}
            controls
            autoPlay
            playsInline
            style={{ width: '100%', maxHeight: '72dvh', objectFit: 'contain' }}
            className="rounded-xl bg-black"
          />
        ) : (
          <img
            src={resource.url}
            alt={resource.title}
            style={{ width: '100%', maxHeight: '72dvh', objectFit: 'contain' }}
            className="rounded-xl"
          />
        )}

        <p className="text-white text-sm font-medium text-center mt-3 line-clamp-1">{resource.title}</p>

        <div className="flex justify-center gap-3 mt-3">
          <button onClick={() => onDownload(resource)} className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-[#FFD700] text-[#0A0A0A] text-xs font-bold hover:bg-[#FFE44D] transition">
            <Download size={13} /> Download
          </button>
          <button onClick={() => onShare(resource)} className="flex items-center gap-1.5 px-4 py-2 rounded-lg border border-white/30 text-white text-xs font-semibold hover:border-white/60 transition">
            <Share2 size={13} /> Share
          </button>
        </div>
      </div>
    </div>
  )
}
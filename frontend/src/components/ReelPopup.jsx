import React, { useEffect } from 'react'
import { createPortal } from 'react-dom'
import { X } from 'lucide-react'

export default function ReelPopup({ job, onClose }) {
  useEffect(() => {
    if (!job) return
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
  }, [job, onClose])

  if (!job) return null

  // Portal to <body> — keeps this truly fixed to the viewport regardless of
  // any transformed/animated ancestor (e.g. the page's .page-enter wrapper).
  return createPortal(
    <div
      className="fixed inset-0 z-[999] bg-black/90 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto"
      onClick={onClose}
    >
      <button
        className="fixed top-4 right-4 sm:top-5 sm:right-5 w-10 h-10 flex items-center justify-center rounded-full bg-black/60 border border-white/20 text-white hover:bg-black/80 hover:border-white/40 transition z-[1000]"
        onClick={onClose}
        aria-label="Close video"
      >
        <X size={20} />
      </button>

      <div
        className="relative flex flex-col items-center w-full my-auto"
        style={{ maxWidth: 'min(92vw, 420px)' }}
        onClick={(e) => e.stopPropagation()}
      >
        <p className="text-white font-semibold text-sm text-center mb-3 px-2 line-clamp-1">
          {job.title} @ {job.company}
        </p>

        <video
          src={job.reelUrl}
          controls
          autoPlay
          playsInline
          style={{ width: '100%', maxHeight: '72dvh', objectFit: 'contain' }}
          className="rounded-xl bg-black"
        />
      </div>
    </div>,
    document.body
  )
}
import React, { useEffect } from 'react'
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

  return (
    <div
      className="fixed inset-0 z-[999] bg-black/90 backdrop-blur-sm flex items-center justify-center"
      style={{ width: '100vw', height: '90dvh' }}
      onClick={onClose}
    >
      <div
        className="relative flex flex-col items-center"
        style={{ width: 'min(92vw, 420px)', maxHeight: '90dvh' }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between w-full mb-3">
          <p className="text-white font-semibold text-sm truncate pr-2">
            {job.title} @ {job.company}
          </p>
          <button onClick={onClose} className="text-white/70 hover:text-white p-1 shrink-0" aria-label="Close video">
            <X size={20} />
          </button>
        </div>

        <video
          src={job.reelUrl}
          controls
          autoPlay
          playsInline
          style={{ width: '100%', maxHeight: '80dvh', objectFit: 'contain' }}
          className="rounded-xl bg-black"
        />
      </div>
    </div>
  )
}
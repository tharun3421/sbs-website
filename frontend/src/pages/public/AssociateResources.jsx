import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { ArrowLeft, Download, Share2, X, Image as ImageIcon, Video as VideoIcon } from 'lucide-react'
import api from '../../api'
import toast from 'react-hot-toast'
import MediaPopup from '../../components/MediaPopup'

export default function AssociateResources() {
  const [resources, setResources] = useState([])
  const [loading, setLoading]     = useState(true)
  const [preview, setPreview]     = useState(null)

  useEffect(() => {
    api.get('/resources')
      .then(r => setResources(r.data))
      .catch(() => setResources([]))
      .finally(() => setLoading(false))
  }, [])

  const videos = resources.filter(r => r.type === 'video')
  const images = resources.filter(r => r.type === 'image')

  useEffect(() => {
    if (preview) {
      const prevOverflow = document.body.style.overflow
      document.body.style.overflow = 'hidden'
      return () => { document.body.style.overflow = prevOverflow }
    }
  }, [preview])

  const handleDownload = async (resource) => {
    try {
      const res = await fetch(resource.url)
      const blob = await res.blob()
      const url = window.URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = resource.title || 'resource'
      document.body.appendChild(a)
      a.click()
      a.remove()
      window.URL.revokeObjectURL(url)
    } catch {
      window.open(resource.url, '_blank')
    }
  }

  const handleShare = async (resource) => {
    if (navigator.share) {
      try {
        await navigator.share({ title: resource.title, url: resource.url })
      } catch {}
      return
    }
    try {
      await navigator.clipboard.writeText(resource.url)
      toast.success('Link copied to clipboard')
    } catch {
      toast.error('Could not copy link')
    }
  }

  return (
    <div className="page-enter bg-theme-primary min-h-screen">
      <div className="max-w-6xl mx-auto px-4 py-8">

        {/* <Link to="/" className="inline-flex items-center gap-1.5 text-theme-secondary hover:text-[#FFD700] text-sm font-medium mb-6 transition-colors">
          <ArrowLeft size={15} /> Back to Home
        </Link> */}

        {/* <h1 className="text-theme-primary font-black text-2xl mb-1">Associate Resources</h1> */}
        {/* <p className="text-theme-secondary text-sm mb-8">Posters, images, and videos for our associates. View, download, or share.</p> */}

        {loading ? (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="bg-theme-card border border-theme rounded-2xl h-64 animate-pulse" />
            ))}
          </div>
        ) : resources.length === 0 ? (
          <div className="text-center py-20">
            <ImageIcon size={40} className="text-gray-400 mx-auto mb-4" />
            <p className="text-theme-secondary">No resources available yet.</p>
          </div>
        ) : (
          <>
            {videos.length > 0 && (
              <div className="mb-10">
                <h2 className="text-theme-primary font-bold text-base mb-4 flex items-center gap-2">
                  <VideoIcon size={16} className="text-[#FFD700]" /> Videos
                </h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {videos.map(r => (
                    <ResourceCard key={r._id} resource={r} onPreview={setPreview} onDownload={handleDownload} onShare={handleShare} compact />
                  ))}
                </div>
              </div>
            )}

            {images.length > 0 && (
              <div>
                <h2 className="text-theme-primary font-bold text-base mb-4 flex items-center gap-2">
                  <ImageIcon size={16} className="text-[#FFD700]" /> Images & Posters
                </h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {images.map(r => (
                    <ResourceCard key={r._id} resource={r} onPreview={setPreview} onDownload={handleDownload} onShare={handleShare} />
                  ))}
                </div>
              </div>
            )}
          </>
        )}
      </div>

      {/* Lightbox preview */}
      {/* {preview && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm overflow-hidden" onClick={() => setPreview(null)}>
          <button className="absolute top-5 right-5 text-white/80 hover:text-white p-2" onClick={() => setPreview(null)}>
            <X size={22} />
          </button>
          <div
            className="max-w-3xl w-full h-full max-h-[90vh] flex flex-col items-center justify-center gap-3"
            onClick={e => e.stopPropagation()}
          >
            <div className="flex-1 min-h-0 w-full flex items-center justify-center">
              {preview.type === 'video' ? (
                <video src={preview.url} controls autoPlay className="max-w-full max-h-full rounded-xl bg-black" />
              ) : (
                <img src={preview.url} alt={preview.title} className="max-w-full max-h-full object-contain rounded-xl" />
              )}
            </div>
            <p className="text-white text-sm font-medium text-center shrink-0 line-clamp-1">{preview.title}</p>
            <div className="flex justify-center gap-3 shrink-0">
              <button onClick={() => handleDownload(preview)}
                className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-[#FFD700] text-[#0A0A0A] text-xs font-bold hover:bg-[#FFE44D] transition">
                <Download size={13} /> Download
              </button>
              <button onClick={() => handleShare(preview)}
                className="flex items-center gap-1.5 px-4 py-2 rounded-lg border border-white/30 text-white text-xs font-semibold hover:border-white/60 transition">
                <Share2 size={13} /> Share
              </button>
            </div>
          </div>
        </div>
      )} */}

      {/* Lightbox preview */}
  <MediaPopup
    resource={preview}
    onClose={() => setPreview(null)}
    onDownload={handleDownload}
    onShare={handleShare}
  />
    </div>
  )
}

function ResourceCard({ resource: r, onPreview, onDownload, onShare, compact = false }) {
  return (
    <div className="bg-theme-card border border-theme rounded-2xl overflow-hidden flex flex-col card-hover">
      <button
        onClick={() => onPreview(r)}
        className={`relative ${compact ? 'aspect-[4/3]' : 'aspect-video'} bg-black/20 w-full`}
      >
        {r.type === 'video' ? (
          <video src={r.url} className="w-full h-full object-cover" muted />
        ) : (
          <img src={r.url} alt={r.title} className="w-full h-full object-cover" />
        )}
        <span className="absolute top-1.5 right-1.5 bg-black/60 text-white text-[9px] font-semibold px-1.5 py-0.5 rounded-full flex items-center gap-1">
          {r.type === 'video' ? <VideoIcon size={9} /> : <ImageIcon size={9} />}
          {r.type}
        </span>
      </button>
      <div className={`${compact ? 'p-2.5 gap-2' : 'p-4 gap-3'} flex flex-col flex-1`}>
        <p className={`text-theme-primary font-semibold ${compact ? 'text-xs' : 'text-sm'} line-clamp-2`}>{r.title}</p>
        <div className="flex gap-1.5 mt-auto">
          <button onClick={() => onDownload(r)}
            className={`flex-1 flex items-center justify-center gap-1.5 rounded-lg bg-[#FFD700] text-[#0A0A0A] font-bold hover:bg-[#FFE44D] transition ${compact ? 'py-1.5 text-[11px]' : 'py-2 text-xs'}`}>
            <Download size={compact ? 11 : 13} /> Download
          </button>
          <button onClick={() => onShare(r)}
            title="Share"
            className={`flex items-center justify-center rounded-lg border border-theme text-theme-secondary font-semibold hover:text-theme-primary hover:border-theme-gold transition ${compact ? 'px-2 py-1.5' : 'px-3 py-2 text-xs'}`}>
            <Share2 size={compact ? 11 : 13} />
          </button>
        </div>
      </div>
    </div>
  )
}
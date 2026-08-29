import React, { useState, useEffect, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { ArrowLeft, Download, Share2, X, Image as ImageIcon, Video as VideoIcon, Link2, Youtube, Instagram, Facebook, MessageCircle, ExternalLink } from 'lucide-react'
import api from '../../api'
import toast from 'react-hot-toast'
import MediaPopup from '../../components/MediaPopup'
import { RESOURCE_CATEGORY_LABELS } from '../../constants/coreServices'

const platformIcon = (platform, size = 14) => {
  switch (platform) {
    case 'YouTube': return <Youtube size={size} />
    case 'Instagram': return <Instagram size={size} />
    case 'Facebook': return <Facebook size={size} />
    case 'WhatsApp': return <MessageCircle size={size} />
    default: return <Link2 size={size} />
  }
}

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

  // Categories on this page are the resource categories (core services plus
  // any resource-only categories like Freelancer/WFH), in a fixed order. A
  // resource only shows up here if its category matches one of these.
  const grouped = useMemo(() => {
    return RESOURCE_CATEGORY_LABELS
      .map(label => [label, resources.filter(r => r.category === label)])
      .filter(([, items]) => items.length > 0)
  }, [resources])

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

        {loading ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
            {[...Array(10)].map((_, i) => (
              <div key={i} className="bg-theme-card border border-theme rounded-2xl h-44 animate-pulse" />
            ))}
          </div>
        ) : resources.length === 0 ? (
          <div className="text-center py-20">
            <ImageIcon size={40} className="text-gray-400 mx-auto mb-4" />
            <p className="text-theme-secondary">No resources available yet.</p>
          </div>
        ) : (
          <div className="space-y-12">
            {grouped.map(([category, items]) => {
              const videos = items.filter(r => r.type === 'video')
              const images = items.filter(r => r.type === 'image')
              const links  = items.filter(r => r.type === 'link')

              return (
                <div key={category}>
                  <h1 className="text-theme-primary font-black text-xl mb-5 pb-2 border-b border-theme">{category}</h1>

                  {videos.length > 0 && (
                    <div className="mb-10">
                      <h2 className="text-theme-primary font-bold text-base mb-4 flex items-center gap-2">
                        <VideoIcon size={16} className="text-[#FFD700]" /> Videos
                      </h2>
                      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
                        {videos.map(r => (
                          <ResourceCard key={r._id} resource={r} onPreview={setPreview} onDownload={handleDownload} onShare={handleShare} compact />
                        ))}
                      </div>
                    </div>
                  )}

                  {images.length > 0 && (
                    <div className="mb-10">
                      <h2 className="text-theme-primary font-bold text-base mb-4 flex items-center gap-2">
                        <ImageIcon size={16} className="text-[#FFD700]" /> Images & Posters
                      </h2>
                      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
                        {images.map(r => (
                          <ResourceCard key={r._id} resource={r} onPreview={setPreview} onDownload={handleDownload} onShare={handleShare} />
                        ))}
                      </div>
                    </div>
                  )}

                  {links.length > 0 && (
                    <div>
                      <h2 className="text-theme-primary font-bold text-base mb-4 flex items-center gap-2">
                        <Link2 size={16} className="text-[#FFD700]" /> Social Links
                      </h2>
                      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                        {links.map(r => (
                          <a key={r._id} href={r.url} target="_blank" rel="noreferrer"
                            className="bg-theme-card border border-theme rounded-2xl p-4 flex items-center gap-3 card-hover">
                            <span className="w-10 h-10 rounded-xl bg-[#FFD700]/10 text-[#FFD700] flex items-center justify-center shrink-0">
                              {platformIcon(r.platform, 18)}
                            </span>
                            <div className="min-w-0 flex-1">
                              <p className="text-theme-primary font-semibold text-sm line-clamp-1">{r.title}</p>
                              <p className="text-theme-muted text-xs">{r.platform || 'Link'}</p>
                            </div>
                            <ExternalLink size={14} className="text-theme-muted shrink-0" />
                          </a>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        )}
      </div>

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
        className={`relative ${compact ? 'h-28 sm:h-32' : 'h-32 sm:h-36'} bg-black/20 w-full overflow-hidden`}
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
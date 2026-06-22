import React, { useEffect, useState } from 'react'
import api from '../api'

export default function LogoScroller({ label = 'Our Partners', accent = '#FFD700', logoKey = 'jobLogos' }) {
  const [logos, setLogos] = useState([])

  useEffect(() => {
    api.get('/settings')
      .then(r => {
        const all = r.data.partnerLogos || {}
        setLogos(Array.isArray(all[logoKey]) ? all[logoKey] : [])
      })
      .catch(() => setLogos([]))
  }, [logoKey])

  if (!logos.length) return null

  // Repeat until we have at least 10 tiles before splitting
  let items = [...logos]
  while (items.length < 10) items = [...items, ...logos]

  // Slice into two equal halves instead of odd/even
  const mid = Math.ceil(items.length / 2)
  const row1 = items.slice(0, mid)
  const row2 = items.slice(mid)

  const Tile = ({ item }) => (
    <div
      className="shrink-0 flex items-center gap-2.5 bg-theme-card border border-theme rounded-xl px-4 py-2.5 mx-2 hover:border-[#FFD700]/40 transition-colors"
      title={item.name}
    >
      {item.logo ? (
        <img
          src={item.logo}
          alt={item.name}
          className="w-7 h-7 object-contain rounded bg-white p-0.5 shrink-0"
          loading="lazy"
        />
      ) : (
        <div
          className="w-7 h-7 rounded flex items-center justify-center text-xs font-black shrink-0"
          style={{ background: `${accent}18`, color: accent }}
        >
          {item.name[0]?.toUpperCase()}
        </div>
      )}
      <span className="text-theme-secondary text-xs font-medium whitespace-nowrap max-w-[110px] truncate">
        {item.name}
      </span>
    </div>
  )

  const Row = ({ tiles, dir }) => (
    <div
      className="w-full overflow-hidden"
      style={{
        WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 80px, black calc(100% - 80px), transparent 100%)',
        maskImage: 'linear-gradient(to right, transparent 0%, black 80px, black calc(100% - 80px), transparent 100%)',
      }}
    >
      <div className={dir === 'left' ? 'logo-scroll-left flex w-max' : 'logo-scroll-right flex w-max'}>
        {[...tiles, ...tiles, ...tiles, ...tiles].map((item, i) => (
          <Tile key={i} item={item} />
        ))}
      </div>
    </div>
  )

  return (
    <div className="w-full mt-12 mb-6">
      <div className="max-w-6xl mx-auto px-4 mb-5">
        <div className="flex items-center gap-3">
          <div className="w-1.5 h-1.5 rounded-full shrink-0" style={{ background: accent }} />
          <p className="text-xs font-semibold uppercase tracking-widest" style={{ color: accent }}>
            {label}
          </p>
          <div className="flex-1 h-px opacity-20" style={{ background: accent }} />
        </div>
      </div>
      <div className="space-y-3">
        <Row tiles={row1} dir="left" />
        <Row tiles={row2} dir="right" />
      </div>
    </div>
  )
}
import React, { useEffect, useRef, useState } from 'react'
import { Phone } from 'lucide-react'

// ⬇️ Set your single business number here (with country code)
const PHONE_NUMBER = '+91 6303669344'

const SIZE = 56           // button diameter (w-14/h-14 = 56px)
const EDGE_MARGIN = 16    // min gap kept from viewport edges
const DRAG_THRESHOLD = 6  // px of movement before a press counts as a drag, not a tap
const STORAGE_KEY = 'sbs-call-btn-pos'

// Default position: bottom-right, sitting above the sticky footer ticker
function getDefaultPos() {
  return {
    x: window.innerWidth - SIZE - EDGE_MARGIN,
    y: window.innerHeight - SIZE - EDGE_MARGIN - 40,
  }
}

function clamp(pos) {
  const maxX = window.innerWidth - SIZE - EDGE_MARGIN
  const maxY = window.innerHeight - SIZE - EDGE_MARGIN
  return {
    x: Math.min(Math.max(pos.x, EDGE_MARGIN), Math.max(maxX, EDGE_MARGIN)),
    y: Math.min(Math.max(pos.y, EDGE_MARGIN), Math.max(maxY, EDGE_MARGIN)),
  }
}

/**
 * Floating "Call Now" button.
 * Draggable anywhere on screen (mouse + touch), remembers its last
 * position across page loads, and still opens the dialer on a plain tap/click.
 */
export default function FloatingCallButton() {
  const dialNumber = PHONE_NUMBER.replace(/[^\d+]/g, '')

  const [pos, setPos] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY)
      if (saved) return clamp(JSON.parse(saved))
    } catch {}
    return getDefaultPos()
  })

  const draggingRef = useRef(false)
  const movedRef = useRef(false)
  const startRef = useRef({ x: 0, y: 0, posX: 0, posY: 0 })

  // Keep the button on-screen if the window is resized (e.g. orientation change)
  useEffect(() => {
    const onResize = () => setPos(p => clamp(p))
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  const savePos = (next) => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next))
    } catch {}
  }

  const handlePointerDown = (e) => {
    draggingRef.current = true
    movedRef.current = false
    const point = e.touches ? e.touches[0] : e
    startRef.current = { x: point.clientX, y: point.clientY, posX: pos.x, posY: pos.y }
    window.addEventListener('mousemove', handlePointerMove)
    window.addEventListener('mouseup', handlePointerUp)
    window.addEventListener('touchmove', handlePointerMove, { passive: false })
    window.addEventListener('touchend', handlePointerUp)
  }

  const handlePointerMove = (e) => {
    if (!draggingRef.current) return
    const point = e.touches ? e.touches[0] : e
    const dx = point.clientX - startRef.current.x
    const dy = point.clientY - startRef.current.y

    if (!movedRef.current && Math.hypot(dx, dy) > DRAG_THRESHOLD) {
      movedRef.current = true
    }
    if (movedRef.current) {
      if (e.cancelable) e.preventDefault()
      const next = clamp({ x: startRef.current.posX + dx, y: startRef.current.posY + dy })
      setPos(next)
    }
  }

  const handlePointerUp = () => {
    draggingRef.current = false
    window.removeEventListener('mousemove', handlePointerMove)
    window.removeEventListener('mouseup', handlePointerUp)
    window.removeEventListener('touchmove', handlePointerMove)
    window.removeEventListener('touchend', handlePointerUp)
    setPos(p => {
      savePos(p)
      return p
    })
  }

  const handleClick = (e) => {
    // A drag just happened — swallow the click so it doesn't also dial
    if (movedRef.current) {
      e.preventDefault()
      movedRef.current = false
    }
  }

  return (
    <a
      href={`tel:${dialNumber}`}
      title={`Call us: ${PHONE_NUMBER}`}
      aria-label={`Call us at ${PHONE_NUMBER}`}
      onMouseDown={handlePointerDown}
      onTouchStart={handlePointerDown}
      onClick={handleClick}
      draggable={false}
      className="fixed z-[60] flex items-center justify-center w-14 h-14 rounded-full bg-[#25D366] text-white shadow-lg shadow-black/30 hover:bg-[#1EBE57] active:scale-95 transition-transform duration-150 pulse-call cursor-grab active:cursor-grabbing select-none touch-none"
      style={{ left: pos.x, top: pos.y }}
    >
      <Phone size={24} strokeWidth={2.25} fill="white" />
    </a>
  )
}
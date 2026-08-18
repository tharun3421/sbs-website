import React from 'react'
import { Phone } from 'lucide-react'

// ⬇️ Set your single business number here (with country code)
const PHONE_NUMBER = '+91 6303669344'

/**
 * Floating "Call Now" button.
 * Fixed to the bottom-right of the viewport on every public page,
 * sitting just above the sticky city-ticker footer.
 * Tapping/clicking it opens the device dialer via a tel: link.
 */
export default function FloatingCallButton() {
  // tel: links need a "dial-safe" number — strip spaces/dashes/brackets, keep leading +
  const dialNumber = PHONE_NUMBER.replace(/[^\d+]/g, '')

  return (
    <a
      href={`tel:${dialNumber}`}
      title={`Call us: ${PHONE_NUMBER}`}
      aria-label={`Call us at ${PHONE_NUMBER}`}
      className="fixed right-4 z-[60] flex items-center justify-center w-14 h-14 rounded-full bg-[#25D366] text-white shadow-lg shadow-black/30 hover:bg-[#1EBE57] active:scale-95 transition-all duration-200 pulse-call"
      style={{ bottom: 'calc(40px + 16px)' }}
    >
      <Phone size={24} strokeWidth={2.25} fill="white" />
    </a>
  )
}
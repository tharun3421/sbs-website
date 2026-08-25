import React from 'react'
import { Outlet } from 'react-router-dom'

// Renders inside the shared PublicLayout (navbar + contact ticker already
// provided there). This is deliberately thin: no sidebar, no extra chrome —
// just the protected page content, consistently padded.
export default function AssociateLayout() {
  return (
    <div
      className="page-enter bg-theme-primary max-w-6xl w-full mx-auto px-4 py-6 md:py-8"
      style={{ minHeight: 'calc(100vh - 64px - 40px)' }}
    >
      <Outlet />
    </div>
  )
}
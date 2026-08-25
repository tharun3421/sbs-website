import React, { useEffect } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'

export default function AssociateRoute({ children }) {
  const navigate = useNavigate()
  const token = localStorage.getItem('sbs_associate_token')

  useEffect(() => {
    // Covers the browser-back edge case: if the page is restored from the
    // back-forward cache (bfcache) after the associate has logged out,
    // `pageshow` fires with `persisted: true` without React re-mounting.
    // Force a re-check and bounce to login if the session is gone.
    const handlePageShow = (e) => {
      const stillValid = localStorage.getItem('sbs_associate_token')
      if (e.persisted && !stillValid) {
        navigate('/associate/login', { replace: true })
      }
    }
    window.addEventListener('pageshow', handlePageShow)
    return () => window.removeEventListener('pageshow', handlePageShow)
  }, [navigate])

  if (!token) return <Navigate to="/associate/login" replace />
  return children
}
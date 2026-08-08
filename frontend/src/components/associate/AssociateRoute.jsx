import React from 'react'
import { Navigate } from 'react-router-dom'

export default function AssociateRoute({ children }) {
  const token = localStorage.getItem('sbs_associate_token')
  if (!token) return <Navigate to="/associate/login" replace />
  return children
}
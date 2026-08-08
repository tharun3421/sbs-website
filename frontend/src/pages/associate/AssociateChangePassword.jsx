import React, { useState } from 'react'
import { useNavigate, Navigate } from 'react-router-dom'
import { KeyRound, Eye, EyeOff } from 'lucide-react'
import { associateApi } from '../../api'
import toast from 'react-hot-toast'

export default function AssociateChangePassword() {
  const [form, setForm] = useState({ currentPassword: '', newPassword: '', confirmPassword: '' })
  const [show, setShow] = useState(false)
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const token = localStorage.getItem('sbs_associate_token')
  if (!token) return <Navigate to="/associate/login" replace />

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (form.newPassword.length < 6) {
      toast.error('New password must be at least 6 characters')
      return
    }
    if (form.newPassword !== form.confirmPassword) {
      toast.error('New password and confirm password do not match')
      return
    }
    setLoading(true)
    try {
      const res = await associateApi.post('/associate/change-password', form)
      localStorage.setItem('sbs_associate_token', res.data.token)
      localStorage.setItem('sbs_associate', JSON.stringify(res.data.associate))
      toast.success('Password updated successfully')
      navigate('/associate')
    } catch (err) {
      toast.error(err?.response?.data?.message || 'Failed to update password')
    } finally { setLoading(false) }
  }

  return (
    <div className="flex justify-center py-6">
      <div className="w-full max-w-sm">
        <div className="text-center mb-6">
          <div className="w-12 h-12 rounded-xl bg-[#FFD700]/10 flex items-center justify-center mx-auto mb-3">
            <KeyRound size={20} className="text-[#FFD700]" />
          </div>
          <h1 className="text-theme-primary font-bold text-xl">Change Password</h1>
          <p className="text-theme-secondary text-sm mt-1">Update your account password anytime.</p>
        </div>

        <div className="bg-theme-card border border-theme rounded-2xl p-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="text-theme-secondary text-xs font-semibold uppercase tracking-wide mb-2 block">Current Password</label>
              <div className="relative">
                <input type={show ? 'text' : 'password'} placeholder="Current password" value={form.currentPassword}
                  onChange={e => setForm(f => ({ ...f, currentPassword: e.target.value }))}
                  className="w-full input-bg border border-theme rounded-xl pl-4 pr-10 py-3 text-theme-primary text-sm placeholder-theme-muted focus:border-[#FFD700]/60" required />
              </div>
            </div>
            <div>
              <label className="text-theme-secondary text-xs font-semibold uppercase tracking-wide mb-2 block">New Password</label>
              <div className="relative">
                <input type={show ? 'text' : 'password'} placeholder="At least 6 characters" value={form.newPassword}
                  onChange={e => setForm(f => ({ ...f, newPassword: e.target.value }))}
                  className="w-full input-bg border border-theme rounded-xl pl-4 pr-10 py-3 text-theme-primary text-sm placeholder-theme-muted focus:border-[#FFD700]/60" required />
              </div>
            </div>
            <div>
              <label className="text-theme-secondary text-xs font-semibold uppercase tracking-wide mb-2 block">Confirm New Password</label>
              <div className="relative">
                <input type={show ? 'text' : 'password'} placeholder="Re-enter new password" value={form.confirmPassword}
                  onChange={e => setForm(f => ({ ...f, confirmPassword: e.target.value }))}
                  className="w-full input-bg border border-theme rounded-xl pl-4 pr-10 py-3 text-theme-primary text-sm placeholder-theme-muted focus:border-[#FFD700]/60" required />
              </div>
            </div>
            <button type="button" onClick={() => setShow(s => !s)}
              className="flex items-center gap-1.5 text-theme-muted hover:text-theme-secondary text-xs">
              {show ? <EyeOff size={13} /> : <Eye size={13} />} {show ? 'Hide' : 'Show'} passwords
            </button>
            <button type="submit" disabled={loading}
              className="w-full bg-[#FFD700] text-[#0A0A0A] font-bold py-3.5 rounded-xl hover:bg-[#E6C200] transition mt-2 disabled:opacity-70">
              {loading ? 'Updating...' : 'Update Password'}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
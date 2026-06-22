import React, { useState } from 'react'
import { X, CheckCircle, Upload, User, Phone } from 'lucide-react'
import api from '../api'
import toast from 'react-hot-toast'

export default function SlidePanel({ open, onClose, type, refId, refTitle }) {
  const [form, setForm] = useState({ name: '', mobile: '' })
  const [resume, setResume] = useState(null)
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const isJob = type === 'job'

  const MAX_RESUME_MB = 5
  const ALLOWED_RESUME_TYPES = ['.pdf', '.doc', '.docx']

  const handleResumeChange = (e) => {
    const file = e.target.files[0]
    if (!file) return
    const ext = '.' + file.name.split('.').pop().toLowerCase()
    if (!ALLOWED_RESUME_TYPES.includes(ext)) {
      toast.error('Only PDF, DOC, or DOCX files are allowed')
      e.target.value = ''
      return
    }
    if (file.size > MAX_RESUME_MB * 1024 * 1024) {
      toast.error(`File is too large. Max size is ${MAX_RESUME_MB}MB`)
      e.target.value = ''
      return
    }
    setResume(file)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!form.name || !form.mobile) return toast.error('Please fill all fields')
    if (form.mobile.length < 10) return toast.error('Enter valid mobile number')
    setLoading(true)
    try {
      if (isJob) {
        const fd = new FormData()
        fd.append('name', form.name); fd.append('mobile', form.mobile)
        fd.append('refId', refId); fd.append('refTitle', refTitle); fd.append('type', type)
        if (resume) fd.append('resume', resume)
        await api.post('/applications/apply', fd)
      } else {
        await api.post('/applications/enquire', { name: form.name, mobile: form.mobile, refId, refTitle, type })
      }
      setSuccess(true)
    } catch (err) {
      const msg = err?.response?.data?.message || 'Submission failed. Please try again.'
      toast.error(msg)
    }
    finally { setLoading(false) }
  }

  const handleClose = () => {
    setForm({ name:'', mobile:'' }); setResume(null); setSuccess(false); onClose()
  }

  const panelBg   = 'bg-theme-secondary'
  const headerBg  = 'bg-theme-tertiary'
  const inputCls  = 'w-full input-bg border border-theme rounded-xl px-4 py-3 text-theme-primary text-sm placeholder-theme-muted focus:border-[#FFD700]/60'
  const labelCls  = 'text-theme-secondary text-xs font-semibold uppercase tracking-wide mb-2 flex items-center gap-2'

  return (
    <>
      {open && <div className="fixed inset-0 bg-black/60 z-[70] backdrop-blur-sm" onClick={handleClose} />}
      <div className={`fixed right-0 top-0 h-full w-full max-w-md ${panelBg} z-[80] shadow-2xl flex flex-col
        transition-transform duration-350 ease-in-out ${open ? 'translate-x-0' : 'translate-x-full'}`}>

        <div className={`p-6 border-b border-theme flex items-center justify-between ${headerBg}`}>
          <div>
            <p className="text-[#FFD700] text-xs font-semibold uppercase tracking-widest mb-0.5">
              {isJob ? 'Apply Now' : 'Enquire Now'}
            </p>
            <h3 className="text-theme-primary font-bold text-base leading-snug line-clamp-2">{refTitle}</h3>
          </div>
          <button onClick={handleClose} className="text-theme-muted hover:text-theme-primary p-2 rounded-lg hover:bg-theme-tertiary transition">
            <X size={18} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6">
          {success ? (
            <div className="flex flex-col items-center justify-center h-full text-center gap-4">
              <div className="w-20 h-20 rounded-full bg-[#FFD700]/10 flex items-center justify-center">
                <CheckCircle size={40} className="text-[#FFD700]" />
              </div>
              <h3 className="text-theme-primary font-bold text-xl">{isJob ? 'Application Sent!' : 'Enquiry Received!'}</h3>
              <p className="text-theme-secondary text-sm leading-relaxed">
                Our team will contact you at <span className="text-[#FFD700]">{form.mobile}</span> within 24 hours.
              </p>
              <button onClick={handleClose} className="mt-4 bg-[#FFD700] text-[#0A0A0A] font-bold px-8 py-3 rounded-xl hover:bg-[#E6C200] transition">Done</button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <p className="text-theme-secondary text-sm">
                {isJob ? 'Fill the form to apply. Our recruitment team will reach out.' : 'Leave your details and our team will call you.'}
              </p>
              <div>
                <label className={labelCls}><User size={12} /> Full Name</label>
                <input type="text" placeholder="Enter your full name" value={form.name}
                  onChange={e => setForm(f => ({ ...f, name: e.target.value }))} className={inputCls} required />
              </div>
              <div>
                <label className={labelCls}><Phone size={12} /> Mobile Number</label>
                <input type="tel" placeholder="10-digit mobile number" value={form.mobile} maxLength={10}
                  onChange={e => setForm(f => ({ ...f, mobile: e.target.value.replace(/\D/g,'') }))} className={inputCls} required />
              </div>
              {isJob && (
                <div>
                  <label className={labelCls}><Upload size={12} /> Resume (Optional, max 5MB)</label>
                  <label className="flex flex-col items-center justify-center w-full h-28 border-2 border-dashed border-theme rounded-xl cursor-pointer hover:border-[#FFD700]/50 transition input-bg">
                    <Upload size={20} className="text-theme-muted mb-2" />
                    <span className="text-theme-muted text-xs px-4 text-center truncate max-w-full">
                      {resume ? `${resume.name} (${(resume.size / 1024 / 1024).toFixed(1)}MB)` : 'Click to upload PDF/DOC'}
                    </span>
                    <input type="file" accept=".pdf,.doc,.docx" onChange={handleResumeChange} className="hidden" />
                  </label>
                  {resume && (
                    <button type="button" onClick={() => setResume(null)}
                      className="text-xs text-theme-muted hover:text-[#FFD700] mt-2 transition">
                      Remove file
                    </button>
                  )}
                </div>
              )}
              <button type="submit" disabled={loading}
                className="w-full bg-[#FFD700] text-[#0A0A0A] font-bold py-4 rounded-xl hover:bg-[#E6C200] transition text-sm disabled:opacity-70 mt-2">
                {loading ? 'Submitting...' : isJob ? 'Submit Application' : 'Send Enquiry'}
              </button>
            </form>
          )}
        </div>
      </div>
    </>
  )
}
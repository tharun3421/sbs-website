import axios from 'axios'

const api = axios.create({ baseURL: import.meta.env.VITE_API_URL || '/api' })

api.interceptors.request.use(config => {
  const token = localStorage.getItem('sbs_token')
  if (token) config.headers.Authorization = `Bearer ${token}`
  return config
})

api.interceptors.response.use(
  res => res,
  err => {
    if (err.response?.status === 401) {
      localStorage.removeItem('sbs_token')
      window.location.href = '/admin/login'
    }
    return Promise.reject(err)
  }
)

// Separate instance for Associate Portal auth so associate sessions never
// collide with the admin session (different token key, different login redirect).
export const associateApi = axios.create({ baseURL: import.meta.env.VITE_API_URL || '/api' })

associateApi.interceptors.request.use(config => {
  const token = localStorage.getItem('sbs_associate_token')
  if (token) config.headers.Authorization = `Bearer ${token}`
  return config
})

associateApi.interceptors.response.use(
  res => res,
  err => {
    if (err.response?.status === 401) {
      localStorage.removeItem('sbs_associate_token')
      localStorage.removeItem('sbs_associate')
      window.location.href = '/associate/login'
    }
    return Promise.reject(err)
  }
)

// Securely ends the associate session and sends the associate to the public
// homepage. Uses `replace: true` so the protected page is dropped from
// browser history — pressing Back afterwards cannot land on it again, and
// AssociateRoute re-checks the token on every render/back-forward restore
// as a second layer of protection.
export const associateLogout = async (navigate) => {
  try { await associateApi.post('/associate/logout') } catch {}
  localStorage.removeItem('sbs_associate_token')
  localStorage.removeItem('sbs_associate')
  navigate('/', { replace: true })
}

export default api
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

export default api
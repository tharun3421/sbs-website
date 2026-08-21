import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import App from './App'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter future={{ v7_relativeSplatPath: true, v7_startTransition: true }}>
    <App />
    <Toaster
      position="top-right"
      toastOptions={{
        style: {
          background: '#1A1A1A',
          color: '#F9F9F9',
          border: '1px solid #FFD700',
          borderRadius: '12px',
        },
        success: { iconTheme: { primary: '#FFD700', secondary: '#000' } }
      }}
    />
  </BrowserRouter>
)
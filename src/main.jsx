import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { WindowProvider } from './contexts/WindowContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <WindowProvider>
      <App />
    </WindowProvider>
  </StrictMode>,
)

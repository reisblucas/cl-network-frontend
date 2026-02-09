import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { enableMocking } from './testing/mocks/index.ts'

const root = document.getElementById('root')
if (!root) throw new Error('Failed to find the root element')

enableMocking().then(() => {
  createRoot(root).render(
    <StrictMode>
      <App />
    </StrictMode>
  )
})

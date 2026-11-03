// main.tsx: the entry point. index.html loads this file first, and everything starts here.
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router'
import './index.css' // global styles (colors, font, body) for the whole app
import App from './App.tsx'

// Find <div id="root"> in index.html and render the whole React app inside it.
// The ! tells TypeScript "I'm sure this element exists" (getElementById could return null).
createRoot(document.getElementById('root')!).render(
  // StrictMode: only in development, it runs some things twice to help find bugs early.
  // BrowserRouter: wraps the whole app, so every component can use Link, NavLink, Routes and useParams.
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>,
)

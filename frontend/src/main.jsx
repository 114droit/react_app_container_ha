import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import Pages from './components/pages.jsx'
import "./app.css";

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Pages />
  </StrictMode>,
)

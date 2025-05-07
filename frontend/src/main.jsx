import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import Pages from './components/pages.jsx'
import "./main.css";

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Pages />
  </StrictMode>,
)

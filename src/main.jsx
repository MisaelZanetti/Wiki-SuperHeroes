import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './pages/Inicio.jsx'
import { Route, Routes } from 'react-router-dom'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Routes>
      <Route path='/' element={<Inicio />}></Route>
    </Routes>
  </StrictMode>,
)

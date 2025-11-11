import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './index.css'
import Inicio from './pages/Inicio.jsx'
import Superheroes from './pages/Superheroes.jsx'
import Cards from './pages/Cards.jsx'
import SuperHeroeIndividual from './pages/SuperHeroeIndividual.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Inicio />}></Route>
        <Route path='/superheroes' element={<Superheroes />}>
          <Route path='all' element={<Cards />} ></Route>
          <Route path=':id' element={<SuperHeroeIndividual />}></Route>
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)

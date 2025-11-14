import { createContext, StrictMode, useState } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './components/Index.css'
import Inicio from './components/Inicio.jsx'
import Superheroes from './components/Superheroes.jsx'
import Cards from './components/Cards.jsx'
import SuperHeroeIndividual from './components/SuperHeroeIndividual.jsx'
import Busqueda from './components/Busqueda.jsx'
import Favoritos from './components/Favoritos.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Inicio />}>
          <Route path='/superheroes' element={<Superheroes />}>
            <Route path='all' element={<Cards />} ></Route>
            <Route path=':id' element={<SuperHeroeIndividual />}></Route>
            <Route path='busqueda' element={<Busqueda />} ></Route>
            <Route path='favoritos' element={<Favoritos />} ></Route>
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)

import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import WebFont from 'webfontloader';
import Contenedor from './elementos/Contenedor';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import EditarGasto from './componentes/EditarGasto'
import GastosPorCategoria from './componentes/GastosPorCategoria'
import InicioSesion from './componentes/InicioSesion'
import ListaDeGastos from './componentes/ListaDeGastos'
import RegistroUsuarios from './componentes/RegistroUsuarios'
import { Helmet } from 'react-helmet';
import favicon from './imagenes/logo.png';
import Fondo from './elementos/Fondo';
import { AuthProvider } from './contextos/AuthContext';
import RutaProtegida from './componentes/RutaPrivada';
import { TotalGastadoProvider } from './contextos/totalGastadoEnElMesContext';


WebFont.load({
  google: {
    families: ['Work Sans:400, 500, 700', 'sans-serif']
  }
});


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <>
    <Helmet>
      <link rel="shortcut icon" href={favicon} type="image/x-icon" />
    </Helmet>

    <AuthProvider>
      <TotalGastadoProvider>
        <BrowserRouter>
          <Contenedor>
            <Routes>
              <Route path='/iniciar-sesion' element={<InicioSesion />} />
              <Route path='/crear-cuenta' element={<RegistroUsuarios />} />

              <Route path='/categorias' element={
                <RutaProtegida>
                  <GastosPorCategoria />
                </RutaProtegida>
              } />

              <Route path='/lista' element={
                <RutaProtegida>
                  <ListaDeGastos />
                </RutaProtegida>
              } />

              <Route path='/editar/:id' element={
                <RutaProtegida>
                  <EditarGasto />
                </RutaProtegida>
              } />

              <Route path='/' element={
                <RutaProtegida>
                  <App />
                </RutaProtegida>
              } />

            </Routes>
          </Contenedor>
        </BrowserRouter>
      </TotalGastadoProvider>
    </AuthProvider>

    <Fondo />
  </>
);


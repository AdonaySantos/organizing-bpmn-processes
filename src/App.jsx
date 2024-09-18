import React from "react";
import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import Repository from "./pages/Repository";
import Recovery from "./pages/Recovery";
import PrivateRoute from "./routes/PrivateRoute";
import Home from './pages/Home';
import Processos from "./pages/Processos";
import './App.css';

// Criação do roteador com as rotas definidas
const router = createBrowserRouter([
  {
    element: (
      <>
        <main>
          <Outlet />
        </main>
      </>
    ),
    children: [
      {
        path: '/',
        element: <Home />
      },
      {
        path: '/recover-password',
        element: <Recovery />
      },
      {
        path: '/repositorio-de-processos',
        element: (
          <PrivateRoute>
            <Repository />
          </PrivateRoute>
        )
      },
      {
        path: '/repositorio-de-processos/:processoNome',
        element: <Processos />
      },
    ]
  }
]);

// Componente principal
function App() {
  return (
    <>
      <RouterProvider router={router} />
      <ToastContainer />
    </>
  );
}

export default App;

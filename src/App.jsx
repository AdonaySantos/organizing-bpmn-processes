import React from "react";
import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import Repository from "./pages/Repository";
import Recovery from "./pages/Recovery";
import Teste from "./pages/Teste";
import PrivateRoute from "./routes/PrivateRoute";
import Home from './pages/Home';
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
        path: '/repositorio-de-processos',
        element: (
          <PrivateRoute>
            <Repository />
          </PrivateRoute>
        )
      },
      {
        path: '/recover-password',
        element: <Recovery />
      },
      {
        path: '/teste',
        element: <Teste />
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

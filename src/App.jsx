import React from "react";
import { createBrowserRouter, Outlet, RouterProvider } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import './App.css';
import Login from './pages/Login';
import Admin from "./pages/Admin";
import Processos from "./pages/Processos";
import RecoverPassword from "./pages/RecoverPassword";
import Repository from "./pages/Repository";
import PrivateRoute from "./routes/PrivateRoute";
import CreateProcess from "./pages/CreateProcesss";

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
        element: <Login />
      },
      {
        path: '/recover-password',
        element: <RecoverPassword />
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
      {
        path: '/administração',
        element: <Admin />
      },
      {
        path: '/criar-processo',
        element: <CreateProcess />
      }
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

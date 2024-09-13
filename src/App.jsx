import React from "react";
import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import Header from './components/Header';
import Login from './pages/Login';
import ForgotPassword from './pages/ForgotPassword'; // Corrigi o nome da importação para corresponder ao arquivo
import Cadastro from './pages/Cadastro'
import Home from './pages/Home';
import './App.css';

// Criação do roteador com as rotas definidas
const router = createBrowserRouter([
  {
    element: (
      <>
        {/*<Header />*/ }    {/*ativar só quando estiver logado*/ }
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
        path: '/login',
        element: <Login />
      },
      {
        path: '/cadastro',
        element: <Cadastro />
      },
      {
        path: '/forgot-password',
        element: <ForgotPassword />
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

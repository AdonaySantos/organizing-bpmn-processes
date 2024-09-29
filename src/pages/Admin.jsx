import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function Admin() {
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAdminData = async () => {
      try {
        const token = localStorage.getItem('authToken');
        if (!token) {
          navigate('/'); // Redireciona para a página inicial se o token não estiver presente
          return;
        }

        const response = await axios.get('https://backend-southstar.onrender.com/administracao', {
          headers: {
            'Authorization': token // Envia o token JWT no cabeçalho
          }
        });

        setMessage(response.data.message); // Exibe a mensagem de sucesso se o usuário for admin

      } catch (error) {
        setError(error.response?.data?.message || 'Acesso negado');
        navigate('/'); // Redireciona para a página inicial em caso de erro ou falta de permissão
      }
    };

    fetchAdminData(); // Executa a função assim que o componente é montado
  }, [navigate]);

  return (
    <div>
        <>
          <h1>Administração</h1>
          <p>{message}</p>
          {/* Coloque aqui o restante do conteúdo da página de administração */}
        </>
    </div>
  );
}
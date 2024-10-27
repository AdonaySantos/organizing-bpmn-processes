import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import '../static/CreateProcess.css'
import axios from "axios";

export default function CreateProcess() {
  const [error, setError] = useState("");

  const navigate = useNavigate();
  useEffect(() => {
    const fetchAdminData = async () => {
      try {
        const token = localStorage.getItem("authToken");
        if (!token) {
          navigate("/"); // Redireciona para a página inicial se o token não estiver presente
          return;
        }

        const response = await axios.get(
          "https://backend-southstar.onrender.com/administracao",
          {
            headers: {
              Authorization: token, // Envia o token JWT no cabeçalho
            },
          }
        );
      } catch (error) {
        setError(error.response?.data?.message || "Acesso negado");
        console.log(error);
        navigate("/"); // Redireciona para a página inicial em caso de erro ou falta de permissão
      }
    };

    fetchAdminData(); // Executa a função assim que o componente é montado
  }, [navigate]);

  return (
    <>
      <h1>olá mundo</h1>
    </>
  );
}

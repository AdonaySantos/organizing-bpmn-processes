import axios from "axios";

export const handleAdminArea = async (navigate) => {
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

    navigate("/administração");
  } catch (error) {
    navigate("/"); // Redireciona para a página inicial em caso de erro ou falta de permissão
  }
};
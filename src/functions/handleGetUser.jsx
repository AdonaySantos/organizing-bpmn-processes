import axios from "axios";

export const handleGetUser = async (e, name, password, permission, setMessage) => {
    e.preventDefault(); // Impede o comportamento padrão de recarregar a página
    try {
        const response = await axios.post('https://backend-southstar.onrender.com/register', {
            name,
            password,
            permission
        });
        setMessage(response.data.message); // Atualiza a mensagem de sucesso
    } catch (error) {
        console.error("Erro ao cadastrar:", error.message);
        setMessage('Erro ao cadastrar: ' + (error.response?.data?.message || error.message)); // Exibe a mensagem de erro
    }
};



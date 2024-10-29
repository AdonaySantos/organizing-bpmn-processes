import axios from "axios";

// Função para lidar com a desativação do usuário
export const handleDeactivateProcess = async (e, nome, setMessage) => {
    e.preventDefault(); // Impede o comportamento padrão de recarregar a página

    try {
        const response = await axios.put('https://backend-southstar.onrender.com/desativar-processo',{
            nome,
        });
        setMessage(response.data); // Atualiza a mensagem de sucesso
        console.log("Deu bom Porraaaaaaaaaaaa!!!!!!!!");
    } catch (error) {
        console.error("Erro ao desativar usuário:", error.message);
        setMessage('Erro ao desativar: ' + (error.response?.data || error.message)); // Exibe a mensagem de erro
    }
};  
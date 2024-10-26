import axios from "axios";

// Função para lidar com a edição do usuário
export const handleEditUser = async (e, name, newUserName, newPassword, newPermission, setMessage) => {
    e.preventDefault(); // Impede o comportamento padrão de recarregar a página

    try {
        const response = await axios.put('https://backend-southstar.onrender.com/editar',{ 
            name, 
            newUserName, 
            newPassword, 
            newPermission 
        });

        setMessage(response.data); // Atualiza a mensagem de sucesso
        console.log("DEU BOM PARTE 9 PORRAAAAAAA");
    } catch (error) {
        console.error("Erro ao editar usuário:", error.message);
        setMessage('Erro ao editar: ' + (error.response?.data || error.message)); // Exibe a mensagem de erro
    }
   };
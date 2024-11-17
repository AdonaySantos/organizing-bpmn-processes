import axios from "axios";

export const handleEditProcess = async (
    e,
    currentProcessName,
    newProcessName,
    newProcessNumber,
    newChainName,
    newProcessDescription,
    selectedDepartments,
    newCategoria,
    newProcessMain,
    setMessage
) => {
    e.preventDefault(); 

    try {
        const response = await axios.put('https://backend-southstar.onrender.com/editar-processos', { 
            currentProcessName,
            newProcessName,
            newProcessNumber,
            newChainName,
            newProcessDescription,
            selectedDepartments,
            newCategoria,
            newProcessMain 
        });
        
        setMessage(response.data.message);
        console.log("DEU BOM PARTE 9 PORRAAAAAAA");
    } catch (error) {
        console.error("Erro ao editar usuário:", error.message);
        setMessage('Erro ao editar: ' + (error.response?.data || error.message));
    }
   };
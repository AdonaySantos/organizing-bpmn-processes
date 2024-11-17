import axios from "axios";

export const getAcessUsers = async (setUserAccess) => {
    try {
        const response = await axios.get("https://backend-southstar.onrender.com/acessos");
        console.log(response); // Log the response for debugging

        // Check for successful status code
        if (response.status !== 200) {
            throw new Error("Erro ao buscar dados de acesso");
        }

        // Use response.data directly
        setUserAccess(response.data); // Updates `userAccess` state with the returned data
    } catch (error) {
        console.error("Erro ao buscar dados de acesso:", error);
    }
};

// functions/getProcessoByName.js
export const getOneProcess = async (processoNome, authToken) => {
    try {
      const response = await fetch(
        `https://backend-southstar.onrender.com/processos/${processoNome}`,
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
            "Content-Type": "application/json",
          },
        }
      );
  
      if (!response.ok) {
        throw new Error(`Erro na requisição: ${response.status}`);
      }
  
      return await response.json();
    } catch (error) {
      console.error("Erro ao buscar processo:", error.message);
      throw new Error("Erro ao buscar o processo.");
    }
  };
  
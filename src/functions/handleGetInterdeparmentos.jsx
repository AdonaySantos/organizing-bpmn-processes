export const handleGetInterdepartamentos = async (
    setInterdepartamentais, 
    setLoading, 
    setError
) => {
    setLoading(true);
    const authToken = localStorage.getItem("authToken");
  
    try {
      const response = await fetch("https://backend-southstar.onrender.com/processos-interdepartamentais", {
        headers: {
          Authorization: `Bearer ${authToken}`,
          "Content-Type": "application/json",
        },
      });
  
      if (!response.ok) {
        throw new Error(`Erro na requisição: ${response.status}`);
      }
  
      const data = await response.json();
      setInterdepartamentais(data); // Armazena os processos interdepartamentais no estado
      setError(null); // Limpa qualquer erro anterior
    } catch (error) {
      console.error("Erro ao buscar processos interdepartamentais:", error.message);
      setError("Erro ao buscar processos interdepartamentais");
    } finally {
      setLoading(false);
    }
  };
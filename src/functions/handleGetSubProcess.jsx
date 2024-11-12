export const handleGetSubProcess = async (
    setSubprocessos,
    setLoading,
    setError
  ) => {
    setLoading(true);
    const authToken = localStorage.getItem("authToken");
  
    try {
      const response = await fetch(
        "https://backend-southstar.onrender.com/subprocessos",
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
  
      const data = await response.json();
      setSubprocessos(data);
      setError(null); // Limpa mensagens de erro anteriores
    } catch (error) {
      console.error("Erro ao buscar processos:", error.message);
      setError("Erro ao buscar processos");
    } finally {
      setLoading(false);
    }
  };
  
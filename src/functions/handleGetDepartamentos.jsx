export const handleGetDepartamentos = async (
    setDepartamentosProcessos,
    setLoading,
    setError
  ) => {
    setLoading(true);
    const authToken = localStorage.getItem("authToken");
  
    try {
      const response = await fetch(
        "https://backend-southstar.onrender.com/processos-por-departamento",
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
      setDepartamentosProcessos(data); // Armazena os departamentos com seus processos no estado
      setError(null); // Limpa mensagens de erro anteriores
    } catch (error) {
      console.error("Erro ao buscar processos por departamento:", error.message);
      setError("Erro ao buscar processos por departamento");
    } finally {
      setLoading(false);
    }
  };
  
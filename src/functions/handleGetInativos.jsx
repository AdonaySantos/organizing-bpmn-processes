export const handleGetInativos = async (
    setInativos,
    setLoading,
    setError
  ) => {
    setLoading(true);
    const authToken = localStorage.getItem("authToken");
  
    try {
      const response = await fetch(
        "https://backend-southstar.onrender.com/processos-inativos",
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
            "Content-Type": "application/json",
          },
        }
      );
  
      if (!response.ok) {
        if (response.status === 404) {
          throw new Error("Nenhum processo inativo encontrado.");
        } else {
          throw new Error(`Erro na requisição: ${response.status}`);
        }
      }
  
      const data = await response.json();
      setInativos(data);
      setError(null); // Limpa mensagens de erro anteriores
    } catch (error) {
      console.error("Erro ao buscar processos inativos:", error.message);
      setError(error.message || "Erro ao buscar processos inativos");
    } finally {
      setLoading(false);
    }
  };
  
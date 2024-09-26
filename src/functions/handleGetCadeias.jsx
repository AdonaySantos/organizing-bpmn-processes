export const handleGetCadeias = async (setCadeiasProcessos, setLoading, setError) => {
    setLoading(true);
    const authToken = localStorage.getItem("authToken");
  
    try {
      const response = await fetch(
        "https://backend-southstar.onrender.com/cadeias-com-processos",
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
      setCadeiasProcessos(data); // Armazena as cadeias no estado
      setError(null); // Limpa mensagens de erro anteriores
    } catch (error) {
      console.error("Erro ao buscar cadeias de processos:", error.message);
      setError("Erro ao buscar cadeias de processos");
    } finally {
      setLoading(false);
    }
  };
  
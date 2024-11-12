export const handleSearch = async (
  searchTerm,
  setProcessosPeaquisados,
  setLoading,
  setError
) => {
  const authToken = localStorage.getItem("authToken");
  setLoading(true);
  setError("");
  setProcessosPeaquisados([]);

  try {
    const response = await fetch(
      `https://backend-southstar.onrender.com/processos/${searchTerm}`,
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
    setProcessosPeaquisados(data);
    setError(null);
  } catch (error) {
    console.error("Erro ao buscar processos:", error.message);
    setError("Nenhum processo encontrado.");
  } finally {
    setLoading(false);
  }
};

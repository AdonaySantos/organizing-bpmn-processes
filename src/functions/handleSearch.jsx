import axios from "axios";
import debounce from "lodash.debounce";

let cancelTokenSource; // Variável para armazenar o token de cancelamento da requisição anterior

export const handleSearch = debounce(
  async (searchTerm, setProcessosPeaquisados, setLoading, setError) => {
    const authToken = localStorage.getItem("authToken");

    setLoading(true);
    setError("");
    setProcessosPeaquisados([]);

    // Se houver uma requisição anterior em andamento, cancela a requisição
    if (cancelTokenSource) {
      cancelTokenSource.cancel("Nova requisição iniciada.");
    }

    // Cria um novo token de cancelamento
    cancelTokenSource = axios.CancelToken.source();

    try {
      const response = await axios.get(
        `https://backend-southstar.onrender.com/processos/${searchTerm}`,
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
            "Content-Type": "application/json",
          },
          cancelToken: cancelTokenSource.token, // Adiciona o token de cancelamento à requisição
        }
      );

      // Se a requisição falhar
      if (response.status !== 200) {
        throw new Error(`Erro na requisição: ${response.status}`);
      }

      setProcessosPeaquisados(response.data);
      setError(null);
    } catch (error) {
      if (axios.isCancel(error)) {
        console.log("Requisição cancelada:", error.message);
      } else {
        console.error("Erro ao buscar processos:", error.message);
        setError("Nenhum processo encontrado.");
      }
    } finally {
      setLoading(false);
    }
  },
  500 // Defina o tempo de debounce em milissegundos (ex: 500ms)
);

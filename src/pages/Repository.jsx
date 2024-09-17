import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import Header from "../components/Header";
import "../static/Repository.css";

export default function Repository() {
  const navigate = useNavigate();
  const [processos, setProcessos] = useState([]);
  const [cadeiasProcessos, setCadeiasProcessos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [viewMode, setViewMode] = useState("processos"); // Novo estado para alternar entre modos de exibição

  useEffect(() => {
    const authToken = localStorage.getItem("authToken");
    if (!authToken) {
      navigate("/");
    } else {
      handleGetProcessos();
      handleGetCadeias(); // Chama handleGetCadeias em vez de fetchCadeiasProcessos
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    navigate("/");
  };

  const handleSearch = async () => {
    const authToken = localStorage.getItem("authToken");
    setLoading(true);
    setError("");
    setProcessos([]);

    try {
      const response = await fetch(`https://backend-southstar.onrender.com/processos/${searchTerm}`, {
        headers: {
          'Authorization': `Bearer ${authToken}`,
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error(`Erro na requisição: ${response.status}`);
      }

      const data = await response.json();
      setProcessos(data);
      setError(null);
    } catch (error) {
      console.error("Erro ao buscar processos:", error.message);
      setError("Nenhum processo encontrado.");
    } finally {
      setLoading(false);
    }
  };

  const handleGetProcessos = async () => {
    setLoading(true);
    const authToken = localStorage.getItem("authToken");

    try {
        const response = await fetch('https://backend-southstar.onrender.com/processos', {
            headers: {
                'Authorization': `Bearer ${authToken}`,
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            throw new Error(`Erro na requisição: ${response.status}`);
        }

        const data = await response.json();
        setProcessos(data);
        setError(null); // Limpa mensagens de erro anteriores
    } catch (error) {
        console.error("Erro ao buscar processos:", error.message);
        setError("Erro ao buscar processos");
    } finally {
      setLoading(false);
    }
  };

  const handleGetCadeias = async () => {
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

  // Função para alternar entre modos de visualização
  const toggleViewMode = (mode) => {
    setViewMode(mode);
    if (mode === "processos") {
      handleGetProcessos(); // Atualiza a lista de processos
    } else if (mode === "cadeias") {
      handleGetCadeias(); // Atualiza a lista de cadeias e processos
    }
  };

  const buttonsList = [{ nome: "Sair", handleClick: handleLogout }];

  return (
    <>
      <header className="header">
        <div className="logo">
          <h1>ProcessSync</h1>
        </div>
        {buttonsList.map((button) => (
          <Header key={button.nome} item={button} />
        ))}
      </header>

      <div className="search-box">
        <input 
          type="text" 
          className="search-txt" 
          placeholder="Buscar" 
          value={searchTerm}
          onChange={(event) => setSearchTerm(event.target.value)}
        />
        <button className="search-button" aria-label="Buscar" onClick={handleSearch}>
          <FontAwesomeIcon icon={faSearch} />
        </button>
      </div>

      <h1>Repositório de Processos</h1>
      <div className="repository-button">
        <button onClick={() => toggleViewMode("processos")} className="todos-os-processos">
          Todos os Processos
        </button>
        <button onClick={() => toggleViewMode("cadeias")} className="todos-os-processos">
          Cadeias
        </button>
      </div>
      
      <div className="processos-list">
        {loading && <p>Carregando...</p>}
        {error && <p className="error-message">{error}</p>}
        {viewMode === "processos" && processos.length > 0 ? (
          <ul>
            {processos.map((processo) => (
              <li key={processo.id}>
                {processo.nome} - {processo.numero} - {processo.descricao}
              </li>
            ))}
          </ul>
        ) : (
          !loading
        )}
      </div>

      <div className="cadeias-processos-list">
        {viewMode === "cadeias" && error && <p className="error-message">{error}</p>}
        {viewMode === "cadeias" && cadeiasProcessos.length > 0 ? (
          <ul>
            {cadeiasProcessos.map((cadeia) => (
              <li key={cadeia.nomeCadeia}>
                <h3>{cadeia.nomeCadeia}</h3>
                <ul>
                  {cadeia.processos.map((processo) => (
                    <li key={processo.id}>
                      {processo.nome} - {processo.numero} - {processo.descricao}{" "}
                      - {processo.data}
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        ) : (
          !loading
        )}
      </div>
    </>
  );
}

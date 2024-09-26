import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import ProcessCard from "../components/ProcessCard";
import { handleGetCadeias } from "../functions/handleGetCadeias";
import { handleGetProcessos } from "../functions/handleGetProcessos";
import { handleLogout } from "../functions/handleLogout";
import { handleSearch } from "../functions/handleSearch";
import { toggleViewMode } from "../functions/toggleViewMode";
import "../static/Repository.css";

export default function Repository() {
  const navigate = useNavigate();
  const [processos, setProcessos] = useState([]);
  const [cadeiasProcessos, setCadeiasProcessos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [viewMode, setViewMode] = useState(""); // Novo estado para alternar entre modos de exibição

  useEffect(() => {
    const authToken = localStorage.getItem("authToken");
    if (!authToken) {
      navigate("/");
    } else {
      handleGetProcessos(setProcessos, setLoading, setError);
      handleGetCadeias(setCadeiasProcessos, setLoading, setError);
    }
  }, [navigate]);

  const buttonsList = [{ nome: "Sair", handleClick: () => handleLogout(navigate) }];

  const handleProcessClick = (processo) => {
    navigate(`/repositorio-de-processos/${processo.nome}`);
  };

  return (
    <>
      <header className="header">
        <h1>ProcessSync</h1>
        <div className="links-nav">
          {buttonsList.map((button) => (
            <Header key={button.nome} item={button} />
          ))}
        </div>
      </header>

      <div className="main-content">
        <h1 className="repository-page-title">Repositório de Processos</h1>
        <div className="repository-search-box">
          <input
            type="text"
            className="repository-search-txt"
            placeholder="Buscar"
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)}
          />
          <button
            className="repository-search-button"
            aria-label="Buscar"
            onClick={() =>
              handleSearch(searchTerm, setProcessos, setError, setLoading)
            }
          >
            <FontAwesomeIcon icon={faSearch} />
          </button>
        </div>

        <div className="repository-button">
          <button
            onClick={() => toggleViewMode("processos", setViewMode)}
            className="repository-todos-os-processos"
          >
            Processos
          </button>
          <button
            onClick={() => toggleViewMode("cadeias", setViewMode)}
            className="repository-todos-os-processos"
          >
            Cadeias
          </button>
        </div>

        <div className="repository-processos-list">
          {loading && <p>Carregando...</p>}
          {error && <p className="repository-error-message">{error}</p>}
          {viewMode === "processos" && error && (
            <p className="repository-error-message">{error}</p>
          )}
          {viewMode === "processos" && processos.length > 0 ? (
            <div className="repository-processos-cards">
              {processos.map((processo) => (
                <ProcessCard 
                  key={processo.id}
                  processo={processo}
                  handleClick={handleProcessClick}
                />
              ))}
            </div>
          ) : (
            !loading
          )}
        </div>

        <div className="repository-cadeias-list">
          {viewMode === "cadeias" && error && (
            <p className="repository-error-message">{error}</p>
          )}
          {viewMode === "cadeias" && cadeiasProcessos.length > 0 ? (
            <ul>
              {cadeiasProcessos.map((cadeia) => (
                <div key={cadeia.nomeCadeia}>
                  <h2 className="repository-cadeias-title">
                    {cadeia.nomeCadeia}
                  </h2>
                  <div className="repository-cadeias-processos">
                    {cadeia.processos.map((processo) => (
                      <ProcessCard 
                        key={processo.id}
                        processo={processo}
                        handleClick={handleProcessClick}
                      />
                    ))}
                  </div>
                </div>
              ))}
            </ul>
          ) : (
            !loading
          )}
        </div>
      </div>
    </>
  );
}

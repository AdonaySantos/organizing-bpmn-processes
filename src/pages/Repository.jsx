import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import ProcessCard from "../components/ProcessCard";
import { handleAdminArea } from "../functions/handleAdminArea";
import { handleGetCadeias } from "../functions/handleGetCadeias";
import { handleGetDepartamentos } from "../functions/handleGetDepartamentos";
import { handleGetInativos } from "../functions/handleGetInativos";
import { handleGetInterdepartamentos } from "../functions/handleGetInterdeparmentos"; //implemente essa budega
import { handleGetProcessos } from "../functions/handleGetProcessos";
import { handleLogout } from "../functions/handleLogout";
import { handleSearch } from "../functions/handleSearch";
import { toggleViewMode } from "../functions/toggleViewMode";
import { handleGetSubProcess } from "../functions/handleGetSubProcess"
import "../static/Repository.css";

export default function Repository() {
  const navigate = useNavigate();
  const [processos, setProcessos] = useState([]);
  const [processosPesquisados, setProcessosPeaquisados] = useState([]);
  const [subprocessos, setSubprocessos] = useState([]);
  const [cadeiasProcessos, setCadeiasProcessos] = useState([]);
  const [interdepartamentais, setInterdepartamentais] = useState([]);
  const [inativos, setInativos] = useState([]);
  const [departamentos, setDepartamentos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [viewMode, setViewMode] = useState("processos");

  useEffect(() => {
    const authToken = localStorage.getItem("authToken");
    if (!authToken) {
      navigate("/");
    } else {
      handleGetSubProcess(setSubprocessos, setError, setLoading)
      handleSearch(searchTerm, setProcessosPeaquisados, setError, setLoading)
      handleGetProcessos(setProcessos, setLoading, setError);
      handleGetCadeias(setCadeiasProcessos, setLoading, setError);
      handleGetInativos(setInativos, setLoading, setError);
      handleGetDepartamentos(setDepartamentos, setLoading, setError);
      handleGetInterdepartamentos(setInterdepartamentais, setLoading, setError);
    }
  }, [navigate]);

  const buttonsList = [
    { nome: "Administração", handleClick: () => handleAdminArea(navigate) },
    { nome: "Sair", handleClick: () => handleLogout(navigate) },
  ];

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
            onClick={() => toggleViewMode("search", setViewMode)}
          >
            <FontAwesomeIcon icon={faSearch} />
          </button>
        </div>

        <div className="repository-button">
          <button
            onClick={() => toggleViewMode("processos", setViewMode)}
            className="repository-processos"
          >
            Processos
          </button>
          <button
            onClick={() => toggleViewMode("departamentos", setViewMode)}
            className="repository-processos"
          >
            Departamentos
          </button>
          <button
            onClick={() => toggleViewMode("interdepartamentais", setViewMode)}
            className="repository-processos"
          >
            Interdepartamentais
          </button>
          <button
            onClick={() => toggleViewMode("inativos", setViewMode)}
            className="repository-processos"
          >
            Inativos
          </button>
          <button
            onClick={() => toggleViewMode("cadeias", setViewMode)}
            className="repository-processos"
          >
            Cadeias
          </button>
          <button
            onClick={() => toggleViewMode("subprocessos", setViewMode)}
            className="repository-processos"
          >
            Subprocessos
          </button>
        </div>

        <div className="repository-processos-list">
          {error && <p className="repository-error-message">{error}</p>}
          {viewMode === "subprocessos" && error && (
            <p className="repository-error-message">{error}</p>
          )}
          {viewMode === "subprocessos" && subprocessos.length > 0 ? (
            <div className="repository-processos-cards">
              {subprocessos.map((subprocesso) => (
                <ProcessCard
                  key={subprocesso.id}
                  processo={subprocesso}
                  handleClick={handleProcessClick}
                />
              ))}
            </div>
          ) : (
            !loading
          )}
        </div>

        <div className="repository-processos-list">
          {error && <p className="repository-error-message">{error}</p>}
          {viewMode === "search" && error && (
            <p className="repository-error-message">{error}</p>
          )}
          {viewMode === "search" && processosPesquisados.length > 0 ? (
            <div className="repository-processos-cards">
              {processosPesquisados.map((processo) => (
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

        <div className="repository-inativos-list">
          {error && <p className="repository-error-message">{error}</p>}
          {viewMode === "inativos" && error && (
            <p className="repository-error-message">{error}</p>
          )}
          {viewMode === "inativos" && inativos.length > 0 ? (
            <div className="repository-processos-cards">
              {inativos.map((processo) => (
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

        <div className="repository-departamentos-list">
          {viewMode === "departamentos" && departamentos.length > 0 && (
            <div>
              {departamentos.map((departamento) => (
                <div key={departamento.nomeDepartamento}>
                  <h2>{departamento.nomeDepartamento}</h2>
                  <div className="repository-processos-cards">
                    {departamento.processos.map((processo) => (
                      <ProcessCard
                        key={processo.id}
                        processo={processo}
                        handleClick={handleProcessClick}
                      />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="repository-interdepartamentais-list">
          {viewMode === "interdepartamentais" && error && (
            <p className="repository-error-message">{error}</p>
          )}
          {viewMode === "interdepartamentais" &&
          interdepartamentais.length > 0 ? (
            <ul>
              {Object.entries(
                interdepartamentais.reduce((acc, processo) => {
                  processo.departamentos.forEach((departamento) => {
                    if (!acc[departamento]) {
                      acc[departamento] = [];
                    }
                    acc[departamento].push(processo);
                  });
                  return acc;
                }, {})
              ).map(([departamento, processos]) => (
                <div key={departamento}>
                  <h2 className="repository-departamento-title">
                    {departamento}
                  </h2>
                  <div className="repository-interdepartamentais-processos">
                    {processos.map((processo) => (
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

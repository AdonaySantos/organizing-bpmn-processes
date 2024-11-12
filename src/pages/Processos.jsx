import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Header from "../components/Header";
import { getOneProcess } from "../functions/getOneProcess";
import { handleLogout } from "../functions/handleLogout";
import "../static/Processo.css";

export default function Processos() {
  const { processoNome } = useParams();
  const navigate = useNavigate();
  const [processo, setProcesso] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProcesso = async () => {
      const authToken = localStorage.getItem("authToken");
      try {
        const data = await getOneProcess(processoNome, authToken);
        setProcesso(data.length > 0 ? data[0] : null);
        setError(null);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProcesso();
  }, [processoNome]);

  const buttonsList = [
    {
      nome: "Repositório",
      handleClick: () => navigate("/repositorio-de-processos"),
    },
    { nome: "Sair", handleClick: () => handleLogout(navigate) },
  ];

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

      <div className="process-content">
        <div className="processo-details">
          {loading && <p>Carregando...</p>}
          {error && <p className="repository-error-message">{error}</p>}
          {processo && (
            <>
              <h1>{processo.nome}</h1>
              {processo.imagem && (
                <img
                  className="img-content"
                  src={`https://backend-southstar.onrender.com/processos/${processo.imagem}`} // URL da imagem
                  alt={processo.nome}
                />
              )}
              <p>
                <strong>Número:</strong> {processo.numero}
              </p>
              <p>
                <strong>Descrição:</strong> {processo.descricao}
              </p>
              <p>
                <strong>Data:</strong> {processo.data}
              </p>

              {processo.documento && (
                <div className="document-content">
                  {/* Exibe o documento incorporado */}
                  <iframe
                    src={`https://backend-southstar.onrender.com/documentos/${processo.documento}`}
                    width="100%"
                    height="500px"
                    title="Documento"
                  >
                    Este navegador não suporta a visualização do documento.
                  </iframe>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </>
  );
}

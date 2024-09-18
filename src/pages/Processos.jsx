import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getOneProcess } from "../functions/getOneProcess";
import { handleLogout } from "../functions/logout";
import Header from "../components/Header";
import "../static/Processo.css";

export default function Processos() {
  const { processoNome } = useParams();
  const [processo, setProcesso] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProcesso = async () => {
      const authToken = localStorage.getItem("authToken");
      try {
        const data = await getOneProcess(processoNome, authToken);
        console.log("1")
        setProcesso(data.length > 0 ? data[0] : null);
        console.log("2")
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
    { nome: "Sair", handleClick: handleLogout },
  ];

  return (
    <>
      <header className="header">
        <div className="repository-logo">
          <h1>ProcessSync</h1>
        </div>
        {buttonsList.map((button) => (
          <Header key={button.nome} item={button} />
        ))}
      </header>
      <div className="processo-details">
        {loading && <p>Carregando...</p>}
        {error && <p className="repository-error-message">{error}</p>}
        {processo && (
          <>
            <h1>{processo.nome}</h1>
            {processo.imagem && (
              <img
                src={`https://backend-southstar.onrender.com/processos/${processo.imagem}`} // URL da imagem
                alt={processo.nome}
                style={{ width: "300px", height: "auto", borderRadius: "8px" }}
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
          </>
        )}
      </div>
    </>
  );
}

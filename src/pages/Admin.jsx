import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import { handleGetUser } from "../functions/handleGetUser";
import { handleLogout } from "../functions/handleLogout";
import "../static/Admin.css";

export default function Admin() {
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();


  // Quando o botão é clicado, abre o modal
  const open = () => {
    modal.style.display = "block";
  };

  // Quando o botão de fechar é clicado, fecha o modal
  const close = () => {
    modal.style.display = "none";
  };

  useEffect(() => {
    const modal = document.getElementById("modal");
    const openModalBtn = document.getElementById("openModalBtn");
    const closeModalBtn = document.getElementById("closeModalBtn");

    const open = () => {
      modal.style.display = "block";
    };

    const close = () => {
      modal.style.display = "none";
    };

    const windowClickHandler = (e) => {
      if(event.target === modal) {
        modalstyle.display = "none"
      }
    }

    openModalBtn.addEventListener("click", open);
    closeModalBtn.addEventListener("click", close);
    window.addEventListener("click", windowClickHandler);

    return () => {
      // Remove os event listeners quando o componente é desmontado
      openModalBtn.removeEventListener("click", open);
      closeModalBtn.removeEventListener("click", close);
      window.removeEventListener("click", windowClickHandler);
    };
  }, [navigate]);

  useEffect(() => {
    const fetchAdminData = async () => {
      try {
        const token = localStorage.getItem("authToken");
        if (!token) {
          navigate("/"); // Redireciona para a página inicial se o token não estiver presente
          return;
        }

        const response = await axios.get(
          "https://backend-southstar.onrender.com/administracao",
          {
            headers: {
              Authorization: token, // Envia o token JWT no cabeçalho
            },
          }
        );
      } catch (error) {
        setError(error.response?.data?.message || "Acesso negado");
        navigate("/"); // Redireciona para a página inicial em caso de erro ou falta de permissão
      }
    };

    fetchAdminData(); // Executa a função assim que o componente é montado
  }, [navigate]);

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
      <div className="main-content">
        <h1>Administração</h1>
        {/* Coloque aqui o restante do conteúdo da página de administração */}

        <div className="repositor-button">
          <button 
            id="openModalBtn" 
            className="repository-processos"
            onClick={open}
            >
            Cadastrar User
          </button>
        </div>

        <div id="modal" className="modal">
          <div className="modal-content">
            <span 
              id="closeModalBtn" 
              class="close"
              onClick={close}
              >
              &times;
            </span>
            <h1>Cadastro</h1>
            <form onSubmit={() => handleGetUser(name, password)}>
              <div className="textfield">
                <label htmlFor="nome">Nome</label>
                <input
                  type="text"
                  placeholder="Nome"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
              <div className="textfield">
                <label htmlFor="senha">Senha</label>
                <input
                  type="password"
                  placeholder="Senha"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <button type="submit" className="button-right-container">
                CADASTRAR
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
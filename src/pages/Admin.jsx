import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import { handleGetUser } from "../functions/handleGetUser";
import { handleLogout } from "../functions/handleLogout";
import "../static/Admin.css";
import { handleDeactivateUser } from "../functions/handleDeactiveUser";
import { handleEditUser } from "../functions/handleEditUser";

export default function Admin() {
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [permission, setPermission] = useState("");
  const [newUserName, setNewUserName] = useState(""); // Novo nome
  const [newPassword, setNewPassword] = useState(""); // Nova senha
  const [newPermission, setNewPermission] = useState(""); // Nova permissão


  const navigate = useNavigate();

  useEffect(() => {
    const modal = document.getElementById("modal");
    const editModal = document.getElementById("editModal");
    const deactivateModal = document.getElementById("deactivateModal");

    const openModalBtn = document.getElementById("openModalBtn");
    const openEditModalBtn = document.getElementById("openEditModalBtn");
    const openDeactivateModalBtn = document.getElementById("openDeactivateModalBtn");

    const closeModalBtn = document.getElementById("closeModalBtn");
    const closeEditModalBtn = document.getElementById("closeEditModalBtn");
    const closeDeactivateModalBtn = document.getElementById("closeDeactivateModalBtn");

    const open = (modal) => {
      modal.style.display = "flex";
    };

    const close = (modal) => {
      modal.style.display = "none";
    };

    const windowClickHandler = (event) => {
      if (event.target === modal || 
          event.target === editModal || 
          event.target === deactivateModal) {
        event.target.style.display = "none";
      }
    };

    openModalBtn.addEventListener("click", () => open(modal));
    openEditModalBtn.addEventListener("click", () => open(editModal));
    openDeactivateModalBtn.addEventListener("click", () => open(deactivateModal));

    closeModalBtn.addEventListener("click", () => close(modal));
    closeEditModalBtn.addEventListener("click", () => close(editModal));
    closeDeactivateModalBtn.addEventListener("click", () => close(deactivateModal));

    window.addEventListener("click", windowClickHandler);

    return () => {
      openModalBtn.removeEventListener("click", () => open(modal));
      openEditModalBtn.removeEventListener("click", () => open(editModal));
      openDeactivateModalBtn.removeEventListener("click", () => open(deactivateModal));

      closeModalBtn.removeEventListener("click", () => close(modal));
      closeEditModalBtn.removeEventListener("click", () => close(editModal));
      closeDeactivateModalBtn.removeEventListener("click", () => close(deactivateModal));
      
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
        <h1 className="repository-page-title">Administração</h1>
        {/* Coloque aqui o restante do conteúdo da página de administração */}

        <div className="repositor-button">
          <button
            id="openModalBtn"
            className="repository-processos"
          >
            Cadastrar User
          </button>
          <button 
            id="openEditModalBtn"
            className="repository-processos"
          >
            Editar User
          </button>
          <button 
            id="openDeactivateModalBtn"
            className="repository-processos"
          >
            Desativar User
          </button>
          <button 
            id="openCreateProcessPage"
            className="repository-processos"
            onClick={() => navigate("/criar-processo")}
          >
            Criar Processo
          </button>
        </div>

        {/* Modal Cadastrar User */}
        <div id="modal" className="modal">
          <div className="modal-content">
            <span
              id="closeModalBtn"
              className="close"
            >
              &times;
            </span>
            <h1>Cadastro</h1>
            <form onSubmit={(e) => handleGetUser(e, name, password, permission, setMessage)}>
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
              <div className="textfield">
                <label htmlFor="permission">Permissão</label>
                <input
                  type="text"
                  placeholder="Permissão"
                  value={permission}
                  onChange={(e) => setPermission(e.target.value)}
                  required
                />
              </div>
              <button type="submit" className="button-right-container">
                CADASTRAR
              </button>
            </form>
            {message && <p>{message}</p>}
          </div>
        </div>

        {/* Modal Editar User */}
        <div id="editModal" className="modal">
          <div className="modal-content">
            <span id="closeEditModalBtn" className="close">&times;</span>
            <h1>Editar Usuário</h1>
            <form onSubmit={(e) => handleEditUser(e, name, newUserName, newPassword, newPermission, setMessage)}>
              <div className="textfield">
                <label htmlFor="nome">Nome Atual</label>
                <input
                  type="text"
                  placeholder="Nome Atual"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
              <div className="textfield">
                <label htmlFor="nomeEditado">Novo Nome</label>
                <input
                  type="text"
                  placeholder="Novo Nome"
                  value={newUserName}
                  onChange={(e) => setNewUserName(e.target.value)}
                  required
                />
              </div>
              <div className="textfield">
                <label htmlFor="senhaEditada">Nova Senha</label>
                <input
                  type="password"
                  placeholder="Nova Senha"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  required
                />
              </div>
              <div className="textfield">
                <label htmlFor="permissionEditada">Nova Permissão</label>
                <input
                  type="text"
                  placeholder="Nova Permissão"
                  value={newPermission}
                  onChange={(e) => setNewPermission(e.target.value)}
                  required
                />
              </div>
              <button type="submit" className="button-right-container">SALVAR</button>
            </form>
            {message && <p>{message}</p>}
          </div>
        </div>

        {/* Modal Desativar User */}
        <div id="deactivateModal" className="modal">
          <div className="modal-content">
            <span id="closeDeactivateModalBtn" className="close">&times;</span>
            <h1>Desativar Usuário</h1>
            <form onSubmit={(e) => handleDeactivateUser(e, name, setMessage)}>
              <div className="textfield">
                <label htmlFor="usuarioDesativar">Nome do Usuário</label>
                <input
                  type="text"
                  placeholder="Nome do Usuário"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
              <button type="submit" className="button-right-container">DESATIVAR</button>
            </form>
            {message && <p>{message}</p>}
          </div>
        </div>
      </div>
    </>
  );
}
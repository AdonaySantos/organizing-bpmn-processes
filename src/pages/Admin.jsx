import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import { handleGetUser } from "../functions/handleGetUser";
import { handleLogout } from "../functions/handleLogout";
import "../static/Admin.css";
import { handleDeactivateUser } from "../functions/handleDeactiveUser";
import { handleEditUser } from "../functions/handleEditUser";
import { handleDeactivateProcess } from "../functions/handleDeactiveProcess";
import { handleReactivateProcess } from "../functions/handleReactivateProcess";

export default function Admin() {
  const [message, setMessage] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [permission, setPermission] = useState("");
  const [newUserName, setNewUserName] = useState(""); // Novo nome
  const [newPassword, setNewPassword] = useState(""); // Nova senha
  const [newPermission, setNewPermission] = useState(""); // Nova permissão
  const [processName, setProcessName] = useState(""); // Nome do processo para reativar

  // Novos estados para editar processo
  const [currentProcessName, setCurrentProcessName] = useState(""); // Nome atual do processo
  const [newProcessName, setNewProcessName] = useState(""); // Novo nome do processo
  const [newProcessNumber, setNewProcessNumber] = useState(""); // Novo número do processo
  const [isPartOfChain, setIsPartOfChain] = useState(false); // Indica se o processo está em uma cadeia
  const [newChainName, setNewChainName] = useState(""); // Novo nome da cadeia
  const [newProcessDescription, setNewProcessDescription] = useState(""); // Nova descrição do processo
  const [processType, setProcessType] = useState("Departamental"); // Tipo do processo (Departamental ou Interdepartamental)
  const [selectedDepartments, setSelectedDepartments] = useState([]); // Departamentos selecionados

  const navigate = useNavigate();

  useEffect(() => {
    const modal = document.getElementById("modal");
    const editModal = document.getElementById("editModal");
    const deactivateModal = document.getElementById("deactivateModal");
    const deactivateProcessModal = document.getElementById(
      "deactivateProcessModal"
    );
    const reactivateProcessModal = document.getElementById(
      "reactivateProcessModal"
    );
    const editProcessModal = document.getElementById("editProcessModal");

    const openModalBtn = document.getElementById("openModalBtn");
    const openEditModalBtn = document.getElementById("openEditModalBtn");
    const openDeactivateModalBtn = document.getElementById(
      "openDeactivateModalBtn"
    );
    const openDeactivateProcessModalBtn = document.getElementById(
      "openDeactivateProcessModalBtn"
    );
    const openReactivateProcessModalBtn = document.getElementById(
      "openReactivateProcessModalBtn"
    );
    const openEditProcessModalBtn = document.getElementById(
      "openEditProcessModalBtn"
    );

    const closeModalBtn = document.getElementById("closeModalBtn");
    const closeEditModalBtn = document.getElementById("closeEditModalBtn");
    const closeDeactivateModalBtn = document.getElementById(
      "closeDeactivateModalBtn"
    );
    const closeDeactivateProcessModal = document.getElementById(
      "closeDeactivateProcessModal"
    );
    const closeReactivateProcessModal = document.getElementById(
      "closeReactivateProcessModal"
    );
    const closeEditProcessModalBtn = document.getElementById(
      "closeEditProcessModalBtn"
    );

    const open = (modal) => {
      modal.style.display = "flex";
    };

    const close = (modal) => {
      modal.style.display = "none";
    };

    const windowClickHandler = (event) => {
      if (
        event.target === modal ||
        event.target === editModal ||
        event.target === deactivateModal ||
        event.target === deactivateProcessModal ||
        event.target === reactivateProcessModal ||
        event.target === editProcessModal
      ) {
        event.target.style.display = "none";
      }
    };

    openModalBtn.addEventListener("click", () => open(modal));
    openEditModalBtn.addEventListener("click", () => open(editModal));
    openDeactivateModalBtn.addEventListener("click", () =>
      open(deactivateModal)
    );
    openDeactivateProcessModalBtn.addEventListener("click", () =>
      open(deactivateProcessModal)
    );
    openReactivateProcessModalBtn.addEventListener("click", () =>
      open(reactivateProcessModal)
    );
    openEditProcessModalBtn.addEventListener("click", () =>
      open(editProcessModal)
    );

    closeModalBtn.addEventListener("click", () => close(modal));
    closeEditModalBtn.addEventListener("click", () => close(editModal));
    closeDeactivateModalBtn.addEventListener("click", () =>
      close(deactivateModal)
    );
    closeDeactivateProcessModal.addEventListener("click", () =>
      close(deactivateProcessModal)
    );
    closeReactivateProcessModal.addEventListener("click", () =>
      close(reactivateProcessModal)
    );
    closeEditProcessModalBtn.addEventListener("click", () =>
      close(editProcessModal)
    );

    window.addEventListener("click", windowClickHandler);

    return () => {
      openModalBtn.removeEventListener("click", () => open(modal));
      openEditModalBtn.removeEventListener("click", () => open(editModal));
      openDeactivateModalBtn.removeEventListener(
        "click",
        () => open(deactivateModal) && setName("")
      );
      openDeactivateProcessModalBtn.removeEventListener(
        "click",
        () => open(deactivateProcessModal) && setName("")
      );
      openReactivateProcessModalBtn.removeEventListener("click", () =>
        open(reactivateProcessModal)
      );
      openEditProcessModalBtn.removeEventListener("click", () =>
        open(editProcessModal)
      );

      closeModalBtn.removeEventListener("click", () => close(modal));
      closeEditModalBtn.removeEventListener("click", () => close(editModal));
      closeDeactivateModalBtn.removeEventListener("click", () =>
        close(deactivateModal)
      );
      closeDeactivateProcessModal.removeEventListener("click", () =>
        close(deactivateProcessModal)
      );
      closeReactivateProcessModal.removeEventListener("click", () =>
        close(reactivateProcessModal)
      );
      closeEditProcessModalBtn.removeEventListener("click", () =>
        close(editProcessModal)
      );

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

  // Função para gerenciar a mudança no tipo de processo
  const handleProcessTypeChange = (e) => {
    const selectedType = e.target.value;
    setProcessType(selectedType);

    // Se mudar para "Departamental", verifica se há mais de um departamento selecionado
    // Se sim, mantém o primeiro departamento, removendo os outros
    if (selectedType === "Departamental" && selectedDepartments.length > 1) {
      setSelectedDepartments([selectedDepartments[0]]);
    }
  };

  // Função para gerenciar a mudança nos departamentos
  const handleDepartmentChange = (e) => {
    const { value, checked } = e.target;

    if (processType === "Interdepartamental") {
      // Quando o tipo de processo for "Interdepartamental", permite múltiplos departamentos
      if (checked) {
        setSelectedDepartments((prev) => [...prev, value]);
      } else {
        setSelectedDepartments((prev) => prev.filter((dept) => dept !== value));
      }
    } else if (processType === "Departamental") {
      // Quando o tipo de processo for "Departamental", só permite um departamento selecionado
      if (checked) {
        setSelectedDepartments([value]); // Mantém apenas o departamento selecionado
      } else {
        setSelectedDepartments([]); // Limpa a seleção quando o checkbox é desmarcado
      }
    }
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
        <h1 className="repository-page-title">Administração</h1>
        {/* Coloque aqui o restante do conteúdo da página de administração */}

        <div className="repositor-button">
          <button id="openModalBtn" className="repository-processos">
            Cadastrar User
          </button>
          <button id="openEditModalBtn" className="repository-processos">
            Editar User
          </button>
          <button id="openDeactivateModalBtn" className="repository-processos">
            Desativar User
          </button>
          <button
            id="openDeactivateProcessModalBtn"
            className="repository-processos"
          >
            Desativar Processo
          </button>
          <button
            id="openCreateProcessPage"
            className="repository-processos"
            onClick={() => navigate("/criar-processo")}
          >
            Criar Processo
          </button>
          <button
            id="openReactivateProcessModalBtn"
            className="repository-processos"
          >
            Reativar Processo
          </button>
          <button id="openEditProcessModalBtn" className="repository-processos">
            Editar Processo
          </button>
        </div>

        {/* Modal Cadastrar User */}
        <div id="modal" className="modal">
          <div className="modal-content">
            <span id="closeModalBtn" className="close">
              &times;
            </span>
            <h1>Cadastro</h1>
            <form
              onSubmit={(e) =>
                handleGetUser(e, name, password, permission, setMessage)
              }
            >
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
            <span id="closeEditModalBtn" className="close">
              &times;
            </span>
            <h1>Editar Usuário</h1>
            <form
              onSubmit={(e) =>
                handleEditUser(
                  e,
                  name,
                  newUserName,
                  newPassword,
                  newPermission,
                  setMessage
                )
              }
            >
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
              <button type="submit" className="button-right-container">
                SALVAR
              </button>
            </form>
            {message && <p>{message}</p>}
          </div>
        </div>

        {/* Modal Desativar User */}
        <div id="deactivateModal" className="modal">
          <div className="modal-content">
            <span id="closeDeactivateModalBtn" className="close">
              &times;
            </span>
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
              <button type="submit" className="button-right-container">
                DESATIVAR
              </button>
            </form>
            {message && <p>{message}</p>}
          </div>
        </div>

        {/* Modal Desativar Processo */}
        <div id="deactivateProcessModal" className="modal">
          <div className="modal-content">
            <span id="closeDeactivateProcessModal" className="close">
              &times;
            </span>
            <h1>Desativar Processo</h1>
            <form
              onSubmit={(e) => handleDeactivateProcess(e, name, setMessage)}
            >
              <div className="textfield">
                <label htmlFor="processoDesativar">Nome do Processo</label>
                <input
                  type="text"
                  placeholder="Nome do Processo"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
              <button type="submit" className="button-right-container">
                DESATIVAR
              </button>
            </form>
            {message && <p>{message}</p>}
          </div>
        </div>

        {/* Modal Reativar Processo */}
        <div id="reactivateProcessModal" className="modal">
          <div className="modal-content">
            <span id="closeReactivateProcessModal" className="close">
              &times;
            </span>
            <h1>Reativar Processo</h1>
            <form
              onSubmit={(e) =>
                handleReactivateProcess(e, processName, setMessage)
              }
            >
              <div className="textfield">
                <label htmlFor="processoReativar">Nome do Processo</label>
                <input
                  type="text"
                  placeholder="Nome do Processo"
                  value={processName}
                  onChange={(e) => setProcessName(e.target.value)}
                  required
                />
              </div>
              <button type="submit" className="button-right-container">
                ATIVAR
              </button>
            </form>
            {message && <p>{message}</p>}
          </div>
        </div>

        {/* Modal para editar processo */}
        <div id="editProcessModal" className="modal">
          <div className="modal-content">
            <span id="closeEditProcessModalBtn" className="close">
              &times;
            </span>
            <h1>Editar Processo</h1>
            <form className="edit-process-form">
              <div className="textfield">
                <label>Nome Atual do Processo:</label>
                <input
                  type="text"
                  value={currentProcessName}
                  onChange={(e) => setCurrentProcessName(e.target.value)}
                />
              </div>
              <div className="textfield">
                <label>Nome do Processo:</label>
                <input
                  type="text"
                  value={newProcessName}
                  onChange={(e) => setNewProcessName(e.target.value)}
                />
              </div>
              <div className="textfield">
                <label>Número do Processo:</label>
                <input
                  type="text"
                  value={newProcessNumber}
                  onChange={(e) => setNewProcessNumber(e.target.value)}
                />
              </div>
              <div className="textfield">
                <label>Está em uma cadeia de processos?</label>
                <select
                  value={isPartOfChain}
                  onChange={(e) => setIsPartOfChain(e.target.value === "true")}
                >
                  <option value="false">Não</option>
                  <option value="true">Sim</option>
                </select>
                {isPartOfChain && (
                  <>
                    <label className="chain">Nome da Cadeia:</label>
                    <input
                      type="text"
                      value={newChainName}
                      onChange={(e) => setNewChainName(e.target.value)}
                    />
                  </>
                )}
              </div>
              <div className="textfield">
                <label>Descrição do Processo:</label>
                <textarea
                  value={newProcessDescription}
                  onChange={(e) => setNewProcessDescription(e.target.value)}
                />
              </div>
              <div className="textfield">
                <label>Tipo de Processo:</label>
                <select value={processType} onChange={handleProcessTypeChange}>
                  <option value="Departamental">Departamental</option>
                  <option value="Interdepartamental">Interdepartamental</option>
                </select>
                {processType === "Interdepartamental" && (
                  <div>
                    <label>
                      <fieldset>
                        <legend>Selecionar Departamentos:</legend>
                        {["Financeiro", "RH", "Vendas", "TI"].map((dept) => (
                          <label key={dept} className="checkbox-label">
                            <input
                              type="checkbox"
                              value={dept}
                              checked={selectedDepartments.includes(dept)}
                              onChange={handleDepartmentChange}
                            />
                            <span>
                              <span className="custom-checkbox" />
                            </span>
                            {dept}
                          </label>
                        ))}
                      </fieldset>
                    </label>
                  </div>
                )}
                {processType === "Departamental" && (
                  <label>
                    <fieldset>
                      <legend>Selecionar Departamentos:</legend>
                      {["Financeiro", "RH", "Vendas", "TI"].map((dept) => (
                        <label key={dept} className="checkbox-label">
                          <input
                            type="checkbox"
                            value={dept}
                            checked={selectedDepartments.includes(dept)}
                            onChange={handleDepartmentChange}
                            disabled={
                              processType === "Departamental" &&
                              selectedDepartments.length >= 1 &&
                              !selectedDepartments.includes(dept)
                            } // Desabilita o checkbox se já houver um departamento selecionado
                          />
                          <span>
                            <span className="custom-checkbox" />
                          </span>
                          {dept}
                        </label>
                      ))}
                    </fieldset>
                  </label>
                )}
              </div>
              <button type="submit" className="Create-btn">
                Salvar Alterações
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

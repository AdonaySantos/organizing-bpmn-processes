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
  const [processLevel, setProcessLevel] = useState("Processo");

  // Novos estados para criar processo
  const [error, setError] = useState("");
  const [fileError, setFileError] = useState("");
  const [docError, setDocError] = useState("");
  const [processData, setProcessData] = useState({
    nome: "",
    numero: "",
    descricao: "",
    categoria: "processo", // Estado para Processo/Subprocesso
    processoMain: "", // Nome do processo pai, se for subprocesso
    cadeia: "", // Nome da cadeia de processos vinculada
    departamentos: [],
    diagrama: null,
    documento: null,
  });

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
    const createProcessModal = document.getElementById("createProcessModal");

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
    const openCreateProcessModalBtn = document.getElementById(
      "openCreateProcessModalBtn"
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
    const closeCreateProcessModalBtn = document.getElementById(
      "closeCreateProcessModalBtn"
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
        event.target === editProcessModal ||
        event.target === createProcessModal
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
    openCreateProcessModalBtn.addEventListener("click", () =>
      open(createProcessModal)
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
    closeCreateProcessModalBtn.addEventListener("click", () =>
      close(createProcessModal)
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
      openCreateProcessModalBtn.removeEventListener("click", () =>
        open(createProcessModal)
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
      closeCreateProcessModalBtn.removeEventListener("click", () =>
        close(createProcessModal)
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

  //Parte que estava na criação dos processos
  const handleChange = (e) => {
    const { name, value } = e.target;
    setProcessData((prev) => ({
      ...prev,
      [name]: value,
      departamentos:
        name === "tipo" && value === "Departamental" ? [] : prev.departamentos,
    }));
  };

  const handleCheckboxChange = (e) => {
    const { value, checked } = e.target;
    setProcessData((prev) => {
      const departamentos = checked
        ? [...prev.departamentos, value]
        : prev.departamentos.filter((dep) => dep !== value);
      return { ...prev, departamentos };
    });
  };

  const handleFileChange = (e, type) => {
    const file = e.target.files[0];

    console.log("oi");
    if (type === "diagrama") {
      console.log("oi2");
      if (file && !["image/jpeg", "image/png"].includes(file.type)) {
        setFileError("Formato inválido. Apenas JPEG e PNG são permitidos.");
        return;
      }
    } else if (type === "documento") {
      if (
        file &&
        ![
          "application/pdf",
          "application/msword",
          "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        ].includes(file.type)
      ) {
        console.log("oi3");
        setDocError("Formato inválido. Apenas PDF e WORD são permitidos.");
        return;
      }
    }

    if (file && file.size > 3 * 1024 * 1024) {
      const errorMessage = "O arquivo é muito grande. O tamanho máximo é 3MB.";
      type === "diagrama"
        ? setFileError(errorMessage)
        : setDocError(errorMessage);
      return;
    }

    setFileError("");
    setDocError("");
    setProcessData((prev) => ({ ...prev, [type]: file }));
    console.log("deuboom");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!processData.diagrama) {
      setFileError("Por favor, faça o upload de um diagrama.");
      return;
    }

    const formData = new FormData();
    formData.append("nome", processData.nome);
    formData.append("numero", processData.numero);
    formData.append("descricao", processData.descricao);
    formData.append("categoria", processData.categoria.toLowerCase());
    formData.append("processoMain", processData.processoMain);
    formData.append("cadeia", processData.cadeia);

    processData.departamentos.forEach((dep) =>
      formData.append("departamentos", dep)
    );

    formData.append("diagrama", processData.diagrama);
    if (processData.documento)
      formData.append("documento", processData.documento);

    try {
      const response = await axios.post(
        "https://backend-southstar.onrender.com/processos",
        formData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setMessage(response.data.message || "Processo criado com sucesso!");
      setError("");
    } catch (error) {
      console.log("Erro ao criar processo:", error);
      setError(
        error.response?.data?.message ||
          "Erro ao criar processo. Tente novamente."
      );
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
            id="openCreateProcessModalBtn"
            className="repository-processos"
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

        {/* Modal para criar processo */}
        <div id="createProcessModal" className="modal">
          <div className="modal-content">
            <span id="closeCreateProcessModalBtn" className="close">
              &times;
            </span>
            <h1>Criar Processo</h1>
            <form onSubmit={handleSubmit} className="process-form">
              <div className="textfield">
                <label>Nome do Processo:</label>
                <input
                  type="text"
                  name="nome"
                  value={processData.nome}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="textfield">
                <label>Número do Processo:</label>
                <input
                  type="text"
                  name="numero"
                  value={processData.numero}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="textfield">
                <label>Categoria:</label>
                <select
                  name="categoria"
                  value={processData.categoria}
                  onChange={handleChange}
                >
                  <option value="Processo">Processo</option>
                  <option value="Subprocesso">Subprocesso</option>
                </select>
              </div>
              <div className="textfield">
                {processData.categoria === "Subprocesso" && (
                  <>
                    <label className="chain">Processo Main:</label>
                    <input
                      type="text"
                      name="processoMain"
                      value={processData.processoMain}
                      onChange={handleChange}
                      required
                    />
                  </>
                )}
              </div>
              <div className="textfield">
                <label>Está em uma cadeia de processos?</label>
                <select
                  name="pertenceCadeia"
                  value={processData.pertenceCadeia}
                  onChange={handleChange}
                >
                  <option value="Não">Não</option>
                  <option value="Sim">Sim</option>
                </select>
                {processData.pertenceCadeia === "Sim" && (
                  <>
                    <label className="chain">Nome da Cadeia:</label>
                    <input
                      type="text"
                      name="cadeia"
                      value={processData.cadeia}
                      onChange={handleChange}
                      required
                    />
                  </>
                )}
              </div>
              <div className="textfield">
                <label>Descrição do Processo:</label>
                <textarea
                  name="descricao"
                  value={processData.descricao}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="textfield">
                <label>Tipo de Processo:</label>
                <select
                  name="tipo"
                  value={processData.tipo}
                  onChange={handleChange}
                >
                  <option value="Departamental">Departamental</option>
                  <option value="Interdepartamental">Interdepartamental</option>
                </select>
                <div>
                  <label>
                    <fieldset>
                      <legend>Selecionar Departamentos</legend>
                      {["Financeiro", "RH", "Vendas", "TI"].map((dep) => (
                        <label key={dep} className="checkbox-label">
                          <input
                            type="checkbox"
                            value={dep}
                            checked={processData.departamentos.includes(dep)}
                            onChange={handleCheckboxChange}
                            disabled={
                              processData.tipo === "Departamental" &&
                              processData.departamentos.length >= 1 &&
                              !processData.departamentos.includes(dep)
                            }
                          />
                          <span>
                            <span className="custom-checkbox" />
                          </span>
                          {dep}
                        </label>
                      ))}
                    </fieldset>
                  </label>
                </div>
              </div>
              <div className="diagram-button">
                <label className="upload-btn">
                  Upload do Diagrama
                  <input
                    type="file"
                    accept=".jpeg, .jpg, .png"
                    onChange={(e) => handleFileChange(e, "diagrama")}
                  />
                </label>
              </div>
              {fileError && <p className="error">{fileError}</p>}
              <div className="document-button">
                <label className="upload-btn">
                  Upload do Documento
                  <input
                    type="file"
                    accept=".pdf, .doc, .docx"
                    onChange={(e) => handleFileChange(e, "documento")}
                  />
                </label>
              </div>
              {docError && <p className="error">{docError}</p>}
              <button type="submit" className="Create-btn">
                Criar
              </button>
            </form>
            {message && <p>{message}</p>}
            {error && <p className="error">{error}</p>}
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
            <form className="process-form">
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
                <label>Categoria:</label>
                <select
                  name="categoria"
                  value={processData.categoria}
                  onChange={handleChange}
                >
                  <option value="Processo">Processo</option>
                  <option value="Subprocesso">Subprocesso</option>
                </select>
              </div>
              <div className="textfield">
                {processData.categoria === "Subprocesso" && (
                  <>
                    <label className="chain">Processo Main:</label>
                    <input
                      type="text"
                      name="processoMain"
                      value={processData.processoMain}
                      onChange={handleChange}
                      required
                    />
                  </>
                )}
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

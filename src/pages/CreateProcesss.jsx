import { useEffect, useState } from "react";
import { json, useNavigate } from "react-router-dom";
import "../static/CreateProcess.css";
import axios from "axios";
import Header from "../components/Header";
import { handleAdminArea } from "../functions/handleAdminArea";
import { handleLogout } from "../functions/handleLogout";

export default function CreateProcess() {
  const [message, setMessage] = useState("");
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
    const fetchAdminData = async () => {
      try {
        const token = localStorage.getItem("authToken");
        if (!token) {
          navigate("/");
          return;
        }
        await axios.get(
          "https://backend-southstar.onrender.com/administracao",
          {
            headers: { Authorization: token },
          }
        );
      } catch (error) {
        setError(error.response?.data?.message || "Acesso negado");
        console.log(error);
        navigate("/");
      }
    };

    fetchAdminData();
  }, [navigate]);

  const buttonsList = [
    { nome: "Administração", handleClick: () => handleAdminArea(navigate) },
    {
      nome: "Repositório",
      handleClick: () => navigate("/repositorio-de-processos"),
    },
    { nome: "Sair", handleClick: () => handleLogout(navigate) },
  ];

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

    console.log("oi")
    if (type === "diagrama") {
      console.log("oi2")
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
        console.log("oi3")
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
    console.log("deuboom")
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!processData.diagrama) {
        setFileError("Por favor, faça o upload de um diagrama.");
        return;
    }

    const formData = new FormData();
    formData.append("nome", processData.nome);
    console.log(processData.nome)
    formData.append("numero", processData.numero);
    console.log(processData.numero)
    formData.append("descricao", processData.descricao);
    console.log(processData.descricao)
    formData.append("categoria", processData.categoria.toLowerCase());
    console.log(processData.categoria.toLowerCase())
    formData.append("processoMain", processData.processoMain);
    console.log(processData.processoMain)
    formData.append("cadeia", processData.cadeia);
    console.log(processData.cadeia)

    processData.departamentos.forEach(dep => formData.append("departamentos", dep));
    console.log(processData.departamentos)

    console.log(processData)

    formData.append("diagrama", processData.diagrama);
    if (processData.documento) formData.append("documento", processData.documento);

    console.log(JSON.stringify(formData))

    try {
        const response = await axios.post(
            "https://backend-southstar.onrender.com/processos",
            formData,
            {
              headers: {
                  "Authorization": `Bearer ${localStorage.getItem("authToken")}`,
                  "Content-Type": "multipart/form-data"
              }
          }
        );
        setMessage(response.data.message || "Processo criado com sucesso!");
        setError("");
    } catch (error) {
        console.log("Erro ao criar processo:", error);
        setError(error.response?.data?.message || "Erro ao criar processo. Tente novamente.");
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
        <h1 className="repository-page-title">Criar Processo</h1>
        <form onSubmit={handleSubmit} className="create-process-form">
          <label>
            Nome do Processo:
            <input
              type="text"
              name="nome"
              value={processData.nome}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            Número do Processo:
            <input
              type="text"
              name="numero"
              value={processData.numero}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            Categoria:
            <select
              name="categoria"
              value={processData.categoria}
              onChange={handleChange}
            >
              <option value="Processo">Processo</option>
              <option value="Subprocesso">Subprocesso</option>
            </select>
          </label>
          {processData.categoria === "Subprocesso" && (
            <label>
              Processo Main:
              <input
                type="text"
                name="processoMain"
                value={processData.processoMain}
                onChange={handleChange}
                required
              />
            </label>
          )}
          <label>
            Pertence a uma Cadeia de Processos?
            <select
              name="pertenceCadeia"
              value={processData.pertenceCadeia}
              onChange={handleChange}
            >
              <option value="Não">Não</option>
              <option value="Sim">Sim</option>
            </select>
          </label>
          {processData.pertenceCadeia === "Sim" && (
            <label>
              Nome da Cadeia:
              <input
                type="text"
                name="cadeia"
                value={processData.cadeia}
                onChange={handleChange}
                required
              />
            </label>
          )}
          <label>
            Descrição do Processo:
            <textarea
              name="descricao"
              value={processData.descricao}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            Tipo de Processo:
            <select
              name="tipo"
              value={processData.tipo}
              onChange={handleChange}
            >
              <option value="Departamental">Departamental</option>
              <option value="Interdepartamental">Interdepartamental</option>
            </select>
          </label>
          <fieldset>
            <legend>Departamentos</legend>
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
          <label className="upload-btn">
            Upload do Diagrama
            <input
              type="file"
              accept=".jpeg, .jpg, .png"
              onChange={(e) => handleFileChange(e, "diagrama")}
            />
          </label>
          {fileError && <p className="error">{fileError}</p>}

          <label className="upload-btn">
            Upload do Documento
            <input
              type="file"
              accept=".pdf, .doc, .docx"
              onChange={(e) => handleFileChange(e, "documento")}
            />
          </label>
          {docError && <p className="error">{docError}</p>}
          <button type="submit" className="Create-btn">
            Criar Processo
          </button>
        </form>
        {message && <p>{message}</p>}
        {error && <p className="error">{error}</p>}
      </div>
    </>
  );
}
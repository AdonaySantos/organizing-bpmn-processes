import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import copy from "../assets/copy.svg";
import '../static/Home.css';

export default function Login({ setView }) {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  // Verifica se o usuário já está logado
  useEffect(() => {
    const authToken = localStorage.getItem("authToken");
    if (authToken) {
      navigate("/repositorio-de-processos");
    }
  }, [navigate]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(
        "https://backend-southstar.onrender.com/login",
        { name, password }
      );

      if (response.status === 200) {
        localStorage.setItem("authToken", response.data.token);
        setMessage(response.data.message);
        navigate("/repositorio-de-processos");
      } else {
        setMessage(response.data.message);
      }
    } catch (error) {
      setMessage(
        "Erro ao fazer login: " +
          (error.response?.data?.message || error.message)
      );
    }
  };

  return (
    <div className="entry">
      <div className="left-container">
        <h1>ProcessSync</h1>
        <h2>
          O ProcessSync ajuda você a padronizar e <br />
          organizar os processos BPMN da sua empresa.
        </h2>
        <img src={copy} alt="" className="animated" />
      </div>
      <div className="right-container">
        <div className="card-container">
          <h1>Entrar</h1>
          <form onSubmit={handleSubmit}>
            <div className="textfield">
              <label htmlFor="usuario">Usuário</label>
              <input
                type="text"
                name="usuario"
                placeholder="Usuário"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="textfield">
              <label htmlFor="senha">Senha</label>
              <input
                type="password"
                name="senha"
                placeholder="Senha"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <button type="submit" className="button-right-container">
              ENTRAR
            </button>
            <Link to="/recover-password">Esqueceu a senha?</Link>
          </form>
          {message && <p>{message}</p>}
        </div>
      </div>
    </div>
  );
}

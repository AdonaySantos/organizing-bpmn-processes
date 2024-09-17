import axios from "axios";
import copy from '../assets/copy.svg';
import { useState } from "react";
import { Link } from "react-router-dom";

export default function Recovery({ setView }) { // Recebe setView como prop
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmitRecovery = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(
        "https://backend-southstar.onrender.com/forgot-password",
        {
          name,
        }
      );
      setMessage(`Senha: ${response.data.message}`);
    } catch (error) {
      setMessage(
        "Erro ao recuperar senha: " +
          (error.response?.data?.message || error.message)
      );
    }
  };

  return (
    <div className="entry">
      <div className="left-container">
        <h1>ProcessSync</h1>
        <h2>O ProcessSync ajuda você a padronizar e <br />organizar os processos BPMN da sua empresa.</h2>
        <img src={copy} alt="ProcessSync" className="animated" />
      </div>
      <div className="right-container">
        <div className="card-container">
          <h1>Recuperar Senha</h1>
          <form onSubmit={handleSubmitRecovery}>
            <div className="textfield">
              <label htmlFor="name">Nome:</label>
              <input
                type="text"
                id="name"
                name="name"
                placeholder="Nome"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <button type="submit" className="button-right-container">PESQUISAR</button>
            {message && <p className="message">{message}</p>}
            <Link to='/'>Senha recuperada? Faça Login</Link>
          </form>
        </div>
      </div>
    </div>
  );
}
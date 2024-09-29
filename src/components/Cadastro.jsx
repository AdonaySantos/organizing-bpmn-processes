import React, { useState } from "react";
import axios from "axios";

export default function Cadastro() {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "https://backend-southstar.onrender.com/register",
        {
          name,
          password,
        }
      );
      setMessage(response.data.message);
    } catch (error) {
      setMessage("Erro ao cadastrar: " + error.response.data.message);
    }
  };

  return (
    <>
      <div className="registro">
        <div className="container">
          <h1>Cadastro</h1>
          <form onSubmit={handleSubmit}>
            <div className="input-field">
              <input
                type="text"
                placeholder="Nome"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div className="input-field">
              <input
                type="password"
                placeholder="Senha"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div className="terms">
              <input type="checkbox" required />
              <label>
                Eu aceito os <a href="#">termos e condições</a>
              </label>
            </div>
            <button type="submit">Cadastrar</button>
          </form>
          {message && <p className="message">{message}</p>}
          <div className="login-link">
            Já tem uma conta? <a href="/login">Faça login</a>
          </div>
        </div>
      </div>
    </>
  );
}
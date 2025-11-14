import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { criarUtilizador } from "../../api/utilizador";
import "./GestorCriarUtilizadorPage.css";

function GestorCriarUtilizadorPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    primeiroNome: "",
    sobrenome: "",
    numFuncionario: "",
    password: "",
    role: "Gestor",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const resultado = await criarUtilizador(formData);
      alert("Utilizador criado com sucesso!");
      navigate("/gestor/utilizadores");
    } catch (error) {
      alert("Erro ao criar utilizador: " + (error.response?.data || error.message));
    }
  };  

  return (
    <div className="criar-utilizador-wrapper">
      <h2>Criar Novo Utilizador</h2>
      <form onSubmit={handleSubmit} className="formulario-criar-utilizador">
        {[
          { label: "Primeiro Nome", name: "primeiroNome", type: "text" },
          { label: "Sobrenome", name: "sobrenome", type: "text" },
          { label: "Nº Funcionário", name: "numFuncionario", type: "text" },
          { label: "Password", name: "password", type: "password" },
        ].map((campo) => (
          <div className="linha-formulario-criar-utilizador" key={campo.name}>
            <label htmlFor={campo.name}>{campo.label}</label>
            <input
              type={campo.type}
              id={campo.name}
              name={campo.name}
              value={formData[campo.name]}
              onChange={handleChange}
              required
            />
          </div>
        ))}

        <div className="linha-formulario-criar-utilizador">
          <label htmlFor="role">Função</label>
          <select name="role" value={formData.role} onChange={handleChange} required>
            <option value="Gestor">Gestor</option>
            <option value="Operador">Operador</option>
            <option value="Tecnico">Técnico</option>
            <option value="DepCompras">DepCompras</option>
          </select>
        </div>

        <div className="botoes-criar-utilizador">
          <button
            type="button"
            className="voltar"
            onClick={() => navigate("/gestor/utilizadores")}
          >
            Voltar
          </button>
          <button type="submit" className="criar">
            Criar Utilizador
          </button>
        </div>
      </form>
    </div>
  );
}

export default GestorCriarUtilizadorPage;
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { criarCliente } from "../../api/cliente";
import "./GestorCriarClientePage.css";

function GestorCriarClientePage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    nome: "",
    nif: "",
    morada: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await criarCliente(formData);
      alert("Cliente criado com sucesso!");
      navigate("/gestor/clientes");
    } catch (error) {
      alert("Erro ao criar cliente: " + (error.response?.data || error.message));
    }
  };

  return (
    <div className="criar-cliente-wrapper">
      <h2>Criar Novo Cliente</h2>
      <form onSubmit={handleSubmit} className="formulario-criar-cliente">
        {[
          { label: "Nome", name: "nome", type: "text" },
          { label: "NIF", name: "nif", type: "number" },
          { label: "Morada", name: "morada", type: "text" },
        ].map((campo) => (
          <div className="linha-formulario-cliente" key={campo.name}>
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

        <div className="botoes-criar-cliente">
          <button type="button" className="voltar" onClick={() => navigate("/gestor/clientes")}>
            Voltar
          </button>
          <button type="submit" className="criar">
            Criar Cliente
          </button>
        </div>
      </form>
    </div>
  );
}

export default GestorCriarClientePage;

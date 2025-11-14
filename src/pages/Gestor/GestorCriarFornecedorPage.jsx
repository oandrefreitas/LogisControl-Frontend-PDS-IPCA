import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { criarFornecedor } from "../../api/fornecedor";
import "./GestorCriarFornecedorPage.css";

function GestorCriarFornecedorPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    nome: "",
    telefone: "",
    email: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await criarFornecedor(formData);
      alert("Fornecedor criado com sucesso!");
      navigate("/gestor/definicoes");
    } catch (error) {
      alert("Erro ao criar fornecedor: " + (error.response?.data || error.message));
    }
  };

  return (
    <div className="criar-fornecedor-wrapper">
      <h2>Criar Novo Fornecedor</h2>
      <form onSubmit={handleSubmit} className="formulario-criar-fornecedor">
        {[
          { label: "Nome", name: "nome", type: "text" },
          { label: "Telefone", name: "telefone", type: "text" },
          { label: "Email", name: "email", type: "email" }
        ].map((campo) => (
          <div className="linha-formulario" key={campo.name}>
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

        <div className="botoes-criar">
          <button
            type="button"
            className="voltar"
            onClick={() => navigate("/gestor/definicoes")}
          >
            Voltar
          </button>
          <button type="submit" className="criar">
            Criar Fornecedor
          </button>
        </div>
      </form>
    </div>
  );
}

export default GestorCriarFornecedorPage;

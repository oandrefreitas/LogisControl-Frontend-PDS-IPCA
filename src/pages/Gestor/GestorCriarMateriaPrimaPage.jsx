import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { criarMateriaPrima } from "../../api/materiaPrima";
import "./GestorCriarMateriaPrimaPage.css";

function GestorCriarMateriaPrimaPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    nome: "",
    quantidade: 0,
    descricao: "",
    categoria: "",
    codInterno: "",
    preco: 0.0,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await criarMateriaPrima(formData);
      alert("Matéria-prima criada com sucesso!");
      navigate("/gestor/materia-prima");
    } catch (error) {
      alert("Erro ao criar matéria-prima: " + (error.response?.data || error.message));
    }
  };

  return (
    <div className="criar-materia-wrapper">
      <h2>Criar Nova Matéria-Prima</h2>
      <form onSubmit={handleSubmit} className="formulario-criar-materia">
        {[
          { label: "Nome", name: "nome", type: "text" },
          { label: "Quantidade", name: "quantidade", type: "number" },
          { label: "Descrição", name: "descricao", type: "text" },
          { label: "Categoria", name: "categoria", type: "text" },
          { label: "Código Interno", name: "codInterno", type: "text" },
          { label: "Preço (€)", name: "preco", type: "number", step: "0.01" },
        ].map((campo) => (
          <div className="linha-formulario-criar-materia" key={campo.name}>
            <label htmlFor={campo.name}>{campo.label}</label>
            <input
              type={campo.type}
              id={campo.name}
              name={campo.name}
              step={campo.step}
              value={formData[campo.name]}
              onChange={handleChange}
              required
            />
          </div>
        ))}

        <div className="botoes-criar-materia">
          <button
            type="button"
            className="voltar"
            onClick={() => navigate("/gestor/materia-prima")}
          >
            Voltar
          </button>
          <button type="submit" className="criar">
            Criar Matéria-Prima
          </button>
        </div>
      </form>
    </div>
  );
}

export default GestorCriarMateriaPrimaPage;

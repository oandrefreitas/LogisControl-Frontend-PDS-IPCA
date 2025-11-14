import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { criarAssistencia } from "../../api/assistencia";
import "./TecnicoAssistentePage.css";

function TecnicoAssistentePage() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    nome: "",
    nif: "",
    morada: "",
    telefone: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Apenas permitir números com até 9 dígitos nos campos NIF e Telefone
    if ((name === "nif" || name === "telefone") && !/^\d{0,9}$/.test(value)) {
      return;
    }

    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validação final antes de enviar
    if (formData.nif.length !== 9 || formData.telefone.length !== 9) {
      alert("NIF e Telefone devem ter exatamente 9 dígitos.");
      return;
    }

    try {
      await criarAssistencia({
        nome: formData.nome,
        nif: parseInt(formData.nif),
        morada: formData.morada,
        telefone: parseInt(formData.telefone)
      });

      alert("Assistência criada com sucesso!");
      navigate("/tecnico/home");
    } catch (error) {
      alert("Erro ao criar assistência: " + (error.response?.data || error.message));
    }
  };

  const handleCancelar = () => {
    navigate("/tecnico/home");
  };

  return (
    <div className="criar-assistencia-wrapper">
      <h2>Criar Assistência Externa</h2>

      <form onSubmit={handleSubmit} className="formulario-criar-assistencia">
        <div className="linha-formulario-criar-assistencia">
          <label htmlFor="nome">Nome da Empresa</label>
          <input
            type="text"
            id="nome"
            name="nome"
            value={formData.nome}
            onChange={handleChange}
            required
          />
        </div>

        <div className="linha-formulario-criar-assistencia">
          <label htmlFor="nif">NIF</label>
          <input
            type="text"
            id="nif"
            name="nif"
            inputMode="numeric"
            value={formData.nif}
            onChange={handleChange}
            required
          />
        </div>

        <div className="linha-formulario-criar-assistencia">
          <label htmlFor="morada">Morada</label>
          <input
            type="text"
            id="morada"
            name="morada"
            value={formData.morada}
            onChange={handleChange}
            required
          />
        </div>

        <div className="linha-formulario-criar-assistencia">
          <label htmlFor="telefone">Telefone</label>
          <input
            type="text"
            id="telefone"
            name="telefone"
            inputMode="numeric"
            value={formData.telefone}
            onChange={handleChange}
            required
          />
        </div>

        <div className="botoes-criar-assistencia">
          <button type="button" className="cancelar" onClick={handleCancelar}>
            Cancelar
          </button>
          <button type="submit" className="criar">
            Criar Assistência
          </button>
        </div>
      </form>
    </div>
  );
}

export default TecnicoAssistentePage;
